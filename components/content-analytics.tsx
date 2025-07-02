import { Eye, Heart, MessageCircle, DollarSign, Users, FileText, TrendingUp, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const analyticsData = {
  overview: {
    totalViews: 12450,
    totalLikes: 892,
    totalComments: 234,
    totalRevenue: 2340,
    followers: 2400,
    engagement: 7.2,
  },
  posts: [
    {
      id: 1,
      title: "How we reached $50K MRR in 8 months",
      type: "premium",
      views: 3200,
      likes: 245,
      comments: 67,
      revenue: 1200,
      leads: 45,
      publishedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Series A Fundraising Playbook",
      type: "pdf",
      views: 2100,
      likes: 156,
      comments: 23,
      revenue: 0,
      leads: 89,
      publishedAt: "1 week ago",
    },
    {
      id: 3,
      title: "Building a remote-first culture",
      type: "free",
      views: 1800,
      likes: 134,
      comments: 45,
      revenue: 0,
      leads: 0,
      publishedAt: "3 days ago",
    },
  ],
  topPerformers: [
    { metric: "Most Viewed", post: "How we reached $50K MRR", value: "3.2K views" },
    { metric: "Highest Revenue", post: "Fundraising Playbook", value: "$1,200" },
    { metric: "Most Engagement", post: "Remote-first culture", value: "7.8% rate" },
  ],
}

export function ContentAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Analytics</h1>
          <p className="text-gray-600">Track your content performance and audience engagement</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalViews.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${analyticsData.overview.totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">+28% from last month</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.engagement}%</p>
                <p className="text-sm text-green-600">+2.1% from last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Likes</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalLikes.toLocaleString()}</p>
                <p className="text-sm text-green-600">+18% from last month</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Comments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.overview.totalComments.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Followers</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.followers.toLocaleString()}</p>
                <p className="text-sm text-green-600">+156 this month</p>
              </div>
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analyticsData.topPerformers.map((performer, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200/50"
              >
                <p className="text-sm font-medium text-blue-800">{performer.metric}</p>
                <p className="text-lg font-bold text-gray-900">{performer.post}</p>
                <p className="text-sm text-gray-600">{performer.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Post Performance */}
      <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle>Post Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.posts.map((post) => (
              <div key={post.id} className="p-4 bg-white/50 rounded-lg border border-gray-200/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{post.title}</h3>
                      <Badge
                        variant={post.type === "premium" ? "default" : post.type === "pdf" ? "secondary" : "outline"}
                        className={
                          post.type === "premium" ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : ""
                        }
                      >
                        {post.type === "premium" && <DollarSign className="w-3 h-3 mr-1" />}
                        {post.type === "pdf" && <FileText className="w-3 h-3 mr-1" />}
                        {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{post.publishedAt}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{post.views.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{post.likes}</p>
                    <p className="text-xs text-gray-600">Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{post.comments}</p>
                    <p className="text-xs text-gray-600">Comments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {post.revenue > 0 ? `$${post.revenue}` : post.leads > 0 ? post.leads : "-"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {post.revenue > 0 ? "Revenue" : post.leads > 0 ? "Leads" : "N/A"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {(((post.likes + post.comments) / post.views) * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-600">Engagement</p>
                  </div>
                </div>

                {/* Engagement Progress */}
                <div className="mt-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Engagement Rate</span>
                    <span>{(((post.likes + post.comments) / post.views) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={((post.likes + post.comments) / post.views) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
