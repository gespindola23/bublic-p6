"use client"

import { PostCard } from "@/components/post-card"
import { CreatePostForm } from "@/components/create-post-form"

// Sample data with real profile pictures
const samplePosts = [
  {
    id: 1,
    author: {
      id: "1",
      full_name: "Sarah Chen",
      avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      title: "Founder & CEO",
      company: "TechFlow",
      verified: true,
    },
    content:
      "🚀 Milestone Alert! We just hit $50K MRR after 8 months of building in public. Here's what we learned about product-led growth and why we're doubling down on our community strategy. The key was focusing on user onboarding and reducing time-to-value. #BuildInPublic #SaaS",
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    is_premium: false,
    price: null,
    metrics: { mrr: "$50,000", growth: "+25%", users: "2,500" },
    attachment: null,
    job_posting: null,
    company_id: "1",
  },
  {
    id: 2,
    author: {
      id: "2",
      full_name: "Marcus Rodriguez",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      title: "Co-founder",
      company: "GrowthLabs",
      verified: true,
    },
    content:
      "The hardest part about fundraising isn't the pitch deck - it's maintaining team morale during the process. Here's how we kept our team motivated during our Series A journey. Would love to share our learnings with fellow founders. 🧵 #Fundraising",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    is_premium: true,
    price: 9.99,
    metrics: null,
    attachment: {
      type: "pdf",
      title: "Series A Fundraising Playbook",
      description: "Complete guide with templates, investor list, and pitch deck examples",
      gated: true,
    },
    job_posting: null,
    company_id: "2",
  },
  {
    id: 3,
    author: {
      id: "3",
      full_name: "Emma Thompson",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      title: "Head of Engineering",
      company: "EcoTech",
      verified: false,
    },
    content:
      "🌱 We're hiring! Looking for a Senior Full-Stack Developer to join our mission of making sustainability accessible to everyone. Remote-first company, competitive equity package, and the chance to make a real environmental impact. DM me for details! #Hiring #CleanTech",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    is_premium: false,
    price: null,
    metrics: null,
    attachment: null,
    job_posting: {
      title: "Senior Full-Stack Developer",
      location: "Remote",
      type: "Full-time",
      salary: "$120K-160K",
      equity: "0.1-0.5%",
    },
    company_id: "3",
  },
  {
    id: 4,
    author: {
      id: "4",
      full_name: "Alex Kim",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      title: "Founder",
      company: "DeployFast",
      verified: true,
    },
    content:
      "Just closed our seed round! 🎉 $2M to revolutionize how developers deploy applications. Huge thanks to @TechStars and our angel investors who believed in our vision. Now the real work begins... Time to scale! #Funding #DevTools",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    is_premium: false,
    price: null,
    metrics: { funding: "$2M", stage: "Seed", investors: "8" },
    attachment: null,
    job_posting: null,
    company_id: "4",
  },
  {
    id: 5,
    author: {
      id: "5",
      full_name: "Jordan Lee",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
      title: "Serial Entrepreneur",
      company: "Venture Studio",
      verified: true,
    },
    content:
      "Hot take: Most startups fail not because of product-market fit, but because of founder-market fit. You need to be obsessed with the problem you're solving, not just the solution. What do you think? Have you experienced this? 🤔 #StartupLife",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    is_premium: false,
    price: null,
    metrics: null,
    attachment: null,
    job_posting: null,
    company_id: "5",
  },
  {
    id: 6,
    author: {
      id: "6",
      full_name: "Priya Patel",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face",
      title: "VP of Product",
      company: "TechFlow",
      verified: false,
    },
    content:
      "Product-led growth isn't just about the product - it's about the entire user experience. Here are 5 PLG strategies that helped us grow from 0 to 10K users in 6 months without spending a dollar on ads. Thread below 👇",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    is_premium: false,
    price: null,
    metrics: { users: "10,000", growth: "0-10K in 6mo", cac: "$0" },
    attachment: null,
    job_posting: null,
    company_id: "1",
  },
]

export function Newsfeed() {
  return (
    <div className="space-y-6">
      <CreatePostForm />
      <div className="space-y-6">
        {samplePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
