"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LikeButtonProps {
  postId: number
  initialLikes: number
  initialIsLiked?: boolean
  onLikeChange?: (liked: boolean, newCount: number) => void
}

export function LikeButton({ postId, initialLikes, initialIsLiked = false, onLikeChange }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [likeCount, setLikeCount] = useState(initialLikes)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLike = async () => {
    setIsAnimating(true)
    const newLikedState = !isLiked
    const newCount = newLikedState ? likeCount + 1 : likeCount - 1

    setIsLiked(newLikedState)
    setLikeCount(newCount)

    // Simulate API call
    setTimeout(() => {
      console.log(`${newLikedState ? "Liked" : "Unliked"} post ${postId}`)
      onLikeChange?.(newLikedState, newCount)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className={`transition-all duration-200 rounded-lg ${
        isLiked ? "text-red-500 hover:text-red-600 hover:bg-red-50" : "text-gray-600 hover:text-red-500 hover:bg-red-50"
      }`}
    >
      <Heart
        className={`w-4 h-4 mr-2 transition-all duration-200 ${
          isLiked ? "fill-current" : ""
        } ${isAnimating ? "scale-125" : ""}`}
      />
      {likeCount}
    </Button>
  )
}
