# Scale Xpert — website source

Kode website versi terbaru, 5 Oktober 2026.

## Upload ke GitHub

1. Ekstrak ZIP ini.
2. Upload isi folder `scale-xpert-website` ke root repository Anda: `index.html`, halaman lain, `site.css`, `site.js`, dan folder `assets` harus berada bersama.
3. File HTML sudah siap untuk static hosting. Tidak perlu npm atau proses build untuk menayangkan website.

## Isi paket

- Tujuh halaman HTML: homepage, Services, About, Pricing, Community, Contact, Privacy.
- `site.css` dan `site.js`: styling dan interaksi.
- `assets/`: logo, ilustrasi WebP, dashboard demo SVG dan grafik historis.
- `build_pages.py`: sumber konten/generator HTML dengan Python standard library.
- `wordpress-snippets/`: modul HTML untuk WordPress. Untuk WordPress, ganti URL aset relatif sesuai lokasi upload media Anda.
- `docs/`: snapshot konten homepage lama sebagai referensi.
- `.nojekyll`: dukungan penayangan file statis.

## Edit dan regenerasi

Edit `build_pages.py` untuk konten halaman. Edit `site.css` untuk desain dan `site.js` untuk perilaku. Jalankan dari direktori proyek:

```sh
python3 build_pages.py
```

Generator memperbarui HTML dan snippet WordPress. Header aktif; footer disembunyikan melalui `SHOW_HEADER` dan `SHOW_FOOTER`.

Untuk preview lokal:

```sh
python3 -m http.server 8000
```

Buka http://localhost:8000 di browser.

## Keadaan versi ini

- Scale Xpert diposisikan sebagai autopilot software untuk SEO dan Reddit visibility.
- Hero gradient dengan ilustrasi transparan violet/champagne.
- Carousel results memiliki autoplay satu detik, panah, swipe dan pause/play. Gambar dummy diberi label Demo.
- Services berisi ilustrasi SEO/Reddit dan dua alur kerja empat langkah.
- Community Preview hanya ada di Services; informasi community lainnya tetap pada homepage.
- Header dan shortcut Reddit/Discord tampil; footer disembunyikan.
- Form Contact membuka aplikasi email (`mailto:`); belum ada backend pengiriman formulir.
- Ikon platform dan beberapa tautan memakai sumber eksternal. Blog mengarah ke scale-xpert.com.
- Statistik komunitas dan review tetap menggunakan tanggal snapshot yang ditampilkan; bukan data live.

File konfigurasi hosting internal dan kredensial tidak disertakan.
