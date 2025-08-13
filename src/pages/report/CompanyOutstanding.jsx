import React, { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const companyData = [
  {
    sno: 1,
    name: "Efox Technogies Pvt Ltd",
    type: "Client",
    outstanding: "₹3,12,724.00",
  },
  {
    sno: 2,
    name: "inventive",
    type: "Client",
    outstanding: "₹1,00,000.00",
  },
];

export default function CompanyOutstanding() {
  const [company, setCompany] = useState("All");

  return (
    <div className="min-h-screen p-8 page-fade-in">
      
      <h2 className="text-xl tracking-tight mb-6">
        Company{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
       Outstanding
        </span>
      </h2>
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-2 font-semibold text-[#4b6e6e] flex items-center gap-2">
          <span className="material-icons">table_chart</span>
          Company Orders
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Filter by Company:</label>
          <Select value={company} onValueChange={setCompany}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Efox Technogies Pvt Ltd">Efox Technogies Pvt Ltd</SelectItem>
              <SelectItem value="inventive">inventive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-[#e6f6f6]">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Sr. No</th>
                <th className="px-4 py-2 text-left font-medium">Company Name</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Total Outstanding</th>
                <th className="px-4 py-2 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {companyData
                .filter((row) => company === "All" || row.name === company)
                .map((row) => (
                  <tr key={row.sno} className="border-t">
                    <td className="px-4 py-2">{row.sno}</td>
                    <td className="px-4 py-2">{row.name}</td>
                    <td className="px-4 py-2">{row.type}</td>
                    <td className="px-4 py-2">{row.outstanding}</td>
                    <td className="px-4 py-2">
                      <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-6">View</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}