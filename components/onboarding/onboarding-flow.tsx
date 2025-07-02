"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { OnboardingStep1 } from "@/components/onboarding/step1"
import { OnboardingStep2 } from "@/components/onboarding/step2"
import { OnboardingStep3 } from "@/components/onboarding/step3"
import { OnboardingStep4 } from "@/components/onboarding/step4"
import { OnboardingStep5 } from "@/components/onboarding/step5"
import { OnboardingStep6 } from "@/components/onboarding/step6"

export function OnboardingFlow() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState({
    userType: "",
    goals: [],
    profilePicture: "",
    name: "",
    currentCompany: "",
    position: "",
    topics: [],
    wantsToCreateCompany: false,
  })

  useEffect(() => {
    const firstName = searchParams.get("firstName") || ""
    const lastName = searchParams.get("lastName") || ""
    if (firstName || lastName) {
      setUserData((prev) => ({ ...prev, name: `${firstName} ${lastName}`.trim() }))
    }
  }, [searchParams])

  const nextStep = () => {
    if (currentStep === 4 && userData.userType !== "founder") {
      setCurrentStep((prev) => prev + 2)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }
  const prevStep = () => {
    if (currentStep === 6 && userData.userType !== "founder") {
      setCurrentStep((prev) => prev - 2)
    } else {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const updateUserData = (data: Partial<typeof userData>) => {
    setUserData((prev) => ({ ...prev, ...data }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingStep1 updateUserData={updateUserData} nextStep={nextStep} />
      case 2:
        return (
          <OnboardingStep2
            userData={userData}
            updateUserData={updateUserData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 3:
        return (
          <OnboardingStep3
            userData={userData}
            updateUserData={updateUserData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 4:
        return (
          <OnboardingStep4
            userData={userData}
            updateUserData={updateUserData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 5:
        return <OnboardingStep5 updateUserData={updateUserData} nextStep={nextStep} prevStep={prevStep} />
      case 6:
        return <OnboardingStep6 userData={userData} prevStep={prevStep} />
      default:
        return <OnboardingStep1 updateUserData={updateUserData} nextStep={nextStep} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">{renderStep()}</div>
    </div>
  )
}
