"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";
import { ASSETS } from "@/constants/media";
import { useAudio } from "@/contexts/audio-context";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function LegacyCard({ title, text, imageSrc, reversed = false }: { title: string, text: string, imageSrc: string, reversed?: boolean }) {
    return (
        <div className={`legacy-block flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} justify-between items-center w-full gap-8 md:gap-0 pl-16 md:pl-0`}>
            <div className="w-full md:w-[45%] flex flex-col justify-center">
                <h3 className="legacy-reveal font-serif text-3xl md:text-5xl text-zinc-100 mb-6">{title}</h3>
                <p className="legacy-reveal leading-relaxed text-zinc-400">{text}</p>
            </div>

            <div className="legacy-reveal w-full md:w-[45%] h-64 sm:h-72 lg:h-96">
                <div className="w-full h-full relative rounded-xl overflow-hidden grayscale opacity-80 hover:opacity-100 transition-opacity duration-700 shadow-2xl group transform-gpu will-change-transform">
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
}

export function SennaLegacySection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const { setActiveTrack } = useAudio();

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom top",
            onToggle: (self) => {
                if (self.isActive) {
                    setActiveTrack({
                        id: "senna-legacy",
                        src: ASSETS.AUDIO.SENNA_LEGACY,
                        title: "Tema da Vitória (Acústico)",
                        artist: "Homenagem a Ayrton Senna"
                    });
                }
            }
        });

        const blocks = gsap.utils.toArray<HTMLElement>(".legacy-block");
        blocks.forEach((block) => {
            const reveals = block.querySelectorAll(".legacy-reveal");

            gsap.from(reveals, {
                scrollTrigger: {
                    trigger: block,
                    start: "top 80%"
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out"
            });
        });
    }, { scope: sectionRef });

    return (
        <section id="senna-legacy-section" ref={sectionRef} className="relative z-10 w-full text-zinc-300 pt-16 pb-32">
            
            <div className="flex flex-col gap-32">
                <LegacyCard
                    title={t('sennaLegacy.imola.title')}
                    text={t('sennaLegacy.imola.text')}
                    imageSrc={ASSETS.SENNA_LEGACY.IMOLA || "/senna/imola-placeholder.jpg"}
                />

                <LegacyCard
                    title={t('sennaLegacy.comocao.title')}
                    text={t('sennaLegacy.comocao.text')}
                    imageSrc={ASSETS.SENNA_LEGACY.CORTEGO || "/senna/cortejo-placeholder.jpg"}
                    reversed={true}
                />

                <LegacyCard
                    title={t('sennaLegacy.instituto.title')}
                    text={t('sennaLegacy.instituto.text')}
                    imageSrc={ASSETS.SENNA_LEGACY.INSTITUTO || "/senna/instituto-placeholder.jpg"}
                />

                <div className="legacy-block text-center mt-12 pl-16 pr-4 md:px-16">
                    <p className="legacy-reveal font-serif text-2xl md:text-4xl text-zinc-200 leading-snug italic opacity-90">
                        {t('sennaLegacy.quote')}
                    </p>
                </div>

                <div className="legacy-block flex flex-col items-center mt-12 gap-8 pl-16 md:pl-0">
                    <div className="text-center w-full">
                        <p className="legacy-reveal text-sm md:text-lg tracking-[0.3em] font-bold text-zinc-500 mb-2">
                            {t('sennaLegacy.stats')}
                        </p>
                        <p className="legacy-reveal text-zinc-400 tracking-wider uppercase text-xs md:text-sm">
                            {t('sennaLegacy.goat')}
                        </p>
                    </div>

                    {/* CORREÇÃO DA ASSINATURA: Tamanhos fixos absolutos em cada breakpoint */}
                    <div className="legacy-reveal mt-8 w-full flex justify-center">
                        <div className="relative w-[220px] sm:w-[300px] md:w-[500px] lg:w-[600px] h-[80px] sm:h-[100px] md:h-[180px] lg:h-[220px] opacity-70 hover:opacity-100 transition-opacity duration-700 mix-blend-screen invert transform-gpu">
                            <Image 
                                src={ASSETS.SENNA_LEGACY.SIGNATURE || "/senna/signature-placeholder.png"} 
                                alt="Assinatura Senna" 
                                fill 
                                className="object-contain" 
                            />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}