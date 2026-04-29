import { Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { SiAngular, SiDotnet, SiReact, SiTypescript } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { BsFiletypeSql } from 'react-icons/bs';
import { ArrowRight, ChevronDown, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const stack = [
  { Icon: SiAngular, label: 'Angular', color: 'text-[#DD0031]' },
  { Icon: SiReact, label: 'React', color: 'text-[#61DAFB]' },
  { Icon: SiTypescript, label: 'TypeScript', color: 'text-[#3178C6]' },
  { Icon: SiDotnet, label: '.NET Core', color: 'text-[#7B4DD6]' },
  { Icon: TbBrandCSharp, label: 'C#', color: 'text-[#239120]' },
  { Icon: BsFiletypeSql, label: 'SQL Server', color: 'text-[#CC2927]' },
];

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

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-blue-600/20 dark:bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-purple-600/20 dark:bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[60rem] h-[24rem] bg-indigo-600/10 dark:bg-indigo-500/15 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium tracking-wide text-zinc-700 dark:text-zinc-300">
            {t('home.available')}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.05] text-balance"
        >
          <span className="block text-zinc-900 dark:text-zinc-100">
            {t('home.titleLine1')}
          </span>
          <span className="block text-gradient mt-1 sm:mt-2 pb-2">
            {t('home.titleLine2')}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light text-pretty"
        >
          <Trans
            i18nKey="home.description"
            components={{
              strong: (
                <strong className="text-zinc-900 dark:text-zinc-200 font-medium" />
              ),
            }}
          />
        </motion.p>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2.5 mt-10 max-w-3xl"
        >
          {stack.map(({ Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:scale-[1.04] hover:border-white/20 transition-all duration-300 cursor-default"
            >
              <Icon className={`w-4 h-4 ${color}`} />
              {label}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
        >
          <a
            href="#projects"
            onClick={(e) => handleNav(e, '#projects')}
            className="group w-full sm:w-auto px-7 py-3.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.18)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {t('home.projects')}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            onClick={handleDownloadCV}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-pill font-medium hover:bg-zinc-900/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group"
          >
            <Download className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
            {t('home.downloadCV')}
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-500 dark:text-zinc-500"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono">
            {t('home.scrollHint')}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};
