import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  {
    id: 'jp-01',
    user_type: 'student',
    language: 'japanese',
    title: 'モジュール 1: Huruf Dasar & Salam (Aisatsu)',
    description: 'Pengenalan Hiragana, Katakana, dan salam sapaan dasar di lingkungan perusahaan IT Jepang.',
    content: `# 🇯🇵 Module 1: Huruf Dasar & Aisatsu (Salam)

Jepang adalah salah satu pasar IT terbesar yang sangat terbuka bagi developer Indonesia (Program *Engineering Visa*). Langkah pertama adalah menguasai alfabet dan sapaan.

## 1. Tiga Jenis Huruf Jepang
Tidak seperti bahasa Inggris, Jepang menggunakan 3 sistem tulisan:
1. **Hiragana (ひらがな):** Digunakan untuk kata asli bahasa Jepang (contoh: ありがとう - Arigatou).
2. **Katakana (カタカナ):** Digunakan untuk kata serapan asing. Di dunia IT, Anda akan SANGAT SERING membaca ini! (contoh: データ - Deta / Data).
3. **Kanji (漢字):** Karakter kompleks dari China yang memiliki arti tertentu. (contoh: 水 - Air).

## 2. Aisatsu (Salam Sapaan Wajib)
Di budaya kerja Jepang, *Aisatsu* sangatlah sakral. Karyawan yang tidak mengucapkan salam dianggap tidak profesional.

- **Ohayou gozaimasu (おはようございます):** Selamat pagi. Ucapkan dengan lantang saat memasuki kantor.
- **Otsukaresama desu (お疲れ様です):** "Terima kasih atas kerja kerasnya". Ini adalah frase ajaib! Diucapkan kapan saja di kantor untuk menyapa rekan kerja.
- **Osaki ni shitsurei shimasu (お先に失礼します):** Diucapkan saat Anda pulang kerja lebih dulu dari orang lain ("Maaf saya permisi duluan").
- **Yoroshiku onegaishimasu (よろしくお願いします):** "Mohon kerjasamanya / Mohon bantuannya". Diucapkan saat pertama berkenalan atau saat menyerahkan tugas ke orang lain.

## 3. Pentingnya Katakana di Dunia IT
Dunia IT Jepang sangat bergantung pada bahasa Inggris yang "dijepangkan" (Wasei-eigo) menggunakan Katakana.
- Internet = インターネット (*Intaanetto*)
- Server = サーバー (*Saabaa*)
- Code = コード (*Koodo*)

---
## 📝 Quiz Singkat
1. Frase apa yang wajib Anda ucapkan saat bertemu rekan kerja di lorong kantor pada siang hari (sebagai bentuk penghargaan atas kerja keras)?
2. Huruf Jepang mana yang paling sering digunakan untuk menulis kata-kata teknis seperti "Server" dan "Mouse"?
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'jp-02',
    user_type: 'student',
    language: 'japanese',
    title: 'モジュール 2: IT Vocabulary (Katakana Tech)',
    description: 'Menguasai kosakata pemrograman dan istilah komputer yang telah diadopsi ke dalam bahasa Jepang.',
    content: `# 💻 Module 2: IT Vocabulary (Katakana Tech)

Jika Anda bisa membaca Katakana, Anda secara otomatis bisa memahami 70% istilah teknis IT di Jepang. Mengapa? Karena mereka hanya menirukan pengucapan bahasa Inggris!

## 1. Hardware & Basic Terms (Perangkat Keras)
- Komputer (Personal Computer) = **Pasokon (パソコン)** -> Singkatan dari Personal Computer.
- Smartphone = **Sumaho (スマホ)** -> Singkatan dari Smartphone.
- Mouse = **Mausu (マウス)**
- Keyboard = **Kiiboodo (キーボード)**
- Layar/Screen = **Gamen (画面)** -> *Ini menggunakan Kanji murni.*

## 2. Software & Development Terms (Pengembangan)
- Data = **Deeta (データ)**
- File = **Fairu (ファイル)**
- Database = **Deetabeesu (データベース)** atau sering disingkat **DB (Diibii)**.
- System = **Shisutemu (システム)**
- Error = **Eraa (エラー)**
- Bug = **Bagu (バグ)**

## 3. Action Verbs (Kata Kerja Teknis)
Orang Jepang sering menambahkan kata **suru (する)** yang berarti "melakukan" setelah kata serapan bahasa Inggris.
- Download = Daunroodo suru (ダウンロードする)
- Install = Insutooru suru (インストールする)
- Test/Testing = Tesuto suru (テストする)
- Klik = Kurikku suru (クリックする)
- Login = Roguin suru (ログインする)

## 4. Contoh Kalimat Dasar
- *"Bagu o naoshimashita"* (バグを直しました) = Saya telah memperbaiki bug.
- *"Deeta o daunroodo shite kudasai"* (データをダウンロードしてください) = Tolong download datanya.

---
## 📝 Latihan
Coba ubah kata-kata teknis Inggris berikut ke dalam pelafalan Katakana Jepang (tebak saja bunyinya):
1. Password
2. Program
3. Update
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'jp-03',
    user_type: 'student',
    language: 'japanese',
    title: 'モジュール 3: Jikoshoukai (Self Introduction)',
    description: 'Cara memperkenalkan diri sebagai Software Engineer secara formal di depan tim atau saat wawancara.',
    content: `# 🤝 Module 3: Jikoshoukai (Perkenalan Diri)

*Jikoshoukai* (自己紹介) adalah momen paling krusial di Jepang. Kesan pertama menentukan segalanya. Saat wawancara kerja, Anda wajib bisa memperkenalkan diri dalam bahasa Jepang.

## 1. Struktur Standar Jikoshoukai
Berikut adalah urutan baku yang tidak boleh dilanggar:

**1. Pembukaan (Hajimemashite)**
> *"Hajimemashite"* (初めまして) = Senang bertemu dengan Anda (Hanya untuk pertemuan pertama).

**2. Nama & Asal**
> *"Watashi wa [Nama] to moushimasu."* (私は [Nama] と申します) = Nama saya adalah [Nama]. (Sangat sopan)
> *"Indoneshia kara kimashita."* (インドネシアから来ました) = Saya berasal dari Indonesia.

**3. Profesi / Keahlian**
> *"Furonto-endo enjinia desu."* (フロントエンドエンジニアです) = Saya adalah seorang Frontend Engineer.
> *"Riakuto (React) ga tokui desu."* (Reactが得意です) = Keahlian saya adalah React.

**4. Harapan / Penutup (Wajib!)**
> *"Douzo yoroshiku onegai itashimasu."* (どうぞよろしくお願いいたします) = Mohon bimbingan dan kerjasamanya. (Sambil membungkuk / *Ojigi*).

## 2. Contoh Jikoshoukai Lengkap
*"Hajimemashite. Watashi wa Budi to moushimasu. Indoneshia kara kimashita. Fuurustakku enjinia desu. Keiken wa ni-nen desu (Pengalaman saya 2 tahun). Tokui na gengo wa Java to JavaScript desu (Bahasa keahlian saya adalah Java dan JavaScript). Douzo yoroshiku onegai itashimasu."*

## 3. Gestur Tubuh (Ojigi)
Saat mengucapkan penutup *"Yoroshiku onegaishimasu"*, Anda harus menundukkan badan (Ojigi) sekitar 45 derajat (Keirei). Jangan menunduk sambil berjalan, berhentilah, ucapkan, lalu menunduk.

---
## 📝 Praktik Mandiri
Tulis draf *Jikoshoukai* Anda sendiri menggunakan format di atas, ganti bagian yang di dalam kurung dengan nama dan bahasa pemrograman keahlian Anda!
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'jp-04',
    user_type: 'student',
    language: 'japanese',
    title: 'モジュール 4: Hourensou (Komunikasi Kerja Jepang)',
    description: 'Memahami pilar utama komunikasi bisnis Jepang (Hokoku, Renraku, Soudan) agar tidak terjadi miskomunikasi.',
    content: `# 🗣️ Module 4: Konsep Hourensou (報連相)

Di perusahaan Barat, karyawan dituntut untuk mandiri (*independent*). Di perusahaan Jepang, kebalikannya: **Kerjasama dan Laporan Berkelanjutan** adalah yang utama. Sistem ini disebut **Hou-Ren-Sou**.

Kata *Hourensou* secara harfiah berarti "Bayam", tetapi ini adalah singkatan dari 3 pilar kerja:

## 1. HOUkoku (報告) = Melaporkan
Anda wajib melaporkan status pekerjaan Anda, terutama jika sudah selesai atau jika terjadi masalah (Bug). Jangan menunggu atasan bertanya!
- *"Purojekuto ga kanryou shimashita"* (プロジェクトが完了しました) = Proyek telah selesai.
- *"Eraa ga hassei shimashita"* (エラーが発生しました) = Terjadi error.

## 2. RENraku (連絡) = Menginformasikan (Berbagi Info)
Jika ada kejadian yang mempengaruhi tim, Anda harus segera memberitahu mereka. (Misal: Terlambat, sakit, atau server down).
- *"Densha ga okurete iru node, 10-pun chikoku shimasu"* (電車が遅れているので、10分遅刻します) = Karena kereta terlambat, saya akan telat 10 menit.
- *"Kyou wa yasumimasu"* (今日は休みます) = Hari ini saya akan mengambil cuti/libur.

## 3. SOUdan (相談) = Berkonsultasi
Orang Jepang sangat tidak suka jika Anda mengambil keputusan besar sendiri tanpa berdiskusi. Jika Anda bingung cara menulis kode atau *stuck*, segeralah berkonsultasi.
- *"Chotto soudan shitemo ii desu ka?"* (ちょっと相談してもいいですか？) = Boleh saya berkonsultasi sebentar?
- *"Kono koodo ni tsuite, oshiete itadakemasen ka?"* (このコードについて、教えていただけませんか？) = Bolehkah Anda mengajarkan saya tentang kode ini?

## Mengapa ini penting?
Banyak engineer asing dipecat di Jepang bukan karena *skill coding* mereka jelek, melainkan karena mereka tidak melakukan *Hourensou* (bekerja diam-diam dan menutupi kesalahan).

---
## 📝 Latihan Skenario
Jika Anda secara tidak sengaja menghapus database *staging*, dari ketiga pilar Hourensou (Hou/Ren/Sou), langkah pertama apa yang paling mendesak untuk dilakukan kepada atasan Anda?
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'jp-05',
    user_type: 'student',
    language: 'japanese',
    title: 'モジュール 5: Keigo (Bahasa Sopan & Bisnis)',
    description: 'Pengenalan tingkat kesopanan bahasa Jepang (Desu/Masu vs Keigo) yang sangat krusial saat berbicara dengan Klien atau Manajer.',
    content: `# 👔 Module 5: Keigo (Bahasa Bisnis Tingkat Tinggi)

Bahasa Jepang memiliki tingkatan (*Levels of Politeness*). Berbicara kepada teman (Kasual) berbeda dengan berbicara kepada atasan (Sopan), dan sangat berbeda dengan berbicara kepada Klien (Keigo).

## 1. Tiga Tingkat Bahasa
1. **Futsugo (Kasual):** Digunakan untuk teman dekat atau keluarga. (Contoh: *Taberu* / Makan).
2. **Teineigo (Bentuk Desu/Masu):** Digunakan untuk rekan kerja standar. (Contoh: *Tabemasu* / Makan). **Ini adalah bentuk yang paling aman digunakan di kantor.**
3. **Keigo (Sangat Hormat/Merendah):** Digunakan untuk Bos Besar, Klien, atau Pelanggan.

## 2. Mengenal Sonkeigo & Kenjougo (Bagian dari Keigo)
Dalam Keigo, jika kita membicarakan tindakan Klien, kita "Meninggikan" mereka (*Sonkeigo*). Jika membicarakan diri sendiri, kita "Merendahkan" diri (*Kenjougo*).

*Contoh Perubahan Kata Kerja "Tahu / Mengerti":*
- Kasual: *Wakatta*
- Standar Kantor: *Wakarimashita* (Saya mengerti)
- Kepada Klien/Bos: **Kashikomarimashita** (Saya sangat mengerti / Laksanakan)

*Contoh "Melihat / Memeriksa":*
- Standar: *Mimasu*
- Menawarkan diri ke klien: **Haiken shimasu** (Hamba akan melihatnya)

## 3. Frasa Bisnis Email (Bijinesu Meeru)
Saat Anda menulis tiket Jira atau Email ke klien Jepang, gunakan format baku:
- **Pembuka:** *"Osewa ni natte orimasu. [Nama Perusahaan] no [Nama Anda] desu."* 
  (Terima kasih atas bantuan Anda selama ini. Saya [Nama] dari [Perusahaan]).
- **Maaf merepotkan:** *"Otesuu o okake shimasu ga..."* (Maaf merepotkan Anda, tetapi...)
- **Penutup:** *"Yoroshiku onegai itashimasu."* (Mohon bantuannya).

## Pesan Penutup
Menguasai N5-N4 sudah cukup untuk bertahan hidup secara lisan di perusahaan Jepang yang ramah orang asing. Teruslah berlatih Katakana, karena itu adalah "cheat code" terbaik bagi Engineer. *Ganbatte kudasai!* (Berjuanglah!)
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  }
];
