"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TierListSwipe } from "@/components/ui/tierlist-swipe";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { GsapReveal } from "@/components/animation";
import { formatCurrency } from "@/lib/formatters";
import type { ReviewSummary } from "@/types";
import { Search, LayoutGrid, Table, Trophy, PackageOpen } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { TIER_ORDER, TIER_STYLING, TABS, type TierType, type TabValue } from "@/data/tierlist";

interface TierListClientProps {
  reviews: ReviewSummary[];
}

type ViewMode = "grid" | "table" | "tierlist";

function getReviewTier(review: ReviewSummary): TierType | null {
  if (review.tier && TIER_ORDER.includes(review.tier as TierType)) {
    return review.tier as TierType;
  }

  return null;
}

export function TierListClient({ reviews }: TierListClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabValue>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("tierlist");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const tier = getReviewTier(review);
      if (!tier) return false;

      if (activeTab !== "All") {
        if (activeTab === "keyboard-rt") {
          const hasRapidTrigger = review.tags.some(
            (tag) => tag.toLowerCase() === "rapid-trigger" || tag.toLowerCase() === "analog"
          );
          if (review.category !== "keyboard" || !hasRapidTrigger) return false;
        } else {
          if (review.category !== activeTab) return false;
        }
      }

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = review.name.toLowerCase().includes(query);
        const matchesBrand = review.brand.toLowerCase().includes(query);
        const matchesTags = review.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchesName || matchesBrand || matchesTags;
      }

      return true;
    });
  }, [reviews, activeTab, searchQuery]);

  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedReviews = filteredReviews.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE
  );

  const groupedByTier = useMemo(() => {
    const groups: Record<TierType, ReviewSummary[]> = {
      S: [],
      A: [],
      B: [],
      D: [],
    };
    filteredReviews.forEach((review) => {
      const tier = getReviewTier(review);
      if (tier) groups[tier].push(review);
    });
    return groups;
  }, [filteredReviews]);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <Container>
        <GsapReveal className="mb-8">
          <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-center md:text-left">
            Tier List
          </h1>
          <p className="mt-2 text-muted text-center md:text-left">
            Daftar peringkat gaming gear berdasarkan review objektif kami.
          </p>
        </GsapReveal>

        <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setActiveTab(tab.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all border rounded-full cursor-pointer hover:border-foreground/50 active:scale-95 ${activeTab === tab.value
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground bg-transparent"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md border border-border focus-within:border-foreground transition-colors bg-background">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari produk, brand, atau keyword..."
              className="h-10 w-full bg-transparent pl-10 pr-10 text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-xs text-muted hover:text-foreground cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 border border-border p-1 bg-background w-fit">
            <button
              onClick={() => {
                setViewMode("grid");
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${viewMode === "grid" ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => {
                setViewMode("table");
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${viewMode === "table" ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                }`}
            >
              <Table className="h-3.5 w-3.5" />
              <span>Tabel</span>
            </button>
            <button
              onClick={() => {
                setViewMode("tierlist");
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${viewMode === "tierlist" ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                }`}
            >
              <Trophy className="h-3.5 w-3.5" />
              <span>Tier List</span>
            </button>
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="border border-border py-20 text-center">
            <PackageOpen className="mx-auto h-12 w-12 text-muted mb-4" />
            <p className="font-heading text-lg mb-2">Tidak ada produk ditemukan</p>
            <p className="text-sm text-muted">Coba bersihkan pencarian atau ganti kategori.</p>
          </div>
        ) : viewMode === "tierlist" ? (
          <div className="space-y-6">
            {TIER_ORDER.map((tier) => {
              const items = groupedByTier[tier];
              if (items.length === 0) return null;
              return (
                <div key={tier} className="border border-border bg-surface overflow-hidden">
                  <div className={`flex items-center justify-between px-5 py-4 ${TIER_STYLING[tier].bg} ${TIER_STYLING[tier].text}`}>
                    <span className="text-xl font-heading font-black tracking-tight">
                      Tier {tier}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider opacity-85">
                      {items.length} Produk
                    </span>
                  </div>
                  <div className="p-4 overflow-hidden">
                    <TierListSwipe key={items.map((i) => i.slug).join("|")} items={items} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : viewMode === "grid" ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedReviews.map((item) => {
                const tier = getReviewTier(item);
                if (!tier) return null;
                const styling = TIER_STYLING[tier];
                return (
                  <Link
                    key={item.slug}
                    href={`/reviews/${item.slug}`}
                    className="group flex h-full flex-col border border-border hover:border-foreground/50 bg-background transition-colors"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
                      <img
                        src={item.thumbnail.src}
                        alt={item.thumbnail.alt}
                        className="tier-card-image h-full w-full object-cover group-hover:scale-[1.015]"
                      />
                      <div className="absolute left-0 top-0 flex flex-wrap gap-px">
                        <span className="bg-background/95 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-foreground">
                          {item.category}
                        </span>
                      </div>
                      <span
                        className={`absolute right-2 top-2 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider ${styling.bg} ${styling.text}`}
                      >
                        {tier} Tier
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {item.brand}
                      </span>
                      <h3 className="font-heading text-base font-bold leading-tight text-foreground transition-colors group-hover:text-muted-foreground mt-2">
                        {item.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {item.verdict}
                      </p>
                      <div className="mt-10">
                        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                          <span className="text-sm font-bold font-mono">
                            {item.priceFrom ? formatCurrency(item.priceFrom) : "Harga bervariasi"}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted group-hover:text-foreground">
                            Detail
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Pagination
              totalItems={filteredReviews.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={activePage}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <>
            <div className="overflow-x-auto border border-border bg-surface scrollbar-hide">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-alt text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="p-3 sm:p-4">Produk</th>
                    <th className="p-3 w-20 sm:p-4 sm:w-24">Tier</th>
                    <th className="p-3 w-24 sm:p-4 sm:w-32">Harga</th>
                    <th className="p-4 w-32 hidden md:table-cell">Ukuran / Layout</th>
                    <th className="p-4 hidden md:table-cell">Sensor / Switch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedReviews.map((item) => {
                    const tier = getReviewTier(item);
                    if (!tier) return null;
                    const styling = TIER_STYLING[tier];
                    const layoutSpec = item.specifications
                      ?.flatMap((g) => g.items)
                      .find((i) => i.label.toLowerCase() === "layout" || i.label.toLowerCase() === "berat")?.value || "—";
                    const sensorSpec = item.specifications
                      ?.flatMap((g) => g.items)
                      .find((i) => i.label.toLowerCase() === "switch" || i.label.toLowerCase() === "sensor")?.value || "—";

                    return (
                      <tr
                        key={item.slug}
                        className="hover:bg-surface-alt/50 transition-colors cursor-pointer"
                        onClick={() => router.push(`/reviews/${item.slug}`)}
                      >
                        <td className="p-3 sm:p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.thumbnail.src}
                              alt={item.thumbnail.alt}
                              className="h-10 w-10 object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                                {item.brand}
                              </span>
                              <span className="font-heading font-semibold text-foreground block">{item.name}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 text-xs font-mono font-bold tracking-wider ${styling.bg} ${styling.text}`}
                          >
                            {tier}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-xs font-semibold whitespace-nowrap sm:p-4 sm:text-sm">
                          {item.priceFrom ? formatCurrency(item.priceFrom) : "—"}
                        </td>
                        <td className="p-4 text-muted-foreground hidden md:table-cell">{layoutSpec}</td>
                        <td className="p-4 text-muted-foreground hidden md:table-cell">{sensorSpec}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              totalItems={filteredReviews.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={activePage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </Container>
    </div>
  );
}
