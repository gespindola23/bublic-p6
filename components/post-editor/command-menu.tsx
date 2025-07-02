"use client"

import type React from "react"

import { Briefcase, TrendingUp, FileText, X } from "lucide-react"
import type { PostType } from "@/components/create-post-form"

interface CommandMenuProps {
  onSelect: (type: PostType) => void
  onClose: () => void
}

const commands: { type: PostType; label: string; icon: React.ElementType }[] = [
  { type: "article", label: "Article", icon: FileText },
  { type: "job", label: "Job Posting", icon: Briefcase },
  { type: "milestone", label: "Milestone", icon: TrendingUp },
]

export function CommandMenu({ onSelect, onClose }: CommandMenuProps) {
  return (
    <div className="absolute z-10 top-full mt-2 w-64 bg-white/90 backdrop-blur-xl border border-black/10 shadow-xl rounded-xl p-2">
      <div className="flex items-center justify-between mb-2 px-2">
        <p className="text-xs font-semibold text-gray-700">Post Type</p>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5">
          <X className="w-3 h-3 text-gray-600" />
        </button>
      </div>
      <div className="space-y-1">
        {commands.map((command) => {
          const Icon = command.icon
          return (
            <button
              key={command.type}
              onClick={() => onSelect(command.type)}
              className="w-full flex items-center space-x-3 p-2 text-left hover:bg-black/5 rounded-lg transition-colors"
            >
              <Icon className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">{command.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
