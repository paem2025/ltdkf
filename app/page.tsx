"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ProductCatalog } from "@/components/product-catalog"
import { SiteFooter } from "@/components/site-footer"
import { DEFAULT_LANDING_CONTENT, getLandingContent } from "@/lib/landing-content"
import { LandingContent } from "@/lib/types"

export default function HomePage() {
  const [content, setContent] = useState<LandingContent>(DEFAULT_LANDING_CONTENT)

  useEffect(() => {
    let mounted = true

    void (async () => {
      const loaded = await getLandingContent()
      if (mounted) {
        setContent(loaded)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <main className="min-h-screen">
      <SiteHeader content={content} />
      <HeroSection content={content} />
      <ProductCatalog
        heading={content.catalogTitle}
        description={content.catalogDescription}
        whatsappNumber={content.whatsappNumber}
        productInquiryTemplate={content.productInquiryTemplate}
      />
      <SiteFooter content={content} />
    </main>
  )
}
