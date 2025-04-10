import { SiAngular, SiDotnet, SiReact, SiTypescript } from 'react-icons/si';
import { useLanguage } from '../../context/LanguageContext';
import { RevealOnScroll } from '../RevealOnScroll';
import { Github, Linkedin, Download } from 'lucide-react';
import { TbBrandCSharp } from 'react-icons/tb';
import { BsFiletypeSql } from 'react-icons/bs';
import { ScrollLink } from '../ScrollLink';

export const Home = () => {
  const { t } = useLanguage();

  const handleDownloadCV = () => {
    const cvUrl = './documents/Ayala Jara Lemuel - CV.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Ayala Jara Lemuel - CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
            {t('home.hi')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-lg mx-auto">
            {t('home.description')}
          </p>

          <div className="flex justify-center gap-5 mb-8 flex-wrap">
            <SiAngular
              className="text-3xl text-gray-400 w-7 h-7 hover:-translate-y-1 hover:scale-110 transition-transform duration-300"
              title="Angular"
            />
            <SiReact
              className="text-3xl text-gray-400 w-7 h-7 hover:-translate-y-1 hover:scale-110 transition-transform duration-300"
              title="React"
            />
            <SiTypescript
              className="text-3xl text-gray-400 w-7 h-7 hover:-translate-y-1 hover:scale-110 transition-transform duration-300"
              title="TypeScript"
            />
            <SiDotnet
              className="text-3xl text-gray-400 w-7 h-7 hover:-translate-y-1 hover:scale-110 transition-transform duration-300"
              title=".NET"
            />
            <TbBrandCSharp
              className="text-3xl text-gray-400 w-7 h-7 hover:-translate-y-1 hover:scale-110 transition-transform duration-300"
              title="C#"
            />
            <BsFiletypeSql
              className="text-3xl text-gray-400 w-7 h-7 hover:-translate-y-1 hover:scale-110 transition-transform duration-300"
              title="SQL"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <ScrollLink
              id="#projects"
              labelKey="home.projects"
              variant="primary"
            />
            <ScrollLink
              id="#contact"
              labelKey="home.contact"
              variant="secondary"
            />

            <button
              onClick={handleDownloadCV}
              className="flex items-center gap-2 border border-cyan-600/50 text-cyan-600 py-3 px-6 font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:bg-cyan-600/50"
            >
              <Download size={18} />
              {t('home.downloadCV')}
            </button>
          </div>

          <div className="flex justify-center space-x-2">
            <a
              href="https://github.com/lemuayala"
              className="flex items-center rounded-full bg-gray-100 dark:bg-gray-900 px-3 py-3 text-gray-600 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              target="_blank"
              rel="noreferrer"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/lemuayala/"
              className="flex items-center rounded-full bg-gray-100 dark:bg-gray-900 px-3 py-3 text-gray-600 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
