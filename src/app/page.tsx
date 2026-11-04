import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 gap-6">
      <h1 className="text-4xl font-bold text-blue-600">
        Anjar Digital
      </h1>
      <p className="text-gray-600">
        Aplikasi Undangan Digital (Next.js 16) berhasil diinisialisasi.
      </p>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Test shadcn/ui</CardTitle>
          <CardDescription>Jika kamu melihat ini, setup berhasil.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Klik Saya</Button>
        </CardContent>
      </Card>
    </main>
  )
}