import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AddMedia() {
  const [sides, setSides] = useState([]);
  const [sideForm, setSideForm] = useState({
    name: "",
    width: "",
    height: "",
    uom: "feet",
    area: "",
  });

  const handleAddSide = () => {
    if (sideForm.name && sideForm.width && sideForm.height) {
      setSides([
        ...sides,
        {
          ...sideForm,
          area: Number(sideForm.width) * Number(sideForm.height),
        },
      ]);
      setSideForm({ name: "", width: "", height: "", uom: "feet", area: "" });
    }
  };

  return (
    <div className="min-h-screen p-8 page-fade-in">
      <h2 className="text-xl font-light tracking-tight mb-6">
        Add <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>Media</span>
      </h2>
      <form className="space-y-6">
        {/* Add Media */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Add Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Code<span className="text-red-500">*</span></label>
              <Input placeholder="Code" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Genre<span className="text-red-500">*</span></label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="--Select Genre--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoarding">Hoarding</SelectItem>
                  <SelectItem value="banner">Banner</SelectItem>
                  {/* Add more genres as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select MediaType<span className="text-red-500">*</span></label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="--Select MediaType--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoarding">Hoarding</SelectItem>
                  <SelectItem value="banner">Banner</SelectItem>
                  {/* Add more media types as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">No. of Side<span className="text-red-500">*</span></label>
              <Input placeholder="No. of Side" required type="number" min={1} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="--Select State--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UP">Uttar Pradesh</SelectItem>
                  <SelectItem value="DL">Delhi</SelectItem>
                  {/* Add more states as needed */}
                </SelectContent>
              </Select>
              <Input placeholder="Landmark" />
              <Input placeholder="Latitude" />
              <Input placeholder="Longitude" />
            </div>
            <div>
              {/* Side Table */}
              <div className="bg-blue-50 rounded p-4 border">
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Side Name"
                    value={sideForm.name}
                    onChange={e => setSideForm({ ...sideForm, name: e.target.value })}
                  />
                  <Input
                    placeholder="W"
                    type="number"
                    value={sideForm.width}
                    onChange={e => setSideForm({ ...sideForm, width: e.target.value })}
                    className="w-16"
                  />
                  <span className="self-center">X</span>
                  <Input
                    placeholder="H"
                    type="number"
                    value={sideForm.height}
                    onChange={e => setSideForm({ ...sideForm, height: e.target.value })}
                    className="w-16"
                  />
                  <Select
                    value={sideForm.uom}
                    onValueChange={val => setSideForm({ ...sideForm, uom: val })}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="feet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feet">feet</SelectItem>
                      <SelectItem value="meter">meter</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Area"
                    value={sideForm.area}
                    onChange={e => setSideForm({ ...sideForm, area: e.target.value })}
                    className="w-20"
                    disabled
                  />
                  <Button type="button" onClick={handleAddSide}>ADD</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="px-2 py-1">Side</th>
                        <th className="px-2 py-1">W</th>
                        <th className="px-2 py-1">H</th>
                        <th className="px-2 py-1">Total Area</th>
                        <th className="px-2 py-1">UOM</th>
                        <th className="px-2 py-1">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sides.map((side, idx) => (
                        <tr key={idx}>
                          <td className="px-2 py-1">{side.name}</td>
                          <td className="px-2 py-1">{side.width}</td>
                          <td className="px-2 py-1">{side.height}</td>
                          <td className="px-2 py-1">{side.area}</td>
                          <td className="px-2 py-1">{side.uom}</td>
                          <td className="px-2 py-1">
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                setSides(sides.filter((_, i) => i !== idx))
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quantity & Media Property */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Quantity<span className="text-red-500">*</span></label>
              <Input placeholder="Quantity" required type="number" min={1} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Lit</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="back lit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlit">Back Lit</SelectItem>
                  <SelectItem value="frontlit">Front Lit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Media Property<span className="text-red-500">*</span></label>
              <RadioGroup defaultValue="self" className="flex gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="self" id="self" />
                  <label htmlFor="self">Self</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="vendor" id="vendor" />
                  <label htmlFor="vendor">Vendor</label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </section>

        {/* Sale Rate */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Sale Rate</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="--select Charge Master--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="--select Unit--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sqft">Sqft</SelectItem>
                  <SelectItem value="sqm">Sqm</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input placeholder="Frequency" />
            <Input placeholder="Amount" type="number" />
            <Input placeholder="Net Amt" type="number" />
            <Button type="button" className="mt-2">Add</Button>
          </div>
        </section>

        {/* Status, Remark, Upload */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status<span className="text-red-500">*</span></label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Active" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Remark</label>
              <Input placeholder="Remark" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Upload Image<span className="text-red-500">*</span></label>
              <Input type="file" multiple />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}