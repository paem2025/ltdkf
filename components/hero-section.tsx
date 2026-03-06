"use client"

import { LandingContent, LandingSection } from "@/lib/types"

interface HeroSectionProps {
  content?: LandingContent
  adminMode?: boolean
  onEditSection?: (section: LandingSection) => void
}

export function HeroSection({ content, adminMode = false, onEditSection }: HeroSectionProps) {
  const heroBadge = content?.heroBadge || "Productos de cocina premium"
  const heroTitle = content?.heroTitle || "Cocina con lo mejor,"
  const heroTitleHighlight = content?.heroTitleHighlight || "disfruta cada momento"
  const heroDescription =
    content?.heroDescription ||
    "Descubri nuestra linea completa de ollas, sartenes y accesorios. Calidad que se siente en cada receta."
  const heroPrimaryCtaLabel = content?.heroPrimaryCtaLabel || "Ver catalogo"
  const heroSecondaryCtaLabel = content?.heroSecondaryCtaLabel || "Contactanos"

  return (
    <section className="relative w-full bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#FFF7ED] px-6 py-16 shadow-lg ring-1 ring-[#C2410C]/15 lg:px-12 lg:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -top-1/2 -right-1/4 h-[520px] w-[520px] rounded-full bg-[#C2410C]/20" />
            <div className="absolute -bottom-1/3 -left-1/4 h-[380px] w-[380px] rounded-full bg-[#F59E0B]/20" />
          </div>

          <div className="relative max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#7C2D12]/70">
              {heroBadge}
            </p>

            <h1 className="text-balance text-4xl font-serif leading-tight text-[#7C2D12] lg:text-6xl">
              {heroTitle} <span className="italic text-[#9A3412]">{heroTitleHighlight}</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#7C2D12]/80">
              {heroDescription}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#catalogo"
                className="inline-flex items-center rounded-lg bg-[#C2410C] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition"
              >
                {heroPrimaryCtaLabel}
              </a>

              <a
                href="#contacto"
                className="inline-flex items-center rounded-lg border border-[#C2410C]/30 px-6 py-3 text-sm font-semibold text-[#7C2D12] hover:bg-[#C2410C]/5 transition"
              >
                {heroSecondaryCtaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>

      {adminMode && onEditSection && (
        <button
          type="button"
          onClick={() => onEditSection("hero")}
          className="absolute right-6 top-6 rounded-lg border border-border bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:bg-muted transition-colors"
        >
          Editar hero
        </button>
      )}
    </section>
  )
}
