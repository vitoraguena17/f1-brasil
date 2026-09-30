"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { INTRO } from "@/constants/motion";

gsap.registerPlugin(useGSAP);

interface EditorialTitleProps {
  topWord: string;
  middleWord: string;
  bottomWord: string;
}

const WORD_SIZE = "text-[15.5vw] md:text-[9.5vw] lg:text-[8vw] xl:text-[7.5vw]";

export function EditorialTitle({ topWord, middleWord, bottomWord }: EditorialTitleProps) {
  const container = useRef<HTMLHeadingElement>(null);
  // Marcado no onStart (e não no início do efeito) para sobreviver ao double-invoke do StrictMode
  const introStarted = useRef(false);

  useGSAP(() => {
    if (!introStarted.current) {
      gsap.fromTo(".gsap-reveal",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "power4.out", delay: INTRO.TITLE,
          onStart: () => { introStarted.current = true; },
        }
      );
    } else {
      // Troca de idioma: as palavras sobem de novo dentro das máscaras
      gsap.fromTo(".gsap-reveal",
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true }
      );
    }
  }, { scope: container, dependencies: [topWord, middleWord, bottomWord] });

  return (
    <h1 ref={container} className="flex flex-col items-start leading-[0.85] md:leading-[0.8] uppercase whitespace-nowrap">
      <span className="block overflow-hidden pb-2">
        <span className={`gsap-reveal block ${WORD_SIZE} opacity-30`}>{topWord}</span>
      </span>
      <span className="flex items-baseline gap-3 md:gap-6 lg:gap-8 mt-2 md:mt-0">
        <span className="block overflow-hidden pb-4">
          <span className="gsap-reveal block font-cursive italic lowercase tracking-normal text-3xl md:text-5xl lg:text-6xl xl:text-7xl opacity-80">
            {middleWord}
          </span>
        </span>
        <span className="block overflow-hidden pb-2">
          <span className={`gsap-reveal block ${WORD_SIZE} opacity-95`}>{bottomWord}</span>
        </span>
      </span>
    </h1>
  );
}
