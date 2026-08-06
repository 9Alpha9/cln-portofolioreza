# Gaming Gear Review Portfolio — Complete Documentation
> Dokumen gabungan. Untuk penggunaan Open Code yang lebih terstruktur, gunakan file terpisah dan jalankan satu fase setiap kali.

---

# 00 — Start Here

## Tujuan dokumen

Dokumen ini menjelaskan alur penggunaan seluruh paket dokumentasi ketika mengerjakan proyek melalui Open Code AI.

## Nama kerja proyek

**Gaming Gear Review Portfolio**

Nama ini hanya nama kerja. Ganti dengan nama brand content creator saat identitas final sudah tersedia.

## Prinsip pengerjaan

Proyek dikerjakan secara berurutan:

```text
Discovery
→ Scope
→ Information Architecture
→ Content Model
→ Wireframe Mobile
→ Design System
→ High-Fidelity Direction
→ Technical Setup
→ Component Development
→ Page Development
→ Content Integration
→ SEO & Performance
→ Testing
→ Deployment
```

Tidak boleh langsung melompat ke pembuatan halaman sebelum scope, struktur konten, dan design system dikunci.

## Workflow Open Code

Untuk setiap fase:

1. Kirim aturan permanen dari `17-OPENCODE-RULES.md`.
2. Kirim hanya satu prompt fase dari `18-PHASE-BY-PHASE-PROMPTS.md`.
3. Biarkan Open Code membaca file dan implementasi yang sudah ada.
4. Minta Open Code tetap berada di scope fase aktif.
5. Periksa file yang dibuat atau diubah.
6. Jalankan:
   - lint;
   - type-check;
   - build hanya jika dibutuhkan untuk verifikasi.
7. Jangan menjalankan development server otomatis.
8. Periksa acceptance criteria.
9. Lanjutkan ke fase berikutnya setelah fase aktif benar-benar selesai.

## Aturan penting

- Open Code tidak boleh menjalankan `npm run dev`, `npm start`, `pnpm dev`, `yarn dev`, atau `bun dev`.
- Development server dijalankan manual oleh pemilik proyek.
- Jangan mengerjakan seluruh fase dalam satu prompt.
- Jangan mengubah keputusan arsitektur tanpa mencatat alasannya.
- Jangan menggunakan `any`.
- Jangan mengabaikan error TypeScript, lint, accessibility, atau hydration.
- Jangan membuat backend, dashboard admin, login, atau database.
- Jangan melakukan scraping harga marketplace.
- Jangan membuat tampilan menyerupai marketplace.
- Fokus visual utama adalah review, video, produk, dan personal branding kreator.

## Definition of Done proyek

Proyek selesai jika:

- semua halaman publik tersedia;
- seluruh layout responsive dari mobile ke desktop;
- data review terstruktur dan mudah ditambah;
- galeri produk berjalan;
- YouTube lazy embed berjalan;
- harga dan link marketplace tampil dengan disclaimer;
- pencarian dan filter berjalan;
- metadata dinamis tersedia;
- sitemap dan robots tersedia;
- tidak ada TypeScript error;
- tidak ada lint error;
- tidak ada console error penting;
- keyboard navigation berfungsi;
- reduced motion dihormati;
- Core Web Vitals berada pada kondisi baik;
- README pemeliharaan konten tersedia.

---

# 01 — Project Brief

## Latar belakang

Client adalah content creator yang membuat video review peripheral dan gaming gear. Konten review saat ini berada di channel video dan platform sosial, sehingga pengguna harus menelusuri banyak unggahan untuk menemukan produk tertentu.

Website ini dibuat sebagai pusat informasi yang menggabungkan:

- katalog produk yang pernah direview;
- ringkasan hasil pengujian;
- video review;
- spesifikasi produk;
- kelebihan dan kekurangan;
- kisaran harga;
- tautan pembelian marketplace.

## Masalah pengguna

Pengunjung sering mengalami hal berikut:

- sulit menemukan review lama;
- tidak tahu kategori produk yang tersedia;
- membutuhkan kesimpulan cepat sebelum menonton video;
- ingin mengetahui apakah produk cocok untuk kebutuhan mereka;
- kesulitan menemukan link pembelian yang relevan;
- tidak mengetahui harga yang disebutkan masih aktual atau tidak.

## Tujuan produk

1. Mengarsipkan seluruh hasil review dalam struktur yang mudah dicari.
2. Menguatkan personal branding content creator.
3. Menyajikan keputusan review secara ringkas dan objektif.
4. Mengarahkan pengunjung menuju video utama.
5. Memberikan link pembelian tanpa mengubah website menjadi toko online.
6. Membuat konten mudah dibagikan dan ditemukan melalui mesin pencari.

## Target pengguna

### Pengguna utama

- gamer casual dan kompetitif;
- pengguna PC yang mencari peripheral;
- penonton channel content creator;
- pembeli yang sedang membandingkan produk;
- pengguna yang ingin mengetahui verdict tanpa menonton seluruh video.

### Kebutuhan pengguna

- menemukan produk dengan cepat;
- memfilter produk berdasarkan kategori atau brand;
- memahami verdict dalam waktu singkat;
- melihat kualitas dan detail fisik produk;
- menonton video review;
- memeriksa spesifikasi;
- membuka link marketplace.

## Nilai utama

> Temukan gear, pahami hasil review, tonton videonya, lalu pilih tempat membeli.

## Indikator keberhasilan

- pengunjung dapat menemukan sebuah review maksimal dalam beberapa interaksi;
- product detail menjawab “cocok untuk siapa?” tanpa harus menonton video;
- video review mudah diakses tetapi tidak memperlambat initial load;
- link marketplace jelas namun tidak mendominasi;
- penambahan konten baru tidak membutuhkan perubahan komponen;
- website tetap mudah digunakan pada layar mobile.

---

# 02 — Scope dan MVP

## Termasuk dalam MVP

### Halaman

- Landing page.
- All Reviews.
- Category detail.
- Brand detail.
- Review detail.
- Search.
- About creator.
- Custom 404.

### Fitur

- featured review;
- latest reviews;
- category navigation;
- review grid;
- search lokal;
- filter kategori;
- filter brand;
- filter rentang harga;
- sorting;
- galeri gambar dengan Swiper;
- lazy YouTube embed;
- quick verdict;
- pros and cons;
- spesifikasi;
- harga manual;
- Tokopedia link;
- Shopee link;
- TikTok Shop link;
- related reviews;
- responsive layout;
- reduced motion;
- metadata dinamis;
- Open Graph;
- sitemap;
- robots;
- structured data;
- loading, empty, dan error state.

## Tidak termasuk

- dashboard admin;
- login atau registrasi;
- database;
- Supabase atau Firebase;
- user profile;
- wishlist;
- komentar;
- rating dari pengunjung;
- transaksi;
- checkout;
- cart;
- sistem pembayaran;
- scraping marketplace;
- price tracking otomatis;
- notifikasi;
- newsletter;
- multi-language pada MVP;
- perbandingan produk pada MVP.

## Aturan harga

Harga:

- dimasukkan manual;
- menggunakan label “mulai dari” jika terdapat variasi;
- memiliki tanggal terakhir diperbarui;
- memiliki disclaimer bahwa harga dapat berubah;
- tidak boleh disebut real-time;
- tidak boleh diambil menggunakan scraping.

## Aturan link marketplace

- link berasal dari content creator atau client;
- affiliate link boleh digunakan;
- selalu dibuka pada tab baru;
- menggunakan `rel="noopener noreferrer sponsored"` untuk link affiliate;
- tombol marketplace tidak boleh menyerupai checkout internal.

## Prioritas

### Must Have

- halaman review;
- video;
- spesifikasi;
- verdict;
- harga;
- link marketplace;
- responsive;
- SEO.

### Should Have

- search dan filter;
- featured review;
- related reviews;
- brand page;
- lazy video embed.

### Could Have setelah MVP

- buying guide;
- compare;
- score breakdown;
- price history manual;
- daftar setup kreator;
- rekomendasi berdasarkan jenis game.

## Batas kualitas

- tidak boleh ada horizontal overflow;
- tidak boleh ada teks terpotong;
- tidak boleh ada layout shift besar;
- tidak boleh menggunakan placeholder lorem ipsum pada hasil final;
- tidak boleh menggunakan asset yang tidak memiliki izin;
- tidak boleh menampilkan harga tanpa tanggal pembaruan.

---

# 03 — Information Architecture

## Sitemap

```text
/
├── /reviews
│   └── /reviews/[slug]
├── /category/[slug]
├── /brand/[slug]
├── /search
├── /about
└── /404
```

## Navigasi utama

- Home
- Reviews
- Categories
- Brands
- About
- Search

Pada mobile, navigasi utama ditampilkan melalui drawer atau sheet.

## User flow utama

```text
Home
→ Featured Review
→ Review Detail
→ Quick Verdict
→ Video Review
→ Specifications
→ Marketplace Link
```

## User flow pencarian

```text
Header Search
→ Search Page
→ Masukkan kata kunci
→ Filter hasil
→ Buka Review Detail
```

## User flow kategori

```text
Home
→ Category Card
→ Category Page
→ Featured Item
→ Review Detail
```

## Hirarki informasi review detail

1. Nama dan identitas produk.
2. Verdict singkat.
3. Harga.
4. Gambar.
5. CTA video dan marketplace.
6. Kecocokan pengguna.
7. Video review.
8. Isi review.
9. Pros and cons.
10. Spesifikasi.
11. Link pembelian.
12. Related reviews.

## URL convention

Gunakan URL pendek dan konsisten:

```text
/reviews/keychron-k2-he
/category/keyboard
/brand/keychron
/search?q=wireless
```

Slug:

- lowercase;
- dipisahkan tanda hubung;
- tidak menggunakan kode acak;
- tidak memasukkan tahun kecuali bagian resmi nama produk.

## Breadcrumb

Review detail:

```text
Home / Reviews / Keyboard / Keychron K2 HE
```

Category:

```text
Home / Categories / Keyboard
```

Brand:

```text
Home / Brands / Keychron
```

## Empty states

Harus tersedia untuk:

- pencarian tanpa hasil;
- kategori tanpa review;
- brand tanpa review;
- filter yang menghasilkan nol item;
- produk tanpa related review.

---

# 04 — Content Model

## Strategi konten

Gunakan kombinasi:

- **TypeScript** untuk metadata terstruktur;
- **MDX** untuk isi artikel review panjang;
- file lokal pada repository;
- asset gambar di `public/images/products`.

Tidak ada database.

## Type utama

```ts
export type MarketplacePlatform = "tokopedia" | "shopee" | "tiktok";

export type ReviewCategory =
  | "keyboard"
  | "mouse"
  | "headset"
  | "microphone"
  | "monitor"
  | "controller"
  | "mousepad"
  | "accessories";

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface MarketplaceOffer {
  platform: MarketplacePlatform;
  label: string;
  url: string;
  price?: number;
  originalPrice?: number;
  storeName?: string;
  affiliate?: boolean;
}

export interface SpecificationItem {
  label: string;
  value: string;
}

export interface SpecificationGroup {
  title: string;
  items: SpecificationItem[];
}

export interface ReviewVideo {
  platform: "youtube" | "tiktok";
  url: string;
  videoId?: string;
  thumbnail?: string;
}

export interface ReviewMetadata {
  slug: string;
  name: string;
  brand: string;
  category: ReviewCategory;
  shortDescription: string;
  verdict: string;
  score?: number;
  priceFrom?: number;
  currency: "IDR";
  thumbnail: ProductImage;
  gallery: ProductImage[];
  video: ReviewVideo;
  pros: string[];
  cons: string[];
  specifications: SpecificationGroup[];
  marketplaces: MarketplaceOffer[];
  featured: boolean;
  publishedAt: string;
  updatedAt?: string;
  priceUpdatedAt?: string;
  tags: string[];
}
```

## Aturan validasi

Setiap review wajib memiliki:

- slug unik;
- nama produk;
- brand;
- kategori valid;
- deskripsi singkat;
- verdict;
- thumbnail;
- minimal satu gallery image;
- video;
- minimal dua pros;
- minimal satu con;
- spesifikasi;
- minimal satu marketplace link;
- tanggal publikasi;
- tanggal pembaruan harga jika harga ditampilkan.

Gunakan Zod jika validasi runtime diperlukan.

## Struktur konten

```text
content/
└── reviews/
    ├── keychron-k2-he.mdx
    ├── razer-viper-v3-pro.mdx
    └── logitech-g-pro-x-2.mdx

src/data/
├── categories.ts
├── brands.ts
└── reviews.ts
```

## Frontmatter MDX

```yaml
---
slug: keychron-k2-he
title: Keychron K2 HE Review
productName: Keychron K2 HE
brand: Keychron
category: keyboard
publishedAt: 2026-08-07
updatedAt: 2026-08-07
featured: true
---
```

## Isi artikel review

Susunan standar:

1. Ringkasan.
2. Desain dan build quality.
3. Fitur utama.
4. Pengalaman penggunaan.
5. Performa.
6. Software.
7. Kekurangan.
8. Value for money.
9. Kesimpulan.

## Format harga

Gunakan formatter:

```ts
new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
}).format(value);
```

## Konten terkait

Related reviews dipilih berdasarkan:

1. kategori yang sama;
2. brand yang sama;
3. tag yang sama;
4. rentang harga yang mendekati;
5. selain produk aktif.

---

# 05 — UI/UX Direction

## Positioning visual

Website harus terasa seperti:

- editorial technology publication;
- portfolio reviewer;
- curated gear library;
- modern, minimal, dan terpercaya.

Website tidak boleh terasa seperti:

- marketplace;
- dashboard SaaS;
- landing page template generik;
- halaman promo penuh CTA;
- desain gaming berlebihan dengan neon di seluruh bagian.

## Prinsip visual

- satu warna aksen utama;
- ruang kosong yang cukup;
- tipografi kuat;
- foto produk sebagai fokus;
- card tidak terlalu banyak border;
- hierarchy jelas;
- dekorasi tidak mengalahkan konten;
- animasi membantu orientasi, bukan sekadar hiasan.

## Tone

- objektif;
- lugas;
- modern;
- tidak berlebihan;
- ramah untuk pembaca nonteknis;
- tetap dapat dipercaya oleh pengguna berpengalaman.

## Mobile-first

Pada mobile:

- satu kolom;
- quick verdict tampil cepat;
- harga mudah ditemukan;
- tombol video jelas;
- marketplace memakai sticky action bar bila diperlukan;
- filter dibuka melalui sheet;
- galeri dapat digeser;
- spesifikasi menggunakan accordion atau grouped list.

Pada desktop:

- hero dua kolom;
- konten artikel dan sticky summary dapat berdampingan;
- review grid tiga sampai empat kolom;
- bento grid hanya untuk section pilihan;
- hover state digunakan sebagai enhancement.

## Accessibility

- rasio kontras mengikuti WCAG AA;
- focus state terlihat;
- semua tombol dapat diakses keyboard;
- gambar memiliki alt text;
- carousel memiliki label;
- tidak mengandalkan warna untuk status;
- animasi menghormati `prefers-reduced-motion`;
- teks minimum nyaman dibaca;
- area klik mobile minimal sekitar 44×44 px.

## Motion direction

Gunakan Motion untuk:

- fade dan translate ringan;
- stagger card;
- drawer;
- accordion;
- hover transform kecil;
- reveal section.

Hindari:

- animasi terus-menerus;
- parallax agresif;
- scale berlebihan;
- page transition yang menghambat navigasi;
- animasi yang menyebabkan layout shift.

## Design review checklist

- Apakah visual tetap editorial?
- Apakah CTA marketplace terlalu dominan?
- Apakah verdict dapat ditemukan dalam beberapa detik?
- Apakah tampilan mobile tetap nyaman?
- Apakah card memiliki variasi yang terkontrol?
- Apakah desain masih konsisten tanpa animasi?
- Apakah setiap elemen memiliki fungsi?

---

# 06 — Mobile Wireframe Specification

## Breakpoint awal

Desain awal harus valid pada lebar:

- 320 px;
- 360 px;
- 375 px;
- 390 px;
- 430 px.

Desktop baru diadaptasi setelah struktur mobile disetujui.

## Landing page mobile

```text
[Header]
[Featured Review Hero]
[Category Chips / Horizontal Scroll]
[Latest Reviews]
[Highlighted Bento]
[Recommended Gear]
[Creator Profile]
[Social Links]
[Footer]
```

### Header

- logo;
- search button;
- menu button;
- tinggi ringkas;
- sticky hanya jika tidak mengganggu.

### Featured hero

- badge kategori;
- judul produk;
- verdict maksimal tiga baris;
- harga mulai;
- CTA “Baca Review”;
- CTA sekunder “Tonton Video”;
- product image.

### Category chips

- horizontal scroll;
- tidak memotong label;
- selected state jelas;
- gesture natural.

### Review card

- thumbnail 4:3 atau 1:1 secara konsisten;
- brand;
- nama;
- verdict singkat;
- harga;
- category badge;
- seluruh card dapat dibuka.

## Reviews page mobile

```text
[Header]
[Title]
[Search Input]
[Filter + Sort Buttons]
[Active Filter Chips]
[Result Count]
[Review List/Grid]
[Load More or Pagination]
```

Filter dibuka melalui bottom sheet.

## Category page mobile

```text
[Breadcrumb]
[Category Name]
[Description]
[Featured Review]
[Brand Filter]
[Review Grid]
[Related Categories]
```

## Review detail mobile

```text
[Breadcrumb]
[Brand + Category]
[Product Name]
[Verdict]
[Price]
[Gallery]
[Primary CTA]
[Quick Verdict]
[Video]
[Review Article]
[Pros and Cons]
[Specifications]
[Marketplace Offers]
[Related Reviews]
[Sticky Purchase Bar]
```

### Sticky purchase bar

Berisi:

- harga mulai;
- tombol “Lihat Harga”;
- tidak menutup konten;
- tidak tampil jika marketplace section sedang terlihat, bila implementasi memungkinkan.

## About mobile

- profile image;
- creator name;
- short bio;
- review principles;
- channel links;
- collaboration contact;
- affiliate disclosure.

## Desktop adaptation

Saat layar membesar:

- jangan mengubah urutan semantik utama;
- hero menjadi dua kolom;
- detail review dapat memakai sticky sidebar;
- grid bertambah secara progresif;
- container dibatasi;
- whitespace bertambah;
- mobile interactions tidak boleh hilang tanpa pengganti.

---

# 07 — Design System

## Tujuan

Membuat bahasa visual yang konsisten dan mudah dikembangkan tanpa mengulang styling.

## Token utama

Gunakan CSS custom properties pada `globals.css`.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 24% 10%;
  --surface: 220 20% 97%;
  --surface-strong: 220 14% 93%;
  --muted: 220 9% 46%;
  --border: 220 14% 88%;
  --accent: 258 85% 58%;
  --accent-foreground: 0 0% 100%;
  --success: 146 60% 36%;
  --warning: 36 90% 48%;
  --danger: 0 72% 52%;
  --radius-sm: 0.5rem;
  --radius-md: 0.875rem;
  --radius-lg: 1.25rem;
}
```

Nilai warna final harus disesuaikan dengan brand client.

## Typography

Gunakan maksimal dua font family:

- display/heading;
- body/interface.

Skala minimal:

```text
Display
H1
H2
H3
Body Large
Body
Body Small
Caption
Label
```

Aturan:

- body mobile minimal sekitar 16 px;
- line-height artikel 1.6–1.8;
- heading tidak terlalu rapat;
- judul card maksimal tiga baris;
- gunakan `next/font`.

## Spacing

Gunakan skala konsisten:

```text
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
```

Jangan membuat nilai acak tanpa alasan.

## Container

- mobile: padding 16–20 px;
- tablet: padding 24–32 px;
- desktop: max-width 1280–1440 px;
- artikel: lebar baca sekitar 680–760 px.

## Component states

Setiap komponen interaktif wajib memiliki:

- default;
- hover;
- focus-visible;
- active;
- disabled;
- loading jika relevan.

## Komponen inti

- Button.
- IconButton.
- Badge.
- CategoryChip.
- Input.
- SearchInput.
- Select.
- Sheet.
- Accordion.
- ProductCard.
- FeaturedReviewCard.
- MarketplaceButton.
- PriceDisplay.
- Rating/Score.
- EmptyState.
- Skeleton.
- Breadcrumb.
- VideoPlaceholder.

## Card system

Gunakan maksimal tiga varian:

1. standard review card;
2. featured card;
3. compact related card.

Jangan membuat varian baru hanya karena perbedaan kecil.

## Iconography

- gunakan satu library ikon;
- stroke konsisten;
- ikon dekoratif diberi `aria-hidden`;
- tombol ikon memiliki accessible label.

## Animation tokens

```text
Fast: 120–180 ms
Normal: 200–300 ms
Slow: 400–600 ms
```

Gunakan easing yang konsisten dan jangan membuat semua elemen bergerak.

---

# 08 — Technical Architecture

## Stack

- Next.js stable terbaru.
- App Router.
- TypeScript strict.
- React Server Components sebagai default.
- Tailwind CSS.
- Motion.
- Swiper.
- MDX untuk artikel.
- Local TypeScript data untuk metadata.
- Vercel untuk deployment.

## Tidak digunakan

- database;
- ORM;
- Supabase;
- Firebase;
- auth;
- admin dashboard;
- API marketplace;
- scraping;
- backend khusus.

## Folder structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── reviews/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── not-found.tsx
│   ├── category/[slug]/page.tsx
│   ├── brand/[slug]/page.tsx
│   ├── search/page.tsx
│   ├── about/page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   ├── review/
│   ├── product/
│   ├── marketplace/
│   ├── media/
│   ├── filters/
│   └── animation/
├── content/reviews/
├── data/
├── lib/
│   ├── reviews/
│   ├── formatters/
│   ├── metadata/
│   └── utils.ts
├── types/
├── hooks/
├── constants/
└── config/
```

## Server dan Client Components

Server Components digunakan untuk:

- page shell;
- mengambil data lokal;
- membuat metadata;
- menampilkan artikel;
- membuat list statis;
- generate static params.

Client Components digunakan untuk:

- Swiper;
- search interaktif;
- filter;
- drawer;
- accordion interaktif;
- lazy video player;
- Motion animations.

Jangan memberi `"use client"` pada seluruh halaman tanpa alasan.

## Rendering

- review detail: static generation;
- category: static generation;
- brand: static generation;
- reviews listing: server-rendered initial list, client enhancement untuk filter;
- search: client-side atas indeks data lokal;
- metadata: generated per review.

## Data flow

```text
Local review data / MDX
→ review loader
→ typed domain model
→ Server Component page
→ Client Components only where needed
```

## Image strategy

- gunakan `next/image`;
- simpan dimensi asli;
- gunakan WebP atau AVIF bila sesuai;
- hindari gambar terlalu besar;
- gunakan `sizes`;
- priority hanya untuk visual above-the-fold;
- alt text harus deskriptif.

## Video strategy

- render thumbnail terlebih dahulu;
- load iframe setelah klik;
- sediakan fallback link;
- jaga aspect ratio 16:9;
- jangan autoplay dengan suara.

## Error handling

- invalid slug → `notFound()`;
- video gagal → fallback link;
- image gagal → fallback visual;
- data tidak lengkap → fail saat build melalui validator;
- filter kosong → empty state.

---

# 09 — Project Setup

## Prasyarat

- Node.js versi yang didukung Next.js stable terbaru.
- npm, pnpm, yarn, atau bun. Pilih satu package manager dan konsisten.
- Git.
- Open Code AI.
- Taste Skill.

## Membuat proyek

Contoh dengan npm:

```bash
npx create-next-app@latest gaming-gear-review   --typescript   --tailwind   --eslint   --app   --src-dir   --import-alias "@/*"
```

Gunakan pilihan recommended defaults saat CLI memintanya.

## Dependency

```bash
npm install motion swiper clsx tailwind-merge
```

Tambahkan MDX sesuai pendekatan yang dipilih dan dokumentasi Next.js stable.

GSAP hanya dipasang jika scope animasi kompleks sudah disetujui:

```bash
npm install gsap @gsap/react
```

Jangan memasang GSAP sebagai dependency default jika tidak digunakan.

## Taste Skill

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

Baca `16-TASTE-SKILL-SETUP.md`.

## Script yang wajib tersedia

Pastikan `package.json` memiliki:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

Sesuaikan script lint dengan konfigurasi versi Next.js yang terpasang.

## Larangan Open Code

Open Code tidak boleh menjalankan:

```bash
npm run dev
npm start
pnpm dev
yarn dev
bun dev
```

Open Code boleh menjalankan:

```bash
npm run lint
npm run typecheck
npm run build
```

Build dijalankan hanya saat diperlukan untuk verifikasi.

## Konfigurasi TypeScript

- aktifkan strict mode;
- tidak menggunakan `any`;
- gunakan discriminated union untuk platform;
- gunakan `satisfies` untuk data statis bila membantu;
- pastikan path alias `@/*` berjalan.

## Git baseline

Commit awal yang disarankan:

```text
chore: initialize Next.js project
```

Gunakan branch per fitur:

```text
feature/design-system
feature/home-page
feature/review-detail
feature/search-filter
fix/mobile-overflow
```

---

# 10 — Component Plan

## Prinsip

- komponen kecil dan reusable;
- pemisahan komponen UI generik dan domain;
- props typed;
- tidak ada `any`;
- tidak membuat abstraksi terlalu dini;
- file komponen idealnya tetap mudah dibaca;
- pecah komponen besar jika memiliki lebih dari satu tanggung jawab.

## UI primitives

```text
Button
IconButton
Badge
Input
SearchInput
Select
Sheet
Accordion
Separator
Skeleton
Container
SectionHeading
```

## Layout components

```text
SiteHeader
DesktopNavigation
MobileNavigation
SiteFooter
PageContainer
ContentContainer
Breadcrumbs
```

## Review components

```text
ReviewCard
FeaturedReviewCard
ReviewGrid
ReviewList
QuickVerdict
ProsCons
ReviewArticle
RelatedReviews
ScoreBadge
```

## Product components

```text
ProductHero
ProductGallery
ProductIdentity
ProductPrice
SpecificationList
SpecificationGroup
ProductTags
```

## Marketplace components

```text
MarketplaceOfferCard
MarketplaceOfferList
MarketplaceLogo
MarketplaceDisclaimer
MobilePurchaseBar
```

## Media components

```text
LazyYouTubeEmbed
TikTokEmbed
VideoPoster
ResponsiveMedia
```

## Filter components

```text
ReviewSearch
CategoryFilter
BrandFilter
PriceFilter
SortControl
ActiveFilters
FilterSheet
NoResults
```

## Contract ReviewCard

Props minimal:

```ts
interface ReviewCardProps {
  review: ReviewSummary;
  variant?: "standard" | "featured" | "compact";
  priorityImage?: boolean;
}
```

Card harus:

- mempunyai semantic link;
- menampilkan alt text;
- membatasi panjang teks secara visual tanpa kehilangan title attribute bila perlu;
- memiliki focus state;
- tidak menyimpan business logic berat.

## Contract MarketplaceOfferCard

Harus:

- menampilkan platform;
- menampilkan harga jika tersedia;
- membuka tab baru;
- menyertakan rel yang aman;
- tidak menggunakan kata “checkout”;
- tidak menjanjikan harga real-time.

## Contract LazyYouTubeEmbed

Harus:

- menampilkan poster lebih dahulu;
- memiliki tombol play berlabel;
- menjaga aspect ratio;
- baru membuat iframe setelah interaksi;
- memiliki fallback link menuju YouTube;
- tidak autoplay dengan suara.

## Story/state yang harus diuji

- data lengkap;
- nama sangat panjang;
- tanpa harga;
- original price tidak tersedia;
- satu marketplace;
- tiga marketplace;
- tanpa related reviews;
- video invalid;
- reduced motion.

---

# 11 — Page Implementation

## Urutan pengerjaan

1. global layout;
2. header dan footer;
3. home mobile;
4. reviews mobile;
5. category mobile;
6. review detail mobile;
7. search dan filter;
8. brand page;
9. about;
10. tablet;
11. desktop;
12. motion refinement.

## Home

Section:

1. Header.
2. Featured Review Hero.
3. Category Navigation.
4. Latest Reviews.
5. Highlighted Bento.
6. Recommended Gear.
7. Creator Profile.
8. Social Channels.
9. Footer.

Acceptance:

- visual utama tidak menyerupai toko;
- featured item jelas;
- kategori mudah dijangkau;
- initial content tidak bergantung client JavaScript;
- mobile tidak overflow.

## Reviews

Fitur:

- judul dan penjelasan;
- search;
- filter;
- sorting;
- result count;
- grid;
- no results;
- reset filter.

Search dan filter dapat berjalan pada client dengan dataset lokal.

## Category

Fitur:

- breadcrumb;
- title;
- description;
- featured review;
- review grid;
- brand filter;
- related categories.

Gunakan `generateStaticParams()` untuk slug kategori.

## Brand

Fitur:

- brand identity;
- deskripsi;
- review count;
- list produk;
- kategori yang tersedia.

## Review detail

Section:

1. Breadcrumb.
2. Product Hero.
3. Gallery.
4. Quick Verdict.
5. Video.
6. Article.
7. Pros and Cons.
8. Specifications.
9. Marketplace Offers.
10. Related Reviews.

Gunakan metadata dinamis dan structured data.

## Search

- query dari URL `?q=`;
- input tersinkronisasi;
- pencarian nama, brand, kategori, tags;
- no-result suggestions;
- clear query;
- keyboard accessible.

## About

- profile;
- creator story;
- metode review;
- disclosure;
- social media;
- contact/collaboration.

## Not Found

- pesan yang jelas;
- kembali ke Reviews;
- kategori populer;
- tidak menampilkan stack trace.

## Responsive

Setelah mobile selesai:

- adaptasi tablet;
- desktop;
- large desktop;
- cek pointer/hover;
- cek keyboard;
- cek long content.

---

# 12 — Content Integration

## Workflow menambah review

```text
Siapkan konten
→ Optimasi gambar
→ Buat metadata
→ Buat file MDX
→ Tambahkan marketplace link
→ Validasi
→ Preview manual
→ Commit
→ Deploy
```

## Asset per produk

```text
public/images/products/[slug]/
├── cover.webp
├── angle-01.webp
├── angle-02.webp
├── detail-01.webp
└── usage-01.webp
```

## Naming

- lowercase;
- kebab-case;
- tanpa spasi;
- nama file deskriptif;
- jangan menggunakan `IMG_001.jpg`.

## Video YouTube

Simpan:

- URL asli;
- video ID;
- thumbnail lokal atau thumbnail resmi;
- title yang sesuai.

Jangan memerlukan API untuk MVP.

## TikTok

Gunakan embed hanya jika benar-benar diperlukan. Pastikan halaman tetap berguna jika embed pihak ketiga tidak termuat.

## Harga

Setiap harga harus memiliki:

- nominal;
- platform;
- store name bila tersedia;
- original price bila valid;
- tanggal terakhir dicek;
- disclaimer.

Contoh copy:

> Harga mulai dari Rp1.499.000. Terakhir diperbarui 7 Agustus 2026. Harga dan ketersediaan dapat berubah di marketplace.

## Affiliate disclosure

Letakkan pada About dan marketplace section:

> Beberapa tautan pembelian dapat berupa tautan afiliasi. Kreator dapat menerima komisi tanpa biaya tambahan bagi pembeli. Hal ini tidak memengaruhi hasil review.

## Checklist konten

- [ ] Nama produk benar.
- [ ] Brand benar.
- [ ] Slug unik.
- [ ] Kategori valid.
- [ ] Thumbnail optimal.
- [ ] Gallery memiliki alt text.
- [ ] Verdict singkat.
- [ ] Pros dan cons spesifik.
- [ ] Spesifikasi tidak kosong.
- [ ] Video valid.
- [ ] Harga memiliki tanggal.
- [ ] Link marketplace valid.
- [ ] Isi artikel sudah proofreading.
- [ ] Metadata SEO tersedia.
- [ ] Related reviews relevan.

---

# 13 — SEO dan Performance

## Metadata

Setiap halaman review wajib memiliki:

- title unik;
- description;
- canonical;
- Open Graph title;
- Open Graph description;
- Open Graph image;
- Twitter card;
- robots policy.

Contoh title:

```text
Keychron K2 HE Review: Performa, Fitur, dan Harga | Nama Creator
```

## Structured data

Pertimbangkan:

- `Review`;
- `Product`;
- `BreadcrumbList`;
- `Person` atau `Organization`;
- `VideoObject`.

Data structured harus sesuai konten yang benar-benar terlihat.

## Sitemap

Gunakan `src/app/sitemap.ts` untuk memasukkan:

- home;
- reviews;
- categories;
- brands;
- review detail;
- about.

## Robots

Gunakan `src/app/robots.ts`.

## Image performance

- Next Image;
- width dan height;
- `sizes`;
- format modern;
- compression;
- priority hanya pada hero;
- lazy loading untuk gambar lain;
- tidak mengirim gambar 8K untuk card kecil.

## Video performance

- poster first;
- no iframe saat initial render;
- iframe setelah klik;
- lazy loading;
- fallback link.

## JavaScript budget

- Server Components sebagai default;
- jangan membuat seluruh tree client-side;
- import Swiper hanya pada gallery;
- animasi ringan;
- GSAP tidak dipasang jika tidak dipakai;
- hindari library utility berlebihan.

## Font

- gunakan `next/font`;
- subset seperlunya;
- maksimal dua family;
- hindari terlalu banyak weight.

## Performance acceptance

- tidak ada layout shift besar;
- hero image memiliki dimensi;
- halaman dapat digunakan sebelum semua third-party embed selesai;
- tidak ada request API marketplace;
- filter tetap responsif;
- Lighthouse digunakan sebagai indikator, bukan satu-satunya ukuran.

## SEO content rules

- heading hanya satu H1 per halaman;
- heading tidak dilewati sembarangan;
- anchor text deskriptif;
- verdict bukan duplikasi meta description mentah;
- kategori memiliki deskripsi unik;
- alt text tidak keyword stuffing.

---

# 14 — Testing dan QA

## Static checks

Jalankan:

```bash
npm run lint
npm run typecheck
npm run build
```

Open Code tidak menjalankan dev server.

## Responsive matrix

Uji minimal:

- 320×568;
- 360×800;
- 375×812;
- 390×844;
- 430×932;
- 768×1024;
- 1024×768;
- 1366×768;
- 1440×900;
- 1920×1080.

## Browser

- Chrome;
- Firefox;
- Edge;
- Safari jika tersedia;
- mobile Safari/Chrome melalui device nyata bila memungkinkan.

## Functional QA

- semua navigation link;
- search;
- category filter;
- brand filter;
- sort;
- reset filter;
- gallery swipe;
- thumbnail selection;
- lazy video load;
- marketplace link;
- related review;
- breadcrumbs;
- 404.

## Content edge cases

- nama produk panjang;
- brand panjang;
- harga tidak tersedia;
- hanya satu marketplace;
- gambar portrait;
- gambar landscape;
- video gagal;
- spesifikasi panjang;
- pros/cons tidak seimbang;
- review tanpa score;
- zero search result.

## Accessibility QA

- tab order;
- focus state;
- skip link;
- accessible names;
- heading structure;
- alt text;
- reduced motion;
- color contrast;
- sheet focus trap;
- escape untuk menutup modal/sheet.

## Visual QA

- tidak ada horizontal overflow;
- spacing konsisten;
- border radius konsisten;
- card alignment;
- sticky bar tidak menutup konten;
- image crop tidak merusak produk;
- text wrapping rapi;
- bento grid tidak kacau pada breakpoint.

## Regression checklist

Setiap perubahan harus memastikan:

- halaman lama tidak rusak;
- data lama tetap terbaca;
- mobile tetap prioritas;
- lint dan typecheck tetap bersih;
- tidak ada dependency tak terpakai;
- tidak ada debug log;
- tidak ada secret di repository.

---

# 15 — Deployment dan Handover

## Platform

Rekomendasi:

- source: GitHub;
- deployment: Vercel;
- domain: custom domain;
- analytics: Vercel Web Analytics atau solusi yang disetujui;
- image: asset lokal atau CDN resmi bila diperlukan.

## Deployment flow

```text
Feature branch
→ Review
→ Merge ke main
→ Vercel Preview/Production
→ Smoke test
```

Jangan melakukan deployment otomatis dari Open Code tanpa instruksi eksplisit.

## Pre-deployment checklist

- [ ] lint bersih;
- [ ] typecheck bersih;
- [ ] build berhasil;
- [ ] metadata benar;
- [ ] sitemap benar;
- [ ] robots benar;
- [ ] link marketplace valid;
- [ ] disclosure tersedia;
- [ ] semua gambar memiliki alt;
- [ ] mobile sudah diuji;
- [ ] no secret;
- [ ] tidak ada placeholder;
- [ ] tidak ada console error penting.

## Handover content workflow

Pemilik website menambah review dengan:

1. menyalin template `19-REVIEW-CONTENT-TEMPLATE.md`;
2. menambahkan asset;
3. mengisi metadata;
4. mengisi MDX;
5. memperbarui index data bila diperlukan;
6. menjalankan lint, typecheck, dan build;
7. commit dan push.

## Maintenance

Bulanan:

- cek link marketplace;
- cek video yang dihapus;
- cek harga;
- perbarui dependency secara terkontrol;
- audit broken links;
- audit performance;
- backup repository.

## Dokumentasi wajib pada repository final

```text
README.md
docs/architecture.md
docs/content-workflow.md
docs/design-system.md
docs/decisions.md
```

## Final deliverables

- repository;
- source code;
- production URL;
- design tokens;
- component inventory;
- content template;
- deployment notes;
- maintenance guide.

---

# 16 — Taste Skill Setup

## Instalasi

Jalankan dari environment tempat Open Code atau coding agent membaca skill:

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

## Tujuan penggunaan

Taste Skill digunakan untuk membantu:

- menghindari UI generik;
- meningkatkan hierarchy;
- memperbaiki typography;
- memperbaiki spacing;
- menjaga kualitas responsive;
- mengevaluasi komposisi;
- membuat hasil frontend lebih terasa dirancang.

## Batas penggunaan

Taste Skill tidak boleh mengubah scope proyek.

Skill harus tetap mengikuti keputusan berikut:

- website adalah portfolio review, bukan marketplace;
- tidak ada dashboard;
- tidak ada auth;
- tidak ada database;
- mobile-first;
- minimalis dan editorial;
- warna aksen terbatas;
- accessibility wajib;
- performa tetap dijaga;
- tidak menggunakan animasi berlebihan.

## Instruksi untuk Open Code setelah skill terpasang

Gunakan prompt berikut pada awal sesi:

```text
Aktifkan dan gunakan skill design-taste-frontend untuk mengevaluasi keputusan UI.
Tetap patuhi seluruh dokumen proyek.
Jangan mengubah scope, arsitektur data, atau fitur.
Gunakan skill untuk memperbaiki hierarchy, typography, layout, spacing,
responsive behavior, visual balance, dan interaction quality.
Hindari UI generik, neon gaming berlebihan, glassmorphism tanpa fungsi,
gradient berlebihan, card yang terlalu banyak, serta animasi dekoratif.
```

## Audit visual yang diharapkan

Sebelum menyatakan fase UI selesai, evaluasi:

- apakah hierarchy jelas;
- apakah whitespace cukup;
- apakah layout terasa editorial;
- apakah gambar produk menjadi fokus;
- apakah card terlalu seragam atau terlalu ramai;
- apakah CTA marketplace terlalu dominan;
- apakah mobile lebih dari sekadar desktop yang dikecilkan;
- apakah visual konsisten tanpa efek berlebihan.

## Catatan

Perintah instalasi berasal dari repository Taste Skill. Apabila CLI berubah, cek README repository sebelum menjalankannya.

---

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

---

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

---

# 19 — Review Content Template

Salin template ini setiap kali menambah produk baru.

## Metadata

```ts
export const review = {
  slug: "product-slug",
  name: "Product Name",
  brand: "Brand",
  category: "keyboard",
  shortDescription: "Deskripsi singkat maksimal dua kalimat.",
  verdict: "Kesimpulan utama review dalam satu atau dua kalimat.",
  score: 8.5,
  priceFrom: 1499000,
  currency: "IDR",
  featured: false,
  publishedAt: "2026-08-07",
  updatedAt: "2026-08-07",
  priceUpdatedAt: "2026-08-07",
  tags: ["wireless", "gaming", "budget"],
  thumbnail: {
    src: "/images/products/product-slug/cover.webp",
    alt: "Deskripsi produk pada gambar",
    width: 1600,
    height: 1200
  },
  gallery: [],
  video: {
    platform: "youtube",
    url: "https://www.youtube.com/watch?v=VIDEO_ID",
    videoId: "VIDEO_ID",
    thumbnail: "/images/products/product-slug/video-cover.webp"
  },
  pros: [],
  cons: [],
  specifications: [],
  marketplaces: []
} satisfies ReviewMetadata;
```

## Marketplace

```ts
{
  platform: "tokopedia",
  label: "Lihat di Tokopedia",
  url: "https://...",
  price: 1499000,
  originalPrice: 1699000,
  storeName: "Nama Toko",
  affiliate: true
}
```

## MDX article

```mdx
# Product Name Review

Intro singkat mengenai posisi produk dan alasan produk ini menarik untuk direview.

## Ringkasan

Jelaskan pengalaman umum dan temuan utama.

## Desain dan Build Quality

Bahas material, finishing, dimensi, berat, dan kualitas konstruksi.

## Fitur

Bahas fitur yang benar-benar berpengaruh pada penggunaan.

## Pengalaman Penggunaan

Jelaskan kenyamanan, workflow, dan konteks pemakaian.

## Performa

Jelaskan pengujian, respons, stabilitas, latency, sensor, switch, audio,
atau aspek teknis yang relevan.

## Software

Jelaskan kemudahan penggunaan software dan keterbatasannya.

## Value for Money

Bandingkan harga dengan hasil yang diperoleh tanpa membuat klaim berlebihan.

## Kesimpulan

Jawab:
- cocok untuk siapa;
- tidak cocok untuk siapa;
- alasan utama membeli;
- kekurangan utama yang harus dipertimbangkan.
```

## Checklist sebelum publish

- [ ] Semua data faktual diverifikasi.
- [ ] Harga memiliki tanggal.
- [ ] Link marketplace bekerja.
- [ ] Video bekerja.
- [ ] Gambar optimal.
- [ ] Alt text tersedia.
- [ ] Verdict spesifik.
- [ ] Pros/cons tidak generik.
- [ ] Spesifikasi konsisten.
- [ ] Artikel proofreading.
- [ ] Metadata SEO tersedia.

---

# 20 — Decision Log

## ADR-001 — Frontend-only

**Status:** Accepted

Website tidak memiliki dashboard, auth, database, atau backend khusus.

**Alasan:**

- kebutuhan client hanya portfolio publik;
- biaya dan kompleksitas lebih rendah;
- konten dapat dikelola melalui repository;
- performa static generation lebih baik.

## ADR-002 — App Router

**Status:** Accepted

Menggunakan Next.js App Router untuk routing, metadata, layout, Server Components, sitemap, dan static generation.

## ADR-003 — TypeScript strict

**Status:** Accepted

Semua domain data memiliki type. `any` tidak diperbolehkan.

## ADR-004 — MDX + local TypeScript data

**Status:** Accepted

MDX digunakan untuk artikel panjang. TypeScript digunakan untuk metadata terstruktur.

## ADR-005 — Motion sebagai animasi utama

**Status:** Accepted

Motion digunakan untuk interaction ringan. GSAP hanya jika kebutuhan kompleks terdokumentasi.

## ADR-006 — Swiper untuk gallery

**Status:** Accepted

Swiper digunakan hanya pada product gallery, bukan untuk seluruh layout.

## ADR-007 — Harga manual

**Status:** Accepted

Harga dan link marketplace dikelola manual. Tidak ada scraping dan tidak ada klaim real-time.

## ADR-008 — Lazy YouTube embed

**Status:** Accepted

Thumbnail dimuat lebih dahulu. Iframe dibuat setelah interaksi untuk menjaga performa.

## ADR-009 — Mobile-first

**Status:** Accepted

Seluruh halaman dirancang dan diimplementasikan mulai dari mobile. Desktop adalah adaptasi, bukan sumber layout utama.

## ADR-010 — Taste Skill

**Status:** Accepted

`design-taste-frontend` digunakan sebagai alat evaluasi kualitas UI, bukan sebagai pengubah scope atau arsitektur.

---

# 21 — Official References

Gunakan dokumentasi resmi sebagai sumber utama saat implementasi.

## Next.js

- App Router:
  https://nextjs.org/docs/app
- Installation:
  https://nextjs.org/docs/app/getting-started/installation
- TypeScript:
  https://nextjs.org/docs/app/api-reference/config/typescript

## Tailwind CSS

- Next.js guide:
  https://tailwindcss.com/docs/installation/framework-guides/nextjs

## Motion

- Motion for React:
  https://motion.dev/docs/react

## Swiper

- React integration:
  https://swiperjs.com/react

## Taste Skill

- Repository:
  https://github.com/Leonxlnx/taste-skill
- Documentation:
  https://www.tasteskill.dev/docs

## Rule

Jika dokumentasi paket berubah, gunakan dokumentasi resmi versi yang terpasang pada proyek dan catat perubahan keputusan pada `20-DECISION-LOG.md`.
