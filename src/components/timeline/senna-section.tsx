"use client";
import { useLanguage } from "@/contexts/language-context";
import { ASSETS } from "@/constants/media";
import { useDriverStats } from "@/hooks/use-driver-stats";
import { TimelineLayout } from "./timeline-layout";
import { ProfileCard } from "../ui/profile-card";
import { TimelineCard } from "../ui/timeline-card";

export function SennaSection() {
  const { t } = useLanguage();
  
  const { wins, titles } = useDriverStats("senna", "41", "3");

  return (
    <TimelineLayout
      id="senna-section"
      audio={{
        src: ASSETS.AUDIO.SENNA,
        title: "The Best",
        artist: "Tina Turner"
      }}
    >
      <ProfileCard
        label="O Herói Nacional"
        firstName="AYRTON"
        lastName="SENNA"
        nickname={t('senna.nickname')}
        imageSrc={ASSETS.SENNA.PROFILE}
        titles={titles}
        wins={wins}
        titlesLabel="Títulos Mundiais"
        winsLabel="Vitórias (F1)"
      />

      <div className="space-y-16 md:space-y-32 pb-32">
        
        <TimelineCard 
          alignment="left" variant="zinc" 
          period={t('senna.preF1.period')} title={t('senna.preF1.title')} text={t('senna.preF1.text')} imageSrc={ASSETS.SENNA.PRE_F1} priority={true} 
        />
        <TimelineCard 
          alignment="right" variant="white" 
          period={t('senna.toleman84.period')} title={t('senna.toleman84.title')} text={t('senna.toleman84.text')} imageSrc={ASSETS.SENNA.TOLEMAN84} 
        />
        <TimelineCard 
          alignment="left" variant="zinc" 
          period={t('senna.lotus85.period')} title={t('senna.lotus85.title')} text={t('senna.lotus85.text')} imageSrc={ASSETS.SENNA.LOTUS85} 
        />
        <TimelineCard 
          alignment="right" variant="yellow" 
          period={t('senna.monaco88.period')} title={t('senna.monaco88.title')} text={t('senna.monaco88.text')} imageSrc={ASSETS.SENNA.MONACO88} 
        />
        <TimelineCard 
          alignment="left" variant="white" 
          period={t('senna.title88.period')} title={t('senna.title88.title')} text={t('senna.title88.text')} imageSrc={ASSETS.SENNA.TITLE88} 
        />
        <TimelineCard 
          alignment="right" variant="zinc" 
          period={t('senna.titles9091.period')} title={t('senna.titles9091.title')} text={t('senna.titles9091.text')} imageSrc={ASSETS.SENNA.TITLES9091} 
        />
        <TimelineCard 
          alignment="left" variant="green" 
          period={t('senna.interlagos91.period')} title={t('senna.interlagos91.title')} text={t('senna.interlagos91.text')} imageSrc={ASSETS.SENNA.INTERLAGOS91} 
        />
        <TimelineCard 
          alignment="right" variant="white" 
          period={t('senna.donington93.period')} title={t('senna.donington93.title')} text={t('senna.donington93.text')} imageSrc={ASSETS.SENNA.DONINGTON93} 
        />

      </div>
    </TimelineLayout>
  );
}