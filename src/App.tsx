import { useState } from 'react';
import './App.css';
import './index.css';

import { LoadingScreen } from './components/LoadingScreen';
import { NavBar } from './components/NavBar';
import { MobileMenu } from './components/MobileMenu';
import { Home } from './components/sections/Home';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from './context/LanguageContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/sections/Footer';
import { Toaster } from 'react-hot-toast';
import { CursorGlow } from './components/CursorGlow';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ t, changeLanguage, i18n }}>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      {/* overflow-x-clip bajo el nav: evita que WebKit rompa backdrop-filter en la barra fija */}
      <div className="relative min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100">
        {/* Background ambient layers */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 grid-pattern opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 noise-overlay"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(96,165,250,0.10),_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(96,165,250,0.12),_transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[60vh] bg-[radial-gradient(ellipse_at_bottom,_rgba(167,139,250,0.10),_transparent_60%)] dark:bg-[radial-gradient(ellipse_at_bottom,_rgba(167,139,250,0.12),_transparent_60%)]"
        />

        <CursorGlow />

        <Toaster position="bottom-center" reverseOrder={false} />
        <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="min-h-screen w-full overflow-x-clip">
          <main>
            <Home />
            <About />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
        <ScrollToTop />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
