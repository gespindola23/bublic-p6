"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MilestoneFieldsProps {
  details: { metric: string; value: string; change: string }
  setDetails: (details: { metric: string; value: string; change: string }) => void
}

export function MilestoneFields({ details, setDetails }: MilestoneFieldsProps) {
  const handleChange = (field: keyof typeof details, value: string) => {
    setDetails({ ...details, [field]: value })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-green-50/80 backdrop-blur-xl rounded-xl border border-green-100">
      <div>
        <Label htmlFor="milestone-metric" className="text-xs text-green-800">
          Metric
        </Label>
        <Input
          id="milestone-metric"
          value={details.metric}
          onChange={(e) => handleChange("metric", e.target.value)}
          placeholder="e.g., Monthly Recurring Revenue"
          className="bg-white/80 border-green-200 rounded-lg text-sm"
        />
      </div>
      <div>
        <Label htmlFor="milestone-value" className="text-xs text-green-800">
          Value
        </Label>
        <Input
          id="milestone-value"
          value={details.value}
          onChange={(e) => handleChange("value", e.target.value)}
          placeholder="e.g., $50,000"
          className="bg-white/80 border-green-200 rounded-lg text-sm"
        />
      </div>
      <div>
        <Label htmlFor="milestone-change" className="text-xs text-green-800">
          Change (Optional)
        </Label>
        <Input
          id="milestone-change"
          value={details.change}
          onChange={(e) => handleChange("change", e.target.value)}
          placeholder="e.g., +25% from last month"
          className="bg-white/80 border-green-200 rounded-lg text-sm"
        />
      </div>
    </div>
  )
}
