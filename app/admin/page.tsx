"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, Package, Pencil, Plus, RotateCcw, Save, Trash2 } from "lucide-react"
import { ProductForm } from "@/components/admin/product-form"
import { HeroSection } from "@/components/hero-section"
import { ProductCatalog } from "@/components/product-catalog"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import {
  DEFAULT_LANDING_CONTENT,
  getAdminLandingContent,
  resetLandingContent,
  saveLandingContent,
} from "@/lib/landing-content"
import {
  DEFAULT_PRODUCTS,
  addProduct,
  deleteProduct,
  formatPrice,
  getAdminProducts,
  updateProduct,
} from "@/lib/products"
import { LandingContent, LandingSection, Product, ProductInput } from "@/lib/types"

const SECTION_BUTTONS: Array<{ id: LandingSection; label: string }> = [
  { id: "logo", label: "Logo y menu" },
  { id: "hero", label: "Hero" },
  { id: "catalogo", label: "Catalogo" },
  { id: "footer", label: "Footer" },
  { id: "productos", label: "Productos" },
]
/* */
const inputClassName =
  "rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
const textAreaClassName =
  "rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none"

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS)
  const [landingContent, setLandingContent] = useState<LandingContent>(DEFAULT_LANDING_CONTENT)
  const [selectedSection, setSelectedSection] = useState<LandingSection>("logo")
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | undefined>()
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [saveNotice, setSaveNotice] = useState<string | null>(null)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    void (async () => {
      try {
        const [loadedProducts, loadedLanding] = await Promise.all([
          getAdminProducts(),
          getAdminLandingContent(),
        ])
        if (!mounted) return
        setProducts(loadedProducts)
        setLandingContent(loadedLanding)
      } catch (error) {
        console.error("Error cargando datos del backend:", error)
        if (mounted) {
          setErrorNotice("No se pudo cargar el panel admin. Revisa backend, credenciales y token admin.")
        }
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!saveNotice) return
    const timer = window.setTimeout(() => setSaveNotice(null), 2800)
    return () => window.clearTimeout(timer)
  }, [saveNotice])

  function handleAdd(data: ProductInput) {
    void (async () => {
      try {
        const created = await addProduct(data)
        setProducts((prev) => [...prev, created])
        setShowForm(false)
        setSaveNotice("Producto creado correctamente.")
        setErrorNotice(null)
      } catch (error) {
        console.error("Error creando producto:", error)
        setErrorNotice("No se pudo crear el producto en el backend.")
      }
    })()
  }

  function handleUpdate(data: ProductInput) {
    if (!editing) return

    void (async () => {
      try {
        const updated = await updateProduct(editing.id, data)
        if (!updated) {
          setErrorNotice("El producto ya no existe en la base de datos.")
          return
        }
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
        setEditing(undefined)
        setShowForm(false)
        setSaveNotice("Producto actualizado correctamente.")
        setErrorNotice(null)
      } catch (error) {
        console.error("Error actualizando producto:", error)
        setErrorNotice("No se pudo actualizar el producto en el backend.")
      }
    })()
  }

  function handleDelete(id: string) {
    void (async () => {
      try {
        const deleted = await deleteProduct(id)
        if (!deleted) {
          setErrorNotice("El producto ya no existe en la base de datos.")
          setConfirmDelete(null)
          return
        }
        setProducts((prev) => prev.filter((p) => p.id !== id))
        setConfirmDelete(null)
        setSaveNotice("Producto eliminado.")
        setErrorNotice(null)
      } catch (error) {
        console.error("Error eliminando producto:", error)
        setErrorNotice("No se pudo eliminar el producto en el backend.")
      }
    })()
  }

  function openEdit(product: Product) {
    setEditing(product)
    setShowForm(true)
  }

  function openNew() {
    setEditing(undefined)
    setShowForm(true)
  }

  function updateLandingField<Key extends keyof LandingContent>(key: Key, value: LandingContent[Key]) {
    setLandingContent((prev) => ({ ...prev, [key]: value }))
  }

  function handleSaveLanding() {
    void (async () => {
      try {
        const saved = await saveLandingContent(landingContent)
        setLandingContent(saved)
        setSaveNotice("Landing guardada en la base de datos.")
        setErrorNotice(null)
      } catch (error) {
        console.error("Error guardando landing:", error)
        setErrorNotice("No se pudo guardar la landing en el backend.")
      }
    })()
  }

  function handleResetLanding() {
    void (async () => {
      try {
        const reset = await resetLandingContent()
        setLandingContent(reset)
        setSaveNotice("Landing restablecida y guardada.")
        setErrorNotice(null)
      } catch (error) {
        console.error("Error restableciendo landing:", error)
        setErrorNotice("No se pudo restablecer la landing en el backend.")
      }
    })()
  }

  function focusSection(section: LandingSection) {
    setSelectedSection(section)
    const targetId = section === "productos" ? "admin-productos" : `editor-${section}`
    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 0)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al sitio
            </Link>
            <div className="hidden h-5 w-px bg-border sm:block" />
            <h1 className="text-lg font-semibold text-foreground">Panel de administracion</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveLanding}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              <Save className="h-4 w-4" />
              Guardar landing
            </button>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <Plus className="h-4 w-4" />
              Producto
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Este panel guarda cambios en tu base de datos via backend. Si el backend no responde, no se aplican cambios.
        </div>

        {saveNotice && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-900">
            <Check className="h-4 w-4" />
            {saveNotice}
          </div>
        )}

        {errorNotice && (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-900">
            {errorNotice}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-4 py-3 lg:px-6">
              <h2 className="text-sm font-semibold text-card-foreground">Vista previa editable</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Es la misma landing publica, con botones "Editar" sobre cada bloque.
              </p>
            </div>

            <div className="bg-background">
              <SiteHeader content={landingContent} adminMode sticky={false} onEditSection={focusSection} />
              <HeroSection content={landingContent} adminMode onEditSection={focusSection} />
              <ProductCatalog
                heading={landingContent.catalogTitle}
                description={landingContent.catalogDescription}
                productsOverride={products}
                whatsappNumber={landingContent.whatsappNumber}
                productInquiryTemplate={landingContent.productInquiryTemplate}
                adminMode
                onEditSection={focusSection}
              />
              <SiteFooter content={landingContent} adminMode onEditSection={focusSection} />
            </div>
          </section>

          <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-xl border border-border bg-card p-4">
              <h2 className="text-base font-semibold text-card-foreground">Editor de secciones</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Selecciona la parte de la landing que quieres editar.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {SECTION_BUTTONS.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => focusSection(section.id)}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                      selectedSection === section.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleSaveLanding}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Save className="h-3.5 w-3.5" />
                  Guardar
                </button>
                <button
                  onClick={handleResetLanding}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>
            </div>

            {selectedSection === "logo" && (
              <div id="editor-logo" className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold text-card-foreground">Logo y menu</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Nombre de marca</span>
                    <input
                      value={landingContent.brandName}
                      onChange={(e) => updateLandingField("brandName", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">URL de logo</span>
                    <input
                      value={landingContent.logoUrl}
                      onChange={(e) => updateLandingField("logoUrl", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Item menu catalogo</span>
                    <input
                      value={landingContent.navCatalogLabel}
                      onChange={(e) => updateLandingField("navCatalogLabel", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Item menu categorias</span>
                    <input
                      value={landingContent.navCategoriesLabel}
                      onChange={(e) => updateLandingField("navCategoriesLabel", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Item menu contacto</span>
                    <input
                      value={landingContent.navContactLabel}
                      onChange={(e) => updateLandingField("navContactLabel", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                </div>
              </div>
            )}

            {selectedSection === "hero" && (
              <div id="editor-hero" className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold text-card-foreground">Hero</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Etiqueta superior</span>
                    <input
                      value={landingContent.heroBadge}
                      onChange={(e) => updateLandingField("heroBadge", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Titulo principal</span>
                    <input
                      value={landingContent.heroTitle}
                      onChange={(e) => updateLandingField("heroTitle", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Parte destacada del titulo</span>
                    <input
                      value={landingContent.heroTitleHighlight}
                      onChange={(e) => updateLandingField("heroTitleHighlight", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Descripcion</span>
                    <textarea
                      rows={4}
                      value={landingContent.heroDescription}
                      onChange={(e) => updateLandingField("heroDescription", e.target.value)}
                      className={textAreaClassName}
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">Boton principal</span>
                      <input
                        value={landingContent.heroPrimaryCtaLabel}
                        onChange={(e) => updateLandingField("heroPrimaryCtaLabel", e.target.value)}
                        className={inputClassName}
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">Boton secundario</span>
                      <input
                        value={landingContent.heroSecondaryCtaLabel}
                        onChange={(e) => updateLandingField("heroSecondaryCtaLabel", e.target.value)}
                        className={inputClassName}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {selectedSection === "catalogo" && (
              <div id="editor-catalogo" className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold text-card-foreground">Catalogo</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Titulo</span>
                    <input
                      value={landingContent.catalogTitle}
                      onChange={(e) => updateLandingField("catalogTitle", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Descripcion</span>
                    <textarea
                      rows={4}
                      value={landingContent.catalogDescription}
                      onChange={(e) => updateLandingField("catalogDescription", e.target.value)}
                      className={textAreaClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Plantilla WhatsApp producto</span>
                    <textarea
                      rows={3}
                      value={landingContent.productInquiryTemplate}
                      onChange={(e) => updateLandingField("productInquiryTemplate", e.target.value)}
                      className={textAreaClassName}
                    />
                    <span className="text-[11px] text-muted-foreground">
                      Usa <code>{"{product}"}</code> para insertar el nombre del producto.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {selectedSection === "footer" && (
              <div id="editor-footer" className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold text-card-foreground">Footer y WhatsApp</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Descripcion footer</span>
                    <textarea
                      rows={3}
                      value={landingContent.footerDescription}
                      onChange={(e) => updateLandingField("footerDescription", e.target.value)}
                      className={textAreaClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Texto de contacto</span>
                    <textarea
                      rows={3}
                      value={landingContent.footerContactText}
                      onChange={(e) => updateLandingField("footerContactText", e.target.value)}
                      className={textAreaClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Texto boton WhatsApp</span>
                    <input
                      value={landingContent.whatsappButtonLabel}
                      onChange={(e) => updateLandingField("whatsappButtonLabel", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Numero WhatsApp (sin +)</span>
                    <input
                      value={landingContent.whatsappNumber}
                      onChange={(e) => updateLandingField("whatsappNumber", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Mensaje base WhatsApp</span>
                    <textarea
                      rows={3}
                      value={landingContent.whatsappDefaultMessage}
                      onChange={(e) => updateLandingField("whatsappDefaultMessage", e.target.value)}
                      className={textAreaClassName}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Copyright</span>
                    <input
                      value={landingContent.copyrightText}
                      onChange={(e) => updateLandingField("copyrightText", e.target.value)}
                      className={inputClassName}
                    />
                  </label>
                </div>
              </div>
            )}

            {selectedSection === "productos" && (
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold text-card-foreground">Productos y fotos</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Debajo tienes el listado para crear, editar o borrar productos y cambiar sus imagenes.
                </p>
                <button
                  onClick={() => document.getElementById("admin-productos")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Ir al listado de productos
                </button>
              </div>
            )}
          </aside>
        </div>

        <section id="admin-productos" className="mt-10 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-4 lg:px-6">
            <div>
              <h2 className="text-base font-semibold text-card-foreground">Gestion de productos</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {products.length} {products.length === 1 ? "producto cargado" : "productos cargados"}
              </p>
            </div>

            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              Nuevo producto
            </button>
          </div>

          <div className="p-4 lg:p-6">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-20">
                <Package className="mb-4 h-16 w-16 text-muted-foreground/40" />
                <p className="text-lg font-medium text-muted-foreground">No hay productos todavia</p>
                <p className="mb-6 mt-1 text-sm text-muted-foreground">Agrega tu primer producto para empezar.</p>
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
                    className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 hover:shadow-sm transition-shadow"
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

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-card-foreground">
                          {product.name}
                        </h3>
                        {product.featured && (
                          <span className="shrink-0 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                            Destacado
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{product.category}</span>
                        <span className="text-xs font-semibold text-foreground">{formatPrice(product.price)}</span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
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
        </section>
      </div>

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
