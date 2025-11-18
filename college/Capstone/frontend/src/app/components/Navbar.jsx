"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig"; // sesuaikan path jika perlu

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu
  const [profileOpen, setProfileOpen] = useState(false); // profile dropdown
  const [user, setUser] = useState(undefined);
  const [imgSrc, setImgSrc] = useState("/profile.jpeg"); // fallback default
  const router = useRouter();
  const pathname = usePathname();

  const profileRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  // update imgSrc when user changes
  useEffect(() => {
    if (user && user.photoURL) {
      setImgSrc(user.photoURL);
    } else {
      setImgSrc("/profile.jpeg");
    }
  }, [user]);

  // close profile dropdown on outside click / Escape
  useEffect(() => {
    function handleOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // smart scroll: if on homepage -> scroll, else navigate to homepage with query to auto-scroll
  const handleScrollOrNavigate = (id) => {
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        // small timeout to ensure layout/sticky navbar settled
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
      }
    } else {
      // navigate to home with query param; home page should read this and auto-scroll
      router.push(`/?scroll=${encodeURIComponent(id)}`);
    }
    // close mobile menu if open
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

        {/* Desktop menu */}
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

          {/* Auth area */}
          {!user ? (
            <button onClick={() => router.push("/login")} className="bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition-all">
              Login/Register
            </button>
          ) : (
            // profile wrapper (relative so dropdown is positioned to this)
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen((s) => !s)}
                aria-haspopup="true"
                aria-expanded={profileOpen}
                className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-500 focus:outline-none"
                title={user.displayName || "Profile"}
              >
                <Image src={imgSrc} alt="avatar" width={40} height={40} className="object-cover rounded-full" onError={handleImgError} />
              </button>

              {/* Dropdown: anchored to parent (top-full) */}
              <div
                className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl ring-1 ring-black/5 z-50 transition origin-top-right
                  ${profileOpen ? "block" : "hidden"}`}
                role="menu"
              >
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
                  role="menuitem"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileOpen((s) => !s)} className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-blue-600" aria-label="Toggle menu">
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (separate from profile dropdown) */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200 px-6 py-4 space-y-4">
          <button onClick={() => handleScrollOrNavigate("home")} className="block w-full text-left text-gray-700 hover:text-blue-600">
            Home
          </button>
          <button onClick={() => handleScrollOrNavigate("handwriting")} className="block w-full text-left text-gray-700 hover:text-blue-600">
            Handwriting Analyst
          </button>
          <button onClick={() => handleScrollOrNavigate("about")} className="block w-full text-left text-gray-700 hover:text-blue-600">
            About
          </button>

          {!user ? (
            <button
              onClick={() => {
                setMobileOpen(false);
                router.push("/login");
              }}
              className="block w-full text-left bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
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
                className="block w-full text-left text-gray-700 hover:text-blue-600"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left text-red-500 hover:text-red-700"
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
