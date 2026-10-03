# Tugas Mandiri Minggu 02: Pengembangan Halaman Web Portofolio & Layanan Interaktif Accessible Berbasis HTML5 dan Modern CSS

Proyek ini merupakan pemenuhan Tugas Mandiri Minggu ke-2 untuk mata kuliah **Pemrograman dan Pengujian Aplikasi Web (12S3101)** di Program Studi S1 Sistem Informasi, Institut Teknologi Del. Halaman web ini dirancang sebagai *Single Page Showcase Webpage* yang modern, semantik, responsif, serta mematuhi standar aksesibilitas web (WCAG 2.2 Level AA).

---

## Identitas Pengembang
* **Nama:** Angga B. P. Sianipar
* **NIM:** 12S24032
* **Program Studi:** S1 Sistem Informasi
* **Institusi:** Institut Teknologi Del
* **Tahun Akademik:** Semester Genap 2025/2026

---

## Live Demo & Tautan Penting
* **Live Demo GitHub Pages:** https://AnggaSianipar.github.io/ppw-2026-week2-12S24032/
* **Repositori GitHub:** https://github.com/AnggaSianipar/ppw-2026-week2-12S24032

---

## Komparasi: Sebelum vs Sesudah Integrasi Framework

Tabel berikut menyajikan analisis perbandingan antara implementasi Vanilla HTML/CSS dengan setelah integrasi framework CSS:

| Indikator / Fitur | Sebelum Integrasi (Vanilla HTML/CSS) | Sesudah Integrasi Framework |
| :--- | :--- | :--- |
| **Arsitektur Kode & CSS** | Menulis stylesheet kustom manual dari nol di `style.css`. | Memanfaatkan utility classes / komponen pra-bina dari framework. |
| **Penyusunan Layout & Grid** | Menggunakan CSS Grid & Flexbox kustom via Media Queries `@media`. | Menggunakan sistem Grid/Flexbox bawaan framework yang dinamis. |
| **Formulir Interaktif** | Styling manual untuk `<fieldset>`, `<legend>`, dan kontrol input. | Menggunakan komponen form tersandar yang konsisten di semua browser. |
| **Efisiensi Waktu Muka** | Membutuhkan pengaturan detail margin, padding, dan transisi manual. | Waktu pengembangan visual layout lebih cepat dengan kelas bawaan. |
| **Aksesibilitas (a11y)** | Pengaturan atribut ARIA dan kontras warna dikelola penuh secara manual. | Beberapa komponen framework sudah membawa standar ARIA bawaan. |

---

## Bukti Visual Komparasi Tampilan (Screenshot)

### 1. Halaman Beranda (Home)
| Sebelum Integrasi Framework | Sesudah Integrasi Framework |
| :---: | :---: |
| ![Beranda Sebelum](assets/Sebelum%20(Beranda).png) | ![Beranda Sesudah](assets/Sesudah(Beranda).png) |

### 2. Seksi Portofolio & Detail
| Sebelum Integrasi Framework | Sesudah Integrasi Framework |
| :---: | :---: |
| ![Portofolio Sebelum](/assets/Sebelum%20(Portofolio).png) | ![Portofolio Sesudah](assets/Sesudah%20(Portofolio).png) |
| — | ![Detail Portofolio Sesudah](assets/Sesudah(DetailPortofolio).png) |

### 3. Formulir Layanan Interaktif
| Sebelum Integrasi Framework | Sesudah Integrasi Framework |
| :---: | :---: |
| ![Formulir Sebelum](assets/Sebelum%20(Formulir).png) | ![Formulir Sesudah](assets/Sesudah(Formulir).png) |

---

## Fitur & Implementasi Teknis

### 1. Struktur Semantik HTML5 (Bobot 20%)
* Menggunakan elemen semantik baku: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, dan `<footer>`.
* Menghindari *div-soup* tanpa makna struktural.
* Terbagi atas 3 seksi tematik utama:
  * **Tentang Saya:** Profil ringkas dan fokus keahlian.
  * **Portofolio Karya:** Rekapitulasi capaian proyek akademik.
  * **Formulir Layanan:** Pemesanan konsultasi proyek digital.

### 2. Penyajian Data Tabular & Lists (Bobot 15%)
* **Tabel Semantik:** Dilengkapi dengan tag `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, serta penandaan atribut `scope="col"` dan `scope="row"` untuk pembaca layar (*screen reader*).
* **HTML Lists:** Menggunakan `<ul>` (*unordered list*) untuk daftar minat utama dan `<ol>` (*ordered list*) untuk alur penyelesaian proyek.

### 3. Formulir Interaktif & Accessible (Bobot 20%)
* Dikelompokkan rapi ke dalam 2 blok `<fieldset>` dengan `<legend>` terpisah: *Informasi Klien* dan *Detail Permintaan*.
* Mengimplementasikan kontrol input yang beragam: `text`, `email`, `tel`, `date`, `radio`, `select`, `textarea`, dan `checkbox`.
* Setiap kontrol form terhubung eksplisit dengan `<label for="...">` dan dilengkapi validasi native browser (`required`).

### 4. Estetika & Tata Letak Modern CSS (Bobot 25%)
* **Universal Box Sizing Reset:** Menghindari pecahnya dimensi kotak layout menggunakan `box-sizing: border-box`.
* **Harmonisasi Warna (Aturan 60-30-10):** Dominasi warna netral lembut (`#f8fafc`), warna teks keterbacaan tinggi (`#1e293b`), dan warna aksen biru profesional (`#0284c7`).
* **Flexbox & Grid:** Memanfaatkan CSS Grid untuk layout dua kolom (*main* dan *aside*) serta Flexbox untuk navigasi dan tombol.
* **Desain Responsif:** Didukung Media Queries (`@media (max-width: 768px)`) untuk penyesuaian tata letak otomatis pada layar ponsel (*mobile-friendly*).
* **Detail Mikro:** Sentuhan sudut membulat (*border-radius*), bayangan lembut lapis ganda (*soft box-shadow*), efek transisi *hover*, dan navigasi *sticky header*.

---

## Struktur Berkas Proyek

```text
.
├── assets/
│   ├── Foto_Profile.jpg
│   ├── Sebelum (Beranda).png
│   ├── Sebelum (Formulir).png
│   ├── Sebelum (Portofolio).png
│   ├── Sesudah (Beranda).png
│   ├── Sesudah (DetailPortofolio).png
│   ├── Sesudah (Formulir).png
│   └── Sesudah (Portofolio).png
├── index.html     
├── style.css         
└── README.md