import type { TFunction } from 'i18next';
import type { Project } from '../types/project';
import type { CertificationItem, WorkJob } from '../types/content';

const getList = <T,>(t: TFunction, key: string): T[] =>
  t(key, { returnObjects: true }) as T[];

export const getWorkJobs = (t: TFunction) =>
  getList<WorkJob>(t, 'about.work.jobs');

export const getCertifications = (t: TFunction) =>
  getList<CertificationItem>(t, 'about.certifications.list');

export const getProjects = (t: TFunction) =>
  getList<Project>(t, 'projects.items');

