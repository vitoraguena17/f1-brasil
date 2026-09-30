"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ZEBRA_PERIOD = 40;

const ZEBRA_COLOR = {
  backgroundImage: "repeating-linear-gradient(180deg, #22c55e 0px, #22c55e 20px, #facc15 20px, #facc15 40px)",
  backgroundSize: `100% ${ZEBRA_PERIOD}px`,
};

// Versão P&B equivalente ao grayscale do verde/amarelo, usada no legado do Senna
const ZEBRA_GRAY = {
  backgroundImage: "repeating-linear-gradient(180deg, #8f8f8f 0px, #8f8f8f 20px, #cfcfcf 20px, #cfcfcf 40px)",
  backgroundSize: `100% ${ZEBRA_PERIOD}px`,
};

// As camadas são 1 período mais altas e deslizam só esse período: a repetição esconde o "salto"
function Zebra() {
  return (
    <div className="track-zebra relative w-1.5 md:w-2.5 h-full overflow-hidden opacity-90">
      <div className="zebra-layer absolute inset-x-0 -top-10 bottom-0 will-change-transform" style={ZEBRA_GRAY} />
      <div className="zebra-layer zebra-color absolute inset-x-0 -top-10 bottom-0 will-change-transform" style={ZEBRA_COLOR} />
    </div>
  );
}

const CHECKERED_STYLE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3C/svg%3E")`,
  backgroundSize: "8px 8px",
};

export function TimelineTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // O carro percorre a pista acompanhando o centro da tela
    gsap.to(carRef.current, {
      y: () => trackRef.current?.offsetHeight ?? 0,
      ease: "none",
      scrollTrigger: {
        trigger: trackRef.current,
        start: "top 50%",
        end: "bottom 50%",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    // Zebras "correm" em sentido contrário para dar sensação de velocidade.
    // Só transform (sem repintar o fundo), o que mantém o scroll liso no celular
    const setZebraY = gsap.quickSetter(".zebra-layer", "y", "px");
    ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => setZebraY((self.progress * 1500) % ZEBRA_PERIOD),
    });
  }, { scope: trackRef });

  return (
    <div ref={trackRef} className="timeline-track absolute left-4 md:left-1/2 top-0 bottom-0 w-9 md:w-16 md:-translate-x-1/2 flex z-0 overflow-hidden rounded-full shadow-[0_0_30px_rgba(34,197,94,0.1)] bg-zinc-950" aria-hidden="true">
      <Zebra />

      <div className="flex-1 bg-[#121214] relative shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px opacity-20" style={{ backgroundImage: "repeating-linear-gradient(180deg, #ffffff 0px, #ffffff 15px, transparent 15px, transparent 30px)" }} />

        <div className="absolute top-0 left-0 right-0 h-3 z-10 bg-black opacity-95 shadow-md border-b border-zinc-900" style={CHECKERED_STYLE} />

        <div ref={carRef} className="absolute top-0 left-[calc(50%-10px)] md:left-[calc(50%-18px)] w-5 h-9 md:w-9 md:h-14 -mt-4 md:-mt-6 z-20 will-change-transform">
          <svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            <rect x="3" y="31.5" width="18" height="2" rx="0.5" fill="#f2f2f2" />
            <rect x="3.5" y="1.5" width="17" height="3" rx="0.5" fill="#f2f2f2" />
            <rect x="5" y="27" width="14" height="1" fill="#f2f2f2" />
            <rect x="5" y="7.5" width="14" height="1" fill="#f2f2f2" />
            <rect x="0.5" y="24" width="4.5" height="7" rx="1" fill="#3f3f46" />
            <rect x="19" y="24" width="4.5" height="7" rx="1" fill="#3f3f46" />
            <rect x="0.5" y="4" width="4.5" height="8" rx="1" fill="#3f3f46" />
            <rect x="19" y="4" width="4.5" height="8" rx="1" fill="#3f3f46" />
            <path d="M 12 34.5 C 13.5 34.5, 13.5 31, 13.5 28 C 13.5 24, 17 22, 16.5 14 C 16 9, 14 7, 14 4 L 10 4 C 10 7, 8 9, 7.5 14 C 7 22, 10.5 24, 10.5 28 C 10.5 31, 10.5 34.5, 12 34.5 Z" fill="#f2f2f2" />
            <path d="M 12 21.5 C 13.5 21.5, 14 18, 12 16 C 10 18, 10.5 21.5, 12 21.5 Z" fill="#121214" />
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-3 z-10 bg-black opacity-95 shadow-md border-t border-zinc-900" style={CHECKERED_STYLE} />
      </div>

      <Zebra />
    </div>
  );
}
