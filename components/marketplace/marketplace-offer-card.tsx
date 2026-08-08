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
    tokopedia: "bg-green hover:bg-green/90",
    shopee: "bg-orange-500 hover:bg-orange-600",
    tiktok: "bg-pink hover:bg-pink/90",
  };

  return (
    <Link
      href={offer.url}
      target="_blank"
      rel={offer.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
      className={cn(
        "arcade-card group flex items-center justify-between p-4",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent",
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
            "arcade-btn px-3 py-1 text-xs font-semibold text-white transition-transform duration-500 ease-expo group-hover:scale-105",
            platformColors[offer.platform] || "bg-accent"
          )}
        >
          {offer.label}
        </span>
      </div>
    </Link>
  );
}
