"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type BentoItem = {
  src: string;
  label: string;
  span: number;
};

const BENTO_ITEMS: BentoItem[] = [
  { src: "/videos/vid-1.mp4", label: "Label Video_01", span: 2 },
  { src: "/videos/vid-2.mp4", label: "Label Video_02", span: 3 },
  { src: "/videos/vid-3.mp4", label: "Label Video_03", span: 2 },
  { src: "/videos/vid-4.mp4", label: "Label Video_04", span: 3 },
];

function BentoCard({ item }: { item: BentoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => { });
  }, []);

  const handleLeave = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, []);

  return (
    <figure
      data-bento-card
      className="group relative flex flex-col overflow-hidden"
      style={{ gridRow: `span ${item.span}` }}
    >
      <div
        className="relative flex-1 overflow-hidden bg-muted"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onTouchStart={handleEnter}
        onTouchEnd={handleLeave}
      >
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <figcaption className="shrink-0 py-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
        {item.label}
      </figcaption>
    </figure>
  );
}

export function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-bento-card]", {
        y: 48,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          style={{ gridAutoRows: "minmax(220px, 1fr)" }}
        >
          {BENTO_ITEMS.map((item) => (
            <BentoCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BentoGrid;
