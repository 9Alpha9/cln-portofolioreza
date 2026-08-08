"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReviewSummary } from "@/types";

interface ReviewCardProps {
  review: ReviewSummary;
  variant?: "standard" | "featured" | "compact";
  index?: number;
  className?: string;
}

export function ReviewCard({
  review,
  variant = "standard",
  index,
  className,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col h-full",
        variant === "compact" && "flex-row items-center gap-4 h-auto",
        className
      )}
    >
      <Link
        href={`/reviews/${review.slug}`}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
        aria-label={`Baca review ${review.name}`}
      >
        <span className="sr-only">Baca review {review.name}</span>
      </Link>

      <div className={cn("relative flex-1 w-full", variant === "compact" && "flex-none")}>
        {/* Giant Number Indicator */}
        {index !== undefined && variant !== "compact" && (
          <div className="absolute -left-4 -top-8 z-20 pointer-events-none select-none mix-blend-difference">
            <span className="font-heading text-[8rem] leading-none font-bold tracking-tighter opacity-80 text-white">
              {index}
            </span>
          </div>
        )}
        <div
          className={cn(
            "relative overflow-hidden bg-surface transition-transform duration-700 ease-out group-hover:scale-[0.98] w-full h-full rounded-xl",
            variant === "compact" && "h-20 w-20 shrink-0 rounded-md"
          )}
        >
          <ReviewMedia review={review} />
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col shrink-0 pt-4",
          variant === "compact" && "pt-0 flex-1 justify-center"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-widest uppercase text-muted-foreground font-mono">
            <span>{review.category}</span>
            {review.featured && (
              <span className="text-accent">* FEATURED</span>
            )}
          </div>
          {review.score && (
            <span className="text-[10px] font-mono tracking-widest bg-foreground text-background px-2 py-0.5 rounded-full">{review.score}/10</span>
          )}
        </div>

        <h3
          className={cn(
            "mt-2 font-heading text-xl uppercase tracking-tight leading-none",
            variant === "compact" && "mt-0 text-sm line-clamp-1"
          )}
        >
          {review.name}
        </h3>

        <p className="mt-1 text-xs text-muted-foreground uppercase tracking-widest">{review.brand}</p>

        {variant !== "compact" && (
          <p className="mt-3 text-sm text-foreground/70 leading-relaxed line-clamp-2">
            {review.verdict}
          </p>
        )}
      </div>
    </article>
  );
}

function ReviewMedia({ review }: { review: ReviewSummary }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isHovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented
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
        src={review.thumbnail.src}
        alt={review.thumbnail.alt}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 grayscale group-hover:grayscale-0",
          isHovered && review.video ? "opacity-0" : "opacity-100"
        )}
      />

      {review.video && (
        <video
          ref={videoRef}
          src={review.video.url} // In real app, this should be a direct video URL, not a youtube watch link unless handled differently. For demo, we assume URL is playable.
          muted
          loop
          playsInline
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
