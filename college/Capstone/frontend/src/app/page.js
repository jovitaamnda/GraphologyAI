// src/app/page.jsx
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace("#", "");
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <main className="relative min-h-screen pt-20">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a1a]">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Navbar />
      <HeroSection id="home" />
      <HandwritingAnalysisSection id="handwriting" />
      <AboutSection id="about" />
      <Footer />
    </main>
  );
}
