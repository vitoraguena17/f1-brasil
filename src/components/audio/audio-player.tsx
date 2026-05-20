"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";

interface AudioPlayerProps {
  audioSrc: string;
  trackTitle: string;
  trackArtist: string;
  isActive: boolean;
  accentClass?: string;
  textAccentClass?: string;
}

export function AudioPlayer({
  audioSrc, trackTitle, trackArtist, isActive,
  accentClass = "accent-green-500", textAccentClass = "text-green-400"
}: AudioPlayerProps) {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [userVolume, setUserVolume] = useState(5);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [showUI, setShowUI] = useState(false);

  useGSAP(() => {
    if (!audioRef.current) return;
    if (isActive && !isPausedByUser) {
      setShowUI(true);
      audioRef.current.play().catch(() => console.log("Aguardando clique"));
      gsap.to(audioRef.current, { volume: userVolume / 100, duration: 2, overwrite: "auto" });
    } else {
      gsap.to(audioRef.current, {
        volume: 0, duration: 1.5, overwrite: "auto",
        onComplete: () => {
          if (!isActive) { setShowUI(false); audioRef.current?.pause(); }
        }
      });
    }
  }, [isActive, userVolume, isPausedByUser]);

  const handleVolumeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setUserVolume(val);
    if (val > 0 && isPausedByUser) setIsPausedByUser(false);
    if (audioRef.current) audioRef.current.volume = val / 100;
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop preload="auto" className="hidden" />
      
      <div className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-12 sm:bottom-8 z-50 bg-[#09090b]/90 backdrop-blur-xl border border-zinc-800 rounded-2xl sm:rounded-full p-3 sm:p-2 sm:pr-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-5 transition-all duration-700 shadow-2xl ${showUI ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>

        <div className="flex items-center justify-between sm:justify-start gap-3">
          <button onClick={() => setIsPausedByUser(!isPausedByUser)} className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer">
            {!isPausedByUser ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>

          <div className="flex flex-col justify-center text-left flex-1 sm:flex-none">
            <p className={`text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-bold mb-px ${textAccentClass}`}>{t('ui.soundtrack')}</p>
            <p className="text-[11px] sm:text-xs font-medium text-zinc-300 whitespace-nowrap">{trackArtist} - {trackTitle}</p>
          </div>
        </div>

        <div className="hidden sm:block w-px h-8 bg-zinc-800 mx-1" />
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start border-t border-zinc-800/50 pt-2.5 sm:border-0 sm:pt-0 group">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <input type="range" min="0" max="100" value={userVolume} onChange={handleVolumeSlider} className={`w-full sm:w-20 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer ${accentClass}`} />
        </div>
      </div>
    </>
  );
}