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
}

export function ProductCard({ product, whatsappNumber, whatsappMessageTemplate }: ProductCardProps) {
  const whatsappMessage = applyProductTemplate(
    whatsappMessageTemplate ?? "Hola! Me interesa el producto: {product}. Me podrias dar mas info?",
    product.name,
  )

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            Destacado
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <h3 className="mt-1.5 text-lg font-semibold text-card-foreground leading-snug">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto flex items-end justify-between pt-5">
          <span className="text-2xl font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          <a
            href={buildWhatsAppUrl(product.name, whatsappNumber, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3.5 py-2 text-xs font-semibold text-whatsapp-foreground shadow-sm hover:opacity-90 transition-opacity"
            aria-label={`Consultar por WhatsApp sobre ${product.name}`}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Consultar</span>
          </a>
        </div>
      </div>
    </article>
  )
}
