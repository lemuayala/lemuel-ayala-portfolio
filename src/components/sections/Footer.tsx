import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-900/5 dark:border-white/5 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            © {year} Lemuel Ayala. lemuayala<span className="text-blue-500">.tech</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/lemuayala"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center hover:bg-zinc-900/5 dark:hover:bg-white/10 transition-colors"
          >
            <FaGithub className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </a>
          <a
            href="https://www.linkedin.com/in/lemuayala/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center hover:bg-zinc-900/5 dark:hover:bg-white/10 transition-colors"
          >
            <FaLinkedin className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </a>
          <a
            href="mailto:lemuayala@gmail.com"
            aria-label="Email"
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center hover:bg-zinc-900/5 dark:hover:bg-white/10 transition-colors"
          >
            <Mail className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </a>
        </div>

        <p className="text-[11px] text-zinc-500 dark:text-zinc-500 text-center max-w-md leading-relaxed">
          {t('footer.tagline')}
        </p>
      </div>
    </footer>
  );
};
