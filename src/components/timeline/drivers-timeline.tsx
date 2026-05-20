"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TimelineTrack } from "../ui/timeline-track";
import { AudioPlayer } from "../audio/audio-player";
import { useAudio } from "@/contexts/audio-context";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function DriversTimeline({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setActiveTrack } = useAudio();

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            onLeaveBack: () => setActiveTrack(null),
            onLeave: () => setActiveTrack(null)
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full bg-[#f2f2f2] overflow-hidden">
            <div className="relative z-10 max-w-350 mx-auto px-6 pt-20 pb-32">
                <TimelineTrack />
                <AudioPlayer />
                <div className="relative z-10 w-full flex flex-col gap-32 md:gap-48">
                    {children}
                </div>
            </div>
        </div>
    );
}