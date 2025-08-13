import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import AgTable from "@/components/common/AgTable";
import { FaFileExcel, FaFilePowerpoint, FaShareAlt, FaTrash, FaEllipsisV, FaTimes, FaClock } from "react-icons/fa";

const orderList = [
  {
    id: 1,
    sno: 1,
    orderID: "ODRID2139032",
    proposalCode: "PROP16250805005203",
    campaignName: "Freedom Sale",
    customerName: "Yogesh Duvedi",
    startDate: "2025-08-01",
    endDate: "2025-08-30",
    orderStatus: "InProcess",
    salesPerson: "Rahul Sharma",
    orderDate: "Aug 5 2025 4:22PM",
    operationPerson: "Sanjay Binjola",
  },
  {
    id: 2,
    sno: 2,
    orderID: "ODRID9989391",
    proposalCode: "PROP67250808494904",
    campaignName: "Freedom125",
    customerName: "Tushar Sharma",
    startDate: "2025-08-15",
    endDate: "2025-09-14",
    orderStatus: "InProcess",
    salesPerson: "Yash",
    orderDate: "Aug 8 2025 5:05PM",
    operationPerson: "Sanjay Binjola",
  },
];

// Timeline Popup Component
const TimelinePopup = ({ isOpen, onClose, orderData }) => {
  if (!isOpen) return null;

  const timelineData = [
    { date: "Aug 5 2025", time: "4:22PM", status: "Order Created", person: "Rahul Sharma" },
    { date: "Aug 6 2025", time: "10:30AM", status: "Order Confirmed", person: "Sanjay Binjola" },
    { date: "Aug 7 2025", time: "2:15PM", status: "Production Started", person: "Sanjay Binjola" },
    { date: "Aug 10 2025", time: "11:00AM", status: "In Progress", person: "Sanjay Binjola" },
  ];

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Order Timeline - {orderData?.orderID}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {timelineData.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{item.status}</p>
                      <p className="text-sm text-gray-600">By {item.person}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{item.date}</p>
                      <p className="text-sm text-gray-600">{item.time}</p>
                    </div>
                  </div>
                  {index < timelineData.length - 1 && <div className="w-px h-6 bg-gray-200 ml-1.5 mt-2"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Timeline Cell Component
const TimelineCell = (params) => {
  const [showTimeline, setShowTimeline] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="text-blue-600 hover:text-orange-600 p-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            setShowTimeline(true);
          }}
        >
          <FaClock className="text-center" size={16} />
        </button>
      </div>
      <TimelinePopup
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        orderData={params.data}
      />
    </>
  );
};

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
  { headerName: "S.No.", field: "sno", flex: 0.5, filter: true },
  { headerName: "OrderID", field: "orderID", flex: 1, filter: true },
  { headerName: "Proposal Code", field: "proposalCode", flex: 1, filter: true },
  { headerName: "Campaign Name", field: "campaignName", flex: 1, filter: true },
  { headerName: "Customer Name", field: "customerName", flex: 1, filter: true },
  { headerName: "Start Date", field: "startDate", flex: 1, filter: true },
  { headerName: "End Date", field: "endDate", flex: 1, filter: true },
  { headerName: "Order Status", field: "orderStatus", flex: 1, filter: true },
  { headerName: "Sales Person", field: "salesPerson", flex: 1, filter: true },
  { headerName: "Order Date", field: "orderDate", flex: 1, filter: true },
  { headerName: "Operation Person", field: "operationPerson", flex: 1, filter: true },
  { headerName: "Timeline", field: "timeline", flex: 1, cellRenderer: TimelineCell },
];

export default function OrderManage() {
  const navigate = useNavigate();

  return (
    <div className=" p-8 page-fade-in">
      <div className="mb-4 text-sm text-gray-600">
        <span className="font-semibold">Home</span> &bull; <span>Manage Order</span>
      </div>
      <h2 className="text-xl tracking-tight mb-6">
        Manage{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
          Order
        </span>
      </h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Order Details</h3>
        <div className="mb-4 flex justify-between items-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            <FaFileExcel size={16} /> Excel
          </button>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Search:</label>
            <input 
              type="text" 
              className="border rounded px-3 py-1 text-sm"
              placeholder="Search..."
            />
          </div>
        </div>
        <AgTable
          rowData={orderList}
          columnDefs={columnDefs}
          height="250px"
        />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <span>Showing 1 to 2 of 2 entries</span>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 border rounded hover:bg-gray-100">← Previous</button>
            <span className="px-2 py-1 bg-blue-500 text-white rounded">1</span>
            <button className="px-2 py-1 border rounded hover:bg-gray-100">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}