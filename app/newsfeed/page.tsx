import { Navbar } from "@/components/navbar"
import { Newsfeed } from "@/components/newsfeed"
import { QuickActions } from "@/components/quick-actions"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { PostWithAuthor } from "@/types"

const MOCK_POSTS: PostWithAuthor[] = [
  {
    id: 1,
    content: "🚀 Milestone Alert! We just hit $50K MRR after 8 months of building in public. Here's what we learned…",
    created_at: new Date().toISOString(),
    is_premium: false,
    price: null,
    metrics: { mrr: "$50,000", growth: "+25%" },
    attachment: null,
    job_posting: null,
    author: {
      id: "mock-1",
      full_name: "Sarah Chen",
      avatar_url: "/placeholder.svg?height=40&width=40",
      title: "Founder & CEO at TechFlow",
      company: "TechFlow",
      verified: true,
    },
  },
]

function renderPage(posts: PostWithAuthor[], showBanner = false) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      {showBanner && (
        <div className="bg-yellow-50 border-b border-yellow-300 text-yellow-800 text-center py-2 text-sm">
          Database tables not found. Showing mock data – run the migration script to enable live posts.
        </div>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:24px_24px] opacity-30" />
      <Navbar />
      <main className="container mx-auto px-4 py-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 lg:order-2">
            <TrendingSidebar />
          </div>
          <div className="lg:col-span-2 lg:order-1">
            <Newsfeed posts={posts} />
          </div>
          <div className="lg:col-span-1 hidden lg:block">
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  )
}

export default async function NewsfeedPage() {
  const supabase = createSupabaseServerClient()

  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select(`
      *,
      author:profiles(*)
    `)
    .order("created_at", { ascending: false })

  if (postsError) {
    console.error("Supabase fetch error:", postsError)
    // Table doesn't exist yet → show mock data so the page still renders
    if ((postsError as any).code === "42P01") {
      console.warn("Supabase schema not found. Using mock posts. Run scripts/004-complete-schema.sql then refresh.")
      return renderPage(MOCK_POSTS, true)
    }

    console.error("Error fetching posts:", postsError)
    return <p className="p-8 text-center text-red-600">Failed to load the newsfeed.</p>
  } else if (!posts || posts.length === 0) {
    console.log("No posts found in Supabase.")
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <p className="text-gray-600">No posts yet. Be the first to share!</p>
      </div>
    )
  } else {
    console.log("Posts fetched successfully:", posts.length, "posts")
    console.log("First post example:", posts[0])
  }

  // The posts are already joined with author data, so no need for profileMap or manual merging.
  return renderPage(posts as PostWithAuthor[])
}
