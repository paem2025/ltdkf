export function HeroSection() {
  return (
    <section className="w-full bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#FFF7ED] px-6 py-16 shadow-lg ring-1 ring-[#C2410C]/15 lg:px-12 lg:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -top-1/2 -right-1/4 h-[520px] w-[520px] rounded-full bg-[#C2410C]/20" />
            <div className="absolute -bottom-1/3 -left-1/4 h-[380px] w-[380px] rounded-full bg-[#F59E0B]/20" />
          </div>

          <div className="relative max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#7C2D12]/70">
              Productos de cocina premium
            </p>

            <h1 className="text-balance text-4xl font-serif leading-tight text-[#7C2D12] lg:text-6xl">
              Cocina con lo mejor,{" "}
              <span className="italic text-[#9A3412]">disfruta cada momento</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#7C2D12]/80">
              Descubrí nuestra línea completa de ollas, sartenes y accesorios.
              Calidad que se siente en cada receta.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#catalogo"
                className="inline-flex items-center rounded-lg bg-[#C2410C] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition"
              >
                Ver catálogo
              </a>

              <a
                href="#contacto"
                className="inline-flex items-center rounded-lg border border-[#C2410C]/30 px-6 py-3 text-sm font-semibold text-[#7C2D12] hover:bg-[#C2410C]/5 transition"
              >
                Contactanos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}