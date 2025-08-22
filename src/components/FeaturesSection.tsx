import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, MessageSquare, Smartphone, BarChart3, Play, Users } from 'lucide-react';
import { trackSectionView } from '../utils/analytics';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  image?: string;
  videoDemo?: boolean;
}

const FeaturesSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [activeFeature, setActiveFeature] = React.useState(0);

  React.useEffect(() => {
    if (isVisible) {
      trackSectionView('Features');
    }
  }, [isVisible]);

  const features: Feature[] = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Conexão via QR Code ou API WhatsApp",
      description: "Conecte rapidamente pelo QR Code (WhatsApp Web) ou pela API oficial do WhatsApp quando disponível. Sem complicação.",
      benefits: [
        "Conexão rápida via QR Code",
        "WhatsApp Web integrado",
        "API oficial quando disponível",
        "Configuração simples"
      ],
      videoDemo: true
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Mesmo atendente em vários números",
      description: "Um operador pode atender múltiplas linhas quando você contrata conexões extras.",
      benefits: [
        "Múltiplas linhas por atendente",
        "Conexões extras disponíveis",
        "Eficiência operacional",
        "Gestão centralizada"
      ]
    },
    {
      icon: <ArrowRightLeft className="w-6 h-6" />,
      title: "Transferência de conversas",
      description: "Redirecione entre setores em 1 clique",
      benefits: [
        "Transferência em 1 clique",
        "Roteamento entre setores",
        "Contexto preservado",
        "Notificações automáticas"
      ]
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Respostas rápidas",
      description: "Ganhe agilidade em orçamentos e dúvidas frequentes",
      benefits: [
        "Templates para orçamentos",
        "Respostas pré-definidas",
        "Atalhos de teclado",
        "Biblioteca compartilhada"
      ]
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Relatórios simples",
      description: "Acompanhe volume, tempo e qualidade do atendimento",
      benefits: [
        "Métricas de volume",
        "Tempo de resposta",
        "Qualidade do atendimento",
        "Relatórios práticos"
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

  const featureVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,

      },
    },
  };

  return (
    <section
      id="features"
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
            Recursos que fazem a{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              diferença
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Descubra as funcionalidades avançadas que tornam o MepChat a escolha ideal
            para empresas que buscam excelência no atendimento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Features List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureVariants}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeFeature === index
                    ? 'bg-white dark:bg-slate-800 shadow-lg border-l-4 border-primary'
                    : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800'
                }`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg transition-colors duration-300 ${
                    activeFeature === index
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Demo */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:sticky lg:top-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
                {features[activeFeature].videoDemo ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 cursor-pointer hover:bg-white/30 transition-colors">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">
                      Clique para ver demonstração
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeFeature}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center text-white"
                  >
                    {React.cloneElement(features[activeFeature].icon as React.ReactElement<any>, {
                      className: 'w-12 h-12'
                    })}
                  </motion.div>
                )}
              </div>
              
              <motion.div
                key={activeFeature}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  {features[activeFeature].title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {features[activeFeature].description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Experimente todos os recursos gratuitamente
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Teste todas as funcionalidades por 5 dias, sem compromisso
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.open('https://mepchat.agenciamep.com/cadastro', '_blank');
              }}
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Iniciar Teste Gratuito
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;