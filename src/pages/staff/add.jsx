import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AddStaff() {
  return (
    <div className="min-h-screen p-8 page-fade-in">
     
      <h2 className="text-xl font-light tracking-tight mb-6">
        ADD <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>EMPLOYEE</span>
      </h2>
      <form className="space-y-6">
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Add Employee</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name<span className="text-red-500">*</span></label>
              <Input placeholder="Name" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-Mail<span className="text-red-500">*</span></label>
              <Input type="email" placeholder="E-Mail" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile No.<span className="text-red-500">*</span></label>
              <Input placeholder="Mobile No." required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Employee Code<span className="text-red-500">*</span></label>
              <Input placeholder="Employee Code" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Birth Date</label>
              <Input type="date" placeholder="Birth Date" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Department<span className="text-red-500">*</span></label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="--Select Department--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  {/* Add more departments as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Designation<span className="text-red-500">*</span></label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="--Select Designation--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                  {/* Add more designations as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Join Date<span className="text-red-500">*</span></label>
              <Input type="date" placeholder="Join Date" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="--Select Gender---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reporting To<span className="text-red-500">*</span></label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select Reporting Person" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yash">Yash</SelectItem>
                  {/* Add more reporting persons as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role<span className="text-red-500">*</span></label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="--Select One--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                  {/* Add more roles as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select State<span className="text-red-500">*</span></label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Uttar Pradesh" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UP">Uttar Pradesh</SelectItem>
                  <SelectItem value="DL">Delhi</SelectItem>
                  <SelectItem value="MH">Maharashtra</SelectItem>
                  {/* Add more states as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City<span className="text-red-500">*</span></label>
              <Input placeholder="City" required />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-1">Address<span className="text-red-500">*</span></label>
              <Input placeholder="Address" required />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button type="submit">Submit</Button>
          </div>
        </section>
      </form>
    </div>
  );
}