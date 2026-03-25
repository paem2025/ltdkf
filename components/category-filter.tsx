"use client"

import { CATEGORIES } from "@/lib/types"

interface CategoryFilterProps {
  selected: string
  onSelect: (category: string) => void
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div id="categorias" className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("Todos")}
        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
          selected === "Todos"
            ? "border-[#C2410C]/20 bg-[#C2410C] text-white shadow-[0_10px_20px_-14px_rgba(194,65,12,0.9)]"
            : "border-[#C2410C]/18 bg-[#FFF7ED] text-[#7C2D12] hover:-translate-y-0.5 hover:bg-white"
        }`}
      >
        Todos
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            selected === cat
              ? "border-[#C2410C]/20 bg-[#C2410C] text-white shadow-[0_10px_20px_-14px_rgba(194,65,12,0.9)]"
              : "border-[#C2410C]/18 bg-[#FFF7ED] text-[#7C2D12] hover:-translate-y-0.5 hover:bg-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
