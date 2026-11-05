'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

export function ResetPasswordForm() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Pastikan user punya sesi (dari link email)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setError('Link reset password tidak valid atau sudah kedaluwarsa.')
      }
    })
  }, [supabase])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak sama.')
      return
    }

    if (password.length < 8) {
      setError('Password minimal 8 karakter.')
      return
    }

    setLoading(true)

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)

    setTimeout(() => {
      router.push('/login')
    }, 3000)
  }

  if (success) {
    return (
      <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl">
        <div className="inline-flex rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Password Berhasil Diubah!
        </h2>
        <p className="text-gray-500">
          Password Anda telah diperbarui. Anda akan diarahkan ke halaman login
          dalam 3 detik.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        <p className="mt-2 text-sm text-gray-500">
          Masukkan password baru Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password Baru
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

        <div className="space-y-1.5">
          <label
            htmlFor="confirm"
            className="text-sm font-medium text-gray-700"
          >
            Konfirmasi Password
          </label>
          <div className="relative">
            <Lock className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
            <Input
              id="confirm"
              type="password"
              placeholder="Ulangi password baru"
              className="h-11 pl-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <Button
          type="submit"
          className="h-11 w-full bg-blue-600 font-medium text-white hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            'Simpan Password Baru'
          )}
        </Button>
      </form>
    </div>
  )
}
