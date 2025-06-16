import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Search, MapPin, Clock, Filter, Heart } from "lucide-react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const doctors = [
    {
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
      nextAvailable: "Today 3:00 PM",
      avatar: "/placeholder.svg",
      verified: true,
      about:
        "Specialized in cardiovascular diseases with extensive experience in interventional cardiology.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      location: "Los Angeles, CA",
      rating: 4.8,
      reviews: 89,
      experience: "12 years",
      education: "Stanford University",
      languages: ["English", "Mandarin"],
      consultationFee: 120,
      nextAvailable: "Tomorrow 10:00 AM",
      avatar: "/placeholder.svg",
      verified: true,
      about:
        "Expert in skin conditions, cosmetic dermatology, and dermatological surgery.",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "General Medicine",
      location: "Chicago, IL",
      rating: 4.7,
      reviews: 156,
      experience: "10 years",
      education: "Johns Hopkins University",
      languages: ["English", "French"],
      consultationFee: 100,
      nextAvailable: "Today 5:30 PM",
      avatar: "/placeholder.svg",
      verified: true,
      about:
        "Primary care physician with focus on preventive medicine and family health.",
    },
    {
      id: 4,
      name: "Dr. Robert Wilson",
      specialty: "Neurology",
      location: "Boston, MA",
      rating: 4.9,
      reviews: 203,
      experience: "18 years",
      education: "Mayo Clinic",
      languages: ["English"],
      consultationFee: 180,
      nextAvailable: "Tomorrow 2:00 PM",
      avatar: "/placeholder.svg",
      verified: true,
      about:
        "Neurologist specializing in movement disorders and neurodegenerative diseases.",
    },
  ];

  const url = `${import.meta.env.VITE_BASE_URL}/api/patint`;

  useEffect(() => {
    const fetchDoctors = async () => {
      try{
        const res = await axios.get(`${url}` , {withCredentials : true});
        if(res.status){
          toast.success("true");
        }else{
          toast.error("False");
        }
      }catch(err){
        if(axios.isAxiosError(err) && err.response){
          toast.error(err.response.data?.message || "Something went wrong");
        }else{
          toast.error("An unexpected error occurred.");
        }
      }
    };

    fetchDoctors();
  },[])

  const specialties = [
    "Cardiology",
    "Dermatology",
    "General Medicine",
    "Neurology",
    "Pediatrics",
    "Psychiatry",
    "Orthopedics",
    "Gynecology",
  ];

  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Boston, MA",
    "Miami, FL",
    "Seattle, WA",
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    const matchesLocation =
      selectedLocation === "all" || doctor.location === selectedLocation;

    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 pt-20 pb-12 mt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Doctor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with certified healthcare professionals and book
            appointments with ease
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search doctors or specialties..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-10"
                />
              </div>

              <Select
                value={selectedSpecialty}
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="bg-blue-600 hover:bg-blue-700">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredDoctors.length} doctors
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid gap-6">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  {/* Doctor Info - Takes 8 columns */}
                  <div className="lg:col-span-8">
                    <div className="flex gap-4">
                      <Avatar className="h-20 w-20 flex-shrink-0">
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

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                            {doctor.name}
                          </h3>
                          {doctor.verified && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex-shrink-0">
                              Verified
                            </Badge>
                          )}
                        </div>

                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                          {doctor.specialty}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{doctor.location}</span>
                          </div>
                          
                          <span className="whitespace-nowrap">
                            {doctor.experience} experience
                          </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                          {doctor.about}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">
                            {doctor.education}
                          </Badge>
                          {doctor.languages.map((lang) => (
                            <Badge
                              key={lang}
                              variant="outline"
                              className="text-xs"
                            >
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Info - Takes 4 columns */}
                  <div className="lg:col-span-4">
                    <div className="flex flex-col h-full">
                      <div className="text-center mb-4">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${doctor.consultationFee}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Consultation fee
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <Clock className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{doctor.nextAvailable}</span>
                      </div>

                      <Link
                        to={`/book-appointment/${doctor.id}`}
                        className="w-full"
                      >
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                          <Heart className="h-4 w-4 mr-2" /> Book Appointment
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
