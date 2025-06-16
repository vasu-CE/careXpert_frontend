"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Search, MapPin, Star, MessageCircle, FileText, Heart } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/components/auth-context"

export default function PatientDashboard() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  // Redirect if not logged in or not a patient
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "patient")) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  // Mock data
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "In-person",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-01-18",
      time: "2:30 PM",
      type: "Video Call",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const pastAppointments = [
    {
      id: 3,
      doctor: "Dr. Emily Davis",
      specialty: "General Medicine",
      date: "2024-01-10",
      time: "9:00 AM",
      type: "In-person",
      status: "Completed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      location: "New York, NY",
      rating: 4.9,
      experience: "15 years",
      avatar: "/placeholder.svg?height=60&width=60",
      available: true,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      location: "Los Angeles, CA",
      rating: 4.8,
      experience: "12 years",
      avatar: "/placeholder.svg?height=60&width=60",
      available: true,
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "General Medicine",
      location: "Chicago, IL",
      rating: 4.7,
      experience: "10 years",
      avatar: "/placeholder.svg?height=60&width=60",
      available: false,
    },
  ]

  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril 10mg",
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-10",
      instructions: "Take once daily with food",
    },
    {
      id: 2,
      medication: "Metformin 500mg",
      doctor: "Dr. Emily Davis",
      date: "2024-01-05",
      instructions: "Take twice daily before meals",
    },
  ]

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 pt-20 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name || "Patient"}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your health journey with careXpert</p>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="doctors" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Find Doctors
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Prescriptions
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {appointment.doctor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.doctor}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.specialty}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                      </div>
                      <Badge variant={appointment.type === "Video Call" ? "secondary" : "default"}>
                        {appointment.type}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Past Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    Past Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {appointment.doctor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.doctor}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.specialty}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Find Doctors Tab */}
          <TabsContent value="doctors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find Doctors</CardTitle>
                <CardDescription>Search for doctors by name, specialty, or location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search doctors, specialties, or locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button>Search</Button>
                </div>

                <div className="grid gap-4">
                  {doctors.map((doctor) => (
                    <Card key={doctor.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {doctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">{doctor.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">{doctor.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{doctor.experience}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge variant={doctor.available ? "default" : "secondary"}>
                            {doctor.available ? "Available" : "Busy"}
                          </Badge>
                          <Button size="sm" disabled={!doctor.available}>
                            Book Appointment
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  My Prescriptions
                </CardTitle>
                <CardDescription>View and manage your current prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{prescription.medication}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Prescribed by {prescription.doctor}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{prescription.instructions}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Date: {prescription.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    Doctor Chats
                  </CardTitle>
                  <CardDescription>Continue conversations with your doctors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Dr. Sarah Johnson</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Your test results are ready...</p>
                      </div>
                    </div>
                    <Badge variant="secondary">2</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Dr. Michael Chen</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Follow-up appointment scheduled</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-purple-600" />
                    AI Assistant
                  </CardTitle>
                  <CardDescription>Get instant health guidance from our AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">CareXpert AI</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Ask me anything about your health, symptoms, or medications
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Start Chat</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
