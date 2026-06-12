# UMKM Jatim — Mobile Super App

Refactor dari `index (10).html` (monolitik, desktop) menjadi **mobile super app experience** (gaya Dana / Bibit / Tokopedia / MyTelkomsel / Gojek), terpecah ke dalam struktur folder.

## Cara menjalankan
Buka `index.html` langsung di browser (double-click). Tidak butuh build step / server.
Semua modul memakai *classic script* + namespace global `App` agar bisa dibuka via `file://`.
Untuk pengalaman terbaik aktifkan **device toolbar** (mode HP) di DevTools.

## Struktur folder
```
index.html              -> entry, memuat seluruh script berurutan
assets/
  css/                  -> design system (tokens, base, components, pages)
  data/                 -> data master (produk, investor, finance, training, readiness)
utils/                  -> format(), dom helper, router (hash-based, page transition)
services/               -> dataService, authService, aiService (engine simulasi)
components/             -> AppHeader, BottomNav, KpiScroller, ExpandableCard,
                           ProductCard, ChatBubble, BottomSheet, Skeleton, FAB,
                           PullToRefresh, Toast
layouts/                -> AppShell (header + view + bottom nav)
pages/                  -> home, marketplace, productDetail, dashboard,
                           govDashboard, investorDashboard, aiAdvisor,
                           komunikasi, training, trending, profile, login
```

## Ringkasan analisis file asli
- 10 halaman dalam 1 file via `.page`/`go()`; navbar atas + sidebar kiri (3 dashboard).
- 14 `<table>` desktop + 10 grafik Chart.js + grid besar.
- Warna lama forest/emerald/gold -> diganti Primary `#0B1F4D`, Secondary `#D4A017`, BG `#F8FAFC`.

## Perubahan UX utama
1. Sidebar dihapus -> **Bottom Navigation** (Home, Marketplace, Dashboard, AI Advisor, Profile).
2. Statistik grid -> **Horizontal-scroll KPI cards** (swipe + snap).
3. Tabel -> **Expandable cards**.
4. Marketplace e-commerce: sticky search, kategori horizontal, product card 2 kolom, infinite scroll.
5. Dashboard Investor: Portfolio / ROI / Growth / Risk card.
6. AI Advisor: tampilan chat ala ChatGPT mobile (bubble, quick prompt, riwayat).
7. Komunikasi strategis: gaya WhatsApp Business.
8. App Header universal (logo | judul | search/notif/profile).
9. Skeleton loading, pull-to-refresh, FAB, page transition, bottom sheet.

## Catatan AI Advisor
File asli memanggil `api.anthropic.com` langsung dari browser (gagal karena CORS/tanpa kunci).
Diganti `services/aiService.js` — engine analisis simulasi berbasis data UMKM (ROI, omzet, modal,
rating, kelengkapan) sehingga demo chat tetap berfungsi penuh secara offline.
