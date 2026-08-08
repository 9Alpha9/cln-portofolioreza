import { ReviewCard } from "./review-card";
import type { ReviewSummary } from "@/types";

interface ReviewGridProps {
  reviews: ReviewSummary[];
  featured?: boolean;
}

export function ReviewGrid({ reviews, featured = false }: ReviewGridProps) {
  const getSpanClass = (index: number) => {
    // Bento pattern: wide, tall, small, large, etc.
    const pattern = ["md:col-span-1 md:row-span-1", "md:col-span-2 md:row-span-1", "md:col-span-1 md:row-span-2", "md:col-span-1 md:row-span-1", "md:col-span-2 md:row-span-2", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-2", "md:col-span-2 md:row-span-1"];
    return pattern[index % pattern.length];
  };
  if (reviews.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted">Tidak ada review ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[300px] md:auto-rows-[350px] gap-4 md:gap-6 grid-flow-dense pb-16">
      {reviews.map((review, index) => (
        <ReviewCard
          key={review.slug}
          review={review}
          variant={featured && index === 0 ? "featured" : "standard"}
          index={index + 1}
          className={getSpanClass(index)}
        />
      ))}
    </div>
  );
}
