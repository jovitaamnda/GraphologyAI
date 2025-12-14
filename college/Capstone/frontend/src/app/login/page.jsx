"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Sparkles, Zap, Shield, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // === LOGIN KE BACKEND MONGO ===
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ADMIN KE /admin, USER BIASA KE HOMEPAGE
        if (data.user.email === "admin@gmail.com") {
          router.push("/admin");
        } else {
          router.push("/"); // ke page.js di root
        }
      } else {
        setError(data.message || "Email atau password salah");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };
  // === ADMIN DEMO (langsung kasih token admin) ===
  const masukSebagaiAdmin = () => {
    // Simulasi login admin tanpa password
    localStorage.setItem("token", "admin-demo-token-2025");
    localStorage.setItem("user", JSON.stringify({ email: "admin@grapholyze.com", name: "Admin Demo" }));
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }} className="inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6">
              <Sparkles className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-6xl font-black text-white mb-3">Grapholyze</h1>
            <p className="text-purple-200 text-xl font-light">Ungkap Kepribadian dari Tulisan Tangan</p>
          </motion.div>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-10">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Selamat Datang Kembali</h2>

          {error && <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-xl text-center mb-4">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="email"
                  placeholder="masukan@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-purple-200 text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-5 h-5 text-purple-300" /> : <Eye className="w-5 h-5 text-purple-300" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-purple-200">
                <input type="checkbox" className="rounded" />
                Ingat saya
              </label>
              <a href="#" className="text-purple-300 hover:text-white transition">
                Lupa password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-purple-600/50 flex items-center justify-center gap-3 group disabled:opacity-70"
            >
              <LogIn className="w-6 h-6" />
              {loading ? "Memproses..." : "Masuk ke Grapholyze"}
              <Zap className="w-6 h-6 group-hover:translate-x-1 transition" />
            </motion.button>
          </form>

          <div className="my-8 text-center text-purple-300">
            Belum punya akun?{" "}
            <a href="/register" className="font-bold text-white hover:underline">
              Daftar di sini
            </a>
          </div>

          {/* Tombol Admin Demo */}
          <div className="pt-8 border-t border-white/10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={masukSebagaiAdmin}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-3 hover:shadow-emerald-500/60 transition"
            >
              <Shield className="w-6 h-6" />
              Masuk sebagai Admin (Demo Sidang)
              <Zap className="w-6 h-6 text-yellow-300" />
            </motion.button>
            <p className="text-center text-purple-300 text-xs mt-3 opacity-70">Hanya untuk presentasi sidang</p>
          </div>
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="text-center mt-12 text-purple-100">
          <p className="text-sm opacity-80 mb-2">© 2025 Grapholyze AI • Capstone Project 2025</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">GraphoTeam</p>
          <p className="text-purple-200 text-base mt-3 font-medium">Aisyah • Jovita • Putri • Rhena</p>
          <p className="text-purple-300 text-xs mt-4 opacity-70">Dibuat dengan cinta, kopi, dan deadline sidang</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
