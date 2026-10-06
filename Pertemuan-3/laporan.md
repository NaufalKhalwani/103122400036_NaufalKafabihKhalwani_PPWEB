# LAPORAN PRAKTIKUM

## IMPLEMENTASI BOOTSTRAP DAN TAILWIND CSS

---

## 1. Identitas

| Keterangan  | Isi                                     |
| ----------- | --------------------------------------- |
| Nama        | Naufal Kafabih Khalwani                 |
| NIM         | 103122400036                            |
| Kelas       | SE-08-02                                |
| Mata Kuliah | Praktikum Pemrograman Web               |
| Topik       | Implementasi Bootstrap dan Tailwind CSS |

---

# 2. Tujuan Praktikum

Praktikum ini bertujuan untuk memahami penggunaan framework CSS dalam proses pembuatan antarmuka website. Framework yang digunakan adalah **Bootstrap** dan **Tailwind CSS**.

Tujuan dari praktikum ini adalah:

1. Memahami cara menggunakan Bootstrap pada halaman HTML.
2. Memahami cara menggunakan Tailwind CSS pada halaman HTML.
3. Mengimplementasikan layout responsive.
4. Menggunakan komponen dan utility class dari masing-masing framework.
5. Mengetahui perbedaan cara penulisan CSS menggunakan Bootstrap dan Tailwind CSS.
6. Membandingkan penggunaan Bootstrap dan Tailwind CSS dalam pembuatan website sederhana.

---

# 3. Dasar Teori

## 3.1 Bootstrap

Bootstrap adalah framework CSS yang menyediakan berbagai komponen siap pakai untuk membantu developer membuat website dengan lebih cepat dan responsive.

Bootstrap menyediakan beberapa fitur seperti:

* Navbar
* Grid system
* Card
* Button
* Form
* Input
* Responsive layout
* Utility classes
* Typography
* Color
* Spacing

Bootstrap menggunakan class yang sudah disediakan oleh framework. Contohnya:

```html
<button class="btn btn-primary">
    Get Started
</button>
```

Class `btn` digunakan untuk memberikan style dasar button, sedangkan `btn-primary` memberikan warna utama pada button.

---

## 3.2 Tailwind CSS

Tailwind CSS adalah framework CSS yang menggunakan pendekatan **utility-first**. Artinya, tampilan elemen dibentuk dengan menggabungkan berbagai utility class secara langsung pada HTML.

Contohnya:

```html
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg">
    Get Started
</button>
```

Pada kode tersebut:

* `bg-blue-600` memberikan warna background.
* `text-white` memberikan warna teks putih.
* `px-6` memberikan padding horizontal.
* `py-3` memberikan padding vertikal.
* `rounded-lg` memberikan sudut yang melengkung.

Dengan pendekatan tersebut, developer dapat mengatur tampilan elemen secara lebih detail langsung pada HTML.

---

# 4. Implementasi Bootstrap

File pertama menggunakan Bootstrap untuk membuat website sederhana.

Bootstrap dipanggil menggunakan CDN pada bagian `<head>`:

```html
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
    rel="stylesheet"
>
```

Dengan kode tersebut, class Bootstrap dapat digunakan pada halaman HTML.

---

## 4.1 Struktur Dasar HTML

Struktur awal file Bootstrap menggunakan HTML standar:

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Web</title>
</head>
<body>

</body>
</html>
```

`meta viewport` digunakan agar halaman dapat menyesuaikan ukuran layar perangkat seperti laptop, tablet, dan smartphone.

---

# 5. Navbar Bootstrap

Navbar digunakan sebagai navigasi utama website.

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand fw-bold" href="#">
            MyWebsite
        </a>
    </div>
</nav>
```

Beberapa class yang digunakan:

| Class              | Fungsi                         |
| ------------------ | ------------------------------ |
| `navbar`           | Membuat komponen navbar        |
| `navbar-expand-lg` | Navbar responsive              |
| `navbar-dark`      | Menggunakan style navbar gelap |
| `bg-dark`          | Background hitam/gelap         |
| `container`        | Membatasi lebar konten         |
| `navbar-brand`     | Style untuk nama website       |
| `fw-bold`          | Membuat teks menjadi bold      |

Navbar juga menggunakan:

```html
navbar-toggler
collapse
```

untuk membuat menu dapat berubah menjadi menu toggle pada ukuran layar yang lebih kecil.

---

# 6. Hero Section Bootstrap

Bagian hero digunakan sebagai bagian utama yang pertama kali dilihat oleh pengguna.

```html
<section class="bg-primary text-white text-center py-5">
    <div class="container">
        <h1 class="display-4 fw-bold">
            Welcome to My Website
        </h1>

        <p class="lead">
            Website sederhana menggunakan Bootstrap 5
        </p>

        <button class="btn btn-light">
            Get Started
        </button>
    </div>
</section>
```

Class yang digunakan:

* `bg-primary` memberikan background warna utama.
* `text-white` membuat teks menjadi putih.
* `text-center` membuat teks berada di tengah.
* `py-5` memberikan padding vertikal.
* `display-4` membuat ukuran heading lebih besar.
* `fw-bold` membuat teks tebal.
* `lead` membuat teks paragraf lebih menonjol.
* `btn btn-light` membuat button Bootstrap.

---

# 7. Grid System Bootstrap

Bootstrap memiliki sistem grid yang menggunakan `row` dan `col`.

Contoh:

```html
<div class="row g-4">

    <div class="col-md-4">
        ...
    </div>

    <div class="col-md-4">
        ...
    </div>

    <div class="col-md-4">
        ...
    </div>

</div>
```

Grid tersebut membagi halaman menjadi tiga kolom.

`col-md-4` berarti setiap card menggunakan 4 dari 12 kolom Bootstrap sehingga:

```text
4 + 4 + 4 = 12
```

Pada layar yang lebih kecil, kolom dapat menyesuaikan layout secara responsive.

---

# 8. Card Bootstrap

Card digunakan untuk menampilkan informasi dalam bentuk kotak.

```html
<div class="card shadow">
    <div class="card-body text-center">
        <h5 class="card-title">
            Web Design
        </h5>

        <p class="card-text">
            Membuat tampilan website yang menarik.
        </p>

        <button class="btn btn-primary">
            Learn More
        </button>
    </div>
</div>
```

Class yang digunakan:

| Class         | Fungsi              |
| ------------- | ------------------- |
| `card`        | Membuat card        |
| `card-body`   | Bagian isi card     |
| `card-title`  | Judul card          |
| `card-text`   | Isi teks            |
| `shadow`      | Memberikan bayangan |
| `text-center` | Menengahkan teks    |

---

# 9. Form Bootstrap

Website juga menggunakan form untuk menerima input dari pengguna.

```html
<form>
    <input
        type="text"
        class="form-control mb-3"
        placeholder="Nama"
    >

    <input
        type="email"
        class="form-control mb-3"
        placeholder="Email"
    >

    <textarea
        class="form-control mb-3"
        rows="4"
        placeholder="Pesan"
    ></textarea>

    <button class="btn btn-primary w-100">
        Kirim
    </button>
</form>
```

`form-control` merupakan class Bootstrap untuk memberikan style pada input dan textarea.

`mb-3` digunakan untuk memberikan margin bawah.

`w-100` membuat button memiliki lebar 100%.

---

# 10. Implementasi Tailwind CSS

File kedua menggunakan Tailwind CSS untuk membuat website dengan tampilan yang serupa.

Tailwind dipanggil menggunakan CDN:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Setelah Tailwind dipanggil, utility class dapat langsung digunakan pada elemen HTML.

---

# 11. Navbar Tailwind

Navbar dibuat menggunakan utility class Tailwind:

```html
<nav class="bg-gray-900 text-white">
    <div class="max-w-6xl mx-auto px-6 py-4
                flex justify-between items-center">
        <h1 class="text-xl font-bold">
            MyWebsite
        </h1>
    </div>
</nav>
```

Class yang digunakan:

| Class             | Fungsi                             |
| ----------------- | ---------------------------------- |
| `bg-gray-900`     | Background gelap                   |
| `text-white`      | Warna teks putih                   |
| `max-w-6xl`       | Membatasi lebar container          |
| `mx-auto`         | Membuat container berada di tengah |
| `px-6`            | Padding horizontal                 |
| `py-4`            | Padding vertikal                   |
| `flex`            | Menggunakan flexbox                |
| `justify-between` | Memberikan jarak antar elemen      |
| `items-center`    | Menengahkan elemen secara vertikal |
| `font-bold`       | Membuat teks tebal                 |

Berbeda dengan Bootstrap, Tailwind tidak menggunakan komponen `navbar` siap pakai. Layout dibuat dengan menggabungkan utility class.

---

# 12. Hero Section Tailwind

Hero section dibuat menggunakan:

```html
<section class="bg-blue-600 text-white text-center py-20 px-6">
    <h2 class="text-4xl md:text-5xl font-bold mb-4">
        Welcome to My Website
    </h2>

    <p class="text-lg mb-6">
        Website sederhana menggunakan Tailwind CSS
    </p>

    <button class="bg-white text-blue-600 px-6 py-3 rounded-lg">
        Get Started
    </button>
</section>
```

Beberapa class penting:

* `bg-blue-600` memberikan background biru.
* `text-white` membuat teks putih.
* `text-center` membuat teks berada di tengah.
* `py-20` memberikan padding vertikal.
* `text-4xl` menentukan ukuran teks.
* `md:text-5xl` mengubah ukuran teks pada layar medium.
* `font-bold` membuat teks tebal.
* `mb-4` memberikan margin bawah.
* `rounded-lg` membuat sudut button melengkung.

---

# 13. Grid Tailwind

Tailwind menggunakan CSS Grid melalui utility class.

```html
<div class="grid md:grid-cols-3 gap-6">
```

Penjelasan:

| Class            | Fungsi                        |
| ---------------- | ----------------------------- |
| `grid`           | Menggunakan CSS Grid          |
| `md:grid-cols-3` | Tiga kolom pada layar medium  |
| `gap-6`          | Memberikan jarak antar elemen |

Berbeda dengan Bootstrap yang menggunakan:

```html
row
col-md-4
```

Tailwind menggunakan:

```html
grid
md:grid-cols-3
```

---

# 14. Card Tailwind

Card dibuat menggunakan utility class.

```html
<div class="bg-white p-6 rounded-xl shadow hover:shadow-lg">
    <h3 class="text-xl font-bold mb-3">
        Web Design
    </h3>

    <p class="text-gray-600 mb-5">
        Membuat tampilan website yang menarik.
    </p>

    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Learn More
    </button>
</div>
```

Class yang digunakan:

* `bg-white` → background putih.
* `p-6` → padding.
* `rounded-xl` → sudut card melengkung.
* `shadow` → memberikan bayangan.
* `hover:shadow-lg` → bayangan menjadi lebih besar ketika cursor diarahkan ke card.
* `text-xl` → ukuran heading.
* `font-bold` → teks tebal.
* `text-gray-600` → warna teks abu-abu.

---

# 15. Form Tailwind

Form menggunakan utility class Tailwind.

```html
<form class="space-y-4">

    <input
        type="text"
        placeholder="Nama"
        class="w-full px-4 py-3 border rounded-lg"
    >

    <input
        type="email"
        placeholder="Email"
        class="w-full px-4 py-3 border rounded-lg"
    >

    <textarea
        class="w-full px-4 py-3 border rounded-lg"
    ></textarea>

</form>
```

Class penting:

| Class          | Fungsi                             |
| -------------- | ---------------------------------- |
| `space-y-4`    | Memberikan jarak vertikal          |
| `w-full`       | Lebar 100%                         |
| `px-4`         | Padding horizontal                 |
| `py-3`         | Padding vertikal                   |
| `border`       | Memberikan border                  |
| `rounded-lg`   | Membuat sudut melengkung           |
| `focus:ring-2` | Memberikan efek ketika input aktif |

---

# 16. Responsive Design

Kedua framework mendukung responsive design.

Pada Bootstrap digunakan:

```html
<div class="col-md-4">
```

Class `md` digunakan sebagai breakpoint untuk ukuran layar medium.

Sedangkan Tailwind menggunakan:

```html
<div class="md:grid-cols-3">
```

Artinya layout akan menggunakan tiga kolom ketika ukuran layar mencapai breakpoint `md`.

Tailwind juga digunakan pada heading:

```html
<h2 class="text-4xl md:text-5xl">
```

Ukuran teks akan berubah sesuai ukuran layar.

---

# 17. Perbandingan Bootstrap dan Tailwind CSS

| Aspek          | Bootstrap                        | Tailwind CSS                     |
| -------------- | -------------------------------- | -------------------------------- |
| Pendekatan     | Component-based                  | Utility-first                    |
| Button         | `btn btn-primary`                | `bg-blue-600 text-white ...`     |
| Grid           | `row`, `col-md-4`                | `grid`, `md:grid-cols-3`         |
| Card           | Ada komponen card                | Dibuat menggunakan utility       |
| Navbar         | Ada komponen navbar              | Dibuat dengan utility            |
| Customisasi    | Relatif mudah                    | Sangat fleksibel                 |
| Penulisan HTML | Lebih singkat untuk komponen     | Class dapat lebih panjang        |
| Responsive     | Menggunakan breakpoint Bootstrap | Menggunakan prefix seperti `md:` |
| Kemudahan awal | Mudah                            | Perlu memahami utility class     |

---

# 18. Hasil Implementasi

Hasil dari praktikum ini adalah dua halaman website sederhana dengan struktur yang hampir sama.

### Bootstrap

Website Bootstrap memiliki:

* Navbar
* Hero section
* Grid
* Card
* Button
* Form
* Input
* Textarea
* Footer
* Responsive layout

### Tailwind CSS

Website Tailwind memiliki:

* Navbar
* Hero section
* Grid
* Card
* Button
* Form
* Input
* Textarea
* Footer
* Responsive layout
* Hover effect
* Focus effect

Kedua website memiliki fungsi dan struktur yang serupa, tetapi cara penulisannya berbeda karena Bootstrap menggunakan komponen yang sudah disediakan, sedangkan Tailwind menggunakan utility class.

---

# 19. Kesimpulan

Berdasarkan praktikum yang telah dilakukan, Bootstrap dan Tailwind CSS dapat digunakan untuk mempercepat proses pembuatan tampilan website.

Bootstrap menyediakan banyak komponen siap pakai seperti navbar, button, card, dan form sehingga cocok digunakan ketika ingin membuat website dengan cepat menggunakan komponen yang sudah tersedia.

Sementara itu, Tailwind CSS menggunakan pendekatan utility-first sehingga tampilan dapat dikustomisasi secara lebih fleksibel dengan menggabungkan berbagai class seperti `bg-*`, `text-*`, `p-*`, `m-*`, `flex`, dan `grid`.

Dari implementasi yang dilakukan, kedua framework mampu menghasilkan website yang responsive dan memiliki tampilan yang baik. Perbedaan utama terletak pada cara penggunaannya, yaitu Bootstrap lebih berorientasi pada komponen siap pakai, sedangkan Tailwind lebih berorientasi pada utility class.

---

# 20. Kesimpulan Singkat

**Bootstrap** cocok digunakan untuk pembuatan website secara cepat dengan memanfaatkan komponen yang sudah tersedia.

**Tailwind CSS** cocok digunakan ketika membutuhkan fleksibilitas dan kontrol tampilan yang lebih detail.

Keduanya dapat membantu developer membuat website responsive dengan lebih mudah dibandingkan menulis seluruh CSS dari awal.
