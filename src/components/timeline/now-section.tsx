"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";
import { useSectionTrack } from "@/hooks/use-section-track";
import { useSeasonStats } from "@/hooks/use-season-stats";
import { NOW_DRIVERS, type NowDriver } from "@/data/drivers";
import { StatStrip } from "../ui/stat-strip";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const NOW_SECTION_ID = "now-section";

const NIGHT = "#060a12";

// Do #f2f2f2 da timeline ao azul-noite, interpolado em OKLab com easing (smoothstep):
// um gradiente linear simples passa por cinzas "lamacentos" e marca as bordas
const DUSK_STOPS = "#f2f2f2 0%, #eaeaeb 10%, #d5d6d7 20%, #b7b9bb 30%, #94969b 40%, #6f7278 50%, #4c5057 60%, #2f333b 70%, #181d25 80%, #0a0f17 90%, #060a12 100%";
const DUSK = `linear-gradient(to bottom, ${DUSK_STOPS})`;
const DAWN = `linear-gradient(to top, ${DUSK_STOPS})`;

// Os holofotes acendem e apagam suavemente, sem borda no início/fim da "noite"
const GLOW_MASK = "linear-gradient(to bottom, transparent 0, #000 360px, #000 calc(100% - 360px), transparent 100%)";


function LiveBadge({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] font-bold tracking-[0.3em] uppercase text-red-400">
            <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full rounded-full bg-red-500 opacity-75 animate-ping motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
            </span>
            {label}
        </span>
    );
}

function DriverPhoto({ driver, team, status }: { driver: NowDriver; team: string; status: string }) {
    return (
        <div className="now-photo relative aspect-4/5 w-full rounded-3xl overflow-hidden bg-[#0c1220] ring-1 ring-white/10 shadow-[0_40px_80px_-30px_rgba(34,197,94,0.25)]">
            {driver.image ? (
                <>
                    <Image
                        src={driver.image}
                        alt={`${driver.firstName} ${driver.lastName}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 560px"
                        className="object-cover object-top"
                    />
                    <span className="absolute top-3 right-5 text-7xl md:text-8xl font-bold italic leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.55)] select-none" aria-hidden="true">
                        {driver.number}
                    </span>
                </>
            ) : (
                // Sem foto: o número do carro vira a imagem do painel
                <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.28),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(250,204,21,0.2),transparent_55%)]" aria-hidden="true">
                    <span className="pr-[0.12em] text-[11rem] md:text-[15rem] font-bold italic leading-none text-transparent bg-clip-text bg-linear-to-b from-white/40 to-white/5 select-none">
                        {driver.number}
                    </span>
                </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-[#060a12] via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.25em] font-bold">
                <span className="rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-white">{team}</span>
                <span className="text-zinc-400 text-right">{status}</span>
            </div>
        </div>
    );
}

function DriverPanel({ driver, reversed = false }: { driver: NowDriver; reversed?: boolean }) {
    const { t } = useLanguage();
    const stats = useSeasonStats(driver.apiId, driver.fallback);
    const ns = `now.${driver.id}`;

    return (
        <article className="now-block grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className={`now-reveal lg:col-span-5 lg:sticky lg:top-28 ${reversed ? "lg:order-2" : ""}`}>
                <DriverPhoto driver={driver} team={t(`${ns}.team`)} status={t(`${ns}.status`)} />
            </div>

            <div className="lg:col-span-7 flex flex-col">
                <span className="now-reveal flex items-center gap-3 text-green-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                    <span className="h-px w-6 bg-linear-to-r from-green-400 to-yellow-300" aria-hidden="true" />
                    {t(`${ns}.label`)}
                </span>

                <h3 className="now-reveal text-zinc-50 font-bold uppercase leading-[0.9]">
                    <span className="block text-lg md:text-2xl tracking-[0.35em] text-zinc-400 font-medium mb-2">{driver.firstName}</span>
                    <span className="block text-[13vw] sm:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-linear-to-r from-green-400 to-yellow-300 pb-1">
                        {driver.lastName}
                    </span>
                </h3>

                <p className="now-reveal font-cursive italic text-2xl md:text-3xl text-zinc-400 mt-4">&ldquo;{t(`${ns}.tagline`)}&rdquo;</p>

                <p className="now-reveal text-zinc-300 leading-relaxed text-base md:text-lg mt-6">{t(`${ns}.text`)}</p>

                {/* Telemetria: números ao vivo da temporada */}
                <StatStrip
                    variant="night"
                    className="now-reveal grid-cols-2 sm:grid-cols-4 mt-10"
                    stats={driver.stats.map((stat) => ({
                        label: t(`now.stats.${stat.label}`),
                        value: typeof stat.source === "string" ? stats[stat.source] : stat.source,
                        prefix: stat.prefix,
                        live: typeof stat.source === "string",
                    }))}
                />
                <p className="now-reveal flex items-center gap-1.5 mt-3 text-[10px] text-zinc-500">
                    <span className="size-1.5 rounded-full bg-green-400" aria-hidden="true" />
                    {t("now.liveNote")} {stats.season}
                </p>

                {/* Trajetória no formato de torre de cronometragem */}
                <ol className="now-reveal mt-10 divide-y divide-white/10 border-y border-white/10">
                    {driver.milestones.map((key) => (
                        <li key={key} className="grid grid-cols-[4rem_1fr] md:grid-cols-[5rem_1fr] gap-4 py-4">
                            <span className="text-sm font-bold tabular-nums text-yellow-300 pt-0.5">{t(`${ns}.milestones.${key}.year`)}</span>
                            <div>
                                <p className="font-bold text-zinc-100">{t(`${ns}.milestones.${key}.title`)}</p>
                                <p className="text-sm text-zinc-400 leading-relaxed mt-1">{t(`${ns}.milestones.${key}.text`)}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </article>
    );
}

export function NowSection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const nightRef = useRef<HTMLDivElement>(null);
    const duskRef = useRef<HTMLDivElement>(null);
    const dawnRef = useRef<HTMLDivElement>(null);
    const bortoletoRef = useRef<HTMLDivElement>(null);
    const camaraRef = useRef<HTMLDivElement>(null);

    // Cada piloto tem a sua trilha; a do último para ao descer para as menções honrosas
    useSectionTrack(bortoletoRef, NOW_DRIVERS.bortoleto.track);
    useSectionTrack(camaraRef, NOW_DRIVERS.camara.track, { stopOnLeave: true });

    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>(".now-block").forEach((block) => {
            gsap.from(block.querySelectorAll(".now-reveal"), {
                scrollTrigger: { trigger: block, start: "top 80%" },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
            });

            const bars = block.querySelectorAll(".stat-bar");
            if (bars.length) {
                gsap.from(bars, {
                    scrollTrigger: { trigger: bars[0], start: "top 85%" },
                    scaleX: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power3.out",
                });
            }
        });

        // A foto acende de cima para baixo, como holofotes ligando
        gsap.utils.toArray<HTMLElement>(".now-photo").forEach((photo) => {
            gsap.fromTo(photo,
                { clipPath: "inset(0% 0% 100% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.4,
                    ease: "power4.inOut",
                    clearProps: "clipPath",
                    scrollTrigger: { trigger: photo, start: "top 80%" },
                }
            );
        });

        // Header e elementos fixos ficam no tema escuro, no azul da "noite", enquanto ela está sob eles
        const root = document.documentElement;
        ScrollTrigger.create({
            // Troca no meio do anoitecer/amanhecer (onde o fundo já está escuro), não na borda da noite
            trigger: nightRef.current,
            start: () => `top-=${(duskRef.current?.offsetHeight ?? 0) * 0.4} top+=64`,
            end: () => `bottom+=${(dawnRef.current?.offsetHeight ?? 0) * 0.4} top+=64`,
            onToggle: ({ isActive }) => {
                root.classList.toggle("theme-dark", isActive);
                root.classList.toggle("theme-night", isActive);
            },
        });
        return () => root.classList.remove("theme-dark", "theme-night");
    }, { scope: sectionRef });

    return (
        <section id={NOW_SECTION_ID} ref={sectionRef} className="relative w-full text-zinc-100">
            {/* Anoitecer: o fundo claro da timeline escurece até a "corrida noturna" */}
            <div ref={duskRef} className="h-64 md:h-96" style={{ backgroundImage: DUSK }} aria-hidden="true" />

            {/* overflow-clip (e não hidden) para não quebrar o sticky das fotos */}
            <div ref={nightRef} className="relative overflow-clip" style={{ backgroundColor: NIGHT }}>
                {/* Holofotes da pista (gradientes estáticos: nada de blur animado no celular) */}
                <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                    style={{
                        background:
                            "radial-gradient(55% 30% at 14% 12%, rgba(34,197,94,0.18), transparent 70%)," +
                            "radial-gradient(45% 25% at 90% 18%, rgba(250,204,21,0.10), transparent 70%)," +
                            "radial-gradient(50% 25% at 85% 62%, rgba(34,197,94,0.10), transparent 70%)," +
                            "radial-gradient(45% 22% at 10% 85%, rgba(250,204,21,0.08), transparent 70%)",
                        maskImage: GLOW_MASK,
                        WebkitMaskImage: GLOW_MASK,
                    }}
                />

                <div className="relative max-w-350 mx-auto px-6 pt-8 md:pt-16 pb-24 md:pb-40 flex flex-col gap-28 md:gap-44">
                    <div ref={bortoletoRef} className="flex flex-col gap-20 md:gap-32">
                        <header className="now-block max-w-4xl">
                            <div className="now-reveal flex flex-wrap items-center gap-4 mb-8">
                                <LiveBadge label={t("now.live")} />
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">{t("now.label")}</span>
                            </div>
                            <h2 className="now-reveal text-zinc-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
                                {t("now.titleTop")}{" "}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-yellow-300">{t("now.titleAccent")}</span>
                            </h2>
                            <p className="now-reveal text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed mt-8 max-w-3xl">{t("now.intro")}</p>
                        </header>

                        <DriverPanel driver={NOW_DRIVERS.bortoleto} />
                    </div>

                    <div ref={camaraRef}>
                        <DriverPanel driver={NOW_DRIVERS.camara} reversed />
                    </div>
                </div>
            </div>

            {/* Amanhecer: volta ao fundo claro das menções honrosas */}
            <div ref={dawnRef} className="h-64 md:h-96" style={{ backgroundImage: DAWN }} aria-hidden="true" />
        </section>
    );
}
