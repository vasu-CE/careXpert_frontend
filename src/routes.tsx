import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";

// Import pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import ProfilePage from "./pages/ProfilePage";
import AppointmentManagementPage from "./pages/AppointmentManagementPage";
import AdminPage from "./pages/AdminPage";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import StartCall from "./pages/StartCall";

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:id" element={<DoctorProfilePage />} />
        <Route path="/book-appointment/:id" element={<BookAppointmentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/appointments" element={<AppointmentManagementPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/start-call" element={<StartCall />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Layout>
  );
}
