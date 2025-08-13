import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AgTable from "@/components/common/AgTable";

const columns = [
  { headerName: "Media ID", field: "mediaId", flex: 1 },
  { headerName: "State", field: "state", flex: 1 },
  { headerName: "City", field: "city", flex: 1 },
  { headerName: "Area", field: "area", flex: 1 },
  { headerName: "Media Type", field: "mediaType", flex: 1 },
  { headerName: "Landmark", field: "landmark", flex: 1 },
  { headerName: "Media Property", field: "mediaProperty", flex: 1 },
  { headerName: "Vendor", field: "vendor", flex: 1 },
  { headerName: "Start Date", field: "startDate", flex: 1 },
  { headerName: "End Date", field: "endDate", flex: 1 },
  { headerName: "Salesperson", field: "salesperson", flex: 1 },
];

const data = [
  {
    mediaId: "3308167",
    state: "Uttar Pradesh",
    city: "Bareilly",
    area: "Ayub khan Chouraha",
    mediaType: "Unipole",
    landmark: "Gammon Mall",
    mediaProperty: "Self",
    vendor: "Self",
    startDate: "08/01/2025",
    endDate: "08/30/2025",
    salesperson: "Rahul Sharma",
  },
  {
    mediaId: "1461354",
    state: "Uttar Pradesh",
    city: "Bareilly",
    area: "Opp. Company Garden",
    mediaType: "Unipole",
    landmark: "Savarkar Setu RRL",
    mediaProperty: "Self",
    vendor: "Self",
    startDate: "08/01/2025",
    endDate: "08/30/2025",
    salesperson: "Rahul Sharma",
  },
  {
    mediaId: "1553017",
    state: "Uttar Pradesh",
    city: "Bareilly",
    area: "Ayub khan Chouraha",
    mediaType: "Unipole",
    landmark: "Narayan Nagar Market",
    mediaProperty: "Self",
    vendor: "Self",
    startDate: "08/01/2025",
    endDate: "08/30/2025",
    salesperson: "Rahul Sharma",
  },
  {
    mediaId: "1539787",
    state: "Uttar Pradesh",
    city: "Bareilly",
    area: "Choupla Chauraha",
    mediaType: "Unipole",
    landmark: "Barkatullah University",
    mediaProperty: "Self",
    vendor: "Self",
    startDate: "08/01/2025",
    endDate: "08/30/2025",
    salesperson: "Rahul Sharma",
  },
];

export default function MediaExpiryTracker() {
  const [startDate, setStartDate] = useState("01/08/2025");
  const [endDate, setEndDate] = useState("31/08/2025");

  return (
    <div className="min-h-screen p-8 bg-[#f7fcfc]">
   
         <h2 className="text-xl tracking-tight mb-6">
        Media{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
          Expiry Tracker
        </span>
      </h2>
      <div className="flex justify-end mb-2">
        <Button className="bg-[#4b6e6e] text-white">Go To App Dashboard</Button>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-base font-semibold mb-4 text-[#4b6e6e]">MEDIA EXPIRY REPORT</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date<span className="text-red-500">*</span></label>
            <Input
              type="text"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date<span className="text-red-500">*</span></label>
            <Input
              type="text"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button className="bg-[#4b6e6e] text-white">Show</Button>
            <Button className="bg-[#b2cfcf] text-[#4b6e6e]">Reset</Button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-2 font-semibold text-[#4b6e6e]">All Media</div>
        <AgTable
          rowData={data}
          columnDefs={columns}
          height="350px"
        />
      </div>
    </div>
  );
}