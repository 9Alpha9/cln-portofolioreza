import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GsapReveal, StaggerItem, StaggerReveal } from "@/components/animation";
import { formatCurrency } from "@/lib/formatters";
import { getOffersByPlatform } from "@/lib/reviews";
import { shopPlatforms, shopPage } from "@/data/shop";
import type { ShopPlatform } from "@/data/shop";
import Link from "next/link";

export const metadata: Metadata = {
  title: shopPage.title,
  description: shopPage.description,
};

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

export default function ShopPage() {
  const platforms = shopPlatforms
    .map((p) => ({ ...p, offers: getOffersByPlatform(p.id) }))
    .filter((p) => p.offers.length > 0);

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
              <Link
                href={`#${platform.id}`}
                className="group arcade-card flex h-full flex-col p-6 transition-all duration-300 hover:border-foreground/50 hover:shadow-lg"
              >
                <PlatformBadge platform={platform} />
                <h3 className="font-heading text-lg font-bold mb-1 mt-4">{platform.name}</h3>
                <p className="text-sm text-muted mb-4">{platform.description}</p>
                <span className="mt-auto text-xs font-semibold uppercase tracking-wider text-muted group-hover:text-foreground">
                  Lihat produk →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <div className="space-y-12" id="offers">
          {platforms.map((platform, platformIndex) => (
            <GsapReveal key={platform.id} delay={0.1 + platformIndex * 0.08} y={36}>
              <section id={platform.id} className="border-t border-border pt-8">
              <div className="flex items-center gap-3 mb-6">
                <PlatformBadgeSmall platform={platform} />
                <h2 className="font-heading text-xl font-bold">{platform.name}</h2>
                <span className="ml-auto text-xs font-semibold uppercase tracking-wider text-muted">
                  {platform.offers.length} produk
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {platform.offers.map((offer) => (
                  <Link
                    key={`${offer.productSlug}-${offer.platform}-${offer.label}`}
                    href={`/reviews/${offer.productSlug}`}
                    className="group arcade-card flex items-center justify-between p-4 transition-all hover:border-foreground/50"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <PlatformBadgeSmall platform={platform} />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{offer.productName}</p>
                        <p className="text-xs text-muted truncate">{offer.storeName ?? offer.platform}</p>
                      </div>
                    </div>
              <div className="flex flex-col items-end gap-2 shrink-0 sm:flex-row sm:items-center sm:gap-3">
                <span className="font-mono font-semibold whitespace-nowrap">
                  {offer.price ? formatCurrency(offer.price) : "—"}
                </span>
                <span
                  className={`arcade-btn max-w-[130px] truncate px-3 py-1 text-[11px] font-semibold sm:max-w-none sm:text-xs sm:whitespace-nowrap transition-transform duration-500 ease-expo group-hover:scale-105 ${platform.buttonColor}`}
                >
                  {offer.label}
                </span>
              </div>
                  </Link>
                ))}
              </div>
              </section>
            </GsapReveal>
          ))}
        </div>

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