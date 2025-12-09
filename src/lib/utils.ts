import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const t = (translations: Record<string, string> | string) => {
  if (typeof translations === 'string') return translations;
  return translations.en || Object.values(translations)[0];
}
