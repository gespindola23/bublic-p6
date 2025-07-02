"use client"

import { CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface OnboardingStep6Props {
  userData: {
    name: string
    userType: string
    currentCompany?: string
    position?: string
    goals: string[]
    wantsToCreateCompany: boolean
    topics: string[]
  }
  prevStep: () => void
}

export function OnboardingStep6({ userData, prevStep }: OnboardingStep6Props) {
  const router = useRouter()

  const handleFinish = () => {
    // Always redirect to the feed after onboarding is complete
    router.push("/newsfeed")
  }

  return (
    <Card className="bg-background/80 backdrop-blur-2xl border-border shadow-2xl rounded-2xl">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">You're All Set!</CardTitle>
        <p className="text-muted-foreground">Your profile is ready. Welcome to BUBLIC.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-secondary border">
          <h3 className="font-semibold text-foreground mb-3">Your Profile Summary</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Name:</span> {userData.name || "—"}
            </li>
            <li>
              <span className="font-medium text-foreground">Role:</span> {userData.userType}
            </li>
            <li>
              <span className="font-medium text-foreground">Goals:</span> {userData.goals.length} selected
            </li>
            <li>
              <span className="font-medium text-foreground">Topics:</span> {userData.topics.length} followed
            </li>
          </ul>
        </div>
        <div className="flex justify-between pt-6">
          <Button variant="ghost" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button
            onClick={handleFinish}
            className="bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-lg"
          >
            Complete My Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
