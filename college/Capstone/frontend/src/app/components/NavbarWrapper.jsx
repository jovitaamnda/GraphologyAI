"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Hanya cek token kalau bukan halaman login/register
    if (pathname === "/login" || pathname === "/register" || pathname === "/") return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [pathname, router]);

  return <Navbar />;
}
