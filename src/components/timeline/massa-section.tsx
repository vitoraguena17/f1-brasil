"use client";
import { useLanguage } from "@/contexts/language-context";
import { ASSETS } from "@/constants/media";
import { useDriverStats } from "@/hooks/use-driver-stats";
import { TimelineLayout } from "./timeline-layout";
import { ProfileCard } from "../ui/profile-card";
import { TimelineCard } from "../ui/timeline-card";

export function MassaSection() {
    const { t } = useLanguage();

    // Massa tem 11 vitórias. A API retornará 0 títulos.
    const { wins, titles } = useDriverStats("massa", "11", "0");

    // Interceptamos o 0 para colocar um asterisco de "protesto/tributo"
    const displayTitles = titles === "0" ? "0*" : titles;

    return (
        <TimelineLayout
            id="massa-section"
            audio={{
                src: ASSETS.AUDIO.MASSA,
                title: "The Winner Takes It All",
                artist: "ABBA"
            }}
        >
            <ProfileCard
                label="O Campeão Moral"
                firstName="FELIPE"
                lastName="MASSA"
                nickname={t('massa.nickname')}
                imageSrc={ASSETS.MASSA.PROFILE}
                titles={displayTitles}
                wins={wins}
                titlesLabel="Títulos Mundiais"
                winsLabel="Vitórias (F1)"
            />

            <div className="space-y-16 md:space-y-32 pb-32">

                <TimelineCard
                    alignment="left"
                    variant="zinc"
                    period={t('massa.preF1.period')}
                    title={t('massa.preF1.title')}
                    text={t('massa.preF1.text')}
                    imageSrc={ASSETS.MASSA.PRE_F1}
                    priority={true}
                />

                <TimelineCard
                    alignment="right"
                    variant="yellow"
                    period={t('massa.ferrari.period')}
                    title={t('massa.ferrari.title')}
                    text={t('massa.ferrari.text')}
                    imageSrc={ASSETS.MASSA.FERRARI}
                />

                <TimelineCard
                    alignment="left"
                    variant="white"
                    period={t('massa.drama2008.period')}
                    title={t('massa.drama2008.title')}
                    text={t('massa.drama2008.text')}
                    imageSrc={ASSETS.MASSA.DRAMA2008}
                />

                <TimelineCard
                    alignment="right"
                    variant="zinc"
                    period={t('massa.mola.period')}
                    title={t('massa.mola.title')}
                    text={t('massa.mola.text')}
                    imageSrc={ASSETS.MASSA.MOLA}
                />

                <TimelineCard
                    alignment="left"
                    variant="green"
                    period={t('massa.stockcar.period')}
                    title={t('massa.stockcar.title')}
                    text={t('massa.stockcar.text')}
                    imageSrc={ASSETS.MASSA.STOCKCAR}
                />

            </div>
        </TimelineLayout>
    );
}