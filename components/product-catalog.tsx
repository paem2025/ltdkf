"use client"

import { useState, useEffect, useMemo } from "react"
import { getProducts } from "@/lib/products"
import { Product } from "@/lib/types"
import { ProductCard } from "./product-card"
import { CategoryFilter } from "./category-filter"
import { SearchBar } from "./search-bar"
import { PackageOpen } from "lucide-react"

export function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Todos")

  useEffect(() => {
    setProducts(getProducts())
  }, [])

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
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-serif text-foreground lg:text-4xl text-balance">
          Nuestro catalogo
        </h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Explora todos nuestros productos y encontra lo que necesitas para tu cocina.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
        <CategoryFilter selected={category} onSelect={setCategory} />
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
          <PackageOpen className="h-16 w-16 mb-4 opacity-40" />
          <p className="text-lg font-medium">No se encontraron productos</p>
          <p className="text-sm mt-1">Intenta con otra busqueda o categoria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
