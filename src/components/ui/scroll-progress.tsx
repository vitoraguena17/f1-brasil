"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      }
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 md:h-1.5 z-100 pointer-events-none bg-zinc-950/20">
      <div ref={barRef} className="h-full bg-linear-to-r from-green-500 to-yellow-500 origin-left will-change-transform" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}