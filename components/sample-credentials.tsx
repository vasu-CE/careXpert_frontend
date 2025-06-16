import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Stethoscope, Shield } from "lucide-react"

export function SampleCredentials() {
  const credentials = [
    {
      role: "Patient",
      email: "patient@test.com",
      password: "patient123",
      icon: User,
      color: "blue",
      description: "Access patient dashboard, book appointments, view prescriptions",
    },
    {
      role: "Doctor",
      email: "doctor@test.com",
      password: "doctor123",
      icon: Stethoscope,
      color: "green",
      description: "Manage appointments, update availability, prescribe medications",
    },
    {
      role: "Admin",
      email: "admin@test.com",
      password: "admin123",
      icon: Shield,
      color: "red",
      description: "Full platform access, manage users, approve doctor requests",
    },
  ]

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Sample Test Credentials</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {credentials.map((cred) => (
            <div key={cred.role} className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <cred.icon className={`h-5 w-5 text-${cred.color}-600`} />
                <Badge variant="outline">{cred.role}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Email:</strong> {cred.email}
                </div>
                <div>
                  <strong>Password:</strong> {cred.password}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-2">{cred.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
