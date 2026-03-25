"use client"

import Image from "next/image"
import { MessageCircle } from "lucide-react"
import { Product } from "@/lib/types"
import { formatPrice, buildWhatsAppUrl } from "@/lib/products"
import { applyProductTemplate } from "@/lib/landing-content"

interface ProductCardProps {
  product: Product
  whatsappNumber?: string
  whatsappMessageTemplate?: string
  adminMode?: boolean
  onEditProducts?: () => void
}

export function ProductCard({
  product,
  whatsappNumber,
  whatsappMessageTemplate,
  adminMode = false,
  onEditProducts,
}: ProductCardProps) {
  const canEditProducts = adminMode && Boolean(onEditProducts)
  const whatsappMessage = applyProductTemplate(
    whatsappMessageTemplate ?? "Hola! Me interesa el producto: {product}. Me podrias dar mas info?",
    product.name,
  )

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#C2410C]/16 bg-white shadow-[0_20px_36px_-30px_rgba(154,52,18,0.9)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_44px_-28px_rgba(154,52,18,0.95)]">
      {canEditProducts && (
        <button
          type="button"
          onClick={onEditProducts}
          className="absolute inset-0 z-10"
          aria-label={`Editar ${product.name}`}
        />
      )}
      <div className="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rotate-45 border border-[#C2410C]/22 bg-[#C2410C]/6" />
      <div className="relative aspect-square overflow-hidden bg-[#FFF7ED]">
        {canEditProducts && (
          <button
            type="button"
            onClick={onEditProducts}
            className="absolute right-2 top-2 z-20 rounded-md border border-[#C2410C]/20 bg-white/90 px-2 py-1 text-[11px] font-semibold text-[#7C2D12] shadow-sm hover:bg-white"
          >
            Editar imagen
          </button>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-md border border-[#C2410C]/18 bg-[#C2410C] px-2.5 py-1 text-xs font-semibold text-white shadow-[0_8px_18px_-14px_rgba(194,65,12,0.9)]">
            Destacado
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9A3412]/65">
          {product.category}
        </span>
        <h3 className="mt-1.5 text-lg font-semibold leading-snug text-[#7C2D12]">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#7C2D12]/70">
          {product.description}
        </p>
        <div className="mt-auto flex items-end justify-between pt-5">
          <span className="text-2xl font-bold text-[#7C2D12]">
            {formatPrice(product.price)}
          </span>
          {canEditProducts ? (
            <button
              type="button"
              onClick={onEditProducts}
              className="relative z-20 inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3.5 py-2 text-xs font-semibold text-whatsapp-foreground shadow-[0_0_18px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-0.5 hover:opacity-95"
              aria-label={`Editar producto ${product.name}`}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Editar</span>
            </button>
          ) : (
            <a
              href={buildWhatsAppUrl(product.name, whatsappNumber, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3.5 py-2 text-xs font-semibold text-whatsapp-foreground shadow-[0_0_18px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-0.5 hover:opacity-95"
              aria-label={`Consultar por WhatsApp sobre ${product.name}`}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Consultar</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
