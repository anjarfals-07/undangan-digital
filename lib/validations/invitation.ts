// lib/validations/invitation.ts
import { z } from "zod"

export const invitationContentSchema = z.object({
  groomName: z
    .string()
    .min(2, "Nama mempelai pria minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  brideName: z
    .string()
    .min(2, "Nama mempelai wanita minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  location: z
    .string()
    .min(5, "Lokasi minimal 5 karakter")
    .max(500, "Lokasi maksimal 500 karakter"),
  story: z.string().max(2000, "Cerita maksimal 2000 karakter").optional(),
  quote: z.string().max(500, "Kutipan maksimal 500 karakter").optional(),
  opening: z.string().max(500, "Pembuka maksimal 500 karakter").optional(),
  language: z.string().min(2, "Bahasa wajib diisi"),
})

export const createInvitationSchema = z.object({
  title: z
    .string()
    .min(3, "Judul minimal 3 karakter")
    .max(100, "Judul maksimal 100 karakter"),
  templateId: z.string().min(1, "Template wajib dipilih"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .max(50, "Slug maksimal 50 karakter")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug hanya boleh huruf kecil, angka, dan tanda hubung"
    ),
  content: invitationContentSchema,
})

export const updateInvitationSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan -")
    .optional(),
  content: invitationContentSchema.partial().optional(),
})

export type CreateInvitationInput = z.infer<typeof createInvitationSchema>
export type UpdateInvitationInput = z.infer<typeof updateInvitationSchema>
