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
