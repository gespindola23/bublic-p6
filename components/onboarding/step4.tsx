"use client"

import { useState } from "react"
import { ArrowLeft, Rocket, BrainCircuit, Palette, Code, DollarSign, Megaphone, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface Step4Props {
  userData: any
  updateUserData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

const topics = [
  { id: "saas", label: "SaaS", icon: Rocket },
  { id: "ai-ml", label: "AI/ML", icon: BrainCircuit },
  { id: "creator-economy", label: "Creator Economy", icon: Palette },
  { id: "dev-tools", label: "Developer Tools", icon: Code },
  { id: "fintech", label: "Fintech", icon: DollarSign },
  { id: "marketing", label: "Marketing & Growth", icon: Megaphone },
  { id: "product", label: "Product Management", icon: Lightbulb },
  { id: "e-commerce", label: "E-commerce", icon: Rocket },
  { id: "fundraising", label: "Fundraising", icon: DollarSign },
]

export function OnboardingStep4({ userData, updateUserData, nextStep, prevStep }: Step4Props) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(userData.topics || [])
  const router = useRouter()

  const handleToggleTopic = (topicId: string) => {
    setSelectedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const handleNext = () => {
    updateUserData({ topics: selectedTopics })
    nextStep()
  }

  const handleFinishOnboarding = () => {
    updateUserData({ topics: selectedTopics })
    nextStep()
  }

  return (
    <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">What topics interest you?</CardTitle>
        <p className="text-gray-600">Select a few topics to personalize your feed.</p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-3">
          {topics.map((topic) => {
            const Icon = topic.icon
            const isSelected = selectedTopics.includes(topic.id)
            return (
              <button
                key={topic.id}
                onClick={() => handleToggleTopic(topic.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                  isSelected
                    ? "bg-black text-white border-black"
                    : "bg-white/50 border-gray-200 hover:bg-white/80 hover:border-gray-300"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-500"}`} />
                <span className="font-medium">{topic.label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex justify-between pt-8">
          <Button variant="ghost" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleFinishOnboarding}
            disabled={selectedTopics.length === 0}
            className="bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
