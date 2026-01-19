"use client";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";

export default function ImageUpload({ onComplete, onError }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      onError("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      onError("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    if (!preview) {
      onError("Please select an image first");
      return;
    }

    // ✅ KIRIM BASE64 KE PARENT (BUKAN KE BACKEND)
    onComplete(preview);
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="border-2 border-gray-300 rounded-2xl p-4">
          <img src={preview} alt="Preview" className="w-full h-64 object-contain rounded-lg" />
        </div>
      ) : (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-purple-500 transition">
          <Upload size={40} className="mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600 font-semibold">Click to upload image</p>
          <p className="text-gray-500 text-sm">PNG, JPG up to 5MB</p>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      <button
        onClick={handleAnalyze}
        disabled={!preview}
        className={`w-full px-4 py-3 font-semibold rounded-2xl transition ${preview ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
      >
        Analyze Image
      </button>
    </div>
  );
}
