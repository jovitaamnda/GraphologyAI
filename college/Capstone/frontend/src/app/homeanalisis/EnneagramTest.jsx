"use client";

import { useState } from "react";

export default function EnneagramTest({ onComplete }) {
  const enneagramQuestions = {
    1: {
      name: "Tipe 1 – The Reformer (Perfeksionis)",
      questions: [" Saya ingin segala sesuatu dilakukan dengan cara yang benar.", " Saya sering merasa tidak puas jika hasil tidak sempurna.", " Saya mudah melihat kesalahan dalam pekerjaan orang lain."],
    },
    2: {
      name: "Tipe 2 – The Helper (Penolong)",
      questions: [" Saya merasa bahagia jika bisa membantu orang lain.", " Saya ingin dicintai dan dibutuhkan.", " Saya sering mengabaikan kebutuhan diri sendiri demi orang lain."],
    },
    3: {
      name: "Tipe 3 – The Achiever (Pencapai)",
      questions: [" Saya ingin dianggap sukses oleh orang lain.", " Saya suka bekerja keras untuk mencapai tujuan.", " Penampilan saya penting agar dilihat baik oleh orang lain."],
    },
    4: {
      name: "Tipe 4 – The Individualist (Romantis)",
      questions: [" Saya merasa unik dan berbeda dari orang lain.", " Saya sering mengalami perubahan emosi yang kuat.", " Saya ingin mengekspresikan diri dengan cara yang kreatif."],
    },
    5: {
      name: "Tipe 5 – The Investigator (Pengamat)",
      questions: ["Saya suka menganalisis sesuatu secara mendalam.", "Saya merasa aman jika memiliki banyak pengetahuan.", " Saya lebih nyaman menyendiri daripada di keramaian."],
    },
    6: {
      name: "Tipe 6 – The Loyalist (Loyal)",
      questions: [" Saya sering merasa cemas dan khawatir.", " Saya membutuhkan dukungan dan rasa aman dari orang lain.", "   Saya cenderung berhati-hati dalam mengambil keputusan."],
    },
    7: {
      name: "Tipe 7 – The Enthusiast (Antusias)",
      questions: [" Saya suka mencoba hal-hal baru.", " Saya mudah bosan dengan rutinitas.", "  Saya selalu berusaha mencari pengalaman menyenangkan."],
    },
    8: {
      name: "Tipe 8 – The Challenger (Penantang)",
      questions: [" Saya merasa percaya diri untuk memimpin orang lain.", "Saya tidak suka diatur oleh orang lain.", "Saya tegas dalam menyampaikan pendapat."],
    },
    9: {
      name: "Tipe 9 – The Peacemaker (Pendamai)",
      questions: [" Saya lebih suka menghindari konflik.", " Saya mudah mengikuti pendapat orang lain agar tidak terjadi pertengkaran.", "Saya ingin hidup dengan damai dan tenang."],
    },
  };

  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const handleAnswer = (type, index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [`${type}-${index}`]: value,
    }));
  };

  const handleSubmit = () => {
    const scores = {};
    Object.keys(enneagramQuestions).forEach((type) => {
      const typeAnswers = Object.keys(answers)
        .filter((key) => key.startsWith(type + "-"))
        .map((key) => answers[key]);
      const total = typeAnswers.reduce((a, b) => a + b, 0);
      scores[type] = total;
    });

    // Cari tipe dengan skor tertinggi
    const bestType = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));

    setFinished(true);
    onComplete?.(enneagramQuestions[bestType].name);
  };

  if (finished) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Hasil Tes Kepribadian Kamu 🎯</h2>
        <p className="text-lg text-gray-700">
          {Object.keys(answers).length > 0
            ? "Kamu cenderung memiliki kepribadian " + Object.values(enneagramQuestions).find((q, i) => Object.keys(enneagramQuestions)[i] === Object.keys(enneagramQuestions).find((key, index) => index === parseInt(bestType) - 1))?.name
            : ""}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">Tes Kepribadian Enneagram</h2>

      <p className="text-sm text-gray-700 mb-6">
        Skala jawaban:
        <ul className="list-none mt-1 text-gray-600">
          <li>1 = Sangat Tidak Sesuai</li>
          <li>2 = Tidak Sesuai</li>
          <li>3 = Netral</li>
          <li>4 = Sesuai</li>
          <li>5 = Sangat Sesuai</li>
        </ul>
      </p>

      {Object.entries(enneagramQuestions).map(([type, data]) => (
        <div key={type} className="mb-6">
          <h3 className="text-lg font-medium text-indigo-600 mb-3">{data.name}</h3>
          {data.questions.map((q, i) => (
            <div key={i} className="mb-3">
              <p className="text-gray-700 mb-2">{q}</p>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => handleAnswer(type, i, n)}
                    className={`px-3 py-1 rounded-md border transition-all duration-150 ${answers[`${type}-${i}`] === n ? "bg-indigo-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={Object.keys(answers).length < Object.values(enneagramQuestions).reduce((sum, q) => sum + q.questions.length, 0)}
        className={`mt-6 px-6 py-3 w-full rounded-lg font-semibold ${
          Object.keys(answers).length < Object.values(enneagramQuestions).reduce((sum, q) => sum + q.questions.length, 0) ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        Lanjut ke Analisis AI
      </button>
    </div>
  );
}
