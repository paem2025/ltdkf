import { Product } from "./types"
import { ApiError, apiRequest } from "./api-client"

export const WHATSAPP_NUMBER = "5491124848417"

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Olla Cacerola N20",
    price: 185000,
    description: "Olla cacerola de 20cm con tapa. Ideal para salsas, guisos y preparaciones diarias. Aluminio fundido con antiadherente de alta durabilidad.",
    category: "Ollas",
    image: "/images/olla-cacerola-20.jpg",
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sarten N24 Classic",
    price: 142000,
    description: "Sarten de 24cm con revestimiento antiadherente premium. Mango ergonomico resistente al calor. Perfecta para saltear y cocinar con poco aceite.",
    category: "Sartenes",
    image: "/images/sarten-24.jpg",
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Olla Grande N26",
    price: 265000,
    description: "Olla de 26cm con tapa. Gran capacidad para comidas familiares. Distribucion uniforme del calor para una coccion perfecta.",
    category: "Ollas",
    image: "/images/olla-grande-26.jpg",
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Bifera Grill Rayada",
    price: 178000,
    description: "Bifera grill con superficie rayada para lograr las marcas perfectas. Ideal para carnes, verduras y sandwiches.",
    category: "Bifera / Plancha",
    image: "/images/bifera-grill.jpg",
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Cacerola Baja N24",
    price: 198000,
    description: "Cacerola baja de 24cm con asas. Perfecta para risottos, arroz y salteados. Tapa de vidrio templado para controlar la coccion.",
    category: "Cacerolas",
    image: "/images/cacerola-baja-24.jpg",
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Sarten N28 Pro",
    price: 168000,
    description: "Sarten de 28cm para los que necesitan espacio extra. Antiadherente de 5 capas con base reforzada. La favorita de los que cocinan para toda la familia.",
    category: "Sartenes",
    image: "/images/sarten-28.jpg",
    featured: false,
    createdAt: new Date().toISOString(),
  },
]

function cloneProducts(products: Product[]): Product[] {
  return products.map((product) => ({ ...product }))
}

interface ProductApiRecord {
  id: string
  name: string
  price: number
  description: string
  category: string
  image: string
  featured?: boolean
  sortOrder?: number
  createdAt: string
  updatedAt?: string
}

function toProductApiPayload(product: Omit<Product, "id" | "createdAt">) {
  return {
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    featured: Boolean(product.featured),
    sortOrder: 0,
  }
}

function fromApi(record: ProductApiRecord): Product {
  return {
    id: record.id,
    name: record.name,
    price: record.price,
    description: record.description,
    category: record.category,
    image: record.image,
    featured: Boolean(record.featured),
    createdAt: record.createdAt,
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await apiRequest<ProductApiRecord[]>("/api/products")
    return rows.map(fromApi)
  } catch (error) {
    console.error("No se pudieron cargar productos desde backend:", error)
    return cloneProducts(DEFAULT_PRODUCTS)
  }
}

export async function addProduct(product: Omit<Product, "id" | "createdAt">): Promise<Product> {
  const created = await apiRequest<ProductApiRecord>("/api/products", {
    method: "POST",
    body: JSON.stringify(toProductApiPayload(product)),
  })

  return fromApi(created)
}

export async function updateProduct(id: string, updates: Omit<Product, "id" | "createdAt">): Promise<Product | null> {
  try {
    const updated = await apiRequest<ProductApiRecord>(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(toProductApiPayload(updates)),
    })

    return fromApi(updated)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await apiRequest<void>(`/api/products/${id}`, { method: "DELETE" })
    return true
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return false
    }
    throw error
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price)
}

export function buildWhatsAppUrl(
  productName: string,
  phoneNumber = WHATSAPP_NUMBER,
  customMessage?: string,
): string {
  const message = encodeURIComponent(
    customMessage ?? `Hola! Me interesa el producto: ${productName}. Me podrias dar mas info?`
  )
  return `https://wa.me/${phoneNumber}?text=${message}`
}

export function buildWhatsAppContactUrl(
  message = "Hola! Quiero consultar por productos Kelly Store.",
  phoneNumber = WHATSAPP_NUMBER,
): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}
