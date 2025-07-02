import type { Database } from "./database.types"

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Company = Database["public"]["Tables"]["companies"]["Row"]
export type CompanyMetric = Database["public"]["Tables"]["company_metrics"]["Row"]
export type CompanyEmployee = Database["public"]["Tables"]["company_employees"]["Row"]
export type CompanyFollower = Database["public"]["Tables"]["company_followers"]["Row"]
export type CompanyCustomer = Database["public"]["Tables"]["company_customers"]["Row"]

export type PostWithAuthor = {
  id: number
  content: string
  created_at: string
  is_premium: boolean
  price: number | null
  metrics: any | null
  attachment: any | null
  job_posting: any | null
  company_id: string | null
  author: Profile
}

export type CompanyWithDetails = Company & {
  metrics: CompanyMetric[]
  employees: (CompanyEmployee & { profile: Profile })[]
  followers: (CompanyFollower & { profile: Profile })[]
  customers: CompanyCustomer[]
  posts: PostWithAuthor[]
  follower_count: number
}
