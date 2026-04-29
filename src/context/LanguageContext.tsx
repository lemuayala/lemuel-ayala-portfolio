import { createContext, useContext } from "react";
import { i18n, TFunction } from "i18next";

interface LanguageContextType {
  t: TFunction;
  changeLanguage: (lang: string) => void;
  i18n: i18n;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
