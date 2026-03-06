export interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  image: string
  featured?: boolean
  createdAt: string
}

export const CATEGORIES = [
  "Ollas",
  "Sartenes",
  "Cacerolas",
  "Bifera / Plancha",
  "Accesorios",
  "Otros",
] as const

export type Category = (typeof CATEGORIES)[number]

export interface LandingContent {
  brandName: string
  logoUrl: string
  navCatalogLabel: string
  navCategoriesLabel: string
  navContactLabel: string
  heroBadge: string
  heroTitle: string
  heroTitleHighlight: string
  heroDescription: string
  heroPrimaryCtaLabel: string
  heroSecondaryCtaLabel: string
  catalogTitle: string
  catalogDescription: string
  footerDescription: string
  footerContactText: string
  whatsappButtonLabel: string
  whatsappNumber: string
  whatsappDefaultMessage: string
  productInquiryTemplate: string
  copyrightText: string
}

export type LandingSection = "logo" | "hero" | "catalogo" | "footer" | "productos"
