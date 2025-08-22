import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, X } from 'lucide-react';
import { trackSectionView } from '../utils/analytics';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const HeroSection: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  React.useEffect(() => {
    if (isVisible) {
      trackSectionView('Hero Section');
    }
  }, [isVisible]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,

      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,

      },
    },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden pt-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-primary font-medium text-sm">
              <Zap className="w-4 h-4 mr-2" />
              Revolucione seu atendimento ao cliente
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight"
          >
            Transforme seu <span className="text-primary">WhatsApp</span> em uma
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              máquina de vendas
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Automatize conversas, qualifique leads e aumente suas vendas com nossa
            plataforma de chatbot inteligente para WhatsApp Business.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            <div className="flex items-center text-slate-700 dark:text-slate-300">
              <span className="font-medium">+65.000 atendimentos</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center text-slate-700 dark:text-slate-300">
              <span className="font-medium">+400 clientes</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center text-slate-700 dark:text-slate-300">
              <span className="font-medium">97% de satisfação</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary mr-4 mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
              onClick={() => scrollToSection('pricing')}
            >
              Começar Agora
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
              onClick={() => scrollToSection('features')}
            >
              Ver Funcionalidades
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="text-center text-slate-600 dark:text-slate-300"
          >
            <p className="text-sm mb-4">Mais de 400 empresas já confiam no MepChat</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">+65k</div>
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-2xl font-bold">+400</div>
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-2xl font-bold">97%</div>
            </div>
            <div className="flex justify-center items-center space-x-8 text-xs mt-2">
              <div>Atendimentos</div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              <div>Clientes</div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              <div>Satisfação</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Demonstração do MepChat
              </h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">
                Vídeo de demonstração será carregado aqui
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;