import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import DashboardLayout from "./components/DashboardLayout";

// Import pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import ProfilePage from "./pages/ProfilePage";
import AppointmentManagementPage from "./pages/AppointmentManagementPage";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import AdminPage from "./pages/AdminPage";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import StartCall from "./pages/StartCall";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/auth/*" element={<AuthPage />} />
      
      {/* Dashboard routes with sidebar */}
      <Route path="/dashboard/*" element={<DashboardLayout />}>
        <Route path="patient" element={<PatientDashboard />} />
        <Route path="doctor" element={<DoctorDashboard />} />
      </Route>
      
      {/* Other authenticated routes with sidebar */}
      <Route path="/appointments" element={<DashboardLayout />}>
        <Route index element={<AppointmentManagementPage />} />
      </Route>
      <Route path="/prescriptions" element={<DashboardLayout />}>
        <Route index element={<PrescriptionsPage />} />
      </Route>
      <Route path="/profile" element={<DashboardLayout />}>
        <Route index element={<ProfilePage />} />
      </Route>
      <Route path="/doctors" element={<DashboardLayout />}>
        <Route index element={<DoctorsPage />} />
      </Route>
      <Route path="/doctors/:id" element={<DashboardLayout />}>
        <Route index element={<DoctorProfilePage />} />
      </Route>
      <Route path="/book-appointment/:id" element={<DashboardLayout />}>
        <Route index element={<BookAppointmentPage />} />
      </Route>
      <Route path="/chat" element={<DashboardLayout />}>
        <Route index element={<ChatPage />} />
      </Route>
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<AdminPage />} />
      </Route>
      <Route path="/start-call" element={<DashboardLayout />}>
        <Route index element={<StartCall />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}
