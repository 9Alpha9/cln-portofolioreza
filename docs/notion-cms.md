# Notion CMS Integration

## Architecture

```
┌───────────────────────────────────┐
│            NOTION CMS             │
│                                   │
│ Gears Database                    │
│ ├ Kategori (Select)               │
│ ├ Nama Barang (Title)             │
│ ├ Thumbnail Konten (Files)        │
│ ├ Foto Produk (Files)             │
│ ├ Tier (Select)                   │
│ ├ Deskripsi (Rich Text)           │
│ ├ Kelebihan (Rich Text)           │
│ ├ Kekurangan (Rich Text)          │
│ ├ Kesimpulan (Rich Text)          │
│ ├ Link Produk (URL)               │
│ ├ Slug (Rich Text)                │
│ ├ Published (Rich Text)           │
│ ├ Featured (Checkbox)             │
│ ├ Order (Rich Text)               │
│ ├ Review Date (Date)              │
│ └ Brand (Rich Text)               │
└─────────────────┬─────────────────┘
                  │
                  │ Notion API (search)
                  ▼
┌───────────────────────────────────┐
│        NEXT.JS ON VERCEL          │
│                                   │
│ server-only Notion client         │
│ search → filter → map             │
│ caching (5 min)                   │
│ validation                        │
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│           TAHUTECH UI             │
│                                   │
│ Reviewed Gears                    │
│ Featured                          │
│ Category                          │
│ Tier List                         │
│ Review Detail                     │
└─────────────────┬─────────────────┘
                  │
                  ▼
       www.tahutechsetup.my.id
```

## Notion Properties

### Required Properties (Existing)

| Property | Type | Description |
|----------|------|-------------|
| Nama Barang | Title | Product name |
| Kategori | Select | Product category (Gamepad, Mouse, Keyboard, Audio, Webcam, Microphone) |
| Tier | Select | Tier rating (S Tier, A Tier, B Tier, D Tier) |
| Deskripsi | Rich Text | Product description |
| Kelebihan | Rich Text | Pros (one per line) |
| Kekurangan | Rich Text | Cons (one per line) |
| Kesimpulan | Rich Text | Conclusion/verdict |
| Link Produk | URL | Product purchase link |
| Thumbnail Konten | Files | Thumbnail image |
| Foto Produk | Files | Product photo |
| Brand | Rich Text | Product brand |

### Additional Properties (To Add)

| Property | Type | Description |
|----------|------|-------------|
| Slug | Rich Text | URL-friendly identifier (e.g., `flydigi-vader-5-pro`) |
| Published | Rich Text | Set to `true` to publish (or any truthy value) |
| Featured | Checkbox | Check to feature on homepage |
| Order | Rich Text | Numeric order (smaller = higher priority) |
| Review Date | Date | Review publication date |

## Field Mapping

```
NOTION                   APPLICATION

Nama Barang      →       name
Slug             →       slug (fallback: generated from name)

Kategori         →       category
Brand            →       brand

Thumbnail Konten →       thumbnail
Foto Produk      →       productImage

Tier             →       tier

Deskripsi        →       description
Kelebihan        →       pros (newline-separated)
Kekurangan       →       cons (newline-separated)
Kesimpulan       →       conclusion

Link Produk      →       productUrl

Published        →       published (truthy text = true)
Featured         →       featured
Order            →       order (parsed as integer)
Review Date      →       reviewDate
```

## Environment Variables

```env
NOTION_API_KEY=your_notion_token
NOTION_GEARS_DATABASE_ID=your_database_id
```

**IMPORTANT:** Never use `NEXT_PUBLIC_NOTION_API_KEY`. The API key must remain server-side only.

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local`:
   ```env
   NOTION_API_KEY=ntn_your_token_here
   NOTION_GEARS_DATABASE_ID=your_database_id_here
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Notion Integration Setup

1. Go to https://www.notion.so/my-integrations
2. Create a new integration named "TahuTech Website"
3. Copy the API key (starts with `ntn_`)
4. Open your Notion database
5. Click `...` menu → Connections → Add connections
6. Search for "TahuTech Website" and approve

## How to Publish Gear

1. Open Notion
2. Add new gear page in the Gears database
3. Fill in all required properties
4. Set `Published` to `true`
5. Set `Slug` to a URL-friendly name
6. Wait for cache revalidation (max 5 minutes)
7. Content appears on website

## How Featured Works

1. Open a gear page in Notion
2. Check the `Featured` checkbox
3. The gear will appear in the Featured section on homepage
4. Featured gears are ordered by `Order` value

## How Order Works

1. Set `Order` field to a number (e.g., `1`, `2`, `3`)
2. Lower numbers appear first
3. If `Order` is empty, gear is sorted by Review Date (newest first)

## How Tier Works

1. Set `Tier` dropdown to one of:
   - S Tier (highest)
   - A Tier
   - B Tier
   - D Tier (lowest)
2. Tier is displayed on cards and tier list page

## How Categories Work

Categories are defined by the `Kategori` Select property:
- Gamepad
- Mouse
- Keyboard
- Audio
- Webcam
- Microphone

The category filter on the Reviews page uses these values.

## How Slug Works

1. Set `Slug` field to a URL-friendly name
2. Example: `flydigi-vader-5-pro`
3. If Slug is empty, it's auto-generated from the product name
4. URL format: `/reviews/{slug}`

## How Caching Works

- Data is cached for 5 minutes (300 seconds)
- Cache uses Next.js `unstable_cache` with tags
- To force refresh, wait for cache expiry
- No redeployment needed for content changes

## Vercel Setup

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `NOTION_API_KEY`
   - `NOTION_GEARS_DATABASE_ID`
3. Deploy to production

## Hostinger DNS Relationship

```
Hostinger (DNS only)
    ↓
Vercel (Application)
    ↓
Next.js
    ↓
Notion CMS
```

- Hostinger manages DNS records
- Vercel hosts the application
- Domain: `www.tahutechsetup.my.id`

## Troubleshooting

### No data showing
1. Check `Published` field is set to `true`
2. Check `Kategori` field is not empty
3. Check `Nama Barang` is not empty
4. Wait for cache revalidation (5 min)

### Images not loading
1. Check image files are uploaded in Notion
2. Verify `Thumbnail Konten` or `Foto Produk` has files

### Build fails
1. Check `.env.local` has valid API key
2. Check database ID is correct
3. Run `npm run build` to see errors

## Security Rules

- API key is server-side only (never exposed to browser)
- No `NEXT_PUBLIC_` prefix for Notion variables
- `.env.local` is gitignored
- Notion integration has read-only access

## Code Structure

```
lib/notion/
├── client.ts      # Server-only Notion client
├── types.ts       # Gear type definitions
├── mapper.ts      # Notion → Application mapping
└── gears.ts       # Query functions with caching

lib/reviews/
└── index.ts       # Wrapper functions for components
```

## Manual Steps Required

1. **Add Featured property** to Notion database (Checkbox type)
2. **Set Published** to `true` for each gear you want to display
3. **Set Slugs** for each gear (optional but recommended)
4. **Set Order** values for desired ordering (optional)
5. **Set Review Date** for each gear (optional)
6. **Add Vercel environment variables** in production
