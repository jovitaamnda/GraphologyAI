"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return router.push("/login");

    // Bisa fetch data user juga dari backend
    axios
      .get("http://localhost:5000/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data))
      .catch(() => router.push("/login"));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#f0f0f0]">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-[500px] text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h1>
        {user ? <p className="text-gray-600 text-lg">Welcome, {user.name}!</p> : <p>Loading...</p>}
      </div>
    </main>
  );
}
