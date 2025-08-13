import React from "react";
import { Button } from "@/components/ui/button";
import AgTable from "@/components/common/AgTable";
import { Filter, Pencil, Trash2, Eye } from "lucide-react";

const mediaList = [
  {
    code: "BQS02",
    image: "/images/media1.jpg",
    city: "Bareilly",
    area: "Ayub khan Chouraha",
    landmark: "Gammon Mall",
    side: "RRL, AMPRI",
    media: "Unipole",
    qty: 1,
    wh: "50ftX8ft",
    totalArea: "400 Sqft",
    lit: "back lit",
    mediaProperty: "Self",
    status: "Active",
  },
  {
    code: "BQS03",
    image: "/images/media2.jpg",
    city: "Bareilly",
    area: "Opp. Company Garden",
    landmark: "Savarkar Setu RRL",
    side: "RRL, AMPRI",
    media: "Unipole",
    qty: 1,
    wh: "50ftX8ft",
    totalArea: "400 Sqft",
    lit: "front lit",
    mediaProperty: "Self",
    status: "Active",
  },
  // ...add more dummy data as needed
];

const columnDefs = [
  { headerName: "S.No.", valueGetter: "node.rowIndex + 1", width: 70 },
  {
    headerName: "Action",
    field: "action",
    width: 110,
    cellRenderer: (params) => (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" title="View">
          <Eye size={16} className="text-green-600" />
        </Button>
        <Button variant="ghost" size="icon" title="Edit">
          <Pencil size={16} className="text-blue-600" />
        </Button>
        <Button variant="ghost" size="icon" title="Delete">
          <Trash2 size={16} className="text-red-600" />
        </Button>
      </div>
    ),
  },
  { headerName: "Code", field: "code", width: 100 },
  {
    headerName: "Image",
    field: "image",
    width: 120,
    cellRenderer: (params) => (
      <img
        src={params.value}
        alt={params.data.code}
        className="h-12 w-20 object-cover rounded border"
      />
    ),
  },
  { headerName: "City", field: "city", width: 120 },
  { headerName: "Area", field: "area", width: 160 },
  { headerName: "Landmark", field: "landmark", width: 160 },
  { headerName: "Side", field: "side", width: 120 },
  { headerName: "Media", field: "media", width: 120 },
  { headerName: "Qty", field: "qty", width: 70 },
  { headerName: "W X H", field: "wh", width: 110 },
  { headerName: "Total Area", field: "totalArea", width: 110 },
  { headerName: "Lit", field: "lit", width: 110 },
  { headerName: "MediaProperty", field: "mediaProperty", width: 120 },
  {
    headerName: "Status",
    field: "status",
    width: 100,
    cellRenderer: (params) => (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          params.value === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {params.value}
      </span>
    ),
  },
];

export default function ManageMedia() {
  return (
    <div className="min-h-screen p-8 page-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl tracking-tight mb-6">
          All{" "}
          <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
            Type Media
          </span>
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1 items-center">
            <Filter size={16} /> Filter
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <AgTable
          rowData={mediaList}
          columnDefs={columnDefs}
          height="60vh"
          className="ag-theme-alpine"
        />
      </div>
    </div>
  );
}