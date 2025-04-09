import { motion } from 'framer-motion';
import { Code, ExternalLink, Loader, CheckCircle } from 'lucide-react';
import { Project } from '../types/project';
import { useLanguage } from '../context/LanguageContext';

export const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const { t } = useLanguage();
  const isInProgress = project.status === t('projects.inProgress');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -3 }}
      className="rounded-xl overflow-hidden shadow-md border border-gray-300/80 dark:border-gray-200/10 hover:shadow-lg transition-all duration-300"
    >
      <div className="h-48 relative">
        {project.preview ? (
          <img
            src={project.preview}
            alt="Project Preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500" />
        )}
        <div
          className={`absolute top-4 right-4 flex items-center px-3 py-1 rounded-full text-sm ${
            isInProgress
              ? 'bg-yellow-100 dark:bg-purple-900 text-yellow-800 dark:text-yellow-100'
              : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
          }`}
        >
          {isInProgress ? (
            <Loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <CheckCircle className="w-4 h-4 mr-2" />
          )}
          {project.status}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-4">
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <Code className="w-5 h-5 mr-2" />
            {t('projects.viewCode')}
          </a>
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            {t('projects.liveDemo')}
          </a>
        </div>
      </div>
    </motion.div>
  );
};
