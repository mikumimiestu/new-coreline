import type { LearningMaterial } from '../types/learning';

export interface User {
  id: string;
  access_code: string;
  photo_url?: string;
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

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== PHP MATERIALS (10 MODULES) ====================
  {
    id: 'php-01',
    user_type: 'student',
    language: 'php',
    title: 'Pengenalan PHP & Evolusi',
    description: 'Apa itu PHP, sejarah, PHP 8.x features, ekosistem & use cases industri.',
    content: `# 🐘 Pengenalan PHP

## Apa itu PHP?
PHP (PHP: Hypertext Preprocessor) adalah bahasa pemrograman **server-side scripting** yang dirancang khusus untuk **web development**.

PHP berjalan di server, menghasilkan HTML yang dikirim ke browser client. Lebih dari **77% website** di dunia menggunakan PHP, termasuk WordPress, Facebook, dan Wikipedia.

---

## 🕰️ Sejarah PHP
| Tahun | Versi | Milestone |
|:---:|:---:|:---|
| 1994 | Personal Home Page | Rasmus Lerdorf membuat scripts sederhana |
| 1997 | PHP 3.0 | Rewrite oleh Zeev & Andi, nama PHP resmi |
| 2000 | PHP 4.0 | Zend Engine 1.0, session, output buffering |
| 2004 | PHP 5.0 | OOP modern, PDO, MySQLi |
| 2015 | PHP 7.0 | 2x lebih cepat, scalar type hints, null coalescing |
| 2020 | PHP 8.0 | JIT compiler, union types, attributes, named args |
| 2022 | PHP 8.1 | Enums, fibers, readonly properties |
| 2023 | PHP 8.2 | Readonly classes, DNF types |
| 2024 | PHP 8.3 | Typed class constants, json_validate() |
| 2025 | PHP 8.4+ | Property hooks, asymmetric visibility |

---

## 💡 Kenapa PHP Masih Relevan?

### Keunggulan PHP
- **Mudah dipelajari** – sintaks sederhana untuk pemula
- **Ekosistem mature** – ribuan library & framework
- **Hosting murah** – hampir semua shared hosting support PHP
- **CMS dominan** – WordPress, Drupal, Joomla
- **Performance tinggi** – PHP 8 dengan JIT sangat cepat
- **Komunitas besar** – dokumentasi & support melimpah

### PHP 8.x Game Changers
- **JIT Compiler** – performance mendekati compiled languages
- **Union Types** – \`string|int\` untuk type safety
- **Named Arguments** – \`foo(name: "Andi", age: 25)\`
- **Attributes** – native annotations \`#[Route("/api")]\`
- **Match Expression** – switch yang lebih powerful
- **Nullsafe Operator** – \`$user?->address?->city\`
- **Constructor Promotion** – property declaration di constructor

---

## ⚙️ Ekosistem PHP

### Frameworks
- **Laravel** – full-stack, elegant syntax, paling populer
- **Symfony** – enterprise-grade, komponen reusable
- **CodeIgniter** – ringan, mudah dipelajari
- **Slim** – micro-framework untuk API
- **Laminas (Zend)** – enterprise, modular

### CMS & E-Commerce
- **WordPress** – 40%+ website dunia
- **Drupal** – enterprise CMS
- **Magento** – e-commerce platform
- **WooCommerce** – WordPress e-commerce

### Tools
- **Composer** – dependency manager
- **PHPUnit** – testing framework
- **PHPStan/Psalm** – static analysis
- **PHP-CS-Fixer** – code style fixer
- **Xdebug** – debugging & profiling

---

## 💻 Hello PHP

### File pertama: \`index.php\`
\`\`\`php
<?php
// Variabel dan output
$nama = "Mikumiestu";
$tahun = 2025;
$aktif = true;

echo "Halo, $nama!\\n";
echo "Tahun: $tahun\\n";

// String interpolation dengan curly braces
echo "Status: {$aktif}\\n";

// Heredoc untuk multi-line
$pesan = <<<TEXT
Selamat datang di PHP!
Ini adalah heredoc syntax.
TEXT;

echo $pesan;
?>
\`\`\`

### PHP dalam HTML
\`\`\`php
<!DOCTYPE html>
<html>
<head>
    <title>PHP Page</title>
</head>
<body>
    <h1><?php echo "Halo dari PHP!"; ?></h1>
    <p>Tahun: <?= date("Y") ?></p> <!-- Short echo -->
</body>
</html>
\`\`\`

---

## 🔧 Setup Development

### Dengan XAMPP/Laragon
\`\`\`bash
# Download & install XAMPP atau Laragon
# Start Apache & MySQL
# Buat file di htdocs/ atau www/

# Akses via browser
http://localhost/index.php
\`\`\`

### Dengan PHP Built-in Server
\`\`\`bash
# Install PHP
php -v

# Jalankan built-in server
php -S localhost:8000

# Akses
http://localhost:8000
\`\`\`

### Dengan Docker
\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  php:
    image: php:8.3-apache
    ports:
      - "8080:80"
    volumes:
      - ./src:/var/www/html
\`\`\`

---

## 🎯 Outcome Modul
- Memahami apa itu PHP dan posisinya di web development
- Mengetahui sejarah dan evolusi PHP
- Mengenal fitur-fitur PHP 8.x terbaru
- Setup environment development
- Menulis dan menjalankan script PHP pertama
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-02',
    user_type: 'student',
    language: 'php',
    title: 'Tipe Data, Variabel & Operator',
    description: 'Scalar types, compound types, type juggling, operators, type declarations.',
    content: `# Tipe Data & Variabel PHP

## Scalar Types

### String
\`\`\`php
<?php
// Single quotes - literal
$single = 'Hello World';
$name = 'Andi';
$single2 = 'Nama: $name'; // Output: Nama: $name

// Double quotes - interpolation
$double = "Nama: $name"; // Output: Nama: Andi
$double2 = "Nama: {$name}!"; // Dengan curly braces

// String functions
$str = "  Hello PHP  ";
echo strlen($str);          // 14
echo trim($str);            // "Hello PHP"
echo strtoupper($str);      // "  HELLO PHP  "
echo strtolower($str);      // "  hello php  "
echo str_replace("PHP", "World", $str); // "  Hello World  "
echo substr($str, 2, 5);    // "Hello"

// PHP 8: str_contains, str_starts_with, str_ends_with
echo str_contains("Hello World", "World"); // true
echo str_starts_with("Hello", "He");       // true
echo str_ends_with("Hello", "lo");         // true

// Heredoc & Nowdoc
$heredoc = <<<TEXT
Ini heredoc dengan interpolasi: $name
TEXT;

$nowdoc = <<<'TEXT'
Ini nowdoc tanpa interpolasi: $name
TEXT;
\`\`\`

### Integer & Float
\`\`\`php
<?php
// Integer
$int = 42;
$negative = -17;
$hex = 0x1A;      // 26
$octal = 0o52;    // 42 (PHP 8.1+)
$binary = 0b11111111; // 255

// Float
$float = 3.14;
$scientific = 1.2e3;  // 1200

// Number functions
echo abs(-5);         // 5
echo round(3.7);      // 4
echo floor(3.9);      // 3
echo ceil(3.1);       // 4
echo max(1, 5, 3);    // 5
echo min(1, 5, 3);    // 1
echo pow(2, 8);       // 256
echo sqrt(16);        // 4

// Random
echo rand(1, 100);
echo random_int(1, 100);  // Cryptographically secure
\`\`\`

### Boolean & Null
\`\`\`php
<?php
$true = true;
$false = false;
$null = null;

// Falsy values di PHP
// false, 0, 0.0, "", "0", [], null

// Check null
if (is_null($null)) {
    echo "Is null";
}

// Null coalescing (PHP 7+)
$username = $_GET['user'] ?? 'Guest';

// Null coalescing assignment (PHP 7.4+)
$data['key'] ??= 'default';

// Nullsafe operator (PHP 8.0+)
$city = $user?->address?->city;
\`\`\`

---

## Compound Types

### Array
\`\`\`php
<?php
// Indexed array
$fruits = ["apple", "banana", "cherry"];
$fruits[] = "date";  // append

echo $fruits[0];     // "apple"
echo count($fruits); // 4

// Associative array
$user = [
    "name" => "Andi",
    "email" => "andi@mail.com",
    "age" => 25
];

echo $user["name"];  // "Andi"

// Multi-dimensional
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

echo $matrix[1][2];  // 6

// Array functions
$numbers = [3, 1, 4, 1, 5, 9, 2, 6];

sort($numbers);              // [1,1,2,3,4,5,6,9]
rsort($numbers);             // reverse sort
asort($user);                // sort by value, keep keys
ksort($user);                // sort by key

$doubled = array_map(fn($n) => $n * 2, $numbers);
$evens = array_filter($numbers, fn($n) => $n % 2 === 0);
$sum = array_reduce($numbers, fn($acc, $n) => $acc + $n, 0);

in_array(5, $numbers);       // true
array_search(5, $numbers);   // index of 5
array_key_exists("name", $user); // true
array_merge($arr1, $arr2);   // gabung arrays
array_slice($numbers, 2, 3); // ambil slice
array_splice($numbers, 2, 1); // remove & return
\`\`\`

### Object
\`\`\`php
<?php
// stdClass
$obj = new stdClass();
$obj->name = "Andi";
$obj->age = 25;

// Array to object
$arr = ["name" => "Budi", "age" => 30];
$obj = (object) $arr;

// Object to array
$arr = (array) $obj;

// Anonymous class (PHP 7+)
$logger = new class {
    public function log(string $msg): void {
        echo "[LOG] $msg\\n";
    }
};
$logger->log("Hello");
\`\`\`

---

## Type Declarations (PHP 7+)

### Parameter & Return Types
\`\`\`php
<?php
// Strict mode (WAJIB di awal file)
declare(strict_types=1);

function add(int $a, int $b): int {
    return $a + $b;
}

function greet(string $name): string {
    return "Hello, $name!";
}

// Nullable type
function findUser(int $id): ?User {
    return null; // atau User object
}

// Union types (PHP 8.0+)
function process(string|int $value): string|int {
    return $value;
}

// Mixed type (PHP 8.0+)
function anything(mixed $value): mixed {
    return $value;
}

// Never return type (PHP 8.1+)
function redirect(string $url): never {
    header("Location: $url");
    exit;
}

// Intersection types (PHP 8.1+)
function process(Countable&Iterator $value): int {
    return count($value);
}
\`\`\`

### Property Types (PHP 7.4+)
\`\`\`php
<?php
class User {
    public int $id;
    public string $name;
    public ?string $email = null;
    public array $roles = [];
    
    // Readonly (PHP 8.1+)
    public readonly string $createdAt;
    
    public function __construct(int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
        $this->createdAt = date('Y-m-d H:i:s');
    }
}
\`\`\`

---

## Operators

### Arithmetic & Assignment
\`\`\`php
<?php
$a = 10;
$b = 3;

echo $a + $b;   // 13
echo $a - $b;   // 7
echo $a * $b;   // 30
echo $a / $b;   // 3.333...
echo $a % $b;   // 1 (modulo)
echo $a ** $b;  // 1000 (power)

// Assignment
$a += 5;   // $a = $a + 5
$a -= 3;
$a *= 2;
$a /= 4;
$a %= 3;
$a **= 2;

// String concatenation
$str = "Hello" . " " . "World";
$str .= "!";
\`\`\`

### Comparison & Logical
\`\`\`php
<?php
// Comparison
$a == $b;   // Equal (value only)
$a === $b;  // Identical (value + type)
$a != $b;   // Not equal
$a !== $b;  // Not identical
$a <> $b;   // Not equal (alternative)
$a < $b;
$a > $b;
$a <= $b;
$a >= $b;
$a <=> $b;  // Spaceship (-1, 0, 1)

// Logical
$a && $b;   // AND
$a || $b;   // OR
!$a;        // NOT
$a and $b;  // AND (lower precedence)
$a or $b;   // OR (lower precedence)
$a xor $b;  // XOR

// Null coalescing
$value = $nullable ?? 'default';

// Ternary
$status = $active ? 'Active' : 'Inactive';

// Elvis operator
$name = $input ?: 'Anonymous';
\`\`\`

---

## Type Juggling & Casting
\`\`\`php
<?php
// Automatic type juggling
$result = "5" + 3;  // 8 (int)
$concat = "5" . 3;  // "53" (string)

// Explicit casting
$int = (int) "42";
$float = (float) "3.14";
$string = (string) 123;
$bool = (bool) 1;
$array = (array) $object;
$object = (object) $array;

// Type checking
is_int($var);
is_float($var);
is_string($var);
is_bool($var);
is_array($var);
is_object($var);
is_null($var);
is_numeric($var);
is_callable($var);

// Get type
echo gettype($var);
echo get_class($object);
\`\`\`

---

## 🎯 Outcome Modul
- Menguasai semua tipe data PHP
- String manipulation dan interpolation
- Array operations dan functions
- Type declarations strict
- Operators dan type juggling
- PHP 8.x type features (union, intersection, mixed)
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-03',
    user_type: 'student',
    language: 'php',
    title: 'Control Flow & Functions',
    description: 'if/else, switch/match, loops, functions, arrow functions, closures.',
    content: `# Control Flow & Functions

## Conditionals

### if / elseif / else
\`\`\`php
<?php
$score = 85;

if ($score >= 90) {
    $grade = "A";
} elseif ($score >= 80) {
    $grade = "B";
} elseif ($score >= 70) {
    $grade = "C";
} else {
    $grade = "D";
}

// Alternative syntax (untuk template)
<?php if ($logged_in): ?>
    <p>Welcome, <?= $username ?></p>
<?php else: ?>
    <p>Please login</p>
<?php endif; ?>

// Ternary
$status = $active ? "Active" : "Inactive";

// Null coalescing
$name = $_GET['name'] ?? 'Guest';
\`\`\`

### switch
\`\`\`php
<?php
$day = date('l');

switch ($day) {
    case 'Monday':
    case 'Tuesday':
    case 'Wednesday':
    case 'Thursday':
    case 'Friday':
        echo "Weekday";
        break;
    case 'Saturday':
    case 'Sunday':
        echo "Weekend";
        break;
    default:
        echo "Unknown";
}
\`\`\`

### match (PHP 8.0+)
Match adalah switch yang lebih powerful dan strict.
\`\`\`php
<?php
$status = 200;

// match adalah expression (return value)
$message = match($status) {
    200, 201 => "Success",
    400 => "Bad Request",
    404 => "Not Found",
    500 => "Server Error",
    default => "Unknown Status"
};

echo $message;

// match dengan complex expressions
$result = match(true) {
    $score >= 90 => "A",
    $score >= 80 => "B",
    $score >= 70 => "C",
    default => "D"
};

// match throws UnhandledMatchError jika tidak ada match
// (berbeda dengan switch yang fallthrough)
\`\`\`

---

## Loops

### for
\`\`\`php
<?php
for ($i = 0; $i < 10; $i++) {
    echo "$i\\n";
}

// Nested loops
for ($i = 1; $i <= 3; $i++) {
    for ($j = 1; $j <= 3; $j++) {
        echo "$i x $j = " . ($i * $j) . "\\n";
    }
}
\`\`\`

### foreach
\`\`\`php
<?php
$fruits = ["apple", "banana", "cherry"];

// Value only
foreach ($fruits as $fruit) {
    echo "$fruit\\n";
}

// Key-value
foreach ($fruits as $index => $fruit) {
    echo "$index: $fruit\\n";
}

// Associative array
$user = ["name" => "Andi", "age" => 25];
foreach ($user as $key => $value) {
    echo "$key: $value\\n";
}

// Reference (modify original)
foreach ($fruits as &$fruit) {
    $fruit = strtoupper($fruit);
}
unset($fruit); // PENTING: hapus reference setelah loop
\`\`\`

### while & do-while
\`\`\`php
<?php
// while
$i = 0;
while ($i < 5) {
    echo "$i\\n";
    $i++;
}

// do-while (minimal 1x eksekusi)
$i = 0;
do {
    echo "$i\\n";
    $i++;
} while ($i < 5);
\`\`\`

### Loop Control
\`\`\`php
<?php
// break - keluar dari loop
for ($i = 0; $i < 10; $i++) {
    if ($i === 5) break;
    echo "$i ";
}
// Output: 0 1 2 3 4

// continue - skip ke iterasi berikutnya
for ($i = 0; $i < 10; $i++) {
    if ($i % 2 === 0) continue;
    echo "$i ";
}
// Output: 1 3 5 7 9

// break dengan level (nested loops)
for ($i = 0; $i < 3; $i++) {
    for ($j = 0; $j < 3; $j++) {
        if ($j === 1) break 2; // keluar 2 level
    }
}
\`\`\`

---

## Functions

### Basic Functions
\`\`\`php
<?php
// Function declaration
function greet(string $name): string {
    return "Hello, $name!";
}

echo greet("Andi");

// Default parameters
function createUser(string $name, string $role = "user"): array {
    return ["name" => $name, "role" => $role];
}

createUser("Andi");              // role = "user"
createUser("Admin", "admin");    // role = "admin"

// Variadic parameters
function sum(int ...$numbers): int {
    return array_sum($numbers);
}

echo sum(1, 2, 3, 4, 5);  // 15

// Named arguments (PHP 8.0+)
function createPost(
    string $title,
    string $content,
    bool $published = false,
    ?string $author = null
): array {
    return compact('title', 'content', 'published', 'author');
}

createPost(
    title: "Hello World",
    content: "Lorem ipsum",
    author: "Andi"
    // published menggunakan default
);
\`\`\`

### Pass by Reference
\`\`\`php
<?php
// By value (default) - copy
function double(int $n): int {
    $n *= 2;
    return $n;
}

$x = 5;
double($x);
echo $x;  // 5 (tidak berubah)

// By reference (&) - original
function doubleRef(int &$n): void {
    $n *= 2;
}

$x = 5;
doubleRef($x);
echo $x;  // 10 (berubah)
\`\`\`

### Return Types
\`\`\`php
<?php
declare(strict_types=1);

// Single type
function add(int $a, int $b): int {
    return $a + $b;
}

// Nullable
function findById(int $id): ?User {
    return User::find($id);
}

// Union types (PHP 8.0+)
function parse(string $value): int|float {
    return is_numeric($value) && str_contains($value, '.')
        ? (float) $value
        : (int) $value;
}

// void - tidak return apapun
function logMessage(string $msg): void {
    file_put_contents('log.txt', $msg, FILE_APPEND);
}

// never - tidak pernah return (exit/throw)
function redirect(string $url): never {
    header("Location: $url");
    exit;
}

// static return (late static binding)
class Builder {
    public static function create(): static {
        return new static();
    }
}
\`\`\`

---

## Arrow Functions & Closures

### Anonymous Functions (Closures)
\`\`\`php
<?php
// Basic anonymous function
$greet = function(string $name): string {
    return "Hello, $name!";
};

echo $greet("Andi");

// use - capture variables from outer scope
$multiplier = 3;
$multiply = function(int $n) use ($multiplier): int {
    return $n * $multiplier;
};

echo $multiply(5);  // 15

// use by reference
$counter = 0;
$increment = function() use (&$counter): void {
    $counter++;
};

$increment();
$increment();
echo $counter;  // 2

// Closure sebagai callback
$numbers = [1, 2, 3, 4, 5];

$doubled = array_map(function($n) {
    return $n * 2;
}, $numbers);

$evens = array_filter($numbers, function($n) {
    return $n % 2 === 0;
});
\`\`\`

### Arrow Functions (PHP 7.4+)
Arrow functions otomatis capture variables dari outer scope.
\`\`\`php
<?php
// Arrow function syntax
$double = fn(int $n): int => $n * 2;

echo $double(5);  // 10

// Otomatis capture outer scope (implisit use)
$multiplier = 3;
$multiply = fn(int $n): int => $n * $multiplier;

echo $multiply(5);  // 15

// Dengan array functions
$numbers = [1, 2, 3, 4, 5];

$doubled = array_map(fn($n) => $n * 2, $numbers);
$evens = array_filter($numbers, fn($n) => $n % 2 === 0);
$sum = array_reduce($numbers, fn($acc, $n) => $acc + $n, 0);

// Chaining
$result = array_map(
    fn($n) => $n * 2,
    array_filter($numbers, fn($n) => $n % 2 === 0)
);
// [4, 8]

// Sorting dengan arrow function
$users = [
    ["name" => "Budi", "age" => 30],
    ["name" => "Andi", "age" => 25],
];

usort($users, fn($a, $b) => $a["age"] <=> $b["age"]);
\`\`\`

### First-Class Callable Syntax (PHP 8.1+)
\`\`\`php
<?php
class Calculator {
    public function add(int $a, int $b): int {
        return $a + $b;
    }
    
    public static function multiply(int $a, int $b): int {
        return $a * $b;
    }
}

$calc = new Calculator();

// First-class callable syntax
$addFn = $calc->add(...);
$multiplyFn = Calculator::multiply(...);

echo $addFn(2, 3);       // 5
echo $multiplyFn(2, 3);  // 6

// Built-in functions
$strlen = strlen(...);
echo $strlen("Hello");   // 5
\`\`\`

---

## 🎯 Outcome Modul
- Menguasai if/elseif/else dan switch
- Menggunakan match expression (PHP 8)
- Loops: for, foreach, while, do-while
- Functions dengan type declarations
- Closures dan arrow functions
- Named arguments dan variadic parameters
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-04',
    user_type: 'student',
    language: 'php',
    title: 'Object-Oriented Programming Dasar',
    description: 'Classes, objects, properties, methods, constructor, visibility, static.',
    content: `# OOP Dasar PHP

## Classes & Objects

### Basic Class
\`\`\`php
<?php
class User {
    // Properties
    public string $name;
    public string $email;
    private string $password;
    protected int $age;
    
    // Constructor
    public function __construct(string $name, string $email, string $password) {
        $this->name = $name;
        $this->email = $email;
        $this->password = password_hash($password, PASSWORD_DEFAULT);
    }
    
    // Methods
    public function getInfo(): string {
        return "{$this->name} ({$this->email})";
    }
    
    public function verifyPassword(string $password): bool {
        return password_verify($password, $this->password);
    }
    
    // Destructor
    public function __destruct() {
        // Cleanup saat object dihancurkan
    }
}

// Membuat object
$user = new User("Andi", "andi@mail.com", "secret123");
echo $user->name;        // "Andi"
echo $user->getInfo();   // "Andi (andi@mail.com)"
\`\`\`

### Constructor Property Promotion (PHP 8.0+)
Shorthand untuk declare + assign properties.
\`\`\`php
<?php
class Product {
    public function __construct(
        public int $id,
        public string $name,
        public float $price,
        private int $stock = 0,
        public readonly string $sku  // readonly (PHP 8.1+)
    ) {}
    
    public function getStock(): int {
        return $this->stock;
    }
}

$product = new Product(1, "Laptop", 15000000, 10, "LAP-001");
echo $product->name;   // "Laptop"
echo $product->sku;    // "LAP-001"
// $product->sku = "X"; // Error! readonly
\`\`\`

---

## Visibility (Access Modifiers)

\`\`\`php
<?php
class BankAccount {
    public string $accountNumber;      // Accessible everywhere
    protected float $balance = 0;      // Accessible in class & children
    private string $pin;               // Only in this class
    
    public function __construct(
        string $accountNumber,
        string $pin,
        float $initialBalance = 0
    ) {
        $this->accountNumber = $accountNumber;
        $this->pin = $pin;
        $this->balance = $initialBalance;
    }
    
    public function deposit(float $amount): void {
        if ($amount > 0) {
            $this->balance += $amount;
        }
    }
    
    public function getBalance(): float {
        return $this->balance;
    }
    
    public function withdraw(float $amount, string $pin): bool {
        if (!$this->validatePin($pin)) {
            return false;
        }
        if ($amount > $this->balance) {
            return false;
        }
        $this->balance -= $amount;
        return true;
    }
    
    private function validatePin(string $pin): bool {
        return $this->pin === $pin;
    }
}

$account = new BankAccount("1234567890", "1234", 1000);
$account->deposit(500);
echo $account->getBalance();  // 1500
// echo $account->balance;    // Error! protected
// echo $account->pin;        // Error! private
\`\`\`

### Asymmetric Visibility (PHP 8.4+)
\`\`\`php
<?php
class User {
    // Public read, private write
    public private(set) string $name;
    
    // Public read, protected write
    public protected(set) int $age;
    
    public function __construct(string $name, int $age) {
        $this->name = $name;
        $this->age = $age;
    }
    
    public function rename(string $newName): void {
        $this->name = $newName;  // OK, dalam class
    }
}

$user = new User("Andi", 25);
echo $user->name;       // OK, public read
// $user->name = "Budi"; // Error! private set
\`\`\`

---

## Static Members

\`\`\`php
<?php
class Counter {
    private static int $count = 0;
    public static string $version = "1.0.0";
    
    public function __construct() {
        self::$count++;
    }
    
    public static function getCount(): int {
        return self::$count;
    }
    
    public static function reset(): void {
        self::$count = 0;
    }
}

echo Counter::$version;     // "1.0.0"
echo Counter::getCount();   // 0

$a = new Counter();
$b = new Counter();
$c = new Counter();

echo Counter::getCount();   // 3
Counter::reset();
echo Counter::getCount();   // 0
\`\`\`

### Singleton Pattern
\`\`\`php
<?php
class Database {
    private static ?Database $instance = null;
    private PDO $connection;
    
    private function __construct() {
        $this->connection = new PDO(
            "mysql:host=localhost;dbname=test",
            "root",
            ""
        );
    }
    
    // Prevent cloning
    private function __clone() {}
    
    // Prevent unserialization
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
    
    public static function getInstance(): Database {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection(): PDO {
        return $this->connection;
    }
}

$db1 = Database::getInstance();
$db2 = Database::getInstance();
var_dump($db1 === $db2);  // true, same instance
\`\`\`

---

## Constants

\`\`\`php
<?php
class HttpStatus {
    public const OK = 200;
    public const CREATED = 201;
    public const BAD_REQUEST = 400;
    public const NOT_FOUND = 404;
    public const SERVER_ERROR = 500;
    
    // Typed constants (PHP 8.3+)
    public const string VERSION = "1.0";
    public const array METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
    
    // Private constant
    private const SECRET_KEY = "xyz123";
    
    public static function isSuccess(int $code): bool {
        return $code >= 200 && $code < 300;
    }
}

echo HttpStatus::OK;           // 200
echo HttpStatus::VERSION;      // "1.0"
echo HttpStatus::isSuccess(201);  // true
\`\`\`

---

## Getters & Setters

\`\`\`php
<?php
class Temperature {
    private float $celsius;
    
    public function __construct(float $celsius) {
        $this->setCelsius($celsius);
    }
    
    // Getter
    public function getCelsius(): float {
        return $this->celsius;
    }
    
    // Setter dengan validasi
    public function setCelsius(float $value): void {
        if ($value < -273.15) {
            throw new InvalidArgumentException("Below absolute zero!");
        }
        $this->celsius = $value;
    }
    
    // Computed property
    public function getFahrenheit(): float {
        return ($this->celsius * 9/5) + 32;
    }
    
    public function setFahrenheit(float $value): void {
        $this->celsius = ($value - 32) * 5/9;
    }
}

$temp = new Temperature(25);
echo $temp->getCelsius();     // 25
echo $temp->getFahrenheit();  // 77

$temp->setFahrenheit(100);
echo $temp->getCelsius();     // 37.78
\`\`\`

### Property Hooks (PHP 8.4+)
\`\`\`php
<?php
class User {
    public string $name {
        set => trim($value);  // Auto trim on set
    }
    
    public string $email {
        get => strtolower($this->email);  // Always return lowercase
        set => strtolower(trim($value));
    }
    
    // Virtual property (no backing store)
    public string $fullName {
        get => "{$this->firstName} {$this->lastName}";
    }
    
    public function __construct(
        public string $firstName,
        public string $lastName
    ) {}
}

$user = new User("Andi", "Wijaya");
$user->name = "  Budi  ";
echo $user->name;      // "Budi"
echo $user->fullName;  // "Andi Wijaya"
\`\`\`

---

## Magic Methods

\`\`\`php
<?php
class MagicClass {
    private array $data = [];
    
    // Property overloading
    public function __get(string $name): mixed {
        return $this->data[$name] ?? null;
    }
    
    public function __set(string $name, mixed $value): void {
        $this->data[$name] = $value;
    }
    
    public function __isset(string $name): bool {
        return isset($this->data[$name]);
    }
    
    public function __unset(string $name): void {
        unset($this->data[$name]);
    }
    
    // Method overloading
    public function __call(string $name, array $args): mixed {
        echo "Calling '$name' with: " . implode(', ', $args);
        return null;
    }
    
    public static function __callStatic(string $name, array $args): mixed {
        echo "Static call '$name' with: " . implode(', ', $args);
        return null;
    }
    
    // String representation
    public function __toString(): string {
        return json_encode($this->data);
    }
    
    // Serialization
    public function __serialize(): array {
        return $this->data;
    }
    
    public function __unserialize(array $data): void {
        $this->data = $data;
    }
    
    // Invokable
    public function __invoke(mixed ...$args): mixed {
        return array_sum($args);
    }
}

$obj = new MagicClass();
$obj->name = "Andi";      // __set
echo $obj->name;          // __get
echo (string) $obj;       // __toString
echo $obj(1, 2, 3);       // __invoke -> 6
$obj->unknownMethod(1, 2); // __call
\`\`\`

---

## 🎯 Outcome Modul
- Membuat classes dengan properties dan methods
- Constructor property promotion (PHP 8)
- Visibility: public, protected, private
- Asymmetric visibility (PHP 8.4)
- Static members dan constants
- Property hooks (PHP 8.4)
- Magic methods untuk metaprogramming
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-05',
    user_type: 'student',
    language: 'php',
    title: 'OOP Lanjut: Inheritance, Interfaces & Traits',
    description: 'Extends, abstract classes, interfaces, traits, final, composition.',
    content: `# OOP Lanjut PHP

## Inheritance

### Basic Inheritance
\`\`\`php
<?php
class Animal {
    public function __construct(
        protected string $name,
        protected int $age
    ) {}
    
    public function speak(): string {
        return "Some sound";
    }
    
    public function getInfo(): string {
        return "{$this->name}, {$this->age} years old";
    }
}

class Dog extends Animal {
    public function __construct(
        string $name,
        int $age,
        private string $breed
    ) {
        parent::__construct($name, $age);
    }
    
    // Override method
    public function speak(): string {
        return "Woof!";
    }
    
    // New method
    public function fetch(): string {
        return "{$this->name} fetches the ball";
    }
    
    public function getBreed(): string {
        return $this->breed;
    }
}

class Cat extends Animal {
    public function speak(): string {
        return "Meow!";
    }
}

$dog = new Dog("Buddy", 3, "Golden Retriever");
echo $dog->speak();     // "Woof!"
echo $dog->getInfo();   // "Buddy, 3 years old"
echo $dog->fetch();     // "Buddy fetches the ball"

$cat = new Cat("Whiskers", 2);
echo $cat->speak();     // "Meow!"
\`\`\`

### final Keyword
\`\`\`php
<?php
// Final class - cannot be extended
final class Singleton {
    private static ?self $instance = null;
    
    private function __construct() {}
    
    public static function getInstance(): self {
        return self::$instance ??= new self();
    }
}

// class Extended extends Singleton {} // Error!

// Final method - cannot be overridden
class Base {
    final public function important(): string {
        return "Cannot override this";
    }
}

class Child extends Base {
    // public function important(): string {} // Error!
}
\`\`\`

---

## Abstract Classes

\`\`\`php
<?php
abstract class Shape {
    public function __construct(
        protected string $color
    ) {}
    
    // Abstract methods - MUST be implemented
    abstract public function getArea(): float;
    abstract public function getPerimeter(): float;
    
    // Concrete method - CAN be used directly
    public function describe(): string {
        return "A {$this->color} shape with area " . $this->getArea();
    }
}

class Circle extends Shape {
    public function __construct(
        string $color,
        private float $radius
    ) {
        parent::__construct($color);
    }
    
    public function getArea(): float {
        return M_PI * ($this->radius ** 2);
    }
    
    public function getPerimeter(): float {
        return 2 * M_PI * $this->radius;
    }
}

class Rectangle extends Shape {
    public function __construct(
        string $color,
        private float $width,
        private float $height
    ) {
        parent::__construct($color);
    }
    
    public function getArea(): float {
        return $this->width * $this->height;
    }
    
    public function getPerimeter(): float {
        return 2 * ($this->width + $this->height);
    }
}

// $shape = new Shape("red"); // Error! Cannot instantiate abstract

$circle = new Circle("red", 5);
echo $circle->getArea();      // 78.54
echo $circle->describe();     // "A red shape with area 78.54"

$rect = new Rectangle("blue", 4, 6);
echo $rect->getArea();        // 24
echo $rect->getPerimeter();   // 20
\`\`\`

---

## Interfaces

\`\`\`php
<?php
interface Printable {
    public function print(): string;
}

interface Saveable {
    public function save(): bool;
    public function load(int $id): ?self;
}

interface Loggable {
    public function log(string $message): void;
}

// Implement multiple interfaces
class Document implements Printable, Saveable {
    public function __construct(
        private int $id,
        private string $title,
        private string $content
    ) {}
    
    public function print(): string {
        return "Document: {$this->title}\\n{$this->content}";
    }
    
    public function save(): bool {
        // Save to database
        return true;
    }
    
    public function load(int $id): ?self {
        // Load from database
        return new self($id, "Loaded", "Content");
    }
}

// Interface extending interface
interface Exportable extends Printable {
    public function exportToPdf(): string;
    public function exportToHtml(): string;
}

// Type hinting dengan interface
function printDocument(Printable $doc): void {
    echo $doc->print();
}

$doc = new Document(1, "Report", "This is the report content");
printDocument($doc);
\`\`\`

### Interface Constants
\`\`\`php
<?php
interface HttpStatusCodes {
    public const OK = 200;
    public const CREATED = 201;
    public const BAD_REQUEST = 400;
    public const NOT_FOUND = 404;
}

class ApiResponse implements HttpStatusCodes {
    public function __construct(
        private mixed $data,
        private int $status = self::OK
    ) {}
    
    public function getStatus(): int {
        return $this->status;
    }
}
\`\`\`

---

## Traits

Traits memungkinkan code reuse horizontal (tanpa inheritance).

\`\`\`php
<?php
trait Timestampable {
    private ?DateTimeImmutable $createdAt = null;
    private ?DateTimeImmutable $updatedAt = null;
    
    public function setCreatedAt(): void {
        $this->createdAt = new DateTimeImmutable();
    }
    
    public function setUpdatedAt(): void {
        $this->updatedAt = new DateTimeImmutable();
    }
    
    public function getCreatedAt(): ?DateTimeImmutable {
        return $this->createdAt;
    }
    
    public function getUpdatedAt(): ?DateTimeImmutable {
        return $this->updatedAt;
    }
}

trait SoftDeletable {
    private ?DateTimeImmutable $deletedAt = null;
    
    public function softDelete(): void {
        $this->deletedAt = new DateTimeImmutable();
    }
    
    public function restore(): void {
        $this->deletedAt = null;
    }
    
    public function isDeleted(): bool {
        return $this->deletedAt !== null;
    }
}

trait Loggable {
    public function log(string $message): void {
        echo "[" . date('Y-m-d H:i:s') . "] {$message}\\n";
    }
}

// Using multiple traits
class Post {
    use Timestampable, SoftDeletable, Loggable;
    
    public function __construct(
        public int $id,
        public string $title,
        public string $content
    ) {
        $this->setCreatedAt();
    }
    
    public function update(string $title, string $content): void {
        $this->title = $title;
        $this->content = $content;
        $this->setUpdatedAt();
        $this->log("Post {$this->id} updated");
    }
}

$post = new Post(1, "Hello", "World");
$post->update("Hello World", "New content");
$post->softDelete();
echo $post->isDeleted();  // true
\`\`\`

### Trait Conflict Resolution
\`\`\`php
<?php
trait A {
    public function hello(): string {
        return "Hello from A";
    }
    
    public function world(): string {
        return "World from A";
    }
}

trait B {
    public function hello(): string {
        return "Hello from B";
    }
    
    public function world(): string {
        return "World from B";
    }
}

class MyClass {
    use A, B {
        A::hello insteadof B;    // Use A's hello
        B::world insteadof A;    // Use B's world
        A::world as worldFromA;  // Alias A's world
        B::hello as helloFromB;  // Alias B's hello
    }
}

$obj = new MyClass();
echo $obj->hello();       // "Hello from A"
echo $obj->world();       // "World from B"
echo $obj->worldFromA();  // "World from A"
echo $obj->helloFromB();  // "Hello from B"
\`\`\`

---

## Enums (PHP 8.1+)

\`\`\`php
<?php
// Pure enum (no values)
enum Status {
    case Pending;
    case Active;
    case Inactive;
    case Deleted;
    
    public function label(): string {
        return match($this) {
            self::Pending => "Menunggu",
            self::Active => "Aktif",
            self::Inactive => "Tidak Aktif",
            self::Deleted => "Dihapus",
        };
    }
    
    public function color(): string {
        return match($this) {
            self::Pending => "yellow",
            self::Active => "green",
            self::Inactive => "gray",
            self::Deleted => "red",
        };
    }
}

$status = Status::Active;
echo $status->name;    // "Active"
echo $status->label(); // "Aktif"

// Backed enum (with values)
enum UserRole: string {
    case Admin = 'admin';
    case Editor = 'editor';
    case Author = 'author';
    case Subscriber = 'subscriber';
    
    public function permissions(): array {
        return match($this) {
            self::Admin => ['create', 'read', 'update', 'delete', 'manage'],
            self::Editor => ['create', 'read', 'update', 'delete'],
            self::Author => ['create', 'read', 'update'],
            self::Subscriber => ['read'],
        };
    }
}

$role = UserRole::Admin;
echo $role->value;  // "admin"

// From value
$role = UserRole::from('editor');      // UserRole::Editor
$role = UserRole::tryFrom('invalid');  // null

// Get all cases
$roles = UserRole::cases();

// Integer backed enum
enum HttpMethod: int {
    case GET = 1;
    case POST = 2;
    case PUT = 3;
    case DELETE = 4;
}

// Enum implementing interface
interface HasPermissions {
    public function permissions(): array;
}

enum Role: string implements HasPermissions {
    case Admin = 'admin';
    case User = 'user';
    
    public function permissions(): array {
        return match($this) {
            self::Admin => ['all'],
            self::User => ['read'],
        };
    }
}
\`\`\`

---

## Composition over Inheritance

\`\`\`php
<?php
// Bad: Deep inheritance
// class AdminUser extends User extends Person extends Entity {}

// Good: Composition
interface NotifierInterface {
    public function notify(string $message): void;
}

class EmailNotifier implements NotifierInterface {
    public function notify(string $message): void {
        echo "Email: $message\\n";
    }
}

class SmsNotifier implements NotifierInterface {
    public function notify(string $message): void {
        echo "SMS: $message\\n";
    }
}

class OrderService {
    public function __construct(
        private NotifierInterface $notifier
    ) {}
    
    public function complete(int $orderId): void {
        // Process order...
        $this->notifier->notify("Order #$orderId completed!");
    }
}

// Dependency Injection
$emailService = new OrderService(new EmailNotifier());
$smsService = new OrderService(new SmsNotifier());

$emailService->complete(123);  // "Email: Order #123 completed!"
$smsService->complete(456);    // "SMS: Order #456 completed!"
\`\`\`

---

## 🎯 Outcome Modul
- Inheritance dengan parent:: dan method overriding
- Abstract classes untuk base types
- Interfaces untuk kontrak
- Traits untuk code reuse horizontal
- Enums untuk type-safe constants
- Composition over inheritance
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-06',
    user_type: 'student',
    language: 'php',
    title: 'Error Handling & Exceptions',
    description: 'try/catch/finally, custom exceptions, error handling, logging.',
    content: `# Error Handling & Exceptions

## Basic Exception Handling

### try/catch/finally
\`\`\`php
<?php
function divide(float $a, float $b): float {
    if ($b === 0.0) {
        throw new InvalidArgumentException("Cannot divide by zero");
    }
    return $a / $b;
}

try {
    $result = divide(10, 0);
    echo "Result: $result";
} catch (InvalidArgumentException $e) {
    echo "Error: " . $e->getMessage();
} finally {
    echo "\\nOperation completed";
}

// Multiple catch blocks
try {
    // risky operation
} catch (InvalidArgumentException $e) {
    echo "Invalid argument: " . $e->getMessage();
} catch (RuntimeException $e) {
    echo "Runtime error: " . $e->getMessage();
} catch (Exception $e) {
    echo "General error: " . $e->getMessage();
} catch (Throwable $t) {
    // Catches both Exception and Error
    echo "Something went wrong: " . $t->getMessage();
}

// Multiple exception types (PHP 7.1+)
try {
    // risky operation
} catch (InvalidArgumentException | RuntimeException $e) {
    echo "Error: " . $e->getMessage();
}

// Non-capturing catch (PHP 8.0+)
try {
    throw new Exception("Error");
} catch (Exception) {
    echo "An error occurred";  // tidak perlu $e jika tidak dipakai
}
\`\`\`

### Exception Properties
\`\`\`php
<?php
try {
    throw new Exception("Something went wrong", 500);
} catch (Exception $e) {
    echo $e->getMessage();    // "Something went wrong"
    echo $e->getCode();       // 500
    echo $e->getFile();       // "/path/to/file.php"
    echo $e->getLine();       // line number
    echo $e->getTraceAsString();  // stack trace
}
\`\`\`

---

## Custom Exceptions

\`\`\`php
<?php
// Base exception untuk aplikasi
class AppException extends Exception {
    protected array $context = [];
    
    public function __construct(
        string $message,
        int $code = 0,
        array $context = [],
        ?Throwable $previous = null
    ) {
        parent::__construct($message, $code, $previous);
        $this->context = $context;
    }
    
    public function getContext(): array {
        return $this->context;
    }
}

// Specific exceptions
class ValidationException extends AppException {
    public function __construct(
        string $message,
        private array $errors = [],
        int $code = 422
    ) {
        parent::__construct($message, $code, ['errors' => $errors]);
    }
    
    public function getErrors(): array {
        return $this->errors;
    }
}

class NotFoundException extends AppException {
    public function __construct(
        string $resource,
        string|int $id
    ) {
        parent::__construct(
            "$resource with ID '$id' not found",
            404,
            ['resource' => $resource, 'id' => $id]
        );
    }
}

class AuthenticationException extends AppException {
    public function __construct(string $message = "Unauthenticated") {
        parent::__construct($message, 401);
    }
}

class AuthorizationException extends AppException {
    public function __construct(string $message = "Forbidden") {
        parent::__construct($message, 403);
    }
}

// Usage
function findUser(int $id): array {
    $user = null; // simulate not found
    
    if ($user === null) {
        throw new NotFoundException("User", $id);
    }
    
    return $user;
}

function validateUser(array $data): void {
    $errors = [];
    
    if (empty($data['name'])) {
        $errors['name'] = 'Name is required';
    }
    
    if (empty($data['email'])) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }
    
    if (!empty($errors)) {
        throw new ValidationException("Validation failed", $errors);
    }
}

// Handling
try {
    validateUser(['name' => '', 'email' => 'invalid']);
} catch (ValidationException $e) {
    echo "Status: " . $e->getCode() . "\\n";
    echo "Message: " . $e->getMessage() . "\\n";
    print_r($e->getErrors());
}
\`\`\`

---

## Error Handling

### Error Types
\`\`\`php
<?php
// PHP Error Levels
E_ERROR;           // Fatal error
E_WARNING;         // Non-fatal warning
E_NOTICE;          // Notice (minor issues)
E_DEPRECATED;      // Deprecated feature usage
E_STRICT;          // Strict standards
E_ALL;             // All errors

// Configure error reporting
error_reporting(E_ALL);
ini_set('display_errors', '1');    // Development
ini_set('display_errors', '0');    // Production
ini_set('log_errors', '1');
ini_set('error_log', '/var/log/php_errors.log');
\`\`\`

### Custom Error Handler
\`\`\`php
<?php
function customErrorHandler(
    int $errno,
    string $errstr,
    string $errfile,
    int $errline
): bool {
    // Convert errors to exceptions
    throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
}

set_error_handler('customErrorHandler');

// Now errors become exceptions
try {
    $result = 10 / 0;  // Warning -> Exception
} catch (ErrorException $e) {
    echo "Caught: " . $e->getMessage();
}
\`\`\`

### Exception Handler
\`\`\`php
<?php
function globalExceptionHandler(Throwable $e): void {
    // Log error
    error_log(sprintf(
        "[%s] %s in %s:%d\\n%s",
        get_class($e),
        $e->getMessage(),
        $e->getFile(),
        $e->getLine(),
        $e->getTraceAsString()
    ));
    
    // Display user-friendly message
    if (getenv('APP_ENV') === 'production') {
        http_response_code(500);
        echo "An unexpected error occurred. Please try again later.";
    } else {
        // Development - show details
        echo "<h1>Exception: " . get_class($e) . "</h1>";
        echo "<p>{$e->getMessage()}</p>";
        echo "<pre>{$e->getTraceAsString()}</pre>";
    }
}

set_exception_handler('globalExceptionHandler');
\`\`\`

---

## Logging

### PSR-3 Logger Interface
\`\`\`php
<?php
interface LoggerInterface {
    public function emergency(string $message, array $context = []): void;
    public function alert(string $message, array $context = []): void;
    public function critical(string $message, array $context = []): void;
    public function error(string $message, array $context = []): void;
    public function warning(string $message, array $context = []): void;
    public function notice(string $message, array $context = []): void;
    public function info(string $message, array $context = []): void;
    public function debug(string $message, array $context = []): void;
    public function log(string $level, string $message, array $context = []): void;
}
\`\`\`

### Simple File Logger
\`\`\`php
<?php
class FileLogger implements LoggerInterface {
    private const LEVELS = [
        'emergency', 'alert', 'critical', 'error',
        'warning', 'notice', 'info', 'debug'
    ];
    
    public function __construct(
        private string $logFile,
        private string $minLevel = 'debug'
    ) {}
    
    public function log(string $level, string $message, array $context = []): void {
        if (!$this->shouldLog($level)) {
            return;
        }
        
        $timestamp = date('Y-m-d H:i:s');
        $interpolated = $this->interpolate($message, $context);
        $contextJson = !empty($context) ? ' ' . json_encode($context) : '';
        
        $line = "[$timestamp] [$level] $interpolated$contextJson\\n";
        
        file_put_contents($this->logFile, $line, FILE_APPEND | LOCK_EX);
    }
    
    private function shouldLog(string $level): bool {
        return array_search($level, self::LEVELS) 
            <= array_search($this->minLevel, self::LEVELS);
    }
    
    private function interpolate(string $message, array $context): string {
        $replace = [];
        foreach ($context as $key => $val) {
            if (is_string($val) || is_numeric($val)) {
                $replace['{' . $key . '}'] = $val;
            }
        }
        return strtr($message, $replace);
    }
    
    // Implement all level methods
    public function emergency(string $message, array $context = []): void {
        $this->log('emergency', $message, $context);
    }
    
    public function error(string $message, array $context = []): void {
        $this->log('error', $message, $context);
    }
    
    public function info(string $message, array $context = []): void {
        $this->log('info', $message, $context);
    }
    
    public function debug(string $message, array $context = []): void {
        $this->log('debug', $message, $context);
    }
    
    // ... implement other levels
}

// Usage
$logger = new FileLogger(__DIR__ . '/app.log', 'info');

$logger->info('User {user} logged in from {ip}', [
    'user' => 'andi@mail.com',
    'ip' => '192.168.1.1'
]);

$logger->error('Database connection failed', [
    'host' => 'localhost',
    'error' => 'Connection refused'
]);
\`\`\`

### Using Monolog (Industry Standard)
\`\`\`bash
composer require monolog/monolog
\`\`\`

\`\`\`php
<?php
use Monolog\\Logger;
use Monolog\\Handler\\StreamHandler;
use Monolog\\Handler\\RotatingFileHandler;
use Monolog\\Formatter\\JsonFormatter;

$logger = new Logger('app');

// File handler dengan rotation
$logger->pushHandler(
    new RotatingFileHandler(__DIR__ . '/logs/app.log', 30, Logger::DEBUG)
);

// JSON format untuk production
$streamHandler = new StreamHandler('php://stdout', Logger::INFO);
$streamHandler->setFormatter(new JsonFormatter());
$logger->pushHandler($streamHandler);

// Usage
$logger->info('Application started');
$logger->error('Something went wrong', ['exception' => $e->getMessage()]);
\`\`\`

---

## 🎯 Outcome Modul
- try/catch/finally exception handling
- Membuat custom exception classes
- Error handling dan conversion ke exceptions
- Global exception handler
- Logging dengan PSR-3 interface
- Menggunakan Monolog
`,
    level: 'intermediate',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-07',
    user_type: 'student',
    language: 'php',
    title: 'Database: PDO & Query Builder',
    description: 'PDO connection, prepared statements, transactions, query builder pattern.',
    content: `# Database dengan PDO

## PDO Connection

### Basic Connection
\`\`\`php
<?php
// MySQL
$dsn = "mysql:host=localhost;dbname=myapp;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, 'username', 'password', $options);
} catch (PDOException $e) {
    throw new Exception("Database connection failed: " . $e->getMessage());
}

// PostgreSQL
$dsn = "pgsql:host=localhost;dbname=myapp";

// SQLite
$dsn = "sqlite:" . __DIR__ . "/database.sqlite";
\`\`\`

### Database Class (Singleton)
\`\`\`php
<?php
class Database {
    private static ?PDO $instance = null;
    
    public static function getInstance(): PDO {
        if (self::$instance === null) {
            $config = require __DIR__ . '/config/database.php';
            
            $dsn = sprintf(
                "%s:host=%s;dbname=%s;charset=%s",
                $config['driver'],
                $config['host'],
                $config['database'],
                $config['charset'] ?? 'utf8mb4'
            );
            
            self::$instance = new PDO(
                $dsn,
                $config['username'],
                $config['password'],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        }
        
        return self::$instance;
    }
    
    private function __construct() {}
    private function __clone() {}
}

// Usage
$db = Database::getInstance();
\`\`\`

---

## CRUD Operations

### Prepared Statements (WAJIB untuk keamanan!)
\`\`\`php
<?php
$pdo = Database::getInstance();

// CREATE - Insert
$sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    'name' => 'Andi',
    'email' => 'andi@mail.com',
    'password' => password_hash('secret123', PASSWORD_DEFAULT)
]);
$userId = $pdo->lastInsertId();

// READ - Select one
$sql = "SELECT * FROM users WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute(['id' => 1]);
$user = $stmt->fetch();  // array atau false

// READ - Select many
$sql = "SELECT * FROM users WHERE status = :status ORDER BY created_at DESC";
$stmt = $pdo->prepare($sql);
$stmt->execute(['status' => 'active']);
$users = $stmt->fetchAll();  // array of arrays

// UPDATE
$sql = "UPDATE users SET name = :name, updated_at = NOW() WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute(['name' => 'Budi', 'id' => 1]);
$affected = $stmt->rowCount();

// DELETE
$sql = "DELETE FROM users WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute(['id' => 1]);
$deleted = $stmt->rowCount();
\`\`\`

### Fetch Modes
\`\`\`php
<?php
$stmt = $pdo->prepare("SELECT * FROM users");
$stmt->execute();

// Associative array (default yang kita set)
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
// [['id' => 1, 'name' => 'Andi'], ...]

// Object (stdClass)
$users = $stmt->fetchAll(PDO::FETCH_OBJ);
// [$obj->id, $obj->name, ...]

// Custom class
$users = $stmt->fetchAll(PDO::FETCH_CLASS, User::class);
// [User object, User object, ...]

// Column
$names = $stmt->fetchAll(PDO::FETCH_COLUMN, 1);
// ['Andi', 'Budi', ...]

// Key-value pairs
$stmt = $pdo->query("SELECT id, name FROM users");
$users = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
// [1 => 'Andi', 2 => 'Budi', ...]

// Group by column
$stmt = $pdo->query("SELECT status, id, name FROM users");
$grouped = $stmt->fetchAll(PDO::FETCH_GROUP);
// ['active' => [['id' => 1, 'name' => 'Andi']], 'inactive' => [...]]
\`\`\`

---

## Transactions

\`\`\`php
<?php
$pdo = Database::getInstance();

try {
    $pdo->beginTransaction();
    
    // Deduct from sender
    $stmt = $pdo->prepare(
        "UPDATE accounts SET balance = balance - :amount WHERE id = :id AND balance >= :amount"
    );
    $stmt->execute(['amount' => 100, 'id' => 1]);
    
    if ($stmt->rowCount() === 0) {
        throw new Exception("Insufficient balance");
    }
    
    // Add to receiver
    $stmt = $pdo->prepare(
        "UPDATE accounts SET balance = balance + :amount WHERE id = :id"
    );
    $stmt->execute(['amount' => 100, 'id' => 2]);
    
    // Log transaction
    $stmt = $pdo->prepare(
        "INSERT INTO transactions (from_id, to_id, amount) VALUES (:from, :to, :amount)"
    );
    $stmt->execute(['from' => 1, 'to' => 2, 'amount' => 100]);
    
    $pdo->commit();
    echo "Transfer successful";
    
} catch (Exception $e) {
    $pdo->rollBack();
    echo "Transfer failed: " . $e->getMessage();
}
\`\`\`

---

## Simple Query Builder

\`\`\`php
<?php
class QueryBuilder {
    private PDO $pdo;
    private string $table;
    private array $columns = ['*'];
    private array $wheres = [];
    private array $bindings = [];
    private ?string $orderBy = null;
    private ?int $limit = null;
    private ?int $offset = null;
    
    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }
    
    public function table(string $table): self {
        $this->table = $table;
        return $this;
    }
    
    public function select(array $columns): self {
        $this->columns = $columns;
        return $this;
    }
    
    public function where(string $column, string $operator, mixed $value): self {
        $placeholder = ':where_' . count($this->wheres);
        $this->wheres[] = "$column $operator $placeholder";
        $this->bindings[$placeholder] = $value;
        return $this;
    }
    
    public function orderBy(string $column, string $direction = 'ASC'): self {
        $this->orderBy = "$column $direction";
        return $this;
    }
    
    public function limit(int $limit): self {
        $this->limit = $limit;
        return $this;
    }
    
    public function offset(int $offset): self {
        $this->offset = $offset;
        return $this;
    }
    
    public function get(): array {
        $sql = $this->buildSelectQuery();
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($this->bindings);
        return $stmt->fetchAll();
    }
    
    public function first(): ?array {
        $this->limit(1);
        $results = $this->get();
        return $results[0] ?? null;
    }
    
    public function insert(array $data): int {
        $columns = implode(', ', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));
        
        $sql = "INSERT INTO {$this->table} ($columns) VALUES ($placeholders)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($data);
        
        return (int) $this->pdo->lastInsertId();
    }
    
    public function update(array $data): int {
        $sets = [];
        foreach ($data as $column => $value) {
            $sets[] = "$column = :set_$column";
            $this->bindings[":set_$column"] = $value;
        }
        
        $sql = "UPDATE {$this->table} SET " . implode(', ', $sets);
        
        if (!empty($this->wheres)) {
            $sql .= " WHERE " . implode(' AND ', $this->wheres);
        }
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($this->bindings);
        
        return $stmt->rowCount();
    }
    
    public function delete(): int {
        $sql = "DELETE FROM {$this->table}";
        
        if (!empty($this->wheres)) {
            $sql .= " WHERE " . implode(' AND ', $this->wheres);
        }
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($this->bindings);
        
        return $stmt->rowCount();
    }
    
    private function buildSelectQuery(): string {
        $columns = implode(', ', $this->columns);
        $sql = "SELECT $columns FROM {$this->table}";
        
        if (!empty($this->wheres)) {
            $sql .= " WHERE " . implode(' AND ', $this->wheres);
        }
        
        if ($this->orderBy) {
            $sql .= " ORDER BY {$this->orderBy}";
        }
        
        if ($this->limit) {
            $sql .= " LIMIT {$this->limit}";
        }
        
        if ($this->offset) {
            $sql .= " OFFSET {$this->offset}";
        }
        
        return $sql;
    }
    
    // Reset untuk query baru
    public function newQuery(): self {
        return new self($this->pdo);
    }
}

// Usage
$db = new QueryBuilder(Database::getInstance());

// Select
$users = $db->table('users')
    ->select(['id', 'name', 'email'])
    ->where('status', '=', 'active')
    ->orderBy('created_at', 'DESC')
    ->limit(10)
    ->get();

// Insert
$id = $db->newQuery()
    ->table('users')
    ->insert([
        'name' => 'Andi',
        'email' => 'andi@mail.com',
        'password' => password_hash('secret', PASSWORD_DEFAULT)
    ]);

// Update
$affected = $db->newQuery()
    ->table('users')
    ->where('id', '=', 1)
    ->update(['name' => 'Budi']);

// Delete
$deleted = $db->newQuery()
    ->table('users')
    ->where('id', '=', 1)
    ->delete();
\`\`\`

---

## 🎯 Outcome Modul
- PDO connection dengan proper options
- CRUD dengan prepared statements (SQL injection safe)
- Fetch modes untuk berbagai use case
- Transactions untuk operasi atomic
- Simple query builder pattern
`,
    level: 'intermediate',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-08',
    user_type: 'student',
    language: 'php',
    title: 'Web Development: Forms, Sessions & Security',
    description: 'HTTP methods, superglobals, sessions, cookies, CSRF, XSS prevention.',
    content: `# Web Development & Security

## HTTP & Superglobals

### Request Data
\`\`\`php
<?php
// GET parameters (?name=Andi&age=25)
$name = $_GET['name'] ?? '';
$age = $_GET['age'] ?? 0;

// POST data
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Both (GET + POST)
$value = $_REQUEST['key'] ?? '';

// Server info
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];
$host = $_SERVER['HTTP_HOST'];
$userAgent = $_SERVER['HTTP_USER_AGENT'];
$clientIp = $_SERVER['REMOTE_ADDR'];

// Headers
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

// JSON body (API)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Files
$file = $_FILES['upload'] ?? null;
if ($file && $file['error'] === UPLOAD_ERR_OK) {
    $tmpName = $file['tmp_name'];
    $fileName = $file['name'];
    $fileSize = $file['size'];
    $fileType = $file['type'];
}
\`\`\`

---

## Form Handling

### HTML Form
\`\`\`html
<form method="POST" action="/register" enctype="multipart/form-data">
    <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
    
    <label>Name:</label>
    <input type="text" name="name" value="<?= htmlspecialchars($old['name'] ?? '') ?>">
    <?php if (isset($errors['name'])): ?>
        <span class="error"><?= $errors['name'] ?></span>
    <?php endif; ?>
    
    <label>Email:</label>
    <input type="email" name="email" value="<?= htmlspecialchars($old['email'] ?? '') ?>">
    
    <label>Password:</label>
    <input type="password" name="password">
    
    <label>Avatar:</label>
    <input type="file" name="avatar" accept="image/*">
    
    <button type="submit">Register</button>
</form>
\`\`\`

### Form Validation
\`\`\`php
<?php
class Validator {
    private array $errors = [];
    private array $data;
    
    public function __construct(array $data) {
        $this->data = $data;
    }
    
    public function required(string $field, string $message = null): self {
        if (empty($this->data[$field])) {
            $this->errors[$field] = $message ?? "$field is required";
        }
        return $this;
    }
    
    public function email(string $field, string $message = null): self {
        if (!empty($this->data[$field]) && !filter_var($this->data[$field], FILTER_VALIDATE_EMAIL)) {
            $this->errors[$field] = $message ?? "Invalid email format";
        }
        return $this;
    }
    
    public function min(string $field, int $length, string $message = null): self {
        if (!empty($this->data[$field]) && strlen($this->data[$field]) < $length) {
            $this->errors[$field] = $message ?? "$field must be at least $length characters";
        }
        return $this;
    }
    
    public function max(string $field, int $length, string $message = null): self {
        if (!empty($this->data[$field]) && strlen($this->data[$field]) > $length) {
            $this->errors[$field] = $message ?? "$field must not exceed $length characters";
        }
        return $this;
    }
    
    public function match(string $field1, string $field2, string $message = null): self {
        if (($this->data[$field1] ?? '') !== ($this->data[$field2] ?? '')) {
            $this->errors[$field2] = $message ?? "$field2 must match $field1";
        }
        return $this;
    }
    
    public function fails(): bool {
        return !empty($this->errors);
    }
    
    public function passes(): bool {
        return empty($this->errors);
    }
    
    public function errors(): array {
        return $this->errors;
    }
}

// Usage
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $validator = new Validator($_POST);
    $validator
        ->required('name')
        ->min('name', 2)
        ->max('name', 100)
        ->required('email')
        ->email('email')
        ->required('password')
        ->min('password', 8)
        ->match('password', 'password_confirmation');
    
    if ($validator->fails()) {
        $errors = $validator->errors();
        $old = $_POST;
        // Tampilkan form kembali dengan errors
    } else {
        // Process data
    }
}
\`\`\`

---

## Sessions

### Basic Session
\`\`\`php
<?php
// Konfigurasi (sebelum session_start)
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);  // HTTPS only
ini_set('session.cookie_samesite', 'Lax');
ini_set('session.use_strict_mode', 1);

session_start();

// Set session
$_SESSION['user_id'] = 123;
$_SESSION['user_name'] = 'Andi';
$_SESSION['logged_in'] = true;

// Get session
$userId = $_SESSION['user_id'] ?? null;

// Check
if (isset($_SESSION['logged_in'])) {
    echo "Welcome, " . $_SESSION['user_name'];
}

// Remove specific key
unset($_SESSION['temp_data']);

// Destroy session (logout)
session_unset();
session_destroy();

// Regenerate ID (after login, privilege change)
session_regenerate_id(true);
\`\`\`

### Session Flash Messages
\`\`\`php
<?php
class Flash {
    public static function set(string $type, string $message): void {
        $_SESSION['flash'][$type][] = $message;
    }
    
    public static function get(string $type): array {
        $messages = $_SESSION['flash'][$type] ?? [];
        unset($_SESSION['flash'][$type]);
        return $messages;
    }
    
    public static function has(string $type): bool {
        return !empty($_SESSION['flash'][$type]);
    }
    
    public static function success(string $message): void {
        self::set('success', $message);
    }
    
    public static function error(string $message): void {
        self::set('error', $message);
    }
}

// Set flash
Flash::success("Registration successful!");
Flash::error("Invalid credentials");

// Display flash (in view)
<?php foreach (Flash::get('success') as $message): ?>
    <div class="alert alert-success"><?= htmlspecialchars($message) ?></div>
<?php endforeach; ?>
\`\`\`

---

## Cookies

\`\`\`php
<?php
// Set cookie
setcookie(
    name: 'remember_token',
    value: $token,
    expires_or_options: [
        'expires' => time() + (86400 * 30),  // 30 days
        'path' => '/',
        'domain' => '',
        'secure' => true,      // HTTPS only
        'httponly' => true,    // No JavaScript access
        'samesite' => 'Lax'    // CSRF protection
    ]
);

// Get cookie
$token = $_COOKIE['remember_token'] ?? null;

// Delete cookie
setcookie('remember_token', '', time() - 3600, '/');
\`\`\`

---

## Security Best Practices

### XSS Prevention
\`\`\`php
<?php
// SELALU escape output!
$userInput = '<script>alert("XSS")</script>';

// HTML context
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');
// Output: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;

// Helper function
function e(string $value): string {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

// Usage in template
<p>Name: <?= e($user['name']) ?></p>

// URL context
$url = "https://example.com/search?q=" . urlencode($query);

// JavaScript context (avoid if possible)
<script>
    var data = <?= json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) ?>;
</script>
\`\`\`

### CSRF Protection
\`\`\`php
<?php
class CSRF {
    public static function generateToken(): string {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }
    
    public static function validateToken(?string $token): bool {
        if (empty($token) || empty($_SESSION['csrf_token'])) {
            return false;
        }
        return hash_equals($_SESSION['csrf_token'], $token);
    }
    
    public static function field(): string {
        return '<input type="hidden" name="csrf_token" value="' . self::generateToken() . '">';
    }
}

// In form
<form method="POST">
    <?= CSRF::field() ?>
    <!-- form fields -->
</form>

// Validation
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!CSRF::validateToken($_POST['csrf_token'] ?? null)) {
        http_response_code(403);
        die('Invalid CSRF token');
    }
    
    // Process form...
}
\`\`\`

### SQL Injection Prevention
\`\`\`php
<?php
// ❌ NEVER do this
$sql = "SELECT * FROM users WHERE email = '$email'";

// ✅ ALWAYS use prepared statements
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->execute(['email' => $email]);
\`\`\`

### Password Hashing
\`\`\`php
<?php
// Hash password
$password = 'user_password';
$hash = password_hash($password, PASSWORD_DEFAULT);

// Verify password
if (password_verify($password, $hash)) {
    echo "Password correct";
}

// Check if rehash needed (algorithm updated)
if (password_needs_rehash($hash, PASSWORD_DEFAULT)) {
    $newHash = password_hash($password, PASSWORD_DEFAULT);
    // Update in database
}
\`\`\`

### Input Sanitization
\`\`\`php
<?php
// Filter input
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$age = filter_input(INPUT_POST, 'age', FILTER_VALIDATE_INT);
$url = filter_input(INPUT_POST, 'url', FILTER_VALIDATE_URL);

// Filter with options
$options = [
    'options' => ['min_range' => 1, 'max_range' => 100]
];
$age = filter_input(INPUT_POST, 'age', FILTER_VALIDATE_INT, $options);

// Sanitize array
$data = filter_var_array($_POST, [
    'name' => FILTER_SANITIZE_STRING,
    'email' => FILTER_SANITIZE_EMAIL,
    'age' => FILTER_VALIDATE_INT,
]);
\`\`\`

---

## File Upload Security

\`\`\`php
<?php
function handleUpload(array $file, array $allowedTypes, int $maxSize): string {
    // Check for errors
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception("Upload failed with error code: " . $file['error']);
    }
    
    // Validate size
    if ($file['size'] > $maxSize) {
        throw new Exception("File too large. Maximum size: " . ($maxSize / 1024 / 1024) . "MB");
    }
    
    // Validate MIME type (don't trust $file['type'])
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $finfo->file($file['tmp_name']);
    
    if (!in_array($mimeType, $allowedTypes)) {
        throw new Exception("Invalid file type: $mimeType");
    }
    
    // Generate safe filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $safeExtension = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $extension));
    $newFilename = bin2hex(random_bytes(16)) . '.' . $safeExtension;
    
    // Move to upload directory (OUTSIDE webroot if possible)
    $uploadDir = __DIR__ . '/../storage/uploads/';
    $destination = $uploadDir . $newFilename;
    
    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        throw new Exception("Failed to move uploaded file");
    }
    
    return $newFilename;
}

// Usage
try {
    $filename = handleUpload(
        $_FILES['avatar'],
        ['image/jpeg', 'image/png', 'image/gif'],
        5 * 1024 * 1024  // 5MB
    );
    echo "Uploaded: $filename";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
\`\`\`

---

## 🎯 Outcome Modul
- HTTP methods dan superglobals
- Form handling dan validation
- Sessions dengan security best practices
- CSRF protection
- XSS prevention dengan output escaping
- SQL injection prevention
- Secure file uploads
`,
    level: 'intermediate',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-09',
    user_type: 'student',
    language: 'php',
    title: 'Composer, Autoloading & PSR Standards',
    description: 'Composer basics, PSR-4 autoloading, namespaces, dependency management.',
    content: `# Composer & Standards

## Composer Basics

### Installation & Setup
\`\`\`bash
# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Verify
composer --version

# Initialize project
composer init

# atau langsung buat composer.json
\`\`\`

### composer.json
\`\`\`json
{
    "name": "vendor/my-project",
    "description": "My PHP Project",
    "type": "project",
    "license": "MIT",
    "authors": [
        {
            "name": "Andi",
            "email": "andi@email.com"
        }
    ],
    "minimum-stability": "stable",
    "require": {
        "php": "^8.2",
        "monolog/monolog": "^3.0",
        "vlucas/phpdotenv": "^5.5"
    },
    "require-dev": {
        "phpunit/phpunit": "^10.0",
        "phpstan/phpstan": "^1.10",
        "friendsofphp/php-cs-fixer": "^3.0"
    },
    "autoload": {
        "psr-4": {
            "App\\\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Tests\\\\": "tests/"
        }
    },
    "scripts": {
        "test": "phpunit",
        "analyse": "phpstan analyse src",
        "format": "php-cs-fixer fix src"
    }
}
\`\`\`

### Composer Commands
\`\`\`bash
# Install dependencies
composer install

# Add package
composer require monolog/monolog
composer require --dev phpunit/phpunit

# Remove package
composer remove monolog/monolog

# Update packages
composer update
composer update monolog/monolog  # specific package

# Autoload refresh (setelah ubah autoload di composer.json)
composer dump-autoload

# Show installed packages
composer show

# Check outdated
composer outdated

# Security audit
composer audit
\`\`\`

---

## PSR-4 Autoloading

### Directory Structure
\`\`\`
my-project/
├── composer.json
├── src/
│   ├── Controllers/
│   │   └── UserController.php
│   ├── Models/
│   │   └── User.php
│   ├── Services/
│   │   └── AuthService.php
│   └── Helpers/
│       └── functions.php
├── tests/
│   └── UserTest.php
├── config/
│   └── app.php
├── public/
│   └── index.php
└── vendor/
\`\`\`

### Namespace Convention
\`\`\`php
<?php
// src/Controllers/UserController.php
namespace App\\Controllers;

use App\\Models\\User;
use App\\Services\\AuthService;

class UserController {
    public function __construct(
        private AuthService $auth
    ) {}
    
    public function show(int $id): ?User {
        return User::find($id);
    }
}
\`\`\`

\`\`\`php
<?php
// src/Models/User.php
namespace App\\Models;

class User {
    public function __construct(
        public int $id,
        public string $name,
        public string $email
    ) {}
    
    public static function find(int $id): ?self {
        // Database query...
        return new self($id, 'Andi', 'andi@mail.com');
    }
}
\`\`\`

\`\`\`php
<?php
// src/Services/AuthService.php
namespace App\\Services;

use App\\Models\\User;

class AuthService {
    public function login(string $email, string $password): ?User {
        // Authentication logic...
        return null;
    }
    
    public function logout(): void {
        session_destroy();
    }
}
\`\`\`

### Entry Point
\`\`\`php
<?php
// public/index.php
declare(strict_types=1);

// Autoload
require_once __DIR__ . '/../vendor/autoload.php';

// Load environment
$dotenv = Dotenv\\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Use classes
use App\\Controllers\\UserController;
use App\\Services\\AuthService;

$auth = new AuthService();
$controller = new UserController($auth);
$user = $controller->show(1);

echo $user->name;
\`\`\`

---

## Namespaces Deep Dive

### Import & Aliases
\`\`\`php
<?php
namespace App\\Controllers;

// Import single class
use App\\Models\\User;
use App\\Services\\AuthService;

// Import with alias
use App\\Exceptions\\ValidationException as ValidationError;
use DateTime as DT;

// Import multiple from same namespace
use App\\Models\\{User, Post, Comment};

// Import function
use function App\\Helpers\\format_date;

// Import constant
use const App\\Config\\MAX_UPLOAD_SIZE;

class ExampleController {
    public function index(): void {
        $user = new User();           // App\\Models\\User
        $dt = new DT();               // DateTime
        $date = format_date($dt);     // App\\Helpers\\format_date()
        echo MAX_UPLOAD_SIZE;         // App\\Config\\MAX_UPLOAD_SIZE
    }
}
\`\`\`

### Global Namespace
\`\`\`php
<?php
namespace App\\Services;

class DateService {
    public function now(): \\DateTime {
        // Backslash untuk global namespace
        return new \\DateTime();
    }
    
    public function createFromFormat(string $format, string $date): \\DateTime|false {
        return \\DateTime::createFromFormat($format, $date);
    }
}
\`\`\`

---

## PSR Standards

### PSR-1 & PSR-12: Coding Style
\`\`\`php
<?php
// PSR-1: Basic Coding Standard
// - Files MUST use only <?php
// - Files MUST use UTF-8 without BOM
// - Class names MUST be PascalCase
// - Constants MUST be UPPER_SNAKE_CASE
// - Method names MUST be camelCase

// PSR-12: Extended Coding Style
declare(strict_types=1);

namespace App\\Services;

use App\\Contracts\\LoggerInterface;
use App\\Models\\User;
use InvalidArgumentException;

class UserService
{
    private const MAX_USERS = 100;
    
    public function __construct(
        private LoggerInterface $logger,
        private int $maxAttempts = 3
    ) {
    }
    
    public function findById(int $id): ?User
    {
        if ($id <= 0) {
            throw new InvalidArgumentException('ID must be positive');
        }
        
        return User::find($id);
    }
    
    public function createUser(
        string $name,
        string $email,
        ?string $phone = null
    ): User {
        // Method body
        return new User(
            id: 0,
            name: $name,
            email: $email
        );
    }
}
\`\`\`

### PSR-3: Logger Interface
\`\`\`php
<?php
// Sudah dibahas di modul Error Handling
// Gunakan Monolog yang implements PSR-3
\`\`\`

### PSR-7: HTTP Message Interface
\`\`\`php
<?php
// Contoh dengan PSR-7 implementation (Nyholm/Laminas)
use Psr\\Http\\Message\\ServerRequestInterface;
use Psr\\Http\\Message\\ResponseInterface;

class ApiController {
    public function handle(ServerRequestInterface $request): ResponseInterface {
        $method = $request->getMethod();
        $uri = $request->getUri();
        $body = $request->getParsedBody();
        $query = $request->getQueryParams();
        
        // Return PSR-7 Response
        return new Response(200, ['Content-Type' => 'application/json'], json_encode(['ok' => true]));
    }
}
\`\`\`

### PSR-11: Container Interface
\`\`\`php
<?php
use Psr\\Container\\ContainerInterface;

class SimpleContainer implements ContainerInterface {
    private array $services = [];
    
    public function set(string $id, callable $factory): void {
        $this->services[$id] = $factory;
    }
    
    public function get(string $id): mixed {
        if (!$this->has($id)) {
            throw new NotFoundException("Service not found: $id");
        }
        return $this->services[$id]($this);
    }
    
    public function has(string $id): bool {
        return isset($this->services[$id]);
    }
}

// Usage
$container = new SimpleContainer();
$container->set(LoggerInterface::class, fn() => new FileLogger('/var/log/app.log'));
$container->set(UserService::class, fn($c) => new UserService($c->get(LoggerInterface::class)));

$userService = $container->get(UserService::class);
\`\`\`

---

## Environment Configuration

### .env File
\`\`\`bash
# .env
APP_ENV=development
APP_DEBUG=true
APP_KEY=base64:randomkey...

DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=myapp
DB_USERNAME=root
DB_PASSWORD=secret

MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
\`\`\`

### Loading .env
\`\`\`php
<?php
// Dengan vlucas/phpdotenv
require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Required variables (throws exception if missing)
$dotenv->required(['DB_HOST', 'DB_DATABASE', 'DB_USERNAME']);

// Access environment
$dbHost = $_ENV['DB_HOST'];
$dbHost = getenv('DB_HOST');

// Helper function
function env(string $key, mixed $default = null): mixed {
    $value = $_ENV[$key] ?? getenv($key) ?: $default;
    
    // Convert string booleans
    return match(strtolower((string) $value)) {
        'true', '(true)' => true,
        'false', '(false)' => false,
        'null', '(null)' => null,
        default => $value
    };
}

// Usage
$debug = env('APP_DEBUG', false);
$dbHost = env('DB_HOST', 'localhost');
\`\`\`

---

## 🎯 Outcome Modul
- Composer installation dan commands
- PSR-4 autoloading configuration
- Namespaces dan import/alias
- PSR standards (1, 3, 4, 7, 11, 12)
- Environment configuration dengan .env
- Project structure best practices
`,
    level: 'intermediate',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  }
];