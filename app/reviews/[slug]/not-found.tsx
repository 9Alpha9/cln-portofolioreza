import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function ReviewNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted mb-2">Review tidak ditemukan.</p>
        <p className="text-muted mb-8">
          Produk yang kamu cari mungkin belum di-review atau URL tidak valid.
        </p>
        <Link
          href="/reviews"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Lihat Semua Review
        </Link>
      </Container>
    </div>
  );
}
