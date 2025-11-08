"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import HandwritingAnalysisSection from "./components/HandwritingAnalysisSection";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Jika URL mengandung hash (mis. /#handwriting), scroll ke element tersebut setelah mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash) {
      // delay sedikit supaya DOM sudah ter-render
      setTimeout(() => {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, []);

  return (
    // beri pt supaya navbar fixed tidak menutup konten
    <main className="relative min-h-screen overflow-hidden pt-20">
      {/* ✨ Loading shimmer */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a1a] transition-opacity duration-700">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Navbar />
      {/* PENTING: setiap section harus memiliki id yang sesuai */}
      <HeroSection id="home" />
      <HandwritingAnalysisSection id="handwriting" />
      <AboutSection id="about" />
      <Footer />
    </main>
  );
}
