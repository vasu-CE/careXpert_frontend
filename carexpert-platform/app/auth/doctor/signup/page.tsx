"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Stethoscope, User, Mail, Lock, GraduationCap, MapPin } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function DoctorSignup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    specialty: "",
    licenseNumber: "",
    experience: "",
    location: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Send doctor signup request to admin
    console.log("Doctor signup request:", formData)

    // Show success message
    alert(
      "Your application has been submitted! Our admin team will review your credentials and get back to you within 24-48 hours.",
    )

    // In a real app, this would send the data to the backend
    // and the admin would receive a notification
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Join as Doctor</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Create your professional account to start helping patients
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name
                    </Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="pl-10 h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                        placeholder="Dr. John"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Name
                    </Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="pl-10 h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                        placeholder="Smith"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                      placeholder="dr.smith@hospital.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Label htmlFor="specialty" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Specialty
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("specialty", value)}>
                      <SelectTrigger className="h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="general">General Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative">
                    <Label htmlFor="experience" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Experience
                    </Label>
                    <div className="relative mt-1">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="experience"
                        name="experience"
                        type="text"
                        required
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="pl-10 h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                        placeholder="5 years"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      License Number
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        required
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        className="h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                        placeholder="MD123456"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Location
                    </Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        className="pl-10 h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                        placeholder="New York, NY"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                      placeholder="Create a strong password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium"
                >
                  Create Doctor Account
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link
                      href="/auth/doctor/login"
                      className="text-green-600 dark:text-green-400 hover:underline font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
