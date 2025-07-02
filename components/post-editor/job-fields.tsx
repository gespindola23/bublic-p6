"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface JobFieldsProps {
  details: { title: string; location: string; salary: string }
  setDetails: (details: { title: string; location: string; salary: string }) => void
}

export function JobFields({ details, setDetails }: JobFieldsProps) {
  const handleChange = (field: keyof typeof details, value: string) => {
    setDetails({ ...details, [field]: value })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50/80 backdrop-blur-xl rounded-xl border border-blue-100">
      <div>
        <Label htmlFor="job-title" className="text-xs text-blue-800">
          Job Title
        </Label>
        <Input
          id="job-title"
          value={details.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g., Senior Full-Stack Developer"
          className="bg-white/80 border-blue-200 rounded-lg text-sm"
        />
      </div>
      <div>
        <Label htmlFor="job-location" className="text-xs text-blue-800">
          Location
        </Label>
        <Input
          id="job-location"
          value={details.location}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="e.g., Remote or San Francisco, CA"
          className="bg-white/80 border-blue-200 rounded-lg text-sm"
        />
      </div>
      <div>
        <Label htmlFor="job-salary" className="text-xs text-blue-800">
          Salary Range (Optional)
        </Label>
        <Input
          id="job-salary"
          value={details.salary}
          onChange={(e) => handleChange("salary", e.target.value)}
          placeholder="e.g., $120K - $150K"
          className="bg-white/80 border-blue-200 rounded-lg text-sm"
        />
      </div>
    </div>
  )
}
