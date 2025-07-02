import { MapPin, Calendar, Globe, Edit, Settings, Verified, Users, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileHeader() {
  return (
    <Card className="bg-white/70 backdrop-blur-2xl border-black/5 shadow-sm rounded-2xl overflow-hidden">
      {/* Cover Image */}
      <div className="h-36 sm:h-48 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Cover
        </Button>
      </div>

      <CardContent className="p-4 sm:p-6">
        {/* Avatar */}
        <div className="relative -mt-16 sm:-mt-20">
          <Avatar className="w-24 h-24 sm:w-28 sm:h-28 ring-4 ring-white shadow-lg">
            <AvatarImage src="/placeholder.svg?height=112&width=112" />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 text-white">
              JD
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Info and Actions */}
        <div className="mt-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            {/* Main Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">John Doe</h1>
                <Verified className="w-6 h-6 text-blue-500 fill-current" />
                <Badge className="bg-blue-100 text-blue-800 rounded-lg">Founder</Badge>
              </div>
              <p className="text-lg text-gray-600">Founder & CEO at StartupCo</p>
              <p className="text-gray-600 max-w-2xl">
                Building the future of workflow automation. Previously founded 2 companies, 1 exit. Passionate about
                helping other founders succeed.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex-1 md:flex-none border-black/10 hover:bg-black/5 rounded-lg bg-transparent"
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button className="flex-1 md:flex-none bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-lg">
                <Users className="w-4 h-4 mr-2" />
                Follow
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 pt-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1.5" />
              San Francisco, CA
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1.5" />
              johndoe.com
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              Joined March 2024
            </div>
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-1.5" />
              StartupCo
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-6">
          <div className="p-4 bg-gray-50/80 backdrop-blur-xl rounded-xl border border-gray-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">2.4K</p>
                <p className="text-xs sm:text-sm text-gray-600">Followers</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">892</p>
                <p className="text-xs sm:text-sm text-gray-600">Following</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">156</p>
                <p className="text-xs sm:text-sm text-gray-600">Posts</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">$2.3K</p>
                <p className="text-xs sm:text-sm text-gray-600">Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
