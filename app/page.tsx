// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="max-w-2xl space-y-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
          Anjar Digital
        </h1>
        <p className="text-xl text-gray-500 md:text-2xl">
          Digital untuk momen spesial
        </p>
        <p className="mx-auto max-w-md text-base text-gray-600">
          Buat undangan digital pernikahan, khitanan, dan ulang tahun dengan
          template adat Nusantara
        </p>
        <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
          <button className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-700">
            Mulai Buat Undangan
          </button>
          <button className="rounded-lg border border-gray-300 px-6 py-3 font-medium transition-colors hover:bg-gray-50">
            Lihat Template
          </button>
        </div>
      </div>
    </main>
  )
}
