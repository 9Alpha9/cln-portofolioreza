"use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { BentoGrid } from "@/components/home/bento-grid";
import { ReviewedGears } from "@/components/home/reviewed-gears";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <HeroSection />
      <BentoGrid />
      <ReviewedGears />
    </main>
  );
}
