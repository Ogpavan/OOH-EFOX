import React, { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const campaignData = [
  {
    CampaignName: "Freedom Sale",
    OrderId: "ODRDI2139032",
    ProposalCode: "PROP16250805005203",
    CustomerName: "Yogesh Duvedi",
    StartDate: "2025-08-01",
    EndDate: "2025-08-30",
    Salesperson: "Rahul Sharma",
  },
];

export default function MediaCampaignTracker() {
  const [campaign, setCampaign] = useState("Running Campaign");
  const [client, setClient] = useState("Efox Technogies Pvt Ltd");

  return (
    <div className="min-h-screen p-8 page-fade-in">
     

         <h2 className="text-xl tracking-tight mb-6">
        Media{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
          Campaign Tracker
        </span>
      </h2>

      {/* Campaign Report Filters */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">CAMPAIGN REPORT</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Campaign</label>
            <Select value={campaign} onValueChange={setCampaign}>
              <SelectTrigger>
                <SelectValue placeholder="Select Campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Running Campaign">Running Campaign</SelectItem>
                <SelectItem value="Completed Campaign">Completed Campaign</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Select Client</label>
            <Select value={client} onValueChange={setClient}>
              <SelectTrigger>
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Efox Technogies Pvt Ltd">Efox Technogies Pvt Ltd</SelectItem>
                <SelectItem value="ABC Pvt Ltd">ABC Pvt Ltd</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-6">Show</Button>
            <Button className="bg-gray-300 hover:bg-gray-400 text-[#4b6e6e] rounded-md px-6">Reset</Button>
          </div>
        </div>
      </section>

      {/* Revenue Table */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-2 font-semibold text-[#4b6e6e] flex items-center gap-2">
          <span className="material-icons">table_chart</span>
          All Revenue
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-[#e6f6f6]">
              <tr>
                <th className="px-4 py-2 text-left font-medium">CampaignName</th>
                <th className="px-4 py-2 text-left font-medium">OrderId</th>
                <th className="px-4 py-2 text-left font-medium">ProposalCode</th>
                <th className="px-4 py-2 text-left font-medium">CustomerName</th>
                <th className="px-4 py-2 text-left font-medium">StartDate</th>
                <th className="px-4 py-2 text-left font-medium">EndDate</th>
                <th className="px-4 py-2 text-left font-medium">Salesperson</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{row.CampaignName}</td>
                  <td className="px-4 py-2">{row.OrderId}</td>
                  <td className="px-4 py-2">{row.ProposalCode}</td>
                  <td className="px-4 py-2">{row.CustomerName}</td>
                  <td className="px-4 py-2">{row.StartDate}</td>
                  <td className="px-4 py-2">{row.EndDate}</td>
                  <td className="px-4 py-2">{row.Salesperson}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}