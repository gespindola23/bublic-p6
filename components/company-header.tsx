import { MapPin, Globe, Calendar, Users, Edit, Verified } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { CompanyWithDetails } from "@/types"
import Image from "next/image"

interface CompanyHeaderProps {
  company: CompanyWithDetails
}

export function CompanyHeader({ company }: CompanyHeaderProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(0)}M`
    }
    return `$${amount.toLocaleString()}`
  }

  return (
    <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg overflow-visible rounded-2xl">
      {/* Cover Image */}
      <div className="h-48 relative rounded-t-2xl">
        <Image
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=200&fit=crop"
          alt={`${company.name} cover image`}
          fill
          className="object-cover rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-black/20 rounded-t-2xl"></div>
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border-white/30"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Cover
        </Button>
      </div>

      <CardContent className="p-6">
        {/* Logo and Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Logo */}
          <div className="-mt-24 flex-shrink-0">
            <div className="w-28 h-28 rounded-2xl bg-white p-2 ring-4 ring-white shadow-lg flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=96&h=96&fit=crop"
                alt={`${company.name} Logo`}
                width={96}
                height={96}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Info and Actions */}
          <div className="flex-1 md:ml-6 mt-4 md:mt-0">
            <div className="flex flex-col sm:flex-row justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                  {company.verified && <Verified className="w-6 h-6 text-blue-500 fill-current" />}
                  <Badge className="bg-blue-100 text-blue-800">Backed by Y Combinator</Badge>
                </div>
                <p className="text-gray-600 max-w-2xl">{company.description}</p>
              </div>
              <div className="flex space-x-3 mt-4 sm:mt-0 w-full sm:w-auto">
                <Button variant="outline" className="bg-gray-100/80 flex-1 sm:flex-none">
                  Follow
                </Button>
                <Button className="bg-black text-white hover:bg-black/80 flex-1 sm:flex-none">Connect</Button>
              </div>
            </div>

            {/* Company Info */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 mt-4">
              {company.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {company.location}
                </div>
              )}
              {company.website && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1.5" />
                  {company.website}
                </div>
              )}
              {company.founded_year && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  Founded {company.founded_year}
                </div>
              )}
              {company.employee_count && (
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1.5" />
                  {company.employee_count} employees
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Funding Info */}
        <div className="mt-6 p-4 bg-gray-50/80 rounded-lg border border-gray-200/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Current Valuation</p>
              <p className="text-xl font-bold text-gray-800">
                {company.valuation ? formatCurrency(company.valuation) : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Raised</p>
              <p className="text-xl font-bold text-gray-800">
                {company.total_raised ? formatCurrency(company.total_raised) : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Funding Status</p>
              <Badge className="bg-green-100 text-green-800">{company.funding_status || "N/A"}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
