'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  User,
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Camera,
  ShieldCheck,
} from 'lucide-react'

interface ProfileFormProps {
  initialName: string
  email: string
}

export function ProfileForm({ initialName, email }: ProfileFormProps) {
  const supabase = createClient()
  const [name, setName] = useState(initialName)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Fungsi untuk mendapatkan inisial nama (misal: "Budi Santoso" -> "BS")
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const { error: updateError } = await supabase.auth.updateUser({
      data: { full_name: name },
    })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Sisi Kiri: Kartu Identitas */}
        <div className="flex flex-col items-center justify-center border-b border-gray-100 bg-gradient-to-b from-blue-50 to-white p-8 md:border-r md:border-b-0">
          <div className="group relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white shadow-lg ring-4 ring-blue-100">
              {getInitials(name || 'User')}
            </div>
            <button className="absolute right-0 bottom-0 rounded-full border border-gray-100 bg-white p-2 text-gray-600 shadow-md transition-colors hover:text-blue-600">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h3 className="mt-4 text-center text-xl font-bold text-gray-900">
            {name}
          </h3>
          <p className="text-sm text-gray-500">{email}</p>

          <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Akun Terverifikasi
          </div>
        </div>

        {/* Sisi Kanan: Form Edit */}
        <div className="p-8 md:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Informasi Pribadi
            </h2>
            <p className="text-sm text-gray-500">
              Perbarui data diri Anda di sini.
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Email (Read-only) */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  disabled
                  className="h-11 cursor-not-allowed bg-gray-50 pl-10 text-gray-500"
                />
              </div>
              <p className="text-xs text-gray-500">
                Email terhubung dengan akun ini dan tidak dapat diubah.
              </p>
            </div>

            {/* Nama */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="h-11 pl-10 focus-visible:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Notifikasi */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 p-3 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <p>Profil berhasil diperbarui!</p>
              </div>
            )}

            {/* Tombol Aksi */}
            <div className="mt-6 flex items-center justify-end border-t border-gray-100 pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  'Simpan Perubahan'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
