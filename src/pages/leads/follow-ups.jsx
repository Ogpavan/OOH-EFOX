import React from "react";
import { useNavigate } from "react-router-dom";
import AgTable from "@/components/common/AgTable";

const followUps = [
	{ id: 1, name: "John Doe", date: "2025-08-14", status: "Pending" },
	{ id: 2, name: "Jane Smith", date: "2025-08-15", status: "Completed" },
	{ id: 3, name: "Alice Brown", date: "2025-08-16", status: "Pending" },
	{ id: 4, name: "Bob Martin", date: "2025-08-17", status: "Pending" },
	{ id: 5, name: "Sara Lee", date: "2025-08-18", status: "Completed" },
];

const columnDefs = [
	{ headerName: "Name", field: "name", flex: 1, filter: true },
	{ headerName: "Date", field: "date", flex: 1, filter: true },
	{ headerName: "Status", field: "status", flex: 1, filter: true },
	{
		headerName: "Action",
		field: "action",
		flex: 1,
		cellRenderer: (params) => {
			return (
				<button
					className={`px-3 py-1 rounded text-xs font-semibold ${
						params.data.status === "Completed"
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: "bg-orange-600 text-white"
					}`}
					disabled={params.data.status === "Completed"}
				>
					Remind
				</button>
			);
		},
	},
];

export default function LeadFollowUps() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen p-8 page-fade-in">
		
			<h2 className="text-xl tracking-tight mb-6">
        Lead{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
		  Follow-Ups
        </span>
      </h2>
			<AgTable
				rowData={followUps}
				columnDefs={columnDefs}
				height="500px"
			/>
		</div>
	);
}