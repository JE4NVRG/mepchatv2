import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { trackSectionView } from '../utils/analytics';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Helmet } from 'react-helmet-async';

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

const FAQSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [activeIndex, setActiveIndex] = React.useState<number | null>(0);

  React.useEffect(() => {
    if (isVisible) {
      trackSectionView('FAQ');
    }
  }, [isVisible]);

  const faqs: FAQ[] = [
    {
      question: "Funciona com CPF?",
      answer: "Sim, o MepChat funciona tanto para CPF quanto CNPJ. Você pode usar nossa plataforma sendo MEI, microempresa ou pessoa física. Não há burocracia adicional - basta se cadastrar e começar a usar.",
      category: "Geral"
    },
    {
      question: "O mesmo atendente pode atuar em vários números?",
      answer: "Sim, com conexões extras. Um operador pode atender múltiplas linhas de WhatsApp quando você contrata conexões adicionais. Isso permite maior flexibilidade na gestão da equipe e otimização do atendimento.",
      category: "Funcionalidades"
    },
    {
      question: "Qual o preço?",
      answer: "Temos 3 planos: Start R$299/mês (5 atendentes, 1 número), Pro R$459/mês (10 atendentes, 2 números), e Business sob consulta (multi-número, recursos avançados). Add-ons: Conexão extra R$150, Usuário extra R$35. Veja todos os detalhes na seção Planos.",
      category: "Planos"
    },
    {
      question: "Preciso instalar algo?",
      answer: "Não, o MepChat é 100% online. Você acessa tudo pelo navegador, sem precisar instalar programas ou aplicativos. Funciona em qualquer dispositivo com internet.",
      category: "Técnico"
    },
    {
      question: "Como conecto meu WhatsApp?",
      answer: "A conexão é simples: via QR Code (WhatsApp Web) ou pela API oficial do WhatsApp quando disponível. O processo é rápido e nossa equipe te ajuda na configuração inicial.",
      category: "Técnico"
    },
    {
      question: "O que inclui o teste gratuito?",
      answer: "O teste de 5 dias inclui acesso completo a todas as funcionalidades da plataforma, sem limitações. Você pode testar múltiplos atendentes, setores, relatórios e todos os recursos disponíveis no seu plano.",
      category: "Geral"
    },
    {
      question: "Vocês ajudam na configuração inicial?",
      answer: "Sim, nossa equipe ajuda você nas configurações iniciais. Oferecemos suporte para conectar seu WhatsApp, configurar setores, cadastrar atendentes e personalizar a plataforma conforme suas necessidades.",
      category: "Suporte"
    },
    {
      question: "Vocês criam o fluxograma do bot?",
      answer: "Oferecemos apoio incluído para configurações básicas. Para criação completa de fluxogramas personalizados e automações avançadas, este serviço é negociado à parte conforme a complexidade do projeto.",
      category: "Suporte"
    }
  ];

  // Dados estruturados JSON-LD para FAQPage
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,

      },
    },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>
      <section
        id="faq"
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
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="w-12 h-12 text-primary mr-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100">
              Perguntas{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Frequentes
              </span>
            </h2>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Tire suas dúvidas sobre o MepChat
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-1">
                    {faq.category && (
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
                        {faq.category}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    {activeIndex === index ? (
                      <Minus className="w-6 h-6 text-primary" />
                    ) : (
                      <Plus className="w-6 h-6 text-slate-400" />
                    )}
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Não encontrou sua resposta?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Nossa equipe de suporte está sempre pronta para ajudar você.
              Entre em contato e tire todas as suas dúvidas sobre o MepChat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open('https://mepchat.agenciamep.com/suporte', '_blank');
                }}
                className="btn-primary px-6 py-3"
              >
                Falar com Suporte
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open('https://mepchat.agenciamep.com/demo', '_blank');
                }}
                className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Agendar Demonstração
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Base de Conhecimento
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Artigos e tutoriais detalhados
              </p>
              <button 
                onClick={() => window.open('https://help.mepchat.agenciamep.com', '_blank')}
                className="text-primary hover:text-primary/80 font-medium text-sm"
              >
                Acessar →
              </button>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </motion.div>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Chat ao Vivo
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Suporte em tempo real
              </p>
              <button 
                onClick={() => window.open('https://mepchat.agenciamep.com/chat', '_blank')}
                className="text-primary hover:text-primary/80 font-medium text-sm"
              >
                Iniciar Chat →
              </button>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                </motion.div>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Vídeo Tutoriais
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Aprenda com vídeos práticos
              </p>
              <button 
                onClick={() => window.open('https://youtube.com/@mepchat', '_blank')}
                className="text-primary hover:text-primary/80 font-medium text-sm"
              >
                Assistir →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default FAQSection;