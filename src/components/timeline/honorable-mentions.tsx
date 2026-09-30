"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Ordem cronológica de estreia na F1
const DRIVER_KEYS = [
    "landi", "bianco", "ramos", "dorey", "wfittipaldi", "bueno", "pace",
    "hoffmann", "ribeiro", "serra", "boesel", "moreno", "gugelmin",
    "cfittipaldi", "diniz", "rosset", "marques", "zonta", "burti",
    "bernoldi", "damatta", "pizzonia", "piquetjr", "digrassi",
    "bsenna", "nasr", "pfittipaldi",
];

export function HonorableMentions() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".mention-reveal", {
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
        });

        // Revela os cards em lotes conforme entram na tela, em vez de todos de uma vez
        gsap.set(".mention-card", { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(".mention-card", {
            start: "top 90%",
            once: true,
            onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out", overwrite: true }),
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-32 bg-[#f2f2f2] text-zinc-900">
            <div className="max-w-350 mx-auto px-6 text-center">
                <h2 className="mention-reveal text-3xl md:text-5xl font-bold mb-6 text-zinc-900">{t("honorable.title")}</h2>
                <p className="mention-reveal text-zinc-600 max-w-3xl mx-auto mb-12 md:mb-20 leading-relaxed text-base md:text-lg">{t("honorable.subtitle")}</p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 text-left">
                    {DRIVER_KEYS.map((key) => (
                        <li key={key} className="mention-card bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm transition-[box-shadow,border-color] duration-300 hover:shadow-md hover:border-green-400/50">
                            <h3 className="text-lg font-bold text-zinc-800 mb-2">
                                {t(`honorable.drivers.${key}.name`)}
                            </h3>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                {t(`honorable.drivers.${key}.desc`)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
