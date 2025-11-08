"use client";

import { useState } from "react";
import { Camera, Upload, CheckCircle } from "lucide-react";

export default function UploadFoto({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) resizeImage(uploadedFile);
  };

  const resizeImage = (uploadedFile) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 500;
        canvas.height = 200;
        ctx.drawImage(img, 0, 0, 500, 200);
        const resized = canvas.toDataURL("image/jpeg");
        setFile(resized);
        setPreview(resized);
        setUploaded(true);
      };
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleSubmit = () => {
    if (file) onUploadComplete(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) resizeImage(uploadedFile);
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg text-center transition-all duration-300 hover:shadow-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analisis Tulisan Tangan</h1>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all duration-300 ${dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-500"}`}
      >
        {preview ? (
          <div className="flex flex-col items-center">
            <img src={preview} alt="Preview" className="mx-auto rounded-lg shadow-md object-contain max-h-40" />
            <div className="flex items-center gap-2 text-green-600 mt-3">
              <CheckCircle className="w-5 h-5" />
              <p className="font-medium">Upload berhasil</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <Camera className="w-12 h-12 mb-3 text-blue-500" />
            <p className="font-medium">Tarik & letakkan foto tulisan tangan</p>
            <p className="text-sm text-gray-400 mt-1">atau klik untuk memilih file</p>
          </div>
        )}

        {!uploaded && <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!file}
        className={`mt-8 px-6 py-3 rounded-full flex items-center justify-center gap-2 w-full font-semibold transition-all duration-300 ${
          file ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        <Upload className="w-5 h-5" />
        Lanjut ke Tes Enneagram
      </button>
    </div>
  );
}
