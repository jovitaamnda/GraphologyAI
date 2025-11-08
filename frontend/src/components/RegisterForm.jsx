"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { auth, db } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Buat akun di Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // 2️⃣ Update nama tampilan di profil Firebase
      await updateProfile(user, { displayName: name.trim() });

      // 3️⃣ Simpan data user ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name.trim(),
        email: email.trim(),
        createdAt: serverTimestamp(),
      });

      // 4️⃣ Redirect ke halaman utama setelah berhasil daftar
      router.push("/");
    } catch (err) {
      console.error("Register error:", err);
      const code = err?.code || "";

      if (code.includes("auth/email-already-in-use")) {
        setError("Email sudah terdaftar. Silakan login.");
      } else if (code.includes("auth/invalid-email")) {
        setError("Format email tidak valid.");
      } else if (code.includes("auth/weak-password")) {
        setError("Password terlalu lemah. Gunakan minimal 6 karakter.");
      } else {
        setError("Gagal mendaftar. Silakan coba lagi nanti.");
      }
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

      {/* Konfirmasi Password */}
      <div className="text-left">
        <label className="block text-gray-700 font-medium mb-2">Konfirmasi Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input type={showConfirmPassword ? "text" : "password"} placeholder="Konfirmasi password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 pr-10 py-6 text-base" required />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showConfirmPassword ? "Sembunyikan konfirmasi password" : "Tampilkan konfirmasi password"}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>}

      {/* Tombol Submit */}
      <Button type="submit" disabled={loading} className={`w-full ${loading ? "opacity-80 pointer-events-none" : ""} bg-[#7B61FF] hover:bg-[#6B51EF] text-white py-6 text-base font-semibold rounded-lg`}>
        {loading ? "Mendaftar..." : "Daftar"}
      </Button>
    </form>
  );
}
