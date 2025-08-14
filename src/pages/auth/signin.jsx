import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
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

    if (!formData.username) {
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
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setLoading(true);

      // API call
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
          {
            Username: formData.username,
            Password: formData.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );


        if (response.data.success) {
         showCustomToast({ type: "success", message: "Login Success" });
          // Store response data in localStorage
          localStorage.setItem("CompanyID", response.data.CompanyID);
          localStorage.setItem("loginId", response.data.loginId);
          localStorage.setItem("RoleID", response.data.RoleID);

          navigate("/company/add");
        } else {
          showCustomToast({ type: "error", message: "Invalid credentials" });
          // setErrors({ password: "Invalid credentials" });
        }

      } catch (error) {
         showCustomToast({ type: "error", message: "Invalid credentials" });
        // setErrors({ password: "Login failed. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex page-fade-in">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/background.webp')] bg-cover opacity-80 bg-center z-[-1]"></div>

      {/* Login Form Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-4">
            <img
              src="/OOHlogo.png"
              alt="OOH Logo"
              className="h-8 w-auto mx-auto mb-2"
            />
            <h2 className="text-lg font-bold text-slate-800 mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-600">
              Sign in to continue to your account
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            {/* Desktop Header */}
            <div className="hidden lg:block text-center mb-4">
              <img
                src="/OOHlogo.png"
                alt="OOH Logo"
                className="h-10 w-auto mx-auto mb-2"
              />
              <h2 className="text-xl font-bold text-slate-800 mb-1">Sign In</h2>
              <p className="text-sm text-slate-600">
                Enter your credentials to access your dashboard
              </p>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-4">
              <h2 className="text-lg font-bold text-slate-800">Sign In</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username/Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-xs font-semibold text-slate-700 flex items-center gap-1"
                >
                  Username / Email
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username or email"
                    value={formData.username}
                    onChange={handleUsernameChange}
                    className={`h-10 pl-3 pr-3 text-sm bg-slate-50/50 border-2 ${submitted && errors.username
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-500 hover:border-slate-300"
                      } rounded-sm transition-all duration-300 focus:bg-white`}
                    maxLength={50}
                  />
                </div>
                {submitted && errors.username && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold text-slate-700 flex items-center gap-1"
                >
                  <Lock className="w-3 h-3 text-blue-600" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className={`h-10 pl-3 pr-10 text-sm bg-slate-50/50 border-2 ${submitted && errors.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-500 hover:border-slate-300"
                      } rounded-sm transition-all duration-300 focus:bg-white`}
                    maxLength={25}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 rounded-sm hover:bg-slate-100 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-slate-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-600" />
                    )}
                  </Button>
                </div>
                {submitted && errors.password && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 hover:underline"
                  onClick={() => console.log("Forgot password clicked")}
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed rounded-sm disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm">Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-500">
                &copy; Powered By Efox Technologies Pvt Ltd
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}