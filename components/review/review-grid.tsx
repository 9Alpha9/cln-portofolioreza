import { ReviewCard } from "./review-card";
import type { ReviewSummary } from "@/types";

interface ReviewGridProps {
  reviews: ReviewSummary[];
  featured?: boolean;
}

export function ReviewGrid({ reviews, featured = false }: ReviewGridProps) {
  if (reviews.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted">Tidak ada review ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(2n)]:mt-8 [&>*:nth-child(3n)]:mt-16 pb-16">
      {reviews.map((review, index) => (
        <ReviewCard
          key={review.slug}
          review={review}
          variant={featured && index === 0 ? "featured" : "standard"}
          index={index + 1}
        />
      ))}
    </div>
  );
}
