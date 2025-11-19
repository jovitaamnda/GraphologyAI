"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, MoreVertical, User, Mail, Calendar, Hash } from "lucide-react";

export default function DataUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const users = [
    { id: 1, name: "Jovita Cantika", email: "jovita@gmail.com", joinDate: "15 Mar 2025", tests: 7, lastType: 5, status: "active" },
    { id: 2, name: "Rhena Putri", email: "rhena@gmail.com", joinDate: "14 Mar 2025", tests: 4, lastType: 2, status: "active" },
    { id: 3, name: "Aisyah Nur Fadilah", email: "aisyah.nur@gmail.com", joinDate: "13 Mar 2025", tests: 9, lastType: 4, status: "active" },
    { id: 4, name: "Putri Ayu Lestari", email: "putri.ayu@gmail.com", joinDate: "12 Mar 2025", tests: 2, lastType: 1, status: "inactive" },
    { id: 5, name: "Budi Santoso", email: "budi.santoso@gmail.com", joinDate: "11 Mar 2025", tests: 15, lastType: 3, status: "active" },
    { id: 6, name: "Siti Aminah", email: "siti.aminah@gmail.com", joinDate: "10 Mar 2025", tests: 6, lastType: 5, status: "active" },
    { id: 7, name: "Ahmad Rizky", email: "ahmad.rizky@gmail.com", joinDate: "09 Mar 2025", tests: 11, lastType: 3, status: "active" },
    { id: 8, name: "Nadia Putri Ramadhani", email: "nadia.pr@gmail.com", joinDate: "08 Mar 2025", tests: 3, lastType: 2, status: "active" },
    { id: 9, name: "Fajar Nugroho", email: "fajar.nugroho@gmail.com", joinDate: "07 Mar 2025", tests: 8, lastType: 4, status: "active" },
    { id: 10, name: "Larasati Dewi", email: "laras.dewi@gmail.com", joinDate: "06 Mar 2025", tests: 5, lastType: 5, status: "active" },
    { id: 11, name: "Rizharul haq", email: "izharul@gmail.com", joinDate: "05 Mar 2025", tests: 1, lastType: 1, status: "inactive" },
    { id: 12, name: "Dian Puspita", email: "dian.puspita@gmail.com", joinDate: "04 Mar 2025", tests: 10, lastType: 2, status: "active" },
    { id: 13, name: "Rizki Pratama", email: "rizki.p@gmail.com", joinDate: "03 Mar 2025", tests: 13, lastType: 3, status: "active" },
    { id: 14, name: "Intan Permata", email: "intan.permata@gmail.com", joinDate: "02 Mar 2025", tests: 4, lastType: 4, status: "active" },
    { id: 15, name: "Aditya Wijaya", email: "adit.wijaya@gmail.com", joinDate: "01 Mar 2025", tests: 9, lastType: 5, status: "active" },
    { id: 16, name: "Salsa Bila", email: "salsa.bila@gmail.com", joinDate: "28 Feb 2025", tests: 2, lastType: 2, status: "active" },
    { id: 17, name: "Bayu Aji", email: "bayu.aji@gmail.com", joinDate: "27 Feb 2025", tests: 6, lastType: 1, status: "active" },
    { id: 18, name: "Cahya Putra", email: "cahya.putra@gmail.com", joinDate: "26 Feb 2025", tests: 14, lastType: 3, status: "active" },
    { id: 19, name: "Dewi Sartika", email: "dewi.sartika@gmail.com", joinDate: "25 Feb 2025", tests: 5, lastType: 4, status: "active" },
    { id: 20, name: "Eko Prasetyo", email: "eko.pras@gmail.com", joinDate: "24 Feb 2025", tests: 8, lastType: 5, status: "active" },
    { id: 21, name: "Farah Diba", email: "farah.diba@gmail.com", joinDate: "23 Feb 2025", tests: 3, lastType: 2, status: "active" },
    { id: 22, name: "Galih Pratama", email: "galih.p@gmail.com", joinDate: "22 Feb 2025", tests: 7, lastType: 3, status: "active" },
    { id: 23, name: "Hana Lestari", email: "hana.lestari@gmail.com", joinDate: "21 Feb 2025", tests: 4, lastType: 4, status: "active" },
    { id: 24, name: "Ilham Ramadhan", email: "ilham.ramadhan@gmail.com", joinDate: "20 Feb 2025", tests: 12, lastType: 1, status: "active" },
    { id: 25, name: "Jihan Aulia", email: "jihan.aulia@gmail.com", joinDate: "19 Feb 2025", tests: 6, lastType: 2, status: "active" },
    { id: 26, name: "Karin Novita", email: "karin.novita@gmail.com", joinDate: "18 Feb 2025", tests: 9, lastType: 5, status: "active" },
    { id: 27, name: "Luthfi Hidayat", email: "luthfi.h@gmail.com", joinDate: "17 Feb 2025", tests: 11, lastType: 3, status: "active" },
    { id: 28, name: "Maya Sari", email: "maya.sari@gmail.com", joinDate: "16 Feb 2025", tests: 5, lastType: 4, status: "active" },
    { id: 29, name: "Naufal Arif", email: "naufal.arif@gmail.com", joinDate: "15 Feb 2025", tests: 8, lastType: 5, status: "active" },
    { id: 30, name: "Oktavia Putri", email: "okta.putri@gmail.com", joinDate: "14 Feb 2025", tests: 3, lastType: 2, status: "active" },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || user.lastType === Number(filterType);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-10 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Data User</h1>
        <p className="text-gray-600 mt-1">Kelola dan pantau semua pengguna GraphologyAI</p>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Search + Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-5 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Semua Tipe</option>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>Tipe {n}</option>)}
              </select>
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition flex items-center gap-2 shadow-lg">
                <Download className="w-5 h-5" /> Export Excel
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total User", value: "156", icon: User, color: "blue" },
            { label: "User Aktif", value: "148", icon: User, color: "green" },
            { label: "Tes Hari Ini", value: "23", icon: Hash, color: "purple" },
            { label: "Rata-rata Tes", value: "5.1", icon: Calendar, color: "orange" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabel */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold">Daftar Pengguna</h2>
            <span className="text-sm text-gray-500">{filteredUsers.length} dari {users.length} user</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-medium text-gray-600 uppercase">Nama</th>
                  <th className="px-8 py-5 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
                  <th className="px-8 py-5 text-center text-xs font-medium text-gray-600 uppercase">Tgl Join</th>
                  <th className="px-8 py-5 text-center text-xs font-medium text-gray-600 uppercase">Jumlah Tes</th>
                  <th className="px-8 py-5 text-center text-xs font-medium text-gray-600 uppercase">Tipe Terakhir</th>
                  <th className="px-8 py-5 text-center text-xs font-medium text-gray-600 uppercase">Status</th>
                  <th className="px-8 py-5 text-center text-xs font-medium text-gray-600 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-indigo-50/70 transition"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {user.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                        </div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </td>
                    <td className="px-8 py-6 text-center text-gray-600">{user.joinDate}</td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                        {user.tests}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl ${
                          user.lastType === 1 ? "bg-gray-600" :
                          user.lastType === 2 ? "bg-purple-600" :
                          user.lastType === 3 ? "bg-blue-600" :
                          user.lastType === 4 ? "bg-green-600" :
                          "bg-red-600"
                        }`}>
                          {user.lastType}
                        </div>
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-600">Tipe</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-2 rounded-full text-xs font-medium ${
                        user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                      }`}>
                        {user.status === "active" ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-5 border-t flex justify-between items-center bg-gray-50">
            <p className="text-sm text-gray-600">Menampilkan 1–30 dari {users.length} hasil</p>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(p => (
                <button key={p} className={`w-10 h-10 rounded-lg font-medium transition ${p===1?"bg-indigo-600 text-white":"bg-white border hover:bg-gray-100"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}