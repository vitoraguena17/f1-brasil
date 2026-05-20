"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function TimelineTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const zebraLeftRef = useRef<HTMLDivElement>(null);
  const zebraRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    
    resizeObserver.observe(trackRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);

  useGSAP(() => {
    gsap.to(carRef.current, {
      y: () => (trackRef.current ? trackRef.current.offsetHeight : 0),
      ease: "none",
      scrollTrigger: {
        trigger: trackRef.current,
        start: "top 50%", 
        end: "bottom 50%",
        scrub: 1.5, 
        invalidateOnRefresh: true, 
      }
    });

    ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
         const offset = self.progress * 1500;
         gsap.set([zebraLeftRef.current, zebraRightRef.current], { backgroundPosition: `0px ${offset}px` });
      }
    });
  }, { scope: trackRef });

  return (
    <div ref={trackRef} className="absolute left-7 md:left-1/2 top-0 bottom-0 w-12 md:w-16 md:-translate-x-1/2 flex z-0 rounded-full overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.1)] border-x-[3px] border-zinc-950 bg-zinc-950">
      
      <div 
        ref={zebraLeftRef} 
        className="w-2 md:w-2.5 h-full opacity-90" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(180deg, #22c55e 0px, #22c55e 20px, #facc15 20px, #facc15 40px)',
          backgroundSize: '100% 40px',
          backgroundRepeat: 'repeat-y'
        }} 
      />
      
      <div className="flex-1 bg-[#121214] relative overflow-visible shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
         <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(180deg, #ffffff 0px, #ffffff 15px, transparent 15px, transparent 30px)'}} />

         <div className="absolute top-0 left-0 right-0 h-3 z-10 bg-black opacity-95 shadow-md border-b border-zinc-900" style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3C/svg%3E")`,
           backgroundSize: '8px 8px'
         }} />

         <div ref={carRef} className="absolute top-0 left-[calc(50%-14px)] md:left-[calc(50%-18px)] w-7 h-12 md:w-9 md:h-14 -mt-6 z-20 will-change-transform">
            
            <svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
              
              {/* Asas (Agora separadas das suspensões) */}
              <rect x="3" y="31.5" width="18" height="2" rx="0.5" fill="#ffffff" /> {/* Asa Dianteira (Lá embaixo no bico) */}
              <rect x="3.5" y="1.5" width="17" height="3" rx="0.5" fill="#ffffff" /> {/* Asa Traseira */}
              
              {/* Suspensões (Exatamente com a mesma espessura: height=1) */}
              <rect x="5" y="27" width="14" height="1" fill="#ffffff" /> {/* Braço Suspensão Frontal */}
              <rect x="5" y="7.5" width="14" height="1" fill="#ffffff" /> {/* Braço Suspensão Traseira */}

              {/* Rodas (Cinza Chumbo Escuro #3f3f46) */}
              <rect x="0.5" y="24" width="4.5" height="7" rx="1" fill="#3f3f46" /> {/* Frontal Esq */}
              <rect x="19" y="24" width="4.5" height="7" rx="1" fill="#3f3f46" /> {/* Frontal Dir */}
              <rect x="0.5" y="4" width="4.5" height="8" rx="1" fill="#3f3f46" /> {/* Traseira Esq */}
              <rect x="19" y="4" width="4.5" height="8" rx="1" fill="#3f3f46" /> {/* Traseira Dir */}

              {/* Corpo Principal da silhueta */}
              <path d="M 12 34.5 
                       C 13.5 34.5, 13.5 31, 13.5 28 
                       C 13.5 24, 17 22, 16.5 14 
                       C 16 9, 14 7, 14 4 
                       L 10 4 
                       C 10 7, 8 9, 7.5 14 
                       C 7 22, 10.5 24, 10.5 28 
                       C 10.5 31, 10.5 34.5, 12 34.5 Z" 
                    fill="#ffffff" />

              {/* Cockpit */}
              <path d="M 12 21.5 
                       C 13.5 21.5, 14 18, 12 16 
                       C 10 18, 10.5 21.5, 12 21.5 Z" 
                    fill="#121214" />
            </svg>
         </div>

         <div className="absolute bottom-0 left-0 right-0 h-3 z-10 bg-black opacity-95 shadow-md border-t border-zinc-900" style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3C/svg%3E")`,
           backgroundSize: '8px 8px'
         }} />
      </div>

      <div 
        ref={zebraRightRef} 
        className="w-2 md:w-2.5 h-full opacity-90" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(180deg, #22c55e 0px, #22c55e 20px, #facc15 20px, #facc15 40px)',
          backgroundSize: '100% 40px',
          backgroundRepeat: 'repeat-y'
        }} 
      />
    </div>
  );
}