import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, History, CreditCard } from 'lucide-react';
import { trackSectionView } from '../utils/analytics';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const BenefitsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  React.useEffect(() => {
    if (isVisible) {
      trackSectionView('Benefits');
    }
  }, [isVisible]);

  const benefits: Benefit[] = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Um número, vários atendentes",
      description: "Equipe atende junto, sem revezar celular",
      features: [
        "Múltiplos atendentes no mesmo número",
        "Sem necessidade de passar o celular",
        "Atendimento simultâneo e organizado",
        "Controle total da equipe"
      ]
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Setores organizados",
      description: "Vendas, Financeiro, Pós‑venda",
      features: [
        "Divisão clara por departamentos",
        "Roteamento automático",
        "Especialização por área",
        "Fluxo de trabalho otimizado"
      ]
    },
    {
      icon: <History className="w-8 h-8" />,
      title: "Histórico com protocolos",
      description: "Nunca mais perca orçamentos",
      features: [
        "Histórico completo de conversas",
        "Sistema de protocolos",
        "Busca rápida por cliente",
        "Backup automático seguro"
      ]
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "CPF e CNPJ",
      description: "Use com MEI ou empresa, sem burocracia",
      features: [
        "Funciona para pessoa física e jurídica",
        "Sem complicações burocráticas",
        "Ideal para MEI e empresas",
        "Configuração simples e rápida"
      ]
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

  return (
    <section
      id="benefits"
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
            Por que escolher o{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MepChat?
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Descubra como nossa plataforma pode revolucionar seu atendimento ao cliente
            e aumentar suas vendas de forma significativa.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="card group cursor-pointer"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-2">
                {benefit.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start text-sm text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            Pronto para transformar seu atendimento?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.open('https://mepchat.agenciamep.com/cadastro', '_blank');
            }}
            className="btn-primary px-8 py-3 text-lg font-semibold"
          >
            Começar Gratuitamente
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;