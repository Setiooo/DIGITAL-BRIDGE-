# Menjalankan di GitHub (GitHub Pages)

Aplikasi ini **statis murni** (HTML/CSS/JS, tanpa build, tanpa server), jadi bisa langsung di-host di GitHub Pages.

## Cara 1 — Lewat web GitHub (paling mudah)
1. Buat repository baru di GitHub, mis. `umkm-jatim-superapp` (set **Public**).
2. Klik **Add file → Upload files**, lalu seret **semua isi folder `umkm-app/`** (file `index.html` harus berada di root repo, bukan di dalam subfolder).
3. **Commit** perubahan.
4. Buka **Settings → Pages**.
5. Bagian *Build and deployment* → Source: **Deploy from a branch**.
6. Branch: **main** , folder: **/ (root)** → **Save**.
7. Tunggu ~1 menit. URL situs muncul di halaman itu, mis.
   `https://<username>.github.io/umkm-jatim-superapp/`

## Cara 2 — Lewat Git (terminal)
```bash
cd umkm-app
git init
git add .
git commit -m "UMKM Jatim Super App"
git branch -M main
git remote add origin https://github.com/<username>/umkm-jatim-superapp.git
git push -u origin main
```
Lalu aktifkan **Settings → Pages** seperti langkah 4–7 di atas.

## Cara 3 — GitHub Actions (otomatis)
File workflow sudah disertakan di `.github/workflows/pages.yml`.
Di **Settings → Pages → Source**, pilih **GitHub Actions**. Setiap `push` ke `main` akan otomatis mem-publish situs.

## Catatan
- File `.nojekyll` sudah disertakan agar GitHub tidak memproses ulang file lewat Jekyll.
- Tidak ada dependensi yang perlu di-install. Hanya font Google (butuh internet saat dibuka); jika offline, font akan fallback otomatis.
- Tampilan paling optimal di layar mobile; di desktop muncul dalam bingkai ponsel.
