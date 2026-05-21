"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HonorableMentions() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);

    const keys = [
        "landi", "bianco", "ramos", "dorey", "wfittipaldi", "bueno", "pace", 
        "hoffmann", "ribeiro", "serra", "boesel", "moreno", "gugelmin", 
        "cfittipaldi", "diniz", "rosset", "marques", "zonta", "burti", 
        "bernoldi", "damatta", "pizzonia", "piquetjr", "digrassi", 
        "bsenna", "nasr", "pfittipaldi"
    ];

    useGSAP(() => {
        gsap.from(".mention-card", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out"
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full py-32 bg-[#f2f2f2] text-zinc-900">
            <div className="max-w-350 mx-auto px-6 text-center">
                
                {/* font-serif removida, usando apenas font-bold */}
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-zinc-900">{t('honorable.title')}</h2>
                <p className="text-zinc-600 max-w-3xl mx-auto mb-20 leading-relaxed text-lg">{t('honorable.subtitle')}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 text-left">
                    {keys.map((key) => (
                        <div key={key} className="mention-card bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-lg font-bold text-zinc-800 mb-2">
                                {t(`honorable.drivers.${key}.name`)}
                            </h3>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                {t(`honorable.drivers.${key}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}