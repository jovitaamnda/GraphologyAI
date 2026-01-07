import { Sidebar } from '@/components/admin/Sidebar'

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 min-h-screen bg-gray-50 w-full">
        <header className="bg-[#2c3e50] text-white p-6 shadow-md">
          <h1 className="text-2xl font-bold">Dashboard Admin — GraphologyAI</h1>
        </header>
        <main className="p-10">{children}</main>
      </div>
    </div>
  )
}