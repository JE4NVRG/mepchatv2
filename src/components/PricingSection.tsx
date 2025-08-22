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
      name: "Start",
      price: "R$ 299",
      period: "/mês",
      description: "Ideal para pequenos negócios que estão começando",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "5 atendentes inclusos",
        "1 número de WhatsApp",
        "CPF ou CNPJ",
        "Troca de número quando precisar",
        "Todos os recursos da plataforma",
        "Respostas rápidas",
        "Transferência de conversas",
        "Relatórios básicos",
        "Suporte por email"
      ],
      ctaText: "Testar grátis 5 dias",
      ctaLink: "https://mepchat.agenciamep.com/cadastro"
    },
    {
      name: "Pro",
      price: "R$ 459",
      period: "/mês",
      description: "A escolha perfeita para empresas em crescimento",
      icon: <Star className="w-6 h-6" />,
      features: [
        "Até 10 atendentes",
        "2 números de WhatsApp",
        "Setores ilimitados",
        "Relatórios avançados",
        "Avaliação de atendentes",
        "CPF e CNPJ",
        "Histórico completo",
        "Transferência inteligente",
        "Respostas rápidas avançadas",
        "Suporte prioritário"
      ],
      highlighted: true,
      popular: true,
      ctaText: "Falar com especialista",
      ctaLink: "https://wa.me/SEU_NUMERO?text=Quero%20saber%20mais%20sobre%20o%20MepChat"
    },
    {
      name: "Business",
      price: "Sob consulta",
      period: "",
      description: "Solução completa para grandes empresas",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Multi-número",
        "Atendentes ilimitados",
        "Relatórios completos",
        "Suporte prioritário",
        "Onboarding assistido",
        "API personalizada",
        "Integração com sistemas próprios",
        "Gerente de conta dedicado",
        "Treinamento da equipe",
        "SLA garantido"
      ],
      ctaText: "Falar com especialista",
      ctaLink: "https://wa.me/SEU_NUMERO?text=Quero%20saber%20mais%20sobre%20o%20MepChat"
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
      className="py-20 bg-white dark:bg-slate-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Planos que se adaptam ao seu{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              negócio
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-4">
            Escolha o plano ideal para sua empresa e comece a transformar seu atendimento hoje mesmo.
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-200 font-medium mb-8">
            Planos mensais, pré-pagos e sem fidelidade.
          </p>

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
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recomendado
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
                  plan.highlighted ? 'text-white' : 'text-slate-900 dark:text-slate-100'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${
                  plan.highlighted ? 'text-white/80' : 'text-slate-600 dark:text-slate-300'
                }`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className={`text-4xl font-bold ${
                    plan.highlighted ? 'text-white' : 'text-slate-900 dark:text-slate-100'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ml-1 ${
                    plan.highlighted ? 'text-white/80' : 'text-slate-600 dark:text-slate-300'
                  }`}>
                    {plan.period}
                  </span>
                </div>
                {(plan.name === 'Start' || plan.name === 'Pro') && (
                  <>
                    <div className={`text-xs mt-2 ${
                      plan.highlighted ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      Add-ons: Conexão extra R$150 • Usuário extra R$35
                    </div>
                    <div className={`text-xs mt-1 ${
                      plan.highlighted ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      O mesmo atendente pode atuar em vários números (com conexões extras).
                    </div>
                  </>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                      plan.highlighted ? 'text-white' : 'text-primary'
                    }`} />
                    <span className={`text-sm ${
                      plan.highlighted ? 'text-white' : 'text-slate-600 dark:text-slate-300'
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
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Precisa de algo personalizado?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
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
          <div className="inline-flex items-center space-x-2 text-slate-600 dark:text-slate-300">
            <Check className="w-5 h-5 text-green-500" />
            <span className="font-medium">Garantia de 30 dias ou seu dinheiro de volta</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;