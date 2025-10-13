"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      await Swal.fire({
        title: "Password Tidak Sama ⚠️",
        text: "Pastikan konfirmasi password sesuai.",
        icon: "warning",
        confirmButtonColor: "#7B61FF",
      });
      return;
    }

    try {
      console.log("⏳ Membuat akun...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("✅ Akun berhasil dibuat:", user.uid);

      try {
        await updateProfile(user, { displayName: fullName });
        console.log("🟢 Profil berhasil diperbarui");
      } catch (profileErr) {
        console.warn("⚠️ Gagal updateProfile:", profileErr.message);
      }

      try {
        await setDoc(doc(db, "users", user.uid), {
          fullName,
          email,
        });
        console.log("📁 Data user disimpan di Firestore");
      } catch (firestoreErr) {
        console.warn("⚠️ Firestore gagal:", firestoreErr.message);
      }

      // ✅ Alert harus menunggu user klik tombolnya dulu
      await Swal.fire({
        title: "Akun Berhasil Dibuat! 🎉",
        text: "Silakan login untuk melanjutkan ke Grapholyze.",
        icon: "success",
        confirmButtonColor: "#7B61FF",
        confirmButtonText: "Login Sekarang",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      console.log("🚀 User klik tombol alert → redirect login");
      router.push("/login");
    } catch (err) {
      console.error("❌ Register error:", err);
      setError("Gagal membuat akun: " + err.message);

      await Swal.fire({
        title: "Registrasi Gagal 😢",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#7B61FF",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div>
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7B61FF]" />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7B61FF]" />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7B61FF]" />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7B61FF]"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" className="bg-[#7B61FF] text-white font-semibold py-2 rounded-md mt-2 hover:bg-[#6A52E0] transition">
        Register
      </button>
    </form>
  );
}
