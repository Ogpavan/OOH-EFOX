import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function LeadDetails() {
    const navigate = useNavigate();
  // Example lead data (replace with API data)
  const lead = {
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    status: "New",
    interactions: [
      { id: 1, date: "2025-08-10", note: "Called client, no answer." },
      { id: 2, date: "2025-08-12", note: "Sent follow-up email." }
    ],
    documents: [
      { id: 1, name: "Proposal.pdf", url: "#" },
      { id: 2, name: "Contract.docx", url: "#" }
    ],
    followUps: [
      { id: 1, date: "2025-08-15", note: "Call client for update." }
    ]
  };

  return (
    <div className="min-h-screen p-8 page-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light tracking-tight">
          Lead <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>Details</span>
        </h2>
        <Button onClick={() =>navigate("/leads/list")} className="bg-blue-500 text-white">Back to List</Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Basic Info */}
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input value={lead.name} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input value={lead.email} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input value={lead.phone} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">{lead.status}</span>
            </div>
          </div>
        </section>
        {/* Interaction History */}
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-4">Interaction History</h3>
          <div className="bg-gray-50 rounded p-4">
            {lead.interactions.map(i => (
              <div key={i.id} className="mb-2">
                <span className="font-semibold">{i.date}:</span> {i.note}
              </div>
            ))}
          </div>
        </section>
        {/* Documents */}
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-4">Documents</h3>
          <div className="bg-gray-50 rounded p-4">
            {lead.documents.map(doc => (
              <div key={doc.id} className="mb-2">
                <a href={doc.url} className="text-blue-600 underline">{doc.name}</a>
              </div>
            ))}
          </div>
        </section>
        {/* Follow-Up Schedule */}
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-4">Follow-Up Schedule</h3>
          <div className="bg-gray-50 rounded p-4">
            {lead.followUps.map(fu => (
              <div key={fu.id} className="mb-2">
                <span className="font-semibold">{fu.date}:</span> {fu.note}
              </div>
            ))}
          </div>
        </section>
        {/* Status Update */}
        <section>
          <h3 className="text-lg font-medium mb-4">Update Status</h3>
          <div className="flex gap-4 items-center">
            <Select>
              <SelectTrigger className="w-48 border rounded px-2 py-2">
                <SelectValue placeholder="Change Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-orange-600 text-white">Update</Button>
          </div>
        </section>
      </div>
    </div>
  );
}