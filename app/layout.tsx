import type { Metadata, Viewport } from "next"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" })

export const metadata: Metadata = {
  title: "Cocina Essen - Productos de Cocina Premium",
  description:
    "Descubri los mejores productos de cocina Essen. Ollas, sartenes, cacerolas y mas. Consultanos por WhatsApp.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  // opcional: que coincida con tu ocre nuevo (no el marrón viejo)
  themeColor: "#C2410C",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-background overflow-x-hidden">
      <body
        className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased min-h-screen bg-background overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}