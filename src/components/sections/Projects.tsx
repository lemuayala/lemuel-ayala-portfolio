import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Project } from '../../types/project';
import { getProjects } from '../../utils/i18nContent';
import { contentReveal, sectionReveal } from '../../utils/motionPresets';

const ACCENTS = [
  {
    badge:
      'text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
    hover: '',
    glow: 'from-indigo-500/20 via-transparent to-transparent',
  },
  {
    badge:
      'text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
    hover: '',
    glow: 'from-indigo-500/20 via-transparent to-transparent',
  },
  {
    badge:
      'text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
    hover: '',
    glow: 'from-indigo-500/20 via-transparent to-transparent',
  },
  {
    badge:
      'text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
    hover: '',
    glow: 'from-indigo-500/20 via-transparent to-transparent',
  },
];

export const Projects = () => {
  const { t } = useLanguage();
  const projects = getProjects(t);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          {...sectionReveal}
          className="flex items-end justify-between mb-14 gap-6 flex-wrap"
        >
          <div>
            <span className="section-kicker mb-5">
              <Sparkles className="w-3 h-3" />
              02 — {t('navbar.projects')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 text-balance">
              {t('projects.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">
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
  project: Project;
  index: number;
  accent: (typeof ACCENTS)[number];
}) => {
  const { t } = useLanguage();
  const reverse = index % 2 === 1;
  const isInProgress = project.status === 'inProgress';
  const statusLabel = isInProgress
    ? t('projects.statusInProgress')
    : t('projects.statusCompleted');
  const hasPreview = Boolean(project.preview);
  const previewSrc = project.preview
    ? `${import.meta.env.BASE_URL}${project.preview.replace(/^\//, '')}`
    : undefined;
  const highlightRows = project.highlights
    ? [
        { label: t('projects.roleLabel'), value: project.highlights.role },
        { label: t('projects.impactLabel'), value: project.highlights.impact },
        { label: t('projects.scopeLabel'), value: project.highlights.scope },
      ]
    : [];

  return (
    <motion.article
      {...contentReveal}
      className="group grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-9"
    >
      {/* Visual: con PNG = foto; sin PNG = mockup navegador (mismo marco, sin glass-panel encima) */}
      <div
        className={`project-preview-frame relative aspect-video overflow-hidden rounded-3xl md:aspect-[16/10] lg:col-span-7 ${
          reverse ? 'lg:order-last' : ''
        } ${hasPreview ? 'siri-glow' : 'siri-glow siri-glow-skeleton'}`}
      >
        {hasPreview && previewSrc ? (
          <img
            src={previewSrc}
            alt={`${project.title} preview`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 z-[1] h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 z-[1]">
            <BrowserMockup index={index} title={project.title} />
          </div>
        )}

        <div
          className={`pointer-events-none absolute inset-0 z-[2] rounded-3xl ring-1 ring-inset ring-zinc-400/40 dark:ring-white/10`}
          aria-hidden
        />
        {!hasPreview && (
          <div
            className={`pointer-events-none absolute inset-0 z-[3] bg-gradient-to-tr ${accent.glow} opacity-14`}
            aria-hidden
          />
        )}
        {hasPreview && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-2/5 bg-gradient-to-t from-zinc-950/36 to-transparent"
            aria-hidden
          />
        )}

        <div className="absolute right-3 top-3 z-50 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full border border-zinc-900/10 bg-zinc-50/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap backdrop-blur-sm md:right-4 md:top-4 md:text-[10px] dark:border-white/10 dark:bg-zinc-950/70">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isInProgress
                ? 'animate-pulse bg-amber-400'
                : 'bg-emerald-400'
            }`}
          />
          <span className="text-zinc-700 dark:text-zinc-300">
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className={`lg:col-span-5 ${reverse ? 'lg:pr-6' : 'lg:pl-6'}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] rounded-full border border-zinc-900/10 dark:border-white/10 bg-zinc-900/4 dark:bg-white/6 text-zinc-600 dark:text-zinc-300">
            {project.technologies?.[0] ?? 'Project'}
          </span>
          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-zinc-500">
            0{index + 1}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl md:text-[1.9rem] font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
          {project.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed text-sm md:text-[15px]">
          {project.description}
        </p>

        {highlightRows.length > 0 && (
          <div className="mb-6 grid gap-2 sm:grid-cols-3">
            {highlightRows.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-zinc-900/8 bg-zinc-900/[0.02] px-3 py-2.5 dark:border-white/8 dark:bg-white/[0.03]"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  {item.label}
                </p>
                <p className="mt-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}

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
              <FaGithub className="w-3.5 h-3.5" />
              {t('projects.viewCode')}
            </a>
          )}
          {project.links?.demo && project.links.demo !== '#' && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 transition-opacity text-xs font-semibold"
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
    'from-indigo-200/70 via-zinc-100 to-zinc-50 dark:from-indigo-900/35 dark:via-zinc-900 dark:to-zinc-900',
    'from-violet-200/65 via-zinc-100 to-zinc-50 dark:from-violet-900/35 dark:via-zinc-900 dark:to-zinc-900',
    'from-slate-200/70 via-zinc-100 to-zinc-50 dark:from-slate-800/45 dark:via-zinc-900 dark:to-zinc-900',
    'from-indigo-200/60 via-zinc-100 to-zinc-50 dark:from-indigo-900/30 dark:via-zinc-900 dark:to-zinc-900',
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
