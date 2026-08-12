"use client";

import { useState, useMemo, useCallback, type ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { StaggerReveal, StaggerItem } from "@/components/animation";
import { formatCurrency } from "@/lib/formatters";
import type { ReviewSummary } from "@/types";
import { Pagination } from "@/components/ui/pagination";

interface FilterOption {
  value: string;
  label: string;
}

interface ReviewsClientProps {
  reviews: ReviewSummary[];
  categories: FilterOption[];
  brands: FilterOption[];
}

type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "score";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "price-low", label: "Harga Terendah" },
  { value: "price-high", label: "Harga Tertinggi" },
  { value: "score", label: "Skor Tertinggi" },
];

function toFilterValue(value: string): string {
  return value.trim().toLocaleLowerCase("id");
}

export function ReviewsClient({ reviews, categories, brands }: ReviewsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    searchParams.get("brand")
  );
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "newest"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [brandSearch, setBrandSearch] = useState("");
  const ITEMS_PER_PAGE = 9;
  const filteredBrands = useMemo(
    () => brands.filter((brand) => brand.label.toLocaleLowerCase("id").includes(brandSearch.toLocaleLowerCase("id"))),
    [brands, brandSearch]
  );

  const updateURL = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      router.push(`/reviews?${newParams.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      setCurrentPage(1);
      updateURL({ q: value || null });
    },
    [updateURL]
  );

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
      setCurrentPage(1);
      updateURL({ category });
    },
    [updateURL]
  );

  const handleBrandChange = useCallback(
    (brand: string | null) => {
      setSelectedBrand(brand);
      setCurrentPage(1);
      updateURL({ brand });
    },
    [updateURL]
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      setSortBy(sort);
      setCurrentPage(1);
      updateURL({ sort });
    },
    [updateURL]
  );

  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.brand.toLowerCase().includes(query) ||
          r.category.toLowerCase().includes(query) ||
          r.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      result = result.filter((review) => toFilterValue(review.category) === selectedCategory);
    }

    if (selectedBrand) {
      result = result.filter((review) => toFilterValue(review.brand) === selectedBrand);
    }

    switch (sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
        );
        break;
      case "price-low":
        result.sort((a, b) => {
          if (a.priceFrom === undefined) return 1;
          if (b.priceFrom === undefined) return -1;
          return a.priceFrom - b.priceFrom;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          if (a.priceFrom === undefined) return 1;
          if (b.priceFrom === undefined) return -1;
          return b.priceFrom - a.priceFrom;
        });
        break;
      case "score":
        result.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        break;
    }

    return result;
  }, [reviews, search, selectedCategory, selectedBrand, sortBy]);

  const hasActiveFilters = selectedCategory || selectedBrand || search || sortBy !== "newest";
  const resetAll = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSortBy("newest");
    setCurrentPage(1);
    router.push("/reviews", { scroll: false });
  };

  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedReviews = filteredReviews.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen pt-32">
      {/* <section className="border-b border-border bg-background">
        <Container className="pt-32 pb-10">
          <GsapReveal>
            <div className="max-w-3xl">
              <h1 className="text-3xl font-heading sm:text-4xl lg:text-5xl">
                Semua Review
              </h1>
              <p className="mt-3 text-muted">
                Jelajahi seluruh review gaming gear yang sudah kami uji dan
                bandingkan.
              </p>
            </div>
          </GsapReveal>
        </Container>
      </section> */}

      <section className="border-b border-t border-border bg-background">
        <Container className="py-5">
          <div className="relative border border-border focus-within:border-foreground transition-colors">
            <svg
              className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" strokeLinecap="round" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Cari produk, brand, atau kategori..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-12 w-full bg-transparent pl-11 pr-12 text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-xs text-muted transition-colors hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
        </Container>
      </section>

      <Container className="py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <details className="border border-border lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider">
              Filter dan urutkan
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="grid gap-4 border-t border-border p-4 sm:grid-cols-3">
              <label className="grid gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Urutkan
                <select
                  value={sortBy}
                  onChange={(event) => handleSortChange(event.target.value as SortOption)}
                  className="h-11 border border-border bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Kategori
                <select
                  value={selectedCategory ?? ""}
                  onChange={(event) => handleCategoryChange(event.target.value || null)}
                  className="h-11 border border-border bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Semua kategori</option>
{categories.map((category) => (
                     <option key={category.value} value={category.value}>{category.label}</option>
                   ))}
                </select>
              </label>
              <label className="grid gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Brand
                <select
                  value={selectedBrand ?? ""}
                  onChange={(event) => handleBrandChange(event.target.value || null)}
                  className="h-11 border border-border bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Semua brand</option>
{brands.map((brand) => (
                     <option key={brand.value} value={brand.value}>{brand.label}</option>
                   ))}
                </select>
              </label>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAll}
                  className="h-11 border border-border px-4 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-muted sm:col-span-3"
                >
                  Reset semua filter
                </button>
              )}
            </div>
          </details>

          <aside className="hidden flex-col gap-0 divide-y divide-border self-start border border-border lg:sticky lg:top-28 lg:flex">
            <FilterGroup title="Urutkan">
              {sortOptions.map((opt) => (
                <FilterButton
                  key={opt.value}
                  active={sortBy === opt.value}
                  onClick={() => handleSortChange(opt.value)}
                >
                  {opt.label}
                </FilterButton>
              ))}
            </FilterGroup>

            <FilterGroup title="Kategori">
              {categories.map((category) => (
                <FilterButton
                  key={category.value}
                  active={selectedCategory === category.value}
                  onClick={() =>
                    handleCategoryChange(
                      selectedCategory === category.value ? null : category.value
                    )
                  }
                >
                  {category.label}
                </FilterButton>
              ))}
            </FilterGroup>

            <FilterGroup title="Brand">
              {brands.length > 12 && (
                <div className="border-b border-border p-3">
                  <input
                    type="search"
                    value={brandSearch}
                    onChange={(event) => setBrandSearch(event.target.value)}
                    placeholder="Cari brand..."
                    className="h-9 w-full border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}
              <div className="max-h-80 overflow-y-auto">
                {filteredBrands.map((brand) => (
                  <FilterButton
                    key={brand.value}
                    active={selectedBrand === brand.value}
                    onClick={() =>
                      handleBrandChange(selectedBrand === brand.value ? null : brand.value)
                    }
                  >
                    {brand.label}
                  </FilterButton>
                ))}
              </div>
            </FilterGroup>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAll}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-muted"
              >
                Reset semua filter
              </button>
            )}
          </aside>

          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <p className="text-sm text-muted">
                {filteredReviews.length} review ditemukan
              </p>
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  {selectedCategory && (
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(null)}
                      className="border border-border px-2 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors hover:bg-muted"
                    >
                      {categories.find((category) => category.value === selectedCategory)?.label} ✕
                    </button>
                  )}
                  {selectedBrand && (
                    <button
                      type="button"
                      onClick={() => handleBrandChange(null)}
                      className="border border-border px-2 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors hover:bg-muted"
                    >
                      {selectedBrand} ✕
                    </button>
                  )}
                </div>
              )}
            </div>

            {filteredReviews.length === 0 ? (
              <div className="border border-border py-20 text-center">
                <p className="mb-2 font-heading text-lg">
                  Tidak ada review ditemukan
                </p>
                <p className="text-sm text-muted">
                  Coba filter atau pencarian yang berbeda.
                </p>
                <button
                  type="button"
                  onClick={resetAll}
                  className="mt-6 border border-foreground bg-foreground px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-background transition-opacity hover:opacity-80"
                >
                  Reset filter
                </button>
              </div>
            ) : (
              <>
                <StaggerReveal
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                  stagger={0.07}
                >
                  {paginatedReviews.map((review) => (
                    <StaggerItem key={review.slug}>
                      <ReviewCardLink review={review} />
                    </StaggerItem>
                  ))}
                </StaggerReveal>
                <Pagination
                  totalItems={filteredReviews.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={activePage}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="border-b border-border px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-gray-400/18">
        {title}
      </p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b border-border px-4 py-2.5 text-left text-sm transition-colors last:border-b-0 ${active
        ? "bg-foreground font-semibold text-background"
        : "text-foreground hover:bg-muted"
        }`}
    >
      {children}
    </button>
  );
}

function ReviewCardLink({ review }: { review: ReviewSummary }) {
  return (
    <Link
      href={`/reviews/${review.slug}`}
      className="group flex h-full flex-col border border-border bg-background"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
        <img
          src={review.thumbnail.src}
          alt={review.thumbnail.alt}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute left-0 top-0 flex flex-wrap gap-px">
          <span className="bg-background/95 px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-foreground">
            {review.category}
          </span>
          {review.featured && (
            <span className="border-b border-l border-border bg-background px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase text-green">
              FEATURED
            </span>
          )}
        </div>
        {review.score && (
          <span className="absolute right-2 top-2 border border-border bg-background/95 px-2 py-1 font-mono text-[10px] font-bold tabular-nums text-foreground">
            {review.score.toFixed(1)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-lg leading-snug transition-colors group-hover:text-muted-foreground">
          {review.name}
        </h3>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {review.brand}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {review.verdict}
        </p>
        <div className="my-2 pt-9">
          <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
            {review.priceFrom !== undefined ? (
              <span className="text-sm font-bold tabular-nums">
                {formatCurrency(review.priceFrom)}
              </span>
            ) : (
              <span className="text-sm text-muted">Harga bervariasi</span>
            )}
            <span className="text-[10px] font-semibold uppercase tracking-wider transition-colors group-hover:text-muted-foreground">
              Baca →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
