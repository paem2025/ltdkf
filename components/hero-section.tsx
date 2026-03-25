"use client"

import { Clock3, ShieldCheck, Truck } from "lucide-react"
import { LandingContent, LandingSection } from "@/lib/types"

interface HeroSectionProps {
  content?: LandingContent
  adminMode?: boolean
  onEditSection?: (section: LandingSection) => void
}

export function HeroSection({ content, adminMode = false, onEditSection }: HeroSectionProps) {
  const canEdit = adminMode && Boolean(onEditSection)
  const heroBadge = content?.heroBadge || "Productos de cocina premium"
  const heroTitle = content?.heroTitle || "Cocina con lo mejor,"
  const heroTitleHighlight = content?.heroTitleHighlight || "disfruta cada momento"
  const heroDescription =
    content?.heroDescription ||
    "Descubri nuestra linea completa de ollas, sartenes y accesorios. Calidad que se siente en cada receta."
  const heroPrimaryCtaLabel = content?.heroPrimaryCtaLabel || "Ver catalogo"
  const heroSecondaryCtaLabel = content?.heroSecondaryCtaLabel || "Contactanos"
  const qualityHighlights = [
    { label: "Stock actualizado", icon: ShieldCheck },
    { label: "Envios a todo el pais", icon: Truck },
    { label: "Respuesta rapida", icon: Clock3 },
  ]

  function openHeroEditor() {
    onEditSection?.("hero")
  }

  return (
    <section className="relative w-full bg-background py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#C2410C]/20 bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA] px-5 py-12 shadow-[0_30px_60px_-40px_rgba(154,52,18,0.8)] lg:px-12 lg:py-16">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -top-1/2 -right-1/4 h-[520px] w-[520px] rounded-full bg-[#C2410C]/20" />
            <div className="absolute -bottom-1/3 -left-1/4 h-[380px] w-[380px] rounded-full bg-[#F59E0B]/20" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9A3412]/45 to-transparent" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-2xl">
              {canEdit ? (
                <button
                  type="button"
                  onClick={openHeroEditor}
                  className="mb-4 inline-flex rounded-full border border-[#9A3412]/30 bg-white/55 px-3 py-1 text-left text-xs font-semibold uppercase tracking-[0.22em] text-[#7C2D12]/85 hover:bg-white/75"
                >
                  {heroBadge}
                </button>
              ) : (
                <p className="mb-4 inline-flex rounded-full border border-[#9A3412]/30 bg-white/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#7C2D12]/85">
                  {heroBadge}
                </p>
              )}

              {canEdit ? (
                <button
                  type="button"
                  onClick={openHeroEditor}
                  className="text-left text-balance text-4xl font-serif leading-tight text-[#7C2D12] hover:opacity-90 lg:text-6xl"
                >
                  {heroTitle} <span className="italic text-[#9A3412]">{heroTitleHighlight}</span>
                </button>
              ) : (
                <h1 className="text-balance text-4xl font-serif leading-tight text-[#7C2D12] lg:text-6xl">
                  {heroTitle} <span className="italic text-[#9A3412]">{heroTitleHighlight}</span>
                </h1>
              )}

              {canEdit ? (
                <button
                  type="button"
                  onClick={openHeroEditor}
                  className="mt-5 max-w-xl text-left text-base leading-relaxed text-[#7C2D12]/80 hover:opacity-90 lg:text-lg"
                >
                  {heroDescription}
                </button>
              ) : (
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#7C2D12]/80 lg:text-lg">
                  {heroDescription}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {canEdit ? (
                  <button
                    type="button"
                    onClick={openHeroEditor}
                    className="inline-flex items-center rounded-xl bg-[#C2410C] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_-18px_rgba(194,65,12,0.9)] transition-all hover:-translate-y-0.5 hover:opacity-95"
                  >
                    {heroPrimaryCtaLabel}
                  </button>
                ) : (
                  <a
                    href="#catalogo"
                    className="inline-flex items-center rounded-xl bg-[#C2410C] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_-18px_rgba(194,65,12,0.9)] transition-all hover:-translate-y-0.5 hover:opacity-95"
                  >
                    {heroPrimaryCtaLabel}
                  </a>
                )}

                {canEdit ? (
                  <button
                    type="button"
                    onClick={openHeroEditor}
                    className="inline-flex items-center rounded-xl border border-[#C2410C]/30 bg-white/45 px-6 py-3 text-sm font-semibold text-[#7C2D12] transition-colors hover:bg-white/80"
                  >
                    {heroSecondaryCtaLabel}
                  </button>
                ) : (
                  <a
                    href="#contacto"
                    className="inline-flex items-center rounded-xl border border-[#C2410C]/30 bg-white/45 px-6 py-3 text-sm font-semibold text-[#7C2D12] transition-colors hover:bg-white/80"
                  >
                    {heroSecondaryCtaLabel}
                  </a>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {qualityHighlights.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#9A3412]/30 bg-white/55 px-3 py-1.5 text-xs font-medium text-[#7C2D12]"
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <article className="rounded-2xl border border-[#9A3412]/20 bg-white/55 p-4 shadow-[0_18px_32px_-24px_rgba(154,52,18,0.8)]">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7C2D12]/65">Diseno premium</p>
                <p className="mt-1 text-lg font-semibold text-[#7C2D12]">Linea elegante para cocina diaria</p>
              </article>
              <article className="rounded-2xl border border-[#9A3412]/20 bg-white/55 p-4 shadow-[0_18px_32px_-24px_rgba(154,52,18,0.8)]">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7C2D12]/65">Materiales fuertes</p>
                <p className="mt-1 text-lg font-semibold text-[#7C2D12]">Durabilidad real para uso intensivo</p>
              </article>
              <article className="rounded-2xl border border-[#9A3412]/20 bg-white/55 p-4 shadow-[0_18px_32px_-24px_rgba(154,52,18,0.8)]">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7C2D12]/65">Asesoria directa</p>
                <p className="mt-1 text-lg font-semibold text-[#7C2D12]">Recomendaciones por WhatsApp</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
