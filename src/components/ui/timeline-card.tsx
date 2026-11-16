import Image from "next/image";

// Imagens ocupam 45% do container (max-w-350 = 1400px) a partir do breakpoint md
export const CARD_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1400px) 45vw, 630px";

// Inline (não a classe `grayscale`) para o GSAP conseguir interpolar o filtro
export const GRAYSCALE = { filter: "grayscale(100%)" };

export const IMAGE_SHADOW = "shadow-[0_2px_4px_rgba(0,0,0,0.06),0_40px_70px_-28px_rgba(0,0,0,0.5)]";

/**
 * Numeral vazado (só contorno), o mesmo recurso do número do carro no capítulo "Agora".
 * A cor do contorno vem de `--year-stroke`, que o DriverSection anima quando o card fica ativo.
 */
export const OUTLINE_NUMERAL = { WebkitTextStroke: "1.5px var(--year-stroke, #d4d4d8)" } as React.CSSProperties;

export function TimelineDot() {
  return (
    <div className="card-reveal card-dot hidden md:block absolute left-[calc(50%-10px)] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-[#f2f2f2] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10" />
  );
}

/** Legenda sobre a foto: etiquetas à esquerda, texto discreto à direita (como a equipe/status no "Agora") */
export function PhotoCaption({ chips, aside }: { chips: string[]; aside?: string }) {
  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/65 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 flex items-end justify-between gap-3 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold pointer-events-none">
        <ul className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <li key={chip} className="rounded-full bg-black/35 border border-white/20 px-2.5 py-1 md:px-3 md:py-1.5 text-white">{chip}</li>
          ))}
        </ul>
        {aside && <span className="shrink-0 text-white/80 text-right pb-1">{aside}</span>}
      </div>
    </>
  );
}

/**
 * Foto do card. `.card-frame` recebe a revelação por máscara e `.card-parallax`
 * é maior que a moldura para poder deslizar com o scroll sem mostrar bordas.
 */
export function CardImage({ src, alt, className = "", objectPosition = "object-center", children }: { src: string; alt: string; className?: string; objectPosition?: string; children?: React.ReactNode }) {
  return (
    <div className={`card-reveal card-image relative rounded-3xl ${IMAGE_SHADOW} ${className}`} style={GRAYSCALE}>
      <div className="card-frame relative w-full h-full rounded-3xl overflow-hidden">
        {/* A sobra de 8% só existe onde há parallax (md+); no celular ela só cortava mais a foto */}
        <div className="card-parallax absolute inset-x-0 inset-y-0 md:-inset-y-[8%]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={CARD_IMAGE_SIZES}
            className={`object-cover ${objectPosition} transition-transform duration-1000 ease-out hover:scale-105`}
          />
        </div>
        {children}
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
  /** Posição do card no capítulo, ex.: "02 / 06" */
  index: string;
}

export function TimelineCard({ alignment, period, title, text, imageSrc, index }: TimelineCardProps) {
  const isRight = alignment === "right";
  // O primeiro ano do período vira o numeral de destaque; o período completo fica na legenda
  const year = period.match(/\d{4}/)?.[0] ?? period;

  return (
    <article className="timeline-card relative flex flex-col md:flex-row w-full justify-between items-center pl-11 md:pl-0 gap-6 md:gap-0">
      <TimelineDot />

      <div className={`card-content w-full md:w-[45%] flex flex-col justify-center ${isRight ? "md:order-2" : "md:order-1"}`}>
        <span className="card-reveal card-year block text-7xl sm:text-8xl lg:text-9xl font-bold italic leading-[0.85] tracking-tight text-transparent select-none" style={OUTLINE_NUMERAL} aria-hidden="true">
          {year}
        </span>
        <span className="card-reveal flex items-center gap-3 text-zinc-900 text-[10px] font-bold tracking-[0.25em] uppercase mt-5">
          <span className="h-px w-6 bg-linear-to-r from-green-500 to-yellow-400" aria-hidden="true" />
          {period}
        </span>
        <h3 className="card-reveal text-3xl lg:text-4xl mt-3 mb-4 font-bold text-zinc-900 tracking-tight leading-[1.1]">{title}</h3>
        <p className="card-reveal text-zinc-600 leading-relaxed text-base lg:text-lg">{text}</p>
      </div>

      {imageSrc ? (
        <CardImage
          src={imageSrc}
          alt={title}
          className={`w-full md:w-[45%] aspect-3/2 ${isRight ? "md:order-1" : "md:order-2"}`}
        >
          <PhotoCaption chips={[index]} />
        </CardImage>
      ) : (
        <div className="hidden md:block w-[45%]" />
      )}
    </article>
  );
}
