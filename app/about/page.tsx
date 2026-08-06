import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Gaming Gear Review",
  description:
    "Tentang Gaming Gear Review dan content creator di balik review produk gaming gear.",
};

const socialLinks = [
  {
    platform: "YouTube",
    url: "https://youtube.com/@creator",
    description: "Channel utama dengan video review lengkap.",
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/creator",
    description: "Update harian dan behind the scenes.",
  },
  {
    platform: "TikTok",
    url: "https://tiktok.com/@creator",
    description: "Review singkat dan tips gaming gear.",
  },
];

const reviewPrinciples = [
  {
    title: "Objektif",
    description:
      "Setiap review ditulis berdasarkan pengujian langsung tanpa dipengaruhi sponsor.",
  },
  {
    title: "Mendalam",
    description:
      "Pengujian dilakukan dalam berbagai skenario penggunaan untuk hasil yang akurat.",
  },
  {
    title: "Transparan",
    description:
      "Harga dan link marketplace ditampilkan dengan disclaimer yang jelas.",
  },
  {
    title: "Bermanfaat",
    description:
      "Fokus pada informasi yang membantu kamu membuat keputusan pembelian.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ label: "About" }]} />

        <div className="max-w-2xl">
          <SectionHeading description="Membantu kamu menemukan gear yang tepat.">
            Tentang Gaming Gear Review
          </SectionHeading>

          {/* Creator Profile */}
          <section className="mb-12">
            <div className="flex items-start gap-6">
              <div className="h-24 w-24 shrink-0 rounded-full bg-surface-strong" />
              <div>
                <h2 className="text-xl font-bold">Gaming Gear Review</h2>
                <p className="text-muted">Content Creator</p>
                <p className="mt-4 text-muted">
                  Sebagai gamer dan tech enthusiast, saya memahami betul
                  kesulitan menemukan gaming gear yang tepat. Setiap orang
                  memiliki kebutuhan dan preferensi yang berbeda.
                </p>
                <p className="mt-3 text-muted">
                  Melalui Gaming Gear Review, saya berusaha memberikan review
                  yang objektif dan mendalam agar kamu bisa menemukan gear yang
                  sesuai dengan kebutuhanmu.
                </p>
              </div>
            </div>
          </section>

          {/* Review Principles */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6">Prinsip Review</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {reviewPrinciples.map((principle) => (
                <div key={principle.title} className="rounded-xl border border-border p-4">
                  <h3 className="font-semibold">{principle.title}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Social Links */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6">Ikuti Saya</h2>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-border p-4 hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div>
                    <span className="font-medium">{link.platform}</span>
                    <p className="text-sm text-muted">{link.description}</p>
                  </div>
                  <svg
                    className="h-5 w-5 text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </section>

          {/* Contact / Collaboration */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Kolaborasi</h2>
            <p className="text-muted mb-4">
              Tertarik untuk kolaborasi atau review produk? Kirim email ke:
            </p>
            <a
              href="mailto:hello@example.com"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              hello@example.com
            </a>
          </section>

          {/* Affiliate Disclosure */}
          <section className="rounded-xl bg-surface p-6">
            <h2 className="text-lg font-bold mb-3">Affiliate Disclosure</h2>
            <p className="text-sm text-muted">
              Beberapa tautan pembelian dapat berupa tautan afiliasi. Kreator
              dapat menerima komisi tanpa biaya tambahan bagi pembeli. Hal ini
              tidak memengaruhi hasil review. Setiap produk diuji secara independen
              dan rekomendasi didasarkan pada pengalaman penggunaan nyata.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
