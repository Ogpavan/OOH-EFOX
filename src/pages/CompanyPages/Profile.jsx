import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Dummy profile until API is integrated */
const DUMMY_PROFILE = {
  id: 7895,
  name: "Invertis University",
  designation: "Institution",
  company: "Invertis University",
  email: "info@invertis.edu",
  phone: "9855774556",
  avatar: null,
  address: {
    address: "Sector-1, Bareilly Road",
    locality: "Near Bus Stand",
    city: "Bareilly",
    state: "Uttar Pradesh",
    pincode: "243123",
  },
  contacts: [
    { name: "Umesh Gautam", phone: "9898484441", email: "harshgoyal16@gmail.com" },
    { name: "Mr. Anil Dutt", phone: "9674451894", email: "commercial@khushiadvertising.com" },
  ],
  meta: { createdBy: "Yash", createdOn: "2023-09-13" },
};

export default function Profile({ initialData = null }) {
  const navigate = useNavigate();
  const [data] = useState(initialData || DUMMY_PROFILE);

  const { name, designation, company, email, phone, avatar, address = {}, contacts = [], meta = {} } = data;
  const initials = name ? name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase() : "NA";

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold overflow-hidden">
            {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : initials}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{name}</h1>
            <div className="text-sm text-gray-600">
              {designation} {company ? ` • ${company}` : null}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {meta.createdBy ? `Created by ${meta.createdBy}` : null}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded text-sm"
            onClick={() => navigate(`/company/edit/${data.id}`)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-gray-100 rounded text-sm"
            onClick={() => window.print()}
          >
            Print
          </button>
        </div>
      </div>

      {/* Contact / Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-sm text-gray-500 mb-2">Contact</h3>
          <div className="text-sm">
            <strong>Email:</strong> <span className="text-gray-700">{email || "—"}</span>
          </div>
          <div className="text-sm mt-1">
            <strong>Phone:</strong> <span className="text-gray-700">{phone || "—"}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm md:col-span-2">
          <h3 className="text-sm text-gray-500 mb-2">Address</h3>
          <div className="text-sm text-gray-700">
            {address.address || "—"}
            {address.locality ? <><br />{address.locality}</> : null}
            {address.city ? <><br />{address.city}, {address.state}</> : null}
            {address.pincode ? <><br />PIN: {address.pincode}</> : null}
          </div>
        </div>
      </div>

      {/* Contacts list */}
      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Contacts</h3>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {contacts.length} contact{contacts.length !== 1 ? "s" : ""}
            </span>
            <button
              className="text-sm px-2 py-1 border rounded"
              onClick={() => navigate(`/company/${data.id}/contacts/add`)}
            >
              Add Contact
            </button>
          </div>
        </div>

        {contacts.length === 0 ? (
          <div className="text-sm text-gray-500">No contacts</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-600">
                <tr>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Phone</th>
                  <th className="pb-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">{c.name}</td>
                    <td className="py-2">{c.phone}</td>
                    <td className="py-2">{c.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Meta / raw JSON (for debugging) */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h3 className="font-medium mb-2">Raw data</h3>
        <pre className="text-xs text-gray-600 max-h-60 overflow-auto p-2 bg-gray-50 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}