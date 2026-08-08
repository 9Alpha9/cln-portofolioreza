import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReviewSummary } from "@/types";

interface ReviewCardProps {
  review: ReviewSummary;
  variant?: "standard" | "featured" | "compact";
  index?: number;
}

export function ReviewCard({
  review,
  variant = "standard",
  index,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col",
        variant === "featured" && "sm:flex-row sm:items-center",
        variant === "compact" && "flex-row items-center gap-4"
      )}
    >
      <Link
        href={`/reviews/${review.slug}`}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
        aria-label={`Baca review ${review.name}`}
      >
        <span className="sr-only">Baca review {review.name}</span>
      </Link>

      <div className="relative">
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
            "relative overflow-hidden bg-surface transition-transform duration-700 ease-expo group-hover:scale-[0.98]",
            variant === "standard" && "aspect-[4/3]",
            variant === "featured" && "aspect-[4/3] sm:aspect-auto sm:h-[400px]",
            variant === "compact" && "h-20 w-20 shrink-0"
          )}
        >
          <img
            src={review.thumbnail.src}
            alt={review.thumbnail.alt}
            className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
        </div>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col pt-6",
          variant === "compact" && "pt-0"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4 text-xs tracking-widest uppercase text-muted">
            <span>{review.category}</span>
            {review.featured && (
              <span>* FEATURED</span>
            )}
          </div>
          {review.score && (
            <span className="text-xs font-mono tracking-widest">{review.score}/10</span>
          )}
        </div>

        <h3
          className={cn(
            "mt-3 font-heading text-2xl uppercase tracking-tight leading-none",
            variant === "compact" && "mt-0 text-sm line-clamp-1"
          )}
        >
          {review.name}
        </h3>

        <p className="mt-2 text-sm text-muted uppercase tracking-widest">{review.brand}</p>

        {variant !== "compact" && (
          <p className="mt-4 text-sm text-foreground/70 leading-relaxed line-clamp-2 max-w-sm">
            {review.verdict}
          </p>
        )}
      </div>
    </article>
  );
}
