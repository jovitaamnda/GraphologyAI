"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Ambil user dari localStorage (token JWT)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(savedUser);
      setUser(userData);
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Simpan perubahan profil (hanya update localStorage & backend)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5001/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone || "",
        }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        alert("Profile berhasil diperbarui!");
      } else {
        setError(data.message || "Gagal menyimpan");
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setSaving(false);
    }
  };

  // Upload foto profil (simpan ke Cloudinary atau backend)
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "grapholyze"); // ganti kalau pakai Cloudinary

    try {
      // Ganti URL ini kalau kamu pakai backend sendiri
      const res = await fetch("https://api.cloudinary.com/v1_1/dxxxxx/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        // Simpan ke backend atau langsung ke localStorage
        const updatedUser = { ...user, photoURL: data.secure_url };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Foto profil berhasil diupdate!");
      }
    } catch (err) {
      alert("Upload gagal, coba lagi");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4 text-xl">Kamu belum login.</p>
        <button onClick={() => router.push("/login")} className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Login Sekarang
        </button>
      </div>
    );
  }

  const avatarSrc = user.photoURL || "/profile.jpeg";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div onClick={handleAvatarClick} className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-purple-200 cursor-pointer group" title="Klik untuk ganti foto">
              <Image src={avatarSrc} alt="avatar" width={160} height={160} className="w-full h-full object-cover" />
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                  <div>{uploadProgress}%</div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">Ubah Foto</div>
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

            <h2 className="text-3xl font-bold text-gray-800">{user.name || "User"}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-2">{user.phone || "No phone number"}</p>
          </div>

          {/* Right Panel - Form */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-gray-600 mb-8">Kelola informasi akun kamu</p>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6">{error}</div>}

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  value={user.name || ""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Nama kamu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" value={user.email || ""} onChange={(e) => setUser({ ...user, email: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="email@contoh.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nomor HP (opsional)</label>
                <input type="text" value={user.phone || ""} onChange={(e) => setUser({ ...user, phone: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="08123456789" />
              </div>

              <div className="pt-6 flex gap-4">
                <button type="submit" disabled={saving} className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-60 transition">
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
                <button type="button" onClick={handleLogout} className="border border-red-500 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition">
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
