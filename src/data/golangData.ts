import type { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== GO (GOLANG) MATERIALS ====================
  {
    id: 'go-01',
    user_type: 'student',
    language: 'go',
    title: 'Pengenalan Go: Filosofi & Hello World',
    description: 'Sejarah, kenapa Go diciptakan Google, instalasi, dan struktur workspace.',
    content: `# 🐹 Pengenalan Go (Golang)

## Apa itu Go?
Go adalah bahasa pemrograman **open source**, **statically typed**, dan **compiled** yang dikembangkan oleh Google (Robert Griesemer, Rob Pike, dan Ken Thompson) pada tahun 2007.

Go diciptakan karena frustrasi terhadap bahasa yang ada saat itu:
- C++ (Cepat tapi kompleks & compile lama)
- Python/Java (Mudah tapi performa kurang/berat)

**Filosofi Go:**
> "Simplicity is Complicated."
Go sengaja dibuat dengan fitur yang **sedikit** agar kode mudah dibaca, cepat dicompile, dan efisien untuk sistem skala besar (cloud/microservices).

---

## 🚀 Keunggulan Utama
1.  **Kinerja Tinggi:** Mendekati C/C++ karena dicompile langsung ke *machine code*.
2.  **Concurrency Native:** Memiliki *Goroutine* yang jauh lebih ringan daripada Thread OS.
3.  **Garbage Collected:** Manajemen memori otomatis (seperti Java/Python).
4.  **Sintaks Bersih:** Tidak ada class, inheritance, atau generics yang rumit (awalnya).
5.  **Tools Lengkap:** Format kode otomatis (\`gofmt\`), testing bawaan, dan dependency management.

---

## 🛠️ Instalasi & Setup
Sejak Go 1.11, kita menggunakan **Go Modules**. Tidak perlu lagi folder \`GOPATH\` yang rumit.

1.  **Init Project:**
    \`\`\`bash
    mkdir belajar-go
    cd belajar-go
    go mod init belajar-go  # Membuat file go.mod
    \`\`\`

2.  **Struktur Kode Minimal:**
    Di Go, eksekusi selalu dimulai dari *package main*.

    \`\`\`go
    // main.go
    package main

    import "fmt"

    func main() {
        fmt.Println("Halo, Gophers!")
    }
    \`\`\`

3.  **Menjalankan Kode:**
    \`\`\`bash
    go run main.go
    # atau build menjadi binary
    go build
    ./belajar-go
    \`\`\`

---

## 🎯 Outcome Modul
- Memahami alasan Google menciptakan Go.
- Bisa melakukan inisialisasi modul (\`go mod init\`).
- Mengerti struktur dasar: \`package\`, \`import\`, dan \`func main\`.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'go-02',
    user_type: 'student',
    language: 'go',
    title: 'Variabel, Tipe Data & Kontrol Alur',
    description: 'Deklarasi variabel, zero values, if/else, switch, dan for loops.',
    content: `# Sintaks Dasar Go

## 1. Variabel & Tipe Data
Go memiliki aturan ketat: **Variabel yang dideklarasikan HARUS dipakai**. Jika tidak, akan error saat compile.

### Deklarasi
\`\`\`go
package main

import "fmt"

func main() {
    // Cara 1: Var eksplisit
    var nama string = "Budi"

    // Cara 2: Type Inference (Tipe data ditebak otomatis)
    var umur = 21

    // Cara 3: Short Declaration (Paling sering dipakai di dalam fungsi)
    hobi := "Coding" 

    // Zero Values (Nilai default jika tidak diisi)
    var kosong int     // Jadi 0
    var status bool    // Jadi false
    var teks string    // Jadi "" (empty string)

    fmt.Printf("%s, %d tahun, hobi: %s\n", nama, umur, hobi)
}
\`\`\`

## 2. Konstanta
\`\`\`go
const Pi = 3.14
const (
    StatusActive  = 1
    StatusPending = 2
)
\`\`\`

## 3. Kontrol Alur (Control Flow)
Di Go, **TIDAK ADA** \`while\` atau \`do-while\`. Semuanya menggunakan **\`for\`**.

### Percabangan (If & Switch)
\`\`\`go
nilai := 75

// If dengan short statement (variabel scope terbatas di blok if)
if score := nilai; score >= 80 {
    fmt.Println("A")
} else if score >= 70 {
    fmt.Println("B")
}

// Switch (Otomatis break, tidak perlu nulis break)
os := "linux"
switch os {
case "mac":
    fmt.Println("Mac OS")
case "linux":
    fmt.Println("Linux User")
default:
    fmt.Println("Windows?")
}
\`\`\`

### Perulangan (For Loop)
\`\`\`go
// 1. Standar C-Style
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// 2. While-Style (Hanya kondisi)
counter := 0
for counter < 3 {
    fmt.Println("Loop", counter)
    counter++
}

// 3. Infinite Loop (Server style)
// for {
//    print("Jalan terus...")
// }
\`\`\`

## Outcome Modul
- Terbiasa dengan \`:=\` dan aturan *Unused Variable*.
- Bisa mengubah logika *while* menjadi *for*.
- Memahami konsep *Zero Values* yang unik di Go.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'go-03',
    user_type: 'student',
    language: 'go',
    title: 'Koleksi Data: Array, Slice & Map',
    description: 'Perbedaan Array vs Slice (penting!), manipulasi Slice, dan Map.',
    content: `# Struktur Data: Array, Slice, Map

## 1. Array vs Slice (PENTING!)
- **Array:** Ukuran fix/tetap. Jarang dipakai langsung.
- **Slice:** Ukuran dinamis. Ini "jendela" ke array. **Paling sering dipakai**.

\`\`\`go
// Array (Ukuran 3, tidak bisa nambah)
var arr [3]int = [3]int{1, 2, 3}

// Slice (Ukuran kosong, bisa nambah)
var slice []int = []int{10, 20}

// Menambah data ke slice (append)
slice = append(slice, 30) // Hasil: [10, 20, 30]
\`\`\`

### Bedah Slice (Length vs Capacity)
Slice memiliki *pointer* ke data asli, *length* (isi saat ini), dan *capacity* (kapasitas total).
\`\`\`go
buah := make([]string, 2, 5) // Len 2, Cap 5
buah[0] = "Apel"
buah[1] = "Jeruk"
// buah[2] = "Mangga" -> Error panic! Harus pakai append
buah = append(buah, "Mangga")
\`\`\`

## 2. Map (Key-Value)
Mirip *Dictionary* di Python atau *Object* di JS.

\`\`\`go
// Membuat Map
gaji := map[string]int{
    "programmer": 1000,
    "manager":    1500,
}

// Menambah/Update
gaji["intern"] = 500

// Delete
delete(gaji, "manager")

// Cek keberadaan key (Comma OK Idiom)
value, ok := gaji["ceo"]
if ok {
    fmt.Println("Gaji CEO:", value)
} else {
    fmt.Println("Data tidak ada")
}
\`\`\`

## 3. Iterasi (Range)
\`\`\`go
items := []string{"A", "B"}

// Index dan Value
for i, v := range items {
    fmt.Printf("Index %d isinya %s\n", i, v)
}

// Ignore Index (pakai underscore)
for _, v := range items {
    fmt.Println(v)
}
\`\`\`

## Outcome Modul
- Tidak tertukar antara Array dan Slice.
- Bisa memanipulasi data menggunakan \`append\` dan \`make\`.
- Menggunakan pola \`value, ok\` saat mengakses Map.
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'go-04',
    user_type: 'student',
    language: 'go',
    title: 'Pointer, Struct & Method',
    description: 'Manajemen memori dasar, membuat tipe data custom, dan OOP ala Go.',
    content: `# Pointer & Struct

## 1. Pointer (Jangan Takut!)
Go memiliki pointer (\`*\` dan \`&\`) agar kita bisa menghemat memori atau mengubah nilai asli variabel di fungsi lain. Berbeda dengan C, Go tidak punya pointer arithmetic (lebih aman).

\`\`\`go
func ubahAsli(angka *int) {
    *angka = 100 // Mengubah value di alamat memori
}

func main() {
    x := 10
    ubahAsli(&x) // Kirim alamat memori x
    fmt.Println(x) // Output: 100
}
\`\`\`

## 2. Struct (Pengganti Class)
Go tidak punya \`class\`, tapi punya \`struct\`.

\`\`\`go
type User struct {
    ID        int
    Username  string
    IsActive  bool
}

// Embedded Struct (Mirip Inheritance)
type Admin struct {
    User      // Mewarisi field User
    Level     string
}
\`\`\`

## 3. Method (Receiver)
Fungsi yang menempel pada Struct.
Perhatikan bedanya **Value Receiver** vs **Pointer Receiver**.

\`\`\`go
// Value Receiver: Hanya membaca data (Copy)
func (u User) Sapa() {
    fmt.Println("Halo", u.Username)
}

// Pointer Receiver: Bisa MENGUBAH data struct
func (u *User) Activate() {
    u.IsActive = true
}

func main() {
    u := User{ID: 1, Username: "Zaki"}
    u.Activate() // Otomatis dipass sebagai pointer
    fmt.Println(u.IsActive) // true
}
\`\`\`

## Outcome Modul
- Paham kapan pakai \`*\` dan \`&\`.
- Bisa membuat struktur data kompleks dengan Struct.
- Mengetahui kapan menggunakan Pointer Receiver (saat ingin mengubah state object).
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'go-05',
    user_type: 'student',
    language: 'go',
    title: 'Interface & Error Handling',
    description: 'Polimorfisme implisit dan cara menangani error yang benar di Go.',
    content: `# Interface & Error

## 1. Interface (Implicit)
Di Go, kita tidak menulis \`implements\`. Jika struct memiliki method yang diminta interface, otomatis dianggap implement.
> "If it walks like a duck and quacks like a duck, it's a duck."

\`\`\`go
// Kontrak
type BangunDatar interface {
    HitungLuas() float64
}

type Persegi struct { Sisi float64 }

// Implementasi (Otomatis!)
func (p Persegi) HitungLuas() float64 {
    return p.Sisi * p.Sisi
}

func CetakLuas(b BangunDatar) {
    fmt.Println("Luas:", b.HitungLuas())
}
\`\`\`

## 2. Error Handling (No Try-Catch)
Go memperlakukan Error sebagai **nilai**, bukan exception. Ini membuat kode predictable.

\`\`\`go
import "errors"

func Bagi(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("tidak bisa bagi nol")
    }
    return a / b, nil
}

func main() {
    hasil, err := Bagi(10, 0)
    // Idiom standar Go: Cek err != nil
    if err != nil {
        fmt.Println("Error terjadi:", err)
        return
    }
    fmt.Println("Hasil:", hasil)
}
\`\`\`

## Outcome Modul
- Memahami konsep *Implicit Interface*.
- Terbiasa dengan pola \`if err != nil\`.
- Tidak lagi mencari *try-catch* di Go.
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'go-06',
    user_type: 'student',
    language: 'go',
    title: 'Concurrency: Goroutines & Channels',
    description: 'Fitur "pembunuh" Go. Parallelism mudah dan aman.',
    content: `# Concurrency

## 1. Goroutine
Function yang berjalan secara asinkron (background). Sangat ringan (hanya butuh ~2KB memori stack).

\`\`\`go
import ("fmt"; "time")

func cetak(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go cetak("Background") // Jalan sendiri
    cetak("Utama")         // Jalan di thread utama
}
\`\`\`

## 2. Channels (Pipa Komunikasi)
Cara aman bertukar data antar Goroutine agar tidak *Race Condition*.
> "Do not communicate by sharing memory; instead, share memory by communicating."

\`\`\`go
func worker(c chan string) {
    time.Sleep(1 * time.Second)
    c <- "Pekerjaan Selesai" // Kirim data ke channel
}

func main() {
    pesanChannel := make(chan string)

    go worker(pesanChannel)

    // Main akan 'blok' (menunggu) sampai ada data masuk
    msg := <-pesanChannel 
    fmt.Println(msg)
}
\`\`\`

## 3. Select & WaitGroup
- **WaitGroup:** Menunggu sekumpulan goroutine selesai.
- **Select:** Menangani operasi channel ganda (mirip switch untuk channel).

## Outcome Modul
- Bisa menjalankan fungsi di background dengan \`go\`.
- Menghindari *race condition* menggunakan Channels.
- Memahami filosofi CSP (Communicating Sequential Processes).
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'go-07',
    user_type: 'student',
    language: 'go',
    title: 'Web Development & JSON',
    description: 'Membuat REST API sederhana, struct tags, dan Context.',
    content: `# Web Development

## 1. JSON & Struct Tags
Mapping JSON dari frontend ke Struct Go.

\`\`\`go
import "encoding/json"

type Product struct {
    ID    int     \`json:"id"\`              // Output JSON jadi "id" (kecil)
    Name  string  \`json:"name"\`
    Price int     \`json:"price,omitempty"\` // Hilang jika 0
    Pass  string  \`json:"-"\`               // Tidak ditampilkan
}

func main() {
    p := Product{ID: 1, Name: "Kopi", Price: 0, Pass: "Rahasia"}
    
    // Struct to JSON
    jsonData, _ := json.Marshal(p)
    fmt.Println(string(jsonData)) 
    // Output: {"id":1, "name":"Kopi"} -> Price hilang, Pass hilang
}
\`\`\`

## 2. HTTP Server (net/http)
Go punya web server bawaan yang level-produksi.

\`\`\`go
import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    if r.Method != "GET" {
        http.Error(w, "Method not allowed", 405)
        return
    }
    fmt.Fprint(w, "Halo dari Go Server!")
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Server di port 8080...")
    http.ListenAndServe(":8080", nil)
}
\`\`\`

## 3. Context
Digunakan untuk mengontrol timeout dan pembatalan request (sangat penting untuk API).

## Outcome Modul
- Mengerti cara *Marshaling/Unmarshaling* JSON.
- Bisa membuat Web Server dasar tanpa framework.
- Menggunakan Struct Tags untuk validasi output.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'go-08',
    user_type: 'student',
    language: 'go',
    title: 'Final Project: REST API dengan Framework & DB',
    description: 'Menggunakan Gin/Fiber, GORM/SQL, dan Struktur Project Standar.',
    content: `# Modern Go Development

## 1. Framework: Gin / Fiber
Meskipun \`net/http\` bagus, industri sering pakai framework untuk routing cepat.

\`\`\`go
// Contoh menggunakan Gin Gonic
import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })
    r.Run() // listen 0.0.0.0:8080
}
\`\`\`

## 2. Database Connection
Koneksi ke SQL. Bisa pakai driver raw (\`pgx\`, \`mysql\`) atau ORM (\`GORM\`).

\`\`\`go
// Contoh pseudo-code GORM
db.AutoMigrate(&User{})
db.Create(&User{Name: "Zaki", Age: 20})
\`\`\`

## 3. Standard Project Layout
Jangan taruh semua file di root. Standar komunitas:
\`\`\`
/cmd
  /api
    main.go
/internal       # Kode privat aplikasi (handler, service, repo)
/pkg            # Kode library public
/configs
go.mod
\`\`\`

## 🏆 Final Project Requirements
Buat **Task Management API**:
1.  **Tech:** Go + Gin + PostgreSQL.
2.  **Fitur:** CRUD Task (Judul, Deadline, Status).
3.  **Concurrency:** Buat fitur "Export to CSV" yang berjalan di background (Goroutine) saat user request.
4.  **Unit Test:** Test handler API.

## Outcome Modul
- Siap membangun Microservices dengan Go.
- Memahami struktur proyek skala besar.
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
];