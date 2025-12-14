"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Users, FileText } from "lucide-react";
import * as XLSX from "xlsx";

export default function AdminDashboard() {
  const [selectedType, setSelectedType] = useState(null);

  const totalUsers = 150;
  const totalTests = 120;

  const enneagramData = [
    { type: 1, value: 25, color: "#6B7280", label: "Tipe 1" },
    { type: 2, value: 18, color: "#8B5CF6", label: "Tipe 2" },
    { type: 3, value: 22, color: "#3B82F6", label: "Tipe 3" },
    { type: 4, value: 30, color: "#10B981", label: "Tipe 4" },
    { type: 5, value: 35, color: "#EF4444", label: "Tipe 5" },
  ];

  const total = enneagramData.reduce((a, b) => a + b.value, 0);
  let cumulative = 0;
  const segments = enneagramData.map((item) => {
    const percent = (item.value / total) * 100;
    const start = cumulative;
    cumulative += percent;
    return { ...item, percent, start };
  });

  const recentUsers = [
    { name: "Rhena", email: "rhena@gmail.com", tes: 3, tipe: 2 },
    { name: "Aisyah", email: "aisyah@gmail.com", tes: 4, tipe: 4 },
    { name: "Putri", email: "putri@gmail.com", tes: 2, tipe: 1 },
    { name: "Jovita", email: "jovita@gmail.com", tes: 1, tipe: 5 },
  ];

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(
      recentUsers.map((u) => ({
        Nama: u.name,
        Email: u.email,
        "Jumlah Tes": u.tes,
        "Tipe Terakhir": u.tipe,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data User");
    XLSX.writeFile(wb, "GraphologyAI_Data_User.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HILANGIN NAVBAR → LANGSUNG MULAI DARI SINI */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-10 py-8 shadow-lg">
        <h1 className="text-4xl font-bold">Dashboard Admin</h1>
        <p className="text-indigo-100 mt-2">Selamat datang kembali, Admin!</p>
      </div>

      <div className="p-8 max-w-7xl mx-auto space-y-10">
        {/* Stats Cards — FIT CONTENT & CANTIK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total User */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-600 text-sm font-medium">Total User</p>
              <p className="text-4xl font-bold text-gray-900 mt-1">{totalUsers}</p>
              <p className="text-xs text-green-600 mt-2">+12% bulan ini</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-xl">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
          </motion.div>

          {/* Total Tes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Tes</p>
              <p className="text-4xl font-bold text-gray-900 mt-1">{totalTests}</p>
              <p className="text-xs text-green-600 mt-2">Rata-rata 4/hari</p>
            </div>
            <div className="bg-green-100 p-4 rounded-xl">
              <FileText className="w-10 h-10 text-green-600" />
            </div>
          </motion.div>

          {/* Grafik Enneagram */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Distribusi Enneagram</h3>
            <div className="flex items-center justify-center gap-6">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="85" fill="none" stroke="#f3f4f6" strokeWidth="18" />
                  {segments.map((seg, i) => (
                    <motion.circle
                      key={seg.type}
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="18"
                      strokeDasharray={`${seg.percent * 2.67} 267`}
                      strokeDashoffset={-seg.start * 2.67}
                      initial={{ strokeDashoffset: 267 }}
                      animate={{ strokeDashoffset: -seg.start * 2.67 }}
                      transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                      strokeLinecap="round"
                      className="cursor-pointer"
                      onClick={() => setSelectedType(seg.type)}
                    />
                  ))}
                  <text x="100" y="105" textAnchor="middle" className="text-5xl font-bold fill-gray-800">
                    9
                  </text>
                </svg>
              </div>

              <div className="space-y-2">
                {enneagramData.map((item) => (
                  <div
                    key={item.type}
                    onClick={() => setSelectedType(item.type)}
                    className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg text-xs transition-all ${selectedType === item.type ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>
                      {item.label}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabel + Export */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold">Pengguna Terakhir</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 font-medium uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Nama</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-center">Tes</th>
                    <th className="px-6 py-3 text-center">Tipe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentUsers.map((user) => (
                    <tr key={user.email} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-center font-semibold">{user.tes}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">Tipe {user.tipe}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-2">Export Data</h3>
              <p className="text-white/80 text-sm">Download semua data pengguna dalam format Excel</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="mt-6 w-full bg-white text-indigo-700 font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
              <Download className="w-5 h-5" />
              Download Excel
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
