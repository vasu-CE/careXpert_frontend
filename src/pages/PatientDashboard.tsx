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
import { useAuthStore } from "@/store/authstore";
import axios from "axios";
import { toast } from "sonner";

type Appointment = {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  appointmentType: 'ONLINE' | 'OFFLINE';
  date: string;
  time: string;
  notes?: string;
  consultationFee?: number;
  createdAt: string;
  doctor: {
    id: string;
    name: string;
    profilePicture?: string;
    specialty: string;
    clinicLocation: string;
    experience: string;
    education?: string;
    bio?: string;
    languages: string[];
  };
}

type AppointmentApiResponse = {
  statusCode: number;
  message: string;
  success: boolean;
  data: Appointment[];
};

type Prescription = {
  id : string,
  date : string,
  prescriptionText : string,
  doctorName : string,
  speciality : string,
  clinicLocation : string
}

type PrescriptionApiResponse = {
  statusCode: number;
  message: string;
  success: boolean;
  data: Prescription[];
}

type FindDoctors = {
  id: string,
  userId : string,
  specialty: string,
  clinicLocation: string,
  experience: string,
  education : string,
  bio : string,
  languages : [string],
  user : {
    name: string,
    profilePicture : string
  },
  nextAvailable : {
    id : string,
    consultationFee : number,
    startTime : string,
    endTime : string,
    status : string
  }
}

type FindDoctorsApiResponse = {
  statusCode : number,
  message : string,
  success : boolean,
  data : FindDoctors[];
}

export default function PatientDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

 
  const isLoading = false; 

  const [searchQuery, setSearchQuery] = useState("");
  const [upcomingAppointments , setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments , setPastAppointments] = useState<Appointment[]>([]);
  const [prescriptions , setPrescriptions] = useState<Prescription[]>([]);
  const [doctors , setDoctors] = useState<FindDoctors[]>([]);
  const url = `${import.meta.env.VITE_BASE_URL}/api/patient`
  
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "PATIENT")) {
      navigate("/auth/login"); 
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    async function fetchAppointments(){
      try{
        const res = await axios.get<AppointmentApiResponse>(`${url}/all-appointments` , {withCredentials : true});
        if(res.data.success){
          const allAppointments = res.data.data;
          const now = new Date();
          
          // Separate upcoming and past appointments
          const upcoming = allAppointments.filter(apt => {
            const appointmentDateTime = new Date(`${apt.date}T${apt.time}`);
            return appointmentDateTime >= now;
          });
          
          const past = allAppointments.filter(apt => {
            const appointmentDateTime = new Date(`${apt.date}T${apt.time}`);
            return appointmentDateTime < now;
          });
          
          setUpcomingAppointments(upcoming);
          setPastAppointments(past);
        }
      }catch(err){
        if(axios.isAxiosError(err) && err.response){
          toast.error(err.response.data.message);
        }else{
          toast.error("Unknown error occured..");
        }
      }
    };

    fetchAppointments();
  },[])

  // const doctors = [
  //   {
  //     id: 1,
  //     name: "Dr. Sarah Johnson",
  //     specialty: "Cardiology",
  //     location: "New York, NY",
  //     rating: 4.9,
  //     experience: "15 years",
  //     avatar: "/placeholder.svg?height=60&width=60",
  //     available: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Dr. Michael Chen",
  //     specialty: "Dermatology",
  //     location: "Los Angeles, CA",
  //     rating: 4.8,
  //     experience: "12 years",
  //     avatar: "/placeholder.svg?height=60&width=60",
  //     available: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Dr. Emily Davis",
  //     specialty: "General Medicine",
  //     location: "Chicago, IL",
  //     rating: 4.7,
  //     experience: "10 years",
  //     avatar: "/placeholder.svg?height=60&width=60",
  //     available: false,
  //   },
  // ];

  useEffect(() => {
    async function fetchDoctors(){
      try{
        const res = await axios.get<FindDoctorsApiResponse>(`${url}/fetchAllDoctors` , {withCredentials : true});
        if(res.data.success){
          setDoctors(res.data.data);
        }
      }catch(err){
        if(axios.isAxiosError(err) && err.response){
          toast.error(err.response.data?.message || "Something went wrong");
        }else{
          toast.error("Unknown error occured");
        }
      }
    }

    fetchDoctors();
  },[])

  useEffect(() => {
    async function fetchPrescritions(){
      try{
        const res = await axios.get<PrescriptionApiResponse>(`${url}/view-prescriptions` , {withCredentials : true});
        console.log(res.data)
        if(res.data.success){
          setPrescriptions(res.data.data);
        }
      }catch(err){
        if(axios.isAxiosError(err) && err.response){
          toast.error(err.response.data?.message || "Something went wrong");
        }else{
          toast.error("Unknown error occured");
        }
      }
    }
    fetchPrescritions();
  },[])

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
            <TabsTrigger
              value="prescriptions"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Prescriptions
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
                  {upcomingAppointments?.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={appointment.doctor.profilePicture || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {appointment.doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {appointment.doctor.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {appointment.doctor.specialty}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(appointment.date).toLocaleDateString("en-US")}
                            {" "}
                            at{" "}
                            {appointment.time}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant={appointment.appointmentType === "ONLINE" ? "secondary" : "default"}>
                              {appointment.appointmentType === "ONLINE" ? "Video Call" : "In-Person"}
                            </Badge>
                            <Badge variant={
                              appointment.status === "PENDING" ? "outline" :
                              appointment.status === "CONFIRMED" ? "default" :
                              appointment.status === "COMPLETED" ? "secondary" : "destructive"
                            }>
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {/* <Badge
                        variant={
                          appointment.type === "Video Call"
                            ? "secondary"
                            : "default"
                        }
                      >
                        {appointment.type}
                      </Badge> */}
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
                            src={appointment.doctor.profilePicture || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {appointment.doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {appointment.doctor.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {appointment.doctor.specialty}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(appointment.date).toLocaleDateString("en-US")}
                            {" "}
                            at{" "}
                            {appointment.time}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant={appointment.appointmentType === "ONLINE" ? "secondary" : "default"}>
                              {appointment.appointmentType === "ONLINE" ? "Video Call" : "In-Person"}
                            </Badge>
                            <Badge variant={
                              appointment.status === "PENDING" ? "outline" :
                              appointment.status === "CONFIRMED" ? "default" :
                              appointment.status === "COMPLETED" ? "secondary" : "destructive"
                            }>
                              {appointment.status}
                            </Badge>
                          </div>
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
                      {/* <h4 className="font-semibold text-gray-900 dark:text-white">
                        {prescription.medication}
                      </h4> */}
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Prescribed by: Dr. {prescription.doctorName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Date: {new Date(prescription.date).toLocaleDateString()} {" "} 
                        {new Date(prescription.date).toLocaleTimeString('en-US' ,{
                          hour : 'numeric',
                          minute : '2-digit'
                        })}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        Instructions: {prescription.prescriptionText}
                      </p>
                    </div>
                    {/* Link or button to view/download PDF would go here */}
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick = {() => window.open(`${url}/prescription-pdf/${prescription.id}` , "_blank")}
                    >
                      View PDF
                    </Button>
                  </div>
                ))}
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
