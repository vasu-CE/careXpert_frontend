import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "../components/navbar";
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
  Users,
  MessageCircle,
  FileText,
  Clock,
  Settings,
  Search,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authstore";

type Appointment = {
  id : string,
  status : string,
  patientName : string,
  notes : string,
  profilePicture : string,
  appointmentTime: {
    startTime: string; 
    endTime: string;
  };
}

type AppointmentApiResponse = {
  statusCode : number,
  message : string,
  success : boolean,
  data : Appointment[]
}
export default function DoctorDashboard() {
  const navigate = useNavigate();
  // const { user, isLoading } = useAuth() // Assuming a different auth context for now
  const user = useAuthStore((state) => state.user);
  // const user = { name: "Dr. John Smith", role: "doctor" }; // Dummy user for UI demonstration
  const isLoading = false; // Assume loading is false for dummy data
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(""); // Keep this state for future UI
  const [searchQuery, setSearchQuery] = useState(""); // Keep this state for future UI

  const [todayAppointments , setTodayAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments , setUpcomingApppointments] = useState<Appointment[]>([]);
  const url = `${import.meta.env.VITE_BASE_URL}/api/doctor`
  // Redirect if not logged in or not a doctor (using dummy logic for now)
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "DOCTOR")) {
      navigate("/auth/login"); // Use react-router-dom navigate
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    async function fetchAppointments(){
      try{
        const todayRes = await axios.get<AppointmentApiResponse>(`${url}/appointments` , {withCredentials : true});
        if(todayRes.data.success){
          setTodayAppointments(todayRes.data.data);
        }
        
        const upcomingRes = await axios.get<AppointmentApiResponse>(`${url}/appointments?upcoming=true` , {withCredentials : true});
        if(upcomingRes.data.success){
          setUpcomingApppointments(upcomingRes.data.data);
        }
      }catch(err){
        if(axios.isAxiosError(err) && err.response){
          toast.error(err.response.data?.message || "Something went wrong");
        }else{
          toast.error("Unknown error occured");
        }
      }
    }

    fetchAppointments();
  },[])
  const patientChats = [
    {
      id: 1,
      patient: "John Smith",
      lastMessage: "Thank you for the prescription",
      time: "10 min ago",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      patient: "Sarah Wilson",
      lastMessage: "I have a question about my medication",
      time: "1 hour ago",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      patient: "Michael Brown",
      lastMessage: "When should I schedule my follow-up?",
      time: "3 hours ago",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

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
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Welcome back, {user?.name || "Doctor"}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your practice and help your patients
        </p>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Today's Appointments
                  </p>
                  <p className="text-2xl font-bold dark:text-white">
                    {todayAppointments?.length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Total Patients
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    247
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Unread Messages
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    3
                  </p>
                </div>
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    This Month
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    89
                  </p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs structure with Appointments tab content */}
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
              value="availability"
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Availability
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Today's Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Today's Appointments
                  </CardTitle>
                  <CardDescription>
                    {new Date().toLocaleDateString('en-US' ,{
                      year : 'numeric',
                      month : 'long',
                      day : 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={appointment.profilePicture || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {appointment.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {appointment.patientName}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {/* {new Date(appointment.appointmentTime.startTime).toLocaleDateString()} {" "} */}
                            {new Date(appointment.appointmentTime.startTime).toLocaleTimeString('en-US' , {
                              hour : 'numeric',
                              minute : '2-digit'
                            }).replace(/ (AM|PM)/, '')} {" to "}
                            {new Date(appointment.appointmentTime.endTime).toLocaleTimeString('en-US' , {
                              hour : 'numeric',
                              minute : '2-digit'
                            })}
                          </p>
                          {appointment.notes && 
                            <Badge>
                              {appointment.notes}
                            </Badge>
                          }
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                      <Badge
                        variant={
                          appointment.status === "COMPLETED"
                            ? "default"
                            : appointment.status === "PENDING"
                            ? "secondary"
                            : appointment.status === "CANCELLED"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {appointment.status}
                      </Badge>

                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" /> Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
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
                            src={appointment.profilePicture || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {appointment.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {appointment.patientName}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {new Date(appointment.appointmentTime.startTime).toLocaleDateString()} {" "}
                            {new Date(appointment.appointmentTime.startTime).toLocaleTimeString('en-US' , {
                              hour : 'numeric',
                              minute : '2-digit'
                            })}
                          </p>
                          {appointment.notes && 
                            <Badge>
                              {appointment.notes}
                            </Badge>
                          }
                        </div>
                      </div>
                      <Badge
                        variant={
                          appointment.status === "Confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Availability Tab Placeholder */}
          <TabsContent value="availability">
            <Card>
              <CardContent className="p-6">
                <p>Availability tab content placeholder</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab Placeholder */}
          <TabsContent value="patients">
            <Card>
              <CardContent className="p-6">
                <p>Patients tab content placeholder</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab Placeholder */}
          <TabsContent value="chat">
            <Card>
              <CardContent className="p-6">
                <p>Messages tab content placeholder</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
