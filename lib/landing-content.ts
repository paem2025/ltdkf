import { LandingContent } from "./types"
import { apiRequest } from "./api-client"

export const DEFAULT_LANDING_CONTENT: LandingContent = {
  brandName: "Kelly Store",
  logoUrl: "/images/logo.jpg",
  navCatalogLabel: "Catalogo",
  navCategoriesLabel: "Categorias",
  navContactLabel: "Contacto",
  heroBadge: "Productos de cocina premium",
  heroTitle: "Cocina con lo mejor,",
  heroTitleHighlight: "disfruta cada momento",
  heroDescription:
    "Descubri nuestra linea completa de ollas, sartenes y accesorios. Calidad que se siente en cada receta.",
  heroPrimaryCtaLabel: "Ver catalogo",
  heroSecondaryCtaLabel: "Contactanos",
  catalogTitle: "Nuestro catalogo",
  catalogDescription: "Explora todos nuestros productos y encontra lo que necesitas para tu cocina.",
  footerDescription:
    "Productos de cocina premium para quienes disfrutan cocinar. Calidad, durabilidad y diseno en cada pieza.",
  footerContactText: "Escribinos por WhatsApp para consultas, pedidos o asesoramiento personalizado.",
  whatsappButtonLabel: "Escribinos por WhatsApp",
  whatsappNumber: "5491124848417",
  whatsappDefaultMessage: "Hola! Quiero consultar por productos Kelly Store.",
  productInquiryTemplate: "Hola! Me interesa el producto: {product}. Me podrias dar mas info?",
  copyrightText: "Kelly Store - Todos los derechos reservados.",
}

function cloneContent(content: LandingContent): LandingContent {
  return { ...content }
}

function mergeWithDefaults(input: Partial<LandingContent>): LandingContent {
  const next = { ...DEFAULT_LANDING_CONTENT }

  for (const key of Object.keys(DEFAULT_LANDING_CONTENT) as Array<keyof LandingContent>) {
    const value = input[key]
    if (typeof value === "string") {
      next[key] = value
    }
  }

  return next
}

type LandingContentApiResponse = Partial<LandingContent>

function sanitizeForApi(content: LandingContent): LandingContent {
  return mergeWithDefaults(content)
}

type GetLandingContentOptions = {
  endpoint?: "/api/landing" | "/api/admin/landing"
  fallbackOnError?: boolean
}

export async function getLandingContent(options: GetLandingContentOptions = {}): Promise<LandingContent> {
  const endpoint = options.endpoint ?? "/api/landing"
  const fallbackOnError = options.fallbackOnError ?? true

  try {
    const payload = await apiRequest<LandingContentApiResponse>(endpoint)
    return mergeWithDefaults(payload)
  } catch (error) {
    if (!fallbackOnError) {
      throw error
    }
    console.error("No se pudo cargar landing desde backend:", error)
    return cloneContent(DEFAULT_LANDING_CONTENT)
  }
}

export async function getAdminLandingContent(): Promise<LandingContent> {
  return getLandingContent({
    endpoint: "/api/admin/landing",
    fallbackOnError: false,
  })
}

export async function saveLandingContent(content: LandingContent): Promise<LandingContent> {
  const payload = await apiRequest<LandingContentApiResponse>("/api/admin/landing", {
    method: "PUT",
    body: JSON.stringify(sanitizeForApi(content)),
  })

  return mergeWithDefaults(payload)
}

export async function resetLandingContent(): Promise<LandingContent> {
  return saveLandingContent(DEFAULT_LANDING_CONTENT)
}

export function applyProductTemplate(template: string, productName: string): string {
  const normalized = template.trim()

  if (!normalized) {
    return `Hola! Me interesa el producto: ${productName}. Me podrias dar mas info?`
  }

  if (normalized.toLowerCase().includes("{product}")) {
    return normalized.replace(/\{product\}/gi, productName)
  }

  return `${normalized} (${productName})`
}
