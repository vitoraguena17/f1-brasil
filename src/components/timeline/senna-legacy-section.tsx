"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";
import { ASSETS, TRACKS } from "@/constants/media";
import { useSectionTrack } from "@/hooks/use-section-track";
import { CARD_IMAGE_SIZES } from "../ui/timeline-card";
import { CountUp } from "../ui/count-up";
import { SennaQuoteVideo } from "./senna-quote-video";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const LEGACY_SECTION_ID = "senna-legacy-section";

const SENNA_STATS = [
    { value: 3, labelKey: "ui.titles" },
    { value: 41, labelKey: "ui.wins" },
    { value: 65, labelKey: "ui.poles" },
    { value: 161, labelKey: "ui.races" },
];

interface LegacyCardProps {
    title: string;
    text: string;
    imageSrc: string;
    reversed?: boolean;
    /** Imagem com transparência (logo): sem moldura, sombra ou P&B */
    isLogo?: boolean;
}

function LegacyCard({ title, text, imageSrc, reversed = false, isLogo = false }: LegacyCardProps) {
    return (
        <article className={`legacy-block flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} justify-between items-center w-full gap-8 md:gap-0 pl-11 md:pl-0`}>
            <div className="w-full md:w-[45%] flex flex-col justify-center">
                <h3 className="legacy-reveal font-cursive italic text-3xl md:text-5xl text-zinc-100 tracking-normal mb-4 md:mb-6">{title}</h3>
                <p className="legacy-reveal text-[15px] md:text-[1.2rem] leading-relaxed text-zinc-400">{text}</p>
            </div>

            {isLogo ? (
                <div className="legacy-reveal w-full md:w-[45%] flex items-center justify-center py-8">
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={1400}
                        height={534}
                        sizes="(max-width: 768px) 80vw, 480px"
                        className="w-4/5 max-w-120 h-auto transition-transform duration-700 hover:scale-[1.03]"
                    />
                </div>
            ) : (
                <div className="legacy-reveal w-full md:w-[45%] h-64 sm:h-72 lg:h-96">
                    <div className="w-full h-full relative rounded-2xl overflow-hidden grayscale opacity-80 hover:opacity-100 transition-opacity duration-700 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] group">
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            sizes={CARD_IMAGE_SIZES}
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>
                </div>
            )}
        </article>
    );
}

export function SennaLegacySection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);

    useSectionTrack(sectionRef, TRACKS.SENNA_LEGACY);

    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>(".legacy-block").forEach((block) => {
            const reveals = block.querySelectorAll(".legacy-reveal");
            if (!reveals.length) return;
            gsap.from(reveals, {
                scrollTrigger: { trigger: block, start: "top 80%" },
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
            });
        });

        // A assinatura "é escrita" da esquerda para a direita
        gsap.fromTo(".legacy-signature",
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 2.4,
                ease: "power2.inOut",
                scrollTrigger: { trigger: ".legacy-signature", start: "top 80%" },
            }
        );
    }, { scope: sectionRef });

    return (
        <section id={LEGACY_SECTION_ID} ref={sectionRef} className="relative z-10 w-full text-zinc-300 pt-16 pb-32">
            <div className="flex flex-col gap-32">
                <LegacyCard
                    title={t("sennaLegacy.imola.title")}
                    text={t("sennaLegacy.imola.text")}
                    imageSrc={ASSETS.SENNA_LEGACY.IMOLA}
                />

                <LegacyCard
                    title={t("sennaLegacy.comocao.title")}
                    text={t("sennaLegacy.comocao.text")}
                    imageSrc={ASSETS.SENNA_LEGACY.CORTEGO}
                    reversed
                />

                <LegacyCard
                    title={t("sennaLegacy.instituto.title")}
                    text={t("sennaLegacy.instituto.text")}
                    imageSrc={ASSETS.SENNA_LEGACY.INSTITUTO}
                    isLogo
                />

                {/* O vídeo cobre a pista de propósito: é o ponto focal do legado */}
                <div className="legacy-block mt-12 -mx-3 md:mx-0">
                    <SennaQuoteVideo src={ASSETS.SENNA_LEGACY.QUOTE_VIDEO} quote={t("sennaLegacy.quote")} />
                </div>

                {/* Fechamento: números à esquerda da pista, assinatura à direita */}
                <div className="legacy-block flex flex-col md:flex-row justify-between items-center gap-16 md:gap-0 mt-12 pl-11 md:pl-0">
                    <dl className="w-full md:w-[45%] grid grid-cols-2 gap-px bg-zinc-800/60 rounded-2xl overflow-hidden border border-zinc-800/60">
                        {SENNA_STATS.map(({ value, labelKey }) => (
                            <div key={labelKey} className="legacy-reveal flex flex-col-reverse items-center justify-center gap-2 bg-[#09090b] py-8 md:py-10">
                                <dt className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-500 text-center">{t(labelKey)}</dt>
                                <dd>
                                    <CountUp value={value} className="block text-5xl md:text-6xl font-light text-zinc-100 tabular-nums" />
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <div className="w-full md:w-[45%] flex flex-col items-center gap-6">
                        <div
                            role="img"
                            aria-label={t("ui.signatureAlt")}
                            className="legacy-signature w-full max-w-120 aspect-1049/369 bg-zinc-200"
                            style={{
                                maskImage: `url(${ASSETS.SENNA_LEGACY.SIGNATURE})`,
                                WebkitMaskImage: `url(${ASSETS.SENNA_LEGACY.SIGNATURE})`,
                                maskSize: "contain",
                                WebkitMaskSize: "contain",
                                maskRepeat: "no-repeat",
                                WebkitMaskRepeat: "no-repeat",
                                maskPosition: "center",
                                WebkitMaskPosition: "center",
                            }}
                        />
                        <p className="legacy-reveal text-zinc-500 tracking-[0.3em] uppercase text-[10px] md:text-xs text-center">
                            {t("sennaLegacy.goat")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
