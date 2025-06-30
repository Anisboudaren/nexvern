/* eslint-disable @next/next/no-img-element */
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <img src="/logo-purple.png" alt="Nexvern Logo" className="w-6 h-6" />
            <span className="text-lg font-semibold text-gray-900">Nexvern</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8 text-sm text-gray-600">
            <a href="/about" className="hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-gray-900 transition-colors">
              Terms
            </a>
            <a href="/contact" className="hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-6 pt-6">
          {/* Copyright and Made with Love */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2024 Nexvern. All rights reserved.</p>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for innovators</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
