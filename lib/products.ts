import { Product } from "./types"

const STORAGE_KEY = "essen-products"

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

function readStoredProducts(): Product[] | null {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null

  try {
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function getProducts(): Product[] {
  if (typeof window === "undefined") return cloneProducts(DEFAULT_PRODUCTS)

  const storedProducts = readStoredProducts()
  if (storedProducts) {
    return storedProducts
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS))
  return cloneProducts(DEFAULT_PRODUCTS)
}

export function saveProducts(products: Product[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

export function addProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const products = getProducts()
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  products.push(newProduct)
  saveProducts(products)
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null
  products[index] = { ...products[index], ...updates }
  saveProducts(products)
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const products = getProducts()
  const filtered = products.filter((p) => p.id !== id)
  if (filtered.length === products.length) return false
  saveProducts(filtered)
  return true
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price)
}

export function buildWhatsAppUrl(productName: string, phoneNumber = WHATSAPP_NUMBER): string {
  const message = encodeURIComponent(
    `Hola! Me interesa el producto: ${productName}. Me podrias dar mas info?`
  )
  return `https://wa.me/${phoneNumber}?text=${message}`
}

export function buildWhatsAppContactUrl(
  message = "Hola! Quiero consultar por productos Kelly Store.",
  phoneNumber = WHATSAPP_NUMBER,
): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}
