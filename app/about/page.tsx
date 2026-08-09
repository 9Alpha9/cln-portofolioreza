import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Kenali Tahutech ID, pendekatan review gaming gear, dan cara pengujian produk.",
};

const reviewSteps = [
  {
    index: "01",
    title: "Pakai langsung",
    description:
      "Gear dicoba dalam penggunaan harian dan sesi bermain untuk memahami rasa pakai, kenyamanan, serta karakter utamanya.",
  },
  {
    index: "02",
    title: "Uji detail penting",
    description:
      "Fitur, build quality, konektivitas, software, dan performa dibahas dari hal yang paling relevan untuk calon pengguna.",
  },
  {
    index: "03",
    title: "Nilai dengan konteks",
    description:
      "Kesimpulan mempertimbangkan harga, alternatif, kebutuhan pengguna, dan kompromi yang perlu diketahui sebelum membeli.",
  },
];

const coverage = ["Keyboard", "Mouse", "Headset", "Microphone", "Monitor", "Controller"];

const socialLinks = [
  {
    label: "Instagram",
    handle: "@tahutech.idn",
    href: "https://www.instagram.com/tahutech.idn",
  },
  {
    label: "TikTok",
    handle: "@tahutech.id",
    href: "https://www.tiktok.com/@tahutech.id",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <Container className="max-w-[1440px] pt-28 pb-16 sm:pt-36 sm:pb-24">
        <Breadcrumbs items={[{ label: "Tentang" }]} />

        <section className="grid gap-12 border-b border-border pb-16 sm:pb-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
              TAHUTECH ID / REVIEWER GAMING GEAR
            </p>
            <h1 className="max-w-4xl text-5xl font-bold leading-[0.94] tracking-tighter sm:text-7xl lg:text-8xl">
              Biar pilih gear
              <br />
              pakai alasan,
              <br />
              bukan tebakan.
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Tahutech ID membahas gaming gear untuk membantu kamu memahami produk sebelum checkout. Fokusnya: pengalaman pakai, detail yang penting, dan rekomendasi yang sesuai kebutuhan.
            </p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-16 sm:py-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">TENTANG KANAL</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Review dibuat untuk menjawab: gear ini cocok buat siapa?
            </h2>
            <div className="mt-8 grid gap-6 text-muted-foreground sm:grid-cols-2">
              <p className="leading-relaxed">
                Tidak semua produk mahal cocok untuk semua orang. Tahutech ID melihat tiap gear dari kebutuhan nyata, mulai dari kerja, bermain kompetitif, hingga setup harian.
              </p>
              <p className="leading-relaxed">
                Konten dirancang ringkas namun tetap memberi konteks: kelebihan, kekurangan, serta hal yang perlu dipertimbangkan sebelum membeli.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-16 sm:py-24">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">CARA REVIEW</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Tiga langkah sebelum rekomendasi.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Penilaian tidak berhenti pada spesifikasi. Pengalaman penggunaan dan konteks harga ikut menjadi pertimbangan.
            </p>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-3">
            {reviewSteps.map((step) => (
              <article key={step.index} className="bg-background p-6 sm:p-8">
                <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground">{step.index}</p>
                <h3 className="mt-12 text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-b border-border py-16 sm:py-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">YANG DIBAHAS</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {coverage.map((item) => (
                <span key={item} className="text-2xl font-semibold tracking-tight sm:text-4xl">{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-10 py-16 sm:py-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">IKUTI TAHUTECH ID</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-44 flex-col justify-between bg-background p-6 transition-colors hover:bg-muted sm:p-8">
                  <span className="text-sm text-muted-foreground">{link.handle}</span>
                  <span className="flex items-center justify-between text-2xl font-semibold tracking-tight">
                    {link.label}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7m0 0H8m9 0v9" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-10 border-l-2 border-foreground pl-5">
              <h2 className="text-lg font-semibold">Transparansi</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Beberapa tautan pembelian dapat berupa tautan afiliasi. Komisi tidak menambah harga yang kamu bayar dan tidak mengubah penilaian produk. Kelebihan maupun kekurangan tetap disampaikan sesuai pengalaman review.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
