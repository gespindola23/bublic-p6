"use client"

import Image from "next/image"
import { Users, TrendingUp, Briefcase, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Step1Props {
  userData: any
  updateUserData: (data: any) => void
  nextStep: () => void
}

const userTypes = [
  {
    id: "founder",
    title: "Founder",
    description: "I'm building or have built a startup",
    icon: TrendingUp,
    color: "from-gray-900 to-gray-600",
  },
  {
    id: "investor",
    title: "Investor",
    description: "I invest in startups and founders",
    icon: DollarSign,
    color: "from-gray-800 to-gray-500",
  },
  {
    id: "employee",
    title: "Startup Employee",
    description: "I work at a startup or want to join one",
    icon: Briefcase,
    color: "from-gray-700 to-gray-400",
  },
  {
    id: "community",
    title: "Community Member",
    description: "I'm interested in the startup ecosystem",
    icon: Users,
    color: "from-gray-600 to-gray-300",
  },
]

export function OnboardingStep1({ userData, updateUserData, nextStep }: Step1Props) {
  const handleUserTypeSelect = (userType: string) => {
    updateUserData({ userType })
    nextStep()
  }

  return (
    <Card className="bg-white/80 backdrop-blur-2xl border-black/5 shadow-xl rounded-2xl">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto mb-4 flex items-center justify-center">
          <Image src="/logo.png" alt="BUBLIC Logo" width={150} height={50} />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Welcome to the future</CardTitle>
        <p className="text-gray-600">Let's get to know you better. What best describes you?</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {userTypes.map((type) => {
          const Icon = type.icon
          return (
            <Button
              key={type.id}
              variant="ghost"
              className="w-full h-auto p-6 justify-start hover:bg-black/5 transition-all duration-300 rounded-xl"
              onClick={() => handleUserTypeSelect(type.id)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center shadow-sm`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{type.title}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
