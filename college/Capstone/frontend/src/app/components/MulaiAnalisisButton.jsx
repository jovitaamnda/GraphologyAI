"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MulaiAnalisisButton() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  const handleClick = () => {
    if (checking) return;
    router.push(isLoggedIn ? "/homeanalisis" : "/login");
  };

  return (
    <button onClick={handleClick} disabled={checking} className="mt-6 bg-yellow-400 text-gray-900 font-semibold text-lg px-8 py-3 rounded-xl shadow hover:bg-yellow-500 transition-all">
      {checking ? "Memeriksa..." : "Mulai Analisis"}
    </button>
  );
}
