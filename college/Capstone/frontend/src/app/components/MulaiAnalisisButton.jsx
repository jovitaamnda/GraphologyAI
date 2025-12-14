"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MulaiAnalisisButton() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Cek apakah ada token JWT di localStorage → artinya user sudah login
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Cek token masih valid (opsional, tapi bagus)
        const payload = JSON.parse(atob(token.split(".")[1]));
        const exp = payload.exp * 1000; // exp di JWT dalam detik
        if (Date.now() < exp) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }

    setChecking(false);
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
    <button
      onClick={handleClick}
      disabled={checking}
      className="mt-6 bg-yellow-400 text-gray-900 font-semibold text-lg px-8 py-3 rounded-xl shadow-[0_10px_25px_rgba(251,191,36,0.3)] hover:bg-yellow-500 transition-all duration-300 disabled:opacity-70"
    >
      {checking ? "Memeriksa..." : "Mulai Analisis"}
    </button>
  );
}
