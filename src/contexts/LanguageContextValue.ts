import { createContext } from "react";

type Language = "fr" | "en";

type TranslationValue = string | Record<string, string>;

export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (value: TranslationValue) => string;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
