"use client"

import { useState } from "react"
import { PostCard } from "./post-card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

interface Post {
  id: number
  content: string
  created_at: string
  is_premium: boolean
  price?: number
  metrics?: any
  attachment?: any
  job_posting?: any
  profiles: {
    id: string
    full_name: string
    avatar_url: string
    title: string
    company: string
    verified: boolean
  }
  companies?: {
    id: string
    name: string
    logo_url: string
  }
}

interface NewsfeedProps {
  initialPosts: Post[]
}

export function Newsfeed({ initialPosts }: NewsfeedProps) {
  const [posts] = useState<Post[]>(initialPosts)

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlusIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-500 mb-6">Be the first to share something with the community!</p>
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={{
            id: post.id.toString(),
            author: {
              name: post.profiles.full_name,
              avatar: post.profiles.avatar_url,
              title: post.profiles.title,
              company: post.profiles.company,
              verified: post.profiles.verified,
            },
            content: post.content,
            timestamp: new Date(post.created_at).toLocaleString(),
            isPremium: post.is_premium,
            price: post.price,
            metrics: post.metrics,
            attachment: post.attachment,
            jobPosting: post.job_posting,
            companyLogo: post.companies?.logo_url,
          }}
        />
      ))}
    </div>
  )
}
