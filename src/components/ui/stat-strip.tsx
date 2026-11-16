import { CountUp } from "./count-up";

export interface StripStat {
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    /** Valor vindo da API: ganha o ponto verde de "ao vivo" */
    live?: boolean;
}

// Cores dos setores na cronometragem da F1: roxo (melhor geral), verde (melhor pessoal), amarelo
const SECTOR_COLORS = ["bg-purple-500", "bg-green-400", "bg-yellow-300", "bg-zinc-400"];

const VARIANTS = {
    light: {
        grid: "bg-zinc-200/80 ring-1 ring-zinc-200/80 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)]",
        cell: "bg-white/85",
        value: "text-zinc-900",
    },
    night: {
        grid: "bg-white/10 ring-1 ring-white/10",
        cell: "bg-[#0a101c]",
        value: "text-white",
    },
};

/**
 * Faixa de números no estilo das telas de cronometragem, usada nos capítulos do passado (light)
 * e no "Agora" (night). A barrinha colorida de cada célula (`.stat-bar`) é animada por quem usa.
 */
export function StatStrip({ stats, variant = "light", className = "" }: { stats: StripStat[]; variant?: keyof typeof VARIANTS; className?: string }) {
    const v = VARIANTS[variant];

    return (
        <dl className={`grid gap-px rounded-2xl overflow-hidden ${v.grid} ${className}`}>
            {stats.map((stat, i) => (
                <div key={stat.label} className={`relative flex flex-col-reverse gap-2 px-4 py-5 md:py-6 ${v.cell}`}>
                    <span className={`stat-bar absolute top-0 left-0 h-0.5 w-full origin-left ${SECTOR_COLORS[i % SECTOR_COLORS.length]}`} aria-hidden="true" />
                    <dt className="flex items-center gap-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                        {stat.live && <span className="size-1.5 shrink-0 rounded-full bg-green-400" aria-hidden="true" />}
                        {stat.label}
                    </dt>
                    <dd>
                        <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} className={`block text-3xl md:text-4xl font-bold tabular-nums ${v.value}`} />
                    </dd>
                </div>
            ))}
        </dl>
    );
}
