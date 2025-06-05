import React, { useState } from 'react';
import { LogOut, User, Menu } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Import AuthContext

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleUserClick = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Logo and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>

        {/* Center - Nav Links */}
        <div className="hidden lg:flex space-x-8 text-gray-700 font-medium">
          <Link to="/dashboard" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/educationdashboard" className="hover:text-blue-600">Progress</Link>
          <Link to="/store" className="hover:text-blue-600">Product</Link>
           <Link to="/prediction" className="block hover:text-blue-600">AI Feedback</Link>
        </div>

        {/* Right - User Icon */}
        <div className="relative">
          <button
            onClick={handleUserClick}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <User className="w-6 h-6 text-gray-700" />
          </button>
          {showLogout && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
              >
                <LogOut className="inline w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 px-4 space-y-2 text-gray-700 font-medium">
          <Link to="/dashboard" className="block hover:text-blue-600">Home</Link>
          <Link to="/about" className="block hover:text-blue-600">About</Link>
          <Link to="/educationdashboard" className="block hover:text-blue-600">Progress</Link>
          <Link to="/store" className="block hover:text-blue-600">Product</Link>
          <Link to="/prediction" className="block hover:text-blue-600">AI Feedback</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
