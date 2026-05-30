export type WorkJob = {
  company: string;
  position: string;
  date: string;
  description?: string;
  technologies?: string;
  client?: string;
};

export type CertificationItem = {
  institution: string;
  course?: string;
  courses?: string[];
};
