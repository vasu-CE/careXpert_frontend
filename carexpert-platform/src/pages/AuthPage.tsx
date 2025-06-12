import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

// Import auth sub-pages
import PatientSignup from "./auth/PatientSignup";
import DoctorSignup from "./auth/DoctorSignup";
import Login from "./auth/Login";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-16 mt-12">
        <Routes>
          <Route path="patient/signup" element={<PatientSignup />} />
          <Route path="doctor/signup" element={<DoctorSignup />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
