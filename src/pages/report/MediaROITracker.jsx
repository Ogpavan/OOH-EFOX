import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AgTable from "@/components/common/AgTable";

const columns = [
	{ headerName: "Sr. No", field: "sno", flex: 0.5 },
	{ headerName: "Media ID", field: "mediaId", flex: 1 },
	{ headerName: "Media Name", field: "mediaName", flex: 1.2 },
	{ headerName: "Media Type", field: "mediaType", flex: 1 },
	{ headerName: "Media Owner", field: "mediaOwner", flex: 1 },
	{ headerName: "Size", field: "size", flex: 1 },
	{ headerName: "Quantity", field: "quantity", flex: 0.7 },
	{ headerName: "State", field: "state", flex: 1 },
	{ headerName: "City", field: "city", flex: 1 },
	{ headerName: "Area", field: "area", flex: 1.2 },
	{ headerName: "Total Order", field: "totalOrder", flex: 0.8 },
	{ headerName: "Rental Amount", field: "rentalAmount", flex: 1 },
	{ headerName: "Printing", field: "printing", flex: 1 },
	{ headerName: "Mounting", field: "mounting", flex: 1 },
	{ headerName: "Maintenance", field: "maintenance", flex: 1 },
	{ headerName: "Total", field: "total", flex: 1 },
];

const data = [
	{
		sno: 1,
		mediaId: "BQS08",
		mediaName: "Danish Nagar Chouraha",
		mediaType: "Unipole",
		mediaOwner: "Self",
		size: "8ft X 50ft",
		quantity: 1,
		state: "Uttar Pradesh",
		city: "Bareilly",
		area: "Opp. Janakpuri Gurudwra Fcg Sheel Chouraha",
		totalOrder: 0,
		rentalAmount: 0,
		printing: 0,
		mounting: 0,
		maintenance: 0,
		total: 0,
	},
	{
		sno: 2,
		mediaId: "BQS03",
		mediaName: "Savarkar Setu RRL",
		mediaType: "Unipole",
		mediaOwner: "Self",
		size: "8ft X 50ft",
		quantity: 1,
		state: "Uttar Pradesh",
		city: "Bareilly",
		area: "Opp. Company Garden",
		totalOrder: 0,
		rentalAmount: 0,
		printing: 0,
		mounting: 0,
		maintenance: 0,
		total: 0,
	},
	{
		sno: 3,
		mediaId: "BQS04",
		mediaName: "Narayan Nagar Market",
		mediaType: "Unipole",
		mediaOwner: "Self",
		size: "8ft X 50ft",
		quantity: 1,
		state: "Uttar Pradesh",
		city: "Bareilly",
		area: "Ayub khan Chouraha",
		totalOrder: 0,
		rentalAmount: 0,
		printing: 0,
		mounting: 0,
		maintenance: 0,
		total: 0,
	},
	{
		sno: 4,
		mediaId: "BQS09",
		mediaName: "Aashima Mall",
		mediaType: "Unipole",
		mediaOwner: "Self",
		size: "8ft X 50ft",
		quantity: 1,
		state: "Uttar Pradesh",
		city: "Bareilly",
		area: "Ekta Nagar Chouraha",
		totalOrder: 0,
		rentalAmount: 0,
		printing: 0,
		mounting: 0,
		maintenance: 0,
		total: 0,
	},
	{
		sno: 5,
		mediaId: "BQS06",
		mediaName: "Vidyanagar Market",
		mediaType: "Unipole",
		mediaOwner: "Self",
		size: "8ft X 50ft",
		quantity: 1,
		state: "Uttar Pradesh",
		city: "Bareilly",
		area: "Opp. Biya Bani Kohti",
		totalOrder: 0,
		rentalAmount: 0,
		printing: 0,
		mounting: 0,
		maintenance: 0,
		total: 0,
	},
	{
		sno: 6,
		mediaId: "BQS05",
		mediaName: "Barkatullah University",
		mediaType: "Unipole",
		mediaOwner: "Self",
		size: "8ft X 50ft",
		quantity: 1,
		state: "Uttar Pradesh",
		city: "Bareilly",
		area: "Choupla Chauraha",
		totalOrder: 0,
		rentalAmount: 0,
		printing: 0,
		mounting: 0,
		maintenance: 0,
		total: 0,
	},
	{
		sno: 7,
		mediaId: "BQS07",
		mediaName: "Bagsewaniya Chouraha",
		mediaType: "Unipole",
		mediaOwner: "Self",
		size: "8ft X 50ft",
		quantity: 1,
		state: "Uttar Pradesh",
		city: "Bareilly",
		area: "Circuit House Opp. Bpl",
		totalOrder: 0,
		rentalAmount: 0,
		printing: 0,
		mounting: 0,
		maintenance: 0,
		total: 0,
	},
	{
		sno: 8,
		mediaId: "BQS10",
		mediaName: "Aashima Mall",
		mediaType: "Unipole",
		mediaOwner: "Self",
		size: "8ft X 50ft",
		quantity: 1,
		state: "Uttar Pradesh",
		city: "Bareilly",
		area: "Station Road Opp. HDFC Bank",
		totalOrder: 0,
		rentalAmount: 0,
		printing: 0,
		mounting: 0,
		maintenance: 0,
		total: 0,
	},
	{
		sno: 9,
		mediaId: "UC101",
		mediaName: "near college",
		mediaType: "Unipole",
		mediaOwner: "Self",
		size: "10ft X 20ft",
		quantity: 1,
		state: "Uttar Pradesh",
		city: "Bareilly",
		area: "Opp. Company Garden",
		totalOrder: 0,
		rentalAmount: 0,
		printing: 0,
		mounting: 0,
		maintenance: 0,
		total: 0,
	},
	{
		sno: 10,
		mediaId: "BQS02",
		mediaName: "Gammon Mall",
		mediaType: "Unipole",
		mediaOwner: "Self",
		size: "8ft X 50ft",
		quantity: 1,
		state: "Uttar Pradesh",
		city: "Bareilly",
		area: "Ayub khan Chouraha",
		totalOrder: 0,
		rentalAmount: 0,
		printing: 0,
		mounting: 0,
		maintenance: 0,
		total: 0,
	},
];

export default function MediaROITracker() {
	const [year, setYear] = useState("2025");
	const [month, setMonth] = useState("January");
	const [state, setState] = useState("All");
	const [city, setCity] = useState("All");
	const [area, setArea] = useState("All");
	const [mediaType, setMediaType] = useState("All");

	return (
		<div className="min-h-screen p-8 page-fade-in">
			{/* Top Dashboard Button */}
			<div className="flex justify-end mb-2">
				<Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-6">
					Go To App Dashboard
				</Button>
			</div>
			
		
			   <h2 className="text-xl tracking-tight mb-6">
        ROI{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
       Report
        </span>
      </h2>

			{/* Filter Section */}
			<section className="bg-white rounded-lg shadow-sm p-6 mb-6">
				<h3 className="text-lg font-medium mb-4">ROI REPORT</h3>
				<div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium mb-1">
							Select Year
							<span className="text-red-500">*</span>
						</label>
						<Select value={year} onValueChange={setYear} required>
							<SelectTrigger>
								<SelectValue placeholder="Select Year" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="2025">2025</SelectItem>
								<SelectItem value="2024">2024</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">
							Select Month
						</label>
						<Select value={month} onValueChange={setMonth}>
							<SelectTrigger>
								<SelectValue placeholder="Select Month" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="January">January</SelectItem>
								<SelectItem value="February">February</SelectItem>
								<SelectItem value="March">March</SelectItem>
								{/* Add more months as needed */}
							</SelectContent>
						</Select>
					</div>
					<div className="flex items-end gap-2">
						<Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-6">
							Apply
						</Button>
						<Button className="bg-gray-300 hover:bg-gray-400 text-[#4b6e6e] rounded-md px-6">
							Reset
						</Button>
					</div>
				</div>
			</section>

			{/* Revenue Filters */}
			<section className="bg-white rounded-lg shadow-sm p-6 mb-6">
				<div className="mb-2 font-semibold text-[#4b6e6e] flex items-center gap-2">
					<span className="material-icons">table_chart</span>
					All Revenue
				</div>
				<div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium mb-1">State:</label>
						<Select value={state} onValueChange={setState}>
							<SelectTrigger>
								<SelectValue placeholder="All" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="All">All</SelectItem>
								<SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
								<SelectItem value="Delhi">Delhi</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">City:</label>
						<Select value={city} onValueChange={setCity}>
							<SelectTrigger>
								<SelectValue placeholder="All" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="All">All</SelectItem>
								<SelectItem value="Bareilly">Bareilly</SelectItem>
								<SelectItem value="Lucknow">Lucknow</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Area:</label>
						<Select value={area} onValueChange={setArea}>
							<SelectTrigger>
								<SelectValue placeholder="All" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="All">All</SelectItem>
								<SelectItem value="Hazratganj">Hazratganj</SelectItem>
								<SelectItem value="Ekta Nagar Chouraha">
									Ekta Nagar Chouraha
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Media Type:</label>
						<Select value={mediaType} onValueChange={setMediaType}>
							<SelectTrigger>
								<SelectValue placeholder="All" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="All">All</SelectItem>
								<SelectItem value="Unipole">Unipole</SelectItem>
								<SelectItem value="Billboard">Billboard</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				{/* Summary Row */}
				<div className="flex flex-wrap items-center gap-4 bg-gray-100 p-3 rounded-md mb-2">
					<div className="font-medium">
						Total Orders: <span className="font-bold">0</span>
					</div>
					<div className="font-medium">
						Rental Total: <span className="font-bold">₹0</span>
					</div>
					<div className="font-medium">
						Printing Total: <span className="font-bold">₹0</span>
					</div>
					<div className="font-medium">
						Mounting Total: <span className="font-bold">₹0</span>
					</div>
					<div className="font-medium">
						Maintenance Total: <span className="font-bold">₹0</span>
					</div>
					<Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-6 ml-auto">
						Grand Total: ₹0
					</Button>
				</div>
			</section>

			{/* Table Section */}
			<section className="bg-white rounded-lg shadow-sm p-6">
				<div className="mb-2 font-semibold text-[#4b6e6e]">All Media</div>
				<AgTable rowData={data} columnDefs={columns} height="400px" />
			</section>
		</div>
	);
}