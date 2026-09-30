"use client";
import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { EditorialTitle } from "../ui/editorial-title";
import { EditorialImage } from "../ui/editorial-image";
import { EditorialText } from "../ui/editorial-text";
import { AnimatedButton } from "../ui/animated-button";
import { useLanguage } from "@/contexts/language-context";
import { ASSETS } from "@/constants/media";
import { INTRO } from "@/constants/motion";

export function HeroSection() {
  const { t } = useLanguage();
  const lenis = useLenis();

  // Fica true até o clique em "Entrar na Pista"
  const isLockedRef = useRef(true);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // A jornada sempre começa do topo e o scroll fica travado até o clique em "Entrar na Pista".
  // Esse clique também é a interação que libera o autoplay das trilhas no navegador.
  useEffect(() => {
    if (!lenis) return;

    const goToTop = () => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true, force: true });
    };

    goToTop();
    lenis.stop();

    // Rede de segurança: se o navegador restaurar a rolagem depois de montarmos (reload no meio
    // da página, voltar pelo histórico), a página ficaria travada longe do botão que a destrava
    const keepAtTop = () => {
      if (isLockedRef.current && window.scrollY > 0) goToTop();
    };
    window.addEventListener("scroll", keepAtTop, { passive: true });
    window.addEventListener("pageshow", keepAtTop);

    return () => {
      window.removeEventListener("scroll", keepAtTop);
      window.removeEventListener("pageshow", keepAtTop);
      lenis.start();
    };
  }, [lenis]);

  const handleStartJourney = () => {
    if (!lenis) return;

    isLockedRef.current = false;
    lenis.start();
    lenis.scrollTo("#fittipaldi-section", {
      duration: 1.8,
      offset: -120,
      lock: true,
      easing: (x: number) => Math.min(1, 1.001 - Math.pow(2, -10 * x)), // expo.out
    });
  };

  return (
    <section className="w-full h-svh overflow-hidden flex flex-col justify-center relative pt-[calc(var(--header-h)+3svh)] pb-20 md:pb-16 px-6 md:px-12 lg:px-24">
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
              delay={INTRO.DESCRIPTION}
            />
            <AnimatedButton
              text={t('ui.startBtn')}
              onClick={handleStartJourney}
              delay={INTRO.BUTTON}
            />
          </div>
        </div>

        <div className="md:col-start-5 md:col-end-13 md:row-start-1 z-0 w-full flex-1 min-h-0 flex items-end mt-2 md:mt-auto">
          <EditorialImage src={ASSETS.HERO} alt={t("ui.heroAlt")} />
        </div>
      </div>
    </section>
  );
}