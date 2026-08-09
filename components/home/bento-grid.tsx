"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type BentoItem = {
  src: string;
  spanClassName: string;
};

const BENTO_ITEMS: BentoItem[] = [
  { src: "/videos/vid-1.mp4", spanClassName: "row-span-2" },
  { src: "/videos/vid-2.mp4", spanClassName: "row-span-2 min-[480px]:row-span-3" },
  { src: "/videos/vid-3.mp4", spanClassName: "row-span-2" },
  { src: "/videos/vid-4.mp4", spanClassName: "row-span-2 min-[480px]:row-span-3" },
];

function BentoCard({ item }: { item: BentoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => { });
  }, []);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0.1;
  }, []);

  return (
    <figure
      data-bento-card
      className={`group relative overflow-hidden bg-muted ${item.spanClassName}`}
      onMouseEnter={playVideo}
      onMouseLeave={pauseVideo}
      onTouchStart={playVideo}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-within:scale-105"
      />
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
        <div className="grid grid-cols-2 auto-rows-[140px] gap-2 min-[480px]:auto-rows-[180px] min-[480px]:gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[220px]">
          {BENTO_ITEMS.map((item) => (
            <BentoCard key={item.src} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BentoGrid;
