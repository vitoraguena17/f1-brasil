"use client";
import { useLanguage } from "@/contexts/language-context";

const ACTIVE = "text-zinc-900 font-bold theme-dark:text-white";
const INACTIVE = "text-zinc-400 theme-dark:text-zinc-500";

export function LanguageSwitcher() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t("ui.switchLanguage")}
      className="flex items-center gap-2 text-[10px] md:text-xs font-medium uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
    >
      <span className={`transition-colors duration-300 ${language === "PT" ? ACTIVE : INACTIVE}`}>PT</span>
      <span className="text-zinc-300 theme-dark:text-zinc-700" aria-hidden="true">/</span>
      <span className={`transition-colors duration-300 ${language === "EN" ? ACTIVE : INACTIVE}`}>EN</span>
    </button>
  );
}
