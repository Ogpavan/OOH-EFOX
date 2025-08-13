import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import AgTable from "@/components/common/AgTable";
import { FaFileExcel, FaFilePowerpoint, FaShareAlt, FaTrash, FaEllipsisV } from "react-icons/fa";

const proposalList = [
  {
    id: 1,
    proposalCode: "PROP67250808494904",
    companyName: "Inventive Infosoft",
    campaignName: "Freedom125",
    status: "Confirmed",
    contactPerson: "Tushar Sharma",
    contactNo: "9644715425",
    proposalDate: "08 Aug 2025",
    startDate: "15 Aug 2025",
    endDate: "14 Sep 2025",
    salesPerson: "Yash",
    createdBy: "Yash",
    createdDate: "Aug 8 2025 4:59PM",
  },
  {
    id: 2,
    proposalCode: "PROP16250805005203",
    companyName: "Efox Technogies Pvt Ltd",
    campaignName: "Freedom Sale",
    status: "Confirmed",
    contactPerson: "Yogesh Duvedi",
    contactNo: "9720028787",
    proposalDate: "05 Aug 2025",
    startDate: "01 Aug 2025",
    endDate: "30 Aug 2025",
    salesPerson: "Rahul Sharma",
    createdBy: "Yash",
    createdDate: "Aug 5 2025 3:56PM",
  },
  // Add more dummy proposal data as needed
];

// Custom action cell with 3 dots menu
const ActionCell = (params) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 5,
        left: rect.right - 140 // Align to right edge
      });
    }
    
    setOpen((prev) => !prev);
  };

  const handleOptionClick = (e, callback) => {
    e.stopPropagation();
    setOpen(false);
    if (callback) callback();
  };

  // Close popup when clicking outside
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
        onClick={(e) => handleOptionClick(e)}
      >
        <FaFileExcel size={18} className="text-green-600" /> Excel
      </button>
      <button
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-black text-left"
        onClick={(e) => handleOptionClick(e)}
      >
        <FaFilePowerpoint size={18} className="text-orange-600" /> PPT
      </button>
      <button
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-black text-left"
        onClick={(e) => handleOptionClick(e)}
      >
        <FaShareAlt size={18} className="text-blue-600" /> Share
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
  {
    headerName: "Proposal Code",
    field: "proposalCode",
    flex: 1,
    filter: true,
    cellRenderer: (params) => {
      const navigate = useNavigate();
      return (
        <button
          className="text-blue-600 underline font-semibold hover:text-orange-600"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/campaign/proposal/${params.data.id}`);
          }}
        >
          {params.value}
        </button>
      );
    },
  },
  { headerName: "Company Name", field: "companyName", flex: 1, filter: true },
  { headerName: "Campaign Name", field: "campaignName", flex: 1, filter: true },
  { headerName: "Status", field: "status", flex: 1, filter: true },
  { headerName: "Contact Person", field: "contactPerson", flex: 1, filter: true },
  { headerName: "Contact No.", field: "contactNo", flex: 1, filter: true },
  { headerName: "Proposal Date", field: "proposalDate", flex: 1, filter: true },
  { headerName: "Start Date", field: "startDate", flex: 1, filter: true },
  { headerName: "End Date", field: "endDate", flex: 1, filter: true },
  { headerName: "Sales Person", field: "salesPerson", flex: 1, filter: true },
  { headerName: "CreatedBy", field: "createdBy", flex: 1, filter: true },
  { headerName: "CreatedDate", field: "createdDate", flex: 1, filter: true },
  { headerName: "Action", field: "action", flex: 1, cellRenderer: ActionCell },
];

export default function ManageProposal() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 page-fade-in">
         <h2 className="text-xl tracking-tight mb-6">
        All{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
       Proposal
        </span>
      </h2>
      <AgTable
        rowData={proposalList}
        columnDefs={columnDefs}
        height="500px"
      />
    </div>
  );
}