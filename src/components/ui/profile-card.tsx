import { CountUp } from "./count-up";
import { CARD_SURFACE, CardImage, TimelineDot } from "./timeline-card";

interface ProfileCardProps {
    /** Número do capítulo na timeline, ex.: "01" */
    chapter: string;
    label: string;
    firstName: string;
    lastName: string;
    nickname: string;
    imageSrc: string;
    titles: number;
    wins: number;
    titlesLabel: string;
    winsLabel: string;
    /** Quando presente, adiciona um asterisco ao número de títulos e exibe a nota abaixo das estatísticas */
    titlesNote?: string;
}

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
    return (
        <div className="flex-1 bg-white/80 px-2 py-4 lg:py-6 rounded-2xl border border-zinc-200/80 flex flex-col items-center justify-center transition-colors hover:border-green-400/50">
            <CountUp value={value} suffix={suffix} className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tabular-nums" />
            <span className="text-[9px] lg:text-[10px] uppercase tracking-widest text-zinc-500 mt-1 text-center">{label}</span>
        </div>
    );
}

export function ProfileCard({
    chapter, label, firstName, lastName, nickname, imageSrc, titles, wins, titlesLabel, winsLabel, titlesNote
}: ProfileCardProps) {
    return (
        <div className="timeline-card relative flex flex-col md:flex-row w-full justify-between items-center pl-11 md:pl-0 gap-8 md:gap-0 mb-16 md:mb-40">
            <TimelineDot />

            <CardImage
                src={imageSrc}
                alt={`${firstName} ${lastName}`}
                objectPosition="object-top"
                className="w-full md:w-[45%] h-80 sm:h-96 lg:h-125 order-2 md:order-1"
            />

            <div className={`card-content relative order-1 md:order-2 w-full md:w-[45%] ${CARD_SURFACE} p-5 sm:p-8 lg:p-12 flex flex-col justify-center`}>
                <span className="card-reveal absolute top-5 right-6 lg:top-8 lg:right-10 font-cursive italic text-4xl lg:text-6xl text-zinc-300 select-none" aria-hidden="true">{chapter}</span>

                <span className="card-reveal flex items-center gap-3 text-zinc-900 text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
                    <span className="h-px w-6 bg-linear-to-r from-green-500 to-yellow-400" aria-hidden="true" />
                    {label}
                </span>

                <h2 className="card-reveal w-full wrap-break-word text-[8.5vw] min-[380px]:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tight sm:tracking-wider lg:tracking-widest text-transparent bg-clip-text bg-linear-to-r from-green-600 to-yellow-500 leading-[0.9] drop-shadow-sm">
                    {firstName}<br />{lastName}
                </h2>

                <p className="card-reveal text-zinc-500 mt-4 font-cursive text-3xl lg:text-4xl">&ldquo;{nickname}&rdquo;</p>

                <div className="card-reveal flex gap-4 lg:gap-6 mt-8 md:mt-10 w-full">
                    <Stat value={titles} suffix={titlesNote ? "*" : ""} label={titlesLabel} />
                    <Stat value={wins} label={winsLabel} />
                </div>

                {titlesNote && (
                    <p className="card-reveal mt-4 text-[11px] text-zinc-500 italic">{titlesNote}</p>
                )}
            </div>
        </div>
    );
}
