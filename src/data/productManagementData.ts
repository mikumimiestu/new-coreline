import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  {
    id: 'pm-01',
    user_type: 'student',
    language: 'product-management',
    title: 'Modul 1: Apa itu Product Management?',
    description: 'Mengenal irisan peran antara Bisnis, Teknologi, dan Pengalaman Pengguna (UX) dalam membangun StartUp.',
    content: `# 💼 Modul 1: Pengenalan Product Management

Seorang programmer bisa membangun aplikasi paling canggih di dunia. Namun, jika TIDAK ADA yang mau memakai aplikasi tersebut, bisnis itu gagal. Di sinilah **Product Manager (PM)** masuk.

## 1. Irisan Tiga Dunia
Product Management adalah disiplin ilmu yang berada tepat di tengah (irisan) dari 3 bidang:
1. **Technology (Tech):** Mengerti kelayakan teknis. (Apakah secara teknis ini bisa di-coding oleh tim engineer?)
2. **User Experience (UX):** Mengerti empati pengguna. (Apakah ini mudah digunakan dan memecahkan masalah user?)
3. **Business (Biz):** Mengerti kelangsungan hidup. (Apakah fitur ini bisa mendatangkan uang atau menghemat biaya operasional perusahaan?)

*Product Manager adalah "Mini-CEO" dari sebuah produk digital.*

## 2. Product Manager vs Project Manager
Jangan tertukar, singkatan keduanya sama-sama PM, tapi fokusnya berbeda:
- **Project Manager:** Fokus pada **Waktu & Eksekusi** (*Output*). *"Aplikasi ini harus rilis sebelum tanggal 30 dengan budget X."*
- **Product Manager:** Fokus pada **Nilai & Hasil** (*Outcome*). *"Apa fitur yang harus kita bangun agar pengguna kita tidak lari ke aplikasi kompetitor bulan ini?"*

## 3. Product Vision & Problem Space
Kesalahan terbesar Startup amatir adalah: "Jatuh cinta pada Solusi, bukan pada Masalah."
PM yang baik akan menggali *Problem Space* (Area Masalah) sedalam-dalamnya sebelum meminta programmer menulis 1 baris kode pun.
- *Problem:* Pengguna sering lupa jadwal minum obat.
- *Solution (Ide Awal):* Buat aplikasi pengingat minum obat.
- *Iterasi PM:* Apakah pengguna benar-benar butuh aplikasi yang memakan memori HP? Kenapa tidak membuat *Chatbot WhatsApp* pengingat minum obat saja yang lebih mudah digunakan?

---
## 📝 Quiz Singkat
1. Manakah yang menjadi fokus utama seorang Product Manager: memastikan kode selesai tepat waktu, atau memastikan fitur yang dibangun benar-benar menyelesaikan masalah bisnis?
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pm-02',
    user_type: 'student',
    language: 'product-management',
    title: 'Modul 2: MVP (Minimum Viable Product)',
    description: 'Rahasia perusahaan startup berhemat dengan tidak membangun fitur sempurna di awal menggunakan strategi MVP.',
    content: `# 🏗️ Modul 2: Minimum Viable Product (MVP)

Jika Anda ingin membuat kendaraan bagi orang yang capek berjalan kaki, apakah Anda akan langsung mendesain dan membuat Mobil Ferrari selama 3 tahun? **TIDAK.**
Anda akan membuang miliaran rupiah hanya untuk menyadari bahwa orang ternyata lebih suka naik sepeda.

## 1. Konsep MVP
MVP (Minimum Viable Product) adalah versi paling dasar dari sebuah produk yang:
1. Memiliki fungsionalitas utama yang **cukup** memecahkan masalah pengguna.
2. Memungkinkan kita untuk langsung merilisnya ke pasar dengan sangat cepat.
3. Mendapatkan *Feedback* (masukan/kritik) nyata dari pengguna nyata!

*Evolusi yang Benar:* Otoped -> Sepeda -> Motor -> Mobil. (Setiap tahap sudah bisa dijual dan dikendarai).
*Evolusi yang Salah:* Roda -> Kerangka -> Mesin -> Mobil. (Konsumen tidak bisa memakai "sebuah roda", mereka harus menunggu 3 tahun).

## 2. Studi Kasus MVP Terkenal (Dropbox)
Sebelum tim Dropbox membuang waktu dan dana untuk membangun teknologi *Cloud Sync* yang sangat-sangat rumit, *Founder*-nya hanya membuat sebuah **Video Animasi Bohongan** yang menjelaskan konsep "Simpan file di folder ini, dan otomatis muncul di komputermu yang lain". 
Dia menaruh tombol "Join Waiting List". Keesokan harinya, ada 75,000 orang mendaftar emailnya! Validasi sukses tanpa coding!

## 3. Cara Memangkas Fitur (Prioritization)
Gunakan metode **MoSCoW** saat merancang aplikasi versi 1.0 (MVP):
- **Must Have:** Fitur wajib. Tanpa ini, aplikasi mati. (Misal di Toko Online: Katalog Barang & Checkout).
- **Should Have:** Sangat penting tapi ada solusi alternatif. (Misal: Filter kategori produk).
- **Could Have:** Bagus kalau ada, tidak ada juga tidak apa-apa (Nice to have). (Misal: Dark Mode).
- **Won't Have:** Fitur gila yang tidak akan kita buat bulan ini. (Misal: Pembayaran pakai Crypto).

MVP Anda HANYA boleh berisi elemen **Must Have**!
`,
    level: 'intermediate',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pm-03',
    user_type: 'student',
    language: 'product-management',
    title: 'Modul 3: Product Requirements Document (PRD)',
    description: 'Cara Product Manager menulis dokumen spesifikasi yang menjadi kitab suci bagi para Programmer dan Designer.',
    content: `# 📜 Modul 3: Product Requirements Document (PRD)

Tim bisnis menginginkan fitur "Promo Diskon". Jika langsung menyuruh Programmer membuat "Diskon", Programmer akan bingung: *"Diskonnya flat atau persen? Maksimal potongannya berapa? Apakah ada batas waktu?"*

Untuk itulah Product Manager membuat spesifikasi tertulis bernama **PRD**.

## 1. Anatomi sebuah PRD Standar
PRD yang baik (biasanya ditulis di Confluence atau Notion) tidaklah sepanjang skripsi. Cukup 1-2 halaman yang jelas.
Strukturnya meliputi:

1. **Objective / Purpose (Tujuan):** Mengapa kita membangun ini? (Contoh: *Untuk meningkatkan transaksi akhir pekan sebesar 15%*).
2. **Success Metrics (Metrik Sukses):** Angka mutlak penentu kesuksesan. (Contoh: *Fitur ini sukses jika digunakan oleh 5.000 user dalam 1 minggu*).
3. **User Flow (Alur Pengguna):** Langkah demi langkah yang akan dilakukan User (Bisa berupa diagram).
4. **Functional Requirements (Kebutuhan Fitur Detail):** Daftar rincian teknis/logika bisnis.
5. **Out of Scope (Di Luar Cakupan):** Apa yang TIDAK KITA KERJAKAN di rilis kali ini. (Ini sangat penting untuk mencegah fitur melar / *Scope Creep*).

## 2. Contoh Penulisan Functional Requirement
- *Syarat 1:* Kode promo \`MERDEKA20\` hanya valid di hari Sabtu dan Minggu.
- *Syarat 2:* Diskon berupa potongan harga 20%, dibatasi maksimal pemotongan sebesar Rp 50.000.
- *Syarat 3:* Jika user menginput kode di luar ketentuan, tampilkan pesan error merah: *"Kode Promo sudah kadaluarsa atau tidak valid"*.

## 3. Komunikasi dengan Engineer
Setelah PRD selesai, PM mengadakan rapat "Grooming" atau "Handover" bersama Tim UI/UX Designer dan Tim Programmer (Tech Lead) untuk membahas dokumen ini. Di sinilah *Tech Lead* akan memberi masukan: *"Mas, syarat 2 itu susah logicnya di database lama kita, butuh 2 minggu. Boleh dibikin diskon flat 20rb aja nggak biar bisa besok rilis?"*
Di sinilah kompromi Agile terjadi!

---
## 📝 Latihan
Bayangkan Anda adalah PM Aplikasi Pesan Antar Makanan. Tuliskan 2 aturan/syarat bisnis (*Functional Requirements*) untuk fitur "Beri Rating ke Driver"!
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pm-04',
    user_type: 'student',
    language: 'product-management',
    title: 'Modul 4: Metrik Bisnis Utama (Metrics That Matter)',
    description: 'Mengukur kesuksesan aplikasi secara kuantitatif melalui sistem Funnel AARRR dan indikator MAU/DAU.',
    content: `# 📈 Modul 4: Metrics That Matter

"Anda tidak bisa memperbaiki apa yang tidak bisa Anda ukur." (Peter Drucker). 
Seorang PM tidak menggunakan "Insting" untuk menilai aplikasinya sukses atau gagal, melainkan **Data (Analytics)**.

## 1. DAU & MAU (Tingkat Keaktifan)
Berapa banyak orang yang mendownload aplikasi Anda tidak penting. Yang penting adalah berapa yang secara rutin menggunakannya!
- **DAU (Daily Active Users):** Jumlah orang yang membuka aplikasi hari ini. (Sangat krusial untuk Social Media / Game).
- **MAU (Monthly Active Users):** Jumlah orang unik yang membuka aplikasi setidaknya 1 kali dalam sebulan. (Krusial untuk e-commerce/Travel).

## 2. Konsep AARRR Funnel (Pirate Metrics)
Dalam Startup, perjalanan pelanggan (Customer Journey) dibagi menjadi corong 5 tahap:
1. **Acquisition (Mendapatkan):** Bagaimana orang menemukan aplikasi Anda? (Misal lewat iklan Instagram). Metrik: *Jumlah Install / Pengunjung Website.*
2. **Activation (Mengaktifkan):** Apakah pengalaman pertama mereka memuaskan? Metrik: *Persentase pengunjung yang berhasil Registrasi Akun / Menyelesaikan Tutorial.*
3. **Retention (Mempertahankan):** Apakah mereka kembali keesokan harinya? Metrik: *Churn Rate (Tingkat orang yang Uninstall).* Ini adalah METRIK PALING PENTING!
4. **Referral (Mereferensikan):** Apakah mereka merekomendasikannya ke teman? Metrik: *Kode referal yang dipakai.*
5. **Revenue (Pendapatan):** Apakah mereka menghasilkan uang untuk kita? Metrik: *Customer Lifetime Value (LTV).*

## 3. Menangani Churn Rate (Kebocoran Ember)
Mengakuisisi pengguna baru lewat Iklan itu sangat mahal. Jika *Churn Rate* Anda tinggi (banyak yang uninstall), itu ibarat Anda menuang air (Uang Iklan) ke dalam ember yang bocor.
Fokus PM: **Tambal dulu kebocorannya (Perbaiki Bug & UX di fase Retention), baru genjot budget iklannya (Acquisition).**

---
## 📝 Latihan Refleksi
Dalam aplikasi *Mobile Banking*, metrik manakah yang lebih penting menurut pandangan Bisnis:
A) Jumlah *Download* di Playstore.
B) Persentase orang yang berhasil melakukan "Transfer Berhasil" di bulan pertama (*Activation*).
`,
    level: 'advanced',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pm-05',
    user_type: 'student',
    language: 'product-management',
    title: 'Modul 5: Go-to-Market & Feedback Loops',
    description: 'Strategi peluncuran fitur ke publik, metode A/B Testing, dan memproses masukan pelanggan berkelanjutan.',
    content: `# 🚀 Modul 5: Go-to-Market & Feedback Loops

Fitur hebat sudah jadi. Sekarang, bagaimana kita memperkenalkannya ke dunia dan terus memperbaikinya?

## 1. Go-to-Market Strategy (GTM)
GTM adalah strategi peluncuran produk. PM bekerja sama erat dengan Tim *Product Marketing*.
- Kapan tanggal rilis yang tepat?
- Segmen mana yang disasar? (Misal: Kampus A dulu).
- Saluran komunikasi apa yang dipakai? (Push Notification, Email Newsletter, Banner di Halaman Utama).

## 2. A/B Testing (Eksperimen Data)
Ingat, PM bekerja berdasarkan data, bukan insting. Jika tim berdebat "Apakah tombol Beli harus Hijau atau Merah?", kita tidak perlu rapat berjam-jam. Lakukan **A/B Testing**!
- Kirimkan Desain A (Tombol Hijau) ke 50% pengguna secara acak.
- Kirimkan Desain B (Tombol Merah) ke 50% pengguna sisanya.
- Biarkan mereka berinteraksi selama 1 minggu.
- Cek data Analytics: "Ternyata Desain B menghasilkan konversi penjualan 20% lebih tinggi!"
- Keputusan: Terapkan Desain B secara permanen untuk 100% pengguna.

## 3. Mengelola Feedback Loop
Setelah fitur rilis, siklus pembuatan produk (Product Lifecycle) belum berakhir. Itu baru permulaan!
- Pantau *Customer Support Tickets* (Keluhan pelanggan di Call Center).
- Baca review bintang 1 di Google Play Store (App Store).
- Kumpulkan semua komplain tersebut, temukan benang merahnya, lalu ubah menjadi ide perbaikan untuk dimasukkan kembali ke *Product Backlog* (Gudang Ide).

**Siklus Abadi:**
Ide -> Bangun MVP -> Ukur dengan Data (Analytics) -> Pelajari Feedback -> Dapatkan Ide Baru -> Ulangi. (Ini disebut kerangka kerja *Lean Startup*).

**🎉 KELULUSAN TERBAIK!**
Selamat! Anda kini memahami kacamata bisnis dan logika manajemen di balik sebuah aplikasi digital. Anda bukan lagi sekadar koder biasa, melainkan "Product-Minded Engineer" yang sangat diburu Startup Unicorn!
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  }
];
