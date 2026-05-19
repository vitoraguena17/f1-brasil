"use client";
import Image from "next/image";

interface ProfileCardProps {
    label: string;
    firstName: string;
    lastName: string;
    nickname: string;
    imageSrc: string;
    titles: string;
    wins: string;
    titlesLabel: string;
    winsLabel: string;
}

export function ProfileCard({
    label, firstName, lastName, nickname, imageSrc, titles, wins, titlesLabel, winsLabel
}: ProfileCardProps) {
    return (
        <div className="relative flex w-full justify-between items-center pl-16 md:pl-0 timeline-card md:mb-40 mb-24">

            <div className="card-reveal hidden md:block absolute left-[calc(50%-10px)] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-[#f2f2f2] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10 card-dot" />

            <div className="card-reveal hidden md:block w-[45%] h-100 lg:h-125 relative rounded-3xl card-image md:order-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.60)]" style={{ filter: 'grayscale(100%)' }}>
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={`${firstName} ${lastName}`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 1000px"
                        priority={true}
                        className="object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                </div>
            </div>

            <div className="w-full md:w-[45%] bg-white/70 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-zinc-200 group card-content shadow-[0_20px_40px_rgba(0,0,0,0.30)] md:order-2 flex flex-col justify-center">
                <span className="card-reveal inline-block text-zinc-900 text-[10px] font-bold tracking-widest uppercase mb-4">{label}</span>

                <h2 className="card-reveal text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-green-600 to-yellow-500 leading-[0.9] drop-shadow-sm">
                    {firstName}<br />{lastName}
                </h2>

                <p className="card-reveal text-zinc-500 mt-4 font-cursive text-3xl lg:text-4xl">"{nickname}"</p>

                <div className="card-reveal flex gap-4 lg:gap-6 mt-10 w-full">
                    <div className="flex-1 bg-white/80 backdrop-blur-md px-2 py-4 lg:py-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center transition-colors hover:border-green-400/50">
                        <span className="block text-4xl lg:text-5xl font-bold text-zinc-900">{titles}</span>
                        <span className="text-[9px] lg:text-[10px] uppercase tracking-widest text-zinc-500 mt-1 text-center">{titlesLabel}</span>
                    </div>
                    <div className="flex-1 bg-white/80 backdrop-blur-md px-2 py-4 lg:py-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center transition-colors hover:border-green-400/50">
                        <span className="block text-4xl lg:text-5xl font-bold text-zinc-900">{wins}</span>
                        <span className="text-[9px] lg:text-[10px] uppercase tracking-widest text-zinc-500 mt-1 text-center">{winsLabel}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}