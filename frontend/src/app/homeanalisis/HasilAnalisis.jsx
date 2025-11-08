"use client";

export default function HasilAnalisis({ image, enneagram }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Hasil Analisis AI</h2>
      <img src={image} alt="Tulisan tangan" className="mx-auto mb-4 rounded-md shadow-md" width={300} />
      <p className="text-gray-700 mb-2">
        <strong>Hasil Tes Enneagram:</strong> {enneagram}
      </p>
      <p className="text-gray-700">Berdasarkan analisis tulisan tangan dan hasil tes Anda, Anda menunjukkan kecenderungan sebagai individu yang fokus, reflektif, dan analitis.</p>
    </div>
  );
}
