// src/pages/learn-more.jsx
import React from "react";
import Link from "next/link";

export default function LearnMore() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-gray-800">
      {/* Header Section */}
      <section className="bg-indigo-900 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 mt-10">Pelajari Lebih Lanjut</h2>
        <p className="text-lg md:text-xl">Kenali tulisan tangan Anda dengan kecerdasan buatan.</p>
      </section>

      {/* Description Box */}
      <section className="flex justify-center py-10 px-6">
        <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl text-center">
          <p className="text-gray-700 text-lg">
            <strong>Graphology AI</strong> adalah aplikasi analisis tulisan tangan berbasis web yang membantu Anda memahami karakter, emosi, dan pola kepribadian hanya dari goresan pena.
          </p>
        </div>
      </section>

      {/* Cara Menggunakan Aplikasi */}
      <section className="px-8 md:px-20">
        <div className="text-center mb-6">
          <button className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-xl shadow hover:bg-[#4338ca] transition">CARA MENGGUNAKAN APLIKASI</button>
        </div>

        <div className="text-left max-w-3xl mx-auto space-y-4">
          <p>
            <b>1. Registrasi & Login</b>
            <br />
            Buat akun baru atau login untuk memulai pengalaman analisis tulisan tangan.
          </p>
          <p>
            <b>2. Dashboard (Home)</b>
            <br />
            Setelah berhasil login, Anda akan diarahkan ke dashboard utama. Di sini tersedia menu navigasi ke semua fitur.
          </p>
          <p>
            <b>3. Handwriting Analyst (Fitur Utama)</b>
            <br />
            - Upload Tulisan → Unggah foto tulisan tangan Anda.
            <br />
            - Tulis Langsung → Gunakan canvas digital untuk menulis langsung di aplikasi.
            <br />
            Hasil analisis akan ditampilkan secara otomatis dalam bentuk laporan singkat.
          </p>
          <p>
            <b>4. About</b>
            <br />
            Halaman ini memberikan informasi lengkap tentang tujuan, teknologi, dan manfaat aplikasi Graphology AI.
          </p>
        </div>
      </section>

      {/* Highlight Box */}
      <section className="bg-gradient-to-r bg-indigo-800 to-[#6366f1] text-white rounded-xl shadow-md mx-8 md:mx-20 my-10 p-6">
        <ul className="space-y-3 text-lg font-medium">
          <li>
            <b>1. Analisis Tulisan Instan</b> → Dapatkan hasil cepat dan akurat dari tulisan Anda.
          </li>
          <li>
            <b>2. Dua Metode Input</b> → Upload tulisan tangan atau tulis langsung di aplikasi.
          </li>
          <li>
            <b>3. Dashboard Ringkas</b> → Navigasi mudah ke semua fitur.
          </li>
          <li>
            <b>4. Tentang Aplikasi</b> → Kenali lebih dalam fungsi dan manfaat Graphology AI.
          </li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-900 text-center py-14">
        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">Siap Memulai?</h3>
        <p className="text-white mb-6">Tentukan kepribadian Anda melalui analisis tulisan tangan dengan AI.</p>
        <Link href="/handwriting" className="bg-white text-[#4f46e5] font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition">
          Mulai Analisis
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 px-8 md:px-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-2">Grapholyze</h4>
            <p className="text-gray-400">Platform AI terdepan untuk analisis tulisan tangan dan kepribadian.</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">Menu</h4>
            <ul className="text-gray-400 space-y-2">
              <li>Handwriting Analysis</li>
              <li>Personality Report</li>
              <li>API Integration</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">Kontak</h4>
            <div className="flex gap-4 text-gray-400">
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-github"></i>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">© 2024 Grapholyze. All rights reserved.</p>
      </footer>
    </div>
  );
}
