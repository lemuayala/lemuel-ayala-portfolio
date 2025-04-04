import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-700/50 dark:border-gray-200/10 backdrop-blur-sm py-8 w-full">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo y derechos */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Lemuel Ayala
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              © {new Date().getFullYear()} - Todos los derechos reservados
            </p>
          </div>

          {/* Redes sociales y contacto */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-4">
              <a
                href="https://github.com/lemuayala"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com/in/lemuayala"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a
                href="mailto:lemuayala@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                aria-label="Email"
              >
                <SiGmail className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700/20 dark:border-gray-200/10 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500 inline-flex items-baseline">
            Diseñado y desarrollado con ❤️ usando React y Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
