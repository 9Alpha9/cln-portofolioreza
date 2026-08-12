import { getAllReviews } from "@/lib/reviews";
import { ReviewsClient } from "./reviews-client";

function toFilterValue(value: string): string {
  return value.trim().toLocaleLowerCase("id");
}

function getFilterOptions(reviews: Awaited<ReturnType<typeof getAllReviews>>, key: "category" | "brand") {
  const options = new Map<string, string>();

  reviews.forEach((review) => {
    const label = review[key].trim();
    if (label && label !== "Unknown") options.set(toFilterValue(label), label);
  });

  return Array.from(options, ([value, label]) => ({ value, label })).sort((a, b) =>
    a.label.localeCompare(b.label, "id", { sensitivity: "base" })
  );
}

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <ReviewsClient
      reviews={reviews}
      categories={getFilterOptions(reviews, "category")}
      brands={getFilterOptions(reviews, "brand")}
    />
  );
}
