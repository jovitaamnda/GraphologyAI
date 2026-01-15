"use client";

import Image from "next/image";
import { Brain, Cpu, Code2, Network, BarChart3, Activity, Globe2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <main className="relative min-h-screen pt-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Header */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-24 px-6 text-center relative"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 relative z-10">Tentang Grapholyze</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto relative z-10">Platform AI terdepan untuk analisis tulisan tangan dan kepribadian</p>
      </motion.section>

      {/* About Content */}
      <section className="bg-white/80 backdrop-blur-sm text-gray-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* About Grapholyze */}
          <div className="mb-24">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-indigo-900 mb-8 flex items-center gap-3"
            >
              <Activity className="text-pink-500" />
              Tentang Grapholyze
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <motion.p variants={fadeInUp} className="text-lg text-gray-700 leading-relaxed mb-6">
                  Grapholyze adalah platform inovatif yang menggabungkan ilmu grafologi tradisional dengan teknologi AI modern untuk memberikan analisis kepribadian yang akurat melalui tulisan tangan.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-lg text-gray-700 leading-relaxed mb-8">
                  Kami percaya setiap orang berhak memahami diri mereka lebih dalam, dan teknologi dapat membantu membuat ilmu grafologi lebih mudah diakses oleh semua orang.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex gap-8 text-center bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <BarChart3 className="w-24 h-24 text-indigo-500" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-4xl font-black text-indigo-600 mb-1">95%</h4>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Akurasi</p>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div className="relative z-10">
                    <h4 className="text-4xl font-black text-indigo-600 mb-1">24/7</h4>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Online</p>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div className="relative z-10">
                    <h4 className="text-4xl font-black text-indigo-600 mb-1">1k+</h4>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Analisis</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-10 shadow-lg relative"
              >
                <div className="absolute -top-4 -left-4 bg-white p-3 rounded-full shadow-md">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <p className="italic text-gray-700 text-xl font-medium leading-relaxed relative z-10">
                  "Grapholyze hadir dari keyakinan bahwa tulisan tangan menyimpan jejak kepribadian unik setiap individu. Dengan memadukan grafologi tradisional dan teknologi AI modern, kami ingin membuat analisis kepribadian menjadi lebih mudah,
                  cepat, dan dapat diakses oleh semua orang."
                </p>
              </motion.div>
            </div>
          </div>

          {/* Tim Grapholyze */}
          <div className="mb-24 py-16 border-t border-gray-100 relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-indigo-900 mb-12 text-center"
            >
              Tim Grapholyze
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-gray-600 mb-16 text-lg max-w-3xl mx-auto"
            >
              Tim profesional kami terdiri dari para ahli di bidang rekayasa perangkat lunak, sistem cerdas, dan data processing yang berdedikasi untuk menciptakan solusi terbaik.
            </motion.p>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-4 sm:grid-cols-2 gap-10"
            >
              {team.map((person, i) => (
                <motion.div variants={fadeInUp} key={i} className="flex flex-col items-center text-center group">
                  <div className="relative mb-6 overflow-hidden rounded-full shadow-xl w-40 h-40 ring-4 ring-white ring-offset-2 ring-offset-indigo-50 group-hover:ring-offset-pink-50 transition-all duration-300">
                    <Image
                      src={person.img}
                      alt={person.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/profile.jpeg";
                      }}
                    />
                    <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/20 transition-colors duration-300"></div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mt-2">{person.name}</h4>
                  <p className="text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full text-sm mt-2">{person.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Teknologi Kami */}
          <div className="py-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-indigo-900 mb-12 text-center"
            >
              Teknologi Kami
            </motion.h2>
            <p className="text-center text-gray-600 mb-16 text-lg max-w-3xl mx-auto">
              Menggunakan teknologi AI dan machine learning terdepan untuk memberikan hasil analisis yang akurat dan mendalam.
            </p>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { title: "Computer Vision", desc: "Analisis visual dengan akurasi tinggi", color: "bg-indigo-100", text: "text-indigo-700", icon: <Cpu size={32} /> },
                { title: "Deep Learning", desc: "Neural networks untuk pattern recognition", color: "bg-green-100", text: "text-green-700", icon: <Brain size={32} /> },
                { title: "Software Engineering", desc: "Aplikasi Web responsif dan intuitif", color: "bg-purple-100", text: "text-purple-700", icon: <Code2 size={32} /> },
                { title: "Machine Learning", desc: "Algoritma pembelajaran berkelanjutan", color: "bg-pink-100", text: "text-pink-700", icon: <Network size={32} /> },
              ].map((tech, i) => (
                <motion.div
                  variants={fadeInUp}
                  key={i}
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`${tech.color} ${tech.text} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>{tech.icon}</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">{tech.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{tech.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nilai & Visi */}
      <section className="bg-gradient-to-b from-slate-900 to-indigo-950 py-24 px-6 text-white relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200"
          >
            Visi & Misi
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Visi */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="p-3 bg-blue-500/20 rounded-xl text-blue-300">
                  <Globe2 size={32} />
                </span>
                <h3 className="text-2xl font-bold">Visi Kami</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Menjadi platform grafologi berbasis AI terdepan di dunia yang membuat analisis kepribadian melalui tulisan tangan dapat diakses oleh semua orang dengan mudah, cepat, dan akurat.
              </p>
            </motion.div>

            {/* Misi */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="p-3 bg-purple-500/20 rounded-xl text-purple-300">
                  <Activity size={32} />
                </span>
                <h3 className="text-2xl font-bold">Misi Kami</h3>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-green-400 font-bold">✓</span> Mengintegrasikan ilmu grafologi dengan teknologi AI modern
                </li>
                <li className="flex gap-3">
                  <span className="text-green-400 font-bold">✓</span> Memberikan analisis kepribadian yang akurat dan actionable
                </li>
                <li className="flex gap-3">
                  <span className="text-green-400 font-bold">✓</span> Meningkatkan self-awareness masyarakat melalui teknologi
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl font-bold mb-6">Bergabunglah dengan Ribuan Pengguna Lainnya</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">Temukan insight mendalam tentang kepribadian Anda melalui analisis tulisan tangan dengan teknologi AI</p>
          <button
            onClick={() => router.push("/user/homeanalisis")}
            className="bg-yellow-400 text-gray-900 font-bold px-10 py-4 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Mulai Analisis Sekarang
          </button>
        </motion.div>
      </section>
    </main>
  );
}
