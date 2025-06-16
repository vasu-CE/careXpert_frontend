import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        {/* Add your profile content here */}
      </div>
      <Footer />
    </div>
  );
}
