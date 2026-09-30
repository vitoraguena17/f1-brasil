import Image from "next/image";

// Imagens ocupam 45% do container (max-w-350 = 1400px) a partir do breakpoint md
export const CARD_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1400px) 45vw, 630px";

// Inline (não a classe `grayscale`) para o GSAP conseguir interpolar o filtro
export const GRAYSCALE = { filter: "grayscale(100%)" };

export const CARD_SURFACE = "bg-white/75 backdrop-blur-xl rounded-3xl border border-zinc-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_60px_-24px_rgba(0,0,0,0.22)]";
export const IMAGE_SHADOW = "shadow-[0_2px_4px_rgba(0,0,0,0.06),0_40px_70px_-28px_rgba(0,0,0,0.5)]";

export function TimelineDot() {
  return (
    <div className="card-reveal card-dot hidden md:block absolute left-[calc(50%-10px)] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-[#f2f2f2] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10" />
  );
}

/**
 * Foto do card. `.card-frame` recebe a revelação por máscara e `.card-parallax`
 * é maior que a moldura para poder deslizar com o scroll sem mostrar bordas.
 */
export function CardImage({ src, alt, className = "", objectPosition = "object-center" }: { src: string; alt: string; className?: string; objectPosition?: string }) {
  return (
    <div className={`card-reveal card-image relative rounded-3xl ${IMAGE_SHADOW} ${className}`} style={GRAYSCALE}>
      <div className="card-frame relative w-full h-full rounded-3xl overflow-hidden">
        <div className="card-parallax absolute inset-x-0 -inset-y-[8%]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={CARD_IMAGE_SIZES}
            className={`object-cover ${objectPosition} transition-transform duration-1000 ease-out hover:scale-105`}
          />
        </div>
      </div>
    </div>
  );
}

interface TimelineCardProps {
  alignment: "left" | "right";
  period: string;
  title: string;
  text: string;
  imageSrc?: string;
}

export function TimelineCard({ alignment, period, title, text, imageSrc }: TimelineCardProps) {
  const isRight = alignment === "right";

  return (
    <article className="timeline-card relative flex flex-col md:flex-row w-full justify-between items-center pl-11 md:pl-0 gap-6 md:gap-0">
      <TimelineDot />

      <div className={`card-content w-full md:w-[45%] ${CARD_SURFACE} p-5 sm:p-6 md:p-10 flex flex-col justify-center ${isRight ? "md:order-2" : "md:order-1"}`}>
        <span className="card-reveal flex items-center gap-3 text-zinc-900 text-[10px] font-bold tracking-[0.25em] uppercase">
          <span className="h-px w-6 bg-linear-to-r from-green-500 to-yellow-400" aria-hidden="true" />
          {period}
        </span>
        <h3 className="card-reveal text-2xl md:text-3xl mt-3 mb-4 font-medium text-zinc-900 tracking-normal leading-tight">{title}</h3>
        <p className="card-reveal text-zinc-600 leading-relaxed text-sm md:text-base">{text}</p>
      </div>

      {imageSrc ? (
        <CardImage
          src={imageSrc}
          alt={title}
          className={`w-full md:w-[45%] h-64 sm:h-72 lg:h-100 ${isRight ? "md:order-1" : "md:order-2"}`}
        />
      ) : (
        <div className="hidden md:block w-[45%]" />
      )}
    </article>
  );
}
