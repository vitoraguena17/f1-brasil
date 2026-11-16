"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";
import { useDriverWins } from "@/hooks/use-driver-wins";
import { useSectionTrack } from "@/hooks/use-section-track";
import type { Driver } from "@/data/drivers";
import { ProfileCard } from "../ui/profile-card";
import { TimelineCard } from "../ui/timeline-card";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Contorno dos numerais vazados: cinza em repouso, verde enquanto o card cruza o centro da tela
const ACTIVE_STROKE = "#22c55e";
const IDLE_STROKE = "#d4d4d8";

export function DriverSection({ driver, chapter }: { driver: Driver; chapter: number }) {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const wins = useDriverWins(driver.apiId, driver.wins);

    useSectionTrack(sectionRef, driver.track);

    useGSAP(() => {
        // Parallax só a partir do tablet: no celular ele custa caro e quase não aparece
        const mm = gsap.matchMedia();

        gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
            const dot = card.querySelector(".card-dot");
            const year = card.querySelector(".card-year");
            const image = card.querySelector(".card-image");
            const frame = card.querySelector(".card-frame");
            const parallax = card.querySelector(".card-parallax");

            // Depois de colorida, a foto fica sem `filter` nenhum: um filter ativo (mesmo 0%) seria
            // reprocessado a cada quadro enquanto a imagem se move por dentro no parallax
            const setColor = (color: boolean) => {
                if (!image) return;
                if (color) {
                    gsap.to(image, { filter: "grayscale(0%)", duration: 0.6, ease: "power2.out", overwrite: "auto", onComplete: () => gsap.set(image, { clearProps: "filter" }) });
                } else {
                    gsap.fromTo(image, { filter: "grayscale(0%)" }, { filter: "grayscale(100%)", duration: 0.6, ease: "power2.out", overwrite: "auto" });
                }
            };

            ScrollTrigger.create({
                trigger: card,
                start: "top center",
                end: "bottom center",
                // Destaque do card enquanto ele cruza o centro da tela
                onToggle: ({ isActive }) => {
                    if (dot) gsap.to(dot, { scale: isActive ? 1.6 : 1, duration: 0.3, ease: "back.out(2)", overwrite: "auto" });
                    if (year) gsap.to(year, { "--year-stroke": isActive ? ACTIVE_STROKE : IDLE_STROKE, duration: 0.4, overwrite: "auto" });
                },
                // A imagem ganha cor ao ser alcançada e só volta ao P&B se o usuário subir acima dela
                onEnter: () => setColor(true),
                onLeaveBack: () => setColor(false),
            });

            if (frame && parallax) {
                // A foto se revela de baixo para cima enquanto "assenta" dentro da moldura
                gsap.timeline({ scrollTrigger: { trigger: card, start: "top 80%" } })
                    .fromTo(frame, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut", clearProps: "clipPath" })
                    .fromTo(parallax, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "power3.out" }, "<");

                // Parallax: a foto desliza mais devagar que a página
                mm.add("(min-width: 768px)", () => {
                    gsap.fromTo(parallax, { yPercent: -6 }, {
                        yPercent: 6,
                        ease: "none",
                        scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
                    });
                });
            }

            gsap.from(card.querySelectorAll(".card-reveal"), {
                scrollTrigger: { trigger: card, start: "top 85%" },
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
            });
        });

        // Barrinhas de "setor" da faixa de números se preenchem ao aparecer
        const bars = sectionRef.current?.querySelectorAll(".stat-bar");
        if (bars?.length) {
            gsap.from(bars, {
                scrollTrigger: { trigger: bars[0], start: "top 85%" },
                scaleX: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
            });
        }

        return () => mm.revert();
    }, { scope: sectionRef });

    const ns = driver.id;
    const chapterNumber = String(chapter).padStart(2, "0");
    const titlesNote = driver.titlesNote ? t(`${ns}.titlesNote`) : undefined;

    return (
        <section id={`${driver.id}-section`} ref={sectionRef} className="relative w-full text-zinc-900">
            <ProfileCard
                chapter={chapterNumber}
                label={`${t("ui.chapter")} ${chapterNumber} · ${t(`${ns}.label`)}`}
                firstName={driver.firstName}
                lastName={driver.lastName}
                nickname={t(`${ns}.nickname`)}
                imageSrc={driver.profileImage}
                era={driver.era}
                teams={driver.teams}
                stats={[
                    { label: t("ui.titles"), value: driver.titles, suffix: titlesNote ? "*" : "" },
                    { label: t("ui.wins"), value: wins, live: true },
                    { label: t("ui.podiums"), value: driver.podiums },
                    { label: t("ui.poles"), value: driver.poles },
                ]}
                note={titlesNote}
            />

            <div className="space-y-16 md:space-y-32 pb-32">
                {driver.cards.map((card, index) => (
                    <TimelineCard
                        key={card.key}
                        alignment={index % 2 === 0 ? "left" : "right"}
                        period={t(`${ns}.${card.key}.period`)}
                        title={t(`${ns}.${card.key}.title`)}
                        text={t(`${ns}.${card.key}.text`)}
                        imageSrc={card.image}
                        index={`${String(index + 1).padStart(2, "0")} / ${String(driver.cards.length).padStart(2, "0")}`}
                    />
                ))}
            </div>
        </section>
    );
}
