"use client"

import { useRef, useState } from "react"
import { Product, ProductInput, CATEGORIES } from "@/lib/types"
import { X } from "lucide-react"
import { fileToCompressedDataUrl } from "@/lib/image-data-url"

interface ProductFormProps {
  product?: Product
  onSubmit: (data: ProductInput) => void
  onCancel: () => void
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? "")
  const [price, setPrice] = useState(product?.price?.toString() ?? "")
  const [description, setDescription] = useState(product?.description ?? "")
  const [category, setCategory] = useState(product?.category ?? CATEGORIES[0])
  const [image, setImage] = useState(product?.image ?? "")
  const [featured, setFeatured] = useState(product?.featured ?? false)
  const [sortOrder, setSortOrder] = useState((product?.sortOrder ?? 0).toString())
  const [imageError, setImageError] = useState<string | null>(null)
  const [isPickingImage, setIsPickingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !price || !description || !category || sortOrder === "") return
    const parsedSortOrder = Number(sortOrder)
    if (!Number.isFinite(parsedSortOrder) || parsedSortOrder < 0) return

    onSubmit({
      name,
      price: Number(price),
      description,
      category,
      image: image || "/images/placeholder.jpg",
      featured,
      sortOrder: parsedSortOrder,
    })
  }

  function handlePickImageClick() {
    fileInputRef.current?.click()
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    void (async () => {
      try {
        setIsPickingImage(true)
        setImageError(null)
        const dataUrl = await fileToCompressedDataUrl(file, {
          maxDimension: 1400,
          quality: 0.82,
          maxDataUrlLength: 1_400_000,
        })
        setImage(dataUrl)
      } catch (error) {
        const message = error instanceof Error ? error.message : "No se pudo cargar la imagen."
        setImageError(message)
      } finally {
        setIsPickingImage(false)
        event.target.value = ""
      }
    })()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-card-foreground">
            {product ? "Editar producto" : "Nuevo producto"}
          </h2>
          <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-muted transition-colors" aria-label="Cerrar">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Olla Grande N26"
              className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="price" className="text-sm font-medium text-foreground">Precio (ARS)</label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="185000"
                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="sort-order" className="text-sm font-medium text-foreground">Orden</label>
              <input
                id="sort-order"
                type="number"
                min={0}
                step={1}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                placeholder="0"
                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="category" className="text-sm font-medium text-foreground">Categoria</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium text-foreground">Descripcion</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el producto..."
              rows={3}
              className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="image" className="text-sm font-medium text-foreground">URL de imagen</label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/images/mi-producto.jpg"
              className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
            <div className="flex items-center gap-2 pt-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handlePickImageClick}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                disabled={isPickingImage}
              >
                {isPickingImage ? "Procesando..." : "Buscar foto en mi PC"}
              </button>
              <span className="text-[11px] text-muted-foreground">
                Tambien puedes pegar una URL si prefieres.
              </span>
            </div>
            {imageError && <span className="text-xs text-destructive">{imageError}</span>}
            {image && (
              <div className="mt-2 h-24 w-24 overflow-hidden rounded-lg border border-border bg-muted">
                <img src={image} alt="Preview producto" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary accent-primary"
            />
            <span className="text-sm text-foreground">Producto destacado</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {product ? "Guardar cambios" : "Crear producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
