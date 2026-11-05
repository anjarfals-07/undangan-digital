'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  User,
  Mail,
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

export function RegisterForm() {
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // 1. Daftarkan ke Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // 2. Simpan data ke tabel User di Prisma (via API Route)
    if (authData.user) {
      try {
        await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: authData.user.id,
            email: authData.user.email,
            name: name,
          }),
        })
      } catch (err) {
        console.error('Gagal sinkronisasi ke database:', err)
      }
    }

    setSuccess(true)
    setLoading(false)

    setTimeout(() => {
      router.push('/login')
    }, 4000)
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-green-100 bg-white p-8 text-center shadow-xl">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Pendaftaran Berhasil!
        </h2>
        <p className="text-gray-500">
          Kami telah mengirim link verifikasi ke <strong>{email}</strong>.
          Silakan cek email Anda (termasuk folder spam).
        </p>
        <p className="mt-4 text-sm text-gray-400">
          Mengalihkan ke halaman login dalam 4 detik...
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Buat Akun Baru</h2>
        <p className="mt-2 text-sm text-gray-500">
          Mulai perjalanan Anda membuat undangan yang tak terlupakan.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        {/* Input Nama */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <div className="relative">
            <User className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
            <Input
              id="name"
              type="text"
              placeholder="Budi Santoso"
              className="h-11 pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Input Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Alamat Email
          </label>
          <div className="relative">
            <Mail className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="budi@example.com"
              className="h-11 pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Input Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="Minimal 8 karakter"
              className="h-11 pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
          </div>
        </div>

        {/* Pesan Error */}
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Tombol Submit */}
        <Button
          type="submit"
          className="h-11 w-full bg-blue-600 font-medium text-white transition-all hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses...
            </>
          ) : (
            'Daftar Sekarang'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Sudah punya akun?{' '}
        <Link
          href="/login"
          className="font-semibold text-blue-600 transition-all hover:text-blue-700 hover:underline"
        >
          Masuk di sini
        </Link>
      </div>
    </div>
  )
}
