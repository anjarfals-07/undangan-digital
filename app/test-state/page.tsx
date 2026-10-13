// app/test-state/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/stores/auth-store"
import { useEditorStore } from "@/stores/editor-store"
import { toast } from "sonner"

export default function TestStatePage() {
  const { user, isAuthenticated, setUser, logout } = useAuthStore()
  const {
    selectedSectionId,
    previewMode,
    editorMode,
    sections,
    setPreviewMode,
    setEditorMode,
    setSections,
    setSelectedSection,
    reset,
  } = useEditorStore()

  return (
    <div className="container mx-auto space-y-8 p-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">State Management Test</h1>
        <p className="text-muted-foreground">
          Halaman untuk test Zustand & TanStack Query
        </p>
      </div>

      <Separator />

      {/* Auth Store */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Auth Store (Zustand)</h2>
        <Card>
          <CardHeader>
            <CardTitle>Status Auth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <Badge variant={isAuthenticated ? "default" : "secondary"}>
                {isAuthenticated ? "Login" : "Logout"}
              </Badge>
            </div>
            <div>
              <span>User:</span>{" "}
              <span className="font-mono text-sm">
                {user ? JSON.stringify(user) : "null"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setUser({
                    id: "1",
                    email: "anjar@example.com",
                    name: "Muhammad Anjar",
                    role: "user",
                    plan: "free",
                    createdAt: new Date(),
                  })
                  toast.success("User di-set!")
                }}
              >
                Login (Mock)
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  logout()
                  toast.info("Logout!")
                }}
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Editor Store */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Editor Store (Zustand)</h2>
        <Card>
          <CardHeader>
            <CardTitle>Status Editor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground text-sm">
                  Preview Mode:
                </span>
                <div className="mt-1 flex gap-2">
                  <Button
                    size="sm"
                    variant={previewMode === "mobile" ? "default" : "outline"}
                    onClick={() => setPreviewMode("mobile")}
                  >
                    Mobile
                  </Button>
                  <Button
                    size="sm"
                    variant={previewMode === "desktop" ? "default" : "outline"}
                    onClick={() => setPreviewMode("desktop")}
                  >
                    Desktop
                  </Button>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground text-sm">
                  Editor Mode:
                </span>
                <div className="mt-1 flex gap-2">
                  {(["simple", "advanced", "pro"] as const).map((mode) => (
                    <Button
                      key={mode}
                      size="sm"
                      variant={editorMode === mode ? "default" : "outline"}
                      onClick={() => setEditorMode(mode)}
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <span className="text-muted-foreground text-sm">
                Sections ({sections.length}):
              </span>
              <div className="mt-1 flex flex-wrap gap-2">
                {sections.map((s) => (
                  <Badge
                    key={s.id}
                    variant={
                      selectedSectionId === s.id ? "default" : "secondary"
                    }
                    className="cursor-pointer"
                    onClick={() => setSelectedSection(s.id)}
                  >
                    {s.type}
                  </Badge>
                ))}
                {sections.length === 0 && (
                  <span className="text-sm text-gray-400">
                    Belum ada section
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setSections([
                    {
                      id: "1",
                      type: "hero",
                      enabled: true,
                      order: 0,
                      config: {},
                    },
                    {
                      id: "2",
                      type: "countdown",
                      enabled: true,
                      order: 1,
                      config: {},
                    },
                    {
                      id: "3",
                      type: "gallery",
                      enabled: true,
                      order: 2,
                      config: {},
                    },
                  ])
                  toast.success("Sections di-set!")
                }}
              >
                Set Sections (Mock)
              </Button>
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Info */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Info</h2>
        <Card>
          <CardContent className="space-y-2 p-6 text-sm">
            <p>✅ Zustand auth-store — persist ke localStorage</p>
            <p>✅ Zustand editor-store — state editor sementara</p>
            <p>✅ TanStack Query — setup provider di layout</p>
            <p>✅ Query hooks — useTemplates, useInvitations</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
