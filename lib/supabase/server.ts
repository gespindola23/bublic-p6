import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

export const createSupabaseServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase environment variables not found. Some features may not work.")
    // Return a mock client that won't crash the app
    return {
      from: () => ({
        select: () => ({
          order: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        }),
      }),
    } as any
  }

  return createClient<Database>(supabaseUrl, supabaseKey)
}
