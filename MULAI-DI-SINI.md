# Scale Xpert — siap unggah ke GitHub

## Unggah sekali, seluruh website langsung terbaca

**Unggah isi folder ini ke akar (root) repository `sxnew`**, bukan folder ZIP atau folder `github-ready-scale-xpert` sebagai satu subfolder. File `index.html` harus terlihat langsung di halaman utama repository. Pilih semua file dan folder, termasuk `assets/`, lalu salin ke folder clone `sxnew` yang terbuka di VS Code. Jika diminta, pilih **Replace** untuk file lama.

Struktur website yang berjalan:

- `index.html` — homepage. Hanya satu tag H1 dan satu blok community; konten lama tetap disertakan.
- `services.html` — layanan SEO visibility, Reddit visibility, proses, dan Community Preview.
- `about.html`, `pricing.html`, `contact.html`, `community.html`, `privacy.html` — halaman lain.
- `site.css` — seluruh tampilan dan gradasi. Cari `.sxa-hero.sxa-hero-with-visual` untuk warna hero homepage.
- `site.js` — menu dan carousel hasil klien tiap 1 detik.
- `assets/` — semua gambar, ilustrasi, logo, dan SVG yang diperlukan.
- `section-by-section/` — **salinan referensi** HTML per section agar mudah dibaca. Folder ini boleh ikut diunggah, tetapi website menampilkan halaman HTML di akar. Untuk mengubah website, edit bagian yang sama di `index.html`, `services.html`, atau halaman lainnya. Lihat `section-by-section/DAFTAR-SECTION.md`.

## Perintah di terminal VS Code (PowerShell)

Pastikan terminal menunjuk ke folder clone `sxnew` dan semua file di atas sudah disalin ke sana:

```powershell
pwd
git status
git add -A
git commit -m "Update Scale Xpert website"
git push origin main
```

Jika `git status` menunjukkan *nothing to commit*, file belum disalin ke folder clone yang benar, atau isinya sama dengan commit terakhir. Jangan mengetik baris perintah dari folder induk `scale-xpert-website`.

## Aktifkan GitHub Pages

Di repository `sxarya123/sxnew`, buka **Settings → Pages → Build and deployment**. Pilih **Deploy from a branch**, branch **main**, folder **/(root)**, lalu **Save**. Setelah terbit, buka URL yang diberikan GitHub Pages. Tautan internal memakai nama file HTML biasa, sehingga seluruh halaman dapat dibuka tanpa proses build.

## Cek di komputer sebelum push

Dari terminal di folder `sxnew`:

```powershell
py -m http.server 8787
```

Lalu buka `http://localhost:8787/` di browser. Tekan `Ctrl+C` untuk menghentikan server. Alternatifnya buka `index.html` langsung. CSS, JS, dan gambar memakai jalur lokal.

## Catatan konten

Angka, ulasan, gambar contoh hasil klien, dan harga masih perlu diperiksa terhadap materi yang disetujui sebelum dipakai untuk klaim publik. Homepage menampilkan layanan SEO dan Reddit; Community Preview lengkap berada di halaman Services.
