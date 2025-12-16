"use client";

import { useState } from "react";
import { Camera, Upload, CheckCircle, Loader2 } from "lucide-react";

export default function UploadFoto({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const resizeImage = (uploadedFile) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 400;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setFile(resizedDataUrl);
        setPreview(resizedDataUrl);
        setIsLoading(false);
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
    const uploadedFile = e.dataTransfer.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      resizeImage(uploadedFile);
    }
  };

  const handleSubmit = () => {
    if (file) onUploadComplete(file);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Upload Foto Tulisan</h2>
        <p className="text-sm text-gray-600 mt-2">Foto tulisan tangan yang jelas</p>
      </div>

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
        className={`relative border-4 border-dashed rounded-2xl transition-all duration-300 cursor-pointer
          ${dragActive ? "border-indigo-500 bg-indigo-50 shadow-xl" : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"}`}
      >
        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" disabled={isLoading} />

        <div className="py-12 px-6 flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-3" />
              <p className="text-indigo-600 font-medium">Memproses...</p>
            </div>
          ) : preview ? (
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-green-300">
                <img src={preview} alt="Preview" className="w-full h-48 object-contain bg-gray-50" />
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1.5">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
              <p className="text-sm text-green-600 font-semibold text-center">Siap dianalisis ✓</p>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full inline-block">
                <Camera className="w-10 h-10 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Tarik foto ke sini</p>
                <p className="text-sm text-gray-500">atau klik untuk pilih</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!file || isLoading}
        className={`mt-6 w-full py-3.5 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md
          ${file && !isLoading ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
        Lanjut ke Tes Enneagram
      </button>

      {preview && <p className="text-center text-xs text-gray-500 mt-4">Gambar otomatis dioptimalkan untuk analisis</p>}
    </div>
  );
}
