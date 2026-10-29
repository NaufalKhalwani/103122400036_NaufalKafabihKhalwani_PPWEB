# LAPORAN END-TO-END PEMBUATAN APLIKASI REACT
## PraktikumHub — Manajemen Peserta Praktikum

**Mata kuliah/praktikum:** React Dasar  
**Modul:** Modul 06  
**Nama aplikasi:** PraktikumHub — Manajemen Peserta Praktikum  
**Teknologi:** React 18, JavaScript (JSX), Vite, CSS  
**Jenis aplikasi:** Frontend web untuk pengelolaan data peserta praktikum  
**Tanggal laporan:** 29 Oktober 2026

---

## 1. Pendahuluan

PraktikumHub adalah aplikasi web sederhana yang dibuat untuk membantu administrator mengelola data peserta praktikum. Aplikasi ini menampilkan daftar mahasiswa, menyediakan formulir untuk menambah dan mengubah data, memungkinkan penghapusan peserta, serta membantu pemantauan kehadiran. Pengguna juga dapat mencari peserta berdasarkan nama atau NIM dan menyaring daftar berdasarkan kelas. Antarmuka dibuat responsif agar tetap dapat digunakan melalui layar desktop maupun perangkat mobile.

Aplikasi dibangun menggunakan React sebagai pustaka antarmuka pengguna dan Vite sebagai alat pengembangan serta proses build. Data dikelola menggunakan state React di sisi frontend. Oleh karena itu, aplikasi pada versi ini belum menggunakan backend atau database permanen.

## 2. Tujuan Pembuatan

Tujuan pembuatan aplikasi ini adalah:

1. Menerapkan konsep komponen pada React.
2. Menggunakan `useState` untuk menyimpan dan memperbarui data serta kondisi antarmuka.
3. Menggunakan `useMemo` untuk menghitung daftar peserta yang sesuai dengan pencarian dan filter.
4. Membuat formulir input dengan validasi.
5. Mengimplementasikan operasi CRUD (*Create, Read, Update, Delete*).
6. Menambahkan fitur pencarian, filter kelas, dan pengelolaan kehadiran.
7. Membuat antarmuka yang rapi, mudah dipahami, dan responsif.
8. Memahami alur menjalankan dan membangun proyek menggunakan Vite.

## 3. Teknologi yang Digunakan

| Teknologi | Fungsi dalam aplikasi |
|---|---|
| React 18 | Membuat antarmuka berbasis komponen dan mengelola state. |
| JavaScript | Menulis logika aplikasi, fungsi pengolahan data, dan interaksi pengguna. |
| JSX | Menuliskan struktur antarmuka dengan sintaks yang menyerupai HTML di dalam JavaScript. |
| Vite | Menjalankan server pengembangan dan membangun versi produksi. |
| CSS | Mengatur warna, tata letak, tipografi, tabel, tombol, dan responsivitas. |
| npm | Mengelola dependensi serta menjalankan perintah proyek. |

Dependensi utama yang tercantum pada `package.json` adalah `react` dan `react-dom`. Dependensi pengembangan meliputi `vite` dan `@vitejs/plugin-react`.

## 4. Struktur Folder dan File

```text
react-manajemen-peserta/
├── README.md
├── package.json
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    └── styles.css
```

Penjelasan setiap file:

- **`README.md`** berisi ringkasan aplikasi, daftar fitur, dan instruksi menjalankan proyek.
- **`package.json`** menyimpan identitas proyek, daftar dependensi, dan perintah npm.
- **`index.html`** menjadi dokumen HTML utama dan menyediakan elemen `root` sebagai tempat React menampilkan aplikasi.
- **`vite.config.js`** mengatur Vite dan mengaktifkan plugin React.
- **`src/main.jsx`** menjadi titik masuk aplikasi React. File ini membuat root React, merender komponen `App`, dan mengimpor CSS.
- **`src/App.jsx`** berisi komponen, state, validasi, fungsi pengelolaan peserta, pencarian, filter, dan tampilan utama.
- **`src/styles.css`** mengatur seluruh tampilan visual serta aturan responsif untuk berbagai ukuran layar.

## 5. Proses Pembuatan Aplikasi dari Awal sampai Akhir

### 5.1 Menyiapkan lingkungan pengembangan

Langkah pertama adalah memastikan Node.js dan npm telah terpasang. Keduanya diperlukan untuk memasang dependensi React dan menjalankan Vite. Setelah itu, file proyek diekstrak dan folder proyek dibuka melalui Visual Studio Code. Terminal kemudian diarahkan ke folder yang berisi `package.json`.

Perintah untuk memasang seluruh dependensi adalah:

```bash
npm install
```

Perintah tersebut membaca daftar dependensi pada `package.json`, kemudian mengunduh paket yang diperlukan. Setelah proses instalasi selesai, proyek siap dijalankan.

### 5.2 Mengatur konfigurasi proyek

File `package.json` menentukan nama proyek, versi, tipe modul, dependensi, dan perintah yang dapat digunakan. Konfigurasi proyek menyediakan tiga skrip utama:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

- `npm run dev` menjalankan server pengembangan.
- `npm run build` membuat hasil build untuk produksi di folder `dist`.
- `npm run preview` menjalankan pratinjau dari hasil build produksi.

File `vite.config.js` menggunakan `defineConfig` dari Vite dan mengaktifkan `@vitejs/plugin-react`. Plugin tersebut membantu Vite memproses kode React dan JSX.

### 5.3 Menyiapkan HTML dan titik masuk React

File `index.html` menetapkan bahasa dokumen menjadi Bahasa Indonesia, mengatur encoding karakter UTF-8, dan menggunakan meta viewport agar tampilan menyesuaikan lebar perangkat. Di dalam body terdapat elemen:

```html
<div id="root"></div>
```

Elemen `root` merupakan wadah utama tempat React merender aplikasi. File `src/main.jsx` kemudian mengimpor React, `createRoot`, komponen `App`, dan stylesheet. Fungsi `createRoot` menghubungkan React ke elemen `root`, lalu menampilkan `App` di dalam `React.StrictMode`.

Alur awalnya adalah `index.html` memuat `src/main.jsx`, kemudian `main.jsx` merender komponen `App`, dan komponen tersebut menampilkan seluruh antarmuka aplikasi.

### 5.4 Menentukan data awal

Pada `src/App.jsx`, data awal didefinisikan melalui konstanta `DATA_AWAL`. Terdapat tiga data contoh, yaitu Ani, Budi, dan Citra. Setiap objek peserta memiliki properti:

| Properti | Kegunaan |
|---|---|
| `id` | Identitas unik peserta untuk membedakan data. |
| `nama` | Nama mahasiswa. |
| `nim` | Nomor Induk Mahasiswa. |
| `kelas` | Kelas peserta, yaitu `TI-2A` atau `TI-2B`. |
| `hadir` | Nilai boolean untuk menandai kehadiran. |

Nilai awal formulir disimpan dalam konstanta `FORM_AWAL`, yang berisi nama, NIM, dan kelas kosong. Konstanta ini digunakan untuk mengosongkan formulir setelah penambahan atau pembatalan pengeditan.

### 5.5 Membagi antarmuka menjadi komponen

Agar kode lebih terstruktur dan mudah dipelihara, antarmuka dibagi menjadi beberapa komponen berikut.

| Komponen | Tanggung jawab |
|---|---|
| `App` | Mengelola state utama, logika CRUD, pencarian, filter, dan menyusun halaman. |
| `RingkasanPeserta` | Menghitung dan menampilkan kartu ringkasan peserta. |
| `FormPeserta` | Menampilkan formulir tambah/edit serta pesan validasi. |
| `FilterPeserta` | Menyediakan input pencarian nama/NIM dan pilihan filter kelas. |
| `DaftarPeserta` | Menampilkan tabel peserta atau pesan ketika hasil kosong. |
| `ItemPeserta` | Menampilkan satu baris peserta beserta tombol tindakan. |

Pemisahan ini membuat tiap komponen memiliki tanggung jawab yang jelas. Data dan fungsi dari `App` diteruskan ke komponen anak melalui props, seperti `peserta`, `onEdit`, `onHapus`, dan `onToggleHadir`.

### 5.6 Mengelola state dengan `useState`

Komponen `App` menggunakan `useState` untuk menyimpan kondisi aplikasi:

- `peserta`: daftar seluruh peserta.
- `form`: nilai yang sedang diketik pada formulir.
- `idEdit`: ID peserta yang sedang diedit, atau `null` ketika tidak dalam mode edit.
- `pencarian`: kata kunci pencarian.
- `filterKelas`: kelas yang dipilih untuk menyaring daftar.
- `pesan`: pesan sukses atau kesalahan validasi.

Ketika pengguna melakukan tindakan, setter dari `useState` memperbarui state. React kemudian merender ulang bagian antarmuka yang bergantung pada nilai tersebut. Dengan pendekatan ini, perubahan data langsung tercermin pada tabel dan kartu ringkasan tanpa perlu memanipulasi DOM secara manual.

### 5.7 Menampilkan ringkasan peserta

Komponen `RingkasanPeserta` menerima daftar peserta melalui props. Komponen menghitung:

1. **Total peserta**, yaitu jumlah seluruh data peserta.
2. **Hadir**, yaitu jumlah peserta dengan `hadir` bernilai `true`.
3. **Belum hadir**, yaitu total peserta dikurangi jumlah yang hadir.
4. **Hasil ditampilkan**, yaitu jumlah peserta yang masih cocok setelah pencarian dan filter diterapkan.

Hasil tersebut ditampilkan sebagai empat kartu ringkasan. Karena nilainya dihitung dari state, ringkasan diperbarui secara otomatis ketika peserta ditambah, dihapus, diubah, ditandai hadir, atau ketika filter berubah.

### 5.8 Membuat formulir tambah peserta

Komponen `FormPeserta` menampilkan tiga input utama: nama mahasiswa, NIM, dan kelas. Nilai input dikendalikan oleh state `form`, sehingga input menggunakan `value` dan `onChange`. Fungsi `ubahInput` membaca atribut `name` dan nilai dari input yang berubah, kemudian memperbarui properti yang sesuai pada objek formulir.

Ketika tombol tambah ditekan, event submit memanggil fungsi `simpanPeserta`. Fungsi tersebut menggunakan `event.preventDefault()` untuk mencegah browser melakukan submit standar yang memuat ulang halaman. Selanjutnya, data dibersihkan dari spasi di awal dan akhir melalui `trim()`, lalu diperiksa sebelum disimpan.

### 5.9 Melakukan validasi input

Sebelum peserta ditambahkan atau diperbarui, aplikasi melakukan empat pemeriksaan:

1. **Nama:** harus memiliki minimal tiga karakter setelah spasi di awal dan akhir dihapus.
2. **NIM:** harus terdiri dari tepat delapan digit angka, sesuai pola `^\d{8}$`.
3. **Kelas:** pengguna wajib memilih kelas.
4. **NIM duplikat:** NIM tidak boleh sama dengan milik peserta lain. Saat edit, peserta dengan ID yang sedang diedit dikecualikan dari pemeriksaan duplikat.

Jika validasi gagal, fungsi menyimpan pesan bertipe `error`. Komponen formulir kemudian menampilkan pesan tersebut dengan gaya visual khusus. Jika seluruh pemeriksaan lolos, aplikasi melanjutkan proses penambahan atau pembaruan data.

### 5.10 Menambahkan peserta (Create)

Ketika formulir valid dan tidak berada dalam mode edit, aplikasi membuat ID baru, lalu menambahkan objek peserta ke dalam state `peserta` menggunakan setter state. Peserta baru secara default memiliki `hadir: false`, sehingga status awalnya adalah belum hadir.

Setelah penambahan, formulir dikosongkan dan pesan sukses ditampilkan. Daftar peserta dan kartu ringkasan kemudian diperbarui berdasarkan state terbaru. Data contoh dan data baru hanya berada di memori aplikasi selama halaman digunakan; belum ada penyimpanan permanen.

### 5.11 Menampilkan daftar peserta (Read)

Komponen `DaftarPeserta` menerima daftar peserta yang telah diproses oleh pencarian dan filter. Jika daftar berisi data, komponen menampilkan tabel dengan kolom nama mahasiswa, NIM, kelas, kehadiran, dan tindakan. Setiap baris dibuat menggunakan `map()` dan dirender melalui komponen `ItemPeserta`.

Properti `key` menggunakan ID peserta agar React dapat mengenali setiap item ketika daftar berubah. Nama peserta juga ditampilkan bersama avatar sederhana yang menggunakan huruf pertama nama. Jika tidak ada hasil yang cocok dengan pencarian atau filter, aplikasi menampilkan pesan bahwa peserta tidak ditemukan.

### 5.12 Mengedit peserta (Update)

Tombol edit pada setiap baris menjalankan fungsi `mulaiEdit`. Fungsi ini mengisi formulir dengan data peserta yang dipilih dan menyimpan ID peserta tersebut pada `idEdit`. Judul formulir dan teks tombol berubah untuk menunjukkan bahwa pengguna sedang mengedit data. Halaman juga menggulir ke bagian atas dengan `window.scrollTo()` agar formulir lebih mudah dijangkau.

Ketika formulir disubmit, validasi yang sama dijalankan. Jika valid, aplikasi menggunakan `map()` untuk mencari peserta berdasarkan ID dan mengganti properti nama, NIM, serta kelas dengan nilai baru. Properti `hadir` tetap dipertahankan karena pembaruan hanya menyebarkan data lama dan mengganti tiga properti tersebut. Tombol batal mengembalikan formulir ke kondisi awal tanpa menyimpan perubahan.

### 5.13 Menghapus peserta (Delete)

Tombol hapus memanggil fungsi `hapusPeserta` dengan ID peserta yang dipilih. Fungsi tersebut menggunakan `filter()` untuk membuat daftar baru yang tidak menyertakan peserta dengan ID tersebut. Jika peserta yang dihapus sedang diedit, formulir juga direset agar tidak tetap menampilkan data yang sudah dihapus.

Pada versi sekarang, penghapusan dilakukan langsung tanpa dialog konfirmasi. Karena belum menggunakan backend atau database, penghapusan hanya memengaruhi state selama sesi halaman berjalan.

### 5.14 Mengelola kehadiran

Setiap baris peserta menyediakan tombol untuk mengubah status kehadiran. Fungsi `toggleHadir` menggunakan `map()` untuk menemukan peserta berdasarkan ID, lalu membalik nilai boolean `hadir` menggunakan operator `!`.

Jika peserta belum hadir, tombol menampilkan “Tandai hadir”. Setelah ditekan, status berubah menjadi “Hadir” dan teks tombol menjadi “Batalkan hadir”. Jika status dibatalkan, nilai kembali menjadi `false`. Warna label status juga mengikuti kondisi kehadiran.

### 5.15 Menerapkan pencarian dan filter kelas

Komponen `FilterPeserta` menyediakan input pencarian dan pilihan kelas. Pencarian memeriksa nama secara tidak membedakan huruf besar/kecil serta memeriksa NIM berdasarkan kata kunci. Filter kelas menyediakan pilihan “Semua kelas”, `TI-2A`, dan `TI-2B`.

Pemrosesan daftar dilakukan pada `pesertaTerfilter` menggunakan `useMemo`. Fungsi tersebut mengembalikan peserta yang memenuhi kedua kondisi: cocok dengan kata kunci pencarian dan cocok dengan kelas yang dipilih. Jika filter kelas berada pada “Semua kelas”, seluruh kelas dapat ditampilkan selama memenuhi pencarian.

`useMemo` membantu menghindari perhitungan ulang ketika dependensi `peserta`, `pencarian`, dan `filterKelas` tidak berubah. Untuk aplikasi berukuran kecil seperti ini, manfaat performanya mungkin sederhana, tetapi penggunaannya juga memperlihatkan konsep memoization di React.

### 5.16 Mendesain tampilan menggunakan CSS

File `src/styles.css` mengatur keseluruhan tampilan, antara lain:

- Header/hero dengan identitas PraktikumHub dan judul halaman.
- Kartu ringkasan dengan warna berbeda untuk setiap kategori.
- Panel formulir dan daftar peserta.
- Input, dropdown, tombol, pesan validasi, serta label status.
- Tabel peserta dengan avatar dan tombol tindakan.
- Keadaan kosong saat tidak ada peserta yang cocok.
- Footer aplikasi.

CSS menggunakan grid dan flexbox untuk mengatur tata letak. Media query pada lebar layar tertentu mengubah susunan layout agar lebih sesuai untuk perangkat yang lebih kecil. Pada layar lebar, formulir dan daftar tampil berdampingan; pada layar mobile, keduanya disusun vertikal. Tabel dibungkus dalam elemen dengan `overflow-x: auto` agar kolom yang lebar tetap dapat diakses melalui scroll horizontal.

### 5.17 Menjalankan aplikasi

Setelah dependensi terpasang, aplikasi dijalankan dengan perintah:

```bash
npm run dev
```

Vite akan menampilkan alamat lokal pada terminal. Buka alamat tersebut melalui browser untuk melihat aplikasi. Selama server pengembangan aktif, perubahan pada file sumber umumnya akan tercermin secara otomatis melalui mekanisme pembaruan Vite.

### 5.18 Memeriksa build produksi

Untuk memeriksa apakah aplikasi dapat dikompilasi menjadi hasil produksi, jalankan:

```bash
npm run build
```

Jika berhasil, Vite akan menghasilkan folder `dist`. Hasilnya dapat diperiksa menggunakan:

```bash
npm run preview
```

Perintah preview digunakan untuk melihat hasil build produksi secara lokal. Perlu dibedakan bahwa keberhasilan build tidak otomatis membuktikan seluruh alur interaksi telah diuji; pengujian manual terhadap fitur tetap diperlukan.

## 6. Alur Kerja Aplikasi

Alur penggunaan aplikasi secara keseluruhan adalah sebagai berikut:

1. Pengguna membuka aplikasi melalui browser.
2. React menampilkan data awal beserta ringkasan peserta.
3. Pengguna dapat mencari nama/NIM atau memilih filter kelas.
4. Pengguna dapat mengisi formulir untuk menambah peserta.
5. Sistem memvalidasi nama, NIM, kelas, dan duplikasi NIM.
6. Jika valid, data ditambahkan atau diperbarui pada state React.
7. Pengguna dapat mengedit, menghapus, atau mengubah status kehadiran.
8. Tabel dan ringkasan menyesuaikan dengan state terbaru.
9. Ketika halaman dimuat ulang, state kembali ke data awal karena belum ada penyimpanan permanen.

## 7. Ringkasan Operasi Data (CRUD)

| Operasi | Implementasi | Hasil |
|---|---|---|
| Create | Menambahkan objek baru melalui setter `setPeserta` | Peserta baru muncul pada daftar. |
| Read | Merender daftar menggunakan `map()` | Data tampil dalam tabel. |
| Update | Memperbarui objek yang ID-nya cocok menggunakan `map()` | Perubahan data tampil pada tabel. |
| Delete | Menyaring data dengan `filter()` | Peserta yang dipilih dihapus dari state. |
| Kehadiran | Membalik nilai `hadir` pada peserta dengan ID tertentu | Status hadir/belum hadir berubah. |
| Search | Mencocokkan nama dan NIM dengan kata kunci | Daftar menampilkan hasil pencarian. |
| Filter | Membatasi daftar berdasarkan kelas | Hanya kelas yang dipilih ditampilkan. |

## 8. Rencana Pengujian Fungsional

Tabel berikut merupakan skenario pengujian yang perlu dijalankan. Status hasil harus diisi setelah pengujian benar-benar dilakukan.

| No. | Skenario | Hasil yang diharapkan | Status |
|---:|---|---|---|
| 1 | Membuka aplikasi | Header, ringkasan, formulir, dan daftar tampil | Belum diverifikasi |
| 2 | Menambah peserta dengan data valid | Peserta muncul pada daftar dan total bertambah | Belum diverifikasi |
| 3 | Mengirim nama kurang dari 3 karakter | Pesan validasi nama tampil | Belum diverifikasi |
| 4 | Mengisi NIM bukan 8 digit angka | Pesan validasi NIM tampil | Belum diverifikasi |
| 5 | Tidak memilih kelas | Pesan agar memilih kelas tampil | Belum diverifikasi |
| 6 | Menggunakan NIM yang sudah dipakai | Pesan NIM duplikat tampil | Belum diverifikasi |
| 7 | Mengedit data peserta | Data yang dipilih diperbarui | Belum diverifikasi |
| 8 | Membatalkan mode edit | Formulir kembali kosong dan mode edit berakhir | Belum diverifikasi |
| 9 | Menghapus peserta | Peserta tidak lagi muncul pada daftar | Belum diverifikasi |
| 10 | Mengubah status kehadiran | Status dan ringkasan kehadiran diperbarui | Belum diverifikasi |
| 11 | Mencari nama atau NIM | Daftar sesuai dengan kata kunci | Belum diverifikasi |
| 12 | Memfilter berdasarkan kelas | Daftar hanya memuat kelas terpilih | Belum diverifikasi |
| 13 | Mencari data yang tidak tersedia | Pesan hasil tidak ditemukan tampil | Belum diverifikasi |
| 14 | Membuka pada layar mobile | Layout menyesuaikan dan konten tetap dapat diakses | Belum diverifikasi |
| 15 | Menjalankan `npm run build` | Proses build selesai tanpa error | Belum diverifikasi |

**Catatan:** kolom status sengaja ditulis “Belum diverifikasi” karena laporan kode ini tidak mengklaim bahwa seluruh pengujian telah dijalankan. Setelah melakukan pengujian, ubah status sesuai hasil aktual.

## 9. Keterbatasan Aplikasi

1. Data hanya disimpan dalam state React dan tidak bertahan setelah halaman dimuat ulang.
2. Belum terdapat backend, API, maupun database.
3. Data peserta awal masih berupa data contoh yang ditulis langsung di dalam kode.
4. Penghapusan peserta belum menggunakan dialog konfirmasi.
5. Validasi dilakukan pada frontend sehingga belum cukup untuk aplikasi yang digunakan secara nyata dengan banyak pengguna.
6. Belum tersedia autentikasi dan pembagian hak akses administrator.
7. Aplikasi belum menyediakan ekspor data ke Excel, CSV, atau PDF.
8. Pilihan kelas masih dibatasi pada `TI-2A` dan `TI-2B`.

## 10. Saran Pengembangan

Untuk pengembangan berikutnya, data dapat disimpan pada backend dan database agar tidak hilang saat halaman dimuat ulang. Validasi juga perlu diterapkan di backend agar data tetap konsisten. Fitur konfirmasi penghapusan, notifikasi yang lebih informatif, ekspor laporan, autentikasi administrator, serta pengelolaan kelas dinamis dapat ditambahkan sesuai kebutuhan. Selain itu, pengujian otomatis dengan alat pengujian React dapat membantu memastikan fungsi CRUD, validasi, pencarian, dan filter tetap bekerja setelah perubahan kode.

## 11. Kesimpulan

PraktikumHub merupakan aplikasi frontend React untuk pengelolaan peserta praktikum yang menerapkan komponen, props, state, event handler, conditional rendering, `map()`, `filter()`, `useState`, dan `useMemo`. Fitur yang dirancang mencakup penambahan, penampilan, pengubahan, dan penghapusan peserta, pengelolaan kehadiran, pencarian, filter kelas, serta ringkasan data. React digunakan untuk menjaga antarmuka tetap selaras dengan perubahan state, sedangkan Vite digunakan untuk menjalankan proyek dan membangun hasil produksi.

Secara keseluruhan, proyek ini menjadi latihan penerapan dasar React dalam sebuah kasus pengelolaan data. Namun, karena belum terhubung ke backend atau database, aplikasi ini masih cocok sebagai demonstrasi/praktikum dan belum sebagai sistem produksi. Pengujian manual dan verifikasi build tetap perlu dilakukan sebelum aplikasi dinyatakan selesai.

---

## Lampiran A — Perintah Terminal

```bash
# Memasang dependensi
npm install

# Menjalankan server pengembangan
npm run dev

# Membuat build produksi
npm run build

# Melihat hasil build secara lokal
npm run preview
```

## Lampiran B — Catatan Implementasi

- Komponen utama dan fungsi bisnis berada di `src/App.jsx`.
- Styling dan breakpoint responsif berada di `src/styles.css`.
- Titik masuk React berada di `src/main.jsx`.
- Konfigurasi Vite berada di `vite.config.js`.
- Nama skrip dan dependensi proyek didefinisikan di `package.json`.
- Data saat ini bersifat sementara dan tidak menggunakan penyimpanan permanen.
