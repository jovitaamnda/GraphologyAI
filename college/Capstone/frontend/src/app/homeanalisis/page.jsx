"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadFoto from "./UploadFoto";
import HandwritingCanvas from "./HandwritingCanvas";
import EnneagramTest from "./EnneagramTest";
import HasilAnalisis from "./HasilAnalisis";
import { ArrowRight, Sparkles, PenTool, Brain } from "lucide-react";

export default function HomeAnalisis() {
  const [step, setStep] = useState("upload");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [enneagramResult, setEnneagramResult] = useState(null);

  const handleUploadComplete = (imageData) => {
    setUploadedImage(imageData);
    setStep("enneagram");
  };

  const handleEnneagramComplete = (result) => {
    setEnneagramResult(result);
    setStep("hasil");
  };

  const steps = [
    { id: "upload", title: "Upload Tulisan", icon: PenTool },
    { id: "enneagram", title: "Tes Enneagram", icon: Brain },
    { id: "hasil", title: "Hasil Analisis", icon: Sparkles },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-6 py-24 text-center text-white">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6l font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">Analisis Tulisan Tangan + Enneagram</h1>
          <p className="text-xl md:text-2l opacity-95 max-w-2xl mx-auto">Ungkap kepribadianmu lewat coretan tangan dan jawaban jujur. AI kami akan menggabungkan graphology + Enneagram dalam satu analisis mendalam!</p>
        </motion.div>
      </section>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isActive = index === currentStepIndex;
              const isDone = index < currentStepIndex;

              return (
                <div key={s.id} className="flex items-center flex-1 justify-center">
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: isActive ? 1.2 : 1 }} className="flex flex-col items-center">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isDone ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white" : isActive ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg" : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {isDone ? "✓" : <Icon className="w-7 h-7" />}
                    </div>
                    <p className={`mt-2 text-sm font-medium ${isActive ? "text-indigo-600" : "text-gray-500"}`}>{s.title}</p>
                  </motion.div>

                  {index < steps.length - 1 && <div className={`flex-1 h-1 mx-4 transition-all duration-700 ${isDone ? "bg-gradient-to-r from-emerald-400 to-teal-500" : "bg-gray-200"}`} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-14 px-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {step === "upload" && (
            <motion.div key="upload" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="grid md:grid-cols-2 gap-10">
              <UploadFoto onUploadComplete={handleUploadComplete} />
              <HandwritingCanvas onUploadComplete={handleUploadComplete} />
            </motion.div>
          )}

          {/* Step 2: Enneagram Test */}
          {step === "enneagram" && (
            <motion.div key="enneagram" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
                <EnneagramTest onComplete={handleEnneagramComplete} />
              </div>
            </motion.div>
          )}

          {/* Step 3: Hasil */}
          {step === "hasil" && (
            <motion.div key="hasil" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, type: "spring", stiffness: 100 }}>
              <HasilAnalisis image={uploadedImage} enneagram={enneagramResult} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tombol Kembali */}
        {step !== "upload" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setStep(currentStepIndex === 1 ? "upload" : "enneagram")}
            className="mt-8 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            <ArrowRight className="rotate-180 w-5 h-5" />
            Kembali ke langkah sebelumnya
          </motion.button>
        )}
      </section>
    </div>
  );
}
