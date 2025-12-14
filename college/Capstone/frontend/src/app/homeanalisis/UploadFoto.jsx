"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, CheckCircle, X, Loader2 } from "lucide-react";

export default function UploadFoto({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const resizeImage = (uploadedFile) => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxWidth = 800;
        const maxHeight = 400;
        let { width, height } = img;

        // Maintain aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const resized = canvas.toDataURL("image/jpeg", 0.9);
        setFile(resized);
        setPreview(resized);
        setIsProcessing(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      resizeImage(uploadedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      resizeImage(uploadedFile);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setIsProcessing(false);
  };

  const handleContinue = () => {
    if (file) onUploadComplete(file);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Camera className="w-8 h-8" />
            Upload Foto Tulisan Tangan
          </h2>
          <p className="text-indigo-100 mt-1">Pastikan tulisan jelas & terang</p>
        </div>

        {/* Upload Area */}
        <div className="p-8">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDrop={handleDrop}
            className={`relative border-4 border-dashed rounded-2xl p-12 text-center transition-all duration-500 cursor-pointer
              ${dragActive ? "border-indigo-500 bg-indigo-50/70 shadow-2xl scale-105" : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"} ${isProcessing ? "opacity-75" : ""}`}
          >
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" disabled={isProcessing} />

            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                  <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
                  <p className="text-lg font-medium text-gray-700">Memproses gambar...</p>
                  <div className="w-64 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" initial={{ width: "0%" }} animate={{ width: "80%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} />
                  </div>
                </motion.div>
              ) : preview ? (
                <motion.div key="preview" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative group">
                  <img src={preview} alt="Preview tulisan tangan" className="mx-auto max-h-80 rounded-xl shadow-xl transition-transform duration-300 group-hover:scale-105" />
                  <button onClick={handleReset} className="absolute top-3 right-3 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-4 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Siap dianalisis!</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {dragActive ? (
                    <div className="text-indigo-600">
                      <div className="w-24 h-24 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center animate-pulse">
                        <Upload className="w-12 h-12" />
                      </div>
                      <p className="text-2xl font-bold">Lepas di sini!</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <Camera className="w-12 h-12" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-700">Tarik & letakkan foto di sini</p>
                        <p className="text-gray-500 mt-2">atau klik untuk memilih file</p>
                        <p className="text-sm text-gray-400 mt-3">Format: JPG, PNG • Max 10MB</p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Button */}
          <AnimatePresence>
            {preview && !isProcessing && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                className="mt-8 w-full py-5 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>Lanjut ke Tes Enneagram</span>
                <Upload className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tips Card */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 text-sm text-gray-700">
        <p className="font-semibold text-indigo-800 mb-2">Tips foto yang bagus:</p>
        <ul className="space-y-1 text-gray-600">
          <li>• Letakkan kertas di permukaan datar & terang</li>
          <li>• Pastikan semua tulisan terlihat jelas</li>
          <li>• Hindari bayangan atau lipatan kertas</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
