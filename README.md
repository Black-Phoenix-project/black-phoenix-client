# Black Phoenix — Client

Next.js 15 App Router client for the Black Phoenix e-commerce platform.  
Спецодежда / Maxsus kiyim va himoya vositalari — Toshkent, O'zbekiston.

---

## Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 App Router | Framework with SSR/ISR |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS + DaisyUI | Styling (warning accent theme) |
| Zustand | Auth, Cart, Favorites state |
| Axios | API client |
| Swiper | Hero carousel |
| react-hot-toast | Notifications |
| lucide-react | Icons |

---

## Setup

### 1. Clone / extract

```bash
cd black-phoenix-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Copy and edit:

```bash
cp .env.example .env.local
```

`.env.local` contents:

```env
NEXT_PUBLIC_API_URL=https://black-phoenixx-backend.onrender.com
NEXT_PUBLIC_SITE_URL=https://blackphoenix.uz
```

### 4. Run locally

```bash
npm run dev
# → http://localhost:3000
```

### 5. Production build

```bash
npm run build
npm start
```

---

## Architecture

```
src/
├── app/                     # Next.js App Router routes
│   ├── layout.tsx           # Root layout (Header, Footer, metadata)
│   ├── page.tsx             # Homepage (SSR: swiper + products)
│   ├── loading.tsx          # Skeleton loading UI
│   ├── not-found.tsx        # 404 page
│   ├── sitemap.ts           # Dynamic sitemap (SEO)
│   ├── robots.ts            # robots.txt (SEO)
│   ├── products/
│   │   ├── page.tsx         # Products listing (SSR)
│   │   ├── ProductsClient.tsx # Client-side filter/search
│   │   └── [id]/
│   │       ├── page.tsx     # Product detail (SSR + JSON-LD)
│   │       └── ProductDetailClient.tsx
│   ├── basket/page.tsx      # Cart + order form
│   ├── favorites/page.tsx   # Liked products
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── privacy/page.tsx
│   └── oferta/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # InfoBar + Navbar wrapper
│   │   ├── InfoBar.tsx      # Top mini bar
│   │   ├── Navbar.tsx       # Sticky nav with auth state
│   │   └── Footer.tsx       # Dynamic footer
│   ├── sections/
│   │   ├── HeroSwiper.tsx   # Swiper carousel
│   │   ├── ProductGrid.tsx  # Product list
│   │   └── AboutSection.tsx # About (Uzbek content)
│   └── ui/
│       ├── ProductCard.tsx  # Card with like/cart
│       └── SearchBar.tsx    # Real-time search dropdown
│
├── lib/api/
│   ├── client.ts            # Axios base + JWT interceptor
│   ├── auth.ts              # Auth API
│   ├── products.ts          # Products API (fetch + axios)
│   ├── swiper.ts            # Swiper API
│   ├── likes.ts             # Likes API
│   └── orders.ts            # Orders API
│
├── store/
│   ├── authStore.ts         # Zustand auth (persisted)
│   ├── cartStore.ts         # Zustand cart (persisted)
│   └── favoritesStore.ts    # Zustand favorites (server sync)
│
└── types/index.ts           # All TypeScript interfaces
```

---

## Routes

| Route | Description | Rendering |
|-------|-------------|-----------|
| `/` | Homepage | SSR + ISR (60s) |
| `/products` | All products | SSR + ISR |
| `/products/[id]` | Product detail | SSR + ISR + JSON-LD |
| `/basket` | Cart + checkout | Client |
| `/favorites` | Liked products | Client |
| `/auth/login` | Login | Client |
| `/auth/register` | Register | Client |
| `/privacy` | Privacy policy | Static |
| `/oferta` | Public offer | Static |
| `/sitemap.xml` | SEO sitemap | Dynamic |
| `/robots.txt` | Crawl rules | Static |

---

## SEO Target (Lighthouse)

| Metric | Target |
|--------|--------|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

**Implemented SEO features:**
- `<title>`, `<meta description>` per page
- Open Graph + Twitter cards
- JSON-LD: Organization, WebSite (SearchAction), Product, ItemList
- Dynamic sitemap.xml
- robots.txt with sitemap reference
- Canonical URLs
- `next/image` with correct `sizes`, `priority` for LCP only
- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<section>`, `<aside>`
- ARIA labels, roles, live regions
- `lang="uz"` on `<html>`

---

## API Endpoints Used

```
POST /api/auth/login
POST /api/auth/register
GET  /api/product
GET  /api/product/:id
GET  /api/swiper
POST /api/orders
GET  /api/likes?userId=...
GET  /api/likes/check?userId=...&productId=...
POST /api/likes/toggle
DELETE /api/likes
```

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import in Vercel
3. Add env vars:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy

### Self-hosted

```bash
npm run build
npm start
# or with PM2:
pm2 start npm --name "bp-client" -- start
```

---

## Notes

- All text content in Uzbek (with Russian SEO keywords for спецодежда)
- Warning (#F59E0B) is primary accent color — matches admin dashboard
- DaisyUI theme: `blackphoenix` (dark)
- Mobile-first design, no horizontal overflow
- Touch targets ≥ 44px throughout
- Cart and favorites persist via `localStorage` (Zustand persist)
- Favorites sync with backend when user is authenticated
