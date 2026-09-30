"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { INTRO } from "@/constants/motion";

gsap.registerPlugin(useGSAP);

export function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.timeline({
            // Tira do layout depois de sair, para não ficar compondo uma camada fullscreen à toa
            onComplete: () => gsap.set(containerRef.current, { display: "none" }),
        })
            .fromTo(logoRef.current,
                { autoAlpha: 0, scale: 0.8 },
                { autoAlpha: 1, scale: 1, duration: 1, ease: "power3.out" }
            )
            .to(logoRef.current, { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" }, INTRO.PRELOADER_EXIT - 0.2)
            .to(containerRef.current, { yPercent: -100, duration: 1, ease: "power4.inOut" }, INTRO.PRELOADER_EXIT);
    }, []);

    return (
        <div ref={containerRef} aria-hidden="true" className="fixed inset-0 z-999 bg-zinc-950 flex flex-col items-center justify-center pointer-events-none">
            {/* invisible até o GSAP assumir, evita o logo "piscar" antes da hidratação */}
            <div ref={logoRef} className="invisible flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-linear-to-br from-green-500 to-yellow-400 flex items-center justify-center rounded-sm">
                    <span className="text-white text-2xl font-bold">F1</span>
                </div>
                <span className="text-white text-sm uppercase tracking-[0.4em] opacity-90 ml-[0.4em]">Brasil</span>
            </div>
        </div>
    );
}
