"use client";

import Image from "next/image";
import { Brain, Cpu, Code2, Network } from "lucide-react";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  const handleStartAnalysis = () => {
    router.push("/user/homeanalisis");
  };

  const team = [
    { name: "Rhena Tabella", role: "Rekayasa Perangkat Lunak", img: "/team/rhena.jpeg" },
    { name: "Jovita Amanda", role: "Rekayasa Perangkat Lunak", img: "/team/jovita.jpeg" },
    { name: "Putri Syabilah", role: "Sistem Cerdas", img: "/team/putri.jpeg" },
    { name: "Aisyah Nurfadilah", role: "Data Processing", img: "/team/aisyah.jpeg" },
  ];

  return (
    <main className="relative min-h-screen pt-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Tentang Grapholyze</h1>
        <p className="text-xl opacity-90">Platform AI terdepan untuk analisis tulisan tangan dan kepribadian</p>
      </section>

      {/* About Content */}
      <section className="bg-white text-gray-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* About Grapholyze */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-indigo-900 mb-6">Tentang Grapholyze</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Grapholyze adalah platform inovatif yang menggabungkan ilmu grafologi tradisional dengan teknologi AI modern untuk memberikan analisis kepribadian yang akurat melalui tulisan tangan.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Kami percaya setiap orang berhak memahami diri mereka lebih dalam, dan teknologi dapat membantu membuat ilmu grafologi lebih mudah diakses oleh semua orang.
                </p>
                <div className="flex gap-8 text-center">
                  <div>
                    <h4 className="text-3xl font-bold text-indigo-500">95%</h4>
                    <p className="text-gray-600">Akurasi</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-indigo-500">24/7</h4>
                    <p className="text-gray-600">Online</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-indigo-500">1k+</h4>
                    <p className="text-gray-600">Analisis</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm">
                <p className="italic text-gray-700 text-lg">
                  "Grapholyze hadir dari keyakinan bahwa tulisan tangan menyimpan jejak kepribadian unik setiap individu. Dengan memadukan grafologi tradisional dan teknologi AI modern, kami ingin membuat analisis kepribadian menjadi lebih mudah,
                  cepat, dan dapat diakses oleh semua orang."
                </p>
              </div>
            </div>
          </div>

          {/* Tim Grapholyze */}
          <div className="mb-20 py-16 border-t border-gray-200">
            <h2 className="text-4xl font-bold text-indigo-900 mb-12 text-center">Tim Grapholyze</h2>
            <p className="text-center text-gray-600 mb-16 text-lg max-w-3xl mx-auto">
              Tim profesional kami terdiri dari para ahli di bidang rekayasa perangkat lunak, sistem cerdas, dan data processing yang berdedikasi untuk menciptakan solusi terbaik.
            </p>

            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10">
              {team.map((person, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="relative mb-4 overflow-hidden rounded-full shadow-lg w-32 h-32">
                    <Image
                      src={person.img}
                      alt={person.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/profile.jpeg";
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mt-4">{person.name}</h4>
                  <p className="text-indigo-600 font-medium">{person.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Teknologi Kami */}
          <div className="py-16 border-t border-gray-200">
            <h2 className="text-4xl font-bold text-indigo-900 mb-12 text-center">Teknologi Kami</h2>
            <p className="text-center text-gray-600 mb-16 text-lg max-w-3xl mx-auto">
              Menggunakan teknologi AI dan machine learning terdepan untuk memberikan hasil analisis yang akurat dan mendalam.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { title: "Computer Vision", desc: "Analisis visual dengan akurasi tinggi", color: "bg-indigo-200", icon: <Cpu size={32} className="text-indigo-700" /> },
                { title: "Deep Learning", desc: "Neural networks untuk pattern recognition", color: "bg-green-200", icon: <Brain size={32} className="text-green-700" /> },
                { title: "Rekayasa Perangkat Lunak", desc: "Aplikasi Web responsif dan intuitif", color: "bg-purple-200", icon: <Code2 size={32} className="text-purple-700" /> },
                { title: "Machine Learning", desc: "Algoritma pembelajaran berkelanjutan", color: "bg-violet-200", icon: <Network size={32} className="text-violet-700" /> },
              ].map((tech, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <div className={`${tech.color} w-20 h-20 rounded-full flex items-center justify-center mb-4`}>{tech.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{tech.title}</h4>
                  <p className="text-gray-600 text-sm">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nilai & Visi */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-indigo-900 mb-12 text-center">Visi & Misi</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Visi */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">🎯 Visi Kami</h3>
              <p className="text-gray-700 leading-relaxed">
                Menjadi platform grafologi berbasis AI terdepan di dunia yang membuat analisis kepribadian melalui tulisan tangan dapat diakses oleh semua orang dengan mudah, cepat, dan akurat.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">💼 Misi Kami</h3>
              <ul className="text-gray-700 space-y-3">
                <li>✓ Mengintegrasikan ilmu grafologi dengan teknologi AI modern</li>
                <li>✓ Memberikan analisis kepribadian yang akurat dan actionable</li>
                <li>✓ Meningkatkan self-awareness masyarakat melalui teknologi</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Bergabunglah dengan Ribuan Pengguna Lainnya</h2>
        <p className="text-lg opacity-90 mb-8">Temukan insight mendalam tentang kepribadian Anda melalui analisis tulisan tangan dengan teknologi AI</p>
        <button
          onClick={() => router.push("/user/homeanalisis")}
          className="bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-yellow-500 transition-all duration-300 shadow-lg"
        >
          Mulai Analisis Sekarang
        </button>
      </section>
    </main>
  );
}
