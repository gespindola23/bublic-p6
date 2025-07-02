import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:24px_24px] opacity-30"></div>

      <Navbar />
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="mb-4">
            <Button asChild variant="ghost" className="hover:bg-black/5 rounded-lg">
              <Link href="/feed">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Feed
              </Link>
            </Button>
          </div>
          <ProfileHeader />
          <ProfileTabs />
        </div>
      </div>
    </div>
  )
}
