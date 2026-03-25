"use client"

import { useEffect, useMemo, useState } from "react"
import { DEFAULT_PRODUCTS, getProducts } from "@/lib/products"
import { LandingSection, Product } from "@/lib/types"
import { ProductCard } from "./product-card"
import { CategoryFilter } from "./category-filter"
import { SearchBar } from "./search-bar"
import { PackageOpen } from "lucide-react"

interface ProductCatalogProps {
  heading?: string
  description?: string
  productsOverride?: Product[]
  whatsappNumber?: string
  productInquiryTemplate?: string
  adminMode?: boolean
  onEditSection?: (section: LandingSection) => void
}

export function ProductCatalog({
  heading = "Nuestro catalogo",
  description = "Explora todos nuestros productos y encontra lo que necesitas para tu cocina.",
  productsOverride,
  whatsappNumber,
  productInquiryTemplate,
  adminMode = false,
  onEditSection,
}: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>(productsOverride ?? DEFAULT_PRODUCTS)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Todos")

  useEffect(() => {
    let mounted = true

    if (productsOverride) {
      setProducts(productsOverride)
      return () => {
        mounted = false
      }
    }

    void (async () => {
      const loaded = await getProducts()
      if (mounted) {
        setProducts(loaded)
      }
    })()

    return () => {
      mounted = false
    }
  }, [productsOverride])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = category === "Todos" || p.category === category
      const matchSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [products, search, category])

  return (
    <section id="catalogo" className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
      {adminMode && onEditSection && (
        <div className="absolute right-4 top-6 z-20 flex gap-2">
          <button
            type="button"
            onClick={() => onEditSection("catalogo")}
            className="rounded-lg border border-border bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:bg-muted transition-colors"
          >
            Editar textos
          </button>
          <button
            type="button"
            onClick={() => onEditSection("productos")}
            className="rounded-lg border border-border bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:bg-muted transition-colors"
          >
            Editar productos
          </button>
        </div>
      )}

      <div className="mb-8 rounded-3xl border border-[#C2410C]/16 bg-[#FFF7ED] px-6 py-8 text-center shadow-[0_26px_48px_-36px_rgba(154,52,18,0.85)]">
        <h2 className="text-balance text-3xl font-serif text-[#7C2D12] lg:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 leading-relaxed text-[#7C2D12]/80">
          {description}
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#C2410C]/16 bg-white/80 px-4 py-4 shadow-[0_16px_36px_-30px_rgba(154,52,18,0.85)] md:flex-row md:items-center md:justify-between">
        <CategoryFilter selected={category} onSelect={setCategory} />
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#C2410C]/16 bg-[#FFF7ED] py-24 text-[#7C2D12]/75">
          <PackageOpen className="mb-4 h-16 w-16 opacity-50" />
          <p className="text-lg font-semibold">No se encontraron productos</p>
          <p className="mt-1 text-sm">Intenta con otra busqueda o categoria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              whatsappNumber={whatsappNumber}
              whatsappMessageTemplate={productInquiryTemplate}
            />
          ))}
        </div>
      )}
    </section>
  )
}
