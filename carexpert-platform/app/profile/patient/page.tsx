"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Calendar, Heart, FileText, Download } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-06-15",
    gender: "Male",
    address: "123 Main St, New York, NY 10001",
    emergencyContact: "Jane Smith - +1 (555) 987-6543",
    bloodType: "O+",
    allergies: "Penicillin, Shellfish",
    medicalConditions: "Hypertension",
  })

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "Completed",
      type: "Video Call",
      prescription: "Lisinopril 10mg - Take once daily",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-01-18",
      time: "2:30 PM",
      status: "Upcoming",
      type: "In-person",
    },
  ]

  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril 10mg",
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-15",
      instructions: "Take once daily with food",
      refills: 2,
    },
    {
      id: 2,
      medication: "Metformin 500mg",
      doctor: "Dr. Emily Davis",
      date: "2024-01-10",
      instructions: "Take twice daily before meals",
      refills: 1,
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    console.log("Saving profile:", profileData)
    alert("Profile updated successfully!")
  }

  const downloadPrescription = (prescriptionId: number) => {
    console.log("Downloading prescription:", prescriptionId)
    alert("Prescription PDF downloaded!")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your personal information and medical records</p>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="medical">Medical History</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" />
                        Personal Information
                      </CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    >
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 mb-8">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="text-xl">
                        {profileData.firstName[0]}
                        {profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">Patient ID: #PAT001</p>
                      <Badge className="mt-2">Verified Account</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={profileData.gender}
                        onValueChange={(value) => setProfileData({ ...profileData, gender: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={profileData.emergencyContact}
                        onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Medical History */}
            <TabsContent value="medical" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    Medical Information
                  </CardTitle>
                  <CardDescription>Your medical history and health information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Input
                        id="bloodType"
                        value={profileData.bloodType}
                        onChange={(e) => setProfileData({ ...profileData, bloodType: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="allergies">Allergies</Label>
                      <Input
                        id="allergies"
                        value={profileData.allergies}
                        onChange={(e) => setProfileData({ ...profileData, allergies: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="medicalConditions">Current Medical Conditions</Label>
                      <Input
                        id="medicalConditions"
                        value={profileData.medicalConditions}
                        onChange={(e) => setProfileData({ ...profileData, medicalConditions: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appointments */}
            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    My Appointments
                  </CardTitle>
                  <CardDescription>View your appointment history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.doctor}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.specialty}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {appointment.date} at {appointment.time} • {appointment.type}
                          </p>
                          {appointment.prescription && (
                            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                              Prescription: {appointment.prescription}
                            </p>
                          )}
                        </div>
                        <Badge variant={appointment.status === "Completed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Prescriptions */}
            <TabsContent value="prescriptions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    My Prescriptions
                  </CardTitle>
                  <CardDescription>View and download your prescriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prescriptions.map((prescription) => (
                      <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{prescription.medication}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Prescribed by {prescription.doctor}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{prescription.instructions}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Date: {prescription.date} • Refills remaining: {prescription.refills}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => downloadPrescription(prescription.id)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
