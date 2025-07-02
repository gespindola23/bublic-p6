import { createClient } from "@supabase/supabase-js"

interface Post {
  id: string
  content: string
  created_at: string
  profiles: {
    full_name: string
    avatar_url: string | null
  }
  companies: {
    name: string
    logo_url: string | null
  } | null
}

async function getPosts(): Promise<Post[]> {
  try {
    // Create Supabase client with explicit environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.log("Supabase environment variables not found, returning sample data")
      return getSamplePosts()
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        created_at,
        profiles (
          full_name,
          avatar_url
        ),
        companies (
          name,
          logo_url
        )
      `)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Supabase query error:", error)
      return getSamplePosts()
    }

    if (!posts || posts.length === 0) {
      console.log("No posts found in database, returning sample data")
      return getSamplePosts()
    }

    return posts as Post[]
  } catch (error) {
    console.error("Database connection error:", error)
    return getSamplePosts()
  }
}

function getSamplePosts(): Post[] {
  return [
    {
      id: "1",
      content:
        "🚀 Just launched our MVP! After 6 months of development, we finally have something to show. The feedback from our beta users has been incredible. Building in public really works!",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: "Sarah Chen",
        avatar_url: "/placeholder-user.jpg",
      },
      companies: {
        name: "TechFlow",
        logo_url: "/placeholder-logo.png",
      },
    },
    {
      id: "2",
      content:
        "Milestone achieved! 💪 We just hit $10K MRR. It took us 8 months, but the journey has been incredible. Key lessons: focus on customer feedback, iterate quickly, and never give up.",
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: "Marcus Rodriguez",
        avatar_url: "/placeholder-user.jpg",
      },
      companies: {
        name: "GrowthLab",
        logo_url: "/placeholder-logo.png",
      },
    },
    {
      id: "3",
      content:
        "Team update: We're hiring! 🎉 Looking for a senior full-stack developer to join our remote team. If you're passionate about fintech and want to make a real impact, DM me!",
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: "Alex Thompson",
        avatar_url: "/placeholder-user.jpg",
      },
      companies: {
        name: "FinanceAI",
        logo_url: "/placeholder-logo.png",
      },
    },
    {
      id: "4",
      content:
        "Lessons from our first year: 1) Product-market fit is everything 2) Hire slowly, fire quickly 3) Cash flow is king 4) Customer success drives growth 5) Mental health matters",
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: "Emma Wilson",
        avatar_url: "/placeholder-user.jpg",
      },
      companies: {
        name: "StartupOS",
        logo_url: "/placeholder-logo.png",
      },
    },
    {
      id: "5",
      content:
        "Just closed our seed round! 🎊 $2M to accelerate our mission of making healthcare accessible to everyone. Grateful for our investors who believed in our vision from day one.",
      created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: "David Park",
        avatar_url: "/placeholder-user.jpg",
      },
      companies: {
        name: "HealthTech",
        logo_url: "/placeholder-logo.png",
      },
    },
  ]
}

export default async function NewsfeedPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Newsfeed</h1>

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start space-x-3">
                <img
                  src={post.profiles.avatar_url || "/placeholder-user.jpg"}
                  alt={post.profiles.full_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{post.profiles.full_name}</h3>
                    {post.companies && (
                      <>
                        <span className="text-gray-500">at</span>
                        <div className="flex items-center space-x-1">
                          {post.companies.logo_url && (
                            <img
                              src={post.companies.logo_url || "/placeholder.svg"}
                              alt={post.companies.name}
                              className="w-4 h-4 rounded object-cover"
                            />
                          )}
                          <span className="text-sm font-medium text-blue-600">{post.companies.name}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-gray-800 leading-relaxed">{post.content}</p>

                  <div className="flex items-center space-x-6 mt-4 pt-3 border-t border-gray-100">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span className="text-sm">Like</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 21l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                        />
                      </svg>
                      <span className="text-sm">Comment</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  )
}
