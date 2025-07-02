import { TrendingUp, Briefcase, Building2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const trendingTopics = [
  { tag: "#BuildInPublic", posts: 1234 },
  { tag: "#StartupLife", posts: 892 },
  { tag: "#Fundraising", posts: 567 },
  { tag: "#ProductLaunch", posts: 445 },
  { tag: "#RemoteWork", posts: 334 },
]

const featuredCompanies = [
  {
    name: "TechFlow",
    logo: "/placeholder.svg?height=32&width=32",
    growth: "+150%",
    mrr: "$75K",
  },
  {
    name: "DataViz Pro",
    logo: "/placeholder.svg?height=32&width=32",
    growth: "+89%",
    mrr: "$45K",
  },
  {
    name: "GreenTech",
    logo: "/placeholder.svg?height=32&width=32",
    growth: "+67%",
    mrr: "$32K",
  },
]

export function TrendingSidebar() {
  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <Card className="bg-white/70 backdrop-blur-2xl border-black/5 shadow-sm rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center font-semibold text-gray-900">
            <TrendingUp className="w-5 h-5 mr-2 text-gray-700" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center justify-between hover:bg-black/5 p-2 rounded-lg transition-colors cursor-pointer"
            >
              <span className="text-gray-900 font-medium hover:text-black">{topic.tag}</span>
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 rounded">
                {topic.posts}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Featured Companies */}
      <Card className="bg-white/70 backdrop-blur-2xl border-black/5 shadow-sm rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center font-semibold text-gray-900">
            <Building2 className="w-5 h-5 mr-2 text-gray-700" />
            Rising Stars
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {featuredCompanies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-between hover:bg-black/5 p-2 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8 ring-1 ring-black/5">
                  <AvatarImage src={company.logo || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-100 text-gray-700 text-xs font-medium">
                    {company.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm text-gray-900">{company.name}</p>
                  <p className="text-xs text-gray-600">{company.mrr} MRR</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs rounded">{company.growth}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Job Opportunities */}
      <Card className="bg-white/70 backdrop-blur-2xl border-black/5 shadow-sm rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center font-semibold text-gray-900">
            <Briefcase className="w-5 h-5 mr-2 text-gray-700" />
            Hot Jobs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 hover:bg-black/5 p-2 rounded-lg transition-colors cursor-pointer">
            <p className="font-medium text-sm text-gray-900">Senior Developer</p>
            <p className="text-xs text-gray-600">TechFlow • Remote • $120K-150K</p>
          </div>
          <div className="space-y-2 hover:bg-black/5 p-2 rounded-lg transition-colors cursor-pointer">
            <p className="font-medium text-sm text-gray-900">Product Manager</p>
            <p className="text-xs text-gray-600">DataViz Pro • SF • $130K-160K</p>
          </div>
          <div className="space-y-2 hover:bg-black/5 p-2 rounded-lg transition-colors cursor-pointer">
            <p className="font-medium text-sm text-gray-900">Marketing Lead</p>
            <p className="text-xs text-gray-600">GreenTech • NYC • $100K-130K</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
