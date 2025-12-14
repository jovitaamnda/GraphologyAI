"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

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

  // load rememberMe preference (UI only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rememberMe");
      if (saved !== null) setRememberMe(saved === "true");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("rememberMe", rememberMe ? "true" : "false");
    } catch {}
  }, [rememberMe]);

  // 🔐 LOGIN KE BACKEND (MongoDB + JWT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Email atau password salah");
      }

      // ✅ LOGIN SUKSES
      // cookie JWT sudah diset oleh server
      router.push("/");
    } catch (err) {
      setError(err.message || "Gagal masuk. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
      {/* Email */}
      <div className="text-left">
        <label className="block text-white font-medium mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" size={20} />
          <Input type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 py-6 text-base" required autoComplete="email" />
        </div>
      </div>

      {/* Password */}
      <div className="text-left">
        <label className="block text-white font-medium mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" size={20} />
          <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 py-6 text-base" required autoComplete="current-password" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
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

      {/* Error */}
      {error && <div className="rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>}

      {/* Submit */}
      <Button type="submit" disabled={loading} className={`w-full bg-[#7B61FF] hover:bg-[#6B51EF] text-white py-6 text-base font-semibold rounded-lg ${loading ? "opacity-80 pointer-events-none" : ""}`}>
        {loading ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
