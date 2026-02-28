"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getProducts, addProduct, updateProduct, deleteProduct, formatPrice } from "@/lib/products"
import { Product } from "@/lib/types"
import { ProductForm } from "@/components/admin/product-form"
import { Plus, Pencil, Trash2, ArrowLeft, Package } from "lucide-react"

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | undefined>()
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  function handleAdd(data: Omit<Product, "id" | "createdAt">) {
    const created = addProduct(data)
    setProducts((prev) => [...prev, created])
    setShowForm(false)
  }

  function handleUpdate(data: Omit<Product, "id" | "createdAt">) {
    if (!editing) return
    const updated = updateProduct(editing.id, data)
    if (updated) {
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    }
    setEditing(undefined)
    setShowForm(false)
  }

  function handleDelete(id: string) {
    deleteProduct(id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setConfirmDelete(null)
  }

  function openEdit(product: Product) {
    setEditing(product)
    setShowForm(true)
  }

  function openNew() {
    setEditing(undefined)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al sitio
            </Link>
            <div className="h-5 w-px bg-border" />
            <h1 className="text-lg font-semibold text-foreground">Panel de administracion</h1>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nuevo producto</span>
          </button>
        </div>
      </header>

      {/* Product list */}
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "producto" : "productos"} en el catalogo
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-24">
            <Package className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No hay productos todavia</p>
            <p className="text-sm text-muted-foreground mt-1 mb-6">Agrega tu primer producto para empezar.</p>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              Agregar producto
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-shadow"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-card-foreground truncate">
                      {product.name}
                    </h3>
                    {product.featured && (
                      <span className="shrink-0 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-accent uppercase tracking-wide">
                        Destacado
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-muted-foreground">{product.category}</span>
                    <span className="text-xs font-semibold text-foreground">{formatPrice(product.price)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openEdit(product)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label={`Editar ${product.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  {confirmDelete === product.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground hover:opacity-90 transition-opacity"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(product.id)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                      aria-label={`Eliminar ${product.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <ProductForm
          product={editing}
          onSubmit={editing ? handleUpdate : handleAdd}
          onCancel={() => {
            setShowForm(false)
            setEditing(undefined)
          }}
        />
      )}
    </div>
  )
}
