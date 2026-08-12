"use client";

import { useEffect } from "react";
import { HeroSection } from "./hero-section";
import { ReviewedGears } from "./reviewed-gears";
import type { HomeHeroItem } from "@/lib/instagram/home-hero";
import type { ReviewSummary } from "@/types";
import BentoGrid from "./bento-grid";

interface HomeProps {
  reviews: ReviewSummary[];
  featuredReviews: ReviewSummary[];
  heroItems: HomeHeroItem[];
}

export function HomeClient({ reviews, featuredReviews, heroItems }: HomeProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <HeroSection items={heroItems} />
      <ReviewedGears initialReviews={reviews} />
      <BentoGrid featuredReviews={featuredReviews} />
    </main>
  );
}
