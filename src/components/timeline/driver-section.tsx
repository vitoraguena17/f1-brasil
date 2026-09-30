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

const ACTIVE_BORDER = "rgba(34,197,94,0.4)";
const IDLE_BORDER = "rgba(228,228,231,0.8)";

export function DriverSection({ driver, chapter }: { driver: Driver; chapter: number }) {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const wins = useDriverWins(driver.apiId, driver.wins);

    useSectionTrack(sectionRef, driver.track);

    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
            const dot = card.querySelector(".card-dot");
            const content = card.querySelector(".card-content");
            const image = card.querySelector(".card-image");
            const frame = card.querySelector(".card-frame");
            const parallax = card.querySelector(".card-parallax");

            const setColor = (color: boolean) => {
                if (image) gsap.to(image, { filter: `grayscale(${color ? 0 : 100}%)`, duration: 0.6, ease: "power2.out", overwrite: "auto" });
            };

            ScrollTrigger.create({
                trigger: card,
                start: "top center",
                end: "bottom center",
                // Destaque do card enquanto ele cruza o centro da tela
                onToggle: ({ isActive }) => {
                    if (dot) gsap.to(dot, { scale: isActive ? 1.6 : 1, duration: 0.3, ease: "back.out(2)", overwrite: "auto" });
                    if (content) gsap.to(content, { scale: isActive ? 1.03 : 1, borderColor: isActive ? ACTIVE_BORDER : IDLE_BORDER, duration: 0.3, overwrite: "auto" });
                },
                // A imagem ganha cor ao ser alcançada e só volta ao P&B se o usuário subir acima dela
                onEnter: () => setColor(true),
                onLeaveBack: () => setColor(false),
            });

            if (frame && parallax) {
                // A foto se revela de baixo para cima enquanto "assenta" dentro da moldura
                gsap.timeline({ scrollTrigger: { trigger: card, start: "top 80%" } })
                    .fromTo(frame, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" })
                    .fromTo(parallax, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "power3.out" }, "<");

                // Parallax: a foto desliza mais devagar que a página
                gsap.fromTo(parallax, { yPercent: -6 }, {
                    yPercent: 6,
                    ease: "none",
                    scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
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
    }, { scope: sectionRef });

    const ns = driver.id;

    return (
        <section id={`${driver.id}-section`} ref={sectionRef} className="relative w-full text-zinc-900">
            <ProfileCard
                chapter={String(chapter).padStart(2, "0")}
                label={t(`${ns}.label`)}
                firstName={driver.firstName}
                lastName={driver.lastName}
                nickname={t(`${ns}.nickname`)}
                imageSrc={driver.profileImage}
                titles={driver.titles}
                wins={wins}
                titlesLabel={t("ui.titles")}
                winsLabel={t("ui.wins")}
                titlesNote={driver.titlesNote ? t(`${ns}.titlesNote`) : undefined}
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
                    />
                ))}
            </div>
        </section>
    );
}
