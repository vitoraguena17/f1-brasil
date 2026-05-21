"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#f2f2f2] text-zinc-500 py-8 border-t border-zinc-200/80">
      <div className="max-w-350 mx-auto px-6 flex flex-col items-center justify-center text-center gap-3">
        
        <p className="text-xs tracking-widest font-medium uppercase text-zinc-400">
          {t('ui.developedBy')}
        </p>

        <a href="https://vitoraguena17.github.io/Personal-Portfolio/" target="_blank" rel="noopener noreferrer"className="transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95 block cursor-pointer">
          
          <div className="w-60 md:w-96 h-10 md:h-14 flex items-center justify-center overflow-hidden relative">
            <Image
              src="/logo/VA-logo-desktop.svg"
              alt="Logo Vitu"
              width={842}
              height={595}
              className="w-full h-auto object-contain transform-gpu translate-y-[8.6%]"
              priority
            />
          </div>
        </a>

      </div>
    </footer>
  );
}