"use client";
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { EditorialTitle } from "../ui/editorial-title";
import { EditorialImage } from "../ui/editorial-image";
import { EditorialText } from "../ui/editorial-text";
import { AnimatedButton } from "../ui/animated-button"; // Nosso novo componente!
import { useLanguage } from "@/contexts/language-context";

export function HeroSection() {
  const { t } = useLanguage();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
    }
    return () => {
      lenis?.start();
    };
  }, [lenis]);

  const handleStartJourney = () => {
    if (!lenis) return;

    lenis.start();
    lenis.scrollTo("#fittipaldi-section", {
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  };

  return (
    <section className="w-full h-dvh overflow-hidden flex flex-col justify-center relative pt-[11dvh] pb-20 md:pb-16">
      <div className="flex flex-col md:grid md:grid-cols-12 items-start w-full h-full">
        <div className="md:col-start-1 md:col-end-11 md:row-start-1 z-10 flex flex-col md:justify-between h-auto md:h-full pointer-events-none shrink-0">

          <div className="mix-blend-multiply">
            <EditorialTitle
              topWord={t('hero.titleTop')}
              middleWord={t('hero.titleMiddle')}
              bottomWord={t('hero.titleBottom')}
            />
          </div>

          <div className="mt-4 md:mt-0 max-w-[95%] sm:max-w-65 lg:max-w-85 md:mb-4 lg:mb-8 pointer-events-auto flex flex-col items-start gap-8">
            <EditorialText
              content={t('hero.description')}
              delay={3.2}
            />
            <AnimatedButton
              text={t('ui.startBtn')}
              onClick={handleStartJourney}
              delay={3.6}
            />
          </div>
        </div>

        <div className="md:col-start-5 md:col-end-13 md:row-start-1 z-0 w-full flex-1 min-h-0 flex items-end mt-2 md:mt-auto">
          <EditorialImage src="/hero-image-retocada-color-semfundo.png" alt="Lendas do Automobilismo" />
        </div>
      </div>
    </section>
  );
}