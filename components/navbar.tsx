"use client"

import { Search, MessageSquare, Home, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationCenter } from "@/components/social/notification-center"
import Link from "next/link"
import Image from "next/image"
import { useCreatePostModal } from "@/hooks/use-create-post-modal"

export function Navbar() {
  const createPostModal = useCreatePostModal()

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-black/5 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/feed" className="flex items-center">
            <Image src="/logo.png" alt="BUBLIC Logo" width={120} height={36} className="h-9" />
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search founders, companies, or posts..."
                className="pl-10 bg-white/60 backdrop-blur-xl border-black/10 focus:bg-white/80 focus:border-black/20 transition-all duration-200 rounded-xl"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={createPostModal.open}
              className="bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-lg"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hover:bg-black/5 rounded-xl transition-all duration-200"
            >
              <Link href="/feed">
                <Home className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-black/5 rounded-xl transition-all duration-200">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <NotificationCenter />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-black/10 hover:ring-black/20 transition-all duration-200">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-gray-100 text-gray-700 font-medium">JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white/95 backdrop-blur-2xl border-black/10 shadow-xl rounded-xl"
              >
                <DropdownMenuItem className="rounded-lg">
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg">
                  <Link href="/company">My Company</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/5" />
                <DropdownMenuItem className="rounded-lg">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
