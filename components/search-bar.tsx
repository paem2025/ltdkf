"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A3412]/60" />
      <input
        type="text"
        placeholder="Buscar productos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#C2410C]/18 bg-[#FFF7ED] py-3 pl-10 pr-4 text-sm text-[#7C2D12] placeholder:text-[#7C2D12]/55 shadow-[0_12px_28px_-22px_rgba(154,52,18,0.8)] transition-all focus:border-[#C2410C]/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
      />
    </div>
  )
}
