import { lazy, Suspense } from 'react';
import { Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Container,
  GitBranch,
  GraduationCap,
  KanbanSquare,
  Layout,
  ShieldCheck,
  Server,
  Sparkles,
  Workflow,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getCertifications, getWorkJobs } from '../../utils/i18nContent';
import { cardReveal, contentReveal, sectionReveal } from '../../utils/motionPresets';

const CodeEditor = lazy(() =>
  import('../CodeEditor').then((module) => ({ default: module.CodeEditor }))
);

export const About = () => {
  const { t } = useLanguage();

  const jobs = getWorkJobs(t);
  const certifications = getCertifications(t);

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          {...sectionReveal}
          className="mb-14"
        >
          <span className="section-kicker mb-5">
            <Sparkles className="w-3 h-3" />
            01 — {t('navbar.about')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            {t('experience.title')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm sm:text-base md:text-lg text-pretty leading-relaxed">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Bento: backend row-span-2 cubre la columna izquierda (sin hueco bajo la card) */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:items-stretch">
          {/* Backend */}
          <BentoCard
            className="relative overflow-hidden md:col-span-2 md:row-span-2"
            delay={0}
          >
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-700 group-hover:bg-indigo-500/16" />
            <div className="relative flex flex-col gap-5">
              <div>
                <IconBadge color="purple">
                  <Server className="w-5 h-5" />
                </IconBadge>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 mt-5 tracking-tight">
                  {t('experience.backendTitle')}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md text-sm sm:text-[15px]">
                  <Trans
                    i18nKey="experience.backendDesc"
                    components={{
                      strong: (
                        <strong className="text-zinc-900 dark:text-zinc-200 font-semibold" />
                      ),
                    }}
                  />
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['.NET 9', 'Entity Framework', 'SQL Server', 'CQRS', 'Dapper'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-zinc-900/5 dark:bg-zinc-900/80 border border-zinc-900/5 dark:border-white/5 text-[11px] font-medium tracking-[0.01em] text-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </BentoCard>

          {/* Frontend */}
          <BentoCard delay={0.1}>
            <IconBadge color="blue">
              <Layout className="w-5 h-5" />
            </IconBadge>
            <h3 className="text-lg font-bold mt-5 mb-2 tracking-tight">
              {t('experience.frontendTitle')}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              <Trans
                i18nKey="experience.frontendDesc"
                components={{
                  strong: (
                    <strong className="text-zinc-900 dark:text-zinc-200 font-semibold" />
                  ),
                }}
              />
            </p>
          </BentoCard>

          {/* Stats */}
          <BentoCard
            delay={0.15}
            className="relative flex flex-col items-center justify-center overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/6 via-transparent to-violet-500/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="relative text-6xl font-black text-gradient leading-none">
              +7
            </h3>
            <p className="relative text-zinc-600 dark:text-zinc-400 font-medium tracking-wide uppercase text-[11px] mt-3 max-w-[14ch]">
              {t('experience.yearsLabel')}
            </p>
          </BentoCard>

          {/* Tools - wide */}
          <BentoCard
            delay={0.2}
            className="flex items-center justify-between gap-6 md:col-span-3"
          >
            <div className="flex items-start gap-4 min-w-0">
              <IconBadge color="amber">
                <Wrench className="w-5 h-5" />
              </IconBadge>
              <div className="min-w-0">
                <h3 className="text-lg font-bold mb-1 tracking-tight">
                  {t('experience.toolsTitle')}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  {t('experience.toolsDesc')}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2.5 opacity-90 transition-opacity duration-500 shrink-0">
              {[
                { Icon: GitBranch, label: 'Git' },
                { Icon: Container, label: 'Docker' },
                { Icon: Workflow, label: 'CI/CD' },
                { Icon: ShieldCheck, label: 'Testing' },
                { Icon: KanbanSquare, label: 'Agile' },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-900/8 bg-zinc-900/[0.02] px-3 py-1.5 text-[11px] font-semibold tracking-[0.01em] text-zinc-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </BentoCard>
        </div>

        {/* Interactive Code Editor */}
        <motion.div
          {...contentReveal}
          className="mt-16"
        >
          <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
            <div>
              <span className="section-kicker mb-3">
                <Sparkles className="w-3 h-3" />
                interactive
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                {t('codeEditor.title')}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm md:text-base">
                {t('codeEditor.subtitle')}
              </p>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="glass-panel h-80 rounded-3xl animate-pulse" />
            }
          >
            <CodeEditor />
          </Suspense>
        </motion.div>

        {/* About description */}
        <motion.div
          {...contentReveal}
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          <div className="glass-panel rounded-3xl p-7 lg:col-span-1 hover-glow">
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-zinc-500">
              {t('about.about')}
            </span>
            <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm md:text-[15px]">
              <Trans
                i18nKey="about.description"
                components={{
                  strong: (
                    <strong className="text-zinc-900 dark:text-white font-semibold" />
                  ),
                }}
              />
            </p>
          </div>

          {/* Education + Certifications */}
          <div className="glass-panel rounded-3xl p-7 lg:col-span-1 hover-glow">
            <div className="flex items-center gap-3 mb-5">
              <IconBadge color="emerald">
                <GraduationCap className="w-5 h-5" />
              </IconBadge>
              <h3 className="text-base font-bold tracking-tight">
                {t('experience.educationTitle')}
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              <li>
                <strong className="block text-zinc-900 dark:text-white">
                  {t('about.education.licenciatura')}
                </strong>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs">
                  {t('about.education.universidad')} · 2024 ·{' '}
                  {t('about.education.inProgress')}
                </span>
              </li>
              <li>
                <strong className="block text-zinc-900 dark:text-white">
                  {t('about.education.apu')}
                </strong>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs">
                  {t('about.education.universidad')} · 2021
                </span>
              </li>
              <li>
                <strong className="block text-zinc-900 dark:text-white">
                  {t('about.education.tecnico')}
                </strong>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs">
                  {t('about.education.edm')}
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-zinc-900/5 dark:border-white/5">
              <h4 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-zinc-500 mb-3">
                {t('experience.certificationsTitle')}
              </h4>
              <ul className="space-y-2">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="text-xs">
                    <span className="text-indigo-500 dark:text-indigo-400 font-semibold">
                      {cert.institution}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {cert.course
                        ? ` · ${cert.course}`
                        : cert.courses
                        ? ` · ${cert.courses.length} cursos`
                        : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Career timeline */}
          <div className="glass-panel rounded-3xl p-7 lg:col-span-1 hover-glow">
            <div className="flex items-center gap-3 mb-5">
              <IconBadge color="cyan">
                <Briefcase className="w-5 h-5" />
              </IconBadge>
              <h3 className="text-base font-bold tracking-tight">
                {t('experience.workTitle')}
              </h3>
            </div>

            <ol className="relative space-y-5 pl-5 pr-1 before:content-[''] before:absolute before:left-1 before:top-1.5 before:bottom-1.5 before:w-px before:bg-gradient-to-b before:from-blue-400/40 before:via-purple-400/30 before:to-transparent">
              {jobs.map((job, index) => (
                <li key={`${job.company}-${job.date}`} className="relative">
                  <span
                    className={`absolute -left-[1.1rem] top-1.5 w-2 h-2 rounded-full ring-4 ${
                      index === 0
                        ? 'bg-emerald-400 ring-emerald-400/20'
                        : 'bg-blue-400 ring-blue-400/15'
                    }`}
                  />
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {job.position}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {job.company}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] font-semibold text-zinc-500">
                    {job.date}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------- helpers ---------- */

const colorMap = {
  blue: {
    shell:
      'bg-zinc-50/85 dark:bg-white/[0.03] border-zinc-900/10 dark:border-white/10',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  purple: {
    shell:
      'bg-zinc-50/85 dark:bg-white/[0.03] border-zinc-900/10 dark:border-white/10',
    icon: 'text-purple-600 dark:text-purple-400',
  },
  emerald: {
    shell:
      'bg-zinc-50/85 dark:bg-white/[0.03] border-zinc-900/10 dark:border-white/10',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  cyan: {
    shell:
      'bg-zinc-50/85 dark:bg-white/[0.03] border-zinc-900/10 dark:border-white/10',
    icon: 'text-cyan-600 dark:text-cyan-400',
  },
  amber: {
    shell:
      'bg-zinc-50/85 dark:bg-white/[0.03] border-zinc-900/10 dark:border-white/10',
    icon: 'text-amber-600 dark:text-amber-400',
  },
};

const IconBadge = ({
  children,
  color = 'blue',
}: {
  children: React.ReactNode;
  color?: keyof typeof colorMap;
}) => (
  <div
    className={`h-10 w-10 rounded-full border flex items-center justify-center ${colorMap[color].shell} shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_6px_16px_-12px_rgba(0,0,0,0.45)]`}
  >
    <span className={colorMap[color].icon}>{children}</span>
  </div>
);

const BentoCard = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    {...cardReveal(delay)}
    className={`group glass-panel rounded-3xl p-7 hover-glow ${className}`}
  >
    {children}
  </motion.div>
);
