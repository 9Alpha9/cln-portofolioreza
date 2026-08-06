import type { ReviewMetadata } from "@/types";

interface ProductStructuredDataProps {
  review: ReviewMetadata;
}

export function ProductStructuredData({ review }: ProductStructuredDataProps) {
  const baseUrl = "https://gaminggear.review";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: review.name,
    description: review.shortDescription,
    brand: {
      "@type": "Brand",
      name: review.brand,
    },
    image: `${baseUrl}${review.thumbnail.src}`,
    review: {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "Gaming Gear Review",
      },
      reviewRating: review.score
        ? {
            "@type": "Rating",
            ratingValue: review.score,
            bestRating: 10,
          }
        : undefined,
      reviewBody: review.verdict,
    },
    offers: review.marketplaces.map((offer) => ({
      "@type": "Offer",
      priceCurrency: "IDR",
      price: offer.price,
      priceValidUntil: review.priceUpdatedAt,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: offer.storeName || offer.platform,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
