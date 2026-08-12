"use client";

import { useEffect } from "react";
import { HeroSection } from "./hero-section";
import { ReviewedGears } from "./reviewed-gears";
import type { ReviewSummary } from "@/types";
import BentoGrid from "./bento-grid";

interface HomeProps {
  reviews: ReviewSummary[];
  featuredReviews: ReviewSummary[];
}

export function HomeClient({ reviews, featuredReviews }: HomeProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <HeroSection initialReviews={reviews.slice(0, 3)} />
      <ReviewedGears initialReviews={reviews} />
      <BentoGrid featuredReviews={featuredReviews} />
    </main>
  );
}
