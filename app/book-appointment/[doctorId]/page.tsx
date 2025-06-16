"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MapPin, Star, CreditCard, Video, User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function BookAppointmentPage() {
  const params = useParams()
  const doctorId = params.doctorId

  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [symptoms, setSymptoms] = useState("")

  // Mock doctor data - in real app, fetch based on doctorId
  const doctor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    location: "New York, NY",
    rating: 4.9,
    reviews: 127,
    experience: "15 years",
    consultationFee: 150,
    avatar: "/placeholder.svg?height=80&width=80",
    about: "Specialized in cardiovascular diseases with extensive experience in interventional cardiology.",
  }

  const availableSlots = [
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
  ]

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking appointment:", {
      doctorId,
      selectedDate,
      selectedTime,
      appointmentType,
      symptoms,
    })
    alert("Appointment booked successfully! You will receive a confirmation email shortly.")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/doctors" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
              ← Back to Doctors
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Book Appointment</h1>
            <p className="text-gray-600 dark:text-gray-300">Schedule your consultation with {doctor.name}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Doctor Info */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{doctor.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{doctor.specialty}</p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {doctor.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {doctor.rating}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">${doctor.consultationFee}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Consultation Fee</p>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p className="mb-2">
                        <strong>Experience:</strong> {doctor.experience}
                      </p>
                      <p>{doctor.about}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Your Appointment</CardTitle>
                  <CardDescription>Fill in the details to book your consultation</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBooking} className="space-y-6">
                    {/* Appointment Type */}
                    <div>
                      <Label className="text-base font-medium text-gray-900 dark:text-white mb-3 block">
                        Appointment Type
                      </Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            appointmentType === "video"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                          onClick={() => setAppointmentType("video")}
                        >
                          <div className="flex items-center gap-3">
                            <Video className="h-6 w-6 text-blue-600" />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Video Call</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">Online consultation</p>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            appointmentType === "inperson"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                          onClick={() => setAppointmentType("inperson")}
                        >
                          <div className="flex items-center gap-3">
                            <User className="h-6 w-6 text-green-600" />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">In-Person</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">Visit clinic</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div>
                      <Label htmlFor="date" className="text-base font-medium text-gray-900 dark:text-white">
                        Select Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-2"
                        required
                      />
                    </div>

                    {/* Time Selection */}
                    <div>
                      <Label className="text-base font-medium text-gray-900 dark:text-white mb-3 block">
                        Available Time Slots
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {availableSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            className="h-12"
                            onClick={() => setSelectedTime(time)}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Symptoms/Reason */}
                    <div>
                      <Label htmlFor="symptoms" className="text-base font-medium text-gray-900 dark:text-white">
                        Reason for Visit / Symptoms
                      </Label>
                      <Textarea
                        id="symptoms"
                        placeholder="Please describe your symptoms or reason for consultation..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="mt-2"
                        rows={4}
                        required
                      />
                    </div>

                    {/* Payment Summary */}
                    <Card className="bg-gray-50 dark:bg-gray-800">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Booking Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Doctor:</span>
                            <span>{doctor.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Specialty:</span>
                            <span>{doctor.specialty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <span>
                              {appointmentType === "video"
                                ? "Video Call"
                                : appointmentType === "inperson"
                                  ? "In-Person"
                                  : "Not selected"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{selectedDate || "Not selected"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span>{selectedTime || "Not selected"}</span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-medium">
                              <span>Total:</span>
                              <span>${doctor.consultationFee}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={!appointmentType || !selectedDate || !selectedTime || !symptoms}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Book Appointment & Pay ${doctor.consultationFee}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
