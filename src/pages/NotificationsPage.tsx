import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Bell,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  MessageSquare,
  CheckCheck,
} from "lucide-react";
import { useAuthStore } from "@/store/authstore";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  appointmentId?: string;
  createdAt: string;
  appointment?: {
    id: string;
    date: string;
    time: string;
    status: string;
    doctor: {
      user: {
        name: string;
      };
    };
  };
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const url = `${import.meta.env.VITE_BASE_URL}/api/patient`;

  useEffect(() => {
    if (!user || user.role !== "PATIENT") {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${url}/notifications`, { withCredentials: true });
      if (res.data.success) {
        setNotifications(res.data.data);
        setUnreadCount(res.data.data.filter((n: Notification) => !n.isRead).length);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message || "Failed to fetch notifications");
      } else {
        toast.error("Unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await axios.patch(
        `${url}/notifications/${notificationId}/read`,
        {},
        { withCredentials: true }
      );
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message || "Failed to mark notification as read");
      } else {
        toast.error("Unknown error occurred");
      }
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch(
        `${url}/notifications/mark-all-read`,
        {},
        { withCredentials: true }
      );
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message || "Failed to mark all notifications as read");
      } else {
        toast.error("Unknown error occurred");
      }
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "APPOINTMENT_ACCEPTED":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "APPOINTMENT_REJECTED":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "APPOINTMENT_REMINDER":
        return <Calendar className="h-5 w-5 text-blue-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationBadgeVariant = (type: string) => {
    switch (type) {
      case "APPOINTMENT_ACCEPTED":
        return "default" as const;
      case "APPOINTMENT_REJECTED":
        return "destructive" as const;
      case "APPOINTMENT_REMINDER":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Notifications
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Stay updated with your appointment status and important messages
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-sm">
                {unreadCount} Unread
              </Badge>
            )}
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <CheckCheck className="h-4 w-4" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    !notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : ''
                  }`}
                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <Badge variant={getNotificationBadgeVariant(notification.type)} className="text-xs">
                              {notification.type.replace(/_/g, ' ')}
                            </Badge>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3" />
                            {new Date(notification.createdAt).toLocaleDateString("en-US", {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {notification.message}
                        </p>
                        
                        {/* Appointment Details */}
                        {notification.appointment && (
                          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Appointment with Dr. {notification.appointment.doctor.user.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {new Date(notification.appointment.date).toLocaleDateString()} at {notification.appointment.time}
                              </span>
                            </div>
                            <div className="mt-2">
                              <Badge 
                                variant={
                                  notification.appointment.status === "CONFIRMED" ? "default" :
                                  notification.appointment.status === "REJECTED" ? "destructive" :
                                  "secondary"
                                }
                                className="text-xs"
                              >
                                {notification.appointment.status}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              You don't have any notifications yet. You'll receive updates about your appointments here.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
