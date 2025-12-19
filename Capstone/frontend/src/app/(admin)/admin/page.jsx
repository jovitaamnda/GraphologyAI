"use client";

import { useState, useEffect } from "react";
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
      recentUsers.map(u => ({
        Nama: u.name,
        Email: u.email,
        "Jumlah Tes": u.tes,
        "Tipe Terakhir": u.tipe
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data User");
    XLSX.writeFile(wb, "GraphologyAI_Data_User.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-10 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="p-8 max-w-7xl mx-auto space-y-10">
        {/* Stats Cards - dengan animasi masuk */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total User</p>
                <p className="text-6xl font-bold text-gray-900 mt-3">{totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-5 rounded-2xl">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Tes</p>
                <p className="text-6xl font-bold text-gray-900 mt-3">{totalTests}</p>
              </div>
              <div className="bg-green-100 p-5 rounded-2xl">
                <FileText className="w-12 h-12 text-green-600" />
              </div>
            </div>
          </motion.button>

          {/* Grafik Enneagram - ANIMASI SUPER LEMBUT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Grafik Enneagram</h3>
              <div className="w-8 h-8 border-2 border-gray-300 rounded-full animate-spin" />
            </div>

            <div className="flex items-center justify-center gap-10">
              <div className="relative w-56 h-56">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Background circle */}
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#f3f4f6" strokeWidth="18" />

                  {/* Animated segments */}
                  {segments.map((seg, i) => (
                    <motion.circle
                      key={seg.type}
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="18"
                      strokeDasharray={`${seg.percent * 2.83} 283`}
                      strokeDashoffset={-seg.start * 2.83}
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: -seg.start * 2.83 }}
                      transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                      className="cursor-pointer"
                      strokeLinecap="round"
                      style={{
                        filter: selectedType === seg.type ? "brightness(1.3)" : "brightness(1)",
                      }}
                      onClick={() => setSelectedType(seg.type)}
                    />
                  ))}

                  {/* Center number with pulse */}
                  <motion.text
                    x="100"
                    y="110"
                    textAnchor="middle"
                    className="text-6xl font-bold fill-gray-800"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    9
                  </motion.text>
                </svg>
              </div>

              {/* Legend - animasi masuk */}
              <div className="space-y-4">
                {enneagramData.map((item, i) => (
                  <motion.div
                    key={item.type}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-all ${
                      selectedType === item.type ? "bg-gray-100 shadow-md" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedType(item.type)}
                  >
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.color }} />
                    <div>
                      <div className="font-semibold text-gray-800">{item.label}</div>
                      <div className="text-sm text-gray-600">{item.value} orang</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabel + Export */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-gray-200">
              <h3 className="text-xl font-bold">Data User</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
                <tr>
                  <th className="px-8 py-4 text-left">Nama</th>
                  <th className="px-8 py-4 text-left">Email</th>
                  <th className="px-8 py-4 text-center">Jumlah Tes</th>
                  <th className="px-8 py-4 text-center">Tipe Terakhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentUsers.map((user, i) => (
                  <motion.tr
                    key={user.email}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-8 py-5 font-medium">{user.name}</td>
                    <td className="px-8 py-5 text-gray-600">{user.email}</td>
                    <td className="px-8 py-5 text-center">{user.tes}</td>
                    <td className="px-8 py-5 text-center">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-purple-100 text-purple-800">
                        {user.tipe}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-2">Export Data</h3>
              <p className="text-gray-600 text-sm">Download semua data dalam format Excel</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="mt-8 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3"
            >
              <Download className="w-6 h-6" />
              Download / E5 OOF
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}