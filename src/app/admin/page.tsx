import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { ShieldAlert, Users, FileText, CreditCard } from 'lucide-react'

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Cek role user di database Prisma
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  })

  if (!dbUser || dbUser.role !== 'ADMIN') {
    // Jika bukan admin, tendang ke dashboard biasa
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-full bg-red-100 p-3">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-500">
              Selamat datang, Pemilik Anjar Project.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <Users className="mb-4 h-8 w-8 text-blue-600" />
            <p className="text-sm text-gray-500">Total User</p>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <FileText className="mb-4 h-8 w-8 text-green-600" />
            <p className="text-sm text-gray-500">Total Undangan</p>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <CreditCard className="mb-4 h-8 w-8 text-purple-600" />
            <p className="text-sm text-gray-500">Menunggu Verifikasi</p>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-500">
            Fitur manajemen Admin akan dibuat di Modul 9.
          </p>
        </div>
      </div>
    </div>
  )
}
