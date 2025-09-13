import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Heart, Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/authstore";


export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    // await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/logout` , {} , {withCredentials : true});
    logout();
    localStorage.removeItem('auth-storage');
    navigate("/");
  }
  // Determine home link based on user role
  const getHomeLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "PATIENT":
        return "/dashboard/patient";
      case "DOCTOR":
        return "/dashboard/doctor";
      case "ADMIN":
        return "/admin";
      default:
        return "/";
    }
  };

  // Get navigation links based on user role
  const getNavLinks = () => {
    if (!user) {
      // For logged-out users
      return [
        { href: "/", label: "Home" },
        { href: "/doctors", label: "Find Doctors" },
        { href: "/chat", label: "Chat" },
        { href: "/about", label: "About" },
      ];
    }

    switch (user.role) {
      case "PATIENT":
        return [
          { href: "/dashboard/patient", label: "Dashboard" },
          { href: "/doctors", label: "Find Doctors" },
          { href: "/chat", label: "Chat" },
          { href: "/profile/patient", label: "Profile" },
        ];
      case "DOCTOR":
        return [
          { href: "/dashboard/doctor", label: "Dashboard" },
          { href: "/dashboard/doctor?tab=appointments", label: "Appointments" },
          { href: "/chat", label: "Chat" },
          { href: "/dashboard/doctor?tab=patients", label: "Patients" },
          { href: "/profile/doctor", label: "Profile" },
        ];
      case "ADMIN":
        return [
          { href: "/admin", label: "Dashboard" },
          { href: "/admin?tab=doctor-requests", label: "Doctor Requests" },
          { href: "/admin?tab=users", label: "Users" },
          { href: "/admin?tab=settings", label: "Settings" },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();
  const homeLink = getHomeLink();
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={homeLink} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              careXpert
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}                
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  {user.name} ({user.role})
                </span>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-600 dark:text-gray-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button
                    variant="ghost"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/auth/patient/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                  <>
                    <span className="text-gray-600 dark:text-gray-300 text-sm px-3">
                      {user.name} ({user.role})
                    </span>
                    <Button
                      variant="ghost"
                      onClick={logout}
                      className="w-full justify-start"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth/login">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth/patient/signup">
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
