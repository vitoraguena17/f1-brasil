"use client";
import { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// No celular a barra de endereço some/aparece no scroll: isso não deve recalcular todos os gatilhos
ScrollTrigger.config({ ignoreMobileResize: true });

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

    // Mudanças reais de altura do conteúdo (troca de idioma, fontes) invalidam as posições dos gatilhos.
    // Debounce para um único refresh por rajada de mudanças: o refresh recalcula ~150 gatilhos
    let timer: ReturnType<typeof setTimeout>;
    let lastHeight = document.body.offsetHeight;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const height = document.body.offsetHeight;
        if (Math.abs(height - lastHeight) < 2) return;
        lastHeight = height;
        ScrollTrigger.refresh();
      }, 200);
    });
    observer.observe(document.body);

    return () => {
      gsap.ticker.remove(update);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.1, smoothWheel: true, autoRaf: false }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
