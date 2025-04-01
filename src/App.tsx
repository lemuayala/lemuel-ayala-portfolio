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
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }
        "bg-gray-50  dark:bg-black text-gray-800 dark:text-white`}
      >
        <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <About />
        <Projects />
        <Contact />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
