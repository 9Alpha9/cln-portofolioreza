import { getAllReviews } from "@/lib/reviews";
import { TierListClient } from "./tierlist-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tier List | Gaming Gear Review",
  description: "Tier list gaming gear terbaik: keyboard, mouse, headset, dan lainnya.",
};

export default async function TierListPage() {
  const reviews = await getAllReviews();

  return <TierListClient reviews={reviews} />;
}
