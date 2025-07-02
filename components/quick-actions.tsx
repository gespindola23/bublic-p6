"use client"
import { Building2, Users, TrendingUp, Briefcase, BarChart3, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect } from "react"

export function QuickActions() {
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "c":
            e.preventDefault()
            window.location.href = "/company/create"
            break
          case "j":
            e.preventDefault()
            window.location.href = "/jobs/post"
            break
          case "m":
            e.preventDefault()
            window.location.href = "/metrics"
            break
          case "n":
            e.preventDefault()
            window.location.href = "/network"
            break
          case "a":
            e.preventDefault()
            window.location.href = "/analytics"
            break
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="space-y-6">
      {/* Profile Summary */}
      <Card className="bg-white/70 backdrop-blur-2xl border-black/5 shadow-sm rounded-2xl">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xl">JD</span>
          </div>
          <h3 className="font-semibold text-gray-900">John Doe</h3>
          <p className="text-sm text-gray-600 mb-4">Founder & CEO at StartupCo</p>

          {/* Follower Stats */}
          <div className="flex justify-center space-x-6 mb-4 text-sm">
            <div className="text-center">
              <p className="font-semibold text-gray-900">2.4K</p>
              <p className="text-gray-600 text-xs">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">892</p>
              <p className="text-gray-600 text-xs">Following</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">156</p>
              <p className="text-gray-600 text-xs">Posts</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent border-black/10 hover:bg-black/5 rounded-lg"
          >
            <Link href="/profile">View Profile</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/70 backdrop-blur-2xl border-black/5 shadow-sm rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 rounded-lg">
            <Keyboard className="w-3 h-3 mr-1" />⌘ + Key
          </Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="w-full justify-between hover:bg-black/5 rounded-lg" asChild>
            <Link href="/company/create">
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-3" />
                Create Company
              </div>
              <Badge variant="outline" className="text-xs border-black/10 text-gray-600 rounded">
                ⌘C
              </Badge>
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-between hover:bg-black/5 rounded-lg" asChild>
            <Link href="/jobs/post">
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-3" />
                Post Job
              </div>
              <Badge variant="outline" className="text-xs border-black/10 text-gray-600 rounded">
                ⌘J
              </Badge>
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-between hover:bg-black/5 rounded-lg" asChild>
            <Link href="/metrics">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-3" />
                Update Metrics
              </div>
              <Badge variant="outline" className="text-xs border-black/10 text-gray-600 rounded">
                ⌘M
              </Badge>
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-between hover:bg-black/5 rounded-lg" asChild>
            <Link href="/analytics">
              <div className="flex items-center">
                <BarChart3 className="w-4 h-4 mr-3" />
                Content Analytics
              </div>
              <Badge variant="outline" className="text-xs border-black/10 text-gray-600 rounded">
                ⌘A
              </Badge>
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-between hover:bg-black/5 rounded-lg" asChild>
            <Link href="/network">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-3" />
                Find Founders
              </div>
              <Badge variant="outline" className="text-xs border-black/10 text-gray-600 rounded">
                ⌘N
              </Badge>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
