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

export default function AddVendors() {
  return (
    <div className="min-h-screen p-8 page-fade-in">
      <h2 className="text-xl font-light tracking-tight mb-6">
        Add{" "}
        <span
          className="font-bold text-3xl"
          style={{ color: "#EC5800" }}
        >
          Vendor
        </span>
      </h2>
      <form className="space-y-6">
        {/* Add Vendor */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Add Vendor</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Vendor Code<span className="text-red-500">*</span>
              </label>
              <Input placeholder="Vendor Code" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Organization Name<span className="text-red-500">*</span>
              </label>
              <Input placeholder="Organization Name" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Organization PhoneNo<span className="text-red-500">*</span>
              </label>
              <Input placeholder="Organization PhoneNo" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Organization Email
              </label>
              <Input placeholder="Organization Email" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact person<span className="text-red-500">*</span>
              </label>
              <Input placeholder="Contact Person" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Person's PhoneNo
              </label>
              <Input placeholder="Person's PhoneNo" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Person's Email
              </label>
              <Input placeholder="Person's Email" />
            </div>
          </div>
        </section>

        {/* Address Details */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Address Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lucknow">Lucknow</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  {/* Add more cities as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <Input placeholder="Address" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LandMark</label>
              <Input placeholder="LandMark" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <Input placeholder="Pincode" />
            </div>
          </div>
        </section>

        {/* Person Identity */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Person Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Aadhar Number
              </label>
              <Input placeholder="Aadhar Number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pan Number</label>
              <Input placeholder="Pan Number" />
            </div>
          </div>
        </section>

        {/* Company Identity */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Company Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pan Number</label>
              <Input placeholder="Pan Number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GST No.</label>
              <Input placeholder="GST No." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Account Number
              </label>
              <Input placeholder="Account Number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">IFSC Code</label>
              <Input placeholder="IFSC Code" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bank Name</label>
              <Input placeholder="Bank Name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Branch</label>
              <Input placeholder="Branch" />
            </div>
          </div>
        </section>

        {/* Working Location */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Working Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lucknow">Lucknow</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  {/* Add more cities as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Area</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="select Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hazratganj">Hazratganj</SelectItem>
                  <SelectItem value="Connaught Place">Connaught Place</SelectItem>
                  {/* Add more areas as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Media Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="select Media Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hoarding">Hoarding</SelectItem>
                  <SelectItem value="Banner">Banner</SelectItem>
                  {/* Add more media types as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Team Size</label>
              <Input placeholder="Team Size" />
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
