# Proktor Ujian (PWA)

Aplikasi Progressive Web App sederhana untuk membuka URL CBT dari proktor. Siap di-deploy ke GitHub Pages.

## Struktur

proktor-pwa/
├─ index.html
├─ manifest.json
├─ service-worker.js
├─ icons/
│  ├─ icon-192.png
│  └─ icon-512.png
└─ README.md

> Catatan: ikon yang disertakan di folder `icons/` adalah placeholder. Ganti dengan ikon PNG nyata ukuran 192x192 dan 512x512 jika perlu.

## Menjalankan lokal

1) VS Code Live Server
- Buka folder proyek di VS Code
- Klik "Go Live"

2) Node.js + http-server
- Pasang http-server jika belum: `npm i -g http-server`
- Jalankan server: `http-server -c-1 . -p 8080`

Buka http://localhost:8080 atau alamat yang disediakan.

## Deploy ke GitHub Pages

1. Buat repository baru bernama `proktor-pwa` di GitHub (atau nama lain, sesuaikan URL).
2. Push folder proyek ke branch `main`.
3. Di Settings -> Pages, pilih branch `main` dan folder `/(root)`.
4. Tunggu sampai GitHub menyediakan URL: `https://USERNAME.github.io/proktor-pwa/` (ganti USERNAME).

Pastikan repo bersifat public atau aktifkan Pages untuk private repo jika berlangganan.

## Cara install PWA (Chrome / Edge)

- Buka website via HTTPS (GitHub Pages menyediakan HTTPS).
- Chrome/Edge akan menampilkan ikon install (atau gunakan tombol "Install PWA" jika tersedia di aplikasi).
- Ikuti prompt untuk menambahkan ke desktop.

Catatan: PWA hanya dapat diinstall pada origin yang disajikan lewat HTTPS (atau localhost untuk development).

## Fitur

- Input URL dapat diubah oleh proktor sesuai sesi
- Tombol untuk membuka di iframe atau di jendela baru
- Service worker dengan cache sederhana untuk file lokal
- Pesan fallback offline
- Tanggal/waktu build ditampilkan di footer

## Selanjutnya (opsional)
- Tambahkan ikon PNG yang lebih baik di `icons/`
- Tambahkan file `CNAME` jika ingin custom domain
- Tambahkan meta tags sosial (og:image) dan layar splash yang lebih lengkap
