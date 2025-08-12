import React from "react";
import { useNavigate } from "react-router-dom";
import AgTable from "@/components/common/AgTable";

const companies = [
	{
		id: 1,
		name: "Acme Corp",
		phone: "9876543210",
		email: "info@acme.com",
		status: "Active",
		createdBy: "Admin",
		createdDate: "2025-08-01",
	},
	{
		id: 2,
		name: "Globex Ltd",
		phone: "9123456789",
		email: "contact@globex.com",
		status: "Inactive",
		createdBy: "Yash",
		createdDate: "2025-07-15",
	},
	// Add more dummy data as needed
];

const columnDefs = [
	{ headerName: "Name", field: "name", flex: 1, filter: true },
	{ headerName: "Phone", field: "phone", flex: 1, filter: true },
	{ headerName: "Email", field: "email", flex: 1, filter: true },
	{ headerName: "Status", field: "status", flex: 1, filter: true },
	{ headerName: "Created By", field: "createdBy", flex: 1, filter: true },
	{ headerName: "Created Date", field: "createdDate", flex: 1, filter: true },
];

export default function ManageVendors() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen p-8 page-fade-in">
			<h2 className="text-xl tracking-tight mb-6">
				Manage{" "}
				<span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
					Vendors
				</span>
			</h2>
			<AgTable
				rowData={companies}
				columnDefs={columnDefs}
				onRowClicked={(row) => navigate(`/Vendors/view/${row.data.id}`)}
				height="500px"
			/>
		</div>
	);
}