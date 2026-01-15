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
   * Antisipasi jika data dibungkus dalam property 'data' oleh Axios
   * atau jika data langsung berada di root object
   */
  const rawData = analysis.data ? analysis.data : analysis;

  // Transform backend data format to UI format
  // Convert traits object to array for UI
  const traitsList = rawData.traits ? Object.entries(rawData.traits).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
    value: value
  })) : [];

  const displayData = {
    // Mengambil enneagramType dari backend
    enneagram: rawData.enneagramType || "Tipe Tidak Terdeteksi",
    personality: rawData.personalityType || "Unknown Type",
    aiConfidence: rawData.aiConfidence, // Pass AI score
    traits: traitsList.filter(t => t.label.toLowerCase() !== 'confidence'), // Optional: Hide 'confidence' trait if user wants it purely as AI score
    description: rawData.description || "No description available.",
    image: rawData.imageUrl || rawData.canvasData,
    recommendations: [
      "Manfaatkan kekuatan unique Anda",
      "Terus kembangkan potensi diri",
      "Jaga keseimbangan emosi dan logika"
    ]
  };

  // Function to download PDF
  const handleDownloadPDF = async () => {
    try {
      const response = await client.get(`/api/analysis/${rawData._id}/pdf`, {
        responseType: 'blob'
      });

      // Create blob link to download
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
      {/* Image Preview */}
      {displayData.image && (
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tulisan Tangan Anda</h3>
          <img
            src={displayData.image}
            alt="Tulisan tangan"
            className="mx-auto rounded-md shadow-md max-h-64 object-contain"
          />
        </div>
      )}

      {/* Personality Result Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-2">Hasil Analisis AI</h2>

        {/* Badge Tipe Enneagram */}
        <div className="mt-2 mb-4 inline-block bg-white text-indigo-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
          {displayData.enneagram}
        </div>

        <p className="text-xl opacity-90">{displayData.personality}</p>

        {/* AI Confidence Badge */}
        {displayData.aiConfidence && (
          <div className="mt-3 text-sm bg-white/20 inline-block px-3 py-1 rounded-full border border-white/30">
            Akurasi AI: {displayData.aiConfidence > 1 ? displayData.aiConfidence : (displayData.aiConfidence * 100).toFixed(0)}%
          </div>
        )}
      </div>

      {/* Traits Visualization */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Profil Kepribadian</h3>
        <div className="space-y-5">
          {displayData.traits.length > 0 ? (
            displayData.traits.map((trait, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">{trait.label}</span>
                  <span className="text-indigo-600 font-semibold">{trait.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${trait.value}%` }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">Data profil belum tersedia.</p>
          )}
        </div>
      </div>

      {/* Description / Interpretation */}
      <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-3">Interpretasi Hasil</h3>
        <p className="text-gray-700 leading-relaxed">{displayData.description}</p>
      </div>

      {/* Recommendations */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Rekomendasi Pengembangan Diri</h3>
        <ul className="space-y-4">
          {displayData.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <p className="text-gray-700 pt-1">{rec}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Section - DOWNLOAD PDF */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-3">Simpan Hasil Analisis</h3>
        <p className="mb-6 opacity-90">
          Unduh hasil analisis lengkap Anda dalam format PDF untuk referensi di masa mendatang.
        </p>
        <button
          onClick={handleDownloadPDF}
          className="bg-white text-indigo-600 px-8 py-3 font-semibold rounded-lg hover:bg-gray-100 transition shadow-md flex items-center justify-center gap-2 mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
}