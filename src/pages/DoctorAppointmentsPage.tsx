import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  Mail,
} from "lucide-react";
import { useAuthStore } from "@/store/authstore";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

type AppointmentRequest = {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
  appointmentType: 'ONLINE' | 'OFFLINE';
  date: string;
  time: string;
  notes?: string;
  consultationFee?: number;
  createdAt: string;
  patient: {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
    medicalHistory?: string;
  };
  timeSlot?: {
    id: string;
    startTime: string;
    endTime: string;
    consultationFee?: number;
  };
};

type AppointmentApiResponse = {
  statusCode: number;
  message: string;
  success: boolean;
  data: AppointmentRequest[];
};

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [pendingRequests, setPendingRequests] = useState<AppointmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'requests' | 'all'>('requests');
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);

  const user = useAuthStore((state) => state.user);
  const url = `${import.meta.env.VITE_BASE_URL}/api`;

  useEffect(() => {
    if (user?.role === "DOCTOR") {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      
      // Fetch pending requests
      const pendingResponse = await axios.get<AppointmentApiResponse>(
        `${url}/doctor/pending-requests`,
        { withCredentials: true }
      );
      
      // Fetch all appointments
      const allResponse = await axios.get<AppointmentApiResponse>(
        `${url}/doctor/all-appointments`,
        { withCredentials: true }
      );

      if (pendingResponse.data.success) {
        setPendingRequests(pendingResponse.data.data);
      }
      
      if (allResponse.data.success) {
        setAppointments(allResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Failed to fetch appointments");
      } else {
        toast.error("Failed to fetch appointments");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptAppointment = async (appointmentId: string) => {
    try {
      setProcessing(true);
      const response = await axios.patch(
        `${url}/doctor/appointment-requests/${appointmentId}/respond`,
        { action: "accept" },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Appointment accepted successfully!");
        fetchAppointments(); // Refresh the list
      }
    } catch (error) {
      console.error("Error accepting appointment:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Failed to accept appointment");
      } else {
        toast.error("Failed to accept appointment");
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleRejectAppointment = async () => {
    if (!selectedAppointment || !rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    try {
      setProcessing(true);
      const response = await axios.patch(
        `${url}/doctor/appointment-requests/${selectedAppointment.id}/respond`,
        { 
          action: "reject",
          rejectionReason: rejectionReason.trim()
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Appointment request rejected");
        setRejectDialogOpen(false);
        setRejectionReason('');
        setSelectedAppointment(null);
        fetchAppointments(); // Refresh the list
      }
    } catch (error) {
      console.error("Error rejecting appointment:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Failed to reject appointment");
      } else {
        toast.error("Failed to reject appointment");
      }
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { variant: "secondary" as const, label: "Pending", color: "text-yellow-600" },
      CONFIRMED: { variant: "default" as const, label: "Confirmed", color: "text-green-600" },
      COMPLETED: { variant: "default" as const, label: "Completed", color: "text-blue-600" },
      CANCELLED: { variant: "destructive" as const, label: "Cancelled", color: "text-red-600" },
      REJECTED: { variant: "destructive" as const, label: "Rejected", color: "text-red-600" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Appointment Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your appointment requests and view all appointments
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'requests'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Pending Requests ({pendingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            All Appointments ({appointments.length})
          </button>
        </div>
      </div>

      {/* Pending Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Pending Appointment Requests
            </h2>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {pendingRequests.length} requests
            </Badge>
          </div>

          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No pending requests
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  You don't have any pending appointment requests at the moment.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {pendingRequests.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={appointment.patient.profilePicture} />
                            <AvatarFallback>
                              {appointment.patient.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {appointment.patient.name}
                            </CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{appointment.patient.email}</span>
                            </CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(appointment.date)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formatTime(appointment.time)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {appointment.appointmentType}
                          </span>
                        </div>
                        {appointment.consultationFee && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              ₹{appointment.consultationFee}
                            </span>
                          </div>
                        )}
                      </div>

                      {appointment.notes && (
                        <div className="mb-4">
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Patient Notes:
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {appointment.notes}
                          </p>
                        </div>
                      )}

                      {appointment.patient.medicalHistory && (
                        <div className="mb-4">
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Medical History:
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {appointment.patient.medicalHistory}
                          </p>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <Button
                          onClick={() => handleAcceptAppointment(appointment.id)}
                          disabled={processing}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                        <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              onClick={() => setSelectedAppointment(appointment)}
                              disabled={processing}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Appointment Request</DialogTitle>
                              <DialogDescription>
                                Please provide a reason for rejecting this appointment request.
                                The patient will be notified with your feedback.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="rejection-reason">Reason for rejection</Label>
                                <Textarea
                                  id="rejection-reason"
                                  placeholder="e.g., Time slot not available, suggest alternative time..."
                                  value={rejectionReason}
                                  onChange={(e) => setRejectionReason(e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setRejectDialogOpen(false);
                                  setRejectionReason('');
                                  setSelectedAppointment(null);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={handleRejectAppointment}
                                disabled={processing || !rejectionReason.trim()}
                              >
                                {processing ? "Rejecting..." : "Reject Request"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* All Appointments Tab */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              All Appointments
            </h2>
            <Badge variant="secondary">
              {appointments.length} total
            </Badge>
          </div>

          {appointments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No appointments found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  You don't have any appointments scheduled yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={appointment.patient.profilePicture} />
                            <AvatarFallback>
                              {appointment.patient.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {appointment.patient.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {appointment.patient.email}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {formatDate(appointment.date)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {formatTime(appointment.time)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {appointment.appointmentType}
                          </span>
                        </div>
                        {appointment.consultationFee && (
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              ₹{appointment.consultationFee}
                            </span>
                          </div>
                        )}
                      </div>

                      {appointment.notes && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Notes:</strong> {appointment.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
