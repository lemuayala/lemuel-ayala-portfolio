export const links = [
  { id: '#home', label: 'navbar.home' },
  { id: '#about', label: 'navbar.about' },
  { id: '#projects', label: 'navbar.projects' },
  { id: '#contact', label: 'navbar.contact' },
];

export const handleScroll = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
};

export const handleLinkClick = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  handleScroll(id);
};
