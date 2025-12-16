"use client";

import { useRef, useState, useEffect } from "react";
import { Eraser, Trash2 } from "lucide-react";
import { Pencil } from "lucide-react"; // untuk ikon putih di pen

export default function HandwritingCanvas({ onUploadComplete }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen");
  const [penThickness, setPenThickness] = useState(4); // default medium
  const [hasContent, setHasContent] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const minThickness = 2;
  const maxThickness = 12;
  const eraserThickness = penThickness * 4; // eraser lebih besar

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000000";

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctxRef.current = ctx;
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    if (e.touches) e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = ctxRef.current;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasContent(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    if (e.touches) e.preventDefault();

    const { x, y } = getCoordinates(e);
    const ctx = ctxRef.current;

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = eraserThickness;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = penThickness;
      ctx.strokeStyle = "#000000";
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
  };

  const handleSubmit = () => {
    if (hasContent) {
      const imageData = canvasRef.current.toDataURL("image/jpeg", 0.95);
      onUploadComplete(imageData);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl mx-auto border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Tulis Langsung di Layar</h2>
        <p className="text-sm text-gray-600 mt-2">Gunakan jari atau stylus</p>
      </div>

      {/* Canvas */}
      <div className="rounded-2xl overflow-hidden shadow-inner border-4 border-dashed border-gray-200 bg-white">
        <canvas
          ref={canvasRef}
          width={700}
          height={400}
          className="w-full h-auto cursor-crosshair touch-none block"
          style={{ touchAction: "none" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {!hasContent && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-400 text-lg font-medium">Mulai menulis di sini ✍️</p>
          </div>
        )}
      </div>

      {/* Toolbar mirip gambar */}
      <div className="mt-8 bg-white rounded-full shadow-lg px-8 py-6 mx-auto max-w-lg">
        <div className="flex items-center justify-between">
          {/* Pen Button - gradient purple rounded */}
          <button onClick={() => setTool("pen")} className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-md ${tool === "pen" ? "scale-110" : ""}`}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500" />
            <Pencil className="w-8 h-8 text-white relative z-10" />
          </button>

          {/* Eraser */}
          <button onClick={() => setTool("eraser")} className={`p-3 rounded-xl transition-all ${tool === "eraser" ? "bg-gray-200 scale-110" : "hover:bg-gray-100"}`}>
            <Eraser className="w-7 h-7 text-gray-700" />
          </button>

          {/* Vertical divider */}
          <div className="h-12 w-px bg-gray-300" />

          {/* Thickness Slider - hanya saat pen */}
          {tool === "pen" && (
            <div className="flex items-center gap-4 flex-1 mx-6">
              <div className="w-8 h-8 rounded-full bg-black/20" /> {/* small dot */}
              <input
                type="range"
                min={minThickness}
                max={maxThickness}
                value={penThickness}
                onChange={(e) => setPenThickness(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider-purple"
              />
              <div className="w-12 h-12 rounded-full bg-black" /> {/* large dot */}
            </div>
          )}

          {/* Trash */}
          <button onClick={clearCanvas} className="p-3 rounded-xl hover:bg-red-50 transition-all">
            <Trash2 className="w-7 h-7 text-red-600" />
          </button>
        </div>
      </div>

      {/* Tombol Lanjut */}
      <button
        onClick={handleSubmit}
        disabled={!hasContent}
        className={`mt-8 w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md
          ${hasContent ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
      >
        Lanjut ke Tes Enneagram
      </button>

      {/* Custom slider style */}
      <style jsx>{`
        .slider-purple::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          background: linear-gradient(to bottom right, #a855f7, #ec4899);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(168, 85, 247, 0.4);
        }
        .slider-purple::-moz-range-thumb {
          width: 28px;
          height: 28px;
          background: linear-gradient(to bottom right, #a855f7, #ec4899);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 10px rgba(168, 85, 247, 0.4);
        }
      `}</style>
    </div>
  );
}
