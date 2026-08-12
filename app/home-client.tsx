"use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { BentoGrid } from "@/components/home/bento-grid";
import { ReviewedGears } from "@/components/home/reviewed-gears";
import type { ReviewSummary } from "@/types";

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
