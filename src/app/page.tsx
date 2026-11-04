'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Home() {
  const [status, setStatus] = useState('Memeriksa koneksi...')
  const supabase = createClient()

  useEffect(() => {
    async function checkConnection() {
      const { error } = await supabase.auth.getSession()
      if (error) {
        setStatus('Gagal terhubung: ' + error.message)
      } else {
        setStatus('✅ Supabase Auth Terhubung dengan Baik!')
      }
    }
    checkConnection()
  }, [supabase])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-24">
      <h1 className="mb-4 text-4xl font-bold text-blue-600">Anjar Digital</h1>
      <p className="text-lg font-medium text-gray-700">{status}</p>
    </main>
  )
}
