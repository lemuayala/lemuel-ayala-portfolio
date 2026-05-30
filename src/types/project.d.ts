export type Project = {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'inProgress';
  highlights?: {
    role: string;
    impact: string;
    scope: string;
  };
  technologies: string[];
  links: {
    repo: string;
    demo: string;
  };
  preview?: string;
};
