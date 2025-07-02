import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CompanyFollower, Profile } from "@/types"

interface CompanyFollowersProps {
  followers: (CompanyFollower & { profile: Profile })[]
  followerCount: number
}

export function CompanyFollowers({ followers, followerCount }: CompanyFollowersProps) {
  return (
    <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Followers</CardTitle>
        <p className="text-sm text-gray-600">{followerCount.toLocaleString()} followers</p>
      </CardHeader>
      <CardContent>
        {followers.length > 0 ? (
          <>
            <div className="flex -space-x-2 overflow-hidden">
              {followers.slice(0, 5).map((follower) => (
                <Avatar key={follower.id} className="inline-block h-10 w-10 rounded-full ring-2 ring-white">
                  <AvatarImage src={follower.profile.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback>{follower.profile.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Followed by{" "}
              {followers
                .slice(0, 2)
                .map((f) => f.profile.full_name)
                .join(", ")}
              {followerCount > 2 && `, and ${(followerCount - 2).toLocaleString()} others`}
            </p>
          </>
        ) : (
          <p className="text-gray-600 text-center py-4">No followers yet.</p>
        )}
      </CardContent>
    </Card>
  )
}
