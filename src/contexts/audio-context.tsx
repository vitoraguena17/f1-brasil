"use client";
import { createContext, useContext, useState } from "react";

interface Track {
  id: string;
  src: string;
  title: string;
  artist: string;
}

interface AudioContextType {
  activeTrack: Track | null;
  setActiveTrack: (track: Track | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);

  return (
    <AudioContext.Provider value={{ activeTrack, setActiveTrack }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio deve ser usado dentro de um AudioProvider");
  return context;
}