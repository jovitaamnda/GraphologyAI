"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Eraser, Trash2, Undo2, Download, ChevronRight } from "lucide-react";

export default function HandwritingCanvas({ onUploadComplete }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen"); // "pen" | "eraser"
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [hasDrawing, setHasDrawing] = useState(false);

  // Inisialisasi canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = 400;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    const ctx = ctxRef.current;

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    onUploadComplete(dataURL);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white rounded-t-3xl">
          <h2 className="text-2l font-bold flex items-center gap-3">
            <Pencil className="w-8 h-8" />
            Tulis Langsung di Layar
          </h2>
          <p className="text-purple-100 mt-1">Gunakan stylus atau jari untuk hasil terbaik</p>
        </div>

        <div className="p-8 pb-12">
          {/* Floating Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur rounded-2xl px-4 py-3 shadow-lg border border-white/30">
              <button onClick={() => setTool("pen")} className={`p-3 rounded-xl transition-all ${tool === "pen" ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
                <Pencil className="w-5 h-5" />
              </button>

              <button onClick={() => setTool("eraser")} className={`p-3 rounded-xl transition-all ${tool === "eraser" ? "bg-red-500 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
                <Eraser className="w-5 h-5" />
              </button>

              <div className="w-px h-8 bg-gray-300 mx-1" />

              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer overflow-hidden border-2 border-white shadow" disabled={tool === "eraser"} />

              <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} className="w-24 accent-purple-600" disabled={tool === "eraser"} />

              <button onClick={clearCanvas} className="p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200 bg-gray-50">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-96 md:h-96 touch-none cursor-crosshair"
              style={{ background: "white" }}
            />

            {!hasDrawing && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-2xl font-medium text-gray-400">Mulai menulis di sini...</p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <AnimatePresence>
            {hasDrawing && (
              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={saveDrawing}
                className="mt-8 w-full py-5 px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
              >
                <span>Lanjut ke Tes Enneagram</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tips */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-5 text-sm text-gray-700">
        <p className="font-semibold text-purple-800 mb-2">Tips menulis yang bagus:</p>
        <ul className="space-y-1 text-gray-600 text-sm">
          <li>• Tulis paragraf bebas (minimal 3-4 kalimat)</li>
          <li>• Gunakan tekanan tangan seperti biasa</li>
          <li>• Gaya tulisan asli = hasil analisis lebih akurat!</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
