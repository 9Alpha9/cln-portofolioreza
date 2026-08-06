import { MarketplaceOfferCard } from "./marketplace-offer-card";
import type { MarketplaceOffer } from "@/types";

interface MarketplaceOfferListProps {
  offers: MarketplaceOffer[];
}

export function MarketplaceOfferList({ offers }: MarketplaceOfferListProps) {
  if (offers.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Link Pembelian</h2>
      <div className="grid gap-3">
        {offers.map((offer, index) => (
          <MarketplaceOfferCard key={index} offer={offer} />
        ))}
      </div>
      <MarketplaceDisclaimer />
    </div>
  );
}

function MarketplaceDisclaimer() {
  return (
    <p className="mt-4 text-xs text-muted">
      Harga dan ketersediaan dapat berubah di marketplace. Terakhir diperbarui
      sesuai informasi pada halaman produk.
    </p>
  );
}
