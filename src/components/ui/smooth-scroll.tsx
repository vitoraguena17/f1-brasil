"use client";
import { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mantém os ScrollTriggers em sincronia com a posição suavizada do Lenis
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Lenis roda no mesmo ticker do GSAP para scroll e animações andarem no mesmo frame
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Mudanças de altura (troca de idioma, fontes, viewport mobile) invalidam as posições dos gatilhos
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(document.body);

    return () => {
      gsap.ticker.remove(update);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.1, smoothWheel: true, autoRaf: false }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
