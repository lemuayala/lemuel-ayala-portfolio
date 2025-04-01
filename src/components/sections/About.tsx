import { Trans } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { RevealOnScroll } from '../RevealOnScroll';

export const About = () => {
  const frontendSkills = [
    'Angular',
    'React',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Material UI',
    'Bootstrap',
    'JQuery',
    'Tailwind CSS',
  ];
  const backendSkills = [
    '.NET Core',
    '.NET Framework',
    'ASP.NET MVC',
    'Web API',
    ' RESTful APIs',
    'Entity Framework',
    'LINQ',
    'SQL Server',
  ];

  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            {t('about.about')}
          </h2>
          <div className="rounded-xl p-8 border-black/10 dark:border-white/10 border hover:-translate-y-1 transition-all">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <Trans i18nKey="about.description"></Trans>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 hover:-translate-y-l transition-all">
                <h3 className="text-xl font-bold mb-4">
                  {t('about.frontend')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-purple-900/10 dark:bg-blue-500/10 text-blue-900 dark:text-blue-500 rounded-full px-3 py-1 text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,2246,0.2)] transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-l transition-all">
                <h3 className="text-xl font-bold mb-4">{t('about.backend')}</h3>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-purple-900/10 dark:bg-blue-500/10 text-blue-900 dark:text-blue-500 rounded-full px-3 py-1 text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,2246,0.2)] transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-xl border-black/10 dark:border-white/10 border hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">
                  {t('about.education.education')}
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-x-2">
                  <li className="mb-2">
                    <strong> {t('about.education.apu')} </strong> -{' '}
                    {t('about.education.universidad')} 2021
                  </li>
                  <li className="mb-2">
                    <strong> {t('about.education.tecnico')} </strong> -{' '}
                    {t('about.education.edm')}
                  </li>
                  <li className="mb-2">
                    Relevant Coursework - Programming Languages, Databases,
                    Algorithms, Software Engineering, Web Development, etc.
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border-black/10 dark:border-white/10 border hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Work Experience</h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <div>
                    <h4>Junior Software Developer (2021 - Present)</h4>
                    <p>
                      Responsible for the development and maintenance of a
                      scalable and user-friendly web application. Collaborated
                      with cross-functional teams to deliver high-quality
                      software solutions.
                    </p>
                  </div>
                  <div>
                    <h4>Junior Software Developer (2021 - Present)</h4>
                    <p>
                      Responsible for the development and maintenance of a
                      scalable and user-friendly web application. Collaborated
                      with cross-functional teams to deliver high-quality
                      software solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
