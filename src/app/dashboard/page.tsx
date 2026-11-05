import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Sparkles,
  FileText,
  Users,
  Eye,
  PlusCircle,
  User,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const userName = user.user_metadata?.full_name || 'Pengguna'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          {/* Logo Kiri */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xl font-bold text-blue-600"
          >
            <Sparkles className="h-5 w-5" /> Anjar Project
          </Link>

          {/* Menu Kanan (Dropdown) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 outline-none focus:outline-none">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  {userInitial}
                </div>
                <span className="hidden text-sm font-medium text-gray-700 hover:text-blue-600 sm:block">
                  {userName}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium">{userName}</p>
                  <p className="text-xs leading-none text-gray-500">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="flex w-full cursor-pointer items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil Saya</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Form Logout dibungkus di dalam DropdownMenuItem */}
              <DropdownMenuItem asChild>
                <form action="/auth/signout" method="post" className="w-full">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <main className="mx-auto mt-4 max-w-5xl space-y-8 p-6">
        {/* Header Sapaan & Tombol Buat Undangan */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Halo, {userName}! 👋
            </h1>
            <p className="mt-1 text-gray-500">
              Selamat datang di dashboard Anjar Project. Mari buat undangan
              impianmu.
            </p>
          </div>
          <Button className="shrink-0 bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Buat Undangan Baru
          </Button>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Undangan Dibuat</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="rounded-lg bg-green-50 p-3 text-green-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tamu Hadir</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Kunjungan</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>

        {/* Area Kosong (Nanti diisi daftar undangan) */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <div className="mb-4 rounded-full bg-gray-50 p-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-1 text-lg font-medium text-gray-900">
            Belum ada undangan
          </h3>
          <p className="mb-4 max-w-sm text-sm text-gray-500">
            Anda belum membuat undangan digital apa pun. Klik tombol di bawah
            untuk memulai.
          </p>
          <Button variant="outline" className="mt-2">
            Buat Undangan Pertama Anda
          </Button>
        </div>
      </main>
    </div>
  )
}
