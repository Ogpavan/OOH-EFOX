import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
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

export default function ManageMedia() {
  return (
    <div className="min-h-screen p-8 page-fade-in ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-light tracking-tight">
          <span className="font-bold text-2xl" style={{ color: "#EC5800" }}>All Type Media</span>
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button variant="outline" size="sm" className="flex gap-1 items-center">
            <Filter size={16} /> Filter
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="overflow-x-auto" style={{ maxHeight: "60vh" }}>
          <Table className="min-w-[1100px]">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-10">S.No.</TableHead>
                <TableHead className="w-20">Action</TableHead>
                <TableHead className="w-24">Code</TableHead>
                <TableHead className="w-32">Image</TableHead>
                <TableHead className="w-32">City</TableHead>
                <TableHead className="w-40">Area</TableHead>
                <TableHead className="w-40">Landmark</TableHead>
                <TableHead className="w-32">Side</TableHead>
                <TableHead className="w-32">Media</TableHead>
                <TableHead className="w-16">Qty</TableHead>
                <TableHead className="w-32">W X H</TableHead>
                <TableHead className="w-32">Total Area</TableHead>
                <TableHead className="w-32">Lit</TableHead>
                <TableHead className="w-32">MediaProperty</TableHead>
                <TableHead className="w-24">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mediaList.map((media, idx) => (
                <TableRow key={idx} className="hover:bg-muted transition-colors">
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{media.code}</TableCell>
                  <TableCell>
                    <img
                      src={media.image}
                      alt={media.code}
                      className="h-12 w-20 object-cover rounded border"
                    />
                  </TableCell>
                  <TableCell>{media.city}</TableCell>
                  <TableCell>{media.area}</TableCell>
                  <TableCell>{media.landmark}</TableCell>
                  <TableCell>{media.side}</TableCell>
                  <TableCell>{media.media}</TableCell>
                  <TableCell>{media.qty}</TableCell>
                  <TableCell>{media.wh}</TableCell>
                  <TableCell>{media.totalArea}</TableCell>
                  <TableCell>{media.lit}</TableCell>
                  <TableCell>{media.mediaProperty}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${media.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {media.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}