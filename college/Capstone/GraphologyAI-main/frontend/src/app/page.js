"use client";

import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Image from "next/image";
import SplitText from "./components/SplitText";
import Galaxy from "./components/Galaxy";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 🌌 Galaxy Background */}
      <div className="absolute inset-0 -z-10">
        <Galaxy mouseRepulsion={true} mouseInteraction={true} density={1.4} glowIntensity={0.4} saturation={0.9} hueShift={250} />
      </div>

      {/* 🧭 NAVBAR */}
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="relative flex items-center justify-center min-h-[95vh] text-white overflow-hidden px-6">
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg space-y-3">
              {/* Baris 1 */}
              <span className="block">
                <SplitText text="Analyze" className="inline-block" delay={0.2} duration={0.6} ease="power3.out" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} />
              </span>

              {/* Baris 2 */}
              <span className="block">
                <SplitText text="Handwriting" className="inline-block" delay={0.4} duration={0.7} ease="power3.out" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} />
              </span>

              {/* Baris 3 (AI) */}
              <span className="block text-yellow-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.6)]">
                <SplitText text="AI" className="inline-block" delay={0.6} duration={0.8} ease="power3.out" from={{ opacity: 0, y: 50 }} to={{ opacity: 1, y: 0 }} />
              </span>
            </div>
            {/* Deskripsi */}
            <p className="text-lg text-white/90 leading-relaxed max-w-lg">Temukan kepribadian dan karakter kalian melalui analisis grafologi yang didukung AI canggih</p>

            {/* Tombol */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button onClick={() => router.push("/login")} className="bg-yellow-400 text-gray-900 font-semibold text-lg px-8 py-3 rounded-xl shadow-[0_10px_25px_rgba(251,191,36,0.3)] hover:bg-yellow-500 transition-all duration-300">
                Mulai Analisis
              </button>
              <button
                onClick={() => router.push("/learn-more")}
                className="border-2 border-white/30 text-white font-semibold text-lg px-8 py-3 rounded-xl hover:bg-white/10 hover:border-white/50 backdrop-blur-md transition-all duration-300"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center">
            <Image src="/Graf.jpeg" alt="AI Graphology Illustration" width={420} height={420} className="rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.3)] object-cover" />
          </div>
        </div>
      </section>

      {/* ===== HANDWRITING ANALYSIS SECTION ===== */}
      <section id="handwriting" className="py-20 bg-gray-50 text-center flex flex-col justify-center relative z-10">
        <h2 className="text-3xl font-bold mb-10">Handwriting Analysis</h2>

        <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-center gap-12 px-8">
          {/* Upload Box */}
          <div className="w-full sm:w-[400px] md:w-[450px] lg:w-[500px] group bg-white rounded-2xl p-8 h-[320px] shadow-md border border-gray-200 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:border-blue-400 transition-all flex flex-col justify-center items-center cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-purple-100/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

            <div className="relative z-10 text-gray-400 flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 mb-4 text-blue-500 transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-600 animate-bounce-slow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h10a4 4 0 004-4M12 12V3m0 0l3 3m-3-3l-3 3" />
              </svg>
              <p className="text-gray-500 font-medium text-lg group-hover:text-blue-600 transition-colors duration-300">Upload Gambar Tulisan</p>
              <p className="text-sm text-gray-400 mt-2">Format: JPG, PNG, JPEG</p>
            </div>
          </div>

          {/* Handwriting Box */}
          <div className="w-full sm:w-[400px] md:w-[450px] lg:w-[500px] bg-white rounded-2xl p-10 h-[320px] shadow-md border border-gray-200 hover:shadow-lg transition-all flex flex-col justify-center items-center">
            <h3 className="text-gray-500 font-medium mb-2">Handwriting</h3>
            <div className="w-full h-32 border border-gray-300 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 bg-black text-white py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Grapholyze</h3>
            <p className="text-gray-400">Platform AI terdepan untuk analisis tulisan tangan dan kepribadian.</p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Menu</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Handwriting Analysis</li>
              <li>Personality Report</li>
              <li>API Integration</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-gray-400">
              <li>grapholyze.ai@gmail.com</li>
              <li>+62 812 3456 7890</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-12 border-t border-gray-700 pt-6">© 2024 Grapholyze. All rights reserved.</div>
      </footer>
    </main>
  );
}
