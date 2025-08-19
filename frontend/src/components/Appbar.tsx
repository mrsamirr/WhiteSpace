import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./Avatar"
import { useState } from "react";
import { useUserProfile } from "../hooks";

export const Appbar = () => {
    const navigate = useNavigate();
    const { user } = useUserProfile();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">W</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">WhiteSpace</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            to="/blogs" 
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Stories
                        </Link>
                        <Link 
                            to="/dashboard" 
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Dashboard
                        </Link>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        <Link 
                            to="/publish"
                            className="hidden sm:inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Write
                        </Link>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <Avatar 
                                    name={user?.name || "User"} 
                                    size="medium" 
                                    src={user?.avatar}
                                />
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/publish"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Write a story
                                    </Link>
                                    <hr className="my-1" />
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {showDropdown && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                        <Link
                            to="/blogs"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setShowDropdown(false)}
                        >
                            Stories
                        </Link>
                        <Link
                            to="/dashboard"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setShowDropdown(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/publish"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setShowDropdown(false)}
                        >
                            Write a story
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};