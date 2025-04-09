export type Project = {
  id: string;
  title: string;
  description: string;
  status: 'in-progress' | 'completed' | 'planned';
  technologies: string[];
  links: {
    repo: string;
    demo: string;
  };
};
