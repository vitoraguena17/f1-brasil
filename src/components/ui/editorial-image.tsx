"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { INTRO } from "@/constants/motion";

gsap.registerPlugin(useGSAP);

// Esfuma a base e as laterais para a imagem se dissolver no fundo da página
const EDGE_MASK = `
  linear-gradient(to top, transparent 0%, black 22%),
  linear-gradient(to left, transparent 0%, black 10%),
  linear-gradient(to right, transparent 0%, black 10%)
`;

interface EditorialImageProps {
  src: string;
  alt: string;
}

export function EditorialImage({ src, alt }: EditorialImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 2, ease: "power2.inOut", delay: INTRO.HERO_IMAGE }
    );
  }, []);

  return (
    <div
      ref={imageRef}
      className="w-full h-full md:h-[65dvh] lg:h-[75dvh] overflow-hidden relative origin-bottom transition-[filter] duration-1500 grayscale hover:grayscale-0"
      style={{
        WebkitMaskImage: EDGE_MASK,
        WebkitMaskComposite: "source-in",
        maskImage: EDGE_MASK,
        maskComposite: "intersect",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        preload
        sizes="(max-width: 768px) 100vw, 66vw"
        className="object-cover object-center"
      />
    </div>
  );
}
