"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null); // null = loading, undefined = tidak login
  const [imgSrc, setImgSrc] = useState("/profile.jpeg");
  const router = useRouter();
  const pathname = usePathname();
  const profileRef = useRef(null);

  // AMBIL USER DARI JWT DI localStorage (MongoDB version)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(undefined);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT
      setUser({
        displayName: payload.name || "User",
        email: payload.email,
        photoURL: payload.photoURL || null,
        uid: payload.id,
      });
    } catch (err) {
      console.error("Token invalid, logout");
      localStorage.removeItem("token");
      setUser(undefined);
    }
  }, []);

  // Update foto profil
  useEffect(() => {
    if (user?.photoURL) {
      setImgSrc(user.photoURL);
    } else {
      setImgSrc("/profile.jpeg");
    }
  }, [user]);

  // Close dropdown kalau klik luar
  useEffect(() => {
    const handleOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // LOGOUT — hanya hapus token
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("/login");
  };

  // Fungsi scroll tetap sama
  const handleScrollOrNavigate = (id) => {
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
      }
    } else {
      router.push(`/?scroll=${encodeURIComponent(id)}`);
    }
    setMobileOpen(false);
  };

  const handleImgError = () => {
    if (imgSrc !== "/profile.jpeg") setImgSrc("/profile.jpeg");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-white shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => handleScrollOrNavigate("home")} className="text-2xl font-bold text-[#1e3a8a] cursor-pointer select-none">
          Grapholyze
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => handleScrollOrNavigate("home")} className="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </button>
          <button onClick={() => handleScrollOrNavigate("handwriting")} className="text-gray-700 hover:text-blue-600 transition-colors">
            Handwriting Analyst
          </button>
          <button onClick={() => handleScrollOrNavigate("about")} className="text-gray-700 hover:text-blue-600 transition-colors">
            About
          </button>

          {/* Auth Area */}
          {user === null ? ( // loading
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
          ) : user === undefined ? (
            <button onClick={() => router.push("/login")} className="bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition-all">
              Login/Register
            </button>
          ) : (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-500 focus:outline-none"
                title={user.displayName || "Profile"}
              >
                <Image src={imgSrc} alt="avatar" width={40} height={40} className="object-cover rounded-full" onError={handleImgError} />
              </button>

              {/* Dropdown */}
              <div className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl ring-1 ring-black/5 z-50 transition ${profileOpen ? "block" : "hidden"}`}>
                <div className="px-4 py-3 border-b">
                  <div className="text-sm font-semibold text-gray-900">{user.displayName || "User"}</div>
                  <div className="text-xs text-gray-500 truncate">{user.email}</div>
                </div>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    router.push("/profile");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700 hover:text-blue-600">
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t px-6 py-4 space-y-4">
          <button onClick={() => handleScrollOrNavigate("home")} className="block w-full text-left text-gray-700 hover:text-blue-600">
            Home
          </button>
          <button onClick={() => handleScrollOrNavigate("handwriting")} className="block w-full text-left text-gray-700 hover:text-blue-600">
            Handwriting Analyst
          </button>
          <button onClick={() => handleScrollOrNavigate("about")} className="block w-full text-left text-gray-700 hover:text-blue-600">
            About
          </button>

          {user === undefined ? (
            <button
              onClick={() => {
                setMobileOpen(false);
                router.push("/login");
              }}
              className="block w-full text-left bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Login/Register
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  router.push("/profile");
                }}
                className="block w-full text-left text-gray-700"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
