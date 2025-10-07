export interface User {
  id: string;
  access_code: string;
  user_type: 'student' | 'umum' | 'pro' | 'game';
  name: string;
  username: string;
  email: string;
  phone: string | null;
  subscription_type: 'free' | 'plus' | 'pro';
  subscription_period: 'monthly' | 'yearly' | null;
  subscription_start: string | null;
  subscription_end: string | null;
  subscription_status: 'active' | 'expired' | 'cancelled';
  created_at: string;
  last_login: string;
}

export interface LearningMaterial {
  id: string;
  user_type: string;
  language: string | null;
  title: string;
  description: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  subscription_type: 'plus' | 'pro';
  period: 'monthly' | 'yearly';
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  start_date: string | null;
  end_date: string | null;
  payment_date: string | null;
  created_at: string;
}

export const MOCK_USERS: User[] = [
  {
    id: '1011',
    access_code: 'MIKU001',
    user_type: 'student',
    name: 'Mikumiestu',
    username: 'mikumistu',
    email: 'mikumiestu@astbyte.com',
    phone: '-',
    subscription_type: 'plus',
    subscription_period: null,
    subscription_start: null,
    subscription_end: null,
    subscription_status: 'active',
    created_at: '2025-01-01T00:00:00Z',
    last_login: '2025-10-07T00:00:00Z'
  },
  {
    id: '2',
    access_code: 'UMUM001',
    user_type: 'umum',
    name: 'Siti Nurhaliza',
    username: 'sitinur',
    email: 'siti@email.com',
    phone: '082345678901',
    subscription_type: 'plus',
    subscription_period: 'monthly',
    subscription_start: '2025-09-01T00:00:00Z',
    subscription_end: '2025-10-01T00:00:00Z',
    subscription_status: 'active',
    created_at: '2025-02-01T00:00:00Z',
    last_login: '2025-10-07T00:00:00Z'
  },
  {
    id: '3',
    access_code: 'PRO001',
    user_type: 'pro',
    name: 'Ahmad Developer',
    username: 'ahmaddev',
    email: 'ahmad@pro.com',
    phone: '083456789012',
    subscription_type: 'pro',
    subscription_period: 'yearly',
    subscription_start: '2025-01-01T00:00:00Z',
    subscription_end: '2026-01-01T00:00:00Z',
    subscription_status: 'active',
    created_at: '2025-01-01T00:00:00Z',
    last_login: '2025-10-07T00:00:00Z'
  },
  {
    id: '4',
    access_code: 'GAME001',
    user_type: 'game',
    name: 'Rina Gamedev',
    username: 'rinagame',
    email: 'rina@game.com',
    phone: '084567890123',
    subscription_type: 'free',
    subscription_period: null,
    subscription_start: null,
    subscription_end: null,
    subscription_status: 'active',
    created_at: '2025-03-01T00:00:00Z',
    last_login: '2025-10-07T00:00:00Z'
  }
];

export const MOCK_MATERIALS: LearningMaterial[] = [
  {
    id: '1',
    user_type: 'student',
    language: 'python',
    title: 'Pengenalan Python',
    description: 'Belajar dasar-dasar pemrograman Python',
    content: `# Pengenalan Python

Python adalah bahasa pemrograman yang mudah dipelajari dan sangat populer.

## Mengapa Python?

- Syntax yang mudah dibaca
- Cocok untuk pemula
- Banyak library tersedia
- Digunakan di berbagai bidang

## Hello World

Mari kita mulai dengan program pertama:

\`\`\`python
print("Hello, World!")
\`\`\`

Program di atas akan menampilkan teks "Hello, World!" ke layar.

## Variabel

Variabel digunakan untuk menyimpan data:

\`\`\`python
nama = "Budi"
umur = 17
tinggi = 165.5

print("Nama:", nama)
print("Umur:", umur)
print("Tinggi:", tinggi)
\`\`\`

## Tipe Data Dasar

- String: teks atau karakter
- Integer: bilangan bulat
- Float: bilangan desimal
- Boolean: True atau False`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    user_type: 'student',
    language: 'python',
    title: 'Kondisi dan Perulangan',
    description: 'Belajar if-else dan loop di Python',
    content: `# Kondisi dan Perulangan

## If-Else Statement

\`\`\`python
nilai = 85

if nilai >= 80:
    print("Nilai A")
elif nilai >= 70:
    print("Nilai B")
else:
    print("Nilai C")
\`\`\`

## For Loop

\`\`\`python
for i in range(5):
    print("Angka:", i)
\`\`\`

## While Loop

\`\`\`python
counter = 0
while counter < 5:
    print("Counter:", counter)
    counter += 1
\`\`\``,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '3',
    user_type: 'umum',
    language: 'javascript',
    title: 'JavaScript Fundamentals',
    description: 'Dasar-dasar JavaScript untuk web development',
    content: `# JavaScript Fundamentals

JavaScript adalah bahasa pemrograman untuk membuat website interaktif.

## Variables

\`\`\`javascript
let name = "John";
const age = 25;
var city = "Jakarta";
\`\`\`

## Functions

\`\`\`javascript
function greet(name) {
    return "Hello, " + name;
}

console.log(greet("World"));
\`\`\`

## Arrow Functions

\`\`\`javascript
const add = (a, b) => a + b;
console.log(add(5, 3));
\`\`\``,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '4',
    user_type: 'pro',
    language: 'php',
    title: 'PHP Advanced Concepts',
    description: 'Konsep advanced PHP untuk professional',
    content: `# PHP Advanced Concepts

## OOP (Object-Oriented Programming)

\`\`\`php
<?php
class User {
    private $name;
    private $email;

    public function __construct($name, $email) {
        $this->name = $name;
        $this->email = $email;
    }

    public function getName() {
        return $this->name;
    }
}

$user = new User("John", "john@email.com");
echo $user->getName();
?>
\`\`\`

## Namespace

\`\`\`php
<?php
namespace App\\Models;

class Product {
    // Product implementation
}
?>
\`\`\``,
    level: 'advanced',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '5',
    user_type: 'game',
    language: 'javascript',
    title: 'Game Development Basics',
    description: 'Dasar-dasar membuat game dengan JavaScript',
    content: `# Game Development Basics

## Canvas API

\`\`\`javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Draw rectangle
ctx.fillStyle = 'red';
ctx.fillRect(50, 50, 100, 100);

// Draw circle
ctx.beginPath();
ctx.arc(200, 200, 50, 0, Math.PI * 2);
ctx.fillStyle = 'blue';
ctx.fill();
\`\`\`

## Game Loop

\`\`\`javascript
let x = 0;

function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update
    x += 1;

    // Draw
    ctx.fillRect(x, 100, 50, 50);

    // Loop
    requestAnimationFrame(gameLoop);
}

gameLoop();
\`\`\``,
    level: 'intermediate',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  }
];

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    user_id: '2',
    subscription_type: 'plus',
    period: 'monthly',
    amount: 99000,
    currency: 'IDR',
    status: 'paid',
    start_date: '2025-09-01T00:00:00Z',
    end_date: '2025-10-01T00:00:00Z',
    payment_date: '2025-09-01T00:00:00Z',
    created_at: '2025-09-01T00:00:00Z'
  },
  {
    id: '2',
    user_id: '3',
    subscription_type: 'pro',
    period: 'yearly',
    amount: 1990000,
    currency: 'IDR',
    status: 'paid',
    start_date: '2025-01-01T00:00:00Z',
    end_date: '2026-01-01T00:00:00Z',
    payment_date: '2025-01-01T00:00:00Z',
    created_at: '2025-01-01T00:00:00Z'
  }
];
