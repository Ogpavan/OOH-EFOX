import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import AgTable from "@/components/common/AgTable";
import { Edit2, Trash2, View } from "lucide-react";
import { FaEllipsisV, FaShareAlt, FaFileExcel, FaFilePowerpoint, FaTrash } from "react-icons/fa";

function getStatusColor(status) {
  switch (status) {
    case "New": return "bg-blue-100 text-blue-700";
    case "Contacted": return "bg-yellow-100 text-yellow-700";
    case "In Progress": return "bg-orange-100 text-orange-700";
    case "Converted": return "bg-green-100 text-green-700";
    case "Lost": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
}

const mockLeads = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    source: "Website",
    assignedTo: "Alice",
    status: "New"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9123456780",
    source: "Referral",
    assignedTo: "Bob",
    status: "Contacted"
  }
  // ...more leads
];

// Custom action cell with 3 dots menu
const ActionCell = (params) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    e.stopPropagation();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 5,
        left: rect.right - 140
      });
    }
    setOpen((prev) => !prev);
  };

  const handleOptionClick = (e, callback) => {
    e.stopPropagation();
    setOpen(false);
    if (callback) callback();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && !e.target.closest('.action-menu')) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const popup = open && (
    <div
      className="action-menu fixed bg-white border rounded shadow-lg flex flex-col min-w-[140px] z-[9999]"
      style={{
        top: position.top,
        left: position.left,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      }}
      onClick={e => e.stopPropagation()}
    >
      <button
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-black text-left"
        onClick={(e) => handleOptionClick(e, () => navigate(`/leads/details/${params.data.id}`))}
      >
        <View size={18} className="text-blue-600" /> View
      </button>
      <button
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-black text-left"
        onClick={(e) => handleOptionClick(e, () => navigate(`/leads/add?edit=${params.data.id}`))}
      >
        <Edit2 size={18} className="text-orange-600" /> Edit
      </button>
     
      <button
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-black text-left"
        onClick={(e) => handleOptionClick(e)}
      >
        <FaTrash size={18} className="text-red-600" /> Delete
      </button>
    </div>
  );

  return (
    <div className="flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
      <button
        ref={buttonRef}
        title="Actions"
        className="hover:bg-gray-100 p-1 rounded"
        onClick={handleMenuClick}
        type="button"
      >
        <FaEllipsisV size={18} />
      </button>
      {popup && createPortal(popup, document.body)}
    </div>
  );
};

const columnDefs = [
  { headerName: "Name", field: "name", flex: 1, filter: true },
  { headerName: "Email", field: "email", flex: 1, filter: true },
  { headerName: "Phone", field: "phone", flex: 1, filter: true },
  { headerName: "Source", field: "source", flex: 1, filter: true },
  { headerName: "Assigned To", field: "assignedTo", flex: 1, filter: true },
  {
    headerName: "Status",
    field: "status",
    flex: 1,
    cellRenderer: (params) => (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(params.value)}`}>
        {params.value}
      </span>
    ),
    filter: true
  },
  {
    headerName: "Actions",
    field: "actions",
    flex: 1,
    cellRenderer: ActionCell
  }
];

export default function LeadList() {
  const [filter, setFilter] = useState({ search: "", source: "", status: "", assignedTo: "" });
  const [leads] = useState(mockLeads);
  const navigate = useNavigate();

  // Filter logic (replace with API integration as needed)
  const filteredLeads = leads.filter(lead => {
    return (
      (!filter.search || lead.name.toLowerCase().includes(filter.search.toLowerCase()) || lead.email.toLowerCase().includes(filter.search.toLowerCase()) || lead.phone.includes(filter.search)) &&
      (!filter.source || lead.source === filter.source) &&
      (!filter.status || lead.status === filter.status) &&
      (!filter.assignedTo || lead.assignedTo.toLowerCase().includes(filter.assignedTo.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen p-8 page-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light tracking-tight">
          Lead <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>List</span>
        </h2>
        <Button className="bg-orange-600 text-white" onClick={() => navigate("/leads/add")}>Add Lead</Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-4">Filter Leads</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Search Name/Email/Phone"
              value={filter.search}
              onChange={e => setFilter({ ...filter, search: e.target.value })}
              className="w-full"
            />
            <Select value={filter.source} onValueChange={v => setFilter({ ...filter, source: v })}>
              <SelectTrigger className="w-full border rounded px-2 py-2">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Event">Event</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filter.status} onValueChange={v => setFilter({ ...filter, status: v })}>
              <SelectTrigger className="w-full border rounded px-2 py-2">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Assigned To"
              value={filter.assignedTo}
              onChange={e => setFilter({ ...filter, assignedTo: e.target.value })}
              className="w-full"
            />
            <Button className="bg-blue-500 text-white">Filter</Button>
          </div>
        </section>
        <section>
          <AgTable
            rowData={filteredLeads}
            columnDefs={columnDefs}
            context={{ navigate }}
            height="500px"
          />
        </section>
      </div>
    </div>
  );
}