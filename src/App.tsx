import BenefitsSection from "./components/BenefitsSection";
import FAQSection from "./components/FAQSection";
import FeaturesSection from "./components/FeaturesSection";
import FinalCTASection from "./components/FinalCTASection";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PricingSection from "./components/PricingSection";
import SocialProofSection from "./components/SocialProofSection";
import TargetAudienceSection from "./components/TargetAudienceSection";
import { ThemeProvider } from "./hooks/useTheme";

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

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <span className="text-2xl font-bold">MepChat</span>
                </div>
                <p className="text-gray-400 mb-4 max-w-md">
                  A plataforma de atendimento via WhatsApp que transforma a
                  comunicação da sua empresa e aumenta suas vendas.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.182 17.635l1.935-1.935c.807.807 1.958 1.297 3.323 1.297 2.58 0 4.677-2.097 4.677-4.677s-2.097-4.677-4.677-4.677-4.677 2.097-4.677 4.677c0 1.365.49 2.516 1.297 3.323l-1.935 1.935 1.944 1.944c.875-.807 1.365-1.958 1.365-3.255 0-2.58 2.097-4.677 4.677-4.677s4.677 2.097 4.677 4.677-2.097 4.677-4.677 4.677z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Produto</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#features"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Funcionalidades
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Preços
                    </a>
                  </li>
                  <li>
                    <a
                      href="#integrations"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Integrações
                    </a>
                  </li>
                  <li>
                    <a
                      href="#security"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Segurança
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Suporte</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#faq"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Central de Ajuda
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contato
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Status
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 MepChat. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Política de Privacidade
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Termos de Uso
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  LGPD
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
