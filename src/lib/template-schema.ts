import { z } from 'zod'

export const CategoryEnum = z.enum([
  'ADAT',
  'MODERN',
  'RELIGI',
  'KIDS',
  'CORPORATE',
  'THEME',
])

export const EventTypeEnum = z.enum([
  'PERNIKAHAN',
  'KHITANAN',
  'ULANG_TAHUN',
  'AQIQAH',
  'WISUDA',
  'ACARA_UMUM',
])

export const AdatTypeEnum = z.enum([
  'BATAK',
  'JAWA',
  'SUNDA',
  'MINANG',
  'BUGIS',
  'BALI',
  'PALEMBANG',
  'BETAWI',
  'DAYAK',
  'PAPUA',
  'ACEH',
  'UMUM',
])

// Layout Style: Bagaimana susunan halamannya
export const LayoutStyleEnum = z.enum([
  'SCROLL', // Gulir vertikal biasa (standar)
  'PARALLAX', // Gulir dengan efek 3D
  'SLIDER', // Halaman per halaman
  'GRID', // Galeri berbentuk grid
])

export const ThemeColorsSchema = z.object({
  primary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  secondary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  background: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  text: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  accent: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
})

export const ThemeFontsSchema = z.object({
  heading: z.string(),
  body: z.string(),
  script: z.string().optional(), // Font khusus untuk nama (misal: "Great Vibes")
})

export const SectionsSchema = z.object({
  cover: z.boolean().default(true),
  countdown: z.boolean().default(true),
  gallery: z.boolean().default(true),
  loveStory: z.boolean().default(false),
  location: z.boolean().default(true),
  rsvp: z.boolean().default(true),
  ucapan: z.boolean().default(true),
  gift: z.boolean().default(true),
  video: z.boolean().default(false), // Fitur video (nanti)
})

export const AdatConfigSchema = z
  .object({
    type: AdatTypeEnum,
    ornamenUrl: z.string().url().optional(),
    quotes: z.array(z.string()).default([]),
    // Tambahan: Musik khas daerah
    traditionalMusic: z.string().url().optional(),
  })
  .optional()

export const TemplateConfigSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3),
  category: CategoryEnum,
  eventType: EventTypeEnum,
  thumbnailUrl: z.string().url(),
  isPremium: z.boolean().default(false),
  layoutStyle: LayoutStyleEnum.default('SCROLL'),
  colors: ThemeColorsSchema,
  fonts: ThemeFontsSchema,
  sections: SectionsSchema,
  adat: AdatConfigSchema,
  version: z.string().optional().default('1.0.0'),
})

export type TemplateConfig = z.input<typeof TemplateConfigSchema>
