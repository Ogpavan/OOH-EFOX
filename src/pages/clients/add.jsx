import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AddClient() {
  return (
    <div className="min-h-screen p-8 page-fade-in">
      <h2 className="text-xl font-light tracking-tight mb-6">
        Add{" "}
        <span
          className="font-bold text-3xl"
          style={{ color: "#EC5800" }}
        >
          Client
        </span>
      </h2>
      <form className="space-y-6">
        {/* Add Contact */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Add Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Name<span className="text-red-500">*</span>
              </label>
              <Input placeholder="Contact Name" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile No<span className="text-red-500">*</span>
              </label>
              <Input placeholder="Mobile Number" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input placeholder="Email" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="--Select Company--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="globex">Globex Ltd</SelectItem>
                  {/* Add more companies as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Designation</label>
              <Input placeholder="Designation" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">About Contact</label>
              <Input placeholder="About Contact" />
            </div>
          </div>
        </section>

        {/* Address Details */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Address Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
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
              <label className="block text-sm font-medium mb-1">City</label>
              <Input placeholder="City" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Locality</label>
              <Input placeholder="Locality" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <Input placeholder="Pincode" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Birth Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Anniversary Date</label>
              <Input type="date" />
            </div>
            <div className="md:col-span-6">
              <label className="block text-sm font-medium mb-1">Address</label>
              <Input placeholder="Address" />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
