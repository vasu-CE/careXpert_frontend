import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Button } from "./ui/button";
import { Menu, Heart } from "lucide-react";
import { useAuthStore } from "@/store/authstore";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  // For testing purposes, create a mock user if none exists
  if (!user) {
    const mockUser = {
      id: '1',
      name: 'Test Patient',
      email: 'test@example.com',
      profilePicture: '',
      role: 'PATIENT',
      refreshToken: 'mock-token'
    };
    useAuthStore.getState().setUser(mockUser);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Fixed Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content Area */}
      <div className="md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              CareXpert
            </span>
          </div>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>

        {/* Scrollable Content */}
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
