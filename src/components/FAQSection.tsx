import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { trackSectionView } from '../utils/analytics';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

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
      question: "Como funciona o teste gratuito de 7 dias?",
      answer: "Você pode usar todas as funcionalidades do MepChat por 7 dias completamente grátis, sem precisar informar cartão de crédito. Durante este período, você terá acesso a todos os recursos do plano Professional, incluindo múltiplos atendentes, respostas rápidas, relatórios avançados e suporte prioritário. Após o período de teste, você pode escolher continuar com um dos nossos planos pagos ou cancelar sem qualquer cobrança.",
      category: "Geral"
    },
    {
      question: "Posso integrar o MepChat com meu sistema atual?",
      answer: "Sim! O MepChat oferece diversas opções de integração através de nossa API robusta e webhooks. Você pode conectar com CRMs populares como RD Station, HubSpot, Pipedrive, sistemas de e-commerce como Shopify, WooCommerce, e ERPs como TOTVS e SAP. Nossa equipe técnica também pode desenvolver integrações personalizadas para sistemas específicos da sua empresa.",
      category: "Integração"
    },
    {
      question: "Quantos atendentes posso adicionar em cada plano?",
      answer: "No plano Starter você pode adicionar até 2 atendentes, no plano Professional até 5 atendentes, e no plano Enterprise você tem atendentes ilimitados. Cada atendente pode ter permissões específicas, ser atribuído a setores diferentes e ter seu próprio dashboard de performance. Você pode gerenciar facilmente as permissões e acessos de cada membro da equipe.",
      category: "Planos"
    },
    {
      question: "Meus dados ficam seguros na plataforma?",
      answer: "Absolutamente! A segurança é nossa prioridade máxima. Utilizamos criptografia de ponta a ponta, certificação ISO 27001, e somos totalmente compatíveis com a LGPD. Todos os dados são armazenados em servidores seguros na AWS com backup automático. Além disso, você tem controle total sobre seus dados e pode exportá-los ou excluí-los a qualquer momento. Nunca compartilhamos informações com terceiros.",
      category: "Segurança"
    },
    {
      question: "Como funciona o sistema de relatórios?",
      answer: "Nosso sistema de relatórios oferece insights detalhados sobre seu atendimento em tempo real. Você pode acompanhar métricas como tempo de resposta, satisfação do cliente, volume de mensagens por período, performance individual dos atendentes, horários de maior movimento, e muito mais. Os relatórios podem ser personalizados, agendados para envio automático por email, e exportados em Excel ou PDF.",
      category: "Funcionalidades"
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas de cancelamento. O cancelamento pode ser feito diretamente no painel administrativo ou entrando em contato com nosso suporte. Após o cancelamento, você continuará tendo acesso a todas as funcionalidades até o final do período já pago. Também oferecemos garantia de 30 dias - se não ficar satisfeito, devolvemos seu dinheiro.",
      category: "Cobrança"
    },
    {
      question: "Que tipo de suporte vocês oferecem?",
      answer: "Oferecemos suporte completo em português através de múltiplos canais. No plano Starter, você tem suporte por email com resposta em até 24h. No plano Professional, oferecemos suporte prioritário por email, chat e WhatsApp com resposta em até 4h. No plano Enterprise, você tem suporte 24/7, gerente de conta dedicado, e pode agendar chamadas de vídeo para treinamento e consultoria. Também temos uma base de conhecimento completa e tutoriais em vídeo.",
      category: "Suporte"
    }
  ];

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
    <section
      id="faq"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-800"
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Perguntas{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Frequentes
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tire suas dúvidas sobre o MepChat e descubra como nossa plataforma
            pode transformar o atendimento da sua empresa.
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
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-1">
                    {faq.category && (
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
                        {faq.category}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
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
                      <Plus className="w-6 h-6 text-gray-400" />
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
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Não encontrou sua resposta?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
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
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Base de Conhecimento
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Artigos e tutoriais detalhados
              </p>
              <button 
                onClick={() => window.open('https://help.mepchat.agenciamep.com', '_blank')}
                className="text-primary hover:text-primary/80 font-medium text-sm"
              >
                Acessar →
              </button>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </motion.div>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Chat ao Vivo
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Suporte em tempo real
              </p>
              <button 
                onClick={() => window.open('https://mepchat.agenciamep.com/chat', '_blank')}
                className="text-primary hover:text-primary/80 font-medium text-sm"
              >
                Iniciar Chat →
              </button>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                </motion.div>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Vídeo Tutoriais
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
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
  );
};

export default FAQSection;