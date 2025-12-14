"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [imgSrc, setImgSrc] = useState("/profile.jpeg");

  const router = useRouter();
  const pathname = usePathname();
  const profileRef = useRef(null);

  // 🔐 cek login (MongoDB + JWT)
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => setUser(null));
  }, []);

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

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
  };

  const handleScrollOrNavigate = (id) => {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/?scroll=${id}`);
    }
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div onClick={() => handleScrollOrNavigate("home")} className="text-2xl font-bold text-[#1e3a8a] cursor-pointer">
          Grapholyze
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleScrollOrNavigate("home")}>Home</button>
          <button onClick={() => handleScrollOrNavigate("handwriting")}>Handwriting Analyst</button>
          <button onClick={() => handleScrollOrNavigate("about")}>About</button>

          {!user ? (
            <button onClick={() => router.push("/login")} className="bg-blue-800 text-white px-5 py-2 rounded-lg">
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
                  </div>
                  <button onClick={() => router.push("/profile")} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                    Profile
                  </button>
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100">
                    Logout
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
