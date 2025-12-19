"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password tidak cocok");
      return;
    }

    setLoading(true);

    // Simulasi loading UI - dalam produksi, connect ke API
    setTimeout(() => {
      setLoading(false);
      alert("Register UI siap untuk diintegrasikan dengan backend");
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
      {/* Nama */}
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input type="text" placeholder="Nama lengkap" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 py-6 text-base" required />
        </div>
      </div>

      {/* Email */}
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 py-6 text-base" required />
        </div>
      </div>

      {/* Password */}
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 py-6 text-base" required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Konfirmasi Password */}
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Konfirmasi Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input type={showConfirmPassword ? "text" : "password"} placeholder="Konfirmasi password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 pr-10 py-6 text-base" required />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <Button type="submit" disabled={loading} className={`w-full bg-[#7B61FF] hover:bg-[#6B51EF] text-white py-6 text-base font-semibold rounded-lg ${loading ? "opacity-80 pointer-events-none" : ""}`}>
        {loading ? "Mendaftar..." : "Daftar"}
      </Button>
    </form>
  );
}
