"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import Swal from "sweetalert2";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ tampilkan alert elegan
      Swal.fire({
        title: "Login Berhasil! 🎉",
        text: "Selamat datang di Grapholyze ✨",
        icon: "success",
        confirmButtonColor: "#7B61FF",
        confirmButtonText: "Lanjut ke home",
      }).then(() => {
        router.push("/");
      });
    } catch (err) {
      setError("Email atau password salah!");

      // ❌ tampilkan alert error juga
      Swal.fire({
        title: "Login Gagal 😢",
        text: "Email atau password salah. Silakan coba lagi.",
        icon: "error",
        confirmButtonColor: "#7B61FF",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div>
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input type="email" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7B61FF]" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input type="password" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7B61FF]" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" className="bg-[#7B61FF] text-white font-semibold py-2 rounded-md mt-2 hover:bg-[#6A52E0] transition">
        Login
      </button>
    </form>
  );
}
