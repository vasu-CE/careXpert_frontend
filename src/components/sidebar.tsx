import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Home, 
  Calendar, 
  Search, 
  FileText, 
  Pill, 
  MapPin, 
  Clock, 
  User, 
  X,
  Bell,
  MessageCircle
} from "lucide-react";
import { useAuthStore } from "@/store/authstore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const user = useAuthStore((state) => state.user);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread notification count
  useEffect(() => {
    if (user) {
      const fetchUnreadCount = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/user/notifications/unread-count`,
            { withCredentials: true }
          );
          if (response.data.success) {
            setUnreadCount(response.data.data.unreadCount);
          }
        } catch (error) {
          console.error("Error fetching unread count:", error);
        }
      };

      fetchUnreadCount();
      // Poll for updates every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  // Navigation items based on user role
  const getNavItems = () => {
    if (!user) {
      return []; // No sidebar items for non-logged in users
    }

    if (user.role === "DOCTOR") {
      return [
        { href: "/dashboard/doctor", label: "Home", icon: Home },
        { href: "/doctor/appointments", label: "Appointment Requests", icon: Calendar },
        { href: "/doctor/appointment-history", label: "Appointment History", icon: Clock },
        { href: "/notifications", label: "Notifications", icon: Bell, badge: unreadCount },
        { href: "/profile", label: "Profile", icon: User },
      ];
    } else {
      // Patient navigation items
      return [
        { href: "/dashboard/patient", label: "Home", icon: Home },
        { href: "/appointments", label: "Appointments", icon: Calendar },
        { href: "/doctors", label: "Find Doctor", icon: Search },
        { href: "/chat", label: "Chat", icon: MessageCircle },
        { href: "/upload-report", label: "Analyze Report", icon: FileText },
        { href: "/prescriptions", label: "Prescriptions", icon: Pill },
        { href: "/notifications", label: "Notifications", icon: Bell, badge: unreadCount },
        { href: "/pharmacy", label: "Pharmacy Near Me", icon: MapPin },
        { href: "/appointment-history", label: "Appointment History", icon: Clock },
        { href: "/profile", label: "Profile", icon: User },
      ];
    }
  };

  const navItems = getNavItems();

  // Don't render sidebar if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-screen bg-gray-50 dark:bg-gray-800 flex-col shadow-lg fixed left-0 top-16 z-40">
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {item.badge > 99 ? '99+' : item.badge}
                    </Badge>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen ? 0 : "-100%",
          transition: { type: "spring", damping: 25, stiffness: 200 }
        }}
        className="md:hidden fixed top-16 left-0 h-full w-64 bg-gray-50 dark:bg-gray-800 z-50 flex flex-col shadow-lg"
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-end p-4 border-b border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                  onClick={() => {
                    // Close mobile menu when navigating
                    if (window.innerWidth < 768) {
                      onToggle();
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {item.badge > 99 ? '99+' : item.badge}
                    </Badge>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
}
