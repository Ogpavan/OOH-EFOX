import React from "react";
import { useNavigate } from "react-router-dom";
import AgTable from "@/components/common/AgTable";

const staffList = [
  {
    id: 1,
    name: "Mohit Sharma",
    email: "mohit@company.com",
    phone: "9876543210",
    department: "IT",
    designation: "Manager",
    status: "Active",
    createdBy: "Admin",
    createdDate: "2025-08-01",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@company.com",
    phone: "9123456789",
    department: "HR",
    designation: "Executive",
    status: "Inactive",
    createdBy: "Yash",
    createdDate: "2025-07-15",
  },
  // Add more dummy staff data as needed
];

const columnDefs = [
  { headerName: "Name", field: "name", flex: 1, filter: true },
  { headerName: "E-Mail", field: "email", flex: 1, filter: true },
  { headerName: "Mobile No.", field: "phone", flex: 1, filter: true },
  { headerName: "Department", field: "department", flex: 1, filter: true },
  { headerName: "Designation", field: "designation", flex: 1, filter: true },
  { headerName: "Status", field: "status", flex: 1, filter: true },
  { headerName: "Created By", field: "createdBy", flex: 1, filter: true },
  { headerName: "Created Date", field: "createdDate", flex: 1, filter: true },
];

export default function ManageStaff() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 page-fade-in">
      
      <h2 className="text-xl tracking-tight mb-6">
        Manage{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
          Employee
        </span>
      </h2>
      <AgTable
        rowData={staffList}
        columnDefs={columnDefs}
        onRowClicked={(row) => navigate(`/staff/view/${row.data.id}`)}
        height="500px"
      />
    </div>
  );
}