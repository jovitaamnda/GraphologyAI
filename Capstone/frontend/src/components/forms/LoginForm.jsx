"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      // Call backend API untuk login
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login gagal. Silakan coba lagi.");
        setLoading(false);
        return;
      }

      // Login berhasil - update context dengan role
      login({
        id: data.user?._id || data.user?.id,
        email: data.user?.email,
        name: data.user?.name,
        role: data.user?.role || "user",  // Default role ke 'user' jika tidak ada
        photo: data.user?.photo,
        token: data.token,
      });

      // Store token dan user data di localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify({
          id: data.user?._id || data.user?.id,
          email: data.user?.email,
          name: data.user?.name,
          role: data.user?.role || "user",
          photo: data.user?.photo,
        }));
      }

      setLoading(false);

      // ✅ Redirect berbeda berdasarkan role
      if (data.user?.role === 'admin') {
        router.push("/admin");  // Admin ke dashboard admin
      } else {
        router.push("/user/homeanalisis");  // User ke analysis page
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(`Terjadi kesalahan: ${err.message || 'Silakan coba lagi.'}`);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-100/20 border border-red-300 rounded-2xl text-red-400">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Email */}
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

      {/* Password */}
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

      {/* Submit Button */}
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
