# 18 — Phase-by-Phase Prompts for Open Code

Gunakan **satu prompt per sesi atau per fase**. Jangan salin semua prompt sekaligus.

---

## Phase 1 — Repository Audit dan Project Foundation

```text
Baca seluruh dokumentasi proyek pada folder docs, terutama:
- 00-START-HERE.md
- 01-PROJECT-BRIEF.md
- 02-SCOPE-AND-MVP.md
- 08-TECHNICAL-ARCHITECTURE.md
- 17-OPENCODE-RULES.md

Kerjakan Phase 1 saja.

Tujuan:
1. Audit repository yang ada.
2. Pastikan Next.js App Router, TypeScript strict, Tailwind, ESLint, dan src directory terkonfigurasi.
3. Buat struktur folder dasar sesuai technical architecture.
4. Buat README proyek.
5. Tambahkan script typecheck.
6. Jangan membuat halaman fitur.
7. Jangan menjalankan development server.

Gunakan design-taste-frontend hanya untuk memahami standar desain, belum untuk membuat visual final.

Validation:
- lint
- typecheck
- build jika diperlukan

Laporkan file dan acceptance criteria.
```

Acceptance:

- fondasi proyek valid;
- struktur folder tersedia;
- strict TypeScript aktif;
- tidak ada fitur di luar scope.

---

## Phase 2 — Domain Types dan Static Content Foundation

```text
Kerjakan Phase 2 saja.

Baca:
- 04-CONTENT-MODEL.md
- 08-TECHNICAL-ARCHITECTURE.md
- 17-OPENCODE-RULES.md
- hasil Phase 1

Tugas:
1. Buat domain types untuk review, product image, specifications, video, category, brand, dan marketplace.
2. Buat sample data minimal tiga produk dari kategori berbeda.
3. Buat formatter currency dan date.
4. Buat review query helpers:
   - getAllReviews
   - getReviewBySlug
   - getFeaturedReviews
   - getReviewsByCategory
   - getReviewsByBrand
   - getRelatedReviews
5. Buat validasi data tanpa backend.
6. Tambahkan unit yang mudah diuji secara manual.
7. Jangan membuat UI halaman penuh.

Validation:
- lint
- typecheck
- build bila perlu
```

---

## Phase 3 — Design Tokens dan UI Primitives

```text
Kerjakan Phase 3 saja.

Baca:
- 05-UI-UX-DIRECTION.md
- 07-DESIGN-SYSTEM.md
- 16-TASTE-SKILL-SETUP.md
- 17-OPENCODE-RULES.md

Gunakan design-taste-frontend.

Tugas:
1. Buat design tokens pada globals.css.
2. Konfigurasikan font dengan next/font.
3. Buat primitives:
   - Container
   - Button
   - IconButton
   - Badge
   - Input
   - SearchInput
   - SectionHeading
   - Skeleton
4. Pastikan focus-visible, disabled, hover, dan reduced-motion.
5. Jangan membuat landing page.
6. Hindari style generik dan efek berlebihan.

Validation:
- lint
- typecheck
```

---

## Phase 4 — Global Layout, Header, Navigation, Footer

```text
Kerjakan Phase 4 saja.

Baca hasil Phase 3 dan:
- 03-INFORMATION-ARCHITECTURE.md
- 06-MOBILE-WIREFRAME-SPEC.md
- 10-COMPONENT-PLAN.md

Tugas:
1. Buat root layout.
2. Buat skip link.
3. Buat mobile-first site header.
4. Buat desktop navigation.
5. Buat mobile navigation sheet.
6. Buat footer.
7. Buat breadcrumbs component.
8. Pastikan keyboard navigation dan focus management.
9. Jangan membuat konten halaman final.

Validation:
- lint
- typecheck
```

---

## Phase 5 — Review dan Product Components

```text
Kerjakan Phase 5 saja.

Tugas:
1. Buat ReviewCard dengan standard, featured, dan compact variant.
2. Buat ReviewGrid.
3. Buat ProductHero.
4. Buat QuickVerdict.
5. Buat ProsCons.
6. Buat ScoreBadge.
7. Buat PriceDisplay.
8. Gunakan sample data.
9. Uji nama produk panjang, tanpa score, dan tanpa harga.
10. Tetap mobile-first.

Gunakan design-taste-frontend untuk hierarchy dan visual balance.

Jangan membuat halaman final.
Validation:
- lint
- typecheck
```

---

## Phase 6 — Gallery, Video, Specifications, Marketplace

```text
Kerjakan Phase 6 saja.

Tugas:
1. Buat ProductGallery menggunakan Swiper.
2. Pastikan accessible labels dan keyboard interaction.
3. Buat LazyYouTubeEmbed yang memuat iframe setelah klik.
4. Buat SpecificationList dan SpecificationGroup.
5. Buat MarketplaceOfferCard dan MarketplaceOfferList.
6. Buat MarketplaceDisclaimer.
7. Buat MobilePurchaseBar.
8. Jangan menggunakan API atau scraping.
9. Pastikan affiliate link memiliki rel yang aman.
10. Hormati reduced motion.

Validation:
- lint
- typecheck
```

---

## Phase 7 — Landing Page Mobile-First

```text
Kerjakan Phase 7 saja.

Baca:
- 06-MOBILE-WIREFRAME-SPEC.md
- 11-PAGE-IMPLEMENTATION.md

Gunakan komponen yang sudah ada.

Buat landing page dengan:
1. featured review hero;
2. category navigation;
3. latest reviews;
4. highlighted bento section;
5. recommended gear;
6. creator profile;
7. social channels.

Mulai dari mobile 320–430 px.
Setelah mobile stabil, tambahkan tablet dan desktop.
Jangan membuat tampilan seperti marketplace.
Gunakan Motion secara ringan.
Jangan menjalankan dev server.

Validation:
- lint
- typecheck
- build bila perlu
```

---

## Phase 8 — Reviews Listing, Search, Filter, Sort

```text
Kerjakan Phase 8 saja.

Tugas:
1. Buat /reviews.
2. Buat search lokal.
3. Buat category filter.
4. Buat brand filter.
5. Buat price filter.
6. Buat sorting.
7. Buat active filter chips.
8. Buat mobile filter sheet.
9. Buat no-results state.
10. Sinkronkan query pencarian yang relevan dengan URL.
11. Pastikan filter tidak memerlukan database.

Validation:
- lint
- typecheck
```

---

## Phase 9 — Category dan Brand Pages

```text
Kerjakan Phase 9 saja.

Tugas:
1. Buat /category/[slug].
2. Buat /brand/[slug].
3. Gunakan generateStaticParams.
4. Buat metadata dinamis.
5. Tampilkan featured review dan review grid.
6. Tampilkan empty state untuk slug valid tanpa konten.
7. Gunakan notFound untuk slug tidak valid.
8. Tambahkan related categories atau brand context.
9. Tetap mobile-first.

Validation:
- lint
- typecheck
- build
```

---

## Phase 10 — Review Detail Page

```text
Kerjakan Phase 10 saja.

Buat /reviews/[slug] dengan urutan:
1. breadcrumbs;
2. product hero;
3. product gallery;
4. quick verdict;
5. lazy video;
6. MDX review article;
7. pros and cons;
8. specifications;
9. marketplace offers;
10. related reviews;
11. mobile purchase bar.

Tugas tambahan:
- generateStaticParams;
- generateMetadata;
- notFound;
- layout mobile-first;
- sticky sidebar desktop bila bermanfaat;
- harga memiliki tanggal dan disclaimer;
- CTA marketplace tidak mengalahkan verdict.

Validation:
- lint
- typecheck
- build
```

---

## Phase 11 — About, Search Page, Not Found, States

```text
Kerjakan Phase 11 saja.

Tugas:
1. Buat /about.
2. Buat /search jika belum tersedia sebagai halaman terpisah.
3. Buat global not-found.
4. Lengkapi loading state.
5. Lengkapi empty state.
6. Lengkapi error/fallback untuk video dan gambar.
7. Tambahkan affiliate disclosure.
8. Tambahkan contact/collaboration section tanpa form backend.

Validation:
- lint
- typecheck
```

---

## Phase 12 — Motion dan Responsive Refinement

```text
Kerjakan Phase 12 saja.

Gunakan design-taste-frontend.

Tugas:
1. Audit seluruh halaman pada mobile.
2. Perbaiki spacing, hierarchy, typography, dan visual balance.
3. Adaptasi tablet dan desktop.
4. Tambahkan Motion hanya pada interaction yang membantu.
5. Hormati prefers-reduced-motion.
6. Hilangkan horizontal overflow.
7. Uji konten panjang.
8. Jangan menambah fitur baru.
9. Jangan menggunakan GSAP kecuali ada kebutuhan yang terdokumentasi.

Validation:
- lint
- typecheck
- build
```

---

## Phase 13 — SEO dan Structured Data

```text
Kerjakan Phase 13 saja.

Baca:
- 13-SEO-AND-PERFORMANCE.md

Tugas:
1. metadata global;
2. metadata review;
3. metadata category dan brand;
4. Open Graph;
5. sitemap.ts;
6. robots.ts;
7. canonical URL;
8. Product/Review/Breadcrumb/Video structured data;
9. audit heading;
10. audit alt text.

Pastikan structured data sesuai dengan informasi yang terlihat.
Validation:
- lint
- typecheck
- build
```

---

## Phase 14 — Performance Optimization

```text
Kerjakan Phase 14 saja.

Tugas:
1. audit Server dan Client Components;
2. kurangi penggunaan use client;
3. optimasi next/image;
4. atur sizes dan priority;
5. pastikan YouTube iframe lazy;
6. audit bundle dependency;
7. hapus dependency tidak terpakai;
8. audit font;
9. audit layout shift;
10. jangan mengorbankan accessibility.

Validation:
- lint
- typecheck
- build
```

---

## Phase 15 — QA dan Final Documentation

```text
Kerjakan Phase 15 saja.

Baca:
- 14-TESTING-AND-QA.md
- 15-DEPLOYMENT-AND-HANDOVER.md

Tugas:
1. audit functional flow;
2. audit responsive;
3. audit accessibility;
4. audit edge cases;
5. audit broken link;
6. audit console;
7. perbarui README;
8. buat docs/architecture.md;
9. buat docs/content-workflow.md;
10. buat docs/design-system.md;
11. buat docs/decisions.md;
12. jangan deploy otomatis;
13. jangan menjalankan dev server.

Validation:
- lint
- typecheck
- build

Berikan final report lengkap dan daftar hal yang masih membutuhkan input client.
```
