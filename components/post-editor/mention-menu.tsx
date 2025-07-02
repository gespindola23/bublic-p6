"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, User } from "lucide-react"

interface MentionMenuProps {
  onSelect: (mention: string) => void
}

const mockMentions = [
  { type: "user", name: "John Doe", handle: "Founder @ StartupCo", avatar: "/placeholder.svg?height=32&width=32" },
  { type: "user", name: "Sarah Chen", handle: "CEO @ TechFlow", avatar: "/placeholder.svg?height=32&width=32" },
  { type: "company", name: "TechFlow", handle: "Workflow Automation", avatar: "/placeholder.svg?height=32&width=32" },
  { type: "company", name: "DataViz Pro", handle: "Data Analytics", avatar: "/placeholder.svg?height=32&width=32" },
]

export function MentionMenu({ onSelect }: MentionMenuProps) {
  return (
    <div className="absolute z-10 bottom-full mb-2 w-72 bg-white/90 backdrop-blur-xl border border-black/10 shadow-xl rounded-xl p-2">
      <p className="text-xs font-semibold text-gray-700 mb-2 px-2">Mention User or Company</p>
      <div className="space-y-1">
        {mockMentions.map((mention) => {
          const Icon = mention.type === "user" ? User : Building2
          return (
            <button
              key={mention.name}
              onClick={() => onSelect(`@${mention.name}`)}
              className="w-full flex items-center space-x-3 p-2 text-left hover:bg-black/5 rounded-lg transition-colors"
            >
              <Avatar className="w-8 h-8 ring-1 ring-black/5">
                <AvatarImage src={mention.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  <Icon className="w-4 h-4 text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-900">{mention.name}</p>
                <p className="text-xs text-gray-500">{mention.handle}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
