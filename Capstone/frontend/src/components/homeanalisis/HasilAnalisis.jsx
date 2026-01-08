"use client";

export default function HasilAnalisis({ analysis }) {
  if (!analysis) return null;

  // Transform backend data format to UI format if needed
  // Backend returns: { personalityType: "...", traits: {...}, description: "..." }

  // Convert traits object to array for UI
  const traitsList = analysis.traits ? Object.entries(analysis.traits).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
    value: value
  })) : [];

  const displayData = {
    personality: analysis.personalityType || "Unknown Type",
    traits: traitsList,
    description: analysis.description || "No description available.",
    image: analysis.imageUrl || analysis.canvasData,
    recommendations: [
      "Manfaatkan kekuatan unique Anda",
      "Terus kembangkan potensi diri",
      "Jaga keseimbangan emosi dan logika"
    ] // Backend can send this too later
  };

  return (
    <div className="space-y-8">
      {/* Image Preview */}
      {displayData.image && (
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tulisan Tangan Anda</h3>
          <img src={displayData.image} alt="Tulisan tangan" className="mx-auto rounded-md shadow-md max-h-64 object-contain" />
        </div>
      )}

      {/* Personality Result */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-2">Hasil Analisis AI</h2>
        <p className="text-xl opacity-90">{displayData.personality}</p>
      </div>

      {/* Traits Visualization */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Profil Kepribadian</h3>
        <div className="space-y-5">
          {displayData.traits.map((trait, idx) => (
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
        <p className="text-gray-700 leading-relaxed">{displayData.description}</p>
      </div>

      {/* Recommendations */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Rekomendasi Pengembangan Diri</h3>
        <ul className="space-y-4">
          {displayData.recommendations.map((rec, idx) => (
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
