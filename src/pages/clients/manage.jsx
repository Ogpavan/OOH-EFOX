import React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

const companies = [
  {
    id: 1,
    name: "Acme Corp",
    phone: "9876543210",
    email: "info@acme.com",
    status: "Active",
    createdBy: "Admin",
    createdDate: "2025-08-01",
  },
  {
    id: 2,
    name: "Globex Ltd",
    phone: "9123456789",
    email: "contact@globex.com",
    status: "Inactive",
    createdBy: "Yash",
    createdDate: "2025-07-15",
  },
  // Add more dummy data as needed
];

export default function ManageClient() {
  const navigate = useNavigate();

  const handleRowClick = (client) => {
    // Pass client id in route for details page
    navigate(`/clients/view/${client.id}`);
  };

  return (
    <div className="min-h-screen p-8 page-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl tracking-tight">
          Manage <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>Client</span>
        </h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Search Name</label>
          <Input placeholder="Company Name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Created By</label>
          <Input placeholder="User Name" />
        </div>
        <Button className="mt-6">Filter</Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm p-4 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company, idx) => (
              <TableRow
                key={company.id}
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleRowClick(company)}
              >
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${company.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {company.status}
                  </span>
                </TableCell>
                <TableCell>{company.createdBy}</TableCell>
                <TableCell>{company.createdDate}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100" onClick={e => e.stopPropagation()}>
                    <Trash2 size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft size={18} />
          </Button>
          <span className="text-sm">Page 1 of 3</span>
          <Button variant="ghost" size="icon">
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}