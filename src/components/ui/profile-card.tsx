import { CardImage, OUTLINE_NUMERAL, PhotoCaption, TimelineDot } from "./timeline-card";
import { StatStrip, type StripStat } from "./stat-strip";

// Sobrenomes longos (Fittipaldi, Barrichello) precisam de um degrau menor para caber inteiros na coluna
const LONG_NAME = "text-[9vw] md:text-[4.4vw] xl:text-7xl";
const SHORT_NAME = "text-[12vw] md:text-[5.5vw] xl:text-8xl";

interface ProfileCardProps {
    /** Número do capítulo na timeline, ex.: "01" */
    chapter: string;
    /** Ex.: "Capítulo 01 · O Pioneiro" */
    label: string;
    firstName: string;
    lastName: string;
    nickname: string;
    imageSrc: string;
    /** Anos na F1, ex.: "1970 – 1980" */
    era: string;
    teams: string[];
    stats: StripStat[];
    /** Nota de rodapé dos números (ex.: o asterisco do título do Massa) */
    note?: string;
}

export function ProfileCard({ chapter, label, firstName, lastName, nickname, imageSrc, era, teams, stats, note }: ProfileCardProps) {
    return (
        <div className="timeline-card relative flex flex-col md:flex-row w-full justify-between items-center pl-11 md:pl-0 gap-10 md:gap-0 mb-20 md:mb-40">
            <TimelineDot />

            <CardImage
                src={imageSrc}
                alt={`${firstName} ${lastName}`}
                objectPosition="object-top"
                className="w-full md:w-[45%] h-96 sm:h-112 lg:h-150 order-2 md:order-1"
            >
                <PhotoCaption chips={teams} aside={era} />
            </CardImage>

            <div className="card-content relative order-1 md:order-2 w-full md:w-[45%] flex flex-col justify-center">
                {/* Número do capítulo vazado ao fundo, como o número do carro no "Agora" */}
                <span
                    className="card-reveal card-year absolute -top-10 md:-top-20 right-0 text-[8rem] md:text-[10rem] lg:text-[13rem] font-bold italic leading-none text-transparent select-none pointer-events-none"
                    style={OUTLINE_NUMERAL}
                    aria-hidden="true"
                >
                    {chapter}
                </span>

                <div className="relative">
                    <span className="card-reveal flex items-center gap-3 text-zinc-900 text-[10px] font-bold tracking-[0.25em] uppercase mb-5">
                        <span className="h-px w-6 bg-linear-to-r from-green-500 to-yellow-400" aria-hidden="true" />
                        {label}
                    </span>

                    <h2 className="card-reveal font-bold uppercase leading-[0.9] text-zinc-900">
                        <span className="block text-base sm:text-lg lg:text-2xl tracking-[0.35em] text-zinc-500 font-medium mb-2">{firstName}</span>
                        <span className={`block w-full wrap-break-word ${lastName.length >= 10 ? LONG_NAME : SHORT_NAME} tracking-tight text-transparent bg-clip-text bg-linear-to-r from-green-600 to-yellow-500 pb-1`}>
                            {lastName}
                        </span>
                    </h2>

                    <p className="card-reveal text-zinc-500 mt-4 font-cursive italic text-2xl lg:text-3xl">&ldquo;{nickname}&rdquo;</p>

                    <StatStrip variant="light" className="card-reveal grid-cols-2 xl:grid-cols-4 mt-8 md:mt-10" stats={stats} />

                    {note && <p className="card-reveal mt-4 text-[11px] text-zinc-500 italic">{note}</p>}
                </div>
            </div>
        </div>
    );
}
