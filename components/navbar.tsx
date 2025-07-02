"use client"

import { Search, Bell, MessageCircle, Plus, Home, Building2, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
import { useCreatePostModal } from "@/hooks/use-create-post-modal"

export function Navbar() {
  const createPostModal = useCreatePostModal()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/newsfeed" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="BUBLIC" width={120} height={32} className="h-8 w-auto" />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search founders, companies, posts..."
                className="pl-10 bg-gray-50/80 border-gray-200/50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
            {/* Home */}
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/newsfeed">
                <Home className="w-5 h-5" />
              </Link>
            </Button>

            {/* Company */}
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/company">
                <Building2 className="w-5 h-5" />
              </Link>
            </Button>

            {/* Create Post */}
            <Button variant="ghost" size="sm" onClick={createPostModal.onOpen} className="hidden sm:flex">
              <Plus className="w-5 h-5" />
            </Button>

            {/* Messages */}
            <Button variant="ghost" size="sm" className="relative hidden sm:flex">
              <MessageCircle className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-blue-500">3</Badge>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative hidden sm:flex">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500">5</Badge>
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                      alt="Profile"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/analytics">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
