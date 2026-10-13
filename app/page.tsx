// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Anjar Digital
        </h1>
        <p className="text-xl md:text-2xl text-gray-500">
          Digital untuk momen spesial
        </p>
        <p className="text-base text-gray-600 max-w-md mx-auto">
          Buat undangan digital pernikahan, khitanan, dan ulang tahun
          dengan template adat Nusantara
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium">
            Mulai Buat Undangan
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Lihat Template
          </button>
        </div>
      </div>
    </main>
  )
}