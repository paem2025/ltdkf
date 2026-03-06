"use client"

import { MessageCircle } from "lucide-react"
import Image from "next/image"
import { buildWhatsAppContactUrl } from "@/lib/products"
import { LandingContent, LandingSection } from "@/lib/types"

interface SiteFooterProps {
  content?: LandingContent
  adminMode?: boolean
  onEditSection?: (section: LandingSection) => void
}

export function SiteFooter({ content, adminMode = false, onEditSection }: SiteFooterProps) {
  const brandName = content?.brandName || "Kelly Store"
  const logoUrl = content?.logoUrl || "/images/logo.jpg"
  const navCatalog = content?.navCatalogLabel || "Catalogo"
  const navCategories = content?.navCategoriesLabel || "Categorias"
  const navContact = content?.navContactLabel || "Contacto"
  const footerDescription =
    content?.footerDescription ||
    "Productos de cocina premium para quienes disfrutan cocinar. Calidad, durabilidad y diseno en cada pieza."
  const footerContactText =
    content?.footerContactText ||
    "Escribinos por WhatsApp para consultas, pedidos o asesoramiento personalizado."
  const whatsappButtonLabel = content?.whatsappButtonLabel || "Escribinos por WhatsApp"
  const whatsappNumber = content?.whatsappNumber || "5491124848417"
  const whatsappDefaultMessage =
    content?.whatsappDefaultMessage || "Hola! Quiero consultar por productos Kelly Store."
  const copyrightText = content?.copyrightText || "Kelly Store - Todos los derechos reservados."

  return (
    <footer id="contacto" className="relative border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src={logoUrl}
                alt={brandName}
                width={80}
                height={80}
                className="object-contain"
              />

              <span className="text-xl font-serif text-foreground">
                {brandName}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {footerDescription}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Navegacion
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#catalogo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {navCatalog}
                </a>
              </li>
              <li>
                <a href="#categorias" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {navCategories}
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {navContact}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contacto
            </h3>
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              {footerContactText}
            </p>

            <a
              href={buildWhatsAppContactUrl(whatsappDefaultMessage, whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-4 w-4" />
              {whatsappButtonLabel}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            {copyrightText}
          </p>
        </div>
      </div>

      {adminMode && onEditSection && (
        <button
          type="button"
          onClick={() => onEditSection("footer")}
          className="absolute right-4 top-4 rounded-lg border border-border bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:bg-muted transition-colors"
        >
          Editar footer
        </button>
      )}
    </footer>
  )
}
