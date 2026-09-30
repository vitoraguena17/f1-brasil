"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";
import { Track, useActiveTrack, useIsDucked } from "@/contexts/audio-context";

gsap.registerPlugin(useGSAP);

const DEFAULT_VOLUME = 5;
// Fração do volume mantida enquanto outra mídia com som está tocando
const DUCKED_RATIO = 0.1;

export function AudioPlayer() {
  const { t } = useLanguage();
  const activeTrack = useActiveTrack();
  const isDucked = useIsDucked();

  const audioRef = useRef<HTMLAudioElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const artistRef = useRef<HTMLParagraphElement>(null);
  const loadedTrackIdRef = useRef<string | null>(null);
  // Faixa desejada no momento; lida quando um play() assíncrono termina de carregar
  const activeTrackRef = useRef<Track | null>(null);
  // true durante o fade-out que antecede a troca de src
  const isSwappingRef = useRef(false);

  // Faixa exibida na UI (troca só depois da animação de saída do texto anterior)
  const [displayedTrack, setDisplayedTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isPaused, setIsPaused] = useState(false);

  // Espelhos em ref para os callbacks assíncronos do GSAP/Promise lerem o valor atual
  const volumeRef = useRef(DEFAULT_VOLUME);
  const isPausedRef = useRef(false);
  const isDuckedRef = useRef(false);

  const targetVolume = () => (volumeRef.current / 100) * (isDuckedRef.current ? DUCKED_RATIO : 1);

  const isVisible = activeTrack !== null;

  const setPaused = (value: boolean) => {
    isPausedRef.current = value;
    setIsPaused(value);
  };

  const fadeIn = (audio: HTMLAudioElement, duration: number) => {
    audio.play()
      .then(() => {
        // Numa rolagem rápida a seção pode ter saído da tela antes do play() começar:
        // sem essa checagem o fade-in cancelava a pausa e a música seguia tocando fora de lugar
        if (!activeTrackRef.current || isPausedRef.current) {
          audio.pause();
          return;
        }
        gsap.to(audio, { volume: targetVolume(), duration, ease: "power1.in", overwrite: true });
      })
      .catch((error: DOMException) => {
        // Sem interação prévia o navegador bloqueia o autoplay: mostra o botão de play
        if (error.name === "NotAllowedError") setPaused(true);
      });
  };

  // Troca de faixa: fade-out, troca o src e fade-in
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    activeTrackRef.current = activeTrack;
    isSwappingRef.current = false;
    gsap.killTweensOf(audio);

    if (!activeTrack) {
      gsap.to(audio, { volume: 0, duration: 0.8, ease: "power1.out", onComplete: () => { if (!activeTrackRef.current) audio.pause(); } });
      return;
    }

    // Mesma faixa voltando depois de uma pausa por scroll: apenas retoma
    if (activeTrack.id === loadedTrackIdRef.current) {
      if (!isPausedRef.current) fadeIn(audio, 1);
      return;
    }

    loadedTrackIdRef.current = activeTrack.id;
    isSwappingRef.current = true;
    gsap.to(audio, {
      volume: 0,
      duration: 0.4,
      ease: "power1.out",
      onComplete: () => {
        isSwappingRef.current = false;
        audio.src = activeTrack.src;
        if (!isPausedRef.current) fadeIn(audio, 1.5);
      },
    });

    // Anima o texto atual para fora e só então troca a faixa exibida
    gsap.to([titleRef.current, artistRef.current], {
      autoAlpha: 0,
      y: -10,
      duration: 0.2,
      stagger: 0.05,
      ease: "power2.in",
      overwrite: true,
      onComplete: () => {
        const wrapper = textWrapperRef.current;
        if (wrapper) gsap.set(wrapper, { width: wrapper.offsetWidth });
        setDisplayedTrack(activeTrack);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fadeIn só lê refs
  }, [activeTrack]);

  // Abaixa/restaura a trilha quando outra mídia com som começa/para
  useEffect(() => {
    isDuckedRef.current = isDucked;
    const audio = audioRef.current;
    // Só mexe no volume de uma faixa ativa já tocando. Durante uma troca ou um fade-out para parar,
    // o overwrite cancelaria esses tweens (a faixa não trocava ou a música não parava);
    // nesses casos o próprio fade-in já usa targetVolume(), que lê isDuckedRef
    if (!audio || audio.paused || isPausedRef.current || !activeTrackRef.current || isSwappingRef.current) return;
    gsap.to(audio, { volume: targetVolume(), duration: isDucked ? 0.6 : 1.2, ease: "power1.inOut", overwrite: true });
     
  }, [isDucked]);

  // Entrada do novo texto: a largura do wrapper cresce/encolhe até o tamanho natural
  useGSAP(() => {
    const wrapper = textWrapperRef.current;
    if (!displayedTrack || !wrapper) return;

    const fromWidth = wrapper.offsetWidth;
    gsap.set(wrapper, { width: "auto" });
    const toWidth = wrapper.offsetWidth;

    gsap.fromTo(wrapper, { width: fromWidth }, { width: toWidth, duration: 0.4, ease: "back.out(1.5)", clearProps: "width" });
    gsap.fromTo([titleRef.current, artistRef.current],
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)", overwrite: true }
    );
  }, { dependencies: [displayedTrack] });

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    gsap.killTweensOf(audio);

    if (isPausedRef.current) {
      setPaused(false);
      fadeIn(audio, 0.8);
    } else {
      setPaused(true);
      gsap.to(audio, { volume: 0, duration: 0.4, onComplete: () => audio.pause() });
    }
  };

  const handleVolumeChange = (value: number) => {
    volumeRef.current = value;
    setVolume(value);

    const audio = audioRef.current;
    if (audio && !isPausedRef.current && !audio.paused) {
      gsap.killTweensOf(audio);
      audio.volume = targetVolume();
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" />

      <div
        aria-hidden={!isVisible}
        inert={!isVisible}
        className={`fixed bottom-3 right-3 sm:right-12 sm:bottom-8 z-50 max-w-[calc(100vw-1.5rem)] bg-[#09090b]/90 backdrop-blur-xl border border-zinc-800 rounded-full p-1.5 pr-5 sm:p-2 sm:pr-6 flex items-center gap-3 sm:gap-5 transition-[translate,opacity] duration-700 ease-out shadow-2xl ${isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"}`}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 overflow-hidden">
          <button
            type="button"
            onClick={togglePlayPause}
            aria-label={isPaused ? t("ui.play") : t("ui.pause")}
            className="relative w-9 h-9 sm:w-12 sm:h-12 shrink-0 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer overflow-hidden"
          >
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${!isPaused ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 -rotate-90"}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
            </span>
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${isPaused ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 rotate-90"}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-1" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>

          {/* overflow-hidden mascara o texto enquanto a largura anima */}
          <div ref={textWrapperRef} className="flex flex-col justify-center text-left min-w-0 py-1 overflow-hidden" aria-live="polite">
            <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-bold mb-0.5 text-green-500">{t("ui.soundtrack")}</p>
            <p ref={titleRef} className="text-xs sm:text-sm font-semibold text-zinc-100 truncate leading-tight mb-0.5">{displayedTrack?.title}</p>
            <p ref={artistRef} className="text-[10px] sm:text-xs font-medium text-zinc-500 truncate leading-tight">{displayedTrack?.artist}</p>
          </div>
        </div>

        <div className="hidden sm:block w-px h-10 bg-zinc-800 mx-1" />

        <label className="hidden sm:flex items-center gap-3 group">
          <span className="sr-only">{t("ui.volume")}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="w-20 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </label>
      </div>
    </>
  );
}
