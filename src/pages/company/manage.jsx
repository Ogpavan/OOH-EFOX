import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManageCompany() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true);
      try {
        const CompanyId = localStorage.getItem("CompanyID");
        const loginId = localStorage.getItem("loginId");
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/client/CompanyList`,
          {
            CompanyId,
            loginId,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setCompanies(response.data);
      } catch (error) {
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, []);

  const handleRowClick = (company) => {
    navigate(`/company/view/${company.ClientCompanyId}`);
  };

  return (
    <div className="min-h-screen p-8 page-fade-in">
      <div className="flex items-center">
        <BackButton />
        <h2 className="text-xl tracking-tight">
          Manage <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>Company</span>
        </h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 my-4 mt-8 items-end">
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
              <TableHead>Company Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Show 5 skeleton rows while loading
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell className="text-center"><Skeleton className="h-4 w-8 mx-auto" /></TableCell>
                </TableRow>
              ))
            ) : companies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No companies found.
                </TableCell>
              </TableRow>
            ) : (
              companies.map((company) => (
                <TableRow
                  key={company.ClientCompanyId}
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleRowClick(company)}
                >
                  <TableCell>{company.ClientCompanyName}</TableCell>
                  <TableCell>{company.Phone}</TableCell>
                  <TableCell>{company.Email}</TableCell>
                  <TableCell>{company.CreatedBY}</TableCell>
                  <TableCell>{company.CreatedDate}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100" onClick={e => e.stopPropagation()}>
                      <Trash2 size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft size={18} />
          </Button>
          <span className="text-sm">Page 1</span>
          <Button variant="ghost" size="icon">
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}