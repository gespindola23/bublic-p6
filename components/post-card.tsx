"use client"

import { Share2, Lock, FileText, Briefcase, TrendingUp, Verified } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PaywallModal } from "@/components/paywall-modal"
import { LikeButton } from "@/components/social/like-button"
import { CommentSection } from "@/components/social/comment-section"
import { FollowButton } from "@/components/social/follow-button"
import { useState } from "react"
import type { PostWithAuthor } from "@/types"
import { formatDistanceToNow } from "date-fns"

interface PostCardProps {
  post: PostWithAuthor
}

const mockComments = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
    },
    content: "This is incredibly insightful! Thanks for sharing your journey.",
    timestamp: "2 hours ago",
    likes: 5,
    isLiked: false,
  },
]

export function PostCard({ post }: PostCardProps) {
  const [showPaywall, setShowPaywall] = useState(false)

  if (!post.author) {
    return null // Or a loading/error state for the card
  }

  const authorName = post.author.full_name || "Anonymous"
  const authorTitle = `${post.author.title || "Member"} at ${post.author.company || "a Startup"}`
  const timestamp = formatDistanceToNow(new Date(post.created_at), { addSuffix: true })

  const metrics = post.metrics as { mrr?: string; growth?: string } | null
  const attachment = post.attachment as { type: string; title: string; gated: boolean } | null
  const jobPosting = post.job_posting as { title: string; location: string; type: string } | null

  return (
    <Card className="bg-white/70 backdrop-blur-2xl border-black/5 shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-300 rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="ring-2 ring-black/5">
              <AvatarImage src={post.author.avatar_url || "/placeholder.svg"} />
              <AvatarFallback className="bg-gray-100 text-gray-700 font-medium">
                {authorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{authorName}</h3>
                {post.author.verified && <Verified className="w-4 h-4 text-blue-500 fill-current" />}
              </div>
              <p className="text-sm text-gray-600">{authorTitle}</p>
              <p className="text-xs text-gray-500">{timestamp}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {post.is_premium && (
              <>
                <Badge className="bg-black text-white rounded-lg px-3 py-1">
                  <Lock className="w-3 h-3 mr-1" />
                  Premium - ${post.price}
                </Badge>
                <Button
                  size="sm"
                  onClick={() => setShowPaywall(true)}
                  className="bg-black hover:bg-black/90 text-white rounded-lg"
                >
                  Unlock
                </Button>
              </>
            )}
            <FollowButton userId={post.id} initialIsFollowing={false} size="sm" variant="outline" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{post.content}</p>

        {/* Metrics Display */}
        {metrics && (
          <div className="flex space-x-4 p-4 bg-green-50/80 backdrop-blur-xl rounded-xl border border-green-100">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">MRR: {metrics.mrr}</span>
            </div>
            {metrics.growth && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-green-700">Growth: {metrics.growth}</span>
              </div>
            )}
          </div>
        )}

        {/* PDF Attachment */}
        {attachment && (
          <div className="p-4 bg-gray-50/80 backdrop-blur-xl rounded-xl border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">{attachment.title}</h4>
                  <p className="text-sm text-gray-600">PDF Document</p>
                </div>
              </div>
              <Button size="sm" className="bg-black hover:bg-black/90 text-white rounded-lg">
                {attachment.gated ? "Get Access" : "Download"}
              </Button>
            </div>
          </div>
        )}

        {/* Job Posting */}
        {jobPosting && (
          <div className="p-4 bg-blue-50/80 backdrop-blur-xl rounded-xl border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-blue-900">{jobPosting.title}</h4>
                  <p className="text-sm text-blue-700">
                    {jobPosting.location} • {jobPosting.type}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent rounded-lg"
              >
                Apply Now
              </Button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-black/5">
          <div className="flex items-center space-x-6">
            <LikeButton postId={post.id} initialLikes={0} initialIsLiked={false} />
            <CommentSection postId={post.id} initialComments={mockComments} commentCount={0} />
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-lg"
            >
              <Share2 className="w-4 h-4 mr-2" />0
            </Button>
          </div>
        </div>
      </CardContent>
      {post.author && (
        <PaywallModal
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
          post={{
            title: post.content.slice(0, 50) + "...",
            author: {
              name: post.author.full_name || "Anonymous",
              avatar: post.author.avatar_url || "/placeholder.svg",
            },
            price: post.price || 5,
          }}
        />
      )}
    </Card>
  )
}
