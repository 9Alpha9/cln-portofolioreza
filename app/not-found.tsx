import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted mb-2">Halaman tidak ditemukan.</p>
        <p className="text-muted mb-8">
          Halaman yang kamu cari mungkin sudah dipindahkan atau tidak tersedia.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/reviews"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium hover:bg-surface transition-colors"
          >
            Lihat Semua Review
          </Link>
        </div>
      </Container>
    </div>
  );
}
