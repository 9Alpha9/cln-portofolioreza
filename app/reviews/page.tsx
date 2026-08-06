import { getAllReviews } from "@/lib/reviews";
import { ReviewsClient } from "./reviews-client";

export default function ReviewsPage() {
  const reviews = getAllReviews();

  return <ReviewsClient reviews={reviews} />;
}
