"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, PenTool, Heart, CheckCircle2, Download, Share2 } from "lucide-react";

export default function HasilAnalisis({ image, enneagram }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto">
      {/* Hero Hasil */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-90" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative p-12 text-white text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }} className="inline-block">
            <Sparkles className="w-20 h-20 mx-auto mb-6 text-yellow-300 animate-pulse" />
          </motion.div>

          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-5xl md:text-6xl font-bold mb-4">
            Analisis Selesai!
          </motion.h1>

          <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="text-xl md:text-2xl opacity-95">
            AI telah menggabungkan tulisan tangan + kepribadian Enneagram kamu
          </motion.p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* Tulisan Tangan */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-5 text-white flex items-center gap-3">
            <PenTool className="w-8 h-8" />
            <span className="text-xl font-bold">Tulisan Tangan Kamu</span>
          </div>
          <div className="p-8">
            <img src={image} alt="Tulisan tangan" className="w-full rounded-2xl shadow-xl border-4 border-gray-100" />
          </div>
        </motion.div>

        {/* Hasil Enneagram */}
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-5 text-white flex items-center gap-3">
            <Brain className="w-8 h-8" />
            <span className="text-xl font-bold">Kepribadian Enneagram</span>
          </div>
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">Heart</div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{enneagram || "Menunggu hasil..."}</h3>
            <p className="mt-4 text-gray-600">
              Kamu adalah jiwa yang <strong>penuh empati, hangat, dan selalu siap membantu</strong>.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Analisis Gabungan AI */}
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }} className="mt-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-10 border border-white/50 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg">
            <Brain className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Kesimpulan AI</h2>
            <p className="text-gray-600">Berdasarkan graphology + Enneagram</p>
          </div>
        </div>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            <CheckCircle2 className="w-6 h-6 text-green-500 inline-block mr-3" />
            Tulisan tanganmu menunjukkan <strong>tekanan sedang hingga kuat</strong> → kamu orang yang <strong>penuh energi dan emosional</strong>.
          </p>
          <p>
            <CheckCircle2 className="w-6 h-6 text-green-500 inline-block mr-3" />
            Kemiringan tulisan ke kanan → <strong>ekstrovert, hangat, dan mudah bersosialisasi</strong>.
          </p>
          <p>
            <CheckCircle2 className="w-6 h-6 text-green-500 inline-block mr-3" />
            Gabungan dengan hasil Enneagram <strong>{enneagram}</strong> mengkonfirmasi bahwa kamu adalah <strong>jiwa yang peduli, kreatif, dan selalu ingin membuat orang lain bahagia</strong>.
          </p>
          <p className="text-xl font-semibold text-indigo-700 mt-8">Kamu adalah harta karun bagi orang-orang di sekitarmu Heart</p>
        </div>
      </motion.div>

      {/* Tombol Aksi */}
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-3 group">
          <Download className="w-6 h-6" />
          Download PDF Hasil
          <span className="group-hover:translate-x-2 transition-transform">→</span>
        </button>

        <button className="px-8 py-4 bg-white/90 backdrop-blur border-2 border-purple-300 text-purple-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-3">
          <Share2 className="w-6 h-6" />
          Bagikan ke Teman
        </button>
      </motion.div>

      {/* Credit */}
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-center mt-12 text-gray-500">
        Dibuat dengan Love oleh GraphologyAI • Capstone Project 2025
      </motion.p>
    </motion.div>
  );
}
