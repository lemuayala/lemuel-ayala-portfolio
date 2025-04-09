import { useLanguage } from '../../context/LanguageContext';
import { Project } from '../../types/project';
import { RevealOnScroll } from '../RevealOnScroll';
import { ProjectCard } from '../ProjectCard';

export const Projects = () => {
  const { t } = useLanguage();
  const projects = t('projects.items') as Object as Project[];

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-5xl mx-auto px-4 w-full">
        <RevealOnScroll>
          <div>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
              {t('projects.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-12 text-center max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
