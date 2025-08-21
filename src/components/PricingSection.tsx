import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { trackSectionView, trackCTAClick } from '../utils/analytics';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  popular?: boolean;
  icon: React.ReactNode;
  ctaText: string;
  ctaLink: string;
}

const PricingSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  React.useEffect(() => {
    if (isVisible) {
      trackSectionView('Pricing');
    }
  }, [isVisible]);

  const plans: PricingPlan[] = [
    {
      name: "Starter",
      price: "R$ 89",
      period: "/mês",
      description: "Ideal para pequenos negócios que estão começando",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Até 2 atendentes",
        "1.000 mensagens/mês",
        "Respostas rápidas básicas",
        "Relatórios simples",
        "Suporte por email",
        "Integração WhatsApp"
      ],
      ctaText: "Começar Agora",
      ctaLink: "https://mepchat.agenciamep.com/cadastro?plan=starter"
    },
    {
      name: "Professional",
      price: "R$ 160",
      period: "/mês",
      description: "A escolha perfeita para empresas em crescimento",
      icon: <Star className="w-6 h-6" />,
      features: [
        "Até 5 atendentes",
        "5.000 mensagens/mês",
        "Respostas rápidas avançadas",
        "Transferência inteligente",
        "Sistema de avaliações",
        "QR Code personalizado",
        "Relatórios avançados",
        "Histórico ilimitado",
        "Identificação CPF/CNPJ",
        "Suporte prioritário",
        "Integração com CRM"
      ],
      highlighted: true,
      popular: true,
      ctaText: "Teste Grátis por 7 Dias",
      ctaLink: "https://mepchat.agenciamep.com/cadastro?plan=professional"
    },
    {
      name: "Enterprise",
      price: "R$ 299",
      period: "/mês",
      description: "Solução completa para grandes empresas",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Atendentes ilimitados",
        "Mensagens ilimitadas",
        "Todos os recursos Professional",
        "API personalizada",
        "Integração com sistemas próprios",
        "Relatórios personalizados",
        "Suporte 24/7",
        "Gerente de conta dedicado",
        "Treinamento da equipe",
        "SLA garantido"
      ],
      ctaText: "Falar com Vendas",
      ctaLink: "https://mepchat.agenciamep.com/contato?plan=enterprise"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,

      },
    },
  };

  const handleCTAClick = (planName: string, ctaLink: string) => {
    trackCTAClick(`Pricing ${planName}`, 'pricing_section');
    window.open(ctaLink, '_blank');
  };

  return (
    <section
      id="pricing"
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
            Planos que se adaptam ao seu{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              negócio
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Escolha o plano ideal para sua empresa e comece a transformar seu atendimento hoje mesmo.
            Todos os planos incluem teste gratuito de 7 dias.
          </p>
          
          {/* Pricing Toggle */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button className="px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium shadow-sm">
              Mensal
            </button>
            <button className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-400 font-medium">
              Anual (2 meses grátis)
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-primary to-secondary text-white shadow-2xl scale-105'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                  plan.highlighted
                    ? 'bg-white/20 text-white'
                    : 'bg-gradient-to-r from-primary to-secondary text-white'
                }`}>
                  {plan.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${
                  plan.highlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className={`text-4xl font-bold ${
                    plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ml-1 ${
                    plan.highlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                      plan.highlighted ? 'text-white' : 'text-primary'
                    }`} />
                    <span className={`text-sm ${
                      plan.highlighted ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCTAClick(plan.name, plan.ctaLink)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-white text-primary hover:bg-gray-100'
                    : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
                }`}
              >
                {plan.ctaText}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Precisa de algo personalizado?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco para criar um plano sob medida para sua empresa.
              Oferecemos soluções personalizadas para grandes volumes e necessidades específicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCTAClick('Custom', 'https://mepchat.agenciamep.com/contato')}
                className="btn-primary px-6 py-3"
              >
                Falar com Especialista
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://mepchat.agenciamep.com/demo', '_blank')}
                className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Agendar Demonstração
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Check className="w-5 h-5 text-green-500" />
            <span className="font-medium">Garantia de 30 dias ou seu dinheiro de volta</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;