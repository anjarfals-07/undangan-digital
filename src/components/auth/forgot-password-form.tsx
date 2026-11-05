'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react'

export function ForgotPasswordForm() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      },
    )

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl">
        <div className="inline-flex rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Cek Email Anda!</h2>
        <p className="text-gray-500">
          Kami telah mengirim link reset password ke <strong>{email}</strong>.
          Silakan cek inbox (dan folder spam).
        </p>
        <Link
          href="/login"
          className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Login
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Lupa Password?</h2>
        <p className="mt-2 text-sm text-gray-500">
          Masukkan email Anda, kami akan mengirim link untuk mereset password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
              Mengirim...
            </>
          ) : (
            'Kirim Link Reset'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          Kembali ke Login
        </Link>
      </div>
    </div>
  )
}
