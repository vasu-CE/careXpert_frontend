"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, FileText, CheckCircle, XCircle, Pill } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function AppointmentManagementPage() {
  const params = useParams()
  const appointmentId = params.appointmentId

  const [status, setStatus] = useState("confirmed")
  const [notes, setNotes] = useState("")
  const [prescription, setPrescription] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  })

  // Mock appointment data
  const appointment = {
    id: appointmentId,
    patient: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      age: 35,
      bloodType: "O+",
      allergies: "Penicillin, Shellfish",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    doctor: "Dr. Sarah Johnson",
    date: "2024-01-15",
    time: "10:00 AM",
    type: "Video Call",
    status: "Confirmed",
    symptoms: "Chest pain and shortness of breath during exercise",
    duration: "30 minutes",
    fee: 150,
  }

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus)
    console.log("Updating appointment status:", newStatus)
    alert(`Appointment ${newStatus} successfully!`)
  }

  const handleAddPrescription = () => {
    if (!prescription.medication || !prescription.dosage) {
      alert("Please fill in medication and dosage fields")
      return
    }

    console.log("Adding prescription:", prescription)
    alert("Prescription added successfully!")

    // Reset form
    setPrescription({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    })
  }

  const handleCompleteAppointment = () => {
    console.log("Completing appointment with notes:", notes)
    alert("Appointment completed successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard/doctor"
              className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manage Appointment</h1>
            <p className="text-gray-600 dark:text-gray-300">Update appointment status and add prescriptions</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Patient Information */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={appointment.patient.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {appointment.patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{appointment.patient.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Age: {appointment.patient.age}</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>Email:</strong>
                      <p className="text-gray-600 dark:text-gray-300">{appointment.patient.email}</p>
                    </div>
                    <div>
                      <strong>Phone:</strong>
                      <p className="text-gray-600 dark:text-gray-300">{appointment.patient.phone}</p>
                    </div>
                    <div>
                      <strong>Blood Type:</strong>
                      <p className="text-gray-600 dark:text-gray-300">{appointment.patient.bloodType}</p>
                    </div>
                    <div>
                      <strong>Allergies:</strong>
                      <p className="text-gray-600 dark:text-gray-300">{appointment.patient.allergies}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Appointment Management */}
            <div className="lg:col-span-2 space-y-6">
              {/* Appointment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Appointment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{appointment.time}</span>
                    </div>
                    <div>
                      <Badge variant={appointment.type === "Video Call" ? "secondary" : "default"}>
                        {appointment.type}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant="outline">{appointment.duration}</Badge>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Patient Symptoms:</h4>
                    <p className="text-gray-600 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      {appointment.symptoms}
                    </p>
                  </div>

                  {/* Status Management */}
                  <div className="flex gap-3">
                    <Button
                      variant={status === "confirmed" ? "default" : "outline"}
                      onClick={() => handleStatusUpdate("confirmed")}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm
                    </Button>
                    <Button
                      variant={status === "cancelled" ? "destructive" : "outline"}
                      onClick={() => handleStatusUpdate("cancelled")}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Prescription */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-purple-600" />
                    Add Prescription
                  </CardTitle>
                  <CardDescription>Prescribe medication for the patient</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="medication">Medication Name</Label>
                      <Input
                        id="medication"
                        placeholder="e.g., Lisinopril"
                        value={prescription.medication}
                        onChange={(e) => setPrescription({ ...prescription, medication: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input
                        id="dosage"
                        placeholder="e.g., 10mg"
                        value={prescription.dosage}
                        onChange={(e) => setPrescription({ ...prescription, dosage: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select
                        value={prescription.frequency}
                        onValueChange={(value) => setPrescription({ ...prescription, frequency: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once-daily">Once daily</SelectItem>
                          <SelectItem value="twice-daily">Twice daily</SelectItem>
                          <SelectItem value="three-times-daily">Three times daily</SelectItem>
                          <SelectItem value="as-needed">As needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 30 days"
                        value={prescription.duration}
                        onChange={(e) => setPrescription({ ...prescription, duration: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="instructions">Special Instructions</Label>
                      <Textarea
                        id="instructions"
                        placeholder="e.g., Take with food, avoid alcohol"
                        value={prescription.instructions}
                        onChange={(e) => setPrescription({ ...prescription, instructions: e.target.value })}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>

                  <Button onClick={handleAddPrescription} className="w-full mt-4">
                    <Pill className="h-4 w-4 mr-2" />
                    Add Prescription
                  </Button>
                </CardContent>
              </Card>

              {/* Consultation Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Consultation Notes
                  </CardTitle>
                  <CardDescription>Add notes about the consultation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter your consultation notes, diagnosis, and treatment plan..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                    className="mb-4"
                  />

                  <Button onClick={handleCompleteAppointment} className="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
