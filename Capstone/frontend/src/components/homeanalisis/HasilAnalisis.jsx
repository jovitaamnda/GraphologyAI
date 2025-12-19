"use client";

export default function HasilAnalisis({ image }) {
  // Mock data untuk hasil analisis
  const mockAnalysis = {
    personality: "Analitis dan Detail-Oriented",
    traits: [
      { label: "Kesungguhan", value: 85 },
      { label: "Perhatian pada Detail", value: 90 },
      { label: "Kestabilan Emosi", value: 78 },
      { label: "Kreativitas", value: 72 },
      { label: "Kepemimpinan", value: 68 },
    ],
    description:
      "Berdasarkan analisis tulisan tangan Anda, Anda menunjukkan karakteristik seorang individu yang fokus, reflektif, dan memiliki perhatian tinggi terhadap detail. Gaya tulisan Anda mencerminkan kedisiplinan dan konsistensi dalam pendekatan terhadap tugas-tugas.",
    recommendations: [
      "Manfaatkan kekuatan analitis Anda dalam pekerjaan yang memerlukan presisi",
      "Kembangkan fleksibilitas dalam menghadapi situasi yang tidak terduga",
      "Terus ajarkan diri untuk melihat gambaran besar, bukan hanya detail",
    ],
  };

  return (
    <div className="space-y-8">
      {/* Image Preview */}
      {image && (
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tulisan Tangan Anda</h3>
          <img src={image} alt="Tulisan tangan" className="mx-auto rounded-md shadow-md max-h-64 object-contain" />
        </div>
      )}

      {/* Personality Result */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-2">Hasil Analisis AI</h2>
        <p className="text-xl opacity-90">{mockAnalysis.personality}</p>
      </div>

      {/* Traits Visualization */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Profil Kepribadian</h3>
        <div className="space-y-5">
          {mockAnalysis.traits.map((trait, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">{trait.label}</span>
                <span className="text-indigo-600 font-semibold">{trait.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500" style={{ width: `${trait.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-3">Interpretasi Hasil</h3>
        <p className="text-gray-700 leading-relaxed">{mockAnalysis.description}</p>
      </div>

      {/* Recommendations */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Rekomendasi Pengembangan Diri</h3>
        <ul className="space-y-4">
          {mockAnalysis.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">{idx + 1}</div>
              <p className="text-gray-700 pt-1">{rec}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-3">Ingin Analisis Lebih Mendalam?</h3>
        <p className="mb-6 opacity-90">Hubungi konsultan kami untuk interpretasi hasil yang lebih detail dan personalized insights.</p>
        <button className="bg-white text-indigo-600 px-8 py-3 font-semibold rounded-lg hover:bg-gray-100 transition">
          Hubungi Kami
        </button>
      </div>
    </div>
  );
}
