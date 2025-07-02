import { PostCard } from "@/components/post-card"
import type { PostWithAuthor } from "@/types"

interface NewsfeedProps {
  posts: PostWithAuthor[]
}

const mockPosts: PostWithAuthor[] = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      title: "Founder & CEO at TechFlow",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      company: "TechFlow",
    },
    content: "🚀 Milestone Alert! We just hit $50K MRR after 8 months of building in public. Here's what we learned...",
    timestamp: "2h ago",
    likes: 124,
    comments: 23,
    shares: 8,
    isPremium: false,
    isLiked: false,
    isFollowing: false,
    metrics: {
      mrr: "$50,000",
      growth: "+25%",
    },
  },
  {
    id: 2,
    author: {
      name: "Alex Rodriguez",
      title: "Co-founder at DataViz Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      company: "DataViz Pro",
    },
    content:
      "The hardest part about fundraising isn't the pitch deck - it's maintaining team morale during the process. Here's how we kept our team motivated during our Series A...",
    timestamp: "4h ago",
    likes: 89,
    comments: 15,
    shares: 12,
    isPremium: true,
    isLiked: true,
    isFollowing: true,
    attachment: {
      type: "pdf",
      title: "Series A Fundraising Playbook",
      gated: true,
    },
  },
  {
    id: 3,
    author: {
      name: "Maria Santos",
      title: "Founder at GreenTech Solutions",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      company: "GreenTech Solutions",
    },
    content:
      "We're hiring! Looking for a Senior Full-Stack Developer to join our mission of making sustainability accessible to everyone. Remote-first, competitive equity package 🌱",
    timestamp: "6h ago",
    likes: 67,
    comments: 31,
    shares: 19,
    isPremium: false,
    isLiked: false,
    isFollowing: false,
    jobPosting: {
      title: "Senior Full-Stack Developer",
      location: "Remote",
      type: "Full-time",
    },
  },
]

export function Newsfeed({ posts }: NewsfeedProps) {
  return (
    <div className="space-y-6">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="text-center py-12 bg-white/60 backdrop-blur-xl border border-black/5 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900">Your feed is empty</h3>
          <p className="text-gray-600 mt-2">Start following other founders or share your first post to get started!</p>
        </div>
      )}
    </div>
  )
}
