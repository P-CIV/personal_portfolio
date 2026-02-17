import { useState } from "react";
import { LanguageContext } from "./LanguageContextValue";

type TranslationValue = string | Record<string, string>;

const getStoredLanguage = (): 'fr' | 'en' => {
  try {
    const stored = localStorage.getItem("language") as 'fr' | 'en';
    return stored || "fr";
  } catch {
    return "fr";
  }
};

const setStoredLanguage = (lang: 'fr' | 'en'): void => {
  try {
    localStorage.setItem("language", lang);
  } catch {
    console.warn("localStorage is not available");
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'fr' | 'en'>(() => getStoredLanguage());

  const handleSetLanguage = (lang: 'fr' | 'en'): void => {
    setLanguage(lang);
    setStoredLanguage(lang);
  };

  const t = (value: TranslationValue): string => {
    if (typeof value === 'string') return value;
    return value[language] || value.en || Object.values(value)[0];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
