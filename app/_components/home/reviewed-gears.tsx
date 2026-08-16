"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type YTPlayer = any;
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { onTransitionEnd } from "@/lib/animation-sync";
import { CursorIndicator } from "@/components/ui/cursor-indicator";
import { MediaIndicator } from "@/components/ui/media-indicator";
import { YouTubePlayer } from "@/components/ui/youtube-player";
import youtubeMedia from "@/content/media/youtube-media.json";
import type { ReviewSummary } from "@/types";

type YouTubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  views: number;
  url: string;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const videos = (youtubeMedia as YouTubeVideo[])
  .filter((item) => item.id)
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  );

const latestVideo = videos[0];

interface ReviewedGearsProps {
  initialReviews?: ReviewSummary[];
}

export function ReviewedGears({ initialReviews = [] }: ReviewedGearsProps) {
  const reviews = initialReviews;
  const total = reviews.length;
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const playerRef = useRef<YTPlayer | null>(null);
  const prevArrowRef = useRef<SVGSVGElement>(null);
  const nextArrowRef = useRef<SVGSVGElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !leftCol || !rightCol) return;

    let ctx: gsap.Context | null = null;
    const run = () => {
      if (!section.isConnected || !leftCol.isConnected || !rightCol.isConnected) return;
      ctx = gsap.context(() => {
        gsap.set(leftCol, { x: -60, opacity: 0 });
        gsap.set(rightCol, { x: 60, opacity: 0 });
        gsap.to([leftCol, rightCol], {
          x: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.15,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });
      }, section);
    };

    const cancel = onTransitionEnd(run);
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    const prevArrow = prevArrowRef.current;
    const nextArrow = nextArrowRef.current;
    if (!prevBtn || !nextBtn || !prevArrow || !nextArrow) return;

    const ctx = gsap.context(() => {
      gsap.set([prevArrow, nextArrow], { x: 0 });

      prevBtn.addEventListener("mouseenter", () => {
        gsap.to(prevArrow, { x: -5, duration: 0.3, ease: "power3.out" });
      });
      prevBtn.addEventListener("mouseleave", () => {
        gsap.to(prevArrow, { x: 0, duration: 0.3, ease: "power3.out" });
      });
      nextBtn.addEventListener("mouseenter", () => {
        gsap.to(nextArrow, { x: 5, duration: 0.3, ease: "power3.out" });
      });
      nextBtn.addEventListener("mouseleave", () => {
        gsap.to(nextArrow, { x: 0, duration: 0.3, ease: "power3.out" });
      });
    });

    return () => ctx.revert();
  }, []);

  const handlePlayerReady = useCallback((player: YTPlayer) => {
    playerRef.current = player;
  }, []);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo?.();
    } else {
      player.playVideo?.();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const player = playerRef.current;
    if (!player) return;

    if (isMuted) {
      player.unMute?.();
      setIsMuted(false);
    } else {
      player.mute?.();
      setIsMuted(true);
    }
  };

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section ref={sectionRef} className="w-full border-t border-b border-border text-foreground mt-24 bg-surface-alt">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-2 px-4 lg:px-8">
        <div
          ref={leftColRef}
          className="relative min-h-[420px] w-full overflow-hidden border-l border-r border-border md:min-h-[650px] sm:h-[850px] h-[450px]"
        >
          <CursorIndicator
            variant={isPlaying ? "pause" : "play"}
            className="isolate h-full w-full cursor-none"
          >
            {latestVideo && (
              <YouTubePlayer
                videoId={latestVideo.id}
                poster={latestVideo.thumbnail}
                autoplay={false}
                muted={false}
                loop
                className="w-full h-full"
                onReady={handlePlayerReady}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            )}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause YouTube video" : "Play YouTube video"}
              className="absolute inset-0 z-20 cursor-none border-0 bg-transparent p-0 outline-none focus:outline-none focus-visible:outline-none md:cursor-none"
            >
              {!isPlaying && (
                <MediaIndicator
                  variant="play"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-foreground bg-background/90 text-foreground md:hidden"
                />
              )}
            </button>
          </CursorIndicator>
          {isPlaying && (
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute YouTube video" : "Mute YouTube video"}
              className="absolute bottom-12 right-4 z-30 flex h-10 min-w-10 items-center justify-center border border-border bg-background/90 px-3 text-[10px] font-bold uppercase tracking-widest md:bottom-12"
            >
              {isMuted ? "Sound on" : "Sound off"}
            </button>
          )}
        </div>

        <div ref={rightColRef} className="flex min-h-[700px] flex-col justify-between border-r border-l border-border py-8 md:min-h-[620px]">
          <div className="p-8 pb-0 sm:p-12 sm:pb-0 lg:p-16 lg:pb-0">
            <h3 className="font-heading text-4xl sm:text-3xl font-black leading-[0.95] tracking-tight uppercase">
              Reviewed
              <br />
              Gears
            </h3>
          </div>

          <div className="relative flex flex-1 items-start overflow-hidden px-8 pt-6 sm:px-12 sm:pt-8 lg:px-16">
            <div ref={containerRef} className="relative flex h-full w-full justify-center">
              {reviews.map((review, i) => (
                <div
                  key={review.slug}
                  aria-hidden={i !== index}
                  className="w-full max-w-[480px] shrink-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] absolute"
                  style={{
                    opacity: i === index ? 1 : 0,
                    pointerEvents: i === index ? "auto" : "none",
                    transform:
                      i === index
                        ? "translateX(0) scale(1)"
                        : i < index
                          ? "translateX(-110%) scale(0.95)"
                          : "translateX(110%) scale(0.95)",
                  }}
                >
                  <div className="relative flex sm:aspect-[5.2/6] aspect-[4.9/6]  flex-col border border-border bg-background p-3 sm:p-4">
                    <div className="absolute top-0 right-0 border-b border-l border-border bg-background px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase text-green">
                      NEW
                    </div>

                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                      {review.thumbnail.src ? (
                        <img
                          src={review.thumbnail.src}
                          alt={review.thumbnail.alt}
                          className="max-h-[90%] max-w-[90%] object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="mt-auto flex flex-col gap-1 border-t border-border pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                      <Link href={`/reviews/${review.slug}`} className="min-w-0 break-words text-[11px] font-semibold tracking-wide text-foreground uppercase hover:underline">
                        {review.name}
                      </Link>
                      <span className="shrink-0 text-[11px] font-bold tracking-wider text-foreground">
                        {review.priceFrom ? `IDR ${formatPrice(review.priceFrom)}` : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[76px_1fr_76px] border-t border-b border-border text-xs font-semibold uppercase tracking-wider sm:grid-cols-[100px_1fr_100px]">
            <button
              ref={prevBtnRef}
              type="button"
              onClick={prev}
              className="group flex h-16 cursor-pointer items-center justify-center border-r border-border transition-colors hover:bg-muted"
              aria-label="Previous Highlight"
            >
              <svg
                ref={prevArrowRef}
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center justify-center gap-4">
              <span className="font-mono tabular-nums text-[11px] font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative h-[2px] w-20 overflow-hidden bg-border sm:w-32">
                <div
                  className="absolute top-0 bottom-0 bg-foreground transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    left: `${(index / total) * 100}%`,
                    width: `${100 / total}%`,
                  }}
                />
              </div>
              <span className="font-mono tabular-nums text-[11px] font-bold text-muted-foreground">
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <button
              ref={nextBtnRef}
              type="button"
              onClick={next}
              className="group flex h-16 cursor-pointer items-center justify-center border-l border-border transition-colors hover:bg-muted"
              aria-label="Next Highlight"
            >
              <svg
                ref={nextArrowRef}
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ReviewedGears;
