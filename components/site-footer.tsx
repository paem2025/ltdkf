import { MessageCircle } from "lucide-react"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer id="contacto" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          
          {/* LOGO + DESCRIPCION */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              
              <Image
                src="/images/logo.jpg"
                alt="Kelly Store"
                width={80}
                height={80}
                className="object-contain"
              />

              <span className="text-xl font-serif text-foreground">
                Kelly Store
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Productos de cocina premium para quienes disfrutan cocinar. Calidad, durabilidad y diseño en cada pieza.
            </p>
          </div>

          {/* NAVEGACION */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Navegacion
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#catalogo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Catalogo
                </a>
              </li>
              <li>
                <a href="#categorias" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Categorias
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACTO */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Contacto
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Escribinos por WhatsApp para consultas, pedidos o asesoramiento personalizado.
            </p>

            <a
              href="https://wa.me/5491124848417?text=Hola!%20Quiero%20consultar%20por%20productos%20Kelly%20Store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-4 w-4" />
              Escribinos por WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Kelly Store — Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}