"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Users, TrendingUp, Calendar, Eye, Heart, UserPlus } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="bg-white/60 backdrop-blur-xl border border-black/5">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 ring-2 ring-white shadow-sm">
              <AvatarImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
                alt="Profile"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-600">Founder & CEO at TechCorp</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  1.2K followers
                </span>
                <span className="flex items-center">
                  <UserPlus className="w-3 h-3 mr-1" />
                  324 following
                </span>
              </div>
            </div>
          </div>
          <Button asChild className="w-full mt-4 bg-transparent" variant="outline">
            <Link href="/profile">View Profile</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Following Companies */}
      <Card className="bg-white/60 backdrop-blur-xl border border-black/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Following
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              name: "TechCorp",
              avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=32&h=32&fit=crop&crop=center",
              description: "AI-powered solutions",
              followers: "12K",
            },
            {
              name: "InnovateLabs",
              avatar: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=32&h=32&fit=crop&crop=center",
              description: "Blockchain technology",
              followers: "8.5K",
            },
            {
              name: "FinTech Solutions",
              avatar: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=32&h=32&fit=crop&crop=center",
              description: "Financial innovation",
              followers: "15K",
            },
          ].map((company, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={company.avatar || "/placeholder.svg"} alt={company.name} />
                <AvatarFallback>{company.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 truncate">{company.name}</p>
                <p className="text-xs text-gray-500 truncate">{company.description}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {company.followers}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Communities */}
      <Card className="bg-white/60 backdrop-blur-xl border border-black/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Communities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "SaaS Founders", members: "2.1K", active: true },
            { name: "AI Builders", members: "1.8K", active: false },
            { name: "E-commerce Hub", members: "3.2K", active: true },
          ].map((community, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${community.active ? "bg-green-500" : "bg-gray-300"}`} />
                <span className="text-sm font-medium text-gray-900">{community.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {community.members}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Stats */}
      <Card className="bg-white/60 backdrop-blur-xl border border-black/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">Profile views</span>
            </div>
            <span className="font-semibold text-blue-600">+127</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-600">Post engagements</span>
            </div>
            <span className="font-semibold text-red-600">+89</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Events joined</span>
            </div>
            <span className="font-semibold text-green-600">3</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
