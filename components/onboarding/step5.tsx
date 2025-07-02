"use client"

import { ArrowLeft, Building2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Step5Props {
  updateUserData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

export function OnboardingStep5({ updateUserData, nextStep, prevStep }: Step5Props) {
  const handleSelection = (wantsToCreate: boolean) => {
    updateUserData({ wantsToCreateCompany: wantsToCreate })
    nextStep()
  }

  return (
    <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Ready to put your startup on the map?</CardTitle>
        <p className="text-gray-600">Create a company page to start sharing your metrics and build in public.</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button
          size="lg"
          onClick={() => handleSelection(true)}
          className="w-full bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-lg py-6"
        >
          <Sparkles className="w-5 h-5 mr-3" />
          Yes, let's create a company page
        </Button>
        <Button size="lg" variant="ghost" onClick={() => handleSelection(false)} className="w-full rounded-lg py-6">
          Maybe later, take me to the feed
        </Button>

        <div className="flex justify-start pt-6">
          <Button variant="ghost" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
