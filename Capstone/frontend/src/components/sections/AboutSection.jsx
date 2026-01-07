"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Brain, Cpu, Code2, Network } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AboutSection() {
  const router = useRouter();
  const { user } = useAuth();

  // Handle tombol "Mulai Analisis"
  const handleStart = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/homeanalisis");
    }
  };

  const team = [
    { name: "Rhena Tabella", role: "Rekayasa Perangkat Lunak", img: "/team/rhena.jpeg" },
    { name: "Jovita Amanda", role: "Rekayasa Perangkat Lunak", img: "/team/jovita.jpeg" },
    { name: "Putri Syabilah", role: "Sistem Cerdas", img: "/team/putri.jpeg" },
    { name: "Aisyah Nurfadilah", role: "Data Processing", img: "/team/aisyah.jpeg" },
  ];

  return (
    <section id="about" className="bg-white text-gray-800">
      {/* Header Section */}
      <div className="bg-indigo-900 text-white text-center py-16">
        <h2 className="text-4xl font-bold mb-3">About Grapholyze</h2>
        <p className="text-lg opacity-90">Memahami kepribadian melalui tulisan tangan dengan teknologi AI</p>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-2xl font-semibold mb-4">About Grapholyze</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Grapholyze adalah platform inovatif yang menggabungkan ilmu grafologi tradisional dengan teknologi AI modern untuk memberikan analisis kepribadian yang akurat melalui tulisan tangan.
          </p>
          <p className="text-gray-700 leading-relaxed">Kami percaya setiap orang berhak memahami diri mereka lebih dalam, dan teknologi dapat membantu membuat ilmu grafologi lebih mudah diakses oleh semua orang.</p>

          <div className="flex gap-8 mt-8 text-center">
            <div>
              <h4 className="text-2xl font-bold text-indigo-500">95%</h4>
              <p className="text-sm text-gray-600">Akurasi</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-indigo-500">24/7</h4>
              <p className="text-sm text-gray-600">Online</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-indigo-500">1k+</h4>
              <p className="text-sm text-gray-600">Analisis</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
          <p className="italic text-gray-700">
            “Grapholyze hadir dari keyakinan bahwa tulisan tangan menyimpan jejak kepribadian unik setiap individu. Dengan memadukan grafologi tradisional dan teknologi AI modern, kami ingin membuat analisis kepribadian menjadi lebih mudah,
            cepat, dan dapat diakses oleh semua orang.”
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-100 py-16 text-center">
        <h3 className="text-3xl font-bold mb-10">Tim Grapholyze</h3>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {team.map((person, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <Image src={person.img} alt={person.name} width={120} height={120} className="rounded-full object-cover shadow-md" />
              <h4 className="text-lg font-semibold mt-4">{person.name}</h4>
              <p className="text-gray-600 text-sm">{person.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Teknologi Kami */}
      <div className="bg-white py-16 text-center">
        <h3 className="text-3xl font-bold mb-4">Teknologi Kami</h3>
        <p className="text-gray-600 mb-10">Menggunakan AI dan machine learning terdepan</p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
          {[
            { title: "Computer Vision", desc: "Analisis visual dengan akurasi tinggi", color: "bg-indigo-200", icon: <Cpu size={32} className="text-indigo-700" /> },
            { title: "Deep Learning", desc: "Neural networks untuk pattern recognition", color: "bg-green-200", icon: <Brain size={32} className="text-green-700" /> },
            { title: "Rekayasa Perangkat Lunak", desc: "Aplikasi Web responsif dan intuitif", color: "bg-purple-200", icon: <Code2 size={32} className="text-purple-700" /> },
            { title: "Machine Learning", desc: "Algoritma pembelajaran berkelanjutan", color: "bg-violet-200", icon: <Network size={32} className="text-violet-700" /> },
          ].map((tech, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className={`${tech.color} w-20 h-20 rounded-full flex items-center justify-center mb-4`}>{tech.icon}</div>
              <h4 className="text-lg font-semibold">{tech.title}</h4>
              <p className="text-gray-600 text-sm">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-900 text-white text-center py-16">
        <h3 className="text-2xl font-semibold mb-4">Siap Memulai?</h3>
        <p className="mb-8 opacity-90">Tentukan kepribadian Anda melalui analisis tulisan tangan dengan AI</p>
        <button onClick={handleStart} className="bg-white text-indigo-600 font-semibold text-lg px-8 py-3 rounded-xl shadow hover:bg-gray-100 transition-all duration-300">
          Mulai Analisis
        </button>
      </div>
    </section>
  );
}
