"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GsapReveal, StaggerItem, StaggerReveal } from "@/components/animation";
import { formatCurrency } from "@/lib/formatters";
import type { ShopPlatform } from "@/content/site/shop";
import { shopPage } from "@/content/site/shop";
import type { MarketplaceOffer } from "@/types";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PlatformOffer extends MarketplaceOffer {
  productName: string;
  productSlug: string;
}

interface PlatformWithOffers extends ShopPlatform {
  offers: PlatformOffer[];
}

interface ShopClientProps {
  platforms: PlatformWithOffers[];
}

function PlatformBadge({ platform }: { platform: ShopPlatform }) {
  return (
    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${platform.badgeColor}`}>
      <img src={platform.logo} alt={platform.name} className="w-8 h-8 object-contain" />
    </div>
  );
}

function PlatformBadgeSmall({ platform }: { platform: ShopPlatform }) {
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${platform.badgeColor}`}>
      <img src={platform.logo} alt={platform.name} className="w-7 h-7 object-contain" />
    </div>
  );
}

const ITEMS_PER_PAGE = 10;

export function ShopClient({ platforms }: ShopClientProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>(platforms[0]?.id || "");
  const [currentPage, setCurrentPage] = useState(1);

  const activePlatform = platforms.find((p) => p.id === selectedPlatform) || platforms[0];
  const totalPages = Math.ceil((activePlatform?.offers.length || 0) / ITEMS_PER_PAGE);
  const currentOffers = activePlatform?.offers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ) || [];

  const handlePlatformChange = (id: string) => {
    setSelectedPlatform(id);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("offers-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <Container>
        <GsapReveal delay={0.15}>
          <SectionHeading description={shopPage.tagline}>
            {shopPage.heading}
          </SectionHeading>
        </GsapReveal>

        <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12" stagger={0.12} delay={0.25}>
          {platforms.map((platform) => (
            <StaggerItem key={platform.id}>
              <button
                onClick={() => handlePlatformChange(platform.id)}
                className={`group w-full text-left arcade-card flex h-full flex-col p-6 transition-all duration-300 hover:shadow-lg ${
                  selectedPlatform === platform.id ? "border-foreground" : "hover:border-foreground/50 border-border"
                }`}
              >
                <PlatformBadge platform={platform} />
                <h3 className="font-heading text-lg font-bold mb-1 mt-4">{platform.name}</h3>
                <p className="text-sm text-muted mb-4">{platform.description}</p>
                <span className="mt-auto flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted group-hover:text-foreground">
                  {selectedPlatform === platform.id ? "Dipilih" : "Pilih Platform"}  
                  <span className="text-[10px] bg-muted px-2 py-1 rounded-full">{platform.offers.length} produk</span>
                </span>
              </button>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {activePlatform && (
          <GsapReveal delay={0.2} y={36}>
            <section id="offers-section" className="border-t border-border pt-8 min-h-[600px] scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <PlatformBadgeSmall platform={activePlatform} />
                <h2 className="font-heading text-xl font-bold">{activePlatform.name}</h2>
                <span className="ml-auto text-xs font-semibold uppercase tracking-wider text-muted">
                  {activePlatform.offers.length} produk
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {currentOffers.map((offer) => (
                  <Link
                    key={`${offer.productSlug}-${offer.platform}-${offer.label}`}
                    href={`/reviews/${offer.productSlug}`}
                    className="group arcade-card flex flex-col justify-between p-4 transition-all hover:border-foreground/50 gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1 w-full">
                      <PlatformBadgeSmall platform={activePlatform} />
                      <div className="min-w-0">
                        <p className="font-medium truncate" title={offer.productName}>{offer.productName}</p>
                        <p className="text-xs text-muted truncate" title={offer.storeName ?? offer.platform}>{offer.storeName ?? offer.platform}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full shrink-0">
                      <span className="font-mono font-semibold whitespace-nowrap">
                        {offer.price ? formatCurrency(offer.price) : "-"}
                      </span>
                      <span
                        className={`arcade-btn max-w-[130px] truncate px-3 py-1 text-[11px] font-semibold sm:max-w-none sm:text-xs sm:whitespace-nowrap transition-transform duration-500 ease-expo group-hover:scale-105 ${activePlatform.buttonColor}`}
                      >
                        {offer.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                          currentPage === page
                            ? "border-foreground bg-foreground text-background font-bold"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </section>
          </GsapReveal>
        )}

        <GsapReveal delay={0.15} y={24}>
          <div className="mt-12 border border-border p-6 text-center">
            <p className="text-sm text-muted">{shopPage.disclaimer}</p>
            <p className="mt-2 text-xs text-muted">{shopPage.disclaimerNote}</p>
          </div>
        </GsapReveal>
      </Container>
    </div>
  );
}
