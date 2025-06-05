import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext"; // Adjust the import path as necessary


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });

      const data = response.data;
      login(data.user); // Assuming login function sets user context
      localStorage.setItem("token", data.token);

      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center  ">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6">
        <div className="text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto h-24 w-28" />
          <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Please sign in to your account
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
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
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          {/* Password */}
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
                required
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full text-white bg-black py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Sign in
          </button>
        </form>

        {/* Signup */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Sign up
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

export default Signin;
