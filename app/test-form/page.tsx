// app/test-form/page.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/lib/validations/auth"
import { rsvpSchema, type RSVPInput } from "@/lib/validations/rsvp"
import {
  createInvitationSchema,
  type CreateInvitationInput,
} from "@/lib/validations/invitation"

export default function TestFormPage() {
  // ==================== LOGIN FORM ====================
  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onLoginSubmit(data: LoginInput) {
    toast.success("Login berhasil!", {
      description: `Email: ${data.email}`,
    })
    console.log("Login data:", data)
  }

  // ==================== REGISTER FORM ====================
  const registerForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onRegisterSubmit(data: RegisterInput) {
    toast.success("Register berhasil!", {
      description: `Nama: ${data.name}`,
    })
    console.log("Register data:", data)
  }

  // ==================== RSVP FORM ====================
  const rsvpForm = useForm<RSVPInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      guestName: "",
      status: "attending",
      guestCount: 1,
      message: "",
    },
  })

  function onRsvpSubmit(data: RSVPInput) {
    toast.success("RSVP berhasil!", {
      description: `${data.guestName} - ${data.status}`,
    })
    console.log("RSVP data:", data)
  }

  // ==================== INVITATION FORM ====================
  const invitationForm = useForm<CreateInvitationInput>({
    resolver: zodResolver(createInvitationSchema),
    defaultValues: {
      title: "",
      templateId: "",
      slug: "",
      content: {
        groomName: "",
        brideName: "",
        date: "",
        location: "",
        story: "",
        quote: "",
        opening: "",
        language: "id",
      },
    },
  })

  function onInvitationSubmit(data: CreateInvitationInput) {
    toast.success("Undangan berhasil dibuat!", {
      description: `${data.content.groomName} & ${data.content.brideName}`,
    })
    console.log("Invitation data:", data)
  }

  return (
    <div className="container mx-auto space-y-8 p-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Form & Validasi Test</h1>
        <p className="text-muted-foreground">Test React Hook Form + Zod</p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* ==================== LOGIN ==================== */}
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Test validasi email & password</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="anjar@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* ==================== REGISTER ==================== */}
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Test validasi password kuat</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="Muhammad Anjar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="anjar@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Minimal 8 karakter, mengandung huruf besar, kecil, &
                        angka
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* ==================== RSVP ==================== */}
        <Card>
          <CardHeader>
            <CardTitle>RSVP</CardTitle>
            <CardDescription>Form konfirmasi kehadiran tamu</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...rsvpForm}>
              <form
                onSubmit={rsvpForm.handleSubmit(onRsvpSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={rsvpForm.control}
                  name="guestName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Tamu</FormLabel>
                      <FormControl>
                        <Input placeholder="Budi Santoso" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={rsvpForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Kehadiran</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="attending">Hadir</SelectItem>
                          <SelectItem value="not-attending">
                            Tidak Hadir
                          </SelectItem>
                          <SelectItem value="maybe">Mungkin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={rsvpForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ucapan (Opsional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Selamat menempuh hidup baru..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Kirim RSVP
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* ==================== INVITATION ==================== */}
        <Card>
          <CardHeader>
            <CardTitle>Buat Undangan</CardTitle>
            <CardDescription>Form lengkap undangan</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...invitationForm}>
              <form
                onSubmit={invitationForm.handleSubmit(onInvitationSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={invitationForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Undangan</FormLabel>
                      <FormControl>
                        <Input placeholder="Pernikahan Budi & Ani" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={invitationForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="budi-ani" {...field} />
                      </FormControl>
                      <FormDescription>
                        Hanya huruf kecil, angka, dan tanda hubung
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={invitationForm.control}
                  name="templateId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Template</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih template" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="jawa-classic">
                            Jawa Klasik
                          </SelectItem>
                          <SelectItem value="sunda-mega">
                            Sunda Mega Mendung
                          </SelectItem>
                          <SelectItem value="betawi-ondel">
                            Betawi Ondel-ondel
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={invitationForm.control}
                    name="content.groomName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Mempelai Pria</FormLabel>
                        <FormControl>
                          <Input placeholder="Budi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={invitationForm.control}
                    name="content.brideName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Mempelai Wanita</FormLabel>
                        <FormControl>
                          <Input placeholder="Ani" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={invitationForm.control}
                  name="content.date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={invitationForm.control}
                  name="content.location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lokasi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Gedung Serbaguna Jakarta"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Buat Undangan
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
