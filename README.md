# meimories.cam — Website Booking

Website booking untuk meimories.cam, siap dipasang ke domain sendiri:
**booking.meimories.cam**

Dibangun pakai React + Vite + Tailwind, data booking disimpan di **Supabase**
(database gratis) supaya bisa diakses dari mana saja — bukan cuma di 1 HP/browser.

---

## Bagian 1 — Setup Supabase (database & penyimpanan bukti bayar)

1. Buka **[supabase.com](https://supabase.com)** → daftar/login (gratis).
2. Klik **New Project**. Isi nama project (mis. `meimories-cam`), buat password
   database (simpan baik-baik), pilih region terdekat (Singapore), klik **Create**.
   Tunggu ± 1-2 menit sampai project siap.
3. Di sidebar kiri, klik **SQL Editor** → **New query**.
4. Buka file `supabase/schema.sql` di project ini, copy semua isinya, paste ke
   SQL Editor, lalu klik **Run**. Ini akan membuat tabel `bookings`.
5. Di sidebar kiri, klik **Storage** → **New bucket**.
   - Nama bucket: `payment-proofs`
   - Toggle **Public bucket** → **ON**
   - Klik **Create bucket**
6. Di sidebar kiri, klik **Project Settings** (ikon gear) → **API**.
   - Salin **Project URL** dan **anon public key** — ini dipakai di langkah berikutnya.

---

## Bagian 2 — Jalankan di komputer (opsional, untuk coba dulu)

```bash
npm install
cp .env.example .env
# buka file .env, isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY
npm run dev
```

Buka `http://localhost:5173` di browser untuk mencoba.

---

## Bagian 3 — Deploy ke Vercel (gratis)

1. Upload folder project ini ke **GitHub** (buat repo baru, push semua file
   *kecuali* `node_modules`, `dist`, dan `.env` — sudah diatur di `.gitignore`).
2. Buka **[vercel.com](https://vercel.com)** → daftar/login pakai akun GitHub.
3. Klik **Add New → Project**, pilih repo GitHub yang tadi dibuat.
4. Di bagian **Environment Variables**, tambahkan:
   - `VITE_SUPABASE_URL` = Project URL dari Supabase
   - `VITE_SUPABASE_ANON_KEY` = anon public key dari Supabase
5. Klik **Deploy**. Tunggu ± 1 menit, nanti dapat link sementara seperti
   `meimories-booking.vercel.app` — coba buka & pastikan booking berhasil masuk
   ke Supabase (cek tabel `bookings` di Supabase → Table Editor).

---

## Bagian 4 — Pasang custom domain booking.meimories.cam

1. Di dashboard Vercel, buka project ini → tab **Settings → Domains**.
2. Ketik `booking.meimories.cam` → klik **Add**.
3. Vercel akan menampilkan instruksi DNS, biasanya:
   - Tipe: **CNAME**
   - Name/Host: `booking`
   - Value/Target: `cname.vercel-dns.com`
4. Buka pengaturan DNS domain `meimories.cam` kamu (di tempat kamu beli domain,
   misal Niagahoster, Domainesia, Cloudflare, dsb).
5. Tambahkan record **CNAME** baru sesuai instruksi Vercel di atas.
6. Tunggu 5–60 menit untuk propagasi DNS. Setelah itu `booking.meimories.cam`
   akan otomatis aktif dengan HTTPS (SSL gratis dari Vercel).

---

## Bagian 5 — Buat akun login admin (Supabase Auth)

Website ini sekarang pakai **login sungguhan** (email + password), bukan cuma
kode rahasia di kode program. Cara buat akun admin:

1. Di dashboard Supabase, klik **Authentication** di sidebar kiri → tab **Users**.
2. Klik **Add user** → **Create new user**.
3. Isi email dan password admin (misal `admin@meimories.cam`), lalu centang
   **Auto Confirm User** supaya tidak perlu verifikasi email, klik **Create user**.
4. Selesai — sekarang kamu bisa login di website lewat menu **Jadwal & Pengingat**
   pakai email & password itu.

Kamu bisa membuat lebih dari satu akun admin (misal untuk tim), dan bisa
reset password kapan saja lewat menu **Authentication → Users** di Supabase.

Data booking lengkap (nama, WA, bukti transfer) sekarang **hanya bisa dibaca
setelah login** — ini diatur langsung di level database lewat Row Level
Security (RLS) di `supabase/schema.sql`, bukan cuma disembunyikan di tampilan.
Kalender publik tetap bisa dilihat semua orang, tapi hanya lewat view
`public_slots` yang cuma berisi tanggal/jam/nama paket, tanpa data pribadi.

---

## Cara lihat data booking

Buka website → menu **Jadwal & Pengingat** → login pakai email & password admin
(lihat Bagian 5). Semua booking (nama, WA, tanggal/jam, paket, status DP/lunas,
bukti transfer) akan tampil di situ, diambil langsung dari tabel `bookings` di
Supabase.

Kalau mau lihat datanya dalam bentuk tabel/spreadsheet, buka Supabase →
**Table Editor** → pilih tabel `bookings`.

---

## ⚠️ Catatan keamanan

Setelah update ini, tabel `bookings` **hanya bisa dibaca lengkap oleh admin
yang sudah login** (diatur lewat Row Level Security di database, bukan cuma
kunci tampilan di frontend). Kalender publik tetap tampil normal karena
memakai view terbatas `public_slots` yang cuma berisi tanggal/jam/nama paket.

Simpan email & password admin baik-baik, dan jangan bagikan ke orang lain.
Kalau lupa password, reset lewat **Authentication → Users** di dashboard
Supabase.

---

## Struktur folder

```
├── src/
│   ├── App.jsx           ← semua halaman & logic website
│   ├── main.jsx          ← entry point React
│   ├── index.css         ← Tailwind
│   └── lib/supabase.js   ← koneksi ke Supabase
├── supabase/schema.sql   ← jalankan sekali di SQL Editor Supabase
├── .env.example          ← contoh isi .env
├── vercel.json           ← config routing untuk Vercel
└── package.json
```
