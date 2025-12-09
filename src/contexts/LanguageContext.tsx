import { useState } from "react";
import { LanguageContext } from "./LanguageContextValue";

type TranslationValue = string | Record<string, string>;

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'fr' | 'en'>(() => {
    const stored = localStorage.getItem("language") as 'fr' | 'en';
    return stored || "fr";
  });

  const handleSetLanguage = (lang: 'fr' | 'en') => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
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
