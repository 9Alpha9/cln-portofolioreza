import Link from "next/link";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { MarketplaceOffer } from "@/types";

interface MarketplaceOfferCardProps {
  offer: MarketplaceOffer;
  className?: string;
}

export function MarketplaceOfferCard({ offer, className }: MarketplaceOfferCardProps) {
  const platformColors: Record<string, string> = {
    tokopedia: "bg-green-500 hover:bg-green-600",
    shopee: "bg-orange-500 hover:bg-orange-600",
    tiktok: "bg-pink-500 hover:bg-pink-600",
  };

  return (
    <Link
      href={offer.url}
      target="_blank"
      rel={offer.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
      className={cn(
        "flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:border-accent/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium capitalize">{offer.platform}</span>
        {offer.storeName && (
          <span className="text-xs text-muted">{offer.storeName}</span>
        )}
      </div>

      <div className="flex flex-col items-end gap-1">
        {offer.price && (
          <span className="font-semibold">{formatCurrency(offer.price)}</span>
        )}
        {offer.originalPrice && offer.originalPrice > (offer.price ?? 0) && (
          <span className="text-xs text-muted line-through">
            {formatCurrency(offer.originalPrice)}
          </span>
        )}
        <span
          className={cn(
            "rounded-lg px-3 py-1 text-xs font-medium text-white",
            platformColors[offer.platform] || "bg-accent"
          )}
        >
          {offer.label}
        </span>
      </div>
    </Link>
  );
}
