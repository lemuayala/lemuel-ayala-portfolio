import type { TechStackItem } from '../constants/techStack';

type TechMarqueeProps = {
  items: TechStackItem[];
  mobileItems?: TechStackItem[];
};

/** Banda horizontal infinita con iconos de stack (estilo glass-ui + pills originales). */
export const TechMarquee = ({ items, mobileItems = items }: TechMarqueeProps) => {
  if (items.length === 0) return null;

  const track = [...items, ...items];
  const mobileTrack = mobileItems;

  return (
    <div
      className="marquee-mask relative mt-6 w-full overflow-hidden py-1.5 sm:mt-8 sm:py-2 md:mt-10"
      role="region"
      aria-label="Stack tecnológico"
    >
      <div className="marquee-track flex w-max items-center gap-3 md:hidden">
        {mobileTrack.map(({ label, Icon, color }, index) => (
          <span
            key={`${label}-mobile-${index}`}
            className="marquee-chip inline-flex items-center gap-2 normal-case tracking-normal"
          >
            <Icon className={`h-4 w-4 shrink-0 ${color}`} aria-hidden />
            <span className="text-xs font-medium sm:text-sm">{label}</span>
          </span>
        ))}
      </div>
      <div className="marquee-track hidden w-max items-center gap-3 md:flex">
        {track.map(({ label, Icon, color }, index) => (
          <span
            key={`${label}-${index}`}
            className="marquee-chip inline-flex items-center gap-2 normal-case tracking-normal"
          >
            <Icon className={`h-4 w-4 shrink-0 ${color}`} aria-hidden />
            <span className="text-xs font-medium sm:text-sm">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
