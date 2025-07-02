"use client"

import { Target, Network, Rocket, Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

interface Step2Props {
  userData: any
  updateUserData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

const goals = {
  founder: [
    { id: "build-public", label: "Build in public and share my journey", icon: Rocket },
    { id: "find-investors", label: "Connect with potential investors", icon: Target },
    { id: "hire-talent", label: "Find and hire talented people", icon: Users },
    { id: "learn-founders", label: "Learn from other founders", icon: Network },
  ],
  investor: [
    { id: "find-startups", label: "Discover promising startups", icon: Target },
    { id: "track-portfolio", label: "Track portfolio companies", icon: Rocket },
    { id: "network-founders", label: "Network with founders", icon: Network },
    { id: "share-insights", label: "Share investment insights", icon: Users },
  ],
  employee: [
    { id: "find-jobs", label: "Find startup job opportunities", icon: Target },
    { id: "network-professionals", label: "Network with professionals", icon: Network },
    { id: "learn-industry", label: "Learn about the startup industry", icon: Rocket },
    { id: "career-growth", label: "Advance my career", icon: Users },
  ],
  community: [
    { id: "follow-startups", label: "Follow interesting startups", icon: Target },
    { id: "learn-ecosystem", label: "Learn about the startup ecosystem", icon: Rocket },
    { id: "network-community", label: "Connect with like-minded people", icon: Network },
    { id: "stay-updated", label: "Stay updated on startup news", icon: Users },
  ],
}

export function OnboardingStep2({ userData, updateUserData, nextStep, prevStep }: Step2Props) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(userData.goals || [])
  const userGoals = goals[userData.userType as keyof typeof goals] || goals.founder

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((prev) => (prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]))
  }

  const handleNext = () => {
    updateUserData({ goals: selectedGoals })
    nextStep()
  }

  return (
    <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">What are your main goals?</CardTitle>
        <p className="text-gray-600">Select all that apply to personalize your experience</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {userGoals.map((goal) => {
          const Icon = goal.icon
          return (
            <div
              key={goal.id}
              className={`flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-all ${
                selectedGoals.includes(goal.id)
                  ? "bg-blue-50/80 border-blue-300"
                  : "bg-white/50 border-gray-200 hover:bg-white/80"
              }`}
              onClick={() => handleGoalToggle(goal.id)}
            >
              <Checkbox checked={selectedGoals.includes(goal.id)} onChange={() => handleGoalToggle(goal.id)} />
              <Icon className={`w-5 h-5 ${selectedGoals.includes(goal.id) ? "text-blue-600" : "text-gray-500"}`} />
              <span className="flex-1 text-gray-900">{goal.label}</span>
            </div>
          )
        })}

        <div className="flex justify-between pt-6">
          <Button variant="ghost" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedGoals.length === 0}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
