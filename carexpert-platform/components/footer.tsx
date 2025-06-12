import Link from "next/link"
import { Heart, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">careXpert</span>
            </Link>
            <p className="text-gray-400 mb-4">Transforming healthcare with modern technology and compassionate care.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-gray-400 hover:text-white transition-colors">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-400 hover:text-white transition-colors">
                  AI Consultation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Doctors</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/doctor/signup" className="text-gray-400 hover:text-white transition-colors">
                  Join as Doctor
                </Link>
              </li>
              <li>
                <Link href="/auth/doctor/login" className="text-gray-400 hover:text-white transition-colors">
                  Doctor Login
                </Link>
              </li>
              <li>
                <Link href="/doctor-resources" className="text-gray-400 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">support@carexpert.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">123 Health St, Medical City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 careXpert. All rights reserved. | Made with ❤️ for better healthcare</p>
        </div>
      </div>
    </footer>
  )
}
