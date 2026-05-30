import type { WorkJob } from '../types/content';

const shortCompany = (company: string) =>
  company.split('(')[0].trim().replace(/"/g, '\\"');

export const buildExperienceCode = (
  jobs: WorkJob[],
  lang: 'en' | 'es'
): string => {
  const entries = jobs
    .map((job) => {
      const company = shortCompany(job.company);
      const role = job.position.replace(/"/g, '\\"');
      const period = job.date.replace(/"/g, '\\"');
      return lang === 'en'
        ? `  { company: "${company}", role: "${role}", period: "${period}" },`
        : `  { empresa: "${company}", rol: "${role}", periodo: "${period}" },`;
    })
    .join('\n');

  return lang === 'en'
    ? `const journey = [\n${entries}\n];

// Clients: Worldsys · YPF · Uber · Mercado Libre · Ficohsa`
    : `const trayectoria = [\n${entries}\n];

// Clientes: Worldsys · YPF · Uber · Mercado Libre · Ficohsa`;
};
