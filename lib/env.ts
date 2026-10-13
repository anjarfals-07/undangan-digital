// lib/env.ts
import { z } from "zod"

/**
 * Schema validasi environment variables.
 *
 * Catatan:
 * - Server-only variables (tanpa NEXT_PUBLIC_) tidak boleh diakses dari client
 * - Client variables (dengan NEXT_PUBLIC_) bisa diakses dari client
 * - Gunakan .optional() untuk env yang belum diisi (Phase 12)
 */

const envSchema = z.object({
  // ==================== APP ====================
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url("NEXT_PUBLIC_APP_URL harus berupa URL valid")
    .default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("AnjarDigital"),

  // ==================== SUPABASE ====================
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("NEXT_PUBLIC_SUPABASE_URL harus berupa URL valid")
    .optional()
    .or(z.literal("")),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().or(z.literal("")),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().or(z.literal("")),

  // ==================== CLOUDFLARE R2 ====================
  R2_ACCOUNT_ID: z.string().optional().or(z.literal("")),
  R2_ACCESS_KEY_ID: z.string().optional().or(z.literal("")),
  R2_SECRET_ACCESS_KEY: z.string().optional().or(z.literal("")),
  R2_BUCKET_NAME: z.string().default("anjardigital-assets"),
  NEXT_PUBLIC_R2_PUBLIC_URL: z.string().optional().or(z.literal("")),

  // ==================== MIDTRANS ====================
  MIDTRANS_SERVER_KEY: z.string().optional().or(z.literal("")),
  MIDTRANS_CLIENT_KEY: z.string().optional().or(z.literal("")),
  NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: z.string().optional().or(z.literal("")),
  // ✅ SESUDAH (benar)
  MIDTRANS_IS_PRODUCTION: z
    .string()
    .optional()
    .default("false")
    .transform((val) => val === "true"),

  // ==================== WHATSAPP API ====================
  FONNTE_API_KEY: z.string().optional().or(z.literal("")),

  // ==================== EMAIL ====================
  RESEND_API_KEY: z.string().optional().or(z.literal("")),
  EMAIL_FROM: z
    .string()
    .email("EMAIL_FROM harus berupa email valid")
    .default("noreply@anjardigital.id"),

  // ==================== MONITORING ====================
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional().or(z.literal("")),

  // ==================== NODE ====================
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
})

/**
 * Parse & validasi env.
 * Kalau ada yang salah, akan throw error saat build.
 */
function parseEnv() {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    NEXT_PUBLIC_R2_PUBLIC_URL: process.env.NEXT_PUBLIC_R2_PUBLIC_URL,
    MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
    MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY,
    NEXT_PUBLIC_MIDTRANS_CLIENT_KEY:
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    MIDTRANS_IS_PRODUCTION: process.env.MIDTRANS_IS_PRODUCTION,
    FONNTE_API_KEY: process.env.FONNTE_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NODE_ENV: process.env.NODE_ENV,
  })

  if (!parsed.success) {
    console.error(
      "❌ Environment variables tidak valid:",
      parsed.error.flatten().fieldErrors
    )
    throw new Error("Environment variables tidak valid")
  }

  return parsed.data
}

export const env = parseEnv()
