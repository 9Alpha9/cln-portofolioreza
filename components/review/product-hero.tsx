"use client";

import { PriceDisplay } from "./price-display";
import { ProductGallery } from "@/components/media/product-gallery";
import { GsapReveal } from "@/components/animation";
import type { ReviewMetadata } from "@/types";

interface ProductHeroProps {
  review: ReviewMetadata;
}

export function ProductHero({ review }: ProductHeroProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <GsapReveal y={40} className="w-full lg:w-1/2 shrink-0">
        <ProductGallery
          images={review.gallery.length > 0 ? review.gallery : [review.thumbnail]}
        />
      </GsapReveal>

      {/* Info */}
      <GsapReveal y={40} delay={0.15} className="flex w-full flex-col lg:w-1/2 min-w-0 justify-center">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-widest uppercase text-muted font-mono">
          <span>{review.category}</span>
          <span aria-hidden="true">{"//"}</span>
          <span>{review.brand}</span>
          {review.featured && (
            <>
              <span aria-hidden="true">{"//"}</span>
              <span className="text-white">* FEATURED</span>
            </>
          )}
        </div>

        <h1 className="mt-6 font-heading text-3xl sm:text-3xl md:text-4xl font-bold  leading-[0.95]">
          {review.name}
        </h1>

        <div className="mt-8 flex flex-col gap-6 max-w-md">
          <p className="text-base leading-7">{review.shortDescription}</p>

          <div className="h-px w-full bg-border" />

          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-sm font-mono tracking-widest">
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

        </div>
      </GsapReveal>
    </div>
  );
}
