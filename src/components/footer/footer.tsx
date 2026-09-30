"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

const PORTFOLIO_URL = "https://vitoraguena17.github.io/Personal-Portfolio/";
const CONTACT_URL = `${PORTFOLIO_URL}#contato`;

export function Footer() {
  const { t } = useLanguage();
  const [contactBefore, contactAfter] = t("footer.contact").split("{link}");

  return (
    // pb extra no celular para o aviso não ficar escondido atrás do player fixo
    <footer className="w-full bg-[#f2f2f2] text-zinc-500 pt-8 pb-24 sm:pb-10 border-t border-zinc-200/80">
      <div className="max-w-350 mx-auto px-6 flex flex-col items-center justify-center text-center gap-3">
        <p className="text-xs tracking-widest font-medium uppercase text-zinc-400">
          {t("ui.developedBy")}
        </p>

        <a
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-[opacity,scale] duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
        >
          <div className="w-60 md:w-96 h-10 md:h-14 flex items-center justify-center overflow-hidden relative">
            <Image
              src="/logo/VA-logo-desktop.svg"
              alt={t("ui.logoAlt")}
              width={842}
              height={595}
              className="w-full h-auto object-contain transform-gpu translate-y-[8.6%]"
            />
          </div>
        </a>

        <div className="mt-6 max-w-2xl border-t border-zinc-200 pt-6 space-y-2 text-[11px] md:text-xs leading-relaxed text-zinc-500">
          <p>{t("footer.disclaimer")}</p>
          <p>
            {contactBefore}
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 underline decoration-zinc-400 underline-offset-2 transition-colors hover:text-green-600 hover:decoration-green-500"
            >
              {t("footer.contactLink")}
            </a>
            {contactAfter}
          </p>
          <p>{t("footer.affiliation")}</p>
        </div>
      </div>
    </footer>
  );
}
