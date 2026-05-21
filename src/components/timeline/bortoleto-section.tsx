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

export function BortoletoSection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const { setActiveTrack } = useAudio();

    useGSAP(() => {
        // Dispara a música do Bortoleto
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: (self) => {
                if (self.isActive) {
                    setActiveTrack({
                        id: "bortoleto",
                        src: ASSETS.AUDIO.BORTOLETO,
                        title: "Just Keep Watching",
                        artist: "Tate McRae"
                    });
                }
            }
        });

        // Animação de revelação
        const elements = gsap.utils.toArray<HTMLElement>(".bortoleto-reveal");
        gsap.from(elements, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }, { scope: sectionRef });

    return (
        // Mantendo o bg-[#f2f2f2] padronizado com o projeto
        <section ref={sectionRef} className="relative w-full py-32 bg-[#f2f2f2] text-zinc-900">
            <div className="max-w-350 mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                
                <div className="w-full lg:w-1/2 flex flex-col z-10">
                    <span className="bortoleto-reveal text-[#22c55e] text-sm font-bold tracking-[0.3em] uppercase mb-4">
                        {t('bortoleto.label')}
                    </span>
                    {/* font-serif removida, usando apenas font-bold para a Poppins brilhar */}
                    <h2 className="bortoleto-reveal text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        {t('bortoleto.title')}
                    </h2>
                    <p className="bortoleto-reveal text-lg md:text-xl text-zinc-600 leading-relaxed mb-8">
                        {t('bortoleto.text')}
                    </p>
                </div>

                <div className="bortoleto-reveal w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] relative rounded-3xl overflow-hidden shadow-2xl group">
                    <Image 
                        src={ASSETS.BORTOLETO.HERO || "/bortoleto/audi-placeholder.jpg"} 
                        alt="Gabriel Bortoleto" 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Degradê integrado ao f2f2f2 */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#f2f2f2] via-transparent to-transparent opacity-80" />
                </div>

            </div>
        </section>
    );
}