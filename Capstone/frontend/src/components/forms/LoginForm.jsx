"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/api";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // tetap ada (UI)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // VALIDASI FORM
  // =========================
  const validateForm = () => {
    if (!email.trim()) {
      setError("Email tidak boleh kosong");
      return false;
    }
    if (!email.includes("@")) {
      setError("Format email tidak valid");
      return false;
    }
    if (!password) {
      setError("Password tidak boleh kosong");
      return false;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return false;
    }
    return true;
  };

  // =========================
  // SUBMIT LOGIN (COOKIE AUTH)
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;
    setLoading(true);

    try {
      /**
       * 1️⃣ LOGIN
       * Backend akan SET COOKIE httpOnly (token)
       * Tidak ada token di response JSON
       */
      await authApi.login(email, password);

      /**
       * 2️⃣ AMBIL USER DARI COOKIE
       * Cookie otomatis dikirim oleh browser
       */
      const userProfile = await authApi.getProfile();

      /**
       * 3️⃣ SIMPAN USER KE AUTH CONTEXT
       * (TANPA TOKEN)
       */
      login({
        id: userProfile._id || userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role || "user",
        photo: userProfile.photo,
      });

      /**
       * 4️⃣ REDIRECT BERDASARKAN ROLE
       */
      if (userProfile.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err.message || "Gagal login, silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ERROR MESSAGE */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-100/20 border border-red-300 rounded-2xl text-red-400">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* EMAIL */}
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="example@gmail.com"
          autoComplete="email"
          className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        />
      </div>

      {/* PASSWORD */}
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="current-password"
          className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition">
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {/* INGAT SAYA */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-purple-200 cursor-pointer">
          <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="accent-purple-500 w-4 h-4 rounded" />
          Ingat saya
        </label>

        <a href="/forgot-password" className="text-purple-300 hover:text-white transition">
          Lupa password?
        </a>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-400 disabled:to-pink-400 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Memproses...
          </>
        ) : (
          "Masuk"
        )}
      </button>
    </form>
  );
}
