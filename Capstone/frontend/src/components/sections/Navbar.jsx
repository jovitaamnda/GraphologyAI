"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("/profile.jpeg");
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const profileRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // update avatar
  useEffect(() => {
    if (user?.profilePicture) {
      const imageUrl = user.profilePicture.startsWith("http") ? user.profilePicture : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${user.profilePicture}`;
      setImgSrc(imageUrl);
    } else {
      setImgSrc("/profile.jpeg");
    }
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

  const handleNavigate = (page) => {
    if (page === "home") router.push("/");
    if (page === "handwriting") router.push("/user/homeanalisis");
    if (page === "about") router.push("/about");
    if (page === "login") router.push("/auth/login");
    setMobileOpen(false);
  };

  // Hide navbar on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <div onClick={() => handleNavigate("home")} className="cursor-pointer hover:opacity-80 transition-opacity">
          <img src="/grapholyze_logo.png" alt="Grapholyze Logo" className="h-14 w-auto object-contain" />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleNavigate("home")} className="text-gray-700 font-medium hover:text-[#1e3a8a]">
            Home
          </button>
          <button onClick={() => handleNavigate("handwriting")} className="text-gray-700 font-medium hover:text-[#1e3a8a]">
            Handwriting Analyst
          </button>
          <button onClick={() => router.push("/learn-more")} className="text-gray-700 font-medium hover:text-[#1e3a8a]">
            Learn More
          </button>

          {isClient &&
            (!user ? (
              <button onClick={() => handleNavigate("login")} className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-900 shadow-lg">
                Login / Register
              </button>
            ) : (
              <div ref={profileRef} className="relative">
                <button onClick={() => setProfileOpen((v) => !v)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#1e3a8a]">
                  <img src={imgSrc} alt="avatar" className="w-full h-full object-cover" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl border overflow-hidden">
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <div className="font-semibold text-gray-800">{user.name || "User"}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                      <div className="text-xs text-[#1e3a8a] mt-1 font-medium">Role: {user.role || "user"}</div>
                    </div>

                    {user.role === "admin" && (
                      <button onClick={() => router.push("/admin")} className="block w-full px-4 py-2 text-left text-purple-600 hover:bg-gray-50">
                        📊 Admin Dashboard
                      </button>
                    )}

                    <button onClick={() => router.push("/profile")} className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                      👤 Profile
                    </button>

                    <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-50">
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </nav>
  );
}
