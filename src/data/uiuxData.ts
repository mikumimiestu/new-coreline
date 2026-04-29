import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  {
    id: 'ui-01',
    user_type: 'student',
    language: 'ui-ux',
    title: 'Modul 1: UI vs UX - Apa Bedanya?',
    description: 'Memahami perbedaan fundamental antara User Interface (Tampilan) dan User Experience (Pengalaman Pengguna).',
    content: `# 🎨 Modul 1: UI vs UX - Apa Bedanya?

Banyak orang mengira UI dan UX adalah hal yang sama. Padahal, keduanya memiliki peran yang sangat berbeda namun saling melengkapi dalam pembuatan produk digital.

## 1. Apa itu User Interface (UI)?
**UI (User Interface)** adalah tentang **Visual dan Interaksi**. UI memikirkan bagaimana sebuah aplikasi terlihat di mata pengguna.
- Berhubungan dengan: Warna, Tipografi, Jarak (Spacing), Bentuk Tombol, Animasi, dan Tata Letak (Layout).
- Pertanyaan UI Designer: *"Apakah warna tombol 'Beli' ini cukup mencolok?"*, *"Apakah teks ini mudah dibaca?"*
- Dianalogikan seperti: **Desain interior dan cat sebuah rumah.**

## 2. Apa itu User Experience (UX)?
**UX (User Experience)** adalah tentang **Rasa dan Kemudahan Logika**. UX memikirkan alur perjalanan pengguna dari awal hingga akhir agar mereka merasa puas dan tidak bingung.
- Berhubungan dengan: Riset pengguna, Psikologi, Alur (User Flow), Wireframing, dan Pengujian (Usability Testing).
- Pertanyaan UX Researcher: *"Berapa banyak langkah yang dibutuhkan user untuk bisa checkout barang?"*, *"Mengapa banyak user membatalkan pendaftaran di halaman 2?"*
- Dianalogikan seperti: **Fondasi arsitektur dan kelancaran sirkulasi udara sebuah rumah.**

## 3. Hubungan Simbiosis Keduanya
- UI yang indah tapi UX yang buruk = Seperti botol saus yang bentuknya unik tapi susah dikeluarkan sausnya.
- UX yang bagus tapi UI yang buruk = Situs Craigslist. Sangat efisien, tapi terlihat seperti website tahun 90-an.
- **Goal kita:** Produk yang cantik dilihat (UI) dan sangat mudah digunakan tanpa mikir (UX).

---
## 📝 Quiz Singkat
1. Jika pengguna mengeluh *"Saya tidak tahu cara mengganti password di aplikasi ini"*, apakah ini masalah UI atau UX?
2. Jika pengguna mengeluh *"Teks peringatan error-nya berwarna abu-abu muda, mata saya sakit membacanya"*, apakah ini masalah UI atau UX?
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ui-02',
    user_type: 'student',
    language: 'ui-ux',
    title: 'Modul 2: Proses Design Thinking',
    description: 'Metodologi pemecahan masalah (Problem Solving) yang berpusat pada empati terhadap pengguna asli.',
    content: `# 🧠 Modul 2: Proses Design Thinking

Desain bukanlah sekadar "membuat gambar yang bagus". Desain adalah tentang memecahkan masalah. Dalam industri, kita menggunakan kerangka kerja bernama **Design Thinking**.

Terdapat 5 tahapan berurutan dalam Design Thinking:

## 1. Empathize (Berempati)
Singkirkan asumsi Anda! Anda bukan pengguna produk Anda. Di tahap ini, kita mewawancarai calon pengguna untuk mengetahui penderitaan (*Pain Points*) mereka.
- *Contoh:* Anda membuat aplikasi ojek online. Anda harus bertanya pada ibu rumah tangga, mahasiswa, dan pekerja kantoran tentang keluhan mereka saat memesan ojek.

## 2. Define (Mendefinisikan Masalah)
Kumpulkan semua hasil wawancara, lalu rumuskan Masalah Utama-nya.
- *Problem Statement:* "Ibu-ibu merasa kesulitan memilih lokasi penjemputan karena peta sering bergeser."

## 3. Ideate (Mencari Ide)
Fase "Brainstorming" bebas. Cari solusi liar sebanyak mungkin.
- *Solusi A:* Buat teks pencarian otomatis.
- *Solusi B:* Gunakan fitur foto lokasi sekitar.
- *Solusi C:* Tombol "Jemput saya di lokasi saya berdiri sekarang (GPS)".

## 4. Prototype (Membuat Purwarupa)
Ubah ide terbaik menjadi bentuk nyata yang bisa diklik, namun belum di-coding (bisa menggunakan Figma atau bahkan kertas!).
- Tujuannya adalah membuat "mockup" murah dan cepat untuk divalidasi.

## 5. Test (Pengujian)
Berikan Prototype tersebut ke pengguna asli. Minta mereka menekan tombol-tombolnya.
- Amati di mana mereka bingung.
- Jika mereka gagal, kembali lagi ke fase Ideate atau Prototype untuk diperbaiki (Proses ini disebut *Iterasi*).

---
## 📝 Latihan
Bayangkan Anda ditugaskan membuat "Aplikasi Kasir untuk Warung Kopi kecil".
Sebutkan 2 pertanyaan yang akan Anda ajukan kepada Pemilik Warung di fase **Empathize**!
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ui-03',
    user_type: 'student',
    language: 'ui-ux',
    title: 'Modul 3: Dasar UI - Hierarki & Tipografi',
    description: 'Rahasia membuat desain terlihat profesional seketika menggunakan Hierarki Visual, White Space, dan Tipografi yang tepat.',
    content: `# 📐 Modul 3: Dasar UI - Hierarki & Tipografi

Mengapa website buatan Apple terlihat sangat mahal dan elegan, sedangkan website pemerintah sering terlihat berantakan? Rahasianya ada di fondasi UI!

## 1. Hierarki Visual (Visual Hierarchy)
Mata manusia malas membaca. Mereka hanya memindai (*scanning*). Hierarki bertugas "memaksa" mata pengguna untuk melihat hal terpenting lebih dulu.
- **Ukuran:** Elemen terbesar adalah yang paling penting (Misal: Judul Artikel).
- **Warna & Kontras:** Tombol berwarna terang di tengah latar belakang putih akan langsung menarik mata.
- **Z-Pattern / F-Pattern:** Di dunia barat, mata bergerak dari kiri ke kanan, lalu ke bawah membentuk huruf F atau Z. Taruh elemen penting (Logo, Tombol Login) di pojok kiri/kanan atas.

## 2. Bernapas dengan "White Space"
*White Space* (Ruang Kosong/Negatif) BUKANLAH ruang yang terbuang sia-sia.
- Jangan jejalkan semua informasi di satu layar penuh.
- Memberikan jarak (margin/padding) antar elemen membuat mata pengguna "beristirahat" dan desain terlihat jauh lebih mewah (*Premium*).

## 3. Tipografi (Seni Memilih Font)
Font menyampaikan emosi.
- **Serif (Berlekuk, misal Times New Roman):** Memberi kesan Klasik, Formal, Jurnalistik. (Cocok untuk website Berita/Hukum).
- **Sans-Serif (Polos, misal Roboto, Inter):** Memberi kesan Modern, Bersih, Startup Tech. (Wajib untuk aplikasi/dashboard).
- **Aturan Emas:** Jangan gunakan lebih dari 2 jenis Font dalam satu aplikasi! (Satu untuk Judul, satu untuk Paragraf).

## 4. Teori Warna Singkat
- **Primary Color:** Warna utama brand Anda (Misal Biru untuk Facebook/BCA).
- **Semantic Colors:** Warna yang punya arti universal. Merah (Error/Bahaya), Hijau (Sukses/Aman), Kuning (Peringatan). JANGAN gunakan tombol merah untuk fungsi "Submit Berhasil"!

---
## 📝 Latihan Refleksi
Buka aplikasi WhatsApp atau Gojek di HP Anda. Perhatikan halaman utamanya.
Elemen apa yang paling MEMILIKI KONTRAS (warna terang) sehingga mata Anda langsung tertuju padanya?
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ui-04',
    user_type: 'student',
    language: 'ui-ux',
    title: 'Modul 4: Wireframing & Figma',
    description: 'Mengenal proses pembuatan rangka awal desain (Wireframe) hingga menggunakan software standar industri, Figma.',
    content: `# 🛠️ Modul 4: Wireframing & Alat Desain (Figma)

Setelah teori selesai, desainer harus mewujudkannya secara visual sebelum diserahkan ke tim Programmer.

## 1. Lo-Fi: Sketsa Kasar (Wireframe)
Jangan langsung menggambar dengan warna di laptop! Mulailah dengan **Low-Fidelity (Lo-Fi) Wireframe**.
- Cukup gunakan Kertas dan Pensil (Atau kotak-kotak hitam putih di komputer).
- Fokus pada TATA LETAK (Layout). Di mana posisi gambar? Di mana posisi teks?
- Tujuannya agar jika ide ditolak oleh klien, Anda tidak membuang banyak waktu menghapus desain yang sudah diwarnai cantik.

## 2. Hi-Fi: Desain Akhir (Mockup)
Setelah Wireframe disetujui, kita mengubahnya menjadi **High-Fidelity (Hi-Fi)**.
- Tambahkan warna asli, font asli, gambar asli (bukan lagi sekadar kotak silang), dan bayangan (shadow).
- Hasil akhir inilah yang akan dilihat persis seperti aplikasi aslinya nanti.

## 3. Sang Penguasa Industri: FIGMA
Saat ini, 95% perusahaan IT menggunakan **Figma** untuk mendesain UI. Mengapa?
1. **Berbasis Web:** Tidak perlu komputer *gaming* mahal. Bisa dibuka di browser apa saja.
2. **Kolaborasi Real-Time:** Seperti Google Docs, Anda dan rekan tim (serta klien) bisa mengedit 1 file desain secara bersamaan.
3. **Inspect Code:** Programmer bisa langsung melihat kode CSS (Padding, Color Hex, Font Size) dari desain yang dibuat.

## 4. Sistem Komponen (Design System)
Desainer senior tidak menggambar ulang tombol puluhan kali. Mereka membuat satu "Master Component" tombol. Jika warna master ini diubah dari Biru ke Merah, ratusan tombol lain di seluruh halaman akan otomatis ikut berubah menjadi Merah!

---
## 📝 Tugas Mandiri
Buatlah akun gratis di [Figma.com](https://figma.com). Cobalah buat satu "Frame" seukuran layar iPhone, lalu tambahkan 1 buah kotak dan 1 buah teks di tengahnya!
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ui-05',
    user_type: 'student',
    language: 'ui-ux',
    title: 'Modul 5: Prototyping & Developer Hand-off',
    description: 'Membuat animasi transisi halaman (Prototype) dan cara serah terima desain kepada tim Programmer.',
    content: `# 🚀 Modul 5: Prototyping & Hand-off

Desain statis berupa gambar mati tidak bisa diuji secara akurat. Kita harus membuatnya "hidup"!

## 1. Apa itu Prototyping?
Di Figma, Anda bisa menyambungkan Halaman A ke Halaman B dengan garis panah (Interactions).
- Misal: Jika *User* meng-klik Kotak "Login", layar akan bergeser (Slide In) menampilan halaman Dasbor.
- Ini memungkinkan kita melakukan Simulasi Aplikasi di HP seolah-olah aplikasinya sudah selesai dicoding!

## 2. Usability Testing (Uji Ketergunaan)
Bawa Prototype yang bisa diklik tersebut ke pengguna asli (Target Market).
- Beri mereka skenario: *"Tolong coba pesan sepatu warna merah ukuran 40"*.
- Diam dan perhatikan layar mereka (jangan dibantu!).
- Jika mereka muter-muter kebingungan mencari tombol keranjang, catat itu sebagai temuan kegagalan UX yang harus direvisi.

## 3. Developer Hand-off (Penyerahan ke Programmer)
Ini adalah tahap akhir di mana tugas Anda selesai dan Frontend Developer mulai bekerja.
Sebagai Desainer UI/UX yang baik, serahkan desain dengan rapi:
- **Design System Guide:** Sertakan halaman khusus berisi daftar palet warna (Hex code), ukuran tipografi (H1, H2, Paragraph), dan *state* tombol (Hover, Disabled).
- **Export Assets:** Pastikan semua icon SVG dan gambar JPG sudah disiapkan untuk bisa diunduh oleh programmer.
- **Komunikasi:** Terus dampingi tim Frontend saat proses *coding* jika ada desain yang teknis pembuatannya (melalui CSS/React) terlalu sulit atau tidak memunginkan.

**🎉 KELULUSAN TERBAIK!**
Selamat! Anda telah memahami keseluruhan peta kerja UI/UX Designer. Keahlian ini membuat Anda menjadi *Frontend Developer* yang sangat didambakan perusahaan.
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  }
];
