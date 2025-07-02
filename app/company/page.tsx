import { CompanyHeader } from "@/components/company-header"
import { CompanyMetrics } from "@/components/company-metrics"
import { CompanyJobs } from "@/components/company-jobs"
import { Navbar } from "@/components/navbar"
import { CompanyPosts } from "@/components/company-posts"
import { CompanyEmployees } from "@/components/company-employees"
import { CompanyFollowers } from "@/components/company-followers"
import { Card, CardContent } from "@/components/ui/card"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { CompanyWithDetails } from "@/types"
import Image from "next/image"

function TrustedBy({ customers }: { customers: any[] }) {
  if (!customers || customers.length === 0) {
    return null
  }

  return (
    <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h3 className="text-sm font-semibold text-gray-600 text-center mb-4">TRUSTED BY THE WORLD'S BEST TEAMS</h3>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {customers.map((customer) => (
            <Image
              key={customer.id}
              src={customer.customer_logo_url || `/customer-logos/${customer.customer_name.toLowerCase()}.svg`}
              alt={`${customer.customer_name} logo`}
              width={100}
              height={24}
              className="h-6 w-auto opacity-60"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

async function getCompanyData(): Promise<CompanyWithDetails | null> {
  const supabase = createSupabaseServerClient()

  // Get the first company (Resend in our case)
  const { data: company, error: companyError } = await supabase.from("companies").select("*").limit(1).single()

  if (companyError || !company) {
    console.error("Error fetching company:", companyError)
    return null
  }

  // Get company metrics
  const { data: metrics } = await supabase.from("company_metrics").select("*").eq("company_id", company.id)

  // Get company employees with profiles
  const { data: employees } = await supabase
    .from("company_employees")
    .select(`
      *,
      profile:profiles(*)
    `)
    .eq("company_id", company.id)

  // Get company followers with profiles
  const { data: followers } = await supabase
    .from("company_followers")
    .select(`
      *,
      profile:profiles(*)
    `)
    .eq("company_id", company.id)

  // Get follower count
  const { count: followerCount } = await supabase
    .from("company_followers")
    .select("*", { count: "exact", head: true })
    .eq("company_id", company.id)

  // Get company customers
  const { data: customers } = await supabase
    .from("company_customers")
    .select("*")
    .eq("company_id", company.id)
    .order("display_order")

  // Get company posts
  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      author:profiles(*)
    `)
    .eq("company_id", company.id)
    .order("created_at", { ascending: false })

  return {
    ...company,
    metrics: metrics || [],
    employees: employees || [],
    followers: followers || [],
    customers: customers || [],
    posts: posts || [],
    follower_count: followerCount || 0,
  }
}

export default async function CompanyPage() {
  const companyData = await getCompanyData()

  if (!companyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Company Not Found</h1>
            <p className="text-gray-600">Please run the migration script to seed company data.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <CompanyHeader company={companyData} />
            <TrustedBy customers={companyData.customers} />
            <CompanyPosts posts={companyData.posts} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <CompanyMetrics metrics={companyData.metrics} />
            <CompanyFollowers followers={companyData.followers} followerCount={companyData.follower_count} />
            <CompanyEmployees employees={companyData.employees} />
            <CompanyJobs />
          </div>
        </div>
      </div>
    </div>
  )
}
