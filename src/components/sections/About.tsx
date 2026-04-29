import { Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Layout,
  Server,
  Sparkles,
  Wrench,
} from 'lucide-react';
import {
  SiGit,
  SiDocker,
  SiPostman,
  SiAzuredevops,
  SiJira,
} from 'react-icons/si';
import { useLanguage } from '../../context/LanguageContext';
import { CodeEditor } from '../CodeEditor';

type Job = {
  company: string;
  position: string;
  date: string;
  description?: string;
  technologies: string;
  client: string;
};

type CertItem = {
  institution: string;
  course?: string;
  courses?: string[];
};

export const About = () => {
  const { t } = useLanguage();

  const jobs = t('about.work.jobs', { returnObjects: true }) as unknown as Job[];
  const certifications = t('about.certifications.list', {
    returnObjects: true,
  }) as unknown as CertItem[];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[10px] uppercase tracking-[0.2em] font-mono text-zinc-600 dark:text-zinc-400 mb-5">
            <Sparkles className="w-3 h-3" />
            01 — {t('navbar.about')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            {t('experience.title')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-base md:text-lg text-pretty leading-relaxed">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-[minmax(180px,auto)]">
          {/* Backend - large */}
          <BentoCard
            className="md:col-span-2 md:row-span-2 relative overflow-hidden"
            delay={0}
          >
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700" />
            <div className="relative flex flex-col h-full justify-between gap-8">
              <div>
                <IconBadge color="purple">
                  <Server className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                </IconBadge>
                <h3 className="text-2xl font-bold mb-3 mt-5 tracking-tight">
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
                {['.NET 8', 'Entity Framework', 'SQL Server', 'CQRS', 'Dapper'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-zinc-900/5 dark:bg-zinc-900/80 border border-zinc-900/5 dark:border-white/5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </BentoCard>

          {/* Frontend - small */}
          <BentoCard delay={0.1}>
            <IconBadge color="blue">
              <Layout className="w-5 h-5 text-blue-500 dark:text-blue-300" />
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
            className="flex flex-col justify-center items-center text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="relative text-6xl font-black text-gradient leading-none">
              +6
            </h3>
            <p className="relative text-zinc-600 dark:text-zinc-400 font-medium tracking-wide uppercase text-[11px] mt-3 max-w-[14ch]">
              {t('experience.yearsLabel')}
            </p>
          </BentoCard>

          {/* Tools - wide */}
          <BentoCard
            delay={0.2}
            className="md:col-span-3 flex items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4 min-w-0">
              <IconBadge color="amber">
                <Wrench className="w-5 h-5 text-amber-500 dark:text-amber-300" />
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
            <div className="hidden sm:flex items-center gap-5 opacity-70 group-hover:opacity-100 transition-opacity duration-500 shrink-0 text-zinc-700 dark:text-zinc-300">
              <SiGit className="w-6 h-6" title="Git" />
              <SiDocker className="w-6 h-6" title="Docker" />
              <SiAzuredevops className="w-6 h-6" title="Azure DevOps" />
              <SiPostman className="w-6 h-6" title="Postman" />
              <SiJira className="w-6 h-6" title="Jira" />
            </div>
          </BentoCard>
        </div>

        {/* Interactive Code Editor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-[10px] uppercase tracking-[0.2em] font-mono text-zinc-600 dark:text-zinc-400 mb-3">
                <Sparkles className="w-3 h-3" />
                interactive
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                {t('codeEditor.title')}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm md:text-base">
                {t('codeEditor.subtitle')}
              </p>
            </div>
          </div>
          <CodeEditor />
        </motion.div>

        {/* About description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          <div className="glass-panel rounded-3xl p-7 lg:col-span-1">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-zinc-500">
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
                <GraduationCap className="w-5 h-5 text-emerald-500 dark:text-emerald-300" />
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
                  {t('about.education.universidad')} · 2024
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
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-mono text-zinc-500 mb-3">
                {t('experience.certificationsTitle')}
              </h4>
              <ul className="space-y-2">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="text-xs">
                    <span className="text-blue-500 dark:text-blue-400 font-semibold">
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
                <Briefcase className="w-5 h-5 text-cyan-500 dark:text-cyan-300" />
              </IconBadge>
              <h3 className="text-base font-bold tracking-tight">
                {t('experience.workTitle')}
              </h3>
            </div>

            <ol className="relative space-y-5 pl-5 before:content-[''] before:absolute before:left-1 before:top-1.5 before:bottom-1.5 before:w-px before:bg-gradient-to-b before:from-blue-400/40 before:via-purple-400/30 before:to-transparent">
              {jobs.slice(0, 5).map((job, index) => (
                <li key={index} className="relative">
                  <span className="absolute -left-[1.1rem] top-1.5 w-2 h-2 rounded-full bg-blue-400 ring-4 ring-blue-400/15" />
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {job.position}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {job.company}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider font-mono text-zinc-500">
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
  blue: 'bg-blue-500/10 border-blue-500/20',
  purple: 'bg-purple-500/10 border-purple-500/20',
  emerald: 'bg-emerald-500/10 border-emerald-500/20',
  cyan: 'bg-cyan-500/10 border-cyan-500/20',
  amber: 'bg-amber-500/10 border-amber-500/20',
};

const IconBadge = ({
  children,
  color = 'blue',
}: {
  children: React.ReactNode;
  color?: keyof typeof colorMap;
}) => (
  <div
    className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${colorMap[color]}`}
  >
    {children}
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
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`group glass-panel rounded-3xl p-7 hover-glow ${className}`}
  >
    {children}
  </motion.div>
);
