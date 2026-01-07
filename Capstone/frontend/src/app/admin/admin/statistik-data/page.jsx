"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Activity, Calendar, Clock, Target, Award, Zap, ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

export default function StatistikData() {
  // Data statistik harian (7 hari terakhir)
  const dailyData = [
    { day: "Senin", users: 145, tests: 89, avgTime: 6.2 },
    { day: "Selasa", users: 168, tests: 112, avgTime: 5.8 },
    { day: "Rabu", users: 182, tests: 134, avgTime: 5.5 },
    { day: "Kamis", users: 198, tests: 156, avgTime: 5.9 },
    { day: "Jumat", users: 215, tests: 178, avgTime: 6.1 },
    { day: "Sabtu", users: 189, tests: 142, avgTime: 7.3 },
    { day: "Minggu", users: 176, tests: 128, avgTime: 7.8 },
  ];

  // Data pertumbuhan bulanan
  const growthData = [
    { month: "Okt 2024", users: 850, tests: 420 },
    { month: "Nov 2024", users: 1120, tests: 680 },
    { month: "Des 2024", users: 1380, tests: 890 },
    { month: "Jan 2025", users: 1650, tests: 1120 },
    { month: "Feb 2025", users: 1890, tests: 1420 },
    { month: "Mar 2025", users: 2196, tests: 1789 },
  ];

  // KPI Utama
  const kpis = [
    { label: "Total Pengguna", value: "2,196", change: "+28%", trend: "up", icon: Users, color: "indigo" },
    { label: "Total Tes Selesai", value: "1,789", change: "+42%", trend: "up", icon: Target, color: "purple" },
    { label: "Rata-rata Waktu Tes", value: "6.4 menit", change: "-12%", trend: "down", icon: Clock, color: "pink" },
    { label: "Konversi Tes", value: "81.5%", change: "+18%", trend: "up", icon: Activity, color: "green" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-10 py-6">
        <h1 className="text-4xl font-bold text-gray-900">Statistik & Analitik</h1>
        <p className="text-gray-600 mt-2 text-lg">Pantau performa GraphologyAI secara real-time</p>
      </div>

      <div className="p-8 max-w-7xl mx-auto space-y-10">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {kpis.map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              
              <div className={`w-16 h-16 bg-${kpi.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                <kpi.icon className={`w-9 h-9 text-${kpi.color}-600`} />
              </div>

              <p className="text-gray-600 text-sm font-medium">{kpi.label}</p>
              <p className="text-5xl font-bold text-gray-900 mt-2">{kpi.value}</p>
              
              <div className={`flex items-center gap-2 mt-4 ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {kpi.trend === "up" ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                <span className="font-bold text-lg">{kpi.change}</span>
                <span className="text-sm">vs bulan lalu</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aktivitas Harian (Line + Area Chart) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Activity className="w-10 h-10 text-indigo-600" />
            Aktivitas Pengguna (7 Hari Terakhir)
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={dailyData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ background: "#1f2937", border: "none", borderRadius: "12px", color: "white" }}
              />
              <Area type="monotone" dataKey="users" stackId="1" stroke="#8b5cf6" fill="#c4b5fd" name="Pengguna Aktif" />
              <Area type="monotone" dataKey="tests" stackId="1" stroke="#3b82f6" fill="#93c5fd" name="Tes Selesai" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pertumbuhan Bulanan (Bar Chart) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <TrendingUp className="w-10 h-10 text-green-600" />
              Pertumbuhan Pengguna
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#10b981" radius={[10, 10, 0, 0]} name="Total Pengguna" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Zap className="w-10 h-10 text-yellow-600" />
              Total Tes per Bulan
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tests" stroke="#f59e0b" strokeWidth={5} dot={{ fill: "#f59e0b", r: 8 }} name="Tes Selesai" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-10 text-white shadow-2xl text-center"
          >
            <Award className="w-20 h-20 mx-auto mb-4 opacity-90" />
            <p className="text-5xl font-bold">98.7%</p>
            <p className="text-xl mt-2 opacity-90">Akurasi Prediksi Tipe</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-10 text-white shadow-2xl text-center"
          >
            <Calendar className="w-20 h-20 mx-auto mb-4 opacity-90" />
            <p className="text-5xl font-bold">156 hari</p>
            <p className="text-xl mt-2 opacity-90">Sejak Launch Aplikasi</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-10 text-white shadow-2xl text-center"
          >
            <Target className="w-20 h-20 mx-auto mb-4 opacity-90" />
            <p className="text-5xl font-bold">1,789</p>
            <p className="text-xl mt-2 opacity-90">Tes Berhasil Diselesaikan</p>
          </motion.div>
        </div>

        {/* Closing Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center shadow-2xl"
        >
          <h2 className="text-5xl font-bold mb-4">GraphologyAI Berkembang Pesat!</h2>
          <p className="text-2xl opacity-90">Dalam 6 bulan: +158% pengguna • +326% tes • 98.7% akurasi</p>
          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-6xl font-bold">2,196</p>
              <p className="text-xl">Total Pengguna</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-bold">1,789</p>
              <p className="text-xl">Tes Selesai</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-bold">87.4</p>
              <p className="text-xl">Rata-rata Skor</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}