import { RevealOnScroll } from '../RevealOnScroll';

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl p-6 border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
              <h3 className="text-xl font-bold mb-2">Project 1</h3>
              <p className="ttext-gray-500 dark:text-gray-400 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nisl eget ultricies ultrices, nunc nisi aliquam nisl,
                euismod aliquet nisi nunc eu nisl. Donec euismod, nisl eget
                ultricies ultrices, nunc nisi aliquam nisl, euismod aliquet nisi
                nunc eu nisl.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  'Node.js',
                  'Express.js',
                  'MongoDB',
                  'React',
                  'Tailwind CSS',
                  'Next.js',
                  'TypeScript',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-500/10 text-blue-500 rounded-full px-3 py-1 text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,2246,0.1)] transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
