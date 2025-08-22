import React from 'react';
import { motion } from 'framer-motion';
import { Store, Briefcase, Heart, GraduationCap, Car, Home, Utensils, Shirt } from 'lucide-react';
import { trackSectionView } from '../utils/analytics';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface BusinessSegment {
  icon: React.ReactNode;
  title: string;
  description: string;
  useCases: string[];
  benefits: string[];
  color: string;
}

const TargetAudienceSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [activeSegment, setActiveSegment] = React.useState(0);

  React.useEffect(() => {
    if (isVisible) {
      trackSectionView('Target Audience');
    }
  }, [isVisible]);

  const segments: BusinessSegment[] = [
    {
      icon: <Store className="w-8 h-8" />,
      title: "E-commerce & Varejo",
      description: "Aumente suas vendas online com atendimento personalizado",
      color: "from-blue-500 to-cyan-500",
      useCases: [
        "Suporte pré e pós-venda",
        "Acompanhamento de pedidos",
        "Recuperação de carrinho abandonado",
        "Promoções personalizadas"
      ],
      benefits: [
        "Aumento de 35% na conversão",
        "Redução de 50% no abandono de carrinho",
        "Melhoria na satisfação do cliente"
      ]
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Serviços Profissionais",
      description: "Gerencie clientes e projetos com eficiência",
      color: "from-purple-500 to-pink-500",
      useCases: [
        "Agendamento de consultas",
        "Acompanhamento de projetos",
        "Suporte técnico especializado",
        "Propostas comerciais"
      ],
      benefits: [
        "Organização completa de clientes",
        "Histórico detalhado de interações",
        "Aumento na retenção de clientes"
      ]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Saúde & Bem-estar",
      description: "Cuidado personalizado para seus pacientes",
      color: "from-green-500 to-emerald-500",
      useCases: [
        "Agendamento de consultas",
        "Lembretes de medicação",
        "Resultados de exames",
        "Orientações médicas"
      ],
      benefits: [
        "Melhor relacionamento médico-paciente",
        "Redução de faltas em consultas",
        "Agilidade no atendimento"
      ]
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Educação",
      description: "Conecte-se com alunos e responsáveis",
      color: "from-orange-500 to-red-500",
      useCases: [
        "Comunicação com pais",
        "Suporte acadêmico",
        "Informações sobre cursos",
        "Matrículas e rematrículas"
      ],
      benefits: [
        "Comunicação mais eficiente",
        "Maior engajamento dos alunos",
        "Redução na evasão escolar"
      ]
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Automotivo",
      description: "Atendimento especializado para seu negócio automotivo",
      color: "from-gray-600 to-gray-800",
      useCases: [
        "Agendamento de revisões",
        "Orçamentos de serviços",
        "Vendas de veículos",
        "Suporte pós-venda"
      ],
      benefits: [
        "Fidelização de clientes",
        "Aumento nas vendas de serviços",
        "Gestão eficiente da oficina"
      ]
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Imobiliário",
      description: "Facilite a jornada de compra e locação",
      color: "from-teal-500 to-blue-600",
      useCases: [
        "Atendimento a interessados",
        "Agendamento de visitas",
        "Negociação de contratos",
        "Suporte pós-venda"
      ],
      benefits: [
        "Qualificação automática de leads",
        "Aumento na conversão de visitas",
        "Melhor experiência do cliente"
      ]
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Alimentação",
      description: "Otimize pedidos e atendimento no seu restaurante",
      color: "from-yellow-500 to-orange-600",
      useCases: [
        "Pedidos via WhatsApp",
        "Cardápio digital",
        "Promoções especiais",
        "Feedback dos clientes"
      ],
      benefits: [
        "Aumento em pedidos delivery",
        "Redução de erros em pedidos",
        "Fidelização de clientes"
      ]
    },
    {
      icon: <Shirt className="w-8 h-8" />,
      title: "Moda & Beleza",
      description: "Atendimento personalizado para seu público",
      color: "from-pink-500 to-rose-600",
      useCases: [
        "Consultoria de estilo",
        "Agendamento de serviços",
        "Lançamentos de produtos",
        "Programa de fidelidade"
      ],
      benefits: [
        "Relacionamento mais próximo",
        "Aumento no ticket médio",
        "Maior retenção de clientes"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="target-audience"
      ref={ref}
      className="py-20 bg-slate-50 dark:bg-slate-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Perfeito para{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              qualquer negócio
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Descubra como o MepChat pode transformar o atendimento em diferentes segmentos
            e impulsionar os resultados da sua empresa.
          </p>
        </motion.div>

        {/* Segments Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                activeSegment === index
                  ? 'bg-white dark:bg-slate-800 shadow-lg ring-2 ring-primary'
                  : 'bg-white dark:bg-slate-800 shadow-md hover:shadow-lg'
              }`}
              onClick={() => setActiveSegment(index)}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${segment.color} flex items-center justify-center text-white mb-4`}>
                {segment.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                {segment.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {segment.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Active Segment Details */}
        <motion.div
          key={activeSegment}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${segments[activeSegment].color} flex items-center justify-center text-white mr-4`}>
                  {React.cloneElement(segments[activeSegment].icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
                    className: 'w-8 h-8'
                  })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {segments[activeSegment].title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {segments[activeSegment].description}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Casos de Uso Principais:
                </h4>
                <ul className="space-y-2">
                  {segments[activeSegment].useCases.map((useCase, index) => (
                    <li key={index} className="flex items-center text-slate-600 dark:text-slate-300">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Benefícios Comprovados:
                </h4>
                <ul className="space-y-2">
                  {segments[activeSegment].benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-slate-600 dark:text-slate-300">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className={`aspect-square rounded-2xl bg-gradient-to-br ${segments[activeSegment].color} p-8 flex items-center justify-center`}>
                <div className="text-center text-white">
                  {React.cloneElement(segments[activeSegment].icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
                    className: 'w-24 h-24 mx-auto mb-4 opacity-80'
                  })}
                  <h4 className="text-2xl font-bold mb-2">
                    {segments[activeSegment].title}
                  </h4>
                  <p className="text-lg opacity-90">
                    Solução Personalizada
                  </p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-white dark:bg-slate-700 rounded-full shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white dark:bg-slate-700 rounded-full shadow-lg flex items-center justify-center">
                <div className="text-primary font-bold text-sm">24/7</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Não encontrou seu segmento?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              O MepChat se adapta a qualquer tipo de negócio. Fale conosco e descubra
              como podemos personalizar a solução para sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open('https://mepchat.agenciamep.com/contato', '_blank');
                }}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              >
                Falar com Especialista
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open('https://mepchat.agenciamep.com/cadastro', '_blank');
                }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              >
                Teste Grátis Agora
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;