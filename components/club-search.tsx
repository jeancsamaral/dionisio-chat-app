"use client"

import React from "react"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

interface ClubSearchProps {
  onSearch: (searchTerm: string) => void;
  value: string;
  onChange: (value: string) => void;
}

export function ClubSearch({ onSearch, value, onChange }: ClubSearchProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    onSearch(newValue);
  };

  return (
    <div className="relative max-w-md w-full mx-auto mt-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Pesquisar clubes..."
        value={value}
        onChange={handleSearch}
        className="pl-10 bg-purple-950/30 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/50"
      />
    </div>
  )
}

