"use client"

import { useState } from "react"
import { UserPlus, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FollowButtonProps {
  userId: number
  initialIsFollowing?: boolean
  onFollowChange?: (isFollowing: boolean) => void
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
}

export function FollowButton({
  userId,
  initialIsFollowing = false,
  onFollowChange,
  variant = "default",
  size = "default",
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    setIsLoading(true)
    const newFollowingState = !isFollowing

    // Simulate API call
    setTimeout(() => {
      setIsFollowing(newFollowingState)
      setIsLoading(false)
      onFollowChange?.(newFollowingState)
      console.log(`${newFollowingState ? "Followed" : "Unfollowed"} user ${userId}`)
    }, 500)
  }

  if (isFollowing) {
    return (
      <Button
        variant={variant === "default" ? "outline" : "outline"}
        size={size}
        onClick={handleFollow}
        disabled={isLoading}
        className="border-black/10 hover:bg-red-50 hover:border-red-200 hover:text-red-600 rounded-lg bg-transparent transition-all duration-200"
      >
        <UserCheck className="w-4 h-4 mr-2" />
        {isLoading ? "Loading..." : "Following"}
      </Button>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleFollow}
      disabled={isLoading}
      className={
        variant === "default"
          ? "bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-lg"
          : "border-black/10 hover:bg-black/5 rounded-lg bg-transparent"
      }
    >
      <UserPlus className="w-4 h-4 mr-2" />
      {isLoading ? "Loading..." : "Follow"}
    </Button>
  )
}
