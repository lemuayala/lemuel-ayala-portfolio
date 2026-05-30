import type { MouseEvent } from 'react';

export const links = [
  { id: '#home', label: 'navbar.home' },
  { id: '#about', label: 'navbar.about' },
  { id: '#projects', label: 'navbar.projects' },
  { id: '#contact', label: 'navbar.contact' },
];

export const scrollToSection = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
};

export const handleLinkClick = (e: MouseEvent, id: string) => {
  e.preventDefault();
  scrollToSection(id);
};
