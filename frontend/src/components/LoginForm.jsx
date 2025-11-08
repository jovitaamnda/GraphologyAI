"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export default function LoginForm() {
  const router = useRouter();

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // ui state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // baca preferensi yang pernah disimpan (agar checkbox mencerminkan pilihan terakhir)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rememberMe");
      if (saved !== null) setRememberMe(saved === "true");
    } catch (e) {
      console.warn("Tidak bisa akses localStorage:", e);
    }
  }, []);

  // simpan preferensi saat berubah (tidak wajib, tapi berguna)
  useEffect(() => {
    try {
      localStorage.setItem("rememberMe", rememberMe ? "true" : "false");
    } catch (e) {
      // ignore
    }
  }, [rememberMe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Pastikan setPersistence dipanggil sebelum signIn...
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);

      // lalu sign in
      const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);

      // simpan preferensi (opsional)
      try {
        localStorage.setItem("rememberMe", rememberMe ? "true" : "false");
      } catch (e) {}

      // sukses -> redirect
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      const code = err?.code || "";

      if (code.includes("auth/invalid-credential")) {
        setError("Email atau password salah.");
      } else if (code.includes("auth/user-not-found")) {
        setError("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
      } else if (code.includes("auth/wrong-password")) {
        setError("Password salah. Coba lagi.");
      } else if (code.includes("auth/invalid-email")) {
        setError("Format email tidak valid.");
      } else if (code.includes("auth/too-many-requests")) {
        setError("Terlalu banyak percobaan. Coba lagi nanti.");
      } else {
        setError("Gagal masuk. Periksa koneksi atau coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
      {/* Email Field */}
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 py-6 text-base" required autoComplete="email" />
        </div>
      </div>

      {/* Password Field */}
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 py-6 text-base" required autoComplete="current-password" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={rememberMe} onCheckedChange={(val) => setRememberMe(!!val)} />
          <label htmlFor="remember" className="text-gray-700 text-sm cursor-pointer">
            Ingat saya
          </label>
        </div>

        <button type="button" className="text-[#7B61FF] text-sm hover:underline" onClick={() => router.push("/forgot-password")}>
          Lupa password?
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>}

      {/* Submit Button */}
      <Button type="submit" disabled={loading} className={`w-full ${loading ? "opacity-80 pointer-events-none" : ""} bg-[#7B61FF] hover:bg-[#6B51EF] text-white py-6 text-base font-semibold rounded-lg`}>
        {loading ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
