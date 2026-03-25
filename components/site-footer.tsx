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
  const canEdit = adminMode && Boolean(onEditSection)
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

  function openLogoEditor() {
    onEditSection?.("logo")
  }

  function openFooterEditor() {
    onEditSection?.("footer")
  }

  return (
    <footer id="contacto" className="relative mt-10 overflow-hidden border-t border-[#9A3412]/20 bg-[#FFF7ED]">
      <div className="pointer-events-none absolute -left-8 top-10 h-28 w-28 rounded-full bg-[#C2410C]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-4 h-24 w-24 rounded-full bg-[#F59E0B]/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#9A3412]/18 bg-white/70 p-4 shadow-[0_16px_32px_-26px_rgba(154,52,18,0.85)]">
            <div className="mb-4 flex items-center gap-3">
              {canEdit ? (
                <button type="button" onClick={openLogoEditor} aria-label="Editar logo y menu">
                  <Image
                    src={logoUrl}
                    alt={brandName}
                    width={80}
                    height={80}
                    className="h-12 w-auto object-contain"
                  />
                </button>
              ) : (
                <Image
                  src={logoUrl}
                  alt={brandName}
                  width={80}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              )}

              {canEdit ? (
                <button
                  type="button"
                  onClick={openLogoEditor}
                  className="text-xl font-serif text-[#7C2D12] hover:opacity-90"
                >
                  {brandName}
                </button>
              ) : (
                <span className="text-xl font-serif text-[#7C2D12]">
                  {brandName}
                </span>
              )}
            </div>

            {canEdit ? (
              <button
                type="button"
                onClick={openFooterEditor}
                className="text-left text-sm leading-relaxed text-[#7C2D12]/75 hover:opacity-90"
              >
                {footerDescription}
              </button>
            ) : (
              <p className="text-sm leading-relaxed text-[#7C2D12]/75">
                {footerDescription}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-[#9A3412]/18 bg-white/70 p-4 shadow-[0_16px_32px_-26px_rgba(154,52,18,0.85)]">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#7C2D12]/75">
              Navegacion
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                {canEdit ? (
                  <button
                    type="button"
                    onClick={openLogoEditor}
                    className="text-sm text-[#7C2D12]/80 transition-colors hover:text-[#7C2D12]"
                  >
                    {navCatalog}
                  </button>
                ) : (
                  <a href="#catalogo" className="text-sm text-[#7C2D12]/80 transition-colors hover:text-[#7C2D12]">
                    {navCatalog}
                  </a>
                )}
              </li>
              <li>
                {canEdit ? (
                  <button
                    type="button"
                    onClick={openLogoEditor}
                    className="text-sm text-[#7C2D12]/80 transition-colors hover:text-[#7C2D12]"
                  >
                    {navCategories}
                  </button>
                ) : (
                  <a href="#categorias" className="text-sm text-[#7C2D12]/80 transition-colors hover:text-[#7C2D12]">
                    {navCategories}
                  </a>
                )}
              </li>
              <li>
                {canEdit ? (
                  <button
                    type="button"
                    onClick={openLogoEditor}
                    className="text-sm text-[#7C2D12]/80 transition-colors hover:text-[#7C2D12]"
                  >
                    {navContact}
                  </button>
                ) : (
                  <a href="#contacto" className="text-sm text-[#7C2D12]/80 transition-colors hover:text-[#7C2D12]">
                    {navContact}
                  </a>
                )}
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#9A3412]/18 bg-white/70 p-4 shadow-[0_16px_32px_-26px_rgba(154,52,18,0.85)]">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#7C2D12]/75">
              Contacto
            </h3>
            {canEdit ? (
              <button
                type="button"
                onClick={openFooterEditor}
                className="mb-4 text-left text-sm leading-relaxed text-[#7C2D12]/75 hover:opacity-90"
              >
                {footerContactText}
              </button>
            ) : (
              <p className="mb-4 text-sm leading-relaxed text-[#7C2D12]/75">
                {footerContactText}
              </p>
            )}

            {canEdit ? (
              <button
                type="button"
                onClick={openFooterEditor}
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(34,197,94,0.4)] transition-all hover:-translate-y-0.5 hover:opacity-95"
              >
                <MessageCircle className="h-4 w-4" />
                {whatsappButtonLabel}
              </button>
            ) : (
              <a
                href={buildWhatsAppContactUrl(whatsappDefaultMessage, whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(34,197,94,0.4)] transition-all hover:-translate-y-0.5 hover:opacity-95"
              >
                <MessageCircle className="h-4 w-4" />
                {whatsappButtonLabel}
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-[#9A3412]/20 pt-6 text-center">
          {canEdit ? (
            <button
              type="button"
              onClick={openFooterEditor}
              className="text-xs text-[#7C2D12]/65 hover:opacity-90"
            >
              {copyrightText}
            </button>
          ) : (
            <p className="text-xs text-[#7C2D12]/65">
              {copyrightText}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
