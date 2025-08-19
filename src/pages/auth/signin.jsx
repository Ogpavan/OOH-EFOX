import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import axios from "axios";
import { showCustomToast } from "@/customcomponent/CustomToast";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username or Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const companyID = localStorage.getItem("CompanyID");
    const loginId = localStorage.getItem("loginId");
    const roleID = localStorage.getItem("RoleID");
    if (companyID && loginId && roleID) {
      navigate("/company/add");
    } else {
      localStorage.clear();
    }
  }, [navigate]);

  const handleUsernameChange = (e) => {
    setFormData({ ...formData, username: e.target.value });
    // Clear error on input change
    if (errors.username) {
      setErrors({ ...errors, username: "" });
    }
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
    // Clear error on input change
    if (errors.password) {
      setErrors({ ...errors, password: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
          {
            Username: formData.username.trim(),
            Password: formData.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.success) {
          showCustomToast({ type: "success", message: "Login Success" });
          localStorage.setItem("CompanyID", response.data.CompanyID);
          localStorage.setItem("loginId", response.data.loginId);
          localStorage.setItem("RoleID", response.data.RoleID);
          navigate("/company/add");
        } else {
          showCustomToast({ type: "error", message: "Invalid credentials" });
        }
      } catch (error) {
        showCustomToast({ type: "error", message: "Invalid credentials" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 page-fade-in">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[url('/background.webp')] bg-cover bg-center">
        <div className="absolute inset-0 "></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section - Better spacing */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <img
              src="/OOHlogo.png"
              alt="OOH Logo"
              className="h-12 w-auto mx-auto"
            />
          </div>
        
        </div>

        {/* Login Card - Improved glassmorphism */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field - Better structure */}
            <div>
              <Label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username or Email
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username or email"
                  value={formData.username}
                  onChange={handleUsernameChange}
                  className={`pl-10  h-10 ${
                    submitted && errors.username
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                  } transition-all duration-200`}
                  maxLength={50}
                  autoComplete="username"
                />
              </div>
              {submitted && errors.username && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password Field - Better structure */}
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  className={`pl-10 pr-12 h-10 ${
                    submitted && errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                  } transition-all duration-200`}
                  maxLength={25}
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {submitted && errors.password && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password - Better positioning */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
                onClick={() => console.log("Forgot password clicked")}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button - Better loading state */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Footer - Better spacing */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              &copy; Powered By Efox Technologies Pvt Ltd
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}