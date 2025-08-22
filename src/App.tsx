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
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
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
  );
}

export default App;
