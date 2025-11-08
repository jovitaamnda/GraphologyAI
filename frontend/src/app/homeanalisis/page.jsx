"use client";

import { useState } from "react";
import UploadFoto from "./UploadFoto";
import HandwritingCanvas from "./HandwritingCanvas";
import EnneagramTest from "./EnneagramTest";
import HasilAnalisis from "./HasilAnalisis";

export default function HomeAnalisis() {
  const [step, setStep] = useState("upload"); // upload → enneagram → hasil
  const [uploadedImage, setUploadedImage] = useState(null);
  const [enneagramResult, setEnneagramResult] = useState(null);

  const handleUploadComplete = (imageData) => {
    setUploadedImage(imageData);
    setStep("enneagram"); // lanjut ke tes enneagram
  };

  const handleEnneagramComplete = (result) => {
    setEnneagramResult(result);
    setStep("hasil"); // baru tampilkan hasil analisis
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-24">
      <section className="bg-indigo-600 text-white py-16 text-center">
        <h1 className="text-3xl font-bold mb-2">Analisis Tulisan Tangan</h1>
        <p className="text-lg">Upload tulisan tangan Anda, isi Tes Enneagram, lalu dapatkan analisis lengkap AI.</p>
      </section>

      <section className="py-12 px-6 max-w-5xl mx-auto">
        {step === "upload" && (
          <div className="grid md:grid-cols-2 gap-8">
            <UploadFoto onUploadComplete={handleUploadComplete} />
            <HandwritingCanvas onUploadComplete={handleUploadComplete} />
          </div>
        )}

        {step === "enneagram" && <EnneagramTest onComplete={handleEnneagramComplete} />}

        {step === "hasil" && <HasilAnalisis image={uploadedImage} enneagram={enneagramResult} />}
      </section>
    </div>
  );
}
