import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Button } from "./ui/button";
import { Menu, Heart } from "lucide-react";
import { useAuthStore } from "@/store/authstore";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  // Pages that should have the sidebar
  const sidebarPages = [
    "/dashboard/patient",
    "/dashboard/doctor", 
    "/admin",
    "/profile",
    "/appointments",
    "/doctors",
    "/book-appointment",
    "/chat"
  ];

  const shouldShowSidebar = user && sidebarPages.some(page => 
    location.pathname.startsWith(page)
  );

  // Debug logging
  console.log('Layout Debug:', { user, location: location.pathname, shouldShowSidebar });

  // Always show sidebar for authenticated users on dashboard pages
  if (!user) {
    return <div className="min-h-screen font-sans">{children || <Outlet />}</div>;
  }

  if (!shouldShowSidebar) {
    return <div className="min-h-screen font-sans">{children || <Outlet />}</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
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

        {/* Page Content */}
        <main className="flex-1">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
