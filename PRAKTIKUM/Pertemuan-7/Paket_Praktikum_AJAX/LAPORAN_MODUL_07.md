# LAPORAN PRAKTIKUM MODUL 07
## AJAX DAN KONSUMSI API

**Nama:** Naufal Kafabih Khalwani
**NIM:** 103122400036 
**Kelas:** SE 08-02  
---

## A. Tujuan Praktikum

1. Menerapkan konsep AJAX agar sebagian halaman dapat diperbarui tanpa reload.
2. Mengambil file teks menggunakan `XMLHttpRequest` secara asynchronous.
3. Mengambil data JSON menggunakan Fetch API.
4. Menggunakan Axios untuk request GET dan POST pada aplikasi React.
5. Mengelola loading, error, validasi, serta lifecycle request dengan `useState` dan `useEffect`.

## B. Soal 01 — Portal Informasi Praktikum

### 1. Struktur dan implementasi

Folder `latihan-praktikan/soal-01/` berisi `index.html`, `app.js`, dan `pengumuman.txt`. Halaman dibagi menjadi area aktivitas praktikan, pengumuman, dan direktori peserta.

### 2. Alur XMLHttpRequest

Event `click` pada tombol **Muat pengumuman** memulai request GET ke `pengumuman.txt`. Request dibuat dengan `xhr.open('GET', 'pengumuman.txt', true)` sehingga berjalan asynchronous. Event `readystatechange` memeriksa `readyState` sampai `XMLHttpRequest.DONE`, lalu memeriksa status HTTP. Jika status 2xx, isi `responseText` ditampilkan ke elemen `pre`. Status selain 2xx dan event `error` menghasilkan pesan kegagalan. Tombol dinonaktifkan selama request dan diaktifkan kembali setelah selesai.

### 3. Alur Fetch API

Event `click` pada tombol **Ambil peserta** membaca pilihan sumber. Mock lokal memakai `/api/users?delay=1500`, sedangkan sumber eksternal memakai `https://jsonplaceholder.typicode.com/users`. Program memeriksa `response.ok` sebelum membaca `response.json()`. Maksimal tiga objek pertama ditampilkan menggunakan nilai `name` dan `email` dari response, bukan data yang ditulis manual di antarmuka. Kegagalan eksternal memberikan arahan untuk memeriksa internet atau memilih mock secara manual.

### 4. State lokal saat request

Catatan praktikan merupakan input yang tidak diubah oleh request. Hitungan dimulai dari 0 dan hanya berubah melalui tombol **Tambah hitungan**. Waktu halaman pertama dibuka disimpan sekali saat inisialisasi. Karena ketiga nilai tersebut tidak diinisialisasi ulang ketika request berlangsung, pengguna tetap dapat mengetik catatan dan menambah hitungan selama Fetch berjalan.

## C. Soal 02 — Aplikasi Registrasi Peserta React

### 1. State dan effect

Aplikasi menggunakan `useState` untuk daftar peserta, status loading, error GET, pilihan skenario, input nama/email, status pengiriman, dan response POST. `useEffect` menjalankan GET saat komponen pertama kali dirender serta saat skenario atau tombol muat ulang berubah.

### 2. Axios GET

| Skenario | URL | Timeout |
|---|---|---:|
| Berhasil | `/api/users?delay=1000` | 5000 ms |
| Data kosong | `/api/users?mode=empty&delay=1000` | 5000 ms |
| Error HTTP | `/api/users?mode=error&delay=1000` | 5000 ms |
| Timeout | `/api/users?delay=2500` | 700 ms |

Data dibaca dari `response.data` dan elemen peserta memakai `user.id` sebagai React key. Saat request dimulai, daftar sebelumnya dibersihkan dan loading ditampilkan. Response kosong, HTTP error, timeout, dan gangguan jaringan memiliki tampilan masing-masing.

### 3. Cleanup effect

Setiap effect membuat `AbortController` dan penanda `active`. Cleanup mengubah `active` menjadi `false` dan membatalkan request. Dengan demikian response dari pilihan sebelumnya tidak mengubah state setelah skenario diganti atau komponen dilepas.

### 4. Axios POST dan validasi

Form mencegah reload menggunakan `event.preventDefault()`. Nama di-trim dan ditolak jika kosong atau hanya spasi. Email diperiksa dengan pola format email sederhana. Data `{ name, email }` dikirim melalui `axios.post('/api/users', objekData)`. Selama pengiriman tombol dinonaktifkan. Response POST menampilkan status HTTP, ID, nama, email, dan nilai `simulated`. Pesan yang ditampilkan menjelaskan bahwa pendaftaran merupakan simulasi dan tidak disimpan. Response POST tidak dimasukkan ke daftar GET.

## D. Hasil Pengujian

Pemeriksaan endpoint API lokal dilakukan langsung terhadap server paket. Bukti endpoint dan checklist pengambilan tangkapan layar tersedia di folder `bukti-pengujian/`. Pengujian visual melalui browser pada komputer praktikan tetap perlu dilakukan sebelum submit:

| No. | Skenario | Hasil yang diharapkan | Hasil |
|---:|---|---|---|
| 1 | Muat pengumuman | Isi `pengumuman.txt` tampil tanpa reload | Implementasi tersedia; verifikasi browser diperlukan |
| 2 | File pengumuman tidak ditemukan | Pesan gagal dan status 404 | Endpoint file hilang terverifikasi HTTP 404; verifikasi pesan UI diperlukan |
| 3 | Fetch mock sambil mengetik dan menambah hitungan | Tiga peserta tampil; catatan, hitungan, dan waktu awal tetap ada | Implementasi tersedia; verifikasi interaksi browser diperlukan |
| 4 | Fetch JSONPlaceholder | Maksimal tiga peserta atau pesan gagal yang jelas | Perlu diuji pada jaringan/internet pengguna |
| 5 | GET awal dan muat ulang | GET berjalan otomatis dan dapat diulang | Implementasi tersedia; verifikasi browser diperlukan |
| 6 | Skenario data kosong | Pesan data kosong dan daftar dibersihkan | Endpoint terverifikasi HTTP 200 dengan array kosong; verifikasi UI diperlukan |
| 7 | Skenario Error HTTP | Pesan HTTP 503 dan daftar dibersihkan | Endpoint terverifikasi HTTP 503; verifikasi UI diperlukan |
| 8 | Skenario timeout | Timeout pada batas 700 ms; aplikasi pulih saat kembali ke Berhasil | Implementasi tersedia; verifikasi browser diperlukan |
| 9 | Ganti skenario saat request berjalan | Hasil mengikuti skenario terbaru | Cleanup dan pembatalan request diimplementasikan; verifikasi browser diperlukan |
| 10 | POST Rina Praktikan | HTTP 201, ID 101, data sesuai input, simulated true | Endpoint terverifikasi HTTP 201 dan response sesuai |
| 11 | Validasi nama/email | Nama spasi dan email tidak valid ditolak | Validasi diimplementasikan; verifikasi form browser diperlukan |

**Catatan pengujian:** pemeriksaan teknis yang benar-benar dijalankan pada lingkungan penyusunan menghasilkan GET normal HTTP 200, GET kosong HTTP 200, GET error HTTP 503, POST HTTP 201 dengan ID 101 dan `simulated: true`, serta file tidak ditemukan HTTP 404. Kompilasi JSX dengan Babel juga berhasil. Browser otomatis pada lingkungan penyusunan diblokir oleh kebijakan sistem sehingga tangkapan layar dan verifikasi interaksi visual belum dapat dibuat di sini. API eksternal bergantung pada internet dan ketersediaan JSONPlaceholder; uji kembali pada perangkat pengumpulan. Jangan menganggap skenario UI yang belum diverifikasi sebagai hasil uji aktual.

## E. Kesimpulan

Praktikum menerapkan tiga mekanisme konsumsi data: XMLHttpRequest untuk membaca file teks, Fetch API untuk mengambil daftar peserta, dan Axios untuk GET serta POST pada React. Loading dan error membantu pengguna memahami status request. `useState` menyimpan data dan status antarmuka, sedangkan `useEffect` mengatur GET awal, perubahan skenario, dan cleanup agar response lama tidak menimpa hasil terbaru.
