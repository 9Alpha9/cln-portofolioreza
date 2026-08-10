import { ReviewCard } from "./review-card";
import { StaggerItem, StaggerReveal } from "@/components/animation";
import type { ReviewSummary } from "@/types";

interface ReviewGridProps {
  reviews: ReviewSummary[];
  featured?: boolean;
  compact?: boolean;
}

const BENTO_PATTERN = [
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-2 md:row-span-1",
];

export function ReviewGrid({ reviews, featured = false, compact = false }: ReviewGridProps) {
  const getSpanClass = (index: number) => {
    if (compact) return "";
    return BENTO_PATTERN[index % BENTO_PATTERN.length];
  };
  if (reviews.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted">Tidak ada review ditemukan.</p>
      </div>
    );
  }

  return (
    <StaggerReveal
      className={compact
        ? "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[300px] md:auto-rows-[350px] gap-4 md:gap-6 grid-flow-dense pb-16"
      }
      stagger={0.08}
      delay={0.15}
    >
      {reviews.map((review, index) => (
        <StaggerItem key={review.slug} className={getSpanClass(index)}>
          <ReviewCard
            review={review}
            variant={compact ? "compact" : (featured && index === 0 ? "featured" : "standard")}
            index={compact ? undefined : index + 1}
          />
        </StaggerItem>
      ))}
    </StaggerReveal>
  );
}
