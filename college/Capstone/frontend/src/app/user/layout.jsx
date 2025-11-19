// src/app/(user)/layout.jsx   ← ini yang paling sering dipakai
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function UserLayout({ children }) {
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Ambil data dari cookie atau localStorage
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

    if (cookies.user_email) {
      setUserEmail(decodeURIComponent(cookies.user_email));
      // Ambil nama dari email (contoh: jovita@gmail.com → Jovita)
      const nameFromEmail = cookies.user_email.split("@")[0].split(".")[0];
      setUserName(nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar / Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-600">Grapholyze</Link>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Selamat datang,</p>
              <p className="font-semibold text-purple-700">{userName}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              {userName.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Konten halaman */}
      <main>{children}</main>
    </div>
  );
}