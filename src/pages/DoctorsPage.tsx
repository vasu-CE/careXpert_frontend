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


type FindDoctors = {
  id: string,
  userId : string,
  specialty: string,
  clinicLocation: string,
  experience: string,
  education : string,
  bio : string,
  languages : [string],
  consultationFee : number,
  user : {
    name: string,
    profilePicture : string
  },
  nextAvailable : string
}

type FindDoctorsApiResponse = {
  statusCode : number,
  message : string,
  success : boolean,
  data : FindDoctors[];
}

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [doctors , setDoctors] = useState<FindDoctors[]>([]);

  const url = `${import.meta.env.VITE_BASE_URL}/api/patient`;

  useEffect(() => {
    const fetchDoctors = async () => {
      try{
        const res = await axios.get<FindDoctorsApiResponse>(`${url}/fetchAllDoctors` , {withCredentials : true});
        if(res.data.success){
          setDoctors(res.data.data)
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
      doctor.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    const matchesLocation =
      selectedLocation === "all" || doctor.clinicLocation === selectedLocation;

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
                          src={doctor.user.profilePicture || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {doctor.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                            {doctor.user.name}
                          </h3>
                          {/* {doctor.verified && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex-shrink-0">
                              Verified
                            </Badge>
                          )} */}
                        </div>

                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                          {doctor.specialty}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{doctor.clinicLocation}</span>
                          </div>
                          
                          <span className="whitespace-nowrap">
                            {doctor.experience} experience
                          </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                          {doctor.bio}
                        </p>

                        <div className="flex flex-col gap-2">
                        {doctor.education && (
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              {doctor.education}
                            </Badge>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {doctor.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Info - Takes 4 columns */}
                  <div className="lg:col-span-4">
                    <div className="flex flex-col h-full">
                      <div className="text-center mb-4">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${doctor.consultationFee || " 0 "}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Consultation fee
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <Clock className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{doctor.nextAvailable || "Not available"}</span>
                      </div>

                      <Link
                      to={`/book-appointment/${doctor.id}`}
                      className="w-full text-white"
                      >
                        <Button
                          className="w-full"
                          variant={doctor.nextAvailable ? "default" : "outline"}
                        >
                          {doctor.nextAvailable ? (
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
