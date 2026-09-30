import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Track, useSetActiveTrack } from "@/contexts/audio-context";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Options {
  /** Para a música ao sair da seção descendo a página */
  stopOnLeave?: boolean;
}

/**
 * Toca a trilha da seção enquanto ela cruza o centro da viewport.
 * Todas as seções usam a mesma linha de referência, então nunca há duas ativas ao mesmo tempo.
 */
export function useSectionTrack(ref: RefObject<HTMLElement | null>, track: Track, { stopOnLeave = false }: Options = {}) {
  const setActiveTrack = useSetActiveTrack();

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActiveTrack(track),
      onEnterBack: () => setActiveTrack(track),
      onLeave: stopOnLeave ? () => setActiveTrack(null) : undefined,
    });
  }, { scope: ref, dependencies: [track, stopOnLeave], revertOnUpdate: true });
}
