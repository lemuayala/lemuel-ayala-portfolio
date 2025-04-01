import { useLanguage } from '../../context/LanguageContext';
import { RevealOnScroll } from '../RevealOnScroll';
import { Github, Linkedin } from 'lucide-react';

export const Home = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent leading-right">
            {t('home.hi')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-lg mx-auto">
            {t('home.description')}
          </p>
          <div className="flex justify-center space-x-4 ">
            <a
              href="#projects"
              className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              {t('home.projects')}
            </a>
            <a
              href="#contact"
              className="border border-blue-500/50 text-blue-500 py-3 px-6 font-medium transition-all duration-200 hover:-translate-y-0.5
             hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:bg-blue-500/50"
            >
              {t('home.contact')}
            </a>
          </div>
          <div className="flex justify-center space-x-2 mt-8">
            <a
              href="https://github.com/lemuayala"
              className="flex items-center rounded-full bg-gray-100 dark:bg-gray-900 px-3 py-3 text-gray-600 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <Github />
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/lemuayala/"
              className="flex items-center rounded-full bg-gray-100 dark:bg-gray-900 px-3 py-3 text-gray-600 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <Linkedin />
              </span>
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
