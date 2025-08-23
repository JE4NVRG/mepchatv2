import { HelmetProvider } from 'react-helmet-async';
import BenefitsSection from "./components/BenefitsSection";
import FAQSection from "./components/FAQSection";
import FeaturesSection from "./components/FeaturesSection";
import FinalCTASection from "./components/FinalCTASection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PricingSection from "./components/PricingSection";
import SocialProofSection from "./components/SocialProofSection";
import TargetAudienceSection from "./components/TargetAudienceSection";
import SEOHead from "./components/SEOHead";
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  // Dados estruturados para SoftwareApplication
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MepChat",
    "description": "Plataforma completa de WhatsApp Business com chatbot inteligente, multi-atendimento e automação para aumentar vendas e melhorar experiência do cliente.",
    "url": "https://mepchat.com.br",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "97.00",
      "priceCurrency": "BRL",
      "priceValidUntil": "2025-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "MepChat",
      "url": "https://mepchat.com.br"
    },
    "featureList": [
      "Chatbot Inteligente",
      "Multi-atendimento",
      "Automação de Mensagens",
      "Integração WhatsApp Business",
      "Relatórios Detalhados",
      "Transferência de Conversas"
    ]
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <SEOHead 
          structuredData={softwareApplicationSchema}
        />
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <main>
            <HeroSection />
            <BenefitsSection />
            <FeaturesSection />
            <TargetAudienceSection />
            <PricingSection />
            <SocialProofSection />
            <FAQSection />
            <FinalCTASection />
          </main>

          <Footer />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
