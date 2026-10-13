// types/index.ts

// ==================== USER ====================
export type User = {
  id: string
  email: string
  name: string
  role: "user" | "vendor" | "admin"
  plan: "free" | "basic" | "premium" | "vendor"
  createdAt: Date
}

// ==================== TEMPLATE ====================
export type TemplateCategory = "wedding" | "khitanan" | "ulang-tahun" | "acara"

export type Culture =
  | "jawa"
  | "sunda"
  | "betawi"
  | "batak"
  | "minang"
  | "bali"
  | "bugis"
  | "palembang"
  | "aceh"
  | "dayak"
  | "papua"
  | "toraja"
  | "umum"

export type TemplatePreset = {
  id: string
  name: string
  category: TemplateCategory
  culture: Culture
  tags: string[]
  thumbnail: string
  defaultTheme: Theme
  defaultContent: Content
  sections: SectionInstance[]
  culturalAssets: CulturalAssets
  lockedFields?: string[]
}

// ==================== THEME ====================
export type Theme = {
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    accent: string
  }
  fonts: {
    heading: string
    body: string
    script?: string
  }
  shapes: {
    borderRadius: number
    dividerStyle: string
    ornament: string
  }
  animations: {
    type: "fade" | "slide" | "zoom" | "parallax"
    duration: number
  }
}

// ==================== CONTENT ====================
export type Content = {
  groomName: string
  brideName: string
  date: string
  location: string
  gallery: string[]
  music: string
  story: string
  quote: string
  opening: string
  language: string
}

// ==================== SECTION ====================
export type SectionType =
  | "hero"
  | "couple"
  | "countdown"
  | "event"
  | "story"
  | "gallery"
  | "maps"
  | "rsvp"
  | "guestBook"
  | "gift"
  | "quotes"
  | "adatProcession"
  | "seserahan"
  | "thanks"
  | "video"
  | "liveStreaming"
  | "customText"

export type SectionInstance = {
  id: string
  type: SectionType
  enabled: boolean
  order: number
  // ✅ SESUDAH
  config: Record<string, unknown>
}

// ==================== CULTURAL ASSETS ====================
export type CulturalAssets = {
  ornaments: string[]
  fonts: string[]
  audio: string[]
  dividers: string[]
  language: string
}

// ==================== INVITATION ====================
export type InvitationStatus = "draft" | "published" | "expired"

export type Invitation = {
  id: string
  userId: string
  templateId: string
  slug: string
  title: string
  theme: Theme
  content: Content
  sections: SectionInstance[]
  status: InvitationStatus
  publishedAt?: Date
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
}

// ==================== GUEST & RSVP ====================
export type Guest = {
  id: string
  invitationId: string
  name: string
  phone?: string
  email?: string
  status: "pending" | "sent" | "opened"
  createdAt: Date
}

export type RSVPStatus = "attending" | "not-attending" | "maybe"

export type RSVP = {
  id: string
  invitationId: string
  guestId: string
  status: RSVPStatus
  guestCount: number
  message?: string
  createdAt: Date
}

// ==================== TEMPLATE EDITOR ====================
export type EditorMode = "simple" | "advanced" | "pro"

export type ThemeSelection = {
  motif: string
  motifIntensity: number
  motifPosition: "full" | "border" | "corner"
  colorPalette: string
  customColors?: Theme["colors"]
  headingFont: string
  bodyFont: string
  layout: "classic" | "modern" | "royal" | "minimal"
  divider: string
  animation: string
  animationSpeed: "slow" | "normal" | "fast"
  music: string
  language: string
}
