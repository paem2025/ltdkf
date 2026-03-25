"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, MessageCircle, X } from "lucide-react"
import Image from "next/image"
import { LandingContent, LandingSection } from "@/lib/types"
import { buildWhatsAppContactUrl } from "@/lib/products"

interface SiteHeaderProps {
  content?: LandingContent
  adminMode?: boolean
  sticky?: boolean
  onEditSection?: (section: LandingSection) => void
}

export function SiteHeader({ content, adminMode = false, sticky = true, onEditSection }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const brandName = content?.brandName || "Kelly Store"
  const logoUrl = content?.logoUrl || "/images/logo.jpg"
  const navCatalog = content?.navCatalogLabel || "Catalogo"
  const navCategories = content?.navCategoriesLabel || "Categorias"
  const navContact = content?.navContactLabel || "Contacto"
  const whatsappButtonLabel = content?.whatsappButtonLabel || "WhatsApp"
  const whatsappNumber = content?.whatsappNumber || "5491124848417"
  const whatsappDefaultMessage =
    content?.whatsappDefaultMessage || "Hola! Quiero consultar por productos Kelly Store."

  return (
    <header
      className={`${sticky ? "sticky top-0" : "relative"} z-50 border-b border-[#9A3412]/20 bg-[#FFF7ED]/80 backdrop-blur-xl`}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C2410C]/45 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link
          href="/"
          aria-label="Ir al inicio"
          className="rounded-2xl border border-[#9A3412]/20 bg-white/60 px-3 py-1 shadow-[0_10px_24px_-18px_rgba(154,52,18,0.8)] transition-colors hover:bg-white"
        >
          <Image
            src={logoUrl}
            alt={brandName}
            width={120}
            height={120}
            className="h-11 w-auto object-contain transition duration-300 hover:scale-105 hover:opacity-90 sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[#9A3412]/25 bg-white/60 px-1.5 py-1 shadow-[0_14px_28px_-20px_rgba(154,52,18,0.8)] md:flex">
          <a
            href="#catalogo"
            className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-[#7C2D12]/75 transition-all hover:-translate-y-0.5 hover:bg-[#C2410C]/12 hover:text-[#7C2D12]"
          >
            {navCatalog}
          </a>
          <a
            href="#categorias"
            className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-[#7C2D12]/75 transition-all hover:-translate-y-0.5 hover:bg-[#C2410C]/12 hover:text-[#7C2D12]"
          >
            {navCategories}
          </a>
          <a
            href="#contacto"
            className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-[#7C2D12]/75 transition-all hover:-translate-y-0.5 hover:bg-[#C2410C]/12 hover:text-[#7C2D12]"
          >
            {navContact}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppContactUrl(whatsappDefaultMessage, whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            {whatsappButtonLabel}
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full border border-[#9A3412]/25 bg-white/70 p-2 text-[#7C2D12] md:hidden"
            aria-label="menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-[#9A3412]/20 bg-[#FFF7ED]/95 px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <a
              href="#catalogo"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl border border-[#9A3412]/20 bg-white/65 px-4 py-2.5 text-sm font-medium text-[#7C2D12] transition-colors hover:bg-white"
            >
            {navCatalog}
            </a>
            <a
              href="#categorias"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl border border-[#9A3412]/20 bg-white/65 px-4 py-2.5 text-sm font-medium text-[#7C2D12] transition-colors hover:bg-white"
            >
            {navCategories}
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl border border-[#9A3412]/20 bg-white/65 px-4 py-2.5 text-sm font-medium text-[#7C2D12] transition-colors hover:bg-white"
            >
            {navContact}
            </a>
          </div>
        </nav>
      )}

      {adminMode && onEditSection && (
        <button
          type="button"
          onClick={() => onEditSection("logo")}
          className="absolute right-4 top-4 rounded-lg border border-border bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:bg-muted transition-colors"
        >
          Editar logo y menu
        </button>
      )}
    </header>
  )
}
