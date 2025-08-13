import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import AgTable from "@/components/common/AgTable";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const companies = [
  { value: "1", label: "Company A" },
  { value: "2", label: "Company B" },
];
const contacts = [
  { value: "1", label: "Contact 1" },
  { value: "2", label: "Contact 2" },
];
const salesPersons = [
  { value: "1", label: "Sales 1" },
  { value: "2", label: "Sales 2" },
];
const states = [
  { value: "UP", label: "Uttar Pradesh" },
  { value: "DL", label: "Delhi" },
];
const genres = [
  { value: "Outdoor", label: "Outdoor" },
  { value: "Indoor", label: "Indoor" },
];
const mediaTypes = [
  { value: "Unipole", label: "Unipole" },
  { value: "Billboard", label: "Billboard" },
];

const mockMedia = [
  {
    code: "BQS02",
    image: "/images/media1.jpg",
    mediaType: "Unipole",
    availability: "Available",
    state: "UP",
    city: "Bareilly",
    area: "Ayub khan Chouraha",
    landmark: "Gammon Mall",
    side: "RRL, AMPRI",
    lit: "back lit",
    mediaProperty: "Self",
    qty: 1,
    wh: "50ftX8ft",
    totalArea: "400 Sqft",
    rental: "10000",
    mountingRate: "500",
    printingRate: "200",
    main: "Yes",
  },
  // Add more media if needed
];

const columnDefs = [
  {
    headerName: (
      <input
        type="checkbox"
        aria-label="Select All"
        onChange={(e) => {}}
        id="selectAll"
      />
    ),
    field: "checkbox",
    width: 50,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    cellRenderer: (params) => (
      <input
        type="checkbox"
        checked={params.node.selected}
        onChange={() => params.api.selectNode(params.node, !params.node.selected)}
        aria-label={`Select ${params.data.code}`}
      />
    ),
  },
  { headerName: "S.No.", valueGetter: "node.rowIndex + 1", width: 70 },
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
  { headerName: "Media Type", field: "mediaType", width: 120 },
  { headerName: "Availability", field: "availability", width: 110 },
  { headerName: "State", field: "state", width: 100 },
  { headerName: "City", field: "city", width: 120 },
  { headerName: "Area", field: "area", width: 120 },
  { headerName: "Landmark", field: "landmark", width: 120 },
  { headerName: "Side", field: "side", width: 120 },
  { headerName: "LIT", field: "lit", width: 80 },
  { headerName: "Media Property", field: "mediaProperty", width: 120 },
  { headerName: "QTY", field: "qty", width: 70 },
  { headerName: "W X H", field: "wh", width: 110 },
  { headerName: "Total Area", field: "totalArea", width: 110 },
  { headerName: "Rental", field: "rental", width: 100 },
  { headerName: "Mounting Rate", field: "mountingRate", width: 120 },
  { headerName: "Printing Rate", field: "printingRate", width: 120 },
  { headerName: "Main", field: "main", width: 80 },
];

export default function AddCampaign() {
  const [form, setForm] = useState({
    company: "",
    contact: "",
    campaignName: "",
    proposalDate: "",
    salesPerson: "",
    fromDate: "",
    toDate: "",
    deliveryDate: "",
    payment: "",
    totalDay: "",
    remark: "",
  });
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState({
    genre: "",
    mediaType: "",
    city: "",
    area: "",
    mediaProperty: "",
    state: "",
    availability: "Available",
  });
  const [media, setMedia] = useState(mockMedia);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [campaignMedia, setCampaignMedia] = useState([]);
  const gridRef = useRef();

  // Handle selection change from AgTable
  const onSelectionChanged = () => {
    if (gridRef.current && gridRef.current.api) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      console.log("Selected rows:", selectedRows);
      setSelectedMedia(selectedRows || []);
    }
  };

  // Add selected media to campaign media tab
  const handleAddToCampaign = () => {
    console.log("Add to campaign clicked, selectedMedia:", selectedMedia); // Debug log
    
    if (!selectedMedia || selectedMedia.length === 0) {
      console.log("No media selected");
      return;
    }
    
    setCampaignMedia((prev) => [...prev, ...selectedMedia]);
    setMedia((prev) => prev.filter((m) => !selectedMedia.some(sel => sel.code === m.code)));
    setSelectedMedia([]);
  };

  // Add this function to handle price updates
  const handlePriceUpdate = (code, field, value) => {
    setCampaignMedia(prev => 
      prev.map(media => 
        media.code === code 
          ? { ...media, [field]: value }
          : media
      )
    );
  };

  // Create a reusable EditableCell component
  const EditableCell = ({ value, onValueChange, field, rowData }) => {
    const [localValue, setLocalValue] = useState(value || '');
    const inputRef = useRef();

    useEffect(() => {
      setLocalValue(value || '');
    }, [value]);

    const handleChange = (e) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
    };

    const handleBlur = () => {
      onValueChange(rowData.code, field, localValue);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onValueChange(rowData.code, field, localValue);
        inputRef.current?.blur();
      }
    };

    return (
      <input
        ref={inputRef}
        type="number"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 border rounded text-sm"
        min="0"
      />
    );
  };

  // Update the campaignColumnDefs to use the EditableCell component
  const campaignColumnDefs = [
    { headerName: "S.No.", valueGetter: "node.rowIndex + 1", width: 70 },
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
    { headerName: "Media Type", field: "mediaType", width: 120 },
    { headerName: "State", field: "state", width: 100 },
    { headerName: "City", field: "city", width: 120 },
    { headerName: "Area", field: "area", width: 120 },
    { headerName: "Landmark", field: "landmark", width: 120 },
    { headerName: "QTY", field: "qty", width: 70 },
    { headerName: "W X H", field: "wh", width: 110 },
    { headerName: "Total Area", field: "totalArea", width: 110 },
    {
      headerName: "Rental",
      field: "rental",
      width: 120,
      cellRenderer: (params) => (
        <EditableCell
          value={params.value}
          onValueChange={handlePriceUpdate}
          field="rental"
          rowData={params.data}
        />
      ),
    },
    {
      headerName: "Mounting Rate",
      field: "mountingRate",
      width: 130,
      cellRenderer: (params) => (
        <EditableCell
          value={params.value}
          onValueChange={handlePriceUpdate}
          field="mountingRate"
          rowData={params.data}
        />
      ),
    },
    {
      headerName: "Printing Rate",
      field: "printingRate",
      width: 130,
      cellRenderer: (params) => (
        <EditableCell
          value={params.value}
          onValueChange={handlePriceUpdate}
          field="printingRate"
          rowData={params.data}
        />
      ),
    },
    {
      headerName: "Total Cost",
      width: 120,
      valueGetter: (params) => {
        const rental = parseFloat(params.data.rental || 0);
        const mounting = parseFloat(params.data.mountingRate || 0);
        const printing = parseFloat(params.data.printingRate || 0);
        return (rental + mounting + printing).toFixed(2);
      },
    },
    {
      headerName: "Actions",
      width: 100,
      cellRenderer: (params) => (
        <button
          onClick={() => handleRemoveFromCampaign(params.data.code)}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
        >
          Remove
        </button>
      ),
    },
  ];

  // Add function to remove media from campaign
  const handleRemoveFromCampaign = (code) => {
    const mediaToRemove = campaignMedia.find(m => m.code === code);
    if (mediaToRemove) {
      setCampaignMedia(prev => prev.filter(m => m.code !== code));
      setMedia(prev => [...prev, mediaToRemove]);
    }
  };

  return (
    <div className="min-h-screen p-8 page-fade-in bg-[#f3fbfd]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="mb-2 text-lg font-semibold tracking-wide text-gray-700">
            Make{" "}
            <span className="text-[#EC5800] font-bold">Proposal</span>
          </div>
          <div className="mb-2 text-sm text-gray-500">
            Home &bull; Create New &bull; Make Proposal
          </div>
        </div>
        <Button className="bg-teal-700 text-white">Proposal List</Button>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Select Company
                <span className="text-red-500">*</span>
              </label>
              <Select
                value={form.company}
                onValueChange={(v) => setForm((f) => ({ ...f, company: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="--Select Company --" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Campaign Name
                <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Campaign Name"
                value={form.campaignName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, campaignName: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Proposal Date
                <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="dd-mm-yyyy"
                value={form.proposalDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, proposalDate: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Sales Person
                <span className="text-red-500">*</span>
              </label>
              <Select
                value={form.salesPerson}
                onValueChange={(v) => setForm((f) => ({ ...f, salesPerson: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="--Select Person--" />
                </SelectTrigger>
                <SelectContent>
                  {salesPersons.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Select Contact
              </label>
              <Select
                value={form.contact}
                onValueChange={(v) => setForm((f) => ({ ...f, contact: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Contact" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                From Date
                <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="From Date"
                value={form.fromDate}
                onChange={(e) => setForm((f) => ({ ...f, fromDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                To Date
                <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="To Date"
                value={form.toDate}
                onChange={(e) => setForm((f) => ({ ...f, toDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Delivery Date
              </label>
              <Input
                placeholder="Delivery Date"
                value={form.deliveryDate}
                onChange={(e) => setForm((f) => ({ ...f, deliveryDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Payment T&C
              </label>
              <Input
                placeholder="Payment T&C"
                value={form.payment}
                onChange={(e) => setForm((f) => ({ ...f, payment: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Total Day
              </label>
              <Input
                placeholder="Total Day"
                value={form.totalDay}
                onChange={(e) => setForm((f) => ({ ...f, totalDay: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Remark
              </label>
              <Input
                placeholder="Remark"
                value={form.remark}
                onChange={(e) => setForm((f) => ({ ...f, remark: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList className="flex gap-2">
          <TabsTrigger
            value="all"
            className={`px-4 py-2 rounded font-semibold ${
              tab === "all"
                ? "bg-white text-black shadow"
                : "bg-white text-gray-800"
            }`}
          >
            All Media
          </TabsTrigger>
          <TabsTrigger
            value="campaign"
            className={`px-4 py-2 rounded font-semibold ${
              tab === "campaign"
                ? "bg-white text-black shadow"
                : "bg-white text-gray-800"
            }`}
          >
            Campaign Media{" "}
            <span className="ml-2 bg-red-600 text-white rounded-full px-2 text-xs">
              {campaignMedia.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="import"
            className={`px-4 py-2 rounded font-semibold ${
              tab === "import"
                ? "bg-white text-black shadow"
                : "bg-white text-gray-800"
            }`}
          >
            Import PPT
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card className="mb-4">
            <CardContent className="bg-[#eaf6fb]">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Select Genre
                  </label>
                  <Select
                    value={search.genre}
                    onValueChange={(v) => setSearch((s) => ({ ...s, genre: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {g.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Media Type
                    <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={search.mediaType}
                    onValueChange={(v) => setSearch((s) => ({ ...s, mediaType: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mediaTypes.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    City
                  </label>
                  <Input
                    placeholder="Select..."
                    value={search.city}
                    onChange={(e) => setSearch((s) => ({ ...s, city: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Area
                  </label>
                  <Input
                    placeholder="Area"
                    value={search.area}
                    onChange={(e) => setSearch((s) => ({ ...s, area: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Media Property
                  </label>
                  <Input
                    placeholder="All"
                    value={search.mediaProperty}
                    onChange={(e) => setSearch((s) => ({ ...s, mediaProperty: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    State
                  </label>
                  <Select
                    value={search.state}
                    onValueChange={(v) => setSearch((s) => ({ ...s, state: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="--Select State--" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((st) => (
                        <SelectItem key={st.value} value={st.value}>
                          {st.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-6 mb-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Availability
                    <span className="text-red-500">*</span>
                  </label>
                  <RadioGroup
                    value={search.availability}
                    onValueChange={(v) => setSearch((s) => ({ ...s, availability: v }))}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="Available" id="available" />
                      <label htmlFor="available" className="text-sm">
                        Available
                      </label>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="All Media" id="allmedia" />
                      <label htmlFor="allmedia" className="text-sm">
                        All Media
                      </label>
                    </div>
                  </RadioGroup>
                </div>
                <Button className="bg-teal-700 text-white px-8">Search</Button>
              </div>
            </CardContent>
          </Card>
          <div className="mb-2 text-sm text-gray-600">
            Selected: {selectedMedia.length} items
          </div>
          <Button
            className="bg-teal-700 text-white mb-2"
            onClick={handleAddToCampaign}
            disabled={selectedMedia.length === 0}
          >
            Add to Campaign ({selectedMedia.length})
          </Button>
          <div className="bg-white rounded-lg shadow-sm p-2">
            <div className="flex justify-end mb-2">
              <Input placeholder="Search here.." className="w-64" />
            </div>
            <AgTable
              ref={gridRef}
              rowData={media}
              columnDefs={columnDefs}
              height="300px"
              className="ag-theme-alpine"
              rowSelection="multiple"
              onSelectionChanged={onSelectionChanged}
            />
          </div>
        </TabsContent>
        <TabsContent value="campaign">
          <div className="bg-white rounded-lg shadow-sm p-4">
            {campaignMedia.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                No campaign media added yet.
              </div>
            ) : (
              <>
                <div className="mb-4 p-3 bg-blue-50 rounded border">
                  <h4 className="font-semibold text-gray-700 mb-2">Campaign Summary</h4>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Media:</span>
                      <span className="font-semibold ml-2">{campaignMedia.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Rental:</span>
                      <span className="font-semibold ml-2">
                        ₹{campaignMedia.reduce((sum, m) => sum + parseFloat(m.rental || 0), 0).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Mounting:</span>
                      <span className="font-semibold ml-2">
                        ₹{campaignMedia.reduce((sum, m) => sum + parseFloat(m.mountingRate || 0), 0).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Grand Total:</span>
                      <span className="font-semibold ml-2 text-green-600">
                        ₹{campaignMedia.reduce((sum, m) => 
                          sum + parseFloat(m.rental || 0) + parseFloat(m.mountingRate || 0) + parseFloat(m.printingRate || 0), 0
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <AgTable
                  rowData={campaignMedia}
                  columnDefs={campaignColumnDefs}
                  height="300px"
                  className="ag-theme-alpine"
                />
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="import">
          <div className="bg-white rounded-lg shadow-sm p-4 text-gray-500">
            Import PPT functionality coming soon.
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end mt-6">
        <Button className="bg-teal-700 text-white px-8">Submit Proposal</Button>
      </div>
    </div>
  );
}
