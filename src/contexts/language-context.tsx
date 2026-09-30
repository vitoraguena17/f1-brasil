"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import pt from "@/locales/pt.json";
import en from "@/locales/en.json";

type Language = "PT" | "EN";
type Dictionary = { [key: string]: string | Dictionary };

const dictionaries: Record<Language, Dictionary> = { PT: pt, EN: en };
const htmlLang: Record<Language, string> = { PT: "pt-BR", EN: "en" };

// Tempo do fade-out antes de trocar o texto (casa com o duration-500 do wrapper)
const FADE_OUT_MS = 400;

function getNestedValue(obj: Dictionary, path: string): string | undefined {
  let current: string | Dictionary | undefined = obj;
  for (const part of path.split(".")) {
    if (typeof current !== "object") return undefined;
    current = current[part];
  }
  return typeof current === "string" ? current : undefined;
}

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("PT");
  const [isChanging, setIsChanging] = useState(false);
  const isChangingRef = useRef(false);

  useEffect(() => {
    document.documentElement.lang = htmlLang[language];
  }, [language]);

  const toggleLanguage = useCallback(() => {
    if (isChangingRef.current) return;
    isChangingRef.current = true;
    setIsChanging(true);

    setTimeout(() => {
      setLanguage((prev) => (prev === "PT" ? "EN" : "PT"));
      requestAnimationFrame(() => {
        isChangingRef.current = false;
        setIsChanging(false);
      });
    }, FADE_OUT_MS);
  }, []);

  const t = useCallback((key: string) => getNestedValue(dictionaries[language], key) ?? key, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div className={`transition-opacity duration-500 ease-in-out ${isChanging ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  return context;
}
