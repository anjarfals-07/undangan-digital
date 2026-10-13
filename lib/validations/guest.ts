// lib/validations/guest.ts
import { z } from "zod"

export const guestSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]+$/, "Format telepon tidak valid")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Format email tidak valid")
    .optional()
    .or(z.literal("")),
})

export const bulkGuestSchema = z.object({
  guests: z
    .array(guestSchema)
    .min(1, "Minimal 1 tamu")
    .max(1000, "Maksimal 1000 tamu per import"),
})

export type GuestInput = z.infer<typeof guestSchema>
export type BulkGuestInput = z.infer<typeof bulkGuestSchema>
