import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AgTable from "@/components/common/AgTable";

const taskReportData = [
	{
		id: 1,
		description: "new task for time line testing",
		createdBy: "Yash",
		assignedBy: "Yash",
		assignedTo: "Yash",
		createdDate: "Oct 23 2023 1:00PM",
		assignedDate: "Oct 23 2023 1:00PM",
		dueDate: "01 Nov 2023",
		status: "Completed",
		priority: "Medium",
		note: "time line",
		completionDate: "Oct 23 2023 1:33PM",
		attachment: "",
		timeLine: "",
	},
	{
		id: 2,
		description: "check all money 4 drive pages",
		createdBy: "Yash",
		assignedBy: "Yash",
		assignedTo: "Yash",
		createdDate: "Oct 23 2023 1:33PM",
		assignedDate: "Oct 23 2023 1:33PM",
		dueDate: "24 Oct 2023",
		status: "Completed",
		priority: "High",
		note: "",
		completionDate: "Oct 25 2023 11:51AM",
		attachment: "",
		timeLine: "",
	},
	{
		id: 3,
		description: "check high task in money 4 drive",
		createdBy: "Yash",
		assignedBy: "Yash",
		assignedTo: "Yash",
		createdDate: "Oct 23 2023 1:34PM",
		assignedDate: "Oct 23 2023 1:34PM",
		dueDate: "24 Oct 2023",
		status: "Completed",
		priority: "Medium",
		note: "",
		completionDate: "Feb 16 2024 2:21PM",
		attachment: "",
		timeLine: "",
	},
	{
		id: 4,
		description: "check Email testing of others",
		createdBy: "Yash",
		assignedBy: "Yash",
		assignedTo: "Abhishek",
		createdDate: "Oct 23 2023 1:38PM",
		assignedDate: "Oct 23 2023 1:38PM",
		dueDate: "24 Oct 2023",
		status: "Pending",
		priority: "Medium",
		note: "check attacment",
		completionDate: "",
		attachment: "",
		timeLine: "",
	},
	{
		id: 5,
		description: "mail to abhishek testing",
		createdBy: "Yash",
		assignedBy: "Yash",
		assignedTo: "Abhishek",
		createdDate: "Oct 23 2023 1:41PM",
		assignedDate: "Oct 23 2023 1:41PM",
		dueDate: "24 Oct 2023",
		status: "Pending",
		priority: "Low",
		note: "",
		completionDate: "",
		attachment: "",
		timeLine: "",
	},
	{
		id: 6,
		description: "Task Management Testing by Yogesh",
		createdBy: "Yash",
		assignedBy: "Yash",
		assignedTo: "Hamza Pathan",
		createdDate: "Oct 23 2023 3:42PM",
		assignedDate: "Oct 23 2023 3:42PM",
		dueDate: "25 Oct 2023",
		status: "Completed",
		priority: "Medium",
		note: "I have upload attachment. How can upload second attachment.",
		completionDate: "Oct 23 2023 3:54PM",
		attachment: "",
		timeLine: "",
	},
	{
		id: 7,
		description: "Banner of SGI",
		createdBy: "Yash",
		assignedBy: "Yash",
		assignedTo: "Jyoti Kumawat",
		createdDate: "Oct 25 2023 11:46AM",
		assignedDate: "Oct 25 2023 11:46AM",
		dueDate: "28 Oct 2023",
		status: "Completed",
		priority: "High",
		note: "",
		completionDate: "Nov 8 2023 10:28AM",
		attachment: "",
		timeLine: "",
	},
	{
		id: 8,
		description: "Website design SGI",
		createdBy: "Yash",
		assignedBy: "Yash",
		assignedTo: "Aman Nayak",
		createdDate: "Oct 25 2023 11:49AM",
		assignedDate: "Oct 25 2023 11:49AM",
		dueDate: "30 Oct 2023",
		status: "Pending",
		priority: "High",
		note: "Website completation before 30/oct/2023 You take follow up from kapil sir for all the things and get it done",
		completionDate: "",
		attachment: "",
		timeLine: "",
	},
];

const columnDefs = [
	{ headerName: "Sr No.", valueGetter: "node.rowIndex + 1", width: 80 },
	{ headerName: "Task Description", field: "description", flex: 1 },
	{ headerName: "Created By", field: "createdBy", width: 120 },
	{ headerName: "Assigned By", field: "assignedBy", width: 120 },
	{ headerName: "Assigned To", field: "assignedTo", width: 150 },
	{ headerName: "Created Date", field: "createdDate", width: 160 },
	{ headerName: "Assigned Date", field: "assignedDate", width: 160 },
	{
		headerName: "Due Date",
		field: "dueDate",
		width: 120,
		cellRenderer: (params) => (
			<span className="text-red-600 font-semibold">{params.value}</span>
		),
	},
	{
		headerName: "Status",
		field: "status",
		width: 110,
		cellRenderer: (params) => (
			<span
				className={
					params.value === "Completed"
						? "text-green-600 font-semibold"
						: "text-orange-600 font-semibold"
				}
			>
				{params.value}
			</span>
		),
	},
	{
		headerName: "Priority",
		field: "priority",
		width: 100,
		cellRenderer: (params) => {
			if (params.value === "High")
				return (
					<span className="text-red-600 font-semibold">{params.value}</span>
				);
			if (params.value === "Medium")
				return (
					<span className="text-blue-600 font-semibold">{params.value}</span>
				);
			if (params.value === "Low")
				return <span className="text-green-600 font-semibold">{params.value}</span>;
			return params.value;
		},
	},
	{ headerName: "Note", field: "note", flex: 1 },
	{ headerName: "Completion Date", field: "completionDate", width: 160 },
	{ headerName: "Attachment", field: "attachment", width: 120 },
	{ headerName: "Time Line", field: "timeLine", width: 120 },
];

export default function Report() {
	return (
		<div className="min-h-screen p-8 page-fade-in bg-[#f3fbfd]">
			
      <h2 className="text-xl tracking-tight mb-6">
       Task{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
          Report
        </span>
      </h2>
			<Card className="mb-6">

				<CardContent>
					<div className="flex items-center gap-2 mb-4">
						<Button className="bg-cyan-600 text-white">Export</Button>
						<Button variant="outline" className="ml-auto">
							Filter
						</Button>
					</div>
					<AgTable
						rowData={taskReportData}
						columnDefs={columnDefs}
						height="500px"
						className="ag-theme-alpine"
					/>
				</CardContent>
			</Card>
		</div>
	);
}