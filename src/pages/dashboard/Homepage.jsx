import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  BookOpen,
  BarChart2,
  ShoppingBag,
  Brain,
} from 'lucide-react';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-5 border-b border-gray-200 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="hidden lg:flex">
            <img src="/logo.png" alt="Logo" className="h-16" />
          </div>
          <button
            className="lg:hidden text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className="hidden lg:flex space-x-4">
          <Link to="/signin" className="text-black hover:underline">
          <button className="px-4 py-2 rounded border border-black text-black hover:bg-gray-100 transition text-sm">
            Login
          </button>
            </Link>
            <Link to="/signup" className="text-black hover:underline">
          <button className="px-4 py-2 rounded bg-black text-white hover:bg-gray-600 transition text-sm">
            Sign Up
          </button>
              </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="flex flex-col items-start space-y-2 px-5 py-3 border-b lg:hidden">
          <div className="mt-1 space-x-2">
            <Link to="/signin" className="text-black hover:underline">
            <button className="px-4 py-2 rounded border border-black text-black hover:bg-gray-100 transition text-sm">
              Login
            </button>
            </Link>
            <Link to="/signup" className="text-black hover:underline">
            <button className="px-4 py-2 rounded bg-black text-white hover:bg-gray-600 transition text-sm">
              Sign Up
            </button>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Empower Your Child's Learning with AI!
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">
          Personalized learning for children aged 2-8. Powered by advanced AI technology to adapt to your child's unique learning style and pace.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Link to="/signup" className="text-black hover:underline">
          <button className="px-6 py-3 rounded bg-black text-white hover:bg-gray-600 transition">
            Get Started
          </button>
          </Link>
          <button className="px-6 py-3 rounded border border-black text-black hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </section>
{/* Slider Section */}
<section className="w-full">
  <img src="/slider.jpeg" alt="Slider" className="w-full h-auto object-cover" />
</section>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-12 max-w-6xl mx-auto">
        <FeatureCard
          icon={<BookOpen className="text-blue-500 w-6 h-6 mb-2" />}
          title="Interactive Quizzes"
          description="Engage your child with fun and educational quizzes designed to enhance learning through play."
        />
        <FeatureCard
          icon={<BarChart2 className="text-green-500 w-6 h-6 mb-2" />}
          title="Progress Tracking"
          description="Monitor your child's learning journey with detailed progress reports and personalized insights."
        />
        <FeatureCard
          icon={<ShoppingBag className="text-pink-500 w-6 h-6 mb-2" />}
          title="Educational Store"
          description="Access a curated collection of educational resources and learning materials."
        />
        <FeatureCard
          icon={<Brain className="text-purple-500 w-6 h-6 mb-2" />}
          title="AI Tutoring"
          description="Personalized AI-powered tutoring that adapts to your child's learning pace and style."
        />
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 py-8 px-4">
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4 text-center">
          <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Terms of Service</span>
          <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Privacy Policy</span>
        </div>
        <div className="text-center text-gray-500 text-sm">
          © 2025 Learnymation. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
    <div className="flex flex-col items-center text-center">
      {icon}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default HomePage;
