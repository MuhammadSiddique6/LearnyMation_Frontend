import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");       // Controlled input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Controlled input
  const [showPassword, setShowPassword] = useState(false); // Toggle

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-1">
        <div className="text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto  h-24 w-28" />
          <h1 className="!text-2xl !md:text-3xl font-bold text-gray-800 ">
            Join Our LearningAdventure
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start your educational journeytoday
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18} />
              </span>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Email address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  boxShadow: "none",
                }}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>


          {/* Sign In */}
          <button
            type="submit"
            className="w-full text-white !bg-black py-2 rounded-lg hover:bg-gray-700-700 transition"
          >
            Sign Up
          </button>
        </form>




        {/* Sign up */}
        <p className="text-center text-sm text-gray-600 ">
          Don’t have an account?{" "}
           <Link to="/signin" className="text-black hover:underline">
    Sign in
  </Link>
        </p>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-3 space-y-1">
          <p>
            <Link to="/terms-and-conditions" className="hover:underline">Terms of Service</Link> ·{" "}
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link> ·{" "}
            <Link to="/contact-us" className="hover:underline">Contact Us</Link>
          </p>
          <p>© 2025 LEARNYMATION. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
