import { use, useEffect } from 'react';

export const NavBar = ({ menuOpen, setMenuOpen }: any) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  });

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] blackdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="" className="font-mono text-2xl font-bold text-white">
            {' '}
            lemuelayala<span className="text-blue-500">.tech</span>
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

            <a
              href="#home"
              className="text-gary-300 hove:text-white transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
