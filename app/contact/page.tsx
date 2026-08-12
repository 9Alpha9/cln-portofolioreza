import type { Metadata } from "next";
import { ArrowUpRight, Mail, MessageCircle, PackageCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GsapReveal } from "@/components/animation";
import { CollaborationMarquee } from "./_components/collaboration-marquee";

export const metadata: Metadata = {
  title: "Contact | TahuTech",
  description: "Hubungi TahuTech untuk kerja sama brand, product seeding, dan campaign gaming gear.",
};

const collaborationTypes = [
  "Product seeding dan review",
  "Campaign dan peluncuran produk",
  "Affiliate dan marketplace activation",
  "Konten sosial media dan video review",
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 sm:pt-36">
      <Container className="max-w-[1440px] pb-16 sm:pb-24">
        <GsapReveal delay={0.15} y={40}>
          <section className="grid gap-10 border-b border-border pb-14 sm:pb-20 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
                CONTACT / PARTNERSHIP
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.94] tracking-tight sm:text-7xl lg:text-8xl">
                Mari bikin gear
                <br />
                bagus lebih dikenal.
              </h1>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                TahuTech terbuka untuk kolaborasi dengan brand yang ingin memperkenalkan gaming gear lewat konten review yang jelas dan relevan.
              </p>
            </div>
          </section>
        </GsapReveal>

        <GsapReveal delay={0.15} y={36}>
          <section className="grid gap-10 border-b border-border py-14 sm:py-20 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
                KERJA SAMA
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Bentuk kolaborasi yang bisa dibicarakan.
              </h2>
              <div className="mt-10 grid sm:grid-cols-2">
                {collaborationTypes.map((type, index) => (
                  <div
                    key={type}
                    className={`p-5 sm:p-7 ${index < collaborationTypes.length - 1 ? "border-b border-border" : ""} ${index % 2 === 0 ? "sm:border-r" : ""} ${index < collaborationTypes.length - 2 ? "sm:border-b" : "sm:border-b-0"}`}
                  >
                    <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-10 text-lg font-semibold tracking-tight">{type}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </GsapReveal>

        <CollaborationMarquee />

        <GsapReveal delay={0.15} y={36}>
          <section className="grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
                HUBUNGI
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="border border-border p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border">
                  <Mail className="h-5 w-5" />
                </div>
                <h2 className="mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Ceritakan brand dan kebutuhan campaign kamu.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Sertakan nama brand, produk, tujuan kerja sama, timeline, dan kontak yang bisa dihubungi. Tim TahuTech akan meninjau proposal kamu.
                </p>
                <a
                  href="mailto:techtahu.id@gmail.com?subject=Partnership%20Proposal%20TahuTech"
                  className="mt-8 inline-flex min-h-12 items-center gap-3 bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
                >
                  Kirim email kerja sama
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="border border-border p-5">
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  <p className="mt-8 text-sm font-semibold">Email partnership</p>
                  <a href="mailto:techtahu.id@gmail.com" className="mt-2 inline-block break-all text-sm text-muted-foreground transition-colors hover:text-foreground">
                    techtahu.id@gmail.com
                  </a>
                </div>
                <div className="border border-border p-5">
                  <PackageCheck className="h-5 w-5 text-muted-foreground" />
                  <p className="mt-8 text-sm font-semibold">Untuk product seeding</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Hubungi email partnership terlebih dahulu untuk konfirmasi pengiriman produk.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </GsapReveal>
      </Container>
    </div>
  );
}
