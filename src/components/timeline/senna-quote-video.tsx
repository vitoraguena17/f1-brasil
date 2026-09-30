"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";
import { useSetDucked } from "@/contexts/audio-context";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SennaQuoteVideoProps {
    src: string;
    /** Frase em texto: vira legenda no modo EN e fallback se o vídeo não carregar */
    quote: string;
}

type Status = "idle" | "playing" | "ended";

export function SennaQuoteVideo({ src, quote }: SennaQuoteVideoProps) {
    const { t, language } = useLanguage();
    const setDucked = useSetDucked();

    const wrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const [status, setStatus] = useState<Status>("idle");
    const [isMuted, setIsMuted] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    // Proporção real do arquivo (o vídeo atual é 4:3); 16:9 até os metadados carregarem
    const [aspectRatio, setAspectRatio] = useState(16 / 9);
    // Começa tentando com som; só silencia se o navegador bloquear ou o usuário pedir
    const isMutedRef = useRef(false);
    // Intenção atual (tocar ou não). O play() é assíncrono: numa rolagem rápida o vídeo pode
    // "sair da tela" antes de começar a tocar, e sem essa checagem ele seguia tocando fora da seção
    const wantsPlayRef = useRef(false);

    const setMuted = (muted: boolean) => {
        isMutedRef.current = muted;
        setIsMuted(muted);
        if (videoRef.current) videoRef.current.muted = muted;
    };

    // A trilha da seção abaixa enquanto o Senna está falando
    const syncDuck = () => {
        const video = videoRef.current;
        setDucked(!!video && !video.paused && !video.muted);
    };

    useEffect(() => () => setDucked(false), [setDucked]);

    // O src só é definido após a hidratação: um 404 disparado antes disso passaria
    // despercebido pelo onError e o fallback em texto nunca apareceria
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.src = src;
        video.load();
    }, [src]);

    const play = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.ended) video.currentTime = 0;

        wantsPlayRef.current = true;
        video.muted = isMutedRef.current;
        video.volume = 0;

        const onStarted = () => {
            if (!wantsPlayRef.current) {
                video.pause();
                return;
            }
            gsap.to(video, { volume: 1, duration: 1, ease: "power1.in", overwrite: true });
        };

        video.play()
            .then(onStarted)
            .catch((error: DOMException) => {
                // Sem interação prévia o autoplay com som é bloqueado: toca mudo e oferece o botão de som
                if (error.name === "NotAllowedError" && !video.muted && wantsPlayRef.current) {
                    setMuted(true);
                    video.play().then(onStarted).catch(() => { });
                }
            });
    };

    const pause = () => {
        const video = videoRef.current;
        if (!video) return;
        wantsPlayRef.current = false;
        if (video.paused) return;
        gsap.to(video, {
            volume: 0,
            duration: 0.5,
            ease: "power1.out",
            overwrite: true,
            onComplete: () => { if (!wantsPlayRef.current) video.pause(); },
        });
    };

    useGSAP(() => {
        if (hasFailed) return;

        // Revelação: a moldura abre a partir do centro
        gsap.fromTo(wrapperRef.current,
            { clipPath: "inset(10% 6% 10% 6% round 24px)", opacity: 0 },
            {
                clipPath: "inset(0% 0% 0% 0% round 24px)",
                clearProps: "clipPath",
                opacity: 1,
                duration: 1.4,
                ease: "power3.inOut",
                scrollTrigger: { trigger: wrapperRef.current, start: "top 85%" },
            }
        );

        // Toca enquanto o vídeo está no miolo da tela, pausa ao sair em qualquer direção
        ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top 65%",
            end: "bottom 35%",
            onEnter: play,
            onEnterBack: play,
            onLeave: pause,
            onLeaveBack: pause,
        });
         
    }, { dependencies: [hasFailed], revertOnUpdate: true });

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video && progressRef.current && video.duration) {
            progressRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
        }
    };

    const caption = language === "EN" ? quote : null;

    if (hasFailed) {
        return (
            <figure className="legacy-reveal max-w-4xl mx-auto rounded-2xl md:rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-white/5 px-8 py-12 md:px-16 md:py-16 text-center shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
                <blockquote className="font-cursive italic text-2xl md:text-4xl text-zinc-200 leading-snug">{quote}</blockquote>
                <figcaption className="mt-8 text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-500">Ayrton Senna</figcaption>
            </figure>
        );
    }

    return (
        <figure className={`mx-auto ${aspectRatio < 1.5 ? "max-w-3xl" : "max-w-4xl"}`}>
            <div ref={wrapperRef} className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-white/5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
                <video
                    ref={videoRef}
                    preload="metadata"
                    playsInline
                    aria-label={quote}
                    onPlay={() => { setStatus("playing"); syncDuck(); }}
                    onPause={syncDuck}
                    onVolumeChange={syncDuck}
                    onEnded={() => { setStatus("ended"); syncDuck(); }}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={(e) => {
                        const { videoWidth, videoHeight } = e.currentTarget;
                        if (videoWidth && videoHeight) setAspectRatio(videoWidth / videoHeight);
                    }}
                    style={{ aspectRatio }}
                    onError={() => setHasFailed(true)}
                    className={`w-full object-contain transition-opacity duration-1000 ${status === "ended" ? "opacity-30" : "opacity-100"}`}
                />

                {/* Vinheta para integrar o vídeo ao fundo escuro */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] md:shadow-[inset_0_0_120px_rgba(0,0,0,0.7)]" />

                <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-700 ${status === "ended" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <span className="font-cursive italic text-3xl md:text-5xl text-zinc-100">Ayrton Senna</span>
                    <button
                        type="button"
                        onClick={play}
                        className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-[10px] md:text-xs uppercase tracking-[0.25em] text-zinc-200 backdrop-blur-md transition-colors hover:bg-white/15 cursor-pointer"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" />
                        </svg>
                        {t("ui.replay")}
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setMuted(!isMuted)}
                    aria-label={isMuted ? t("ui.soundOn") : t("ui.soundOff")}
                    className={`absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-zinc-200 transition-all duration-500 hover:bg-black/70 cursor-pointer ${isMuted && status === "playing" ? "px-4 py-2" : "p-2.5"}`}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        {isMuted
                            ? <><line x1="22" y1="9" x2="16" y2="15" /><line x1="16" y1="9" x2="22" y2="15" /></>
                            : <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />}
                    </svg>
                    {isMuted && status === "playing" && (
                        <span className="text-[10px] uppercase tracking-[0.2em]">{t("ui.soundOn")}</span>
                    )}
                </button>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                    <div ref={progressRef} className="h-full origin-left bg-linear-to-r from-green-500 to-yellow-400 transition-transform duration-300 ease-linear" style={{ transform: "scaleX(0)" }} />
                </div>
            </div>

            {caption && (
                <figcaption className="legacy-reveal mt-4 rounded-2xl bg-[#09090b]/90 backdrop-blur-sm border border-white/5 px-6 py-4 text-center font-cursive italic text-base md:text-lg text-zinc-400 leading-relaxed">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
