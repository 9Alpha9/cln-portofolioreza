import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "./score-badge";
import { PriceDisplay } from "./price-display";
import type { ReviewSummary } from "@/types";

interface ReviewCardProps {
  review: ReviewSummary;
  variant?: "standard" | "featured" | "compact";
  priorityImage?: boolean;
}

export function ReviewCard({
  review,
  variant = "standard",
  priorityImage = false,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-xl border border-border bg-background transition-colors hover:border-accent/50",
        variant === "featured" && "sm:flex-row sm:items-center",
        variant === "compact" && "flex-row items-center gap-4"
      )}
    >
      <Link
        href={`/reviews/${review.slug}`}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
        aria-label={`Baca review ${review.name}`}
      >
        <span className="sr-only">Baca review {review.name}</span>
      </Link>

      <div
        className={cn(
          "relative overflow-hidden",
          variant === "standard" && "aspect-[4/3] rounded-t-xl",
          variant === "featured" && "aspect-[4/3] sm:aspect-auto sm:h-full sm:w-1/2 sm:rounded-l-xl sm:rounded-tr-none",
          variant === "compact" && "h-20 w-20 shrink-0 rounded-lg"
        )}
      >
        <Image
          src={review.thumbnail.src}
          alt={review.thumbnail.alt}
          fill
          sizes={
            variant === "compact"
              ? "80px"
              : variant === "featured"
                ? "(min-width: 640px) 50vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priorityImage}
        />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col p-4",
          variant === "compact" && "p-0"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{review.category}</Badge>
            {review.featured && (
              <Badge variant="accent">Featured</Badge>
            )}
          </div>
          {review.score && <ScoreBadge score={review.score} />}
        </div>

        <h3
          className={cn(
            "mt-2 font-semibold leading-snug line-clamp-2",
            variant === "compact" && "mt-0 text-sm line-clamp-1"
          )}
        >
          {review.name}
        </h3>

        <p className="mt-1 text-sm text-muted">{review.brand}</p>

        {variant !== "compact" && (
          <p className="mt-2 text-sm text-muted line-clamp-2">
            {review.verdict}
          </p>
        )}

        <div className="mt-auto pt-3">
          <PriceDisplay price={review.priceFrom} currency={review.currency} />
        </div>
      </div>
    </article>
  );
}
