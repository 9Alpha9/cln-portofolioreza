"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface VideoBentoItem {
  id: string;
  title?: string;
  subtitle?: string;
  thumbnailSrc: string;
  videoSrc: string;
  span?: "sm" | "md" | "lg" | "tall" | "wide"; // Helps dictate random bento size
}

interface BentoVideoGridProps {
  items: VideoBentoItem[];
  className?: string;
}

export function BentoVideoGrid({ items, className }: BentoVideoGridProps) {
  // Pattern to give "random" bento sizes based on index if not provided
  const getSpanClass = (index: number, span?: VideoBentoItem["span"]) => {
    // A curated sequence that creates a nice masonry/bento look without gaps
    const defaultSpan = span || ["sm", "wide", "tall", "sm", "lg", "sm", "tall", "wide"][index % 8];

    switch (defaultSpan) {
      case "lg":
        return "md:col-span-2 md:row-span-2";
      case "wide":
        return "md:col-span-2 md:row-span-1";
      case "tall":
        return "md:col-span-1 md:row-span-2";
      case "md":
        return "md:col-span-2 md:row-span-1";
      case "sm":
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 py-12">
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6 grid-flow-dense",
          className
        )}
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={cn("flex flex-col gap-2 h-full group cursor-pointer", getSpanClass(idx, item.span))}
          >
            {/* Media Container */}
            <div className="relative flex-1 w-full rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-transform duration-500 ease-out group-hover:scale-[0.98]">
              <VideoThumb item={item} />
            </div>

            {/* Text Content */}
            {(item.title || item.subtitle) && (
              <div className="flex flex-col shrink-0 px-1">
                {item.title && <h3 className="text-sm font-medium leading-none text-neutral-900 dark:text-neutral-100">{item.title}</h3>}
                {item.subtitle && <p className="text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-mono mt-1.5">{item.subtitle}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoThumb({ item }: { item: VideoBentoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isHovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video auto-play prevented:", err);
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={item.thumbnailSrc}
        alt={item.title || "Video thumbnail"}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      />

      <video
        ref={videoRef}
        src={item.videoSrc}
        muted
        loop
        playsInline
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
