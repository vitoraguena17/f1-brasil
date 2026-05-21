"use client";
import { useLanguage } from "@/contexts/language-context";
import { ASSETS } from "@/constants/media";
import { useDriverStats } from "@/hooks/use-driver-stats";
import { TimelineLayout } from "./timeline-layout";
import { ProfileCard } from "../ui/profile-card";
import { TimelineCard } from "../ui/timeline-card";

export function BarrichelloSection() {
    const { t } = useLanguage();

    // Rubinho tem 11 vitórias e 0 títulos mundiais de F1.
    const { wins, titles } = useDriverStats("barrichello", "11", "0");

    return (
        <TimelineLayout
            id="barrichello-section"
            audio={{
                src: ASSETS.AUDIO.BARRICHELLO,
                title: "Don't Stop Me Now",
                artist: "Queen"
            }}
        >
            <ProfileCard
                label="O Resiliente"
                firstName="RUBENS"
                lastName="BARRICHELLO"
                nickname={t('barrichello.nickname')}
                imageSrc={ASSETS.BARRICHELLO.PROFILE}
                titles={titles}
                wins={wins}
                titlesLabel="Títulos Mundiais"
                winsLabel="Vitórias (F1)"
            />

            <div className="space-y-16 md:space-y-32 pb-32">

                <TimelineCard
                    alignment="left"
                    variant="zinc"
                    period={t('barrichello.early.period')}
                    title={t('barrichello.early.title')}
                    text={t('barrichello.early.text')}
                    imageSrc={ASSETS.BARRICHELLO.EARLY}
                    priority={true}
                />

                <TimelineCard
                    alignment="right"
                    variant="white"
                    period={t('barrichello.imola.period')}
                    title={t('barrichello.imola.title')}
                    text={t('barrichello.imola.text')}
                    imageSrc={ASSETS.BARRICHELLO.IMOLA}
                />

                <TimelineCard
                    alignment="left"
                    variant="yellow"
                    period={t('barrichello.ferrari.period')}
                    title={t('barrichello.ferrari.title')}
                    text={t('barrichello.ferrari.text')}
                    imageSrc={ASSETS.BARRICHELLO.FERRARI}
                />

                <TimelineCard
                    alignment="right"
                    variant="green"
                    period={t('barrichello.brawn.period')}
                    title={t('barrichello.brawn.title')}
                    text={t('barrichello.brawn.text')}
                    imageSrc={ASSETS.BARRICHELLO.BRAWN}
                />

                {/* Card 5: Stock Car + NASCAR Brasil (Lado Esquerdo) */}
                <TimelineCard
                    alignment="left"
                    variant="zinc"
                    period={t('barrichello.stockcar.period')}
                    title={t('barrichello.stockcar.title')}
                    text={t('barrichello.stockcar.text')}
                    imageSrc={ASSETS.BARRICHELLO.STOCKCAR}
                />

                {/* Card 6: Família Barrichello (Lado Direito) */}
                <TimelineCard
                    alignment="right"
                    variant="white"
                    period={t('barrichello.family.period')}
                    title={t('barrichello.family.title')}
                    text={t('barrichello.family.text')}
                    imageSrc={ASSETS.BARRICHELLO.FAMILY}
                />

            </div>
        </TimelineLayout>
    );
}