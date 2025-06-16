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
import { Textarea } from "@/components/ui/textarea"
import { Stethoscope, Clock, Plus, X } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "s.johnson@hospital.com",
    phone: "+1 (555) 234-5678",
    specialty: "Cardiology",
    licenseNumber: "MD123456",
    experience: "15 years",
    education: "Harvard Medical School",
    location: "New York, NY",
    about: "Specialized in cardiovascular diseases with extensive experience in interventional cardiology.",
    consultationFee: 150,
    languages: ["English", "Spanish"],
  })

  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: "09:00", end: "17:00" },
    tuesday: { enabled: true, start: "09:00", end: "17:00" },
    wednesday: { enabled: true, start: "09:00", end: "15:00" },
    thursday: { enabled: true, start: "09:00", end: "17:00" },
    friday: { enabled: true, start: "09:00", end: "16:00" },
    saturday: { enabled: true, start: "10:00", end: "14:00" },
    sunday: { enabled: false, start: "", end: "" },
  })

  const [timeSlots, setTimeSlots] = useState([
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
  ])

  const [newTimeSlot, setNewTimeSlot] = useState("")

  const handleSave = () => {
    setIsEditing(false)
    console.log("Saving profile:", profileData)
    alert("Profile updated successfully!")
  }

  const addTimeSlot = () => {
    if (newTimeSlot && !timeSlots.includes(newTimeSlot)) {
      setTimeSlots([...timeSlots, newTimeSlot])
      setNewTimeSlot("")
    }
  }

  const removeTimeSlot = (slot: string) => {
    setTimeSlots(timeSlots.filter((s) => s !== slot))
  }

  const addLanguage = () => {
    const language = prompt("Enter a new language:")
    if (language && !profileData.languages.includes(language)) {
      setProfileData({
        ...profileData,
        languages: [...profileData.languages, language],
      })
    }
  }

  const removeLanguage = (language: string) => {
    setProfileData({
      ...profileData,
      languages: profileData.languages.filter((l) => l !== language),
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Doctor Profile</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your professional information and availability</p>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Professional Info</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Professional Information */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-green-600" />
                        Professional Information
                      </CardTitle>
                      <CardDescription>Update your professional details</CardDescription>
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
                        Dr. {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{profileData.specialty}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Verified Doctor
                        </Badge>
                        <Badge variant="outline">License: {profileData.licenseNumber}</Badge>
                      </div>
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
                      <Label htmlFor="specialty">Specialty</Label>
                      <Select
                        value={profileData.specialty}
                        onValueChange={(value) => setProfileData({ ...profileData, specialty: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cardiology">Cardiology</SelectItem>
                          <SelectItem value="Dermatology">Dermatology</SelectItem>
                          <SelectItem value="Neurology">Neurology</SelectItem>
                          <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="General Medicine">General Medicine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience</Label>
                      <Input
                        id="experience"
                        value={profileData.experience}
                        onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        value={profileData.education}
                        onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                      <Input
                        id="consultationFee"
                        type="number"
                        value={profileData.consultationFee}
                        onChange={(e) => setProfileData({ ...profileData, consultationFee: Number(e.target.value) })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Languages</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profileData.languages.map((language) => (
                          <Badge key={language} variant="outline" className="flex items-center gap-1">
                            {language}
                            {isEditing && (
                              <X className="h-3 w-3 cursor-pointer" onClick={() => removeLanguage(language)} />
                            )}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button variant="outline" size="sm" onClick={addLanguage}>
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="about">About</Label>
                      <Textarea
                        id="about"
                        value={profileData.about}
                        onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Availability */}
            <TabsContent value="availability" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Weekly Schedule
                    </CardTitle>
                    <CardDescription>Set your available days and hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(availability).map(([day, schedule]) => (
                        <div key={day} className="flex items-center gap-4">
                          <div className="w-20">
                            <Label className="capitalize">{day}</Label>
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <input
                              type="checkbox"
                              checked={schedule.enabled}
                              onChange={(e) =>
                                setAvailability({
                                  ...availability,
                                  [day]: { ...schedule, enabled: e.target.checked },
                                })
                              }
                              className="rounded"
                            />
                            {schedule.enabled && (
                              <>
                                <Input
                                  type="time"
                                  value={schedule.start}
                                  onChange={(e) =>
                                    setAvailability({
                                      ...availability,
                                      [day]: { ...schedule, start: e.target.value },
                                    })
                                  }
                                  className="w-24"
                                />
                                <span>to</span>
                                <Input
                                  type="time"
                                  value={schedule.end}
                                  onChange={(e) =>
                                    setAvailability({
                                      ...availability,
                                      [day]: { ...schedule, end: e.target.value },
                                    })
                                  }
                                  className="w-24"
                                />
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Time Slots</CardTitle>
                    <CardDescription>Manage your available appointment slots</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g., 11:30 AM"
                          value={newTimeSlot}
                          onChange={(e) => setNewTimeSlot(e.target.value)}
                        />
                        <Button onClick={addTimeSlot}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {timeSlots.map((slot) => (
                          <div key={slot} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">{slot}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTimeSlot(slot)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Receive notifications about new appointments
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Receive SMS reminders for appointments
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Auto-Accept Appointments</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Automatically accept appointment requests
                        </p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
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
