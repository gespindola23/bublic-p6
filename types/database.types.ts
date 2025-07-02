export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          user_id: string
          content: string
          created_at: string
          is_premium: boolean
          price: number | null
          metrics: Json | null
          attachment: Json | null
          job_posting: Json | null
          company_id: string | null
        }
        Insert: {
          id?: number
          user_id: string
          content: string
          created_at?: string
          is_premium?: boolean
          price?: number | null
          metrics?: Json | null
          attachment?: Json | null
          job_posting?: Json | null
          company_id?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          content?: string
          created_at?: string
          is_premium?: boolean
          price?: number | null
          metrics?: Json | null
          attachment?: Json | null
          job_posting?: Json | null
          company_id?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          title: string | null
          company: string | null
          verified: boolean | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          title?: string | null
          company?: string | null
          verified?: boolean | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          title?: string | null
          company?: string | null
          verified?: boolean | null
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          description: string | null
          website: string | null
          location: string | null
          founded_year: number | null
          employee_count: string | null
          logo_url: string | null
          cover_url: string | null
          verified: boolean | null
          valuation: number | null
          total_raised: number | null
          funding_status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          website?: string | null
          location?: string | null
          founded_year?: number | null
          employee_count?: string | null
          logo_url?: string | null
          cover_url?: string | null
          verified?: boolean | null
          valuation?: number | null
          total_raised?: number | null
          funding_status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          website?: string | null
          location?: string | null
          founded_year?: number | null
          employee_count?: string | null
          logo_url?: string | null
          cover_url?: string | null
          verified?: boolean | null
          valuation?: number | null
          total_raised?: number | null
          funding_status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      company_metrics: {
        Row: {
          id: string
          company_id: string
          metric_name: string
          metric_value: string
          metric_change: string | null
          is_visible: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          metric_name: string
          metric_value: string
          metric_change?: string | null
          is_visible?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          metric_name?: string
          metric_value?: string
          metric_change?: string | null
          is_visible?: boolean | null
          created_at?: string
        }
      }
      company_employees: {
        Row: {
          id: string
          company_id: string
          user_id: string
          title: string
          is_founder: boolean | null
          joined_at: string
        }
        Insert: {
          id?: string
          company_id: string
          user_id: string
          title: string
          is_founder?: boolean | null
          joined_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          user_id?: string
          title?: string
          is_founder?: boolean | null
          joined_at?: string
        }
      }
      company_followers: {
        Row: {
          id: string
          company_id: string
          user_id: string
          followed_at: string
        }
        Insert: {
          id?: string
          company_id: string
          user_id: string
          followed_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          user_id?: string
          followed_at?: string
        }
      }
      company_customers: {
        Row: {
          id: string
          company_id: string
          customer_name: string
          customer_logo_url: string | null
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          customer_name: string
          customer_logo_url?: string | null
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          customer_name?: string
          customer_logo_url?: string | null
          display_order?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
