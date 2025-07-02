import { MapPin, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const jobs = [
  {
    title: "Senior Product Designer",
    location: "Remote",
    type: "Full-time",
    salary: "$140K - $180K",
    equity: "0.1% - 0.3%",
  },
  {
    title: "Founding Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$150K - $200K",
    equity: "0.5% - 1.0%",
  },
]

export function CompanyJobs() {
  return (
    <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Open Positions</CardTitle>
        <Button variant="outline" size="sm" className="bg-white/50">
          Post Job
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {jobs.map((job, index) => (
          <div key={index} className="p-4 bg-gray-50/80 rounded-lg border border-gray-200/50">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {job.location}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {job.type}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-green-700">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {job.salary}
                  </div>
                  <div className="text-blue-700">{job.equity} equity</div>
                </div>
              </div>

              <Button size="sm" className="w-full bg-black text-white hover:bg-black/80">
                Apply Now
              </Button>
            </div>
          </div>
        ))}

        <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700">
          View All Positions
        </Button>
      </CardContent>
    </Card>
  )
}
