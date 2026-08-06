# Decision Log

## ADR-001 — Frontend-only

**Status:** Accepted

Website tidak memiliki dashboard, auth, database, atau backend khusus.

**Alasan:**
- Kebutuhan client hanya portfolio publik
- Biaya dan kompleksitas lebih rendah
- Konten dapat dikelola melalui repository
- Performa static generation lebih baik

## ADR-002 — App Router

**Status:** Accepted

Menggunakan Next.js App Router untuk routing, metadata, layout, Server Components, sitemap, dan static generation.

## ADR-003 — TypeScript strict

**Status:** Accepted

Semua domain data memiliki type. `any` tidak diperbolehkan.

## ADR-004 — Local TypeScript data

**Status:** Accepted

Review data dikelola dalam file TypeScript. Tidak ada database atau CMS.

## ADR-005 — Motion sebagai animasi utama

**Status:** Accepted

Motion digunakan untuk interaction ringan. GSAP tidak digunakan karena tidak ada kebutuhan kompleks.

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

## ADR-010 — No src directory

**Status:** Accepted

Menggunakan root directory tanpa `src/` untuk konsistensi dengan Next.js terbaru.

## ADR-011 — Geist font

**Status:** Accepted

Menggunakan Geist Sans dan Geist Mono sebagai font utama via `next/font/google`.

## ADR-012 — Tailwind CSS v4

**Status:** Accepted

Menggunakan Tailwind CSS v4 dengan `@tailwindcss/postcss` plugin.

## ADR-013 — Server Components by default

**Status:** Accepted

Semua komponen adalah Server Components kecuali yang memerlukan interaktivitas (useState, useEffect, event handlers, browser APIs).
