"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { getAllReviews } from "@/lib/reviews";
import instagramMedia from "@/data/instagram-media.json";

type InstagramMedia = {
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const videos = (instagramMedia as InstagramMedia[])
  .filter((item) => item.media_type === "VIDEO")
  .sort(
    (a, b) =>
      new Date(b.timestamp).getTime() -
      new Date(a.timestamp).getTime()
  );

const latestVideo = videos[0];

export function ReviewedGears() {
  const reviews = getAllReviews();
  const total = reviews.length;
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="w-full border-t border-border text-foreground mt-24 bg-surface-alt">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-2 px-4 lg:px-8">
        {/* LEFT COLUMN: Static Image Banner with Quote */}
        <div className="relative py-8 flex min-h-[420px] w-full items-center justify-center overflow-hidden border-l border-r border-border  md:min-h-[650px] sm:h-[850px] h-[450px]">
          {latestVideo ? (
            <video
              src={latestVideo.media_url}
              poster={latestVideo.thumbnail_url}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="relative z-10 h-full w-full object-cover"
            />
          ) : (
            <video
              src="/videos/vid-2.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controls
              className="relative z-10 h-full w-full object-cover"
            />
          )}
        </div>

        {/* RIGHT COLUMN: Slide Area */}
        <div className="flex min-h-[620px] flex-col justify-between  md:min-h-[620px] border-r border-l border-border py-8">
          {/* Header Title */}
          <div className="p-8 pb-0 sm:p-12 sm:pb-0 lg:p-16 lg:pb-0">
            <h3 className="font-heading text-4xl sm:text-3xl font-black leading-[0.95] tracking-tight uppercase">
              Reviewed
              <br />
              Gears
            </h3>
          </div>

          {/* Cards Flex Container (Only slide container changes offset) */}
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
                  {/* Card Border wrapper */}
                  <div className="relative flex sm:aspect-[5.2/6] aspect-[4.9/6]  flex-col border border-border bg-background p-3 sm:p-4">

                    {/* NEW Badge top right */}
                    <div className="absolute top-0 right-0 border-b border-l border-border bg-background px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase text-green">
                      NEW
                    </div>

                    {/* Image Area */}
                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={review.thumbnail.src}
                        alt={review.thumbnail.alt}
                        className="max-h-[90%] max-w-[90%] object-cover"
                      />
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="mt-auto flex items-baseline justify-between border-t border-border pt-3">
                      <Link href={`/reviews/${review.slug}`} className="text-[11px] font-semibold tracking-wide text-foreground uppercase hover:underline">
                        {review.name}
                      </Link>
                      <span className="text-[11px] font-bold tracking-wider text-foreground">
                        {review.priceFrom ? `IDR ${formatPrice(review.priceFrom)}` : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CONTROLS BAR */}
          <div className="grid grid-cols-[76px_1fr_76px] border-t border-b border-border text-xs font-semibold uppercase tracking-wider sm:grid-cols-[100px_1fr_100px]">
            {/* Left Button */}
            <button
              type="button"
              onClick={prev}
              className="flex h-16 items-center justify-center border-r border-border transition-colors hover:bg-muted"
              aria-label="Previous Highlight"
            >
              ←
            </button>

            {/* Slider Indicator */}
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

            {/* Right Button */}
            <button
              type="button"
              onClick={next}
              className="flex h-16 items-center justify-center border-l border-border transition-colors hover:bg-muted"
              aria-label="Next Highlight"
            >
              →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ReviewedGears;
