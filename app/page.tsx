import { getHomeHeroItems } from "@/lib/instagram/home-hero";
import { getAllReviews, getFeaturedReviews } from "@/lib/reviews";
import { HomeClient } from "./_components/home/home-client";

export default async function Home() {
  const [reviews, featuredReviews] = await Promise.all([
    getAllReviews(),
    getFeaturedReviews(),
  ]);
  const heroItems = getHomeHeroItems(reviews);

  return (
    <HomeClient
      reviews={reviews}
      featuredReviews={featuredReviews}
      heroItems={heroItems}
    />
  );
}
