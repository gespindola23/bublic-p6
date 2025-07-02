"use client"

import { ArrowLeft, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"

interface Step3Props {
  userData: any
  updateUserData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

export function OnboardingStep3({ userData, updateUserData, nextStep, prevStep }: Step3Props) {
  const [formData, setFormData] = useState({
    name: userData.name || "",
    currentCompany: userData.currentCompany || "",
    position: userData.position || "",
  })

  useEffect(() => {
    // Pre-populate form if userData.name changes (from previous step)
    setFormData((prev) => ({ ...prev, name: userData.name || "" }))
  }, [userData.name])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    updateUserData(formData)
    nextStep()
  }

  return (
    <Card className="bg-background/80 backdrop-blur-2xl border-border shadow-2xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Tell us about yourself</CardTitle>
        <p className="text-muted-foreground">Help others discover and connect with you</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="relative inline-block">
            <Avatar className="w-24 h-24 ring-4 ring-white/10">
              <AvatarImage src={userData.profilePicture || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">
                {formData.name
                  ? formData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 bg-bublic-primary text-bublic-primary-foreground"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Upload your profile picture</p>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="company">Current Company</Label>
            <Input
              id="company"
              value={formData.currentCompany}
              onChange={(e) => handleInputChange("currentCompany", e.target.value)}
              placeholder="Where do you currently work?"
            />
          </div>
          <div>
            <Label htmlFor="position">Position/Title</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              placeholder="Your current role"
            />
          </div>
        </div>
        <div className="flex justify-between pt-6">
          <Button variant="ghost" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!formData.name}
            className="bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
