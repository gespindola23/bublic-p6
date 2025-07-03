"use client"

import { useState, useEffect } from "react"
import { PostCard } from "@/components/post-card"
import { Loader2 } from "lucide-react"

interface Post {
  id: string
  content: string
  created_at: string
  is_premium: boolean
  price: number | null
  metrics: any
  attachment: any
  job_posting: any
  author: {
    id: string
    full_name: string
    avatar_url: string | null
    title: string | null
    company: string | null
    verified: boolean
  }
}

const SAMPLE_POSTS: Post[] = [
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
    author: {
      id: "1",
      full_name: "Sarah Chen",
      avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      title: "Founder & CEO",
      company: "TechFlow",
      verified: true,
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
    author: {
      id: "2",
      full_name: "Marcus Rodriguez",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      title: "Co-founder",
      company: "GrowthLab",
      verified: true,
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
    author: {
      id: "3",
      full_name: "Alex Thompson",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
      title: "CTO",
      company: "FinanceAI",
      verified: false,
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
    author: {
      id: "4",
      full_name: "Emma Wilson",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      title: "Founder",
      company: "StartupOS",
      verified: true,
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
    author: {
      id: "5",
      full_name: "David Park",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      title: "CEO",
      company: "HealthTech",
      verified: true,
    },
  },
]

export function Newsfeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setPosts(SAMPLE_POSTS)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
