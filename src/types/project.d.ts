export type Project = {
  id: string;
  title: string;
  description: string;
  status: string;
  technologies: string[];
  links: {
    repo: string;
    demo: string;
  };
  preview?: string;
};
