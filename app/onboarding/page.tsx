"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { OnboardingStep1 } from "@/components/onboarding/step1"
import { OnboardingStep2 } from "@/components/onboarding/step2"
import { OnboardingStep3 } from "@/components/onboarding/step3"
import { OnboardingStep4 } from "@/components/onboarding/step4"
import { OnboardingStep5 } from "@/components/onboarding/step5"
import { OnboardingStep6 } from "@/components/onboarding/step6"

function OnboardingComponent() {
  const searchParams = useSearchParams()

  // --- lazy initialisation prevents re-runs ---
  const [userData, setUserData] = useState(() => {
    const firstName = searchParams.get("firstName") ?? ""
    const lastName = searchParams.get("lastName") ?? ""
    return {
      userType: "",
      goals: [],
      profilePicture: "",
      name: `${firstName} ${lastName}`.trim(),
      currentCompany: "",
      position: "",
      topics: [],
      wantsToCreateCompany: false,
    }
  })

  const [currentStep, setCurrentStep] = useState(1)

  const nextStep = () => {
    if (currentStep === 4 && userData.userType !== "founder") {
      setCurrentStep(6) // Skip to final step
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep === 6 && userData.userType !== "founder") {
      setCurrentStep(4) // Go back to topics
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">{renderStep()}</div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingComponent />
    </Suspense>
  )
}
