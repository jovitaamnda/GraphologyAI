"use client";

import { useEffect } from "react";
import client from "@/api/client";

export default function HasilAnalisis({ analysis }) {
  // Debugging untuk melihat struktur data di console browser
  useEffect(() => {
    console.log("Data analysis yang diterima component:", analysis);
  }, [analysis]);

  if (!analysis) return null;

  /**
   * Normalisasi Data
   */
  const rawData = analysis.data ? analysis.data : analysis;

  // Persiapan Data untuk Tampilan
  const displayData = {
    enneagram: rawData.enneagramType || "Tipe Tidak Terdeteksi",
    personality: rawData.personalityType || "Unknown Type",
    description: rawData.description || "Deskripsi tidak tersedia.",
    // Ambil Confidence Score Asli dari AI
    confidence: rawData.aiConfidence ? (rawData.aiConfidence > 1 ? rawData.aiConfidence : (rawData.aiConfidence * 100).toFixed(0)) : (rawData.confidenceScore ? parseFloat(rawData.confidenceScore).toFixed(2) : "0"),
    // Ambil Data Fitur Grafologi (Slant, Size, dll)
    features: rawData.graphologyAnalysis || null,
    image: rawData.imageUrl || rawData.canvasData,
    recommendations: [
      "Manfaatkan kekuatan unik tipe kepribadian Anda",
      "Perhatikan area pengembangan diri yang disarankan",
      "Jaga keseimbangan emosi dan logika dalam pengambilan keputusan"
    ]
  };

  // Logika Warna untuk Confidence Level
  const getConfidenceColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100"; // Sangat Yakin
    if (score >= 60) return "text-yellow-600 bg-yellow-100"; // Cukup Yakin
    return "text-red-600 bg-red-100"; // Kurang Yakin
  };

  // Function to download PDF
  const handleDownloadPDF = async () => {
    try {
      const response = await client.get(`/api/analysis/${rawData._id}/pdf`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `Hasil_Analisis_${displayData.enneagram.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Gagal mendownload PDF. Pastikan backend berjalan.");
    }
  };

  return (
    <div className="space-y-8">

      {/* SECTION 1: Image & Confidence Result */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom Kiri: Gambar */}
        {displayData.image && (
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center flex flex-col items-center justify-center">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Citra Tulisan Tangan</h3>
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <img
                src={displayData.image}
                alt="Tulisan tangan user"
                className="max-h-64 object-contain"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 italic">
              Diproses menggunakan Histogram Equalization (HE)
            </p>
          </div>
        )}

        {/* Kolom Kanan: Hasil Utama & Confidence */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden">
          {/* Hiasan Background */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>

          <h2 className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Hasil Prediksi AI</h2>

          {/* Tipe Enneagram */}
          <div className="text-4xl font-extrabold mb-2 text-white">
            {displayData.enneagram}
          </div>
          <div className="text-xl font-medium text-indigo-100 mb-6">
            {displayData.personality}
          </div>

          {/* CONFIDENCE LEVEL INDICATOR (Wajib Ada) */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-indigo-100">Tingkat Keyakinan AI</span>
              <span className="text-2xl font-bold text-white">{displayData.confidence}%</span>
            </div>
            {/* Progress Bar Confidence */}
            <div className="w-full bg-black/20 rounded-full h-2.5">
              <div
                className="bg-green-400 h-2.5 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                style={{ width: `${displayData.confidence}%` }}
              ></div>
            </div>
            <p className="text-xs text-indigo-200 mt-2 text-right">
              *Berdasarkan probabilitas output MobileNetV2
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Interpretasi Deskriptif */}
      <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Interpretasi Kepribadian
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          {displayData.description}
        </p>
      </div>

      {/* SECTION 3: Analisis Fitur Grafologi (The "Scientific" Part) */}
      {/* Menggantikan "Traits" lama dengan Fitur Spesifik dari Backend */}
      {displayData.features && (
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h3 className="text-2xl font-bold text-gray-800">Analisis Fitur Grafologi</h3>
            <p className="text-gray-500 text-sm mt-1">
              Penjelasan karakteristik visual berdasarkan literatur (Howard, 1922 & Lester, 1981) yang diasosiasikan dengan {displayData.enneagram}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fitur 1: Slant (Kemiringan) */}
            <FeatureCard
              label="Kemiringan (Slant)"
              value={displayData.features.slant?.val}
              meaning={displayData.features.slant?.meaning}
              icon="📐"
            />

            {/* Fitur 2: Size (Ukuran) */}
            <FeatureCard
              label="Ukuran Huruf (Size)"
              value={displayData.features.size?.val}
              meaning={displayData.features.size?.meaning}
              icon="🔍"
            />

            {/* Fitur 3: Pressure (Tekanan) - Dengan Note HE */}
            <FeatureCard
              label="Tekanan (Pressure/Shading)"
              value={displayData.features.pressure?.val}
              meaning={displayData.features.pressure?.meaning}
              icon="✒️"
              isHeEnhanced={true} // Special flag untuk HE
            />

            {/* Fitur 4: Baseline */}
            <FeatureCard
              label="Arah Baris (Baseline)"
              value={displayData.features.baseline?.val}
              meaning={displayData.features.baseline?.meaning}
              icon="📈"
            />
          </div>
        </div>
      )}

      {/* SECTION 4: Rekomendasi */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="bg-purple-100 text-purple-600 p-2 rounded-lg text-xl">💡</span>
          Rekomendasi Pengembangan Diri
        </h3>
        <ul className="space-y-3">
          {displayData.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors duration-300">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                {idx + 1}
              </div>
              <p className="text-gray-700 font-medium">{rec}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* SECTION 5: CTA Download */}
      <div className="text-center pt-4 pb-8">
        <button
          onClick={handleDownloadPDF}
          className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg flex items-center justify-center gap-3 mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Unduh Laporan Lengkap (PDF)
        </button>
        <p className="text-sm text-gray-400 mt-3">
          Simpan hasil analisis ini untuk referensi PKM atau konsultasi lebih lanjut.
        </p>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT UNTUK KARTU FITUR ---
function FeatureCard({ label, value, meaning, icon, isHeEnhanced }) {
  if (!value) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-indigo-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h4 className="font-semibold text-gray-700">{label}</h4>
      </div>

      <div className="ml-9">
        <div className="text-indigo-600 font-bold text-lg mb-1">{value}</div>
        <p className="text-sm text-gray-600 leading-snug">{meaning}</p>

        {/* Tampilan Khusus jika fitur ini menggunakan HE (Histogram Equalization) */}
        {isHeEnhanced && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" /></svg>
            Enhanced by Histogram Equalization
          </div>
        )}
      </div>
    </div>
  );
}