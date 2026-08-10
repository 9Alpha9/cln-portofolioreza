import { getAllReviews } from "@/lib/reviews";
import { TierListClient } from "./tierlist-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tier List | Gaming Gear Review",
  description: "Tier list gaming gear terbaik: keyboard, mouse, headset, dan lainnya.",
};

export default function TierListPage() {
  const reviews = getAllReviews();

  return <TierListClient reviews={reviews} />;
}
