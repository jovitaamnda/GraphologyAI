"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase/firebaseConfig";

export default function ProfilePage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState(null);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  // upload state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // hidden input ref
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setLoadingAuth(false);
      if (u) {
        setUser(u);
        setName(u.displayName || "");
        setEmail(u.email || "");
        try {
          const snap = await getDoc(doc(db, "users", u.uid));
          if (snap.exists()) {
            const data = snap.data();
            if (data.phone) setPhone(data.phone);
          }
        } catch (err) {
          console.error("fetch user doc error:", err);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return alert("User not logged in");

    setSaving(true);
    try {
      if (name !== user.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      if (email !== user.email) {
        try {
          await updateEmail(auth.currentUser, email);
        } catch (err) {
          alert("Gagal mengubah email, login ulang dulu.");
        }
      }

      if (password) {
        try {
          await updatePassword(auth.currentUser, password);
        } catch (err) {
          alert("Gagal mengubah password, login ulang dulu.");
        }
      }

      await setDoc(doc(db, "users", user.uid), { phone }, { merge: true });

      alert("Profile berhasil disimpan.");
      setUser({ ...user, displayName: name, email });
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  // fungsi upload foto otomatis setelah pilih
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    setUploadProgress(0);

    const filename = `profile_${Date.now()}.${file.name.split(".").pop()}`;
    const storageRef = ref(storage, `users/${user.uid}/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploadProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      (error) => {
        console.error("Upload error:", error);
        alert("Upload gagal. Coba lagi.");
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfile(auth.currentUser, { photoURL: downloadURL });
          await setDoc(doc(db, "users", user.uid), { photoURL: downloadURL }, { merge: true });
          setUser({ ...user, photoURL: downloadURL });
          alert("Foto profil berhasil diperbarui!");
        } catch (err) {
          console.error("Saving photoURL error:", err);
          alert("Gagal menyimpan photoURL.");
        } finally {
          setUploading(false);
          setUploadProgress(0);
        }
      }
    );
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  if (loadingAuth) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">Kamu belum login.</p>
        <button onClick={() => router.push("/login")} className="bg-blue-700 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>
    );

  const avatarSrc = user.photoURL || "/profile.jpeg";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row items-stretch gap-8">
          {/* Left purple panel */}
          <div className="md:w-1/3 bg-purple-500 rounded-lg p-10 flex flex-col items-center justify-center text-center">
            {/* Avatar (klik untuk upload) */}
            <div onClick={handleAvatarClick} className="relative w-40 h-40 rounded-full bg-purple-700 flex items-center justify-center mb-6 overflow-hidden shadow-lg cursor-pointer group" title="Klik untuk ganti foto profil">
              <Image src={avatarSrc} alt="avatar" width={160} height={160} className="w-full h-full object-cover rounded-full" />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-sm rounded-full">
                  <div>Uploading...</div>
                  <div>{uploadProgress}%</div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition">Klik untuk ubah foto</div>
            </div>

            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

            <h2 className="text-2xl md:text-3xl font-semibold text-white">{name || "User"}</h2>
          </div>

          {/* Right white card */}
          <div className="md:w-2/3 bg-white rounded-2xl shadow-md p-8">
            <h1 className="text-3xl font-serif mb-1">Profile Settings</h1>
            <p className="text-sm text-gray-500 mb-6">Manage your personal information</p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300" placeholder="Full name" />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Email Address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300" placeholder="Email" />
                <p className="text-xs text-gray-400 mt-1">Mengubah email mungkin memerlukan login ulang (untuk keamanan).</p>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300" placeholder="Phone number" />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Change Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="New password (leave blank if not changing)"
                />
              </div>

              <div className="mt-6">
                <button type="submit" disabled={saving} className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow hover:opacity-95 disabled:opacity-60">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button type="button" onClick={handleLogout} className="ml-4 text-red-500 px-4 py-2 rounded border border-red-100">
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
