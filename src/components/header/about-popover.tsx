"use client";
import { useLanguage } from "@/contexts/language-context";

const POPOVER_ID = "about-popover";
const PORTFOLIO_URL = "https://vitoraguena17.github.io/Personal-Portfolio/";
const TECHNOLOGIES = ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Lenis"];

/**
 * Botão "i" + card "Sobre o projeto".
 * Usa a Popover API nativa: Esc e clique fora fecham sozinhos, e o card fica na top layer
 * (acima do grão, do player e do header) sem brigar com z-index.
 */
export function AboutPopover() {
  const { t } = useLanguage();
  const [bodyBefore, bodyAfter] = t("about.body").split("{name}");

  return (
    <>
      <button
        type="button"
        popoverTarget={POPOVER_ID}
        aria-label={t("about.title")}
        className="flex items-center justify-center text-zinc-800 transition-[color,scale] duration-300 hover:text-green-600 hover:scale-110 cursor-pointer theme-dark:text-zinc-200 theme-dark:hover:text-green-400"
      >
        {/* Círculo e "i" no mesmo traço, para lerem como um ícone só */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 11v5.5" /><path d="M12 7.5h.01" strokeWidth="2.5" />
        </svg>
      </button>

      <div
        id={POPOVER_ID}
        popover="auto"
        role="dialog"
        aria-labelledby={`${POPOVER_ID}-title`}
        className="fixed inset-auto top-[calc(var(--header-h)+0.75rem)] right-4 md:right-12 lg:right-24 m-0 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl p-6 text-left text-zinc-400 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] origin-top-right transition-[opacity,scale,translate,display,overlay] transition-discrete duration-300 ease-out opacity-0 scale-95 -translate-y-1 open:opacity-100 open:scale-100 open:translate-y-0 starting:open:opacity-0 starting:open:scale-95 starting:open:-translate-y-1"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={`${POPOVER_ID}-title`} className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-100">
            {t("about.title")}
          </h2>
          <button
            type="button"
            popoverTarget={POPOVER_ID}
            popoverTargetAction="hide"
            aria-label={t("about.close")}
            className="-mt-1 -mr-1 p-1 text-zinc-500 transition-colors hover:text-zinc-200 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed">
          {bodyBefore}
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold bg-linear-to-r from-green-500 to-yellow-400 bg-clip-text text-transparent transition-opacity hover:opacity-80"
          >
            Vitor Aguena
          </a>
          {bodyAfter}
        </p>

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">{t("about.techTitle")}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {TECHNOLOGIES.map((tech) => (
            <li key={tech} className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-300">
              {tech}
            </li>
          ))}
        </ul>

        <p className="mt-6 border-t border-zinc-800 pt-4 text-[11px] leading-relaxed text-zinc-500">{t("about.credits")}</p>
      </div>
    </>
  );
}
