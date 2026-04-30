import { Moon, Sun, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { links } from '../utils/navigation';

type MobileMenuProps = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const MobileMenu = ({ menuOpen, setMenuOpen }: MobileMenuProps) => {
  const { changeLanguage, t, i18n } = useLanguage();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'es';

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  };

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${
        menuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!menuOpen}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-zinc-950/60 transition-opacity duration-500 ${
          menuOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sheet */}
      <div
        className={`absolute top-4 inset-x-4 glass-panel rounded-3xl p-6 shadow-2xl transition-all duration-500 ${
          menuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-sm font-semibold tracking-tight">
            lemuayala<span className="text-blue-400">.tech</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-full glass-pill hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 mb-8">
          {links.map((link, idx) => (
            <a
              key={link.id}
              href={link.id}
              onClick={(e) => handleNav(e, link.id)}
              className="group flex items-center justify-between px-4 py-3.5 rounded-xl glass-pill hover:bg-white/5 transition-colors"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs text-zinc-500">
                  0{idx + 1}
                </span>
                <span className="text-base font-medium">{t(link.label)}</span>
              </span>
              <span className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                →
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 glass-pill rounded-full p-1">
            <button
              onClick={() => changeLanguage('es')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider transition-all ${
                currentLang === 'es'
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider transition-all ${
                currentLang === 'en'
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-full glass-pill hover:bg-white/5 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-zinc-300" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
