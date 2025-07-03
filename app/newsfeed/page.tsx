import { createClient } from "@supabase/supabase-js"
import { Navbar } from "@/components/navbar"
import { Newsfeed } from "@/components/newsfeed"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { QuickActions } from "@/components/quick-actions"

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

export default function NewsfeedPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            <Newsfeed />
          </div>

          {/* Trending Sidebar */}
          <div className="lg:col-span-1">
            <TrendingSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
