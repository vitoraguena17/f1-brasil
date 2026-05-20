"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "@/contexts/language-context";
import { useAudio } from "@/contexts/audio-context";

export function AudioPlayer() {
  const { t } = useLanguage();
  const { activeTrack } = useAudio();
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const artistRef = useRef<HTMLParagraphElement>(null);
  const activeTrackIdRef = useRef<string | null>(null);

  const [trackInfo, setTrackInfo] = useState({ title: "", artist: "" });
  const [userVolume, setUserVolume] = useState(5);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [showUI, setShowUI] = useState(false);

  // Guardamos o volume e estado de pausa num ref para não interromperem a animação
  const userVolumeRef = useRef(userVolume);
  const isPausedByUserRef = useRef(isPausedByUser);
  useEffect(() => { userVolumeRef.current = userVolume; }, [userVolume]);
  useEffect(() => { isPausedByUserRef.current = isPausedByUser; }, [isPausedByUser]);

  // Cores fixadas no verde, conforme pedido!
  const textAccentClass = "text-green-500";
  const progressAccentClass = "accent-green-500";

  // EFEITO 1: Trata apenas da SAÍDA (Áudio Crossfade e Texto a desaparecer)
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    // Se voltar para o topo do ecrã (Hero)
    if (!activeTrack) {
      gsap.to(audio, {
        volume: 0,
        duration: 0.8,
        onComplete: () => {
          audio.pause();
          setShowUI(false);
        }
      });
      activeTrackIdRef.current = null;
      return;
    }

    setShowUI(true);

    // Só corre se a faixa realmente mudar (mudar de piloto)
    if (activeTrack.id !== activeTrackIdRef.current) {
      activeTrackIdRef.current = activeTrack.id;

      // 1. Crossfade Suave do Áudio
      gsap.to(audio, {
        volume: 0,
        duration: 0.4,
        ease: "power1.out",
        onComplete: () => {
          audio.src = activeTrack.src;
          if (!isPausedByUserRef.current) {
            audio.play().catch(() => {});
            gsap.to(audio, { volume: userVolumeRef.current / 100, duration: 1.5, ease: "power1.in" });
          }
        }
      });

      // 2. Animação de Saída do Texto (Se já houver uma música a tocar)
      if (trackInfo.title) {
        gsap.to([titleRef.current, artistRef.current], {
          opacity: 0,
          y: -10,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            // Só muda o estado quando o texto estiver 100% invisível
            setTrackInfo({ title: activeTrack.title, artist: activeTrack.artist });
          }
        });
      } else {
        // Primeiro carregamento da página
        setTrackInfo({ title: activeTrack.title, artist: activeTrack.artist });
      }
    }
  }, [activeTrack]); // Este bloco agora só obedece à mudança de música!

  // EFEITO 2: Trata apenas da ENTRADA (Texto a surgir suavemente)
  useEffect(() => {
    if (trackInfo.title) {
      gsap.fromTo([titleRef.current, artistRef.current], 
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.05, 
          ease: "back.out(1.5)",
          overwrite: "auto" // Previne saltos caso faça scroll muito rápido
        }
      );
    }
  }, [trackInfo]); // Este bloco só obedece ao React terminar de trocar os nomes

  // EFEITO 3: Ajuste de volume em tempo real pelo utilizador
  useEffect(() => {
    if (audioRef.current && !isPausedByUser && activeTrack) {
      audioRef.current.volume = userVolume / 100;
    }
  }, [userVolume, isPausedByUser, activeTrack]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPausedByUser) {
      setIsPausedByUser(false);
      audioRef.current.play().catch(() => {});
      gsap.to(audioRef.current, { volume: userVolume / 100, duration: 0.8, overwrite: "auto" });
    } else {
      setIsPausedByUser(true);
      gsap.to(audioRef.current, { volume: 0, duration: 0.4, overwrite: "auto", onComplete: () => audioRef.current?.pause() });
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" />

      <div className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-12 sm:bottom-8 z-50 bg-[#09090b]/90 backdrop-blur-xl border border-zinc-800 rounded-2xl sm:rounded-full p-3 sm:p-2 sm:pr-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-5 transition-all duration-700 shadow-2xl ${showUI ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
        
        <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4 overflow-hidden">
          <button onClick={togglePlayPause} className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer">
            {!isPausedByUser ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>

          <div className="flex flex-col justify-center text-left flex-1 sm:flex-none py-1">
            <p className={`text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-bold mb-0.5 ${textAccentClass}`}>{t('ui.soundtrack')}</p>
            
            <p ref={titleRef} className="text-xs sm:text-sm font-semibold text-zinc-100 whitespace-nowrap leading-tight mb-0.5 will-change-transform">{trackInfo.title}</p>
            <p ref={artistRef} className="text-[10px] sm:text-xs font-medium text-zinc-500 whitespace-nowrap leading-tight will-change-transform">{trackInfo.artist}</p>
          </div>
        </div>

        <div className="hidden sm:block w-px h-10 bg-zinc-800 mx-1" />

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start border-t border-zinc-800/50 pt-2.5 sm:border-0 sm:pt-0 group">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <input type="range" min="0" max="100" value={userVolume} onChange={(e) => setUserVolume(Number(e.target.value))} className={`w-full sm:w-20 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer ${progressAccentClass}`} />
        </div>
      </div>
    </>
  );
}