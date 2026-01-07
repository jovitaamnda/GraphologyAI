"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Download, Users, FileText, LogOut, TrendingUp } from "lucide-react";
import * as XLSX from "xlsx";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [selectedType, setSelectedType] = useState(null);
  const [stats, setStats] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [analysesLoading, setAnalysesLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Protected Route - Cek role admin
  useEffect(() => {
    if (loading) return;

    // Jika tidak login, redirect ke login
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Jika bukan admin, redirect ke user dashboard
    if (user.role !== "admin") {
      router.push("/dashboard");
      return;
    }
  }, [user, loading, router]);

  // Fetch stats dari backend
  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("/api/analysis/admin/stats", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to fetch statistics");
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  // Fetch analyses dari backend
  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchAnalyses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("/api/analysis/admin/analyses?page=1&limit=10", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setAnalyses(data.analyses || []);
      } catch (err) {
        console.error("Error fetching analyses:", err);
        setError("Failed to fetch analyses");
      } finally {
        setAnalysesLoading(false);
      }
    };

    fetchAnalyses();
  }, [user]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Jika tidak admin, jangan render apa-apa
  if (!user || user.role !== "admin") {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  // Personality types data (Handwriting Analysis - 6 types)
  const personalityTypes = [
    { type: "Optimist", value: 15, color: "#FFD700", label: "Optimis" },
    { type: "Introvert", value: 12, color: "#8B5CF6", label: "Introvert" },
    { type: "Creative", value: 18, color: "#3B82F6", label: "Kreatif" },
    { type: "Analytical", value: 14, color: "#10B981", label: "Analitis" },
    { type: "Leader", value: 16, color: "#EF4444", label: "Pemimpin" },
    { type: "Dreamer", value: 13, color: "#EC4899", label: "Pemimpi" },
  ];

  const totalAnalyses = stats?.totalAnalyses || 0;
  const successRate = stats?.successRate || 0;

  const total = personalityTypes.reduce((a, b) => a + b.value, 0);
  let cumulative = 0;
  const segments = personalityTypes.map((item) => {
    const percent = (item.value / total) * 100;
    const start = cumulative;
    cumulative += percent;
    return { ...item, percent, start };
  });

  const handleExport = () => {
    const data = analyses.map(analysis => ({
      "User ID": analysis.userId,
      "Type": analysis.analysisType,
      "Personality": analysis.personalityType,
      "Confidence": analysis.traits?.confidence || 0,
      "Creativity": analysis.traits?.creativity || 0,
      "Extraversion": analysis.traits?.extraversion || 0,
      "Analytical Mind": analysis.traits?.analyticalMind || 0,
      "Emotional Intelligence": analysis.traits?.emotionalIntelligence || 0,
      "Status": analysis.status,
      "Date": new Date(analysis.createdAt).toLocaleDateString()
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Analyses");
    XLSX.writeFile(wb, "GraphologyAI_Analyses.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-10 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="p-8 max-w-7xl mx-auto space-y-10">
        {/* Stats Cards - dengan animasi masuk */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Analisis</p>
                <p className="text-6xl font-bold text-gray-900 mt-3">
                  {statsLoading ? "-" : totalAnalyses}
                </p>
              </div>
              <div className="bg-blue-100 p-5 rounded-2xl">
                <FileText className="w-12 h-12 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Success Rate</p>
                <p className="text-6xl font-bold text-gray-900 mt-3">
                  {statsLoading ? "-" : `${successRate}%`}
                </p>
              </div>
              <div className="bg-green-100 p-5 rounded-2xl">
                <TrendingUp className="w-12 h-12 text-green-600" />
              </div>
            </div>
          </motion.div>

          {/* Grafik Personality Types - ANIMASI SUPER LEMBUT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Personality Types</h3>
              {statsLoading && <div className="w-8 h-8 border-2 border-gray-300 rounded-full animate-spin" />}
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
                    6
                  </motion.text>
                </svg>
              </div>

              {/* Legend - animasi masuk */}
              <div className="space-y-4">
                {personalityTypes.map((item, i) => (
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
              <h3 className="text-xl font-bold">Recent Analyses</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
                  <tr>
                    <th className="px-8 py-4 text-left">Type</th>
                    <th className="px-8 py-4 text-left">Personality</th>
                    <th className="px-8 py-4 text-center">Confidence</th>
                    <th className="px-8 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {analysesLoading ? (
                    <tr>
                      <td colSpan="4" className="px-8 py-5 text-center text-gray-600">
                        Loading analyses...
                      </td>
                    </tr>
                  ) : analyses.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-8 py-5 text-center text-gray-600">
                        No analyses found
                      </td>
                    </tr>
                  ) : (
                    analyses.map((analysis, i) => (
                      <motion.tr
                        key={analysis._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-8 py-5 font-medium capitalize">{analysis.analysisType}</td>
                        <td className="px-8 py-5 text-gray-600">{analysis.personalityType}</td>
                        <td className="px-8 py-5 text-center">{analysis.traits?.confidence || 0}%</td>
                        <td className="px-8 py-5 text-center">
                          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                            analysis.status === "completed" ? "bg-green-100 text-green-800" :
                            analysis.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {analysis.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-2">Export Data</h3>
              <p className="text-gray-600 text-sm">Download semua data analyses dalam format Excel</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              disabled={analyses.length === 0}
              className="mt-8 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-6 h-6" />
              Download Excel
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}