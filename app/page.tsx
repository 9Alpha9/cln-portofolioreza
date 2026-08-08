"use client";

import { getAllReviews } from "@/lib/reviews";
import { HeroSection } from "@/components/home/hero-section";
import { KierkegaardProducts } from "@/components/home/kierkegaard-products";

export default function Home() {
  const allReviews = getAllReviews();

  return (
    <main>
      <HeroSection />
      <KierkegaardProducts reviews={allReviews} limit={6} />
    </main>
  );
}
