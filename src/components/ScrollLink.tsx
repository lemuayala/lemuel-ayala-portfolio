import { handleLinkClick } from '../utils/navigation';
import { useTranslation } from 'react-i18next';

interface ScrollLinkProps {
  id: string;
  labelKey: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const ScrollLink = ({
  id,
  labelKey,
  className = '',
  variant,
}: ScrollLinkProps) => {
  const { t } = useTranslation();

  const variants = {
    primary:
      'py-3 px-6 font-medium transition-all duration-200 hover:-translate-y-0.5 bg-blue-500 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]',
    secondary:
      'py-3 px-6 font-medium transition-all duration-200 hover:-translate-y-0.5 border border-blue-500/50 text-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:bg-blue-500/50',
    default: 'hover:text-white transition-colors',
  };

  return (
    <a
      href={id}
      onClick={(e) => handleLinkClick(e, id)}
      className={`${
        variant ? variants[variant] : variants.default
      } ${className}`}
    >
      {t(labelKey)}
    </a>
  );
};
