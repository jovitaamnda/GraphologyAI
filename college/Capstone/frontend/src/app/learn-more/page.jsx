"use client";

import { motion } from "framer-motion";
import { Sparkles, Upload, PenTool, Brain, Zap, Shield, ArrowRight, Star, Globe } from "lucide-react";
import Link from "next/link";

export default function LearnMore() {
  const features = [
    { icon: Zap, title: "Analisis Instan", desc: "Hasil kepribadian dalam hitungan detik" },
    { icon: Upload, title: "Upload Foto", desc: "Unggah tulisan tangan dari galeri" },
    { icon: PenTool, title: "Tulis Langsung", desc: "Gunakan canvas digital interaktif" },
    { icon: Brain, title: "AI Graphology", desc: "Didukung teknologi AI terdepan" },
    { icon: Shield, title: "100% Aman", desc: "Data pribadi terenkripsi & terlindungi" },
    { icon: Globe, title: "Akses Dimana Saja", desc: "Bisa diakses dari HP, tablet, atau laptop" },
  ];

  const steps = [
    { num: "01", title: "Daftar / Login", desc: "Buat akun dalam 30 detik" },
    { num: "02", title: "Pilih Metode", desc: "Upload foto atau tulis langsung" },
    { num: "03", title: "Tunggu Sebentar", desc: "AI menganalisis tulisan Anda" },
    { num: "04", title: "Lihat Hasil", desc: "Dapatkan laporan kepribadian lengkap!" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white py-24">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-pink-200">Grapholyze AI</h1>
            <p className="text-2xl md:text-4xl font-bold mb-6">Ungkap Rahasia Kepribadian dari Tulisan Tangan</p>
            <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">Teknologi AI terdepan yang menganalisis goresan pena Anda untuk mengungkap karakter, emosi, dan potensi tersembunyi.</p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-800">
            Mengapa Grapholyze?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl shadow-xl p-8 text-center border border-indigo-100 hover:border-purple-300 transition-all"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl md:text-5xl font-black text-center mb-16">
            Cara Kerja Grapholyze
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} className="text-center">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-black border-4 border-white/30">{step.num}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-indigo-100">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-12 text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-8">Siap Mengungkap Diri Anda?</h2>
            <p className="text-xl mb-10 opacity-90">Lebih dari 10.000+ orang telah menemukan kepribadian sejati mereka melalui Grapholyze AI</p>
            <div className="flex items-center justify-center gap-4 mb-10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-10 h-10 fill-yellow-300 text-yellow-300" />
              ))}
              <span className="text-2xl font-bold">4.9/5 dari pengguna</span>
            </div>

            <Link href="/homeanalisis">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-700 font-black text-2xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-indigo-500/50 flex items-center gap-4 mx-auto group"
              >
                Mulai Analisis Sekarang
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-3xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Grapholyze</h3>
            <p className="text-gray-400">
              Capstone Project 2025
              <br />
              oleh <span className="text-purple-400 font-bold">Aisyah, Jovita, Putri, Rhena </span>
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Fitur</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Handwriting Analysis</li>
              <li>Personality Insights</li>
              <li>Real-time AI Processing</li>
              <li>Secure & Private</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Teknologi</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Next.js 14</li>
              <li>Tailwind CSS</li>
              <li>TensorFlow.js</li>
              <li>Framer Motion</li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <p className="text-3xl font-bold text-purple-400 mb-4">10.000+</p>
            <p className="text-gray-400">Pengguna Puas</p>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-500">© 2025 Grapholyze AI • Dibuat dengan cinta oleh Jovita</div>
      </footer>
    </div>
  );
}
