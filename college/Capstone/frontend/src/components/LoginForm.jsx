"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Baca & simpan preferensi "remember me"
  useEffect(() => {
    const saved = localStorage.getItem("rememberMe");
    if (saved === "true") setRememberMe(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("rememberMe", rememberMe);
  }, [rememberMe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok && (data.success || data.token)) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login?registered=true");
        }, 2000);
      } else {
        setError(data.message || "Gagal mendaftar");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 py-6 text-base" required />
        </div>
      </div>

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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={rememberMe} onCheckedChange={setRememberMe} />
          <label htmlFor="remember" className="text-gray-700 text-sm cursor-pointer">
            Ingat saya
          </label>
        </div>
        <button type="button" className="text-[#7B61FF] text-sm hover:underline">
          Lupa password?
        </button>
      </div>

      {error && <div className="rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>}

      <Button type="submit" disabled={loading} className="w-full bg-[#7B61FF] hover:bg-[#6B51EF] text-white py-6 text-base font-semibold rounded-lg">
        {loading ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
