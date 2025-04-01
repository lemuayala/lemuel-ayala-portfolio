import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact',
      },
      home: {
        hi: 'Hola, soy Lemuel Ayala',
      },
    },
  },
  es: {
    translation: {
      navbar: {
        home: 'Inicio',
        about: 'Sobre mí',
        projects: 'Proyectos',
        contact: 'Contacto',
      },
      home: {
        hi: "Hi, I'm Lemuel Ayala",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Idioma predeterminado
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
