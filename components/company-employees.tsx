import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CompanyEmployee, Profile } from "@/types"

interface CompanyEmployeesProps {
  employees: (CompanyEmployee & { profile: Profile })[]
}

export function CompanyEmployees({ employees }: CompanyEmployeesProps) {
  if (employees.length === 0) {
    return (
      <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Team</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center py-8">No team members listed yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/60 backdrop-blur-xl border-white/20 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Team</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {employees.slice(0, 5).map((employee) => (
          <div key={employee.id} className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={employee.profile.avatar_url || "/placeholder.svg"} />
              <AvatarFallback>{employee.profile.full_name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm text-gray-900">{employee.profile.full_name || "Unknown"}</p>
              <p className="text-xs text-gray-600">{employee.title}</p>
            </div>
          </div>
        ))}
        {employees.length > 5 && (
          <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 mt-2">
            View all {employees.length} employees
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
