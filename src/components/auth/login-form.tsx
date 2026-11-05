'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Email atau password salah. Silakan coba lagi.')
      setLoading(false)
      return
    }

    // Redirect ke dashboard setelah login sukses
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Selamat Datang Kembali
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Masuk ke akun Anda untuk melanjutkan.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
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
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Lupa Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password Anda"
              className="h-11 pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            'Masuk'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Belum punya akun?{' '}
        <Link
          href="/register"
          className="font-semibold text-blue-600 transition-all hover:text-blue-700 hover:underline"
        >
          Daftar di sini
        </Link>
      </div>
    </div>
  )
}
