"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Award, FileText, Verified } from "lucide-react"

const tabs = [
  { id: "posts", label: "Posts", count: 156 },
  { id: "experience", label: "Experience", count: 4 },
  { id: "companies", label: "Companies", count: 2 },
  { id: "achievements", label: "Achievements", count: 8 },
]

const mockExperience = [
  {
    id: 1,
    company: "StartupCo",
    position: "Founder & CEO",
    duration: "2022 - Present",
    verified: true,
    description: "Building workflow automation tools for modern teams. Raised $2M seed round.",
  },
  {
    id: 2,
    company: "TechFlow Inc",
    position: "Co-founder & CTO",
    duration: "2019 - 2022",
    verified: true,
    description: "Built and scaled engineering team from 2 to 25 people. Successful exit to Microsoft.",
  },
  {
    id: 3,
    company: "Google",
    position: "Senior Software Engineer",
    duration: "2017 - 2019",
    verified: true,
    description: "Worked on Google Cloud infrastructure and developer tools.",
  },
]

const mockCompanies = [
  {
    id: 1,
    name: "StartupCo",
    role: "Founder & CEO",
    status: "Active",
    founded: "2022",
    employees: "15",
    funding: "$2M Seed",
  },
  {
    id: 2,
    name: "TechFlow Inc",
    role: "Co-founder & CTO",
    status: "Exited",
    founded: "2019",
    employees: "25",
    funding: "Acquired by Microsoft",
  },
]

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <Card className="bg-white/70 backdrop-blur-2xl border-black/5 shadow-sm rounded-2xl">
      <CardContent className="p-0">
        {/* Tab Navigation - Mobile Optimized */}
        <div className="border-b border-black/5 overflow-x-auto">
          <div className="flex min-w-max px-4 sm:px-6">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                className={`py-4 px-3 sm:px-4 rounded-none border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-black text-black"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="text-sm sm:text-base">{tab.label}</span>
                <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-700 text-xs">
                  {tab.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === "posts" && (
            <div className="text-center py-8 sm:py-12">
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600 text-sm sm:text-base">Start sharing your startup journey!</p>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-4 sm:space-y-6">
              {mockExperience.map((exp) => (
                <div key={exp.id} className="p-4 bg-gray-50/80 backdrop-blur-xl rounded-xl border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                    <div className="flex items-center sm:items-start gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-900 to-gray-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{exp.position}</h3>
                          {exp.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs w-fit">
                              <Verified className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base font-medium">{exp.company}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mb-2">{exp.duration}</p>
                        <p className="text-gray-700 text-sm sm:text-base">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "companies" && (
            <div className="space-y-4 sm:space-y-6">
              {mockCompanies.map((company) => (
                <div key={company.id} className="p-4 bg-gray-50/80 backdrop-blur-xl rounded-xl border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                    <div className="flex items-center sm:items-start gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-900 to-gray-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{company.name}</h3>
                          <Badge
                            className={`text-xs w-fit ${
                              company.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {company.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base font-medium">{company.role}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mb-3">Founded {company.founded}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                          <div className="flex justify-between sm:block">
                            <span className="text-gray-600">Employees:</span>
                            <span className="ml-2 sm:ml-0 font-medium">{company.employees}</span>
                          </div>
                          <div className="flex justify-between sm:block">
                            <span className="text-gray-600">Funding:</span>
                            <span className="ml-2 sm:ml-0 font-medium">{company.funding}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="text-center py-8 sm:py-12">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No achievements yet</h3>
              <p className="text-gray-600 text-sm sm:text-base">Your milestones will appear here!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
