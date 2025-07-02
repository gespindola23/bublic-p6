import { Navbar } from "@/components/navbar"
import { ContentAnalytics } from "@/components/content-analytics"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <ContentAnalytics />
      </div>
    </div>
  )
}
