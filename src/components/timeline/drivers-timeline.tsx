"use client";
import { TimelineTrack } from "../ui/timeline-track";

export function DriversTimeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full bg-[#f2f2f2] overflow-hidden">
      {/* O container max-w-350 mantém o alinhamento da pista idêntico ao que tínhamos */}
      <div className="relative z-10 max-w-350 mx-auto px-6 pt-20 pb-32">
        
        {/* A Única Pista que vai cobrir TODOS os pilotos! */}
        <TimelineTrack />
        
        {/* O gap-32 cria o respiro perfeito entre o fim de um piloto e o começo do outro, passando a pista por ele */}
        <div className="relative z-10 w-full flex flex-col gap-32 md:gap-48">
          {children}
        </div>

      </div>
    </div>
  );
}