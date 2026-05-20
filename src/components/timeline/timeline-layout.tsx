"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAudio } from "@/contexts/audio-context"; 

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TimelineLayoutProps {
    id: string;
    audio: {
        src: string;
        title: string;
        artist: string;
    };
    children: React.ReactNode;
}

export function TimelineLayout({ id, audio, children }: TimelineLayoutProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { setActiveTrack } = useAudio();

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 30%",
            onToggle: (self) => {
                if (self.isActive) {
                    setActiveTrack({
                        id,
                        src: audio.src,
                        title: audio.title,
                        artist: audio.artist
                    });
                }
            }
        });

        const cards = gsap.utils.toArray(".timeline-card");
        cards.forEach((card: any) => {
            ScrollTrigger.create({
                trigger: card,
                start: "top 50%",
                end: "bottom 50%",
                onToggle: (self) => {
                    const dot = card.querySelector('.card-dot');
                    const content = card.querySelector('.card-content');
                    const image = card.querySelector('.card-image');

                    if (dot) gsap.to(dot, { scale: self.isActive ? 1.6 : 1, duration: 0.3, ease: "back.out(2)" });
                    if (content) gsap.to(content, { scale: self.isActive ? 1.03 : 1, borderColor: self.isActive ? 'rgba(34,197,94,0.4)' : 'rgba(228,228,231,1)', duration: 0.3 });
                    if (image) gsap.to(image, { filter: self.isActive ? 'grayscale(0%)' : 'grayscale(100%)', duration: 0.5, ease: "power2.out" });
                }
            });

            const elementsToReveal = card.querySelectorAll('.card-reveal');
            if (elementsToReveal.length > 0) {
                gsap.from(elementsToReveal, {
                    scrollTrigger: { trigger: card, start: "top 85%" },
                    y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out"
                });
            } else {
                gsap.from(card, {
                    scrollTrigger: { trigger: card, start: "top 85%" },
                    y: 60, opacity: 0, duration: 1, ease: "power3.out"
                });
            }
        });
    }, { scope: sectionRef });

    return (
        <section id={id} ref={sectionRef} className="relative w-full text-zinc-900">
            <div className="relative z-10 w-full">
                {children}
            </div>
        </section>
    );
}