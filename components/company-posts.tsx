import { PostCard } from "@/components/post-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PostWithAuthor } from "@/types"

interface CompanyPostsProps {
  posts: PostWithAuthor[]
}

export function CompanyPosts({ posts }: CompanyPostsProps) {
  if (posts.length === 0) {
    return (
      <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Company Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center py-8">No posts yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Company Updates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </CardContent>
    </Card>
  )
}
