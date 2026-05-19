"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface AnimatedButtonProps {
  onClick: () => void;
  text: string;
  delay?: number;
}

export function AnimatedButton({ onClick, text, delay = 0 }: AnimatedButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(wrapperRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        delay: delay,
        ease: "back.out(1.5)"
      }
    );
  }, { dependencies: [delay] });

  return (
    <div ref={wrapperRef} className="pointer-events-auto will-change-transform">
      <button
        onClick={onClick} className="px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-xs md:text-sm uppercase tracking-[0.2em] border border-zinc-800 shadow-xl cursor-pointer hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-300 transition-all duration-500 flex items-center gap-4 group relative overflow-hidden">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>

        {text}

        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 transition-transform duration-500 ease-out group-hover:translate-y-1.5"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}