"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const API_URL = "http://localhost:5000";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ⬅️ penting untuk cookie JWT
        body: JSON.stringify({
          email,
          password,
          rememberMe, // ⬅️ dikirim ke backend
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");

      router.push("/");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" />
        <input
          name="email"
          type="email"
          placeholder="example@gmail.com"
          required
          autoComplete="email"
          className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        />
      </div>

      {/* Password */}
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" />
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          autoComplete="current-password"
          className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300">
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {/* Ingat Saya */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-purple-200 cursor-pointer">
          <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="accent-purple-500 w-4 h-4 rounded" />
          Ingat saya
        </label>

        <a href="/forgot-password" className="text-purple-300 hover:text-white transition">
          Lupa password?
        </a>
      </div>

      {/* Error */}
      {error && <p className="text-red-400 text-center text-sm">{error}</p>}

      {/* Submit */}
      <button type="submit" disabled={loading} className={`w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"}`}>
        {loading ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
