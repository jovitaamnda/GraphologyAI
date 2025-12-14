"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
        }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login"); // atau "/" kalau mau langsung masuk
        }, 2000);
      } else {
        setError(data.message || "Gagal mendaftar");
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
      {/* Nama */}
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input type="text" placeholder="Nama lengkap" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 py-6 text-base" required />
        </div>
      </div>

      {/* Email */}
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 py-6 text-base" required />
        </div>
      </div>

      {/* Password */}
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 py-6 text-base" required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Konfirmasi Password */}
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Konfirmasi Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input type={showConfirmPassword ? "text" : "password"} placeholder="Konfirmasi password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 pr-10 py-6 text-base" required />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Error & Success */}
      {error && <div className="rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>}
      {success && <div className="rounded-md bg-green-50 border border-green-200 p-3 text-green-700 text-sm">Pendaftaran berhasil! Mengalihkan ke login...</div>}

      {/* Tombol Submit */}
      <Button type="submit" disabled={loading} className="w-full bg-[#7B61FF] hover:bg-[#6B51EF] text-white py-6 text-base font-semibold rounded-lg">
        {loading ? "Mendaftar..." : "Daftar"}
      </Button>
    </form>
  );
}
