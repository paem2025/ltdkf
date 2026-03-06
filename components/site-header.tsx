"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { LandingContent, LandingSection } from "@/lib/types"

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

  return (
    <header
      className={`${sticky ? "sticky top-0" : "relative"} z-50 bg-background/80 backdrop-blur-md border-b border-border`}
    >
      
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-4 lg:px-8">
        
        {/* LOGO */}
        <Link href="/" aria-label="Ir al inicio">
          <Image
            src={logoUrl}
            alt={brandName}
            width={120}
            height={120}
            className="object-contain transition duration-300 hover:scale-105 hover:opacity-90"
            priority
          />
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#catalogo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {navCatalog}
          </a>
          <a href="#categorias" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {navCategories}
          </a>
          <a href="#contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {navContact}
          </a>
        </nav>

        {/* BOTON MOBILE */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* NAV MOBILE */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-4">
          <a href="#catalogo" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {navCatalog}
          </a>
          <a href="#categorias" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {navCategories}
          </a>
          <a href="#contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {navContact}
          </a>
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
