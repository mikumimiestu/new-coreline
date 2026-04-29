import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  {
    id: 'agile-01',
    user_type: 'student',
    language: 'agile-scrum',
    title: 'Modul 1: Waterfall vs Agile Methodology',
    description: 'Sejarah manajemen proyek perangkat lunak dan alasan mengapa dunia beralih dari model tradisional ke Agile.',
    content: `# 🏃‍♂️ Modul 1: Waterfall vs Agile

Membangun aplikasi besar (seperti Gojek atau Tokopedia) tidak bisa dilakukan asal coding. Kita butuh metodologi manajemen proyek.

## 1. Pendekatan Tradisional: Waterfall (Air Terjun)
Dulu, pengembangan *software* meniru pembangunan gedung arsitektur (Waterfall).
- **Alur Kaku:** Requirement -> Design -> Coding -> Testing -> Deployment.
- Anda tidak boleh mulai Coding jika Design belum 100% selesai.
- **Masalahnya:** Pembuatan software butuh waktu 1 tahun. Setelah 1 tahun dirilis, ternyata Klien/Pasar sudah tidak menginginkan fitur tersebut (ketinggalan zaman) atau kebutuhannya berubah! Di Waterfall, perubahan di tengah jalan itu haram dan sangat mahal.

## 2. Revolusi Pendekatan: Agile
Tahun 2001, para ahli berkumpul dan menciptakan "Agile Manifesto". Agile mengedepankan **Kecepatan, Fleksibilitas, dan Adaptasi terhadap Perubahan**.
- Jangan menunggu 1 tahun untuk merilis software sempurna!
- Rilis fitur kecil-kecilan (seadanya dulu) setiap 2 minggu.
- Minta respon Klien. Jika kurang bagus, langsung ubah arah di minggu ke-3.

## 3. Mindset Agile (Pola Pikir)
- *Individuals and interactions over processes and tools.* (Komunikasi manusia lebih penting dari alat).
- *Working software over comprehensive documentation.* (Aplikasi yang jalan lebih penting dari tumpukan dokumen tebal).
- *Responding to change over following a plan.* (Responsif terhadap revisi lebih penting daripada ngotot mengikuti rencana awal).

Agile BUKANLAH teknik atau *tools*, melainkan Pola Pikir (Mindset). Untuk menerapkannya di perusahaan, kita butuh kerangka kerja praktis, dan yang paling populer adalah **SCRUM**.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'agile-02',
    user_type: 'student',
    language: 'agile-scrum',
    title: 'Modul 2: Struktur Tim Scrum (Scrum Roles)',
    description: 'Mengenal 3 peran utama dalam tim Scrum: Product Owner, Scrum Master, dan Development Team.',
    content: `# 👥 Modul 2: Struktur Tim Scrum

Dalam kerangka kerja Scrum, sebuah tim sengaja dibuat berukuran kecil (biasanya 5 hingga 9 orang) agar lincah. Di Scrum, **TIDAK ADA JABATAN PROJECT MANAGER!**

Tim Scrum dibagi menjadi 3 Peran (Roles) wajib:

## 1. Product Owner (Pemilik Produk / PO)
- **Tugas:** Menjadi jembatan antara Bisnis (Klien/User) dengan Tim Developer.
- Ia yang menentukan *Apa* yang harus dibangun dan urutan prioritasnya.
- Mengelola "Product Backlog" (Daftar semua keinginan fitur).
- *Semboyan PO:* "Bulan ini kita harus merilis fitur Pembayaran via Gopay karena itu yang paling mendatangkan cuan bagi perusahaan!"

## 2. Scrum Master (SM)
- **Tugas:** Ini BUKAN bos. Scrum Master adalah "Servant-Leader" (Pemimpin yang melayani).
- Ia bertugas memastikan tim mematuhi aturan main Scrum.
- Melindungi Developer dari gangguan eksternal (Misal: Bos besar tiba-tiba menyuruh Dev mengerjakan hal lain di luar rencana).
- Menghilangkan rintangan (*Blockers/Impediments*).
- *Semboyan SM:* "Apakah ada hambatan yang menghalangi kalian menulis kode hari ini? Sini saya bantu urus ke manajemen."

## 3. Development Team (Tim Pengembang)
- Tim teknis yang mengeksekusi pekerjaan (Programmer, UI/UX Designer, QA Tester).
- Sifatnya: **Self-organizing** (Mengatur diri sendiri). PO boleh menyuruh "Buat fitur pembayaran", tapi PO TIDAK BOLEH mendikte "Bagaimana cara kodingnya". Developer lah yang menentukan cara dan estimasi waktunya.

---
## 📝 Quiz Singkat
1. Jika seorang developer kekurangan lisensi software untuk bekerja, siapa yang bertugas membantu menyelesaikan hambatan ini?
2. Siapa pemegang kuasa tertinggi untuk memprioritaskan fitur mana yang dikerjakan lebih dulu?
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'agile-03',
    user_type: 'student',
    language: 'agile-scrum',
    title: 'Modul 3: The Scrum Events (Upacara Scrum)',
    description: 'Memahami siklus Sprint, Sprint Planning, Daily Stand-up, Sprint Review, dan Sprint Retrospective.',
    content: `# ⏰ Modul 3: The Scrum Events

Jantung dari Scrum adalah Siklus waktu yang disebut **SPRINT**. Sebuah Sprint biasanya berdurasi tetap, yakni **1 hingga 4 minggu** (paling umum 2 minggu). Di dalam 1 Sprint, terdapat 4 rapat rutin (*Ceremonies*):

## 1. Sprint Planning (Perencanaan)
Dilakukan di hari pertama Sprint (Misal: Senin Pagi).
- Seluruh tim berkumpul. Product Owner membawa prioritas teratas.
- Tim Developer mengambil tugas tersebut dan menakar "Berapa banyak fitur yang sanggup kita selesaikan dalam 2 minggu ke depan?"
- Output: Tercipta **Sprint Goal** (Tujuan Sprint).

## 2. Daily Scrum / Stand-up (Rapat Harian)
Setiap hari, di waktu yang sama, dilakukan rapat maksimal **15 Menit**. Biasanya dilakukan sambil berdiri agar cepat.
Setiap anggota menjawab 3 hal:
1. Apa yang saya selesaikan kemarin?
2. Apa yang akan saya kerjakan hari ini?
3. Apakah ada hambatan (*blockers*)?

## 3. Sprint Review (Demo Klien)
Dilakukan di hari terakhir Sprint (Misal: Jumat Sore minggu ke-2).
- Developer mendemonstrasikan hasil *Software* yang sudah jadi (benar-benar jalan, bukan sekadar desain) kepada Klien / Stakeholders.
- Mendapatkan masukan langsung (Feedback).

## 4. Sprint Retrospective (Introspeksi Internal)
Setelah Review, Klien disuruh keluar ruangan. Rapat ini HANYA untuk Tim Internal.
Tim mengevaluasi cara kerja mereka selama 2 minggu ke belakang:
- *What went well?* (Apa yang sudah bagus?)
- *What went wrong?* (Apa yang buruk / sering miskomunikasi?)
- *Action item:* Apa yang harus diperbaiki di Sprint berikutnya? (Contoh: "Mulai minggu depan kita tidak boleh push kode di hari Jumat malam").

*(Setelah ini selesai, siklus kembali lagi berulang ke Sprint Planning untuk Sprint berikutnya!)*
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'agile-04',
    user_type: 'student',
    language: 'agile-scrum',
    title: 'Modul 4: Scrum Artifacts & Kanban Board',
    description: 'Objek nyata dalam Scrum seperti Product Backlog, User Story, dan cara mengoperasikan papan kerja Trello / Jira.',
    content: `# 📋 Modul 4: Scrum Artifacts & Alat Kerja

Untuk menjalankan proses Scrum, kita butuh catatan yang transparan agar seluruh anggota tahu apa yang sedang terjadi.

## 1. Product Backlog
Ini adalah "Gudang Ide" atau daftar keinginan panjang dari seluruh fitur yang mungkin ditambahkan ke produk. Dikelola 100% oleh Product Owner.

## 2. User Stories (Gaya Menulis Tugas)
Di Scrum, kita tidak menulis daftar tugas teknis seperti *"Buat tabel MySQL"*. Kita menulisnya dari kacamata pengguna, disebut **User Story**.
Formatnya:
> *"As a [role], I want to [action], so that [benefit]."*

Contoh: *"Sebagai Pembeli, saya ingin menyimpan barang ke Wishlist, agar saya bisa membelinya bulan depan saat gajian."*
Dengan begini, Programmer mengerti KONTEKS BISNIS mengapa fitur itu dibuat.

## 3. Papan Kerja KANBAN (Trello / Jira)
Agar tugas tidak kacau, tim Scrum menggunakan papan visual berkolom untuk memindahkan status tugas (*Tickets*).
Kolom dasar Kanban:
1. **To Do (Sprint Backlog):** Tugas yang akan dikerjakan di siklus Sprint ini.
2. **In Progress:** Tugas yang sedang aktif di-coding oleh developer hari ini.
3. **In Review / QA:** Kode sudah jadi, sedang ditest oleh tim QA atau sedang di-Review oleh Senior Programmer.
4. **Done:** Tugas selesai, bebas bug, dan siap rilis!

*Aturan Emas:* Seorang Developer dilarang keras mengambil 3 tiket sekaligus ke kolom "In Progress". Ambil 1, selesaikan sampai Done, baru ambil tiket baru! (Konsep *Limit Work In Progress*).

---
## 📝 Latihan
Buatlah 1 buah format kalimat **User Story** jika Anda ingin fitur "Login menggunakan akun Google" pada aplikasi streaming film Anda!
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'agile-05',
    user_type: 'student',
    language: 'agile-scrum',
    title: 'Modul 5: Estimasi Scrum (Story Points)',
    description: 'Cara unik Agile mengestimasi tingkat kesulitan sebuah tugas menggunakan Planning Poker dan deret Fibonacci.',
    content: `# 🃏 Modul 5: Estimasi Tugas (Story Points)

Jika Bos bertanya *"Berapa lama fitur Keranjang Belanja ini akan selesai?"*, menjawab dengan format waktu (misal: "3 Hari") sangat berbahaya bagi programmer karena coding penuh ketidakpastian.

## 1. Konsep Relative Estimation
Scrum tidak mengestimasi waktu (Jam/Hari). Scrum mengestimasi **Beban Kerja & Tingkat Kesulitan (Story Points)** secara relatif.
- Kita menyepakati 1 tugas referensi, misal "Membuat Form Ganti Password" bernilai **2 Point**.
- Jika membuat "Fitur Lupa Password dengan Email OTP" terasa 3 kali lebih rumit, maka kita beri nilai **5 Point** (bukan "selesai hari Jumat").

## 2. Deret Fibonacci
Poin yang diberikan harus menggunakan deret angka Fibonacci: **1, 2, 3, 5, 8, 13, 21**.
Mengapa melompat jauh (dari 8 ke 13)? Karena manusia sangat buruk menebak angka yang presisi untuk tugas yang besar. 
- Jika angkanya 1-3: Fitur kecil dan jelas.
- Jika angkanya 13 atau 21: Tugas ini terlalu raksasa (Epics). Developer menolak mengerjakannya, PO harus memecah fitur ini menjadi bagian-bagian kecil (Misal 5 dan 8) agar lebih mudah dikerjakan.

## 3. Planning Poker (Poker Perencanaan)
Bagaimana tim sepakat menentukan poin? Menggunakan semacam "Bermain Kartu"!
1. PO menjelaskan sebuah User Story.
2. Seluruh Developer memegang kartu angka Fibonacci di tangannya (bisa via aplikasi web).
3. Dalam hitungan ketiga, semua Developer **membuka kartu bersamaan** secara rahasia.
4. Jika Si A menaruh angka 2, tapi si B menaruh angka 13, maka mereka harus berdebat! Kenapa B menganggap ini sangat susah? (Mungkin B tahu ada masalah database yang A tidak tahu).
5. Debat selesai, lakukan voting lagi sampai menemukan angka sepakat (Konsensus).

## 4. Velocity (Kecepatan Tim)
Di akhir Sprint, kita menjumlahkan semua *Story Point* dari tugas yang berstatus "Done". Misalnya, totalnya 30 Poin. Kecepatan tim ini adalah 30.
Maka di siklus Sprint berikutnya, tim tidak boleh mengambil pekerjaan dari PO yang total nilainya melebihi 30! Ini melindungi tim dari lembur (*burnout*).

**🎉 KELULUSAN TERBAIK!**
Anda telah memahami esensi dari *Agile & Scrum*! Pemahaman ini akan membuat Anda terlihat sangat matang secara profesional saat wawancara kerja IT.
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  }
];
