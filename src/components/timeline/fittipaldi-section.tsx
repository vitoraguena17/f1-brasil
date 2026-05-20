"use client";
import { useLanguage } from "@/contexts/language-context";
import { ASSETS } from "@/constants/media";
import { useDriverStats } from "@/hooks/use-driver-stats";
import { TimelineLayout } from "./timeline-layout";
import { ProfileCard } from "../ui/profile-card";
import { TimelineCard } from "../ui/timeline-card";

export function FittipaldiSection() {
  const { t } = useLanguage();

  const { wins, titles } = useDriverStats("emerson_fittipaldi", "14", "2");

  return (
    <TimelineLayout
      id="fittipaldi-section"
      audio={{
        src: ASSETS.AUDIO.FITTIPALDI,
        title: "Lotus 72D",
        artist: "Zé Roberto"
      }}
    >
      <ProfileCard
        label="O Pioneiro"
        firstName="EMERSON"
        lastName="FITTIPALDI"
        nickname={t('fittipaldi.nickname')}
        imageSrc={ASSETS.FITTIPALDI.PROFILE}
        titles={titles}
        wins={wins}
        titlesLabel="Títulos Mundiais"
        winsLabel="Vitórias (F1)"
      />

      <div className="space-y-16 md:space-y-32 pb-32">
        <TimelineCard alignment="left" variant="zinc" period={t('fittipaldi.preF1.period')} title={t('fittipaldi.preF1.title')} text={t('fittipaldi.preF1.text')} imageSrc={ASSETS.FITTIPALDI.PRE_F1} priority={true} />
        <TimelineCard alignment="right" variant="yellow" period={t('fittipaldi.lotus72.period')} title={t('fittipaldi.lotus72.title')} text={t('fittipaldi.lotus72.text')} imageSrc={ASSETS.FITTIPALDI.LOTUS72} priority={true} />
        <TimelineCard alignment="left" variant="yellow" period={t('fittipaldi.mclaren74.period')} title={t('fittipaldi.mclaren74.title')} text={t('fittipaldi.mclaren74.text')} imageSrc={ASSETS.FITTIPALDI.MCLAREN74} priority={true} />
        <TimelineCard alignment="right" variant="green" period={t('fittipaldi.copersucar.period')} title={t('fittipaldi.copersucar.title')} text={t('fittipaldi.copersucar.text')} imageSrc={ASSETS.FITTIPALDI.COPERSUCAR} />
        <TimelineCard alignment="left" variant="white" period={t('fittipaldi.indy.period')} title={t('fittipaldi.indy.title')} text={t('fittipaldi.indy.text')} imageSrc={ASSETS.FITTIPALDI.INDY} />
      </div>
    </TimelineLayout>
  );
}