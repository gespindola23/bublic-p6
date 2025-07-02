import { createClient } from "@supabase/supabase-js"
import { Navbar } from "@/components/navbar"
import { QuickActions } from "@/components/quick-actions"
import { TrendingSidebar } from "@/components/trending-sidebar"

interface PostData {
  id: string
  content: string
  created_at: string
  is_premium: boolean
  price: number | null
  metrics: any
  attachment: any
  job_posting: any
  profiles: {
    full_name: string
    avatar_url: string | null
    title: string | null
    company: string | null
    verified: boolean
  } | null
  companies: {
    name: string
    logo_url: string | null
  } | null
}

function getSamplePosts(): PostData[] {
  return [
    {
      id: "1",
      content:
        "🚀 Just launched our MVP! After 6 months of development, we finally have something to show. The feedback from our beta users has been incredible. Building in public really works! #BuildInPublic #Startup",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      is_premium: false,
      price: null,
      metrics: { mrr: "$5,000", users: "500" },
      attachment: null,
      job_posting: null,
      profiles: {
        full_name: "Sarah Chen",
        avatar_url: "/placeholder-user.jpg",
        title: "Founder & CEO",
        company: "TechFlow",
        verified: true,
      },
      companies: {
        name: "TechFlow",
        logo_url: "/placeholder-logo.png",
      },
    },
    {
      id: "2",
      content:
        "Milestone achieved! 💪 We just hit $10K MRR. It took us 8 months, but the journey has been incredible. Key lessons: focus on customer feedback, iterate quickly, and never give up. Thread below 👇",
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      is_premium: true,
      price: 9.99,
      metrics: { mrr: "$10,000", growth: "+150%" },
      attachment: { type: "pdf", title: "Growth Strategy Guide", gated: true },
      job_posting: null,
      profiles: {
        full_name: "Marcus Rodriguez",
        avatar_url: "/placeholder-user.jpg",
        title: "Co-founder",
        company: "GrowthLab",
        verified: true,
      },
      companies: {
        name: "GrowthLab",
        logo_url: "/placeholder-logo.png",
      },
    },
    {
      id: "3",
      content:
        "Team update: We're hiring! 🎉 Looking for a senior full-stack developer to join our remote team. If you're passionate about fintech and want to make a real impact, DM me! #Hiring #RemoteWork",
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      is_premium: false,
      price: null,
      metrics: null,
      attachment: null,
      job_posting: {
        title: "Senior Full-Stack Developer",
        location: "Remote",
        type: "Full-time",
        salary: "$120K-160K",
      },
      profiles: {
        full_name: "Alex Thompson",
        avatar_url: "/placeholder-user.jpg",
        title: "CTO",
        company: "FinanceAI",
        verified: false,
      },
      companies: {
        name: "FinanceAI",
        logo_url: "/placeholder-logo.png",
      },
    },
    {
      id: "4",
      content:
        "Lessons from our first year: 1) Product-market fit is everything 2) Hire slowly, fire quickly 3) Cash flow is king 4) Customer success drives growth 5) Mental health matters. What would you add?",
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      is_premium: false,
      price: null,
      metrics: { revenue: "$50K", team: "8 people" },
      attachment: null,
      job_posting: null,
      profiles: {
        full_name: "Emma Wilson",
        avatar_url: "/placeholder-user.jpg",
        title: "Founder",
        company: "StartupOS",
        verified: true,
      },
      companies: {
        name: "StartupOS",
        logo_url: "/placeholder-logo.png",
      },
    },
    {
      id: "5",
      content:
        "Just closed our seed round! 🎊 $2M to accelerate our mission of making healthcare accessible to everyone. Grateful for our investors who believed in our vision from day one. Time to scale! 🚀",
      created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      is_premium: false,
      price: null,
      metrics: { funding: "$2M", stage: "Seed" },
      attachment: null,
      job_posting: null,
      profiles: {
        full_name: "David Park",
        avatar_url: "/placeholder-user.jpg",
        title: "CEO",
        company: "HealthTech",
        verified: true,
      },
      companies: {
        name: "HealthTech",
        logo_url: "/placeholder-logo.png",
      },
    },
  ]
}

async function getPosts(): Promise<PostData[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.log("Supabase not configured, showing sample posts")
      return getSamplePosts()
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        created_at,
        is_premium,
        price,
        metrics,
        attachment,
        job_posting,
        profiles:user_id (
          full_name,
          avatar_url,
          title,
          company,
          verified
        ),
        companies:company_id (
          name,
          logo_url
        )
      `)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Database error:", error)
      return getSamplePosts()
    }

    if (!posts || posts.length === 0) {
      console.log("No posts in database, showing sample posts")
      return getSamplePosts()
    }

    return posts as PostData[]
  } catch (error) {
    console.error("Connection error:", error)
    return getSamplePosts()
  }
}

function formatTimeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  return `${Math.floor(diffInSeconds / 86400)}d ago`
}

export default async function NewsfeedPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:24px_24px] opacity-30" />
      <Navbar />
      <main className="container mx-auto px-4 py-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 lg:order-2">
            <TrendingSidebar />
          </div>
          <div className="lg:col-span-2 lg:order-1">
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white/60 backdrop-blur-xl border border-black/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.profiles?.avatar_url || "/placeholder-user.jpg"}
                      alt={post.profiles?.full_name || "User"}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {post.profiles?.full_name || "Anonymous"}
                        </h3>
                        {post.profiles?.verified && (
                          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                        {post.profiles?.title && <span>{post.profiles.title}</span>}
                        {post.profiles?.company && (
                          <>
                            <span>at</span>
                            <span className="font-medium text-blue-600">{post.profiles.company}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{formatTimeAgo(post.created_at)}</span>
                      </div>

                      <div className="prose prose-sm max-w-none mb-4">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                      </div>

                      {post.metrics && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {Object.entries(post.metrics).map(([key, value]) => (
                            <div
                              key={key}
                              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {key}: {value}
                            </div>
                          ))}
                        </div>
                      )}

                      {post.job_posting && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <svg
                              className="w-5 h-5 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8zM16 10h.01M12 10h.01M8 10h.01"
                              />
                            </svg>
                            <span className="font-semibold text-green-800">Job Opening</span>
                          </div>
                          <h4 className="font-medium text-gray-900">{post.job_posting.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>{post.job_posting.location}</span>
                            <span>{post.job_posting.type}</span>
                            {post.job_posting.salary && <span>{post.job_posting.salary}</span>}
                          </div>
                        </div>
                      )}

                      {post.attachment && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-5 h-5 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                              />
                            </svg>
                            <span className="font-medium text-gray-900">{post.attachment.title}</span>
                            {post.attachment.gated && post.is_premium && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                                Premium ${post.price}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
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
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
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
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
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
                        {post.is_premium && (
                          <div className="flex items-center space-x-1 text-yellow-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium">Premium</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12 bg-white/60 backdrop-blur-xl border border-black/5 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-900">No posts yet</h3>
                <p className="text-gray-600 mt-2">Be the first to share something with the community!</p>
              </div>
            )}
          </div>
          <div className="lg:col-span-1 hidden lg:block">
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  )
}
