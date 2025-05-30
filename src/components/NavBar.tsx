import { useEffect, useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import { links } from '../utils/navigation';
import { ScrollLink } from './ScrollLink';

export const NavBar = ({ menuOpen, setMenuOpen }: any) => {
  const { changeLanguage } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  });

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 text-gray-800 dark:text-white">
          <a href="" className="font-mono text-2xl font-bold  ">
            lemuayala<span className="text-blue-500 ">.tech</span>
          </a>

          <div
            className="w-7 h-5 relative cursor-pointer z-40 md:hidden"
            onClick={() => setMenuOpen((prev: boolean) => !prev)}
          >
            <Menu></Menu>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <ScrollLink key={link.id} id={link.id} labelKey={link.label} />
            ))}

            <div className="flex items-center space-x-4">
              <button
                onClick={() => changeLanguage('es')}
                className="mr-2 w-7 h-5 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(116,186,57,0.4)] active:scale-95"
                aria-label="Cambiar a español"
              >
                <img
                  src="https://purecatamphetamine.github.io/country-flag-icons/3x2/AR.svg"
                  alt="Español"
                  className="w-full h-full object-cover rounded transform transition-transform duration-300 hover:scale-105"
                />
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className="w-7 h-5 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(1,33,105,0.4)] active:scale-95"
                aria-label="Change to English"
              >
                <img
                  src="https://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
                  alt="English"
                  className="w-full h-full object-cover rounded transform transition-transform duration-300 hover:scale-105"
                />
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
            >
              {theme !== 'dark' ? (
                <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              ) : (
                <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
