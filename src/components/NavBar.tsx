import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const NavBar = ({ menuOpen, setMenuOpen }: any) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  });

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark' // Oscuro por defecto
  );

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log(theme);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] blackdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a
            href=""
            className="font-mono text-2xl font-bold text-gray-800 dark:text-white "
          >
            lemuelayala<span className="text-blue-500 ">.tech</span>
          </a>

          <div
            className="w-7 h-5 relative cursor-pointer z-40 md:hidden"
            onClick={() => setMenuOpen((prev: boolean) => !prev)}
          >
            &#9776;
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gary-300 hove:text-white transition-colors"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-gary-300 hove:text-white transition-colors"
            >
              About
            </a>

            <a
              href="#projects"
              className="text-gary-300 hove:text-white transition-colors"
            >
              Projects
            </a>

            <a
              href="#contact"
              className="text-gary-300 hove:text-white transition-colors"
            >
              Contact
            </a>

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
