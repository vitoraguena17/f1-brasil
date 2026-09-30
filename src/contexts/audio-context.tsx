"use client";
import { createContext, useContext, useMemo, useState } from "react";

export interface Track {
  id: string;
  src: string;
  title: string;
  artist: string;
}

interface AudioControls {
  setActiveTrack: (track: Track | null) => void;
  /** Abaixa a trilha enquanto outra mídia com som (ex.: vídeo) está tocando */
  setDucked: (ducked: boolean) => void;
}

// Contextos separados: as seções só precisam dos controles e não devem
// re-renderizar a cada troca de faixa.
const ActiveTrackContext = createContext<Track | null>(null);
const DuckedContext = createContext(false);
const AudioControlsContext = createContext<AudioControls | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isDucked, setDucked] = useState(false);
  const controls = useMemo(() => ({ setActiveTrack, setDucked }), []);

  return (
    <AudioControlsContext.Provider value={controls}>
      <ActiveTrackContext.Provider value={activeTrack}>
        <DuckedContext.Provider value={isDucked}>
          {children}
        </DuckedContext.Provider>
      </ActiveTrackContext.Provider>
    </AudioControlsContext.Provider>
  );
}

export function useActiveTrack() {
  return useContext(ActiveTrackContext);
}

export function useIsDucked() {
  return useContext(DuckedContext);
}

function useAudioControls() {
  const context = useContext(AudioControlsContext);
  if (!context) throw new Error("Os controles de áudio devem ser usados dentro de um AudioProvider");
  return context;
}

export function useSetActiveTrack() {
  return useAudioControls().setActiveTrack;
}

export function useSetDucked() {
  return useAudioControls().setDucked;
}
