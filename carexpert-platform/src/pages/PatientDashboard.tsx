// src/pages/PatientDashboard.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  Calendar,
  Clock,
  Search,
  MapPin,
  Star,
  MessageCircle,
  FileText,
  Heart,
} from "lucide-react";
import { Navbar } from "../components/navbar";
// import { useAuth } from "@/components/auth-context" // Assuming a different auth context for now

export default function PatientDashboard() {
  const navigate = useNavigate();
  // const { user, isLoading } = useAuth() // Assuming a different auth context for now
  const user = { name: "John Smith", role: "patient" }; // Dummy user for UI demonstration
  const isLoading = false; // Assume loading is false for dummy data

  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if not logged in or not a patient (using dummy logic for now)
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "patient")) {
      navigate("/auth/login"); // Use react-router-dom navigate
    }
  }, [user, isLoading, navigate]);

  // Mock data (same as in the Next.js version)
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
  ];

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
  ];

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
  ];

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
  ];

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
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
          <p className="text-gray-600 dark:text-gray-300">
            Manage your health journey with careXpert
          </p>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger
              value="appointments"
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="doctors" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Find Doctors
            </TabsTrigger>
            <TabsTrigger
              value="prescriptions"
              className="flex items-center gap-2"
            >
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
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={appointment.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {appointment.doctor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {appointment.doctor}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {appointment.specialty}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          appointment.type === "Video Call"
                            ? "secondary"
                            : "default"
                        }
                      >
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
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={appointment.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {appointment.doctor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {appointment.doctor}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {appointment.specialty}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >
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
                <CardDescription>
                  Search for doctors by name, specialty, or location
                </CardDescription>
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
                  {/* Filter/Sort options would go here */}
                </div>
                {/* Doctor results grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.map((doctor) => (
                    <Card
                      key={doctor.id}
                      className="flex flex-col items-center text-center p-6"
                    >
                      <Avatar className="h-20 w-20 mb-4">
                        <AvatarImage
                          src={doctor.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                        {doctor.specialty}
                      </p>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm mb-2">
                        <MapPin className="h-4 w-4" /> {doctor.location}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm mb-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />{" "}
                        {doctor.rating} ({doctor.experience})
                      </div>
                      <Link
                        to={`/book-appointment/${doctor.id}`}
                        className="w-full"
                      >
                        <Button
                          className="w-full"
                          variant={doctor.available ? "default" : "outline"}
                        >
                          {doctor.available ? (
                            <>
                              {" "}
                              <Heart className="h-4 w-4 mr-2" /> Book
                              Appointment{" "}
                            </>
                          ) : (
                            "Not Available"
                          )}
                        </Button>
                      </Link>
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
                <CardTitle>My Prescriptions</CardTitle>
                <CardDescription>
                  View and download your active and past prescriptions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {prescription.medication}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Prescribed by: {prescription.doctor}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Date: {prescription.date}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        Instructions: {prescription.instructions}
                      </p>
                    </div>
                    {/* Link or button to view/download PDF would go here */}
                    <Button variant="outline" size="sm">
                      View PDF
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Chat</CardTitle>
                <CardDescription>
                  Chat with CareXpert AI or your doctors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {" "}
                  Chat functionality will be available here.{" "}
                </p>
                <Link to="/chat">
                  <Button className="mt-4">Go to Chat Hub</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Assuming you have a Footer component */}
      {/* <Footer /> */}
    </div>
  );
}
