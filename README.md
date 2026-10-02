# Niskala — Sebuah Kisah Visual

Situs cerita fantasi dengan animasi frame-by-frame yang mengikuti guliran halaman. Dibangun menggunakan Vite dan TypeScript, lalu dipublikasikan sebagai Cloudflare Worker dengan static assets.

## Menjalankan secara lokal

```sh
npm install
npm run dev
```

## Build dan deploy

```sh
npm run build
npm run deploy
```

Deployment membutuhkan autentikasi Cloudflare Wrangler (`npx wrangler login`). Konfigurasi Worker tersedia di `wrangler.jsonc`.

## Gambar

Frame animasi berada di `public/frames/`. Arsip ZIP sumber tidak disertakan di repository; file gambar yang sudah diekstrak digunakan langsung oleh situs.

