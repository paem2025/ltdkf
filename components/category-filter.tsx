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
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          selected === "Todos"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-secondary text-secondary-foreground hover:bg-border"
        }`}
      >
        Todos
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected === cat
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-secondary-foreground hover:bg-border"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
