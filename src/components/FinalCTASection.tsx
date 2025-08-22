import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Shield, Zap, Star, Users, TrendingUp } from 'lucide-react';
import { trackCTAClick, trackSectionView } from '../utils/analytics';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCounter } from '../hooks/useCounter';

const FinalCTASection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [showUrgency, setShowUrgency] = React.useState(false);
  
  // Animated counters for urgency
  const clientsCount = useCounter({
    end: 400,
    duration: 2000,
  });
  
  const satisfactionRate = useCounter({
    end: 97,
    duration: 2000,
    suffix: '%',
  });

  React.useEffect(() => {
    if (isVisible) {
      trackSectionView('Final CTA');
      // Start counters and show urgency elements
      clientsCount.startCounting();
      satisfactionRate.startCounting();
      const timer = setTimeout(() => setShowUrgency(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, clientsCount, satisfactionRate]);

  const handleStartTrial = () => {
    trackCTAClick('final-cta-start-trial', 'Final CTA Section');
    window.open('https://mepchat.agenciamep.com/cadastro', '_blank');
  };

  const handleScheduleDemo = () => {
    trackCTAClick('final-cta-schedule-demo', 'Final CTA Section');
    window.open('https://mepchat.agenciamep.com/demo', '_blank');
  };

  const benefits = [
    {
      icon: Clock,
      text: 'Configuração em menos de 5 minutos',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      text: 'Dados 100% seguros e protegidos',
      color: 'text-green-600'
    },
    {
      icon: Zap,
      text: 'Suporte técnico especializado',
      color: 'text-purple-600'
    },
    {
      icon: CheckCircle,
      text: 'Garantia de 30 dias ou seu dinheiro de volta',
      color: 'text-emerald-600'
    }
  ];

  const urgencyFeatures = [
    {
      icon: Users,
      value: clientsCount,
      label: 'empresas já confiam no MepChat'
    },
    {
      icon: Star,
      value: satisfactionRate,
      label: 'de satisfação dos nossos clientes'
    },
    {
      icon: TrendingUp,
      value: '65k+',
      label: 'atendimentos realizados este mês'
    }
  ];

  return (
    <section
      id="final-cta"
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
    
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
    
            delay: 2,
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Pronto para{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Revolucionar
              </span>
              <br className="hidden sm:block" />
              seu Atendimento?
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Junte-se a mais de 400 empresas que já transformaram seu atendimento
              e aumentaram suas vendas com o MepChat.
            </p>
          </motion.div>

          {/* Urgency Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={showUrgency ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {urgencyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={showUrgency ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <Icon className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {typeof feature.value === 'string' ? feature.value : feature.value.count}
                  </div>
                  <div className="text-white/80 text-sm">
                    {feature.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                  animate={isVisible ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <Icon className={`w-6 h-6 ${benefit.color} bg-white rounded-full p-1`} />
                  <span className="text-white font-medium">{benefit.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <motion.button
              onClick={handleStartTrial}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-2 min-w-[280px] justify-center"
            >
              <span>Começar Teste Grátis Agora</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.button>
            
            <motion.button
              onClick={handleScheduleDemo}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300 min-w-[280px]"
            >
              Agendar Demonstração
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center"
          >
            <p className="text-white/80 text-sm mb-4">
              ✅ Sem compromisso • ✅ Cancelamento gratuito • ✅ Suporte em português
            </p>
            <div className="flex items-center justify-center space-x-6 text-white/60">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="text-xs">ISO 27001</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs">LGPD Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span className="text-xs">99.9% Uptime</span>
              </div>
            </div>
          </motion.div>

          {/* Urgency Timer */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={showUrgency ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-300/30 rounded-2xl p-6 max-w-md mx-auto"
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Clock className="w-5 h-5 text-red-300" />
              </motion.div>
              <span className="text-red-100 font-semibold">Oferta Limitada</span>
            </div>
            <p className="text-white/90 text-sm">
              <strong>Últimas 48 horas</strong> para garantir seu teste gratuito
              com todas as funcionalidades Premium incluídas!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
  
        }}
        className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
  
          delay: 1,
        }}
        className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
  
          delay: 2,
        }}
        className="absolute top-1/2 right-20 w-8 h-8 bg-white/10 rounded-full blur-sm"
      />
    </section>
  );
};

export default FinalCTASection;