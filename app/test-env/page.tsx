// app/test-env/page.tsx
import { env } from "@/lib/env"
import { siteConfig } from "@/config/site"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function TestEnvPage() {
  return (
    <div className="container mx-auto space-y-8 p-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Env Test</h1>
        <p className="text-muted-foreground">
          Verifikasi environment variables sudah terbaca
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Site Config */}
        <Card>
          <CardHeader>
            <CardTitle>Site Config</CardTitle>
            <CardDescription>Diambil dari env</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-mono">{siteConfig.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">URL:</span>
              <span className="font-mono">{siteConfig.url}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tagline:</span>
              <span className="font-mono">{siteConfig.tagline}</span>
            </div>
          </CardContent>
        </Card>

        {/* Env Status */}
        <Card>
          <CardHeader>
            <CardTitle>Env Status</CardTitle>
            <CardDescription>Status setiap env</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">App URL:</span>
              <Badge
                variant={env.NEXT_PUBLIC_APP_URL ? "default" : "secondary"}
              >
                {env.NEXT_PUBLIC_APP_URL ? "✓" : "empty"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">App Name:</span>
              <Badge
                variant={env.NEXT_PUBLIC_APP_NAME ? "default" : "secondary"}
              >
                {env.NEXT_PUBLIC_APP_NAME ? "✓" : "empty"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Supabase URL:</span>
              <Badge
                variant={env.NEXT_PUBLIC_SUPABASE_URL ? "default" : "secondary"}
              >
                {env.NEXT_PUBLIC_SUPABASE_URL ? "✓" : "empty"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">R2 Bucket:</span>
              <Badge variant={env.R2_BUCKET_NAME ? "default" : "secondary"}>
                {env.R2_BUCKET_NAME || "empty"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Node Env:</span>
              <Badge variant="outline">{env.NODE_ENV}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Info */}
      <Card>
        <CardHeader>
          <CardTitle>Catatan</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          <p>✅ Env berhasil di-parse & validasi dengan Zod</p>
          <p>
            ✅ Supabase, R2, Midtrans, Fonnte, Resend masih kosong — akan diisi
            di Phase 12 (deploy)
          </p>
          <p>
            ✅ File <code>.env.local</code> sudah di-ignore dari Git
          </p>
          <p>
            ✅ File <code>.env.example</code> di-commit sebagai template
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
