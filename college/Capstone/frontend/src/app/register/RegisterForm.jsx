"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from "lucide-react";

const API_URL = "http://localhost:5000";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi tidak sama");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mendaftar");

      setSuccess(true);
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 2000);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nama */}
      <InputField icon={User} name="name" placeholder="Nama lengkap" />

      {/* Email */}
      <InputField icon={Mail} name="email" type="email" placeholder="example@gmail.com" />

      {/* Password */}
      <PasswordField name="password" placeholder="Minimal 8 karakter" show={showPassword} toggle={() => setShowPassword(!showPassword)} />

      {/* Konfirmasi Password */}
      <PasswordField name="confirmPassword" placeholder="Ulangi password" show={showConfirmPassword} toggle={() => setShowConfirmPassword(!showConfirmPassword)} />

      {/* Error */}
      {error && <p className="text-red-400 text-center text-sm">{error}</p>}

      <button type="submit" disabled={loading} className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl transition">
        {loading ? "Mendaftar..." : "Daftar Sekarang"}
      </button>

      {/* LINK LOGIN */}
      <div className="text-center text-purple-300 text-sm">
        Sudah punya akun?{" "}
        <a href="/login" className="font-semibold text-white hover:underline">
          Masuk
        </a>
      </div>

      {/* SUCCESS */}
      {success && (
        <p className="text-green-400 text-center flex items-center justify-center gap-2">
          <CheckCircle />
          Pendaftaran berhasil!
        </p>
      )}
    </form>
  );
}

/* ========================= */
/* ===== SUB COMPONENT ===== */
/* ========================= */

function InputField({ icon: Icon, type = "text", placeholder, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" />
      <input
        type={type}
        placeholder={placeholder}
        required
        {...props}
        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
      />
    </div>
  );
}

function PasswordField({ show, toggle, placeholder, ...props }) {
  return (
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" />
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        required
        minLength={8}
        {...props}
        className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
      />
      <button type="button" onClick={toggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300">
        {show ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}
