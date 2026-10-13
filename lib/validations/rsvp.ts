// lib/validations/rsvp.ts
import { z } from "zod";

export const rsvpSchema = z.object({
  guestName: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  status: z.enum(["attending", "not-attending", "maybe"], {
    message: "Status kehadiran wajib dipilih",
  }),
  guestCount: z.number().min(1, "Minimal 1 orang").max(10, "Maksimal 10 orang"),
  message: z.string().max(500).optional(),
});

export type RSVPInput = z.infer<typeof rsvpSchema>;
