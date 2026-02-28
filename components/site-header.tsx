"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-4 lg:px-8">
        
        {/* LOGO */}
   <Image 
  src="/images/logo.jpg"
  alt="Kelly Store"
  width={120}
  height={120}
  className="object-contain transition duration-300 hover:scale-105 hover:opacity-90"
  priority
/>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#catalogo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Catalogo
          </a>
          <a href="#categorias" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Categorias
          </a>
          <a href="#contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contacto
          </a>
          <Link
            href="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </Link>
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
            Catalogo
          </a>
          <a href="#categorias" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Categorias
          </a>
          <a href="#contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Contacto
          </a>
          <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Admin
          </Link>
        </nav>
      )}
    </header>
  )
}