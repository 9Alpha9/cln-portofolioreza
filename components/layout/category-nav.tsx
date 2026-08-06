import Link from "next/link";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";

interface CategoryNavProps {
  activeCategory?: string;
  className?: string;
}

export function CategoryNav({ activeCategory, className }: CategoryNavProps) {
  return (
    <nav aria-label="Kategori produk" className={className}>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={cn(
              "flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
              "border border-border hover:border-accent/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              activeCategory === category.slug
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-background text-foreground"
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
