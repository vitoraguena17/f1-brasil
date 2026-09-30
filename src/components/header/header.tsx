"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/contexts/language-context";
import { INTRO } from "@/constants/motion";
import { F1Logo } from "./logo";
import { LanguageSwitcher } from "./language-switch";
import { AboutPopover } from "./about-popover";

gsap.registerPlugin(useGSAP);

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { t } = useLanguage();

  useGSAP(() => {
    gsap.from(".gsap-header-item", {
      y: -20,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: INTRO.HEADER,
    });
  }, { scope: headerRef });

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full h-(--header-h) z-50 flex items-center justify-between px-6 md:px-12 lg:px-24 bg-[#f2f2f2]/80 text-zinc-900 backdrop-blur-md border-b border-zinc-200/50 transition-colors duration-500 theme-dark:bg-zinc-950/70 theme-dark:text-zinc-100 theme-dark:border-zinc-800/60"
    >
      <button type="button" onClick={() => lenis?.scrollTo(0, { duration: 1.5 })} aria-label={t("ui.backToTop")} className="gsap-header-item cursor-pointer">
        <F1Logo />
      </button>
      <div className="gsap-header-item flex items-center gap-4 md:gap-6">
        <AboutPopover />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
