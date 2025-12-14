"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const enneagramData = [
  {
    type: 1,
    name: "The Reformer",
    emoji: "Scales",
    color: "from-rose-500 to-pink-500",
    questions: ["Saya ingin segala sesuatu dilakukan dengan cara yang benar.", "Saya sering merasa tidak puas jika hasil tidak sempurna.", "Saya mudah melihat kesalahan dalam pekerjaan orang lain."],
  },
  {
    type: 2,
    name: "The Helper",
    emoji: "Heart",
    color: "from-pink-500 to-rose-500",
    questions: ["Saya merasa bahagia jika bisa membantu orang lain.", "Saya ingin dicintai dan dibutuhkan.", "Saya sering mengabaikan kebutuhan diri sendiri demi orang lain."],
  },
  {
    type: 3,
    name: "The Achiever",
    emoji: "Trophy",
    color: "from-amber-500 to-orange-500",
    questions: ["Saya ingin dianggap sukses oleh orang lain.", "Saya suka bekerja keras untuk mencapai tujuan.", "Penampilan saya penting agar dilihat baik oleh orang lain."],
  },
  {
    type: 4,
    name: "The Individualist",
    emoji: "Artist Palette",
    color: "from-purple-500 to-indigo-500",
    questions: ["Saya merasa unik dan berbeda dari orang lain.", "Saya sering mengalami perubahan emosi yang kuat.", "Saya ingin mengekspresikan diri dengan cara yang kreatif."],
  },
  {
    type: 5,
    name: "The Investigator",
    emoji: "Magnifying Glass Tilted Left",
    color: "from-cyan-500 to-blue-500",
    questions: ["Saya suka menganalisis sesuatu secara mendalam.", "Saya merasa aman jika memiliki banyak pengetahuan.", "Saya lebih nyaman menyendiri daripada di keramaian."],
  },
  {
    type: 6,
    name: "The Loyalist",
    emoji: "Shield Checkered",
    color: "from-green-500 to-emerald-500",
    questions: ["Saya sering merasa cemas dan khawatir.", "Saya membutuhkan dukungan dan rasa aman dari orang lain.", "Saya cenderung berhati-hati dalam mengambil keputusan."],
  },
  {
    type: 7,
    name: "The Enthusiast",
    emoji: "Party Popper",
    color: "from-yellow-400 to-amber-400",
    questions: ["Saya suka mencoba hal-hal baru.", "Saya mudah bosan dengan rutinitas.", "Saya selalu berusaha mencari pengalaman menyenangkan."],
  },
  {
    type: 8,
    name: "The Challenger",
    emoji: "Fire",
    color: "from-red-600 to-orange-600",
    questions: ["Saya merasa percaya diri untuk memimpin orang lain.", "Saya tidak suka diatur oleh orang lain.", "Saya tegas dalam menyampaikan pendapat."],
  },
  {
    type: 9,
    name: "The Peacemaker",
    emoji: "Dove",
    color: "from-sky-400 to-blue-400",
    questions: ["Saya lebih suka menghindari konflik.", "Saya mudah mengikuti pendapat orang lain agar tidak terjadi pertengkaran.", "Saya ingin hidup dengan damai dan tenang."],
  },
];

export default function EnneagramTest({ onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const totalQuestions = enneagramData.reduce((sum, t) => sum + t.questions.length, 0);

  const handleAnswer = (type, qIndex, score) => {
    const key = `${type}-${qIndex}`;
    setAnswers((prev) => ({ ...prev, [key]: score }));
  };

  const goNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResult = () => {
    const scores = {};
    enneagramData.forEach((t) => {
      scores[t.type] = t.questions.reduce((sum, _, i) => sum + (answers[`${t.type}-${i}`] || 0), 0);
    });

    const winnerType = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
    const winner = enneagramData.find((t) => t.type === parseInt(winnerType));

    setShowResult(true);
    setTimeout(() => onComplete?.(`Tipe ${winner.type} – ${winner.name}`), 1500);
  };

  const currentType = Math.floor(currentQuestionIndex / 3);
  const questionInType = currentQuestionIndex % 3;
  const current = enneagramData[currentType];

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Cek apakah pertanyaan ini sudah dijawab
  const isAnswered = answers[`${current.type}-${questionInType}`] !== undefined;

  if (showResult) {
    const scores = {};
    enneagramData.forEach((t) => {
      scores[t.type] = t.questions.reduce((sum, _, i) => sum + (answers[`${t.type}-${i}`] || 0), 0);
    });
    const winnerType = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
    const winner = enneagramData.find((t) => t.type === parseInt(winnerType));

    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className={`bg-gradient-to-br ${winner.color} p-10 text-white text-center`}>
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-8xl mb-6">
              {winner.emoji}
            </motion.div>
            <h2 className="text-4xl font-bold mb-3">Tipe {winner.type}</h2>
            <p className="text-2xl font-medium opacity-95">{winner.name}</p>
          </div>
          <div className="p-10 text-center">
            <Sparkles className="w-16 h-16 mx-auto text-yellow-500 mb-4 animate-pulse" />
            <p className="text-xl text-gray-700 leading-relaxed">
              Selamat! Kepribadian Enneagram kamu adalah <strong>{winner.name}</strong>.<br />
              AI akan menggabungkan hasil ini dengan analisis tulisan tanganmu untuk hasil yang lebih akurat.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
        {/* Header + Progress */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-3">Tes Kepribadian Enneagram</h2>
          <p className="text-center opacity-90">Pilih jawaban yang paling sesuai dengan dirimu</p>
          <div className="mt-6 bg-white/30 rounded-full h-4 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-yellow-400 to-pink-400" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
          </div>
          <p className="text-sm text-center mt-2">
            {currentQuestionIndex + 1} / {totalQuestions}
          </p>
        </div>

        <div className="p-10">
          <AnimatePresence mode="wait">
            <motion.div key={currentQuestionIndex} initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }} transition={{ type: "spring", stiffness: 100 }} className="space-y-8">
              {/* Type Badge */}
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${current.color} text-white font-bold shadow-lg`}>
                <span className="text-2xl">{current.emoji}</span>
                <span>
                  Tipe {current.type} – {current.name}
                </span>
              </div>

              <h3 className="text-m font-medium text-gray-800 leading-relaxed">{current.questions[questionInType]}</h3>

              {/* Answer Options */}
              <div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto">
                {[
                  { score: 1, label: "Sangat Tidak Sesuai" },
                  { score: 2, label: "Tidak Sesuai" },
                  { score: 3, label: "Netral" },
                  { score: 4, label: "Sesuai" },
                  { score: 5, label: "Sangat Sesuai" },
                ].map((opt) => (
                  <motion.button
                    key={opt.score}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(current.type, questionInType, opt.score)}
                    className={`relative p-6 rounded-2xl font-medium transition-all ${
                      answers[`${current.type}-${questionInType}`] === opt.score ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl ring-4 ring-purple-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {answers[`${current.type}-${questionInType}`] === opt.score && <Check className="w-8 h-8 absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-1" />}
                    <div className="text-3xl font-bold">{opt.score}</div>
                    <div className="text-xs mt-1">{opt.label.split(" ")[0]}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              onClick={goBack}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all ${
                currentQuestionIndex === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:shadow-lg"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
              Kembali
            </button>

            <button
              onClick={goNext}
              disabled={!isAnswered}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all ${
                !isAnswered ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-2xl"
              }`}
            >
              {currentQuestionIndex === totalQuestions - 1 ? "Selesai" : "Lanjut"}
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6 text-sm text-gray-700">
        <p className="font-semibold text-indigo-800 mb-2">Tips menjawab:</p>
        <ul className="space-y-1 text-gray-600">
          <li>Jawab dengan jujur, bukan yang "seharusnya"</li>
          <li>Pilih yang paling sering kamu rasakan</li>
          <li>Tidak ada jawaban benar/salah</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
