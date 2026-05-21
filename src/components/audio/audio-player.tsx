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
  
  // Novas referências para animar a largura do container
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const prevWidthRef = useRef<number>(0);

  const [trackInfo, setTrackInfo] = useState({ title: "", artist: "" });
  const [userVolume, setUserVolume] = useState(5);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [showUI, setShowUI] = useState(false);

  const userVolumeRef = useRef(userVolume);
  const isPausedByUserRef = useRef(isPausedByUser);
  useEffect(() => { userVolumeRef.current = userVolume; }, [userVolume]);
  useEffect(() => { isPausedByUserRef.current = isPausedByUser; }, [isPausedByUser]);

  const textAccentClass = "text-green-500";
  const progressAccentClass = "accent-green-500";

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

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

    if (activeTrack.id !== activeTrackIdRef.current) {
      activeTrackIdRef.current = activeTrack.id;

      gsap.to(audio, {
        volume: 0,
        duration: 0.4,
        ease: "power1.out",
        onComplete: () => {
          audio.src = activeTrack.src;
          if (!isPausedByUserRef.current) {
            audio.play().catch(() => { });
            gsap.to(audio, { volume: userVolumeRef.current / 100, duration: 1.5, ease: "power1.in" });
          }
        }
      });

      if (trackInfo.title) {
        gsap.to([titleRef.current, artistRef.current], {
          opacity: 0,
          y: -10,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            // Salva e trava a largura ANTES do texto trocar
            if (textWrapperRef.current) {
                prevWidthRef.current = textWrapperRef.current.offsetWidth;
                gsap.set(textWrapperRef.current, { width: prevWidthRef.current });
            }
            setTrackInfo({ title: activeTrack.title, artist: activeTrack.artist });
          }
        });
      } else {
        setTrackInfo({ title: activeTrack.title, artist: activeTrack.artist });
      }
    }
  }, [activeTrack]);

  useEffect(() => {
    if (trackInfo.title) {
      // Se nós travamos a largura anterior, animamos ela para o novo tamanho agora
      if (textWrapperRef.current && prevWidthRef.current > 0) {
        gsap.set(textWrapperRef.current, { width: "auto" }); // Descobre o tamanho natural da nova música
        const naturalWidth = textWrapperRef.current.offsetWidth;
        
        // Faz a transição suave de tamanho e limpa o CSS depois
        gsap.fromTo(textWrapperRef.current,
            { width: prevWidthRef.current },
            { width: naturalWidth, duration: 0.4, ease: "back.out(1.5)", clearProps: "width" }
        );
        prevWidthRef.current = 0; // Reseta para não bugar
      }

      gsap.fromTo([titleRef.current, artistRef.current],
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.5)",
          overwrite: "auto"
        }
      );
    }
  }, [trackInfo]);

  useEffect(() => {
    if (audioRef.current && !isPausedByUser && activeTrack) {
      audioRef.current.volume = userVolume / 100;
    }
  }, [userVolume, isPausedByUser, activeTrack]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPausedByUser) {
      setIsPausedByUser(false);
      audioRef.current.play().catch(() => { });
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
          {/* Botão Play/Pause com a animação de Rotação e Escala interna */}
          <button onClick={togglePlayPause} className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer overflow-hidden">
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${!isPausedByUser ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 -rotate-90'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${isPausedByUser ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-90'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </button>

          {/* Wrapper com Overflow Hidden para mascarar o texto encolhendo/crescendo */}
          <div ref={textWrapperRef} className="flex flex-col justify-center text-left flex-1 sm:flex-none py-1 overflow-hidden">
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