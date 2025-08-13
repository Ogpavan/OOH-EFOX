import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AgTable from "@/components/common/AgTable";

const columns = [
  { headerName: "S.No.", field: "sno", flex: 0.5 },
  { headerName: "Media Code", field: "mediaCode", flex: 1 },
  { headerName: "Image", field: "image", flex: 1 },
  { headerName: "Media Type", field: "mediaType", flex: 1 },
  { headerName: "State", field: "state", flex: 1 },
  { headerName: "City", field: "city", flex: 1 },
  { headerName: "Area", field: "area", flex: 1 },
  { headerName: "Side", field: "side", flex: 1 },
  { headerName: "Qty", field: "qty", flex: 0.7 },
  { headerName: "L X W", field: "lxw", flex: 1 },
  { headerName: "Total Area", field: "totalArea", flex: 1 },
  { headerName: "Availability", field: "availability", flex: 1 },
  { headerName: "Campaign Name", field: "campaignName", flex: 1 },
  { headerName: "Start Date", field: "startDate", flex: 1 },
  { headerName: "End Date", field: "endDate", flex: 1 },
];

// Dummy data, replace with actual data as needed
const data = [];

export default function MediaTracker() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen p-8 bg-[#f7fcfc]">
      
         <h2 className="text-xl tracking-tight mb-6">
        Media{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
       Tracker
        </span>
      </h2>
      

      {/* Search Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-base font-semibold mb-4 text-[#4b6e6e]">SEARCH</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Genre<span className="text-red-500">*</span></label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Outdoor Media" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outdoor">Outdoor Media</SelectItem>
                <SelectItem value="indoor">Indoor Media</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Media Type<span className="text-red-500">*</span></label>
            <Input value="Van Branding" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Uttar Pradesh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="up">Uttar Pradesh</SelectItem>
                <SelectItem value="dl">Delhi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Bareilly" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bareilly">Bareilly</SelectItem>
                <SelectItem value="lucknow">Lucknow</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Area</label>
            <Input placeholder="Select..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Availability</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">From Date</label>
            <Input type="text" value="12 Aug 2025" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To Date</label>
            <Input type="text" value="29 Aug 2025" readOnly />
          </div>
          <div className="flex items-end gap-2">
            <Button className="bg-[#4b6e6e] text-white">Search</Button>
            <Button className="bg-[#b2cfcf] text-[#4b6e6e]">Reset</Button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4 flex justify-between items-center">
          <Button className="bg-[#4b6e6e] text-white">Export</Button>
          <Input
            className="w-64"
            placeholder="Search here.."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <AgTable
          rowData={data}
          columnDefs={columns}
          height="350px"
        />
      </div>
    </div>
  );
}