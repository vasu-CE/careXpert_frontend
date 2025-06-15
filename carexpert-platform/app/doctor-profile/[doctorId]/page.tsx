"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Star, Award, GraduationCap, Languages, Heart } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function DoctorProfilePage() {
  const params = useParams()
  const doctorId = params.doctorId

  // Mock doctor data - in real app, fetch based on doctorId
  const doctor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    location: "New York, NY",
    rating: 4.9,
    reviews: 127,
    experience: "15 years",
    education: "Harvard Medical School",
    languages: ["English", "Spanish"],
    consultationFee: 150,
    avatar: "/placeholder.svg?height=120&width=120",
    about:
      "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in cardiovascular medicine. She specializes in interventional cardiology, heart disease prevention, and cardiac rehabilitation. Dr. Johnson is committed to providing personalized care and staying at the forefront of cardiac treatment innovations.",
    qualifications: [
      "MD - Harvard Medical School (2008)",
      "Residency - Internal Medicine, Johns Hopkins Hospital",
      "Fellowship - Cardiology, Mayo Clinic",
      "Board Certified - American Board of Internal Medicine",
      "Board Certified - American Board of Cardiovascular Disease",
    ],
    specializations: [
      "Interventional Cardiology",
      "Heart Disease Prevention",
      "Cardiac Rehabilitation",
      "Echocardiography",
      "Stress Testing",
    ],
    awards: [
      "Top Doctor Award 2023 - New York Magazine",
      "Excellence in Patient Care 2022",
      "Research Excellence Award 2021",
    ],
    availability: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 3:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 4:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
  }

  const reviews = [
    {
      id: 1,
      patient: "John D.",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Dr. Johnson is exceptional. She took the time to explain my condition thoroughly and made me feel comfortable throughout the consultation.",
    },
    {
      id: 2,
      patient: "Maria S.",
      rating: 5,
      date: "2024-01-08",
      comment:
        "Highly professional and knowledgeable. The treatment plan she provided has significantly improved my heart health.",
    },
    {
      id: 3,
      patient: "Robert K.",
      rating: 4,
      date: "2024-01-05",
      comment: "Great doctor with excellent bedside manner. The appointment was on time and very informative.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/doctors" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
              ← Back to Doctors
            </Link>
          </div>

          {/* Doctor Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 text-center">
                  <Avatar className="h-32 w-32 mx-auto mb-4">
                    <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-2">
                    Verified Doctor
                  </Badge>
                </div>

                <div className="lg:col-span-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{doctor.name}</h1>
                  <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">{doctor.specialty}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {doctor.rating} ({doctor.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{doctor.languages.join(", ")}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300">{doctor.about}</p>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center mb-4">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">${doctor.consultationFee}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Consultation Fee</p>
                  </div>

                  <div className="space-y-3">
                    <Link href={`/book-appointment/${doctor.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                        <Calendar className="h-5 w-5 mr-2" />
                        Book Appointment
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full h-12">
                      <Heart className="h-5 w-5 mr-2" />
                      Save Doctor
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-600" />
                      Specializations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {doctor.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-2">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      Awards & Recognition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {doctor.awards.map((award, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mt-0.5 flex-shrink-0" />
                          {award}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="qualifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Education & Certifications</CardTitle>
                  <CardDescription>Professional qualifications and training</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {doctor.qualifications.map((qual, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{qual}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Weekly Schedule
                  </CardTitle>
                  <CardDescription>Available consultation hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(doctor.availability).map(([day, hours]) => (
                      <div
                        key={day}
                        className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                      >
                        <span className="font-medium text-gray-900 dark:text-white capitalize">{day}</span>
                        <span className="text-gray-600 dark:text-gray-300">{hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Reviews</CardTitle>
                  <CardDescription>What patients say about Dr. {doctor.name.split(" ")[1]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{review.patient[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{review.patient}</p>
                              <div className="flex items-center gap-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
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
