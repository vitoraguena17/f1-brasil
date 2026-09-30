"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";
import { ASSETS, TRACKS } from "@/constants/media";
import { useSectionTrack } from "@/hooks/use-section-track";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function BortoletoSection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);

    // Última seção com trilha: a música para ao descer para as menções honrosas
    useSectionTrack(sectionRef, TRACKS.BORTOLETO, { stopOnLeave: true });

    useGSAP(() => {
        gsap.from(".bortoleto-reveal", {
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        });

        // Parallax sutil da foto dentro da moldura
        gsap.fromTo(".bortoleto-photo",
            { yPercent: -6 },
            {
                yPercent: 6,
                ease: "none",
                scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
            }
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-32 bg-[#f2f2f2] text-zinc-900">
            <div className="max-w-350 mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 md:gap-16 lg:gap-24">
                <div className="w-full lg:w-1/2 flex flex-col z-10">
                    <span className="bortoleto-reveal text-green-500 text-sm font-bold tracking-[0.3em] uppercase mb-4">
                        {t("bortoleto.label")}
                    </span>
                    <h2 className="bortoleto-reveal text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight">
                        {t("bortoleto.title")}
                    </h2>
                    <p className="bortoleto-reveal text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed mb-8">
                        {t("bortoleto.text")}
                    </p>
                </div>

                <div className="bortoleto-reveal w-full lg:w-1/2 h-96 md:h-125 lg:h-150 relative rounded-3xl overflow-hidden shadow-2xl group">
                    <div className="bortoleto-photo absolute -inset-y-[8%] inset-x-0">
                        <Image
                            src={ASSETS.BORTOLETO.HERO}
                            alt="Gabriel Bortoleto"
                            fill
                            sizes="(max-width: 1024px) 100vw, 700px"
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-[#f2f2f2] via-transparent to-transparent opacity-80" />
                </div>
            </div>
        </section>
    );
}
