"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("/profile.jpeg");

  const router = useRouter();
  const pathname = usePathname();
  const profileRef = useRef(null);
  const { user, logout } = useAuth();

  // update avatar
  useEffect(() => {
    if (user?.photo) setImgSrc(user.photo);
    else setImgSrc("/profile.jpeg");
  }, [user]);

  // close dropdown
  useEffect(() => {
    function handleOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const handleScrollOrNavigate = (page) => {
    if (page === "home") {
      router.push("/");
    } else if (page === "handwriting") {
      router.push("/user/homeanalisis");
    } else if (page === "about") {
      router.push("/about");
    } else if (page === "login") {
      router.push("/auth/login");
    }
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center" suppressHydrationWarning>
        <div onClick={() => handleScrollOrNavigate("home")} className="text-2xl font-bold text-[#1e3a8a] cursor-pointer">
          Grapholyze
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleScrollOrNavigate("home")} className="hover:text-blue-700 transition">Home</button>
          <button onClick={() => handleScrollOrNavigate("handwriting")} className="hover:text-blue-700 transition">Handwriting Analyst</button>
          <button onClick={() => handleScrollOrNavigate("about")} className="hover:text-blue-700 transition">About</button>

          {!user ? (
            <button onClick={() => router.push("/auth/login")} className="bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition">
              Login/Register
            </button>
          ) : (
            <div ref={profileRef} className="relative">
              <button onClick={() => setProfileOpen((v) => !v)} className="w-10 h-10 rounded-full overflow-hidden border">
                <Image src={imgSrc} alt="avatar" width={40} height={40} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg">
                  <div className="px-4 py-3 border-b">
                    <div className="font-semibold">{user.name || "User"}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                    <div className="text-xs text-gray-400 mt-1">Role: {user.role || "user"}</div>
                  </div>
                  {user.role === "admin" && (
                    <button onClick={() => router.push("/admin/admin")} className="block w-full px-4 py-2 text-left hover:bg-gray-100 font-semibold text-purple-600">
                      📊 Admin Dashboard
                    </button>
                  )}
                  <button onClick={() => router.push("/profile")} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                    👤 Profile
                  </button>
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100">
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
