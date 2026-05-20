"use client";
import { useLanguage } from "@/contexts/language-context";
import { ASSETS } from "@/constants/media";
import { useDriverStats } from "@/hooks/use-driver-stats";
import { TimelineLayout } from "./timeline-layout";
import { ProfileCard } from "../ui/profile-card";
import { TimelineCard } from "../ui/timeline-card";

export function PiquetSection() {
    const { t } = useLanguage();

    const { wins, titles } = useDriverStats("piquet", "23", "3");

    return (
        <TimelineLayout
            id="piquet-section"
            audio={{
                src: ASSETS.AUDIO.PIQUET,
                title: "Tema da Vitória",
                artist: "Eduardo Souto Neto"
            }}
        >
            <ProfileCard
                label="O Tricampeão"
                firstName="NELSON"
                lastName="PIQUET"
                nickname={t('piquet.nickname')}
                imageSrc={ASSETS.PIQUET.PROFILE}
                titles={titles}
                wins={wins}
                titlesLabel="Títulos Mundiais"
                winsLabel="Vitórias (F1)"
            />

            <div className="space-y-16 md:space-y-32 pb-32">

                <TimelineCard
                    alignment="left"
                    variant="zinc"
                    period={t('piquet.preF1.period')}
                    title={t('piquet.preF1.title')}
                    text={t('piquet.preF1.text')}
                    imageSrc={ASSETS.PIQUET.PRE_F1 || "/piquet/img-piquet-pre.jpg"}
                    priority={true}
                />

                <TimelineCard
                    alignment="right"
                    variant="white"
                    period={t('piquet.brabham81.period')}
                    title={t('piquet.brabham81.title')}
                    text={t('piquet.brabham81.text')}
                    imageSrc={ASSETS.PIQUET.BRABHAM81}
                />

                <TimelineCard
                    alignment="left"
                    variant="yellow"
                    period={t('piquet.brabham83.period')}
                    title={t('piquet.brabham83.title')}
                    text={t('piquet.brabham83.text')}
                    imageSrc={ASSETS.PIQUET.BRABHAM83}
                />

                <TimelineCard
                    alignment="right"
                    variant="green"
                    period={t('piquet.williams87.period')}
                    title={t('piquet.williams87.title')}
                    text={t('piquet.williams87.text')}
                    imageSrc={ASSETS.PIQUET.WILLIAMS87}
                />

                <TimelineCard
                    alignment="left"
                    variant="white"
                    period={t('piquet.benetton.period')}
                    title={t('piquet.benetton.title')}
                    text={t('piquet.benetton.text')}
                    imageSrc={ASSETS.PIQUET.LOTUS_BENETTON}
                />

                <TimelineCard
                    alignment="right"
                    variant="zinc"
                    period={t('piquet.posF1.period')}
                    title={t('piquet.posF1.title')}
                    text={t('piquet.posF1.text')}
                    imageSrc={ASSETS.PIQUET.POS_F1 || "/piquet/img-piquet-pos.jpg"}
                />

            </div>
        </TimelineLayout>
    );
}