import type { IconType } from 'react-icons';
import { BsFiletypeSql } from 'react-icons/bs';
import { SiAngular, SiDotnet, SiReact, SiTypescript } from 'react-icons/si';
import { TbBrandCSharp, TbBrandReactNative } from 'react-icons/tb';

export type TechStackItem = {
  label: string;
  Icon: IconType;
  color: string;
};

/** Stack del hero / marquee — iconos + etiquetas alineadas a home.techMarquee en i18n */
export const TECH_STACK: TechStackItem[] = [
  { label: 'Angular 20', Icon: SiAngular, color: 'text-[#DD0031]' },
  { label: 'Module Federation', Icon: SiAngular, color: 'text-[#DD0031]' },
  { label: 'React 19', Icon: SiReact, color: 'text-[#61DAFB]' },
  { label: 'TypeScript', Icon: SiTypescript, color: 'text-[#3178C6]' },
  { label: '.NET 9', Icon: SiDotnet, color: 'text-[#7B4DD6]' },
  { label: 'CQRS', Icon: TbBrandCSharp, color: 'text-[#239120]' },
  { label: 'Azure OpenAI', Icon: SiDotnet, color: 'text-[#7B4DD6]' },
  { label: 'SQL Server', Icon: BsFiletypeSql, color: 'text-[#CC2927]' },
  { label: 'React Native', Icon: TbBrandReactNative, color: 'text-[#61DAFB]' },
  { label: 'Tailwind CSS v4', Icon: SiReact, color: 'text-[#38BDF8]' },
  { label: 'Azure DevOps', Icon: SiDotnet, color: 'text-[#0078D4]' },
  { label: 'Semantic Kernel', Icon: SiDotnet, color: 'text-[#7B4DD6]' },
];

export const MAIN_TECH_STACK: TechStackItem[] = [
  { label: 'Angular', Icon: SiAngular, color: 'text-[#DD0031]' },
  { label: 'React', Icon: SiReact, color: 'text-[#61DAFB]' },
  { label: 'TypeScript', Icon: SiTypescript, color: 'text-[#3178C6]' },
  { label: '.NET', Icon: SiDotnet, color: 'text-[#7B4DD6]' },
];
