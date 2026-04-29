import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Project } from '../../types/project';

type ExtendedProject = Project & {
  preview?: string;
  features?: string[];
};

const ACCENTS = [
  {
    badge:
      'text-blue-600 dark:text-blue-300 bg-blue-500/10 border-blue-500/20',
    hover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    glow: 'from-blue-500/20 via-transparent to-transparent',
  },
  {
    badge:
      'text-purple-600 dark:text-purple-300 bg-purple-500/10 border-purple-500/20',
    hover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
    glow: 'from-purple-500/20 via-transparent to-transparent',
  },
  {
    badge:
      'text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
    hover: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
    glow: 'from-cyan-500/20 via-transparent to-transparent',
  },
  {
    badge:
      'text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    hover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    glow: 'from-emerald-500/20 via-transparent to-transparent',
  },
];

export const Projects = () => {
  const { t } = useLanguage();
  const projects = t('projects.items', {
    returnObjects: true,
  }) as unknown as ExtendedProject[];

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-14 gap-6 flex-wrap"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[10px] uppercase tracking-[0.2em] font-mono text-zinc-600 dark:text-zinc-400 mb-5">
              <Sparkles className="w-3 h-3" />
              02 — {t('navbar.projects')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-balance">
              {t('projects.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-base md:text-lg leading-relaxed">
              {t('projects.subtitle')}
            </p>
          </div>
          <a
            href="https://github.com/lemuayala"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            {t('projects.viewAll')}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Projects */}
        <div className="space-y-14 md:space-y-24">
          {projects.map((project, index) => (
            <FeatureProject
              key={project.id}
              project={project}
              index={index}
              accent={ACCENTS[index % ACCENTS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureProject = ({
  project,
  index,
  accent,
}: {
  project: ExtendedProject;
  index: number;
  accent: (typeof ACCENTS)[number];
}) => {
  const { t } = useLanguage();
  const reverse = index % 2 === 1;
  const isInProgress =
    project.status === 'in-progress' || project.status === 'en-progreso';
  const hasPreview = Boolean(project.preview);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
    >
      {/* Visual */}
      <div
        className={`lg:col-span-7 ${
          reverse ? 'lg:order-last' : ''
        } relative aspect-video overflow-hidden rounded-3xl glass-panel siri-glow ${
          hasPreview ? '' : 'siri-glow-skeleton'
        } md:aspect-[16/10]`}
      >
        {/* Borde interior continuo; por encima del mockup (header z-20) pero debajo del Siri z-40 */}
        <div
          className="pointer-events-none absolute inset-0 z-[36] rounded-3xl ring-1 ring-inset ring-zinc-400/55 dark:ring-white/12"
          aria-hidden
        />

        <div
          className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr ${accent.glow} opacity-60`}
        />

        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div
            className={`absolute inset-0 ${
              hasPreview
                ? 'transition-transform duration-700 ease-out group-hover:scale-[1.04]'
                : ''
            }`}
          >
            {project.preview ? (
              <img
                src={project.preview}
                alt={`${project.title} preview`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <BrowserMockup index={index} title={project.title} />
            )}
          </div>
        </div>

        {/* Status badge — por encima del anillo Siri (z-40) */}
        <div className="absolute top-4 right-4 z-50 inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[10px] uppercase tracking-wider font-mono">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isInProgress
                ? 'bg-amber-400 animate-pulse'
                : 'bg-emerald-400'
            }`}
          />
          <span className="text-zinc-700 dark:text-zinc-300">
            {project.status}
          </span>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-200/50 dark:from-zinc-950/40 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Content */}
      <div
        className={`lg:col-span-5 ${reverse ? 'lg:pr-6' : 'lg:pl-6'}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] rounded-full border ${accent.badge}`}
          >
            {project.technologies?.[0] ?? 'Project'}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] font-mono text-zinc-500">
            0{index + 1}
          </span>
        </div>

        <h3
          className={`text-2xl md:text-3xl font-bold tracking-tight mb-4 transition-colors duration-300 ${accent.hover}`}
        >
          {project.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed text-sm md:text-[15px]">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-7">
          {project.technologies.slice(0, 6).map((tech, i, arr) => (
            <span
              key={tech}
              className="inline-flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium"
            >
              {tech}
              {i < Math.min(arr.length, 6) - 1 && (
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
              )}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill hover:bg-zinc-900/5 dark:hover:bg-white/10 transition-colors text-xs font-medium text-zinc-700 dark:text-zinc-200"
            >
              <Github className="w-3.5 h-3.5" />
              {t('projects.viewCode')}
            </a>
          )}
          {project.links?.demo && project.links.demo !== '#' && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:scale-[1.03] transition-transform text-xs font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t('projects.liveDemo')}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/** Decorative browser mockup for projects without a preview image. */
const BrowserMockup = ({
  index,
  title,
}: {
  index: number;
  title: string;
}) => {
  const variants = [
    'from-purple-200/70 via-zinc-100 to-zinc-50 dark:from-purple-900/40 dark:via-zinc-900 dark:to-zinc-900',
    'from-blue-200/70 via-zinc-100 to-zinc-50 dark:from-blue-900/40 dark:via-zinc-900 dark:to-zinc-900',
    'from-cyan-200/70 via-zinc-100 to-zinc-50 dark:from-cyan-900/40 dark:via-zinc-900 dark:to-zinc-900',
    'from-emerald-200/70 via-zinc-100 to-zinc-50 dark:from-emerald-900/40 dark:via-zinc-900 dark:to-zinc-900',
  ];
  const bgGradient = variants[index % variants.length];

  return (
    <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900">
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 z-10 flex h-10 items-center gap-2 border-b border-zinc-200/90 bg-white/95 px-4 backdrop-blur-md dark:border-white/5 dark:bg-zinc-950/80">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 dark:bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 dark:bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 dark:bg-green-500/70" />
        <span className="ml-3 text-[10px] font-mono text-zinc-500 dark:text-zinc-500 truncate">
          {title.toLowerCase().replace(/\s+/g, '-')}
          .vercel.app
        </span>
      </div>

      {/* Sidebar */}
      <div className="absolute top-10 left-0 w-44 bottom-0 border-r border-zinc-200/80 dark:border-white/5 bg-zinc-50/95 dark:bg-zinc-950/40 p-3.5 hidden md:flex flex-col gap-2.5">
        <div className="w-full h-7 rounded-md bg-zinc-200/90 dark:bg-white/5" />
        <div className="w-3/4 h-3 rounded bg-zinc-200/80 dark:bg-white/5" />
        <div className="w-1/2 h-3 rounded bg-zinc-200/70 dark:bg-white/5" />
        <div className="mt-3 w-full h-3 rounded bg-zinc-200/80 dark:bg-white/5" />
        <div className="w-2/3 h-3 rounded bg-zinc-200/70 dark:bg-white/5" />
      </div>

      {/* Body */}
      <div
        className={`absolute top-10 right-0 bottom-0 left-0 md:left-44 bg-gradient-to-br ${bgGradient} p-6`}
      >
        <div className="mb-4 h-7 w-1/3 rounded-lg border border-zinc-300/70 bg-white/70 dark:border-white/10 dark:bg-white/10" />
        <div className="grid h-[calc(100%-3rem)] grid-cols-3 gap-3">
          <div className="col-span-2 row-span-2 rounded-xl border border-zinc-300/60 bg-white/60 dark:border-white/10 dark:bg-white/5" />
          <div className="rounded-xl border border-zinc-300/60 bg-white/60 dark:border-white/10 dark:bg-white/5" />
          <div className="rounded-xl border border-zinc-300/60 bg-white/60 dark:border-white/10 dark:bg-white/5" />
          <div className="col-span-3 mt-auto h-12 rounded-xl border border-zinc-300/60 bg-white/60 dark:border-white/10 dark:bg-white/5" />
        </div>
      </div>
    </div>
  );
};
