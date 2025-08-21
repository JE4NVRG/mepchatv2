import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, MessageCircle, TrendingUp, Quote } from 'lucide-react';
import { trackSectionView } from '../utils/analytics';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCounter } from '../hooks/useCounter';

interface Metric {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
  decimals?: number;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

const SocialProofSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  React.useEffect(() => {
    if (isVisible) {
      trackSectionView('Social Proof');
    }
  }, [isVisible]);

  const metrics: Metric[] = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      value: 65000,
      suffix: "+",
      prefix: "",
      label: "Atendimentos Realizados"
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 400,
      suffix: "+",
      prefix: "",
      label: "Clientes Ativos"
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: 97,
      suffix: "%",
      prefix: "",
      label: "Satisfação dos Clientes"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 45,
      suffix: "%",
      prefix: "+",
      label: "Aumento nas Vendas"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Maria Silva",
      role: "Gerente de Vendas",
      company: "Loja Fashion Style",
      content: "O MepChat revolucionou nosso atendimento! Conseguimos aumentar nossas vendas em 60% e nossos clientes estão muito mais satisfeitos. A organização por setores foi um divisor de águas.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Proprietário",
      company: "Oficina Santos",
      content: "Antes do MepChat, perdíamos muitos clientes por falta de organização. Agora conseguimos agendar revisões, enviar orçamentos e manter um histórico completo. Recomendo!",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Diretora Comercial",
      company: "Imobiliária Prime",
      content: "A funcionalidade de respostas rápidas economiza muito tempo da nossa equipe. Conseguimos atender mais clientes com a mesma qualidade. O ROI foi incrível!",
      rating: 5
    },
    {
      name: "Carlos Oliveira",
      role: "CEO",
      company: "TechSolutions",
      content: "O sistema de relatórios do MepChat nos deu insights valiosos sobre nosso atendimento. Identificamos gargalos e melhoramos nossa eficiência em 40%.",
      rating: 5
    },
    {
      name: "Fernanda Lima",
      role: "Coordenadora",
      company: "Clínica Saúde+",
      content: "Para nossa clínica, o MepChat foi essencial. Conseguimos organizar agendamentos, enviar lembretes e manter contato próximo com nossos pacientes.",
      rating: 5
    },
    {
      name: "Roberto Mendes",
      role: "Gerente",
      company: "Restaurante Sabor",
      content: "Nossos pedidos via WhatsApp ficaram muito mais organizados. O cardápio digital e as promoções automáticas aumentaram nosso delivery em 80%!",
      rating: 5
    }
  ];

  const MetricCard: React.FC<{ metric: Metric; index: number }> = ({ metric, index }) => {
    const count = useCounter({
      end: metric.value,
      duration: 2000,
      decimals: metric.decimals || 0,
      prefix: metric.prefix || '',
      suffix: metric.suffix || ''
    });

    return (
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -5, scale: 1.05 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center text-white mx-auto mb-4">
          {metric.icon}
        </div>
        <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {isVisible ? count.toString() : '0'}
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          {metric.label}
        </p>
      </motion.div>
    );
  };

  const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => (
    <motion.div
      initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
      animate={isVisible ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative"
    >
      <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
      
      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      
      {/* Content */}
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        "{testimonial.content}"
      </p>
      
      {/* Author */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold mr-4">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.role} • {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="social-proof"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Resultados que{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              falam por si
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Mais de 400 empresas já transformaram seu atendimento com o MepChat.
            Veja os números e depoimentos de quem já faz parte dessa revolução.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>

        {/* Testimonials Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            O que nossos clientes dizem
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Depoimentos reais de empresas que transformaram seu atendimento com o MepChat
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Confiança e Segurança
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Certificações e garantias que você pode confiar
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                ISO 27001
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Certificação de segurança da informação
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                LGPD Compliant
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total conformidade com a LGPD
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                99.9% Uptime
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Disponibilidade garantida
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Junte-se a mais de 400 empresas satisfeitas
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Comece sua transformação digital hoje mesmo e veja os resultados em poucos dias
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.open('https://mepchat.agenciamep.com/cadastro', '_blank');
              }}
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Começar Gratuitamente
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;