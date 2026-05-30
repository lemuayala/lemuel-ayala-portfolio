import { Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Download, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TechMarquee } from '../TechMarquee';
import { MAIN_TECH_STACK, TECH_STACK } from '../../constants/techStack';
import { handleLinkClick } from '../../utils/navigation';
import { useIsMobileMotion } from '../../hooks/useIsMobileMotion';
import { easeOutExpo } from '../../utils/motionPresets';

export const Home = () => {
  const { t } = useLanguage();
  const [isDownloading, setIsDownloading] = useState(false);
  const isMobileMotion = useIsMobileMotion();

  const revealMotion = (delay = 0) =>
    isMobileMotion
      ? {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.16, delay: 0, ease: easeOutExpo },
        }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: easeOutExpo },
        };

  const handleDownloadCV = () => {
    setIsDownloading(true);
    const cvUrl = './documents/Ayala Jara Lemuel - CV.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Ayala Jara Lemuel - CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => setIsDownloading(false), 1100);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-0 pb-10 pt-24 sm:min-h-screen sm:pb-20 sm:pt-28"
    >
      {/* Animated background orbs — visible in both themes */}
      <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-blue-400/24 dark:bg-blue-500/13 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[118px] animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-purple-400/24 dark:bg-purple-500/13 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[118px] animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[60rem] h-[24rem] bg-indigo-400/13 dark:bg-indigo-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] animate-blob animation-delay-4000" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 text-center sm:px-6">
        {/* Status pill */}
        <motion.div
          {...(isMobileMotion
            ? {
                initial: false,
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.16, ease: easeOutExpo },
              }
            : {
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, ease: easeOutExpo },
              })}
          className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 glass-pill sm:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium tracking-wide text-zinc-700 dark:text-zinc-200">
            {t('home.available')}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          {...revealMotion(0.1)}
          className="text-[2.35rem] font-extrabold leading-[1.02] tracking-tight text-balance sm:text-5xl sm:leading-[1.06] md:text-7xl lg:text-[5.2rem]"
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
          {...revealMotion(0.2)}
          className="mt-4 max-w-2xl text-[13px] font-light leading-relaxed text-pretty text-zinc-600 dark:text-zinc-300 sm:mt-6 sm:text-base md:text-xl"
        >
          <Trans
            i18nKey="home.description"
            components={{
              strong: (
                <strong className="text-zinc-900 dark:text-white font-medium" />
              ),
            }}
          />
        </motion.p>

        <motion.div
          {...revealMotion(0.3)}
          className="w-full flex justify-center"
        >
          <TechMarquee items={TECH_STACK} mobileItems={MAIN_TECH_STACK} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...revealMotion(0.4)}
          className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:mt-12 sm:w-auto sm:flex-row sm:items-center sm:gap-3"
        >
          <a
            href="#projects"
            onClick={(e) => handleLinkClick(e, '#projects')}
            className="btn-premium group flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_22px_rgba(255,255,255,0.14)] dark:bg-white dark:text-zinc-950 dark:hover:shadow-[0_0_24px_rgba(255,255,255,0.18)] sm:w-auto sm:px-6 sm:py-3"
          >
            {t('home.projects')}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            onClick={handleDownloadCV}
            className="group flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors glass-pill hover:bg-zinc-900/5 dark:text-zinc-100 dark:hover:bg-white/10 sm:w-auto sm:px-6 sm:py-3"
            aria-live="polite"
          >
            {isDownloading ? (
              <LoaderCircle className="w-4 h-4 animate-spin text-zinc-500 dark:text-zinc-300" />
            ) : (
              <Download className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
            )}
            {isDownloading ? t('home.downloadingCV') : t('home.downloadCV')}
          </button>
        </motion.div>

        {/* Scroll hint (inline, no longer absolute) */}
        <motion.button
          type="button"
          onClick={(e) => handleLinkClick(e, '#about')}
          {...(isMobileMotion
            ? {
                initial: false,
                animate: { opacity: 1 },
                transition: { duration: 0.12, delay: 0 },
              }
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 1, delay: 0.7 },
              })}
          className="mt-7 hidden flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white sm:inline-flex sm:mt-10"
        >
          <ChevronDown className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono">
            {t('home.scrollHint')}
          </span>
        </motion.button>
      </div>
    </section>
  );
};
