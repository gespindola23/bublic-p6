"use client"

import { useState } from "react"
import { Mail, Zap, Users, Smile, Eye, EyeOff, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { CompanyMetric } from "@/types"

interface CompanyMetricsProps {
  metrics: CompanyMetric[]
}

const getMetricIcon = (metricName: string) => {
  if (metricName.toLowerCase().includes("email")) return Mail
  if (metricName.toLowerCase().includes("uptime")) return Zap
  if (metricName.toLowerCase().includes("signup") || metricName.toLowerCase().includes("user")) return Users
  if (metricName.toLowerCase().includes("satisfaction")) return Smile
  return Users
}

export function CompanyMetrics({ metrics }: CompanyMetricsProps) {
  const [metricsState, setMetricsState] = useState(
    metrics.map((metric) => ({
      ...metric,
      visible: metric.is_visible ?? true,
    })),
  )

  const toggleMetricVisibility = (id: string) => {
    setMetricsState((prev) =>
      prev.map((metric) => (metric.id === id ? { ...metric, visible: !metric.visible } : metric)),
    )
  }

  if (metrics.length === 0) {
    return (
      <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Company Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center py-8">No metrics available yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Company Metrics</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-white/90 backdrop-blur-xl border-white/20">
            <div className="p-3">
              <h4 className="font-medium mb-3">Metric Visibility</h4>
              {metricsState.map((metric) => (
                <div key={metric.id} className="flex items-center justify-between py-2">
                  <Label htmlFor={metric.id} className="text-sm">
                    {metric.metric_name}
                  </Label>
                  <Switch
                    id={metric.id}
                    checked={metric.visible}
                    onCheckedChange={() => toggleMetricVisibility(metric.id)}
                  />
                </div>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Advanced Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metricsState.map((metric) => {
            const Icon = getMetricIcon(metric.metric_name)
            return (
              <div
                key={metric.id}
                className={`p-4 rounded-lg border transition-all ${
                  metric.visible ? "bg-gray-50/80 border-gray-200/50" : "bg-gray-50/80 border-gray-200/50 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-5 h-5 ${metric.visible ? "text-gray-700" : "text-gray-400"}`} />
                    <span className="text-sm font-medium text-gray-700">{metric.metric_name}</span>
                  </div>
                  {metric.visible ? (
                    <Eye className="w-4 h-4 text-green-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                <div className="space-y-1">
                  <p className={`text-2xl font-bold ${metric.visible ? "text-gray-900" : "text-gray-400"}`}>
                    {metric.visible ? metric.metric_value : "Hidden"}
                  </p>
                  {metric.visible && metric.metric_change && (
                    <p className="text-sm text-gray-600">{metric.metric_change}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Integration Status */}
        <div className="mt-6 p-4 bg-blue-50/80 rounded-lg border border-blue-200/50">
          <h4 className="font-medium text-blue-900 mb-3">Connected Integrations</h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2 px-3 py-1 bg-white/80 rounded-full border border-blue-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-blue-800">Stripe</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
