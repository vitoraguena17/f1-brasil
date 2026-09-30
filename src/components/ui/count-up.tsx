"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CountUpProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Conta de 0 até `value` quando entra na tela. Se o valor mudar depois (ex.: resposta da API), anima até o novo. */
export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const counter = useRef({ n: 0 });

  useGSAP(() => {
    gsap.to(counter.current, {
      n: value,
      duration: 1.6,
      ease: "power2.out",
      overwrite: true,
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${Math.round(counter.current.n)}${suffix}`;
      },
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
    });
  }, { dependencies: [value, suffix] });

  return (
    <span ref={ref} className={className}>
      {value}{suffix}
    </span>
  );
}
