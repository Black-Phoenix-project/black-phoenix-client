# Black Phoenix Client — OLD DESIGN (arxiv)

> Bu fayl **redesign oldidan** saytning hozirgi dizaynini saqlash uchun yozilgan.
> Redesign'dan keyin eski ko'rinishga qaytish yoki solishtirish uchun ishlatiladi.
> Holat: 2026-08-20, branch `main`, commit oldidan (client hali commit qilinmagan edi).

---

## 1. Stack va build

| Tool | Versiya / maqsad |
|------|------------------|
| Next.js | App Router (package.json da 16.1.6) |
| React | 19 |
| TypeScript | type safety |
| Tailwind CSS | v3.4 |
| DaisyUI | v4 (`blackphoenixlight` tema) |
| Zustand | auth / cart / favorites store |
| Swiper | hero carousel |
| react-toastify | toast (keyin qo'shilgan) |
| lucide-react | ikonalar |
| axios | API client |

Qoida (README'dan): **raw CSS ishlatmaslik**, faqat Tailwind + DaisyUI; statik rang o'rniga Daisy tokenlari.

---

## 2. Design tokens

### DaisyUI tema: `blackphoenixlight`
`tailwind.config.ts` da:
- `primary` / `accent` / `warning` = `#FACC15` (sariq)
- `primary-content` / `accent-content` / `warning-content` = `#111111`
- `base-100` = `#FFFFFF`, `base-200` = `#F3F4F6`, `base-300` = `#E5E7EB`
- `base-content` = `#111111`
- `info` = `#2563EB`, `success` = `#16A34A`, `error` = `#DC2626`
- `darkTheme: "blackphoenixlight"` — ya'ni "dark" ham shu light tema (haqiqiy dark mode YO'Q)

### Fontlar
- **DM_Sans** → `--font-primary` → `font-sans` (body)
- **Playfair_Display** → `--font-display` → `font-display` (deyarli barcha sarlavhalar va logo)

### Rang ishlatilishi
- Asosiy accent: `#FACC15` (warning/primary)
- Fon: `#FAFAFA` (body) ustida `base-100` oq kartalar
- Ko'p joyda **statik** `gray-*` / `yellow-*` / `red-*` / `#hex` literal ishlatilgan (Daisy tokenlari emas)

---

## 3. Layout tuzilishi

```
<InfoBar>      sariq mini-bar (telefon/email/vaqt)
<Navbar>       sticky, blur, logo + search + iconlar + auth
<CategoryBar>  mega-menu (katalog tugmasi + kategoriyalar)
<main>
<Footer>       4-qator grid + account glass-card
```

---

## 4. Sahifalar (pages)

| Route | Rendering | Nima ko'rsatadi |
|-------|-----------|------------------|
| `/` | SSR + ISR | HeroSwiper → ProductGrid → AboutSection |
| `/products` | SSR + ISR | ProductsClient: kategoriya pill, qidiruv, sort, in-stock, grid |
| `/products/[id]` | SSR + ISR + JSON-LD | ProductDetailClient: 2-col image+info, zoom, qty, add-to-cart |
| `/basket` | Client | 3-col: items + sticky order summary + checkout form |
| `/favorites` | Client | liked mahsulotlar grid |
| `/auth/login` | Client | glass-card form, show/hide password |
| `/auth/register` | Client | glass-card form |
| `/privacy` | Static | `.prose` article |
| `/oferta` | Static | oddiy `space-y-4` article (prose YO'Q — nomuvofiq) |
| `/sitemap.xml` | Dynamic | SEO |
| `/robots.txt` | Static | SEO |
| `loading.tsx` | — | skeleton (skeleton-shimmer) |
| `not-found.tsx` | — | 404 sahifa |

---

## 5. Komponentlar (components)

### layout/
- **Header.tsx** — InfoBar + Navbar + CategoryBar wrapper (o'zi stilsiz)
- **InfoBar.tsx** — `bg-yellow-50 border-b border-yellow-100`; telefon/email/vaqt
- **Navbar.tsx** — sticky scroll-state `bg-white/95 backdrop-blur-xl`; logo Playfair; SearchBar; icon badge `btn-icon-sm` + `bg-warning`; auth `bg-warning text-black`
- **CategoryBar.tsx** — mega-menu `bg-white border-b`; katalog `bg-warning`; hover `bg-yellow-50`; "Sale" `bg-red-500`; mobile accordion

### sections/
- **HeroSwiper.tsx** — 3 yo'l: HeroStatic (SSR), HeroSwiperClient (lazy Swiper), HeroFallback. Asosiy rasm + gradient overlay + `HeroSidebar` (2 ta glass-card: "20%" promo + custom-order Telegram/Phone card)
- **ProductGrid.tsx** — header (eyebrow + `font-display` h2 + sariq divider) + grid `grid-cols-2 sm:3 lg:4` + ProductCard
- **AboutSection.tsx** — `bg-brand-light`; 2 ta glass-card + 4 ta advantage glass-card + CTA glass-card; sariq nuqtali ro'yxatlar

### ui/
- **ProductCard.tsx** — `product-card` white card; like `btn-icon-sm` (top-right, `bg-base-2000` TYPO); image hover scale; title/category pill; `price-tag` price + "sum"; add-to-cart `btn-icon-sm` `bg-primary/10` → hoverda `bg-warning` (past emphasis)
- **SearchBar.tsx** — input `placeholder-muted` + `focus:border-yellow-400`; dropdown `animate-slide-up`; natija `hover:bg-yellow-50`

---

## 6. globals.css — raw CSS klasslari (185 qator)

> Qoidaga zid. Redesign'da Tailwind utility'lariga o'tadi.

| Klass | Nima qiladi | Ishlatilgan joyi |
|-------|-------------|------------------|
| `.product-card` | hover lift + sariq glow | ProductCard.tsx |
| `.glass-card` | white 0.92 + blur + border | Footer, HeroSwiper(x2), AboutSection(x4), ProductDetailClient, login, register |
| `.price-tag` | tabular-nums | ProductCard, ProductDetailClient, SearchBar |
| `.placeholder-muted` | placeholder rangi | SearchBar, ProductsClient, basket, login, register |
| `.btn-icon-sm` | 44px min target | ProductCard, ProductDetailClient, Navbar, LanguageSwitcher |
| `.hero-swiper-title` | white `!important` | HeroSwiper |
| `.hero-swiper-description` | white 0.82 | HeroSwiper |
| `.hero-overlay-chip` | `rgba(15,23,42,0.55)` bg | HeroSwiper |
| `.hero-overlay-text` | white | HeroSwiper |
| `.skeleton-shimmer` | shimmer animatsiya | loading.tsx |
| `.warning-glow` | sariq glow | **o'lik (ishlatilmagan)** |
| `.gradient-text` | gradient matn | **o'lik** |
| `.section-divider` | gradient chiziq | **o'lik** |
| `.nav-link` | underline hover | **o'lik** (faqat defined) |
| `*:focus-visible` | sariq outline | sayt bo'ylab |
| `::-webkit-scrollbar*` | sariq scrollbar | sayt bo'ylab |

---

## 7. Ma'lum bug'lar

1. **`bg-base-2000`** (ProductCard.tsx) — mavjud emas, like tugmasi foni yo'q
2. **`scrollbar-none`** (CategoryBar.tsx) — ta'riflanmagan, ishlamaydi
3. **`border-y`** (AboutSection.tsx) — noto'g'ri (border-y-2 kerak)
4. **`.hero-swiper-*` `!important`** — Override bilan hardcode

---

## 8. "AI-style" / nomuvofiqlik muammolari

- Glassmorphism haddan tashqari (8 ta yuzada oq-blur, oq fon ustida past kontrast)
- Hero "shunchaki swiper" — aniq value-prop va asosiy CTA yo'q
- Sarlavha ranglari aralash (`text-base-content` vs `text-gray-900`)
- Playfair har joyda → "bepul template" ko'rinishi
- Add-to-Cart hoverda chaqadi (dam olishda sariq emas) — past emphasis
- Narx mayda, "sum" kichik → scan qiyin
- Barcha kartalar bir xil oq rounded → ierarxiya yo'q
- Legal sahifalar nomuvofiq (privacy `.prose`, oferta yo'q)
- README eskirgan (theme nomi, accent `#F59E0B` vs haqiqiy `#FACC15`, "Next.js 15" vs 16)

---

## 9. SEO holati (yaxshi, saqlanishi kerak)

- Per-page `<title>` / `<meta description>`
- Open Graph + Twitter cards
- JSON-LD: Organization, WebSite, Product, ItemList
- Dynamic sitemap.xml + robots.txt
- Canonical URLlar
- `next/image` (sizes, priority LCP), semantic HTML, ARIA
- Maqsad Lighthouse: Performance 95+, A11y/SEO 100

---

## 10. Funksiyalar (redesign'da buzilmasligi kerak)

- Likes: `favoritesStore` + backend sync (logout'da `clearAll`)
- Cart: `cartStore`
- Auth: `authStore` (JWT, 401 handling)
- Search: `SearchBar` (real-time)
- Orders: `ordersApi`
- i18n: ru / uz / en (`ApplyLanguage`)
- Toastify: `src/lib/toast.tsx` (success/warning/error/info)
- Custom-workwear CTA (HeroSidebar): Telegram `t.me/SardorXojimurodov` + `tel:+998770902226`

---

*Arxiv tugallandi. Keyingi: globals.css → Tailwind utility (phase 1 + 4 birgalikda).*
