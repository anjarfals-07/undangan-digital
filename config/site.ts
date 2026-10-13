// config/site.ts
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "AnjarDigital",
  description:
    "Buat undangan digital pernikahan, khitanan, ulang tahun dengan template adat Nusantara",
  tagline: "Digital untuk momen spesial",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://anjardigital.id",
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL || "https://anjardigital.id"}/og.jpg`,
  links: {
    twitter: "https://twitter.com/anjardigital",
    instagram: "https://instagram.com/anjardigital",
    github: "https://github.com/anjarfals-07/anjardigital",
  },
}

export type SiteConfig = typeof siteConfig
