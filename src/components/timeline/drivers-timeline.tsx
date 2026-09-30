"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TimelineTrack } from "../ui/timeline-track";
import { useSetActiveTrack } from "@/contexts/audio-context";
import { LEGACY_SECTION_ID } from "./senna-legacy-section";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function DriversTimeline({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const setActiveTrack = useSetActiveTrack();

    useGSAP(() => {
        // Subindo de volta para o hero: silencia a trilha
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top center",
            onLeaveBack: () => setActiveTrack(null),
        });

        const legacy = document.getElementById(LEGACY_SECTION_ID);
        if (!legacy) return;

        // Escurece o fundo e tira a cor da pista durante o legado do Senna.
        // Fade de 1, platô de 6 e fade de 1: o escuro cobre ~75% do percurso da seção.
        // Só opacidade (compositor): animar background-color/filter repintava a timeline inteira a cada quadro
        gsap.timeline({
            defaults: { ease: "none", duration: 1 },
            scrollTrigger: { trigger: legacy, start: "top 70%", end: "bottom 30%", scrub: true },
        })
            .to(".timeline-dark", { opacity: 1 })
            .to(".zebra-color", { opacity: 0 }, "<")
            .to(".timeline-dark", { opacity: 0 }, "+=6")
            .to(".zebra-color", { opacity: 1 }, "<");

        // Header e outros elementos fixos acompanham o tema via variante `theme-dark:`
        ScrollTrigger.create({
            trigger: legacy,
            start: "top 50%",
            end: "bottom 50%",
            toggleClass: { targets: document.documentElement, className: "theme-dark" },
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full bg-[#f2f2f2] overflow-hidden">
            {/* Camada escura do tamanho da tela (fixed), atrás do conteúdo da timeline */}
            <div className="timeline-dark pointer-events-none fixed inset-0 z-0 bg-[#09090b] opacity-0" aria-hidden="true" />

            <div className="relative z-10 max-w-350 mx-auto px-6 pt-20 pb-40">
                <TimelineTrack />

                <div className="relative z-10 w-full flex flex-col gap-32 md:gap-48">
                    {children}
                </div>
            </div>
        </div>
    );
}
