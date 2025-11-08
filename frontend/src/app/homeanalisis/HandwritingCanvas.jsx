"use client";

import { useRef, useState, useEffect } from "react";
import { Pencil, Eraser, Trash2, X } from "lucide-react";

export default function Handwriting() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen"); // "pen" atau "eraser"
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (showCanvas) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#000";
      ctxRef.current = ctx;
    }
  }, [showCanvas]);

  const startDraw = (e) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = ctxRef.current;
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 10;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#000";
    }
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-2xl flex flex-col items-center">
      <h2 className="text-lg font-medium mb-4">Tulis Langsung</h2>
      <button onClick={() => setShowCanvas(true)} className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200">
        Analisis Tulisan
      </button>

      {/* Popup Modal */}
      {showCanvas && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg relative">
            {/* Close button */}
            <button onClick={() => setShowCanvas(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-3">Tulis Tulisanmu ✍️</h3>

            {/* Toolbar */}
            <div className="flex gap-3 mb-4 justify-center">
              <button onClick={() => setTool("pen")} className={`p-2 rounded-lg border ${tool === "pen" ? "bg-green-100 border-green-500" : "border-gray-300"}`}>
                <Pencil size={18} />
              </button>
              <button onClick={() => setTool("eraser")} className={`p-2 rounded-lg border ${tool === "eraser" ? "bg-red-100 border-red-500" : "border-gray-300"}`}>
                <Eraser size={18} />
              </button>
              <button onClick={clearCanvas} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100">
                <Trash2 size={18} />
              </button>
            </div>

            {/* Canvas area */}
            <canvas ref={canvasRef} width={400} height={250} className="border rounded-lg bg-gray-100 cursor-crosshair" onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}></canvas>

            <button onClick={() => setShowCanvas(false)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg w-full">
              Selesai & Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
