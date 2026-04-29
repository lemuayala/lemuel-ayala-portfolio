import { useEffect, useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import { links } from '../utils/navigation';

export const NavBar = ({ menuOpen, setMenuOpen }: any) => {
  const { changeLanguage, t, i18n } = useLanguage();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('#home');

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const ids = links.map((l) => l.id.replace('#', ''));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId('#' + visible.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'es';

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'pt-3' : 'pt-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav
          className={`glass-nav rounded-2xl flex items-center justify-between gap-4 px-4 sm:px-5 transition-all duration-500 ${
            scrolled ? 'h-14 shadow-lg shadow-black/20' : 'h-16'
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNav(e, '#home')}
            className="flex items-center shrink-0 group"
            aria-label="lemuayala.tech home"
          >
            <span className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
              lemuayala
              <span className="text-blue-500 dark:text-blue-400">.tech</span>
            </span>
          </a>

          {/* Desktop nav pill */}
          <div className="hidden md:flex items-center gap-1 glass-pill rounded-full px-1.5 py-1.5">
            {links.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.id}
                  onClick={(e) => handleNav(e, link.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-300 ${
                    isActive
                      ? 'text-zinc-900 dark:text-white'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-zinc-900/5 dark:bg-white/10 ring-1 ring-zinc-900/5 dark:ring-white/5" />
                  )}
                  <span className="relative">{t(link.label)}</span>
                </a>
              );
            })}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {/* Language switch */}
            <div className="hidden sm:flex items-center gap-1 glass-pill rounded-full p-1">
              <button
                onClick={() => changeLanguage('es')}
                aria-label="Cambiar a español"
                className={`px-2 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-all ${
                  currentLang === 'es'
                    ? 'bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-white'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => changeLanguage('en')}
                aria-label="Switch to English"
                className={`px-2 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-all ${
                  currentLang === 'en'
                    ? 'bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-white'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-full glass-pill hover:bg-zinc-900/5 dark:hover:bg-white/5 transition-colors"
              aria-label={
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-zinc-300" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full glass-pill"
              onClick={() => setMenuOpen((prev: boolean) => !prev)}
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
