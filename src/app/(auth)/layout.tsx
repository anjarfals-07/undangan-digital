import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Kiri: Branding & Ilustrasi (Sembunyi di Mobile) */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 text-white lg:flex lg:w-1/2">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="h-8 w-8" />
          <span>Anjar Project</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl leading-tight font-bold">
            Buat Undangan Digital Impianmu dalam Hitungan Menit.
          </h1>
          <p className="text-lg text-blue-100">
            Pilih dari puluhan template adat dan modern, kustomisasi sesuai
            keinginan, dan bagikan ke tamu dengan sekali klik.
          </p>
        </div>

        <p className="text-sm text-blue-200">
          © 2026 Anjar Project. All rights reserved.
        </p>
      </div>

      {/* Kanan: Form Area */}
      <div className="flex w-full items-center justify-center bg-gray-50 p-6 sm:p-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Mobile */}
          <div className="mb-8 flex items-center justify-center gap-2 text-2xl font-bold text-blue-600 lg:hidden">
            <Sparkles className="h-8 w-8" />
            <span>Anjar Project</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
