"use client";

import { PriceDisplay } from "./price-display";
import { GsapReveal } from "@/components/animation";
import type { ReviewMetadata } from "@/types";

interface ProductHeroProps {
  review: ReviewMetadata;
}

export function ProductHero({ review }: ProductHeroProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {/* Image */}
      <GsapReveal y={40} className="w-full lg:w-1/2 shrink-0">
        <div className="arcade-card overflow-hidden relative aspect-[4/3] bg-surface-alt flex items-center justify-center">
          <img
            src={review.thumbnail.src}
            alt={review.thumbnail.alt}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-muted text-sm text-center px-4 font-medium">
            Image Unavailable
          </span>
        </div>
      </GsapReveal>

      {/* Info */}
      <GsapReveal y={40} delay={0.15} className="flex w-full flex-col lg:w-1/2 min-w-0 justify-center">
        <div className="flex flex-wrap items-center gap-4 text-xs tracking-widest uppercase text-muted font-mono">
          <span>{review.category}</span>
          <span>{"// "}</span>
          <span>{review.brand}</span>
          {review.featured && (
            <>
              <span>{"// "}</span>
              <span className="text-white">* FEATURED</span>
            </>
          )}
        </div>

        <h1 className="mt-6 flex flex-col font-heading text-[12vw] sm:text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.85]">
          {review.name.split(' ').map((word, i) => (
            <span key={i} className="block hover:text-white transition-colors duration-500 text-foreground/90">{word}</span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-6 max-w-md">
          <p className="text-base text-muted font-serif italic">{review.shortDescription}</p>

          <div className="h-px w-full bg-border" />

          <div className="flex items-center gap-8 text-sm font-mono tracking-widest">
            {review.score && (
              <div className="flex flex-col gap-1">
                <span className="text-muted">SCORE</span>
                <span className="text-xl text-white">{review.score}/10</span>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-muted">PRICE</span>
              <span className="text-xl text-white">
                <PriceDisplay price={review.priceFrom} currency={review.currency} />
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-border" />

          <div>
            <p className="text-xs tracking-widest text-muted uppercase mb-2">Verdict</p>
            <p className="text-sm leading-relaxed text-foreground/80">{review.verdict}</p>
          </div>
        </div>
      </GsapReveal>
    </div>
  );
}
