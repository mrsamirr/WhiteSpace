"use client"

import { Link } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold text-gray-900">
          WhiteSpace
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/our-story" className="text-sm text-gray-600 hover:text-gray-900">
            Our story
          </Link>
          <Link to="/membership" className="text-sm text-gray-600 hover:text-gray-900">
            Membership
          </Link>
          <Link to="/write" className="text-sm text-gray-600 hover:text-gray-900">
            Write
          </Link>
          <Link to="/signin" className="text-sm text-gray-600 hover:text-gray-900">
            Sign in
          </Link>
          <button className="rounded-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-sm"
          onClick={() => window.location.href = "/home"}>
            Get started
          </button>
        </nav>
        <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 border-b border-gray-200">
          <nav className="flex flex-col space-y-4">
            <Link to="/our-story" className="text-sm text-gray-600 hover:text-gray-900">
              Our story
            </Link>
            <Link to="/membership" className="text-sm text-gray-600 hover:text-gray-900">
              Membership
            </Link>
            <Link to="/write" className="text-sm text-gray-600 hover:text-gray-900">
              Write
            </Link>
            <Link to="/signin" className="text-sm text-gray-600 hover:text-gray-900">
              Sign in
            </Link>
            <button className="rounded-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-sm w-full">
              Get started
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
