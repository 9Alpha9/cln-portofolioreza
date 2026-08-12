import { getAllReviews, getFeaturedReviews } from "@/lib/reviews";
import { HomeClient } from "./_components/home/home-client";

export default async function Home() {
  const [reviews, featuredReviews] = await Promise.all([
    getAllReviews(),
    getFeaturedReviews(),
  ]);

  return <HomeClient reviews={reviews} featuredReviews={featuredReviews} />;
}
