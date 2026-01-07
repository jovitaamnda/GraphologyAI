"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, Shield, Globe, Palette, Moon, Sun, Lock, Mail, 
  Smartphone, Download, Trash2, Save, CheckCircle, 
  User, Building, Key, LogOut, Eye, EyeOff, Copy
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    updates: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "profile", icon: User, label: "Profil Admin", active: activeTab === "profile" },
    { id: "notifications", icon: Bell, label: "Notifikasi", active: activeTab === "notifications" },
    { id: "security", icon: Shield, label: "Keamanan & Privasi", active: activeTab === "security" },
    { id: "appearance", icon: Palette, label: "Tampilan", active: activeTab === "appearance" },
    { id: "language", icon: Globe, label: "Bahasa & Wilayah", active: activeTab === "language" },
    { id: "backup", icon: Download, label: "Backup Data", active: activeTab === "backup" },
    { id: "delete", icon: Trash2, label: "Hapus Data", danger: true, active: activeTab === "delete" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-10 py-6">
        <h1 className="text-4xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600 mt-2 text-lg">Kelola preferensi dan keamanan akun admin</p>
      </div>

      <div className="p-8 max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">

        {/* Sidebar Menu */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden sticky top-8">
            {tabs.map((tab, i) => (
              <motion.button
                key={tab.id}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-8 py-6 flex items-center gap-4 transition-all border-b border-gray-100 last:border-0 ${
                  tab.active 
                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-600 text-indigo-700" 
                    : "hover:bg-gray-50"
                } ${tab.danger ? "text-red-600 hover:bg-red-50/30" : ""}`}
              >
                <tab.icon className={`w-6 h-6 ${tab.active ? "text-indigo-600" : "text-gray-600"}`} />
                <span className="font-medium text-lg">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* Profil Admin */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Informasi Profil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-10 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full -mr-40 -mt-40"></div>
                    <div className="relative z-10">
                      <div className="w-36 h-36 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-6xl font-bold mx-auto mb-6">
                        A
                      </div>
                      <h3 className="text-4xl font-bold mb-2">Admin GraphologyAI</h3>
                      <p className="text-xl opacity-90">Super Administrator</p>
                      <p className="text-lg opacity-80 mt-2">admin@graphologyai.com</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Nama Lengkap</label>
                  <input type="text" defaultValue="Admin GraphologyAI" className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none text-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
                  <input type="email" defaultValue="admin@graphologyai.com" className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none text-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Nomor Telepon</label>
                  <input type="tel" placeholder="+62 812-3456-7890" className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none text-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Jabatan</label>
                  <input type="text" defaultValue="Super Administrator" className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none text-lg" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifikasi */}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Bell className="w-10 h-10 text-purple-600" />
                Pengaturan Notifikasi
              </h2>
              <div className="space-y-8">
                {[
                  { key: "email", label: "Notifikasi Email", desc: "Terima email untuk update penting", icon: Mail },
                  { key: "push", label: "Notifikasi Browser", desc: "Notifikasi desktop untuk aktivitas", icon: Smartphone },
                  { key: "weekly", label: "Laporan Mingguan", desc: "Ringkasan statistik setiap minggu", icon: Calendar },
                  { key: "updates", label: "Update Fitur", desc: "Notifikasi fitur baru & maintenance", icon: Zap },
                ].map((notif) => (
                  <div key={notif.key} className="flex items-center justify-between py-6 px-8 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${notifications[notif.key] ? "bg-indigo-100" : "bg-gray-100"}`}>
                        <notif.icon className={`w-8 h-8 ${notifications[notif.key] ? "text-indigo-600" : "text-gray-500"}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{notif.label}</p>
                        <p className="text-gray-600">{notif.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({...prev, [notif.key]: !prev[notif.key]}))}
                      className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        notifications[notif.key] ? "bg-indigo-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          notifications[notif.key] ? "translate-x-10" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Keamanan & Privasi */}
          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Shield className="w-10 h-10 text-red-600" />
                Keamanan & Privasi
              </h2>
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Ubah Kata Sandi</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Kata Sandi Lama</label>
                      <div className="relative">
                        <input type="password" placeholder="Masukkan kata sandi lama" className="w-full px-5 py-4 pr-12 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Kata Sandi Baru</label>
                        <input type="password" placeholder="Kata sandi baru" className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Konfirmasi Kata Sandi Baru</label>
                        <input type="password" placeholder="Konfirmasi kata sandi baru" className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none" />
                      </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-red-700 hover:to-pink-700 transition shadow-xl">
                      Ubah Kata Sandi
                    </button>
                  </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-3">
                    <CheckCircle className="w-8 h-8" />
                    2FA Aktif
                  </h3>
                  <p className="text-green-800 text-lg">Keamanan 2 faktor sudah diaktifkan. Akun kamu aman!</p>
                  <button className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition">
                    <Key className="w-5 h-5" />
                    Kelola 2FA
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tampilan */}
          {activeTab === "appearance" && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Palette className="w-10 h-10 text-pink-600" />
                Mode Tampilan
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl p-10 text-center text-white shadow-2xl">
                  <Sun className="w-24 h-24 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-4">Mode Terang</h3>
                  <p className="text-lg opacity-90">Tampilan cerah dan segar untuk bekerja di siang hari</p>
                  <button
                    onClick={() => setDarkMode(false)}
                    className="mt-8 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition"
                  >
                    Pilih Mode Terang
                  </button>
                </div>
                <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 rounded-3xl p-10 text-center text-white shadow-2xl">
                  <Moon className="w-24 h-24 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-4">Mode Gelap</h3>
                  <p className="text-lg opacity-90">Tampilan elegan untuk mengurangi kelelahan mata</p>
                  <button
                    onClick={() => setDarkMode(true)}
                    className="mt-8 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition"
                  >
                    Pilih Mode Gelap
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bahasa & Wilayah */}
          {activeTab === "language" && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Globe className="w-10 h-10 text-green-600" />
                Bahasa & Wilayah
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Bahasa</label>
                  <select className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none">
                    <option>Indonesia</option>
                    <option>English</option>
                    <option>中文</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Zona Waktu</label>
                  <select className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none">
                    <option>WIB (GMT+7)</option>
                    <option>WITA (GMT+8)</option>
                    <option>WIT (GMT+9)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Format Tanggal</label>
                  <select className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Backup Data */}
          {activeTab === "backup" && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Download className="w-10 h-10 text-blue-600" />
                Backup Data
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { label: "Backup Lengkap", desc: "Semua data user, tes, & analisis", size: "2.8 GB", date: "19 Mar 2025" },
                  { label: "Backup User", desc: "Hanya data pengguna", size: "1.2 GB", date: "18 Mar 2025" },
                  { label: "Backup Tes", desc: "Hanya hasil tes", size: "0.9 GB", date: "17 Mar 2025" },
                ].map((backup, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-300 transition"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-xl">{backup.label}</h3>
                      <Download className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-gray-600 mb-4">{backup.desc}</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ukuran:</span>
                        <span className="font-mono font-semibold">{backup.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Terakhir:</span>
                        <span className="font-mono font-semibold">{backup.date}</span>
                      </div>
                    </div>
                    <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg">
                      Download Backup
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Hapus Data (DANGER ZONE) */}
          {activeTab === "delete" && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 rounded-3xl shadow-xl p-10 border-2 border-red-200"
            >
              <h2 className="text-3xl font-bold text-red-900 mb-8 flex items-center gap-3">
                <Trash2 className="w-12 h-12" />
                Hapus Data (AREA BERBAHAYA)
              </h2>
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
                <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-red-900 mb-4">⚠️ Peringatan Penting</h3>
                <p className="text-red-800 text-lg mb-8 leading-relaxed">
                  Tindakan ini akan <strong className="text-red-700">menghapus semua data secara permanen</strong> dan 
                  <strong className="text-red-700"> tidak bisa dikembalikan</strong>. Pastikan kamu sudah backup data sebelum melanjutkan.
                </p>
                <div className="bg-white rounded-2xl p-6 mb-8">
                  <h4 className="font-bold text-red-900 mb-4">Yang akan dihapus:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>196 Pengguna</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>1,789 Tes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>892 Hasil Analisis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>2.8 GB Data</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="flex-1 max-w-xs px-8 py-4 bg-gray-600 text-white rounded-2xl font-bold text-lg hover:bg-gray-700 transition shadow-lg">
                    <LogOut className="w-6 h-6 mr-3 inline" />
                    Kembali
                  </button>
                  <button className="flex-1 max-w-xs px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:from-red-700 hover:to-pink-700 transition shadow-xl">
                    <Trash2 className="w-6 h-6 mr-3 inline" />
                    HAPUS SEMUA DATA
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </div>

        {/* Tombol Simpan Utama */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end gap-4 bg-white rounded-3xl shadow-xl p-10 border border-gray-200"
        >
          <button className="px-12 py-5 bg-gray-200 text-gray-700 rounded-2xl font-bold text-xl hover:bg-gray-300 transition">
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:from-indigo-700 hover:to-purple-700 transition flex items-center gap-3 shadow-xl"
          >
            <Save className="w-7 h-7" />
            Simpan Semua Perubahan
          </button>
        </motion.div>

        {/* Notifikasi Tersimpan */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-green-600 text-white px-8 py-6 rounded-2xl shadow-2xl flex items-center gap-4 text-xl font-bold z-50"
          >
            <CheckCircle className="w-10 h-10" />
            Semua perubahan berhasil disimpan!
          </motion.div>
        )}
      </div>
    </div>
  );
}