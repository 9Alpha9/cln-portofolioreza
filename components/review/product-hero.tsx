import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "./score-badge";
import { PriceDisplay } from "./price-display";
import type { ReviewMetadata } from "@/types";

interface ProductHeroProps {
  review: ReviewMetadata;
}

export function ProductHero({ review }: ProductHeroProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:w-1/2">
        <Image
          src={review.thumbnail.src}
          alt={review.thumbnail.alt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{review.category}</Badge>
          <Badge variant="default">{review.brand}</Badge>
          {review.featured && <Badge variant="accent">Featured</Badge>}
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          {review.name}
        </h1>

        <p className="mt-2 text-muted">{review.shortDescription}</p>

        <div className="mt-4 flex items-center gap-4">
          {review.score && <ScoreBadge score={review.score} />}
          <PriceDisplay
            price={review.priceFrom}
            currency={review.currency}
            size="lg"
          />
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-muted">Verdict</p>
          <p className="mt-1 text-base font-medium">{review.verdict}</p>
        </div>
      </div>
    </div>
  );
}
