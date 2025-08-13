import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AgTable from "@/components/common/AgTable";

export default function Add() {
  const [selectedData, setSelectedData] = useState([]);

  // Sample data for the table
  const mediaData = [
    {
      sno: 1,
      code: "MED001",
      image: "billboard1.jpg",
      mediaType: "Billboard",
      availability: "Available",
      state: "Uttar Pradesh",
      city: "Lucknow",
      area: "Hazratganj",
      landmark: "GPO",
      side: "East",
      lit: "Lit",
      mediaProperty: "Premium",
      qty: 1,
      wxh: "20x10",
      totalArea: 200,
      rental: 15000,
      mountingRate: 5000,
      printingRate: 8000
    },
    // Add more sample data as needed
  ];

  const columnDefs = [
    { headerName: "", field: "select", flex: 0.3, checkboxSelection: true, headerCheckboxSelection: true },
    { headerName: "S.No.", field: "sno", flex: 0.5 },
    { headerName: "Code", field: "code", flex: 0.8 },
    { headerName: "Image", field: "image", flex: 0.8 },
    { headerName: "Media Type", field: "mediaType", flex: 1 },
    { headerName: "Availability", field: "availability", flex: 1 },
    { headerName: "State", field: "state", flex: 1 },
    { headerName: "City", field: "city", flex: 1 },
    { headerName: "Area", field: "area", flex: 1 },
    { headerName: "Landmark", field: "landmark", flex: 1 },
    { headerName: "Side", field: "side", flex: 0.7 },
    { headerName: "LIT", field: "lit", flex: 0.6 },
    { headerName: "Media Property", field: "mediaProperty", flex: 1.2 },
    { headerName: "QTY", field: "qty", flex: 0.6 },
    { headerName: "W X H", field: "wxh", flex: 0.8 },
    { headerName: "Total Area", field: "totalArea", flex: 1 },
    { headerName: "Rental", field: "rental", flex: 0.8 },
    { headerName: "Mounting Rate", field: "mountingRate", flex: 1.2 },
    { headerName: "Printing Rate", field: "printingRate", flex: 1.2 },
  ];

  return (
    <div className="min-h-screen p-8 page-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
       
           <h2 className="text-xl tracking-tight mb-6">
        Make{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
       Purchase Order
        </span>
      </h2>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Purchase Order List</Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Add New</Button>
        </div>
      </div>

      {/* Contact Details Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium mb-4 text-gray-700">CONTACT DETAILS</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Company<span className="text-red-500">*</span></label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="--Select Company--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company1">Company 1</SelectItem>
                <SelectItem value="company2">Company 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Purchase Order Number<span className="text-red-500">*</span></label>
            <Input placeholder="Purchase Order Number" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Purchase Order Date<span className="text-red-500">*</span></label>
            <Input type="date" placeholder="dd-mm-yyyy" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Sales Person<span className="text-red-500">*</span></label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="----Select Person-----" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="person1">Sales Person 1</SelectItem>
                <SelectItem value="person2">Sales Person 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Contact<span className="text-red-500">*</span></label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select Contact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contact1">Contact 1</SelectItem>
                <SelectItem value="contact2">Contact 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">From Date<span className="text-red-500">*</span></label>
            <Input type="date" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">To Date<span className="text-red-500">*</span></label>
            <Input type="date" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Total Day</label>
            <Input placeholder="Total Days" readOnly />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Delivery Date<span className="text-red-500">*</span></label>
            <Input type="date" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Remark</label>
            <Input placeholder="Enter remarks" />
          </div>
        </div>
      </section>

      {/* Media Selection Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Genre<span className="text-red-500">*</span></label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="billboard">Billboard</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Media Type<span className="text-red-500">*</span></label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="indoor">Indoor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Media Property</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="--Select State--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="up">Uttar Pradesh</SelectItem>
                <SelectItem value="dl">Delhi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Search</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lucknow">Lucknow</SelectItem>
                <SelectItem value="kanpur">Kanpur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Area</label>
            <Input placeholder="Area" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Availability<span className="text-red-500">*</span></label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input type="radio" name="availability" value="available" className="mr-2" defaultChecked />
                Available
              </label>
              <label className="flex items-center">
                <input type="radio" name="availability" value="all" className="mr-2" />
                All Media
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Data Table Section */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4 flex justify-end">
          <Input 
            placeholder="Search here..." 
            className="w-64"
          />
        </div>
        
        <AgTable
          rowData={mediaData}
          columnDefs={columnDefs}
          height="400px"
          rowSelection="multiple"
          onSelectionChanged={(params) => {
            setSelectedData(params.api.getSelectedRows());
          }}
        />
        
        <div className="flex justify-end mt-6">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
            Create Purchase Order
          </Button>
        </div>
      </section>
    </div>
  );
}