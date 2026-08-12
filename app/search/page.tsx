import { getAllReviews } from "@/lib/reviews";
import { SearchClient } from "./search-client";

export default async function SearchPage() {
  const reviews = await getAllReviews();

  return <SearchClient reviews={reviews} />;
}
