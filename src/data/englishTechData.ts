import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  {
    id: 'eng-01',
    user_type: 'student',
    language: 'english-tech',
    title: 'Module 1: Essential Tech Vocabulary',
    description: 'Kosakata bahasa Inggris wajib yang sering ditemui di dunia pemrograman dan startup teknologi.',
    content: `# 🇬🇧 Module 1: Essential Tech Vocabulary

Selamat datang di *English for Tech*! Bahasa Inggris adalah bahasa ibu dari dunia pemrograman. Memahami kosakata teknis akan sangat mempercepat karir Anda.

## 1. Perbedaan Frontend dan Backend
- **Frontend / Client-side:** Segala sesuatu yang dilihat dan diinteraksikan oleh pengguna (*User Interface*).
  - *Vocabulary:* Responsive, Render, Layout, Pixel-perfect, Hover, Cache.
- **Backend / Server-side:** Mesin di balik layar yang memproses data dan logika bisnis.
  - *Vocabulary:* Database, Query, Endpoint, Authentication, Latency, Scalability.

## 2. Istilah Umum (General Tech Terms)
Berikut adalah daftar kata kerja (*Verbs*) yang sering diucapkan di kantor IT:
1. **To Deploy:** Mengunggah kode dari komputer lokal ke server agar bisa diakses dunia. (*"I will deploy the app tonight."*)
2. **To Debug:** Proses mencari dan memperbaiki error/kutu di dalam kode. (*"I spent 3 hours debugging this issue."*)
3. **To Refactor:** Merapikan dan mengoptimalkan kode tanpa mengubah fungsionalitasnya. (*"We need to refactor this messy function."*)
4. **To Integrate:** Menggabungkan satu sistem dengan sistem lain. (*"Let's integrate the payment gateway."*)

## 3. Istilah dalam Tim (Agile/Scrum terms)
- **Stand-up:** Rapat harian singkat (biasanya berdiri) untuk membahas progress.
- **Backlog:** Daftar tugas atau fitur yang belum dikerjakan.
- **Bottleneck:** Suatu hambatan/kemacetan yang memperlambat seluruh proses tim. (*"The design approval is our bottleneck right now."*)

---
## 📝 Quiz (Check Your Understanding)
1. Apa arti dari kalimat: *"We need to refactor the backend because of high latency"*?
2. Jika atasan Anda berkata *"Please check the backlog and deploy it"*, apa yang harus Anda lakukan?
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'eng-02',
    user_type: 'student',
    language: 'english-tech',
    title: 'Module 2: Reading Documentation & StackOverflow',
    description: 'Cara membaca dokumentasi teknis API dan memahami percakapan pemecahan masalah di StackOverflow.',
    content: `# 📚 Module 2: Reading Documentation

Sebagian besar waktu *developer* dihabiskan untuk membaca dokumentasi dan mencari solusi di Google (StackOverflow). Kemampuan literasi membaca bahasa Inggris di sini sangat diuji.

## 1. Anatomi Dokumentasi API
Saat Anda membuka dokumentasi (misal: Stripe API atau Google Maps API), Anda akan sering melihat istilah berikut:
- **Prerequisites (Persyaratan):** Hal-hal yang harus diinstal atau dipenuhi sebelum memulai.
- **Authentication:** Cara membuktikan identitas program Anda (misal menggunakan *API Key*).
- **Parameters:** Data yang harus Anda kirimkan ke server.
  - *Required:* Wajib diisi.
  - *Optional:* Boleh dikosongkan.
- **Response:** Jawaban dari server (biasanya berbentuk JSON). Berisi *Success* atau *Error messages*.

*Contoh Kalimat di Dokumentasi:*
> *"This endpoint retrieves a list of users. It requires a valid Bearer Token in the Authorization header."*
> (Endpoint ini mengambil daftar pengguna. Endpoint ini membutuhkan Token Bearer yang valid di header Authorization).

## 2. Membaca StackOverflow
Saat Anda *stuck*, Anda pasti akan lari ke StackOverflow. Perhatikan struktur pertanyaannya:
1. **The Question (Pertanyaan):** Biasanya diawali dengan *"How to..."* atau *"Why am I getting [Error Name]?"*.
2. **The Context (Konteks):** *"I am trying to fetch data, but it returns undefined."* (Saya mencoba mengambil data, tapi kembaliannya undefined).
3. **The Accepted Answer (Jawaban Benar):** Perhatikan jawaban dengan tanda centang hijau. Biasanya mereka menjelaskan alasannya:
   - *"The issue is caused by an asynchronous problem."* (Masalahnya disebabkan oleh problem asynchronous).
   - *"You should use async/await instead of callbacks."* (Kamu sebaiknya menggunakan async/await daripada callbacks).

## 3. Kata Kunci Pencarian Google (Googling Skills)
Developer yang baik tahu cara melakukan pencarian Google dalam bahasa Inggris. Jangan gunakan bahasa Indonesia!
- **Buruk:** *"kenapa react tombolnya tidak bisa diklik"*
- **Bagus:** *"React button onClick not firing/triggering"*
- **Bagus:** *"Uncaught TypeError Cannot read properties of undefined in JavaScript"*

---
## 📝 Latihan
Coba ubah keluhan ini menjadi kata kunci pencarian Google berbahasa Inggris:
1. "Gambar saya tidak muncul di HTML padahal pathnya sudah benar."
2. "Data JSON dari API gagal dilooping pakai map di React."
`,
    level: 'intermediate',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'eng-03',
    user_type: 'student',
    language: 'english-tech',
    title: 'Module 3: Writing Commits & Code Comments',
    description: 'Panduan menulis pesan Git Commit dan komentar kode berbahasa Inggris yang profesional dan standar industri.',
    content: `# ✍️ Module 3: Commits & Comments

Kode Anda akan dibaca oleh *developer* lain (mungkin dari luar negeri). Menulis dokumentasi *inline* dan pesan perubahan (Commit) yang rapi adalah standar profesionalisme.

## 1. Aturan Emas Git Commit Messages
Pesan commit harus singkat, jelas, dan menggunakan **Imperative Mood** (Kata kerja perintah), bukan bentuk lampau (Past Tense).

**❌ Salah (Bentuk Lampau / Tidak Jelas):**
- *"fixed the bug"*
- *"added login page"*
- *"changed color to red"*

**✅ Benar (Imperative Mood):**
- *"Fix authentication bypass bug"*
- *"Add login page layout"*
- *"Update button color to red"*

**Gunakan Konvensi Prefix (Conventional Commits):**
- \`feat:\` Untuk fitur baru. (Contoh: \`feat: add user profile picture\`)
- \`fix:\` Untuk perbaikan bug. (Contoh: \`fix: resolve crash on startup\`)
- \`docs:\` Untuk perubahan dokumentasi/README.
- \`refactor:\` Perubahan kode tanpa mengubah fitur.

## 2. Menulis Code Comments (Komentar Kode)
Komentar yang baik menjelaskan **MENGAPA (Why)**, bukan **APA (What)**. Kode sudah menjelaskan "Apa" yang terjadi.

**❌ Bad Comment:**
\`\`\`javascript
// Create a new array
const result = [];
// Loop through users
for(let i=0; i<users.length; i++) { ... }
\`\`\`
*(Komentar di atas tidak berguna karena programmer sudah tahu itu loop).*

**✅ Good Comment:**
\`\`\`javascript
// We are filtering out inactive users here to prevent
// sending emails to disabled accounts.
const activeUsers = users.filter(user => user.isActive);
\`\`\`

## 3. Frasa Berguna untuk Komentar
- *"Workaround for..."* (Jalan pintas / solusi sementara untuk...)
- *"TODO: Need to optimize this in the next sprint"* (Tugas ke depan: Perlu mengoptimalkan ini...)
- *"Deprecated: Do not use this function anymore"* (Usang: Jangan gunakan fungsi ini lagi)

---
## 📝 Latihan
Ubahlah kalimat berbahasa Indonesia ini menjadi pesan **Git Commit** berbahasa Inggris yang sesuai standar:
1. "Tadi saya sudah memperbaiki bug di mana keranjang belanjanya error."
2. "Menambahkan fitur dark mode."
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'eng-04',
    user_type: 'student',
    language: 'english-tech',
    title: 'Module 4: Professional Communication',
    description: 'Menulis Email, pesan Slack, dan laporan harian (Stand-up) dalam bahasa Inggris untuk klien atau tim global.',
    content: `# 📧 Module 4: Professional Communication

Bekerja secara *remote* mengharuskan Anda berkomunikasi via teks (Slack/Discord/Email). Kesopanan dan kejelasan adalah kuncinya.

## 1. Daily Stand-up Update (Laporan Harian)
Dalam metodologi Agile, Anda harus melaporkan apa yang Anda kerjakan setiap hari. Gunakan format (Yesterday, Today, Blockers).

**Contoh Format Slack Stand-up:**
> **Yesterday:** I worked on integrating the Stripe payment API.
> **Today:** I will write unit tests for the payment module.
> **Blockers:** I am currently blocked because I don't have the API keys for the production server. Could anyone share it?

## 2. Meminta Bantuan (Asking for Help)
Jangan sekadar bilang "It's not working" atau "Help me". Gunakan format yang sopan dan informatif.

> "Hi team, I am currently facing an issue with the database connection. It throws a 'Timeout' error. I have tried restarting the server, but it didn't work. Could someone point me in the right direction?"
*(Hai tim, saya sedang menghadapi masalah... Saya sudah mencoba... Bisakah seseorang memberi petunjuk?)*

## 3. Menulis Email kepada Klien
Email harus bernada profesional dan terstruktur.
- **Pembukaan:** *"Dear Mr. Smith,"* atau *"Hi Team,"*
- **Tujuan:** *"I am writing to update you on the progress of the e-commerce website."* (Saya menulis untuk memperbarui progres...)
- **Isi:** *"We have successfully deployed the beta version. However, we need your approval on the new design."*
- **Penutup:** *"Looking forward to hearing from you. Best regards, [Your Name]."*

## 4. Frasa Klarifikasi (Bila Anda tidak mengerti)
- *"Could you please clarify what you mean by..."* (Bisakah Anda mengklarifikasi apa yang Anda maksud dengan...)
- *"Just to make sure we are on the same page, do you want me to..."* (Hanya untuk memastikan kita sepemahaman, apakah Anda ingin saya...)

---
## 📝 Latihan
Anda sedang mengerjakan tugas "Membuat Halaman Login", namun desain dari tim desainer belum dikirimkan. Tuliskan pesan **Slack** berbahasa Inggris untuk melaporkan hal ini di *Daily Stand-up*!
`,
    level: 'advanced',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'eng-05',
    user_type: 'student',
    language: 'english-tech',
    title: 'Module 5: Technical Interview Prep',
    description: 'Mempersiapkan jawaban bahasa Inggris untuk wawancara kerja (HR dan Technical Interview) di perusahaan multinasional.',
    content: `# 🎤 Module 5: Technical Interview Prep

Lolos tes koding saja tidak cukup. Anda harus bisa *menjelaskan* logika Anda secara lisan dalam bahasa Inggris kepada *Interviewer* (Pewawancara).

## 1. "Tell me about yourself" (Ceritakan tentang diri Anda)
Ini adalah pertanyaan pembuka 99% wawancara. Gunakan formula **Present - Past - Future**.

> "Hi, I'm [Nama]. I am a **Frontend Developer** with 2 years of experience. **Currently (Present)**, I work at XYZ company where I build user interfaces using React.js. **Before that (Past)**, I graduated from [University/Bootcamp] and built several full-stack projects. **Looking forward (Future)**, I am excited to join your company because I want to challenge myself in a larger scale application."

## 2. Menjelaskan Pengalaman / Proyek (Gunakan Metode STAR)
Saat ditanya *"Ceritakan pengalaman paling menantangmu"*, gunakan **S.T.A.R**:
- **Situation (Situasi):** *"In my previous project, our website was very slow."*
- **Task (Tugas):** *"My task was to improve the loading speed by 50%."*
- **Action (Tindakan):** *"I implemented lazy loading for images and refactored the database queries to reduce latency."*
- **Result (Hasil):** *"As a result, the load time decreased from 5 seconds to 1.5 seconds, and user retention increased."*

## 3. Saat Melakukan Live Coding
Jangan diam saat mengetik kode! Berpikirlah dengan suara keras (*Think out loud*).
- *"First, I will initialize an empty array to store the result."* (Pertama saya akan inisialisasi array kosong...)
- *"Then, I'm going to loop through the user data using a map function."* (Kemudian, saya akan me-looping data...)
- *"I chose this approach because its time complexity is O(N), which is faster than nested loops."* (Saya memilih pendekatan ini karena kompleksitas waktunya O(N), lebih cepat dari loop bersarang).

## 4. Bertanya Balik ke Interviewer
Di akhir sesi, mereka akan bertanya *"Do you have any questions for us?"*. JANGAN katakan "No".
- *"What does a typical day look like for a developer in this team?"* (Seperti apa keseharian developer di tim ini?)
- *"What is the main tech stack used in this project?"* (Apa stack teknologi utama yang digunakan?)

**🎉 KELULUSAN TERBAIK!**
Selamat! Anda telah menguasai dasar *English for Tech*. Kini Anda siap bersaing di pasar global.
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  }
];
