import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("Sign in:", formData);
    navigate("company/add")
  };

  return (
    <div className="min-h-screen flex page-fade-in">
      {/* Left Side - Illustration */}
      <div className="absolute inset-0 bg-[url('/background.webp')] bg-cover opacity-80 bg-center z-[-1]"></div>

      {/* Right Side - Login Form */}
      <div className=" flex-1   flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              OOH <span style={{ color: "#EC5800" }}>Manager</span>
            </h1>
            <p className="text-gray-600">Welcome to OOH Manager</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Username or Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full"
                required
              />
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
            >
              Sign In
            </Button>

           

           

             
          </form>
        </Card>
      </div>
    </div>
  );
}