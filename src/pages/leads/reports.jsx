import React from "react";
export default function LeadReports() {
  // Example analytics data
  const totalLeads = 120;
  const convertedLeads = 36;
  const conversionRate = ((convertedLeads / totalLeads) * 100).toFixed(1);
  const leadsPerSource = [
    { source: "Website", count: 60 },
    { source: "Referral", count: 40 },
    { source: "Event", count: 20 },
  ];

  return (
    <div className="min-h-screen p-8 page-fade-in">
      
      <h2 className="text-xl tracking-tight mb-6">
        Lead{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
         Reports
        </span>
      </h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Example: Basic charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-4">
            <h3 className="font-semibold mb-2">Total Leads</h3>
            <div className="text-3xl font-bold">{totalLeads}</div>
          </div>
          <div className="card p-4">
            <h3 className="font-semibold mb-2">Conversion Rate</h3>
            <div className="text-3xl font-bold">{conversionRate}%</div>
            <div className="text-xs text-gray-500 mt-1">{convertedLeads} converted</div>
          </div>
          <div className="card p-4">
            <h3 className="font-semibold mb-2">Leads per Source</h3>
            <ul className="text-sm">
              {leadsPerSource.map(src => (
                <li key={src.source} className="flex justify-between py-1">
                  <span>{src.source}</span>
                  <span className="font-bold">{src.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}