"use client";

import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseConfig"; // ✅ gunakan auth dari config

export default function MulaiAnalisisButton() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    if (checking) return;
    if (isLoggedIn) {
      router.push("/homeanalisis");
    } else {
      router.push("/login");
    }
  };

  return (
    <button onClick={handleClick} disabled={checking} className="mt-6 bg-yellow-400 text-gray-900 font-semibold text-lg px-8 py-3 rounded-xl shadow-[0_10px_25px_rgba(251,191,36,0.3)] hover:bg-yellow-500 transition-all duration-300">
      {checking ? "Memeriksa..." : "Mulai Analisis"}
    </button>
  );
}
