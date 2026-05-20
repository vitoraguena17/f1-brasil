"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";
import { api } from "@/lib/api";
import { AudioPlayer } from "../audio/audio-player";
import { TimelineTrack } from "../ui/timeline-track";
import { TimelineCard } from "../ui/timeline-card";
import { ProfileCard } from "../ui/profile-card"; // Importamos o novo componente
import { ASSETS } from "@/constants/media";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FittipaldiSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const [wins, setWins] = useState<string>("-");
  const [titles, setTitles] = useState<string>("-");
  const [isSectionActive, setIsSectionActive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const winsRes = await api.get('drivers/emerson_fittipaldi/results/1.json?limit=1');
        if (isMounted) {
          setWins(winsRes.data.MRData.total);
          setTitles("2");
        }
      } catch (e) {
        if (isMounted) {
          setWins("14");
          setTitles("2");
        }
      }
    }

    fetchStats();
    return () => { isMounted = false; };
  }, []);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      end: "bottom 30%",
      onToggle: (self) => setIsSectionActive(self.isActive)
    });

    const cards = gsap.utils.toArray(".timeline-card");
    cards.forEach((card: any) => {

      ScrollTrigger.create({
        trigger: card,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          const dot = card.querySelector('.card-dot');
          const content = card.querySelector('.card-content');
          const image = card.querySelector('.card-image');

          if (dot) gsap.to(dot, { scale: self.isActive ? 1.6 : 1, duration: 0.3, ease: "back.out(2)" });
          if (content) gsap.to(content, { scale: self.isActive ? 1.03 : 1, borderColor: self.isActive ? 'rgba(34,197,94,0.4)' : 'rgba(228,228,231,1)', duration: 0.3 });
          if (image) gsap.to(image, { filter: self.isActive ? 'grayscale(0%)' : 'grayscale(100%)', duration: 0.5, ease: "power2.out" });
        }
      });

      const elementsToReveal = card.querySelectorAll('.card-reveal');
      if (elementsToReveal.length > 0) {
        gsap.from(elementsToReveal, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out"
        });
      } else {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 60, opacity: 0, duration: 1, ease: "power3.out"
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section id="fittipaldi-section" ref={sectionRef} className="relative w-full bg-[#f2f2f2] text-zinc-900 py-32 overflow-hidden">
      <AudioPlayer
        audioSrc={ASSETS.AUDIO.FITTIPALDI}
        trackTitle="Lotus 72D"
        trackArtist="Zé Roberto"
        isActive={isSectionActive}
        accentClass="accent-green-500"
        textAccentClass="text-green-600"
      />
      <div className="relative z-10 max-w-350 mx-auto px-6 pt-20">
        <TimelineTrack />

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

        <div className="space-y-32 md:space-y-32 pb-32">
          <TimelineCard alignment="left" variant="zinc" period={t('fittipaldi.preF1.period')} title={t('fittipaldi.preF1.title')} text={t('fittipaldi.preF1.text')} imageSrc={ASSETS.FITTIPALDI.PRE_F1} priority={true} />
          <TimelineCard alignment="right" variant="yellow" period={t('fittipaldi.lotus72.period')} title={t('fittipaldi.lotus72.title')} text={t('fittipaldi.lotus72.text')} imageSrc={ASSETS.FITTIPALDI.LOTUS72} priority={true} />
          <TimelineCard alignment="left" variant="yellow" period={t('fittipaldi.mclaren74.period')} title={t('fittipaldi.mclaren74.title')} text={t('fittipaldi.mclaren74.text')} imageSrc={ASSETS.FITTIPALDI.MCLAREN74} priority={true} />
          <TimelineCard alignment="right" variant="green" period={t('fittipaldi.copersucar.period')} title={t('fittipaldi.copersucar.title')} text={t('fittipaldi.copersucar.text')} imageSrc={ASSETS.FITTIPALDI.COPERSUCAR} />
          <TimelineCard alignment="left" variant="white" period={t('fittipaldi.indy.period')} title={t('fittipaldi.indy.title')} text={t('fittipaldi.indy.text')} imageSrc={ASSETS.FITTIPALDI.INDY} />
        </div>
      </div>
    </section>
  );
}