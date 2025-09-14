import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar, Clock, User, MapPin, FileText } from "lucide-react";

export default function AppointmentHistoryPage() {
  // Mock data - replace with actual data from API
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "Completed",
      location: "City Medical Center",
      notes: "Regular checkup, all vitals normal",
      prescription: "Prescription #12345"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-01-10",
      time: "2:30 PM",
      status: "Completed",
      location: "Skin Care Clinic",
      notes: "Annual skin examination",
      prescription: "Prescription #12344"
    },
    {
      id: 3,
      doctor: "Dr. Emily Davis",
      specialty: "General Medicine",
      date: "2024-01-05",
      time: "9:00 AM",
      status: "Cancelled",
      location: "Family Health Center",
      notes: "Appointment cancelled by patient",
      prescription: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Appointment History
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View your past and upcoming appointments with detailed information.
        </p>
      </div>

      <div className="space-y-6">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No appointments found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                You haven't had any appointments yet.
              </p>
              <Button>Book an Appointment</Button>
            </CardContent>
          </Card>
        ) : (
          appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{appointment.doctor}</CardTitle>
                    <CardDescription className="text-base">
                      {appointment.specialty}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.location}
                    </span>
                  </div>
                  {appointment.prescription && (
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {appointment.prescription}
                      </span>
                    </div>
                  )}
                </div>
                
                {appointment.notes && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Notes:</strong> {appointment.notes}
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-2 mt-4">
                  {appointment.prescription && (
                    <Button variant="outline" size="sm">
                      View Prescription
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
