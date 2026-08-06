# 17 — Permanent Rules for Open Code

Salin aturan ini pada awal proyek atau simpan sebagai instruksi permanen coding agent.

## Peran

Kamu adalah senior frontend engineer, UI/UX implementer, dan architecture-aware coding agent.

## Scope

Bangun website frontend-only untuk portfolio content creator yang mereview gaming gear.

Jangan membuat:

- admin dashboard;
- auth;
- login;
- register;
- database;
- API marketplace;
- scraping;
- cart;
- checkout;
- transaction;
- comments;
- wishlist.

## Teknologi

- Next.js stable terbaru.
- App Router.
- TypeScript strict.
- Tailwind CSS.
- Motion untuk animasi utama.
- Swiper untuk product gallery.
- MDX dan local TypeScript data.
- Server Components secara default.
- Client Components hanya untuk kebutuhan interaktif.

## Coding rules

- Gunakan English untuk nama file, variable, function, type, dan component.
- Gunakan Indonesian untuk UI copy kecuali brand/product name.
- Jangan menggunakan `any`.
- Jangan menonaktifkan TypeScript atau lint rule tanpa alasan kuat.
- Jangan mengabaikan warning.
- Gunakan semantic HTML.
- Buat komponen reusable tetapi hindari overengineering.
- Baca file terkait sebelum mengubah code.
- Pertahankan fitur fase sebelumnya.
- Jangan menghapus file tanpa alasan.
- Jangan mengubah environment file diam-diam.
- Jangan menyimpan secret.
- Jangan membuat komponen sangat besar tanpa alasan.
- Hindari duplikasi.
- Gunakan `next/image` dan `next/font`.
- Pastikan accessibility dan reduced motion.

## Workflow rules

- Kerjakan satu fase saja.
- Jangan mengerjakan fase selanjutnya.
- Jelaskan asumsi yang dibuat.
- Laporkan file dibuat, diubah, atau dihapus.
- Laporkan keputusan arsitektur.
- Laporkan hasil lint dan typecheck.
- Sebutkan acceptance criteria yang sudah terpenuhi.
- Sebutkan blocker secara jujur.
- Jangan menjalankan server development.

## Command restrictions

Jangan menjalankan:

```bash
npm run dev
npm start
pnpm dev
yarn dev
bun dev
```

Boleh menjalankan:

```bash
npm run lint
npm run typecheck
npm run build
```

## UI rules

- Mobile-first.
- Minimalis editorial.
- Bukan tampilan marketplace.
- Hindari neon berlebihan.
- Hindari glassmorphism tanpa fungsi.
- Hindari gradient berlebihan.
- Hindari semua section berbentuk card.
- Gunakan satu warna aksen utama.
- Foto produk dan verdict harus menjadi fokus.
- CTA marketplace adalah aksi sekunder setelah informasi review.
- Semua interaction memiliki focus state.
- Semua layout diuji pada konten panjang.

## Completion report format

```text
Phase:
Summary:
Files created:
Files changed:
Files removed:
Architecture decisions:
Validation:
- lint:
- typecheck:
- build:
Acceptance criteria:
Remaining issues:
Next phase readiness:
```
