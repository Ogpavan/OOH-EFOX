import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const mockTasks = [
	{
		id: 1,
		title: "Demo",
		priority: "High",
		status: "Completed",
		createDate: "May 6 2025 12:58PM",
		dueDate: "07 May 2025",
		assignTo: "Yash",
		assignBy: "Yash",
		completeDate: "Aug 5 2025 12:26PM",
	},
	{
		id: 2,
		title: "Demo with Pradeep Ji",
		priority: "High",
		status: "Completed",
		createDate: "Jan 22 2025 12:22PM",
		dueDate: "22 Jan 2025",
		assignTo: "Yash",
		assignBy: "Yash",
		completeDate: "Jan 25 2025 10:47AM",
	},
	{
		id: 3,
		title: "Demo with Ankul Ji",
		priority: "High",
		status: "Completed",
		createDate: "Oct 24 2024 3:21PM",
		dueDate: "24 Oct 2024",
		assignTo: "Yash",
		assignBy: "Yash",
		completeDate: "Nov 9 2024 1:59PM",
	},
	{
		id: 4,
		title: "Demo with Manish Ji",
		priority: "High",
		status: "Completed",
		createDate: "Oct 24 2024 3:04PM",
		dueDate: "24 Oct 2024",
		assignTo: "Yash",
		assignBy: "Yash",
		completeDate: "Jan 1 2025 11:52AM",
	},
];

function ConfirmModal({ open, onConfirm, onCancel, message }) {
	if (!open) return null;
	return (
		<div className="fixed left-1/2 top-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2 bg-white border rounded shadow-lg p-6 min-w-[300px]">
			<div className="mb-4 text-gray-800">{message}</div>
			<div className="flex justify-end gap-2">
				<Button variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button
					variant="default"
					className="bg-orange-600 text-white"
					onClick={onConfirm}
				>
					Yes
				</Button>
			</div>
		</div>
	);
}

export default function AddTask() {
	const [tasks, setTasks] = useState(mockTasks);
	const [completedOpen, setCompletedOpen] = useState(true);
	const [pendingOpen, setPendingOpen] = useState(true);

	// Add Task form state
	const [form, setForm] = useState({
		title: "",
		priority: "",
		dueDate: "",
		assignTo: "",
		assignBy: "",
	});

	// Confirm modal state
	const [confirm, setConfirm] = useState({
		open: false,
		type: "",
		taskId: null,
	});

	// Stats
	const totalTask = tasks.length;
	const completedTask = tasks.filter((t) => t.status === "Completed").length;
	const pendingTask = tasks.filter((t) => t.status === "Pending").length;
	const overDueTask = tasks.filter((t) => t.status === "Overdue").length;

	// Add new task
	const handleAddTask = () => {
		if (
			!form.title ||
			!form.priority ||
			!form.dueDate ||
			!form.assignTo ||
			!form.assignBy
		)
			return;
		setTasks([
			{
				id: Date.now(),
				title: form.title,
				priority: form.priority,
				status: "Pending",
				createDate: new Date().toLocaleString(),
				dueDate: form.dueDate,
				assignTo: form.assignTo,
				assignBy: form.assignBy,
				completeDate: "",
			},
			...tasks,
		]);
		setForm({
			title: "",
			priority: "",
			dueDate: "",
			assignTo: "",
			assignBy: "",
		});
	};

	// Confirm check/uncheck
	const handleCheck = (task, toStatus) => {
		setConfirm({
			open: true,
			type: toStatus,
			taskId: task.id,
		});
	};

	// Confirm modal actions
	const handleConfirm = () => {
		setTasks((prev) =>
			prev.map((t) =>
				t.id === confirm.taskId
					? confirm.type === "complete"
						? {
								...t,
								status: "Completed",
								completeDate: new Date().toLocaleString(),
						  }
						: { ...t, status: "Pending", completeDate: "" }
					: t
			)
		);
		setConfirm({ open: false, type: "", taskId: null });
	};

	const handleCancel = () => setConfirm({ open: false, type: "", taskId: null });

	// Split tasks
	const completedTasks = tasks.filter((t) => t.status === "Completed");
	const pendingTasks = tasks.filter((t) => t.status === "Pending");

	return (
		<div className="min-h-screen p-8 page-fade-in bg-[#f3fbfd]">
			 
      <h2 className="text-xl tracking-tight mb-6">
        Task{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
          Management
        </span>
      </h2>
			 
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-xs text-gray-500">
							Total Task
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-600">
							{totalTask}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-xs text-gray-500">
							Pending Task
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-orange-600">
							{pendingTask}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-xs text-gray-500">
							Over Due Task
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-red-600">
							{overDueTask}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-xs text-gray-500">
							Completed Task
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">
							{completedTask}
						</div>
					</CardContent>
				</Card>
			</div>
			{/* Add Task Form */}
			<Card className="mb-4">
				<CardHeader>
					<CardTitle>Add a Task</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
						<Input
							placeholder="Task Title"
							value={form.title}
							onChange={(e) =>
								setForm((f) => ({ ...f, title: e.target.value }))
							}
						/>
						<Input
							placeholder="Assign To"
							value={form.assignTo}
							onChange={(e) =>
								setForm((f) => ({ ...f, assignTo: e.target.value }))
							}
						/>
						<Input
							placeholder="Assign By"
							value={form.assignBy}
							onChange={(e) =>
								setForm((f) => ({ ...f, assignBy: e.target.value }))
							}
						/>
						<Select
							value={form.priority}
							onValueChange={(v) =>
								setForm((f) => ({ ...f, priority: v }))
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Priority" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="High">High</SelectItem>
								<SelectItem value="Medium">Medium</SelectItem>
								<SelectItem value="Low">Low</SelectItem>
							</SelectContent>
						</Select>
						<Input
							placeholder="dd/mm/yyyy"
							value={form.dueDate}
							onChange={(e) =>
								setForm((f) => ({ ...f, dueDate: e.target.value }))
							}
						/>
						<Button
							className="bg-blue-400 text-white"
							onClick={handleAddTask}
						>
							Add
						</Button>
					</div>
				</CardContent>
			</Card>
			{/* Pending Tasks */}
			<Card className="mb-6">
				<CardHeader
					className="w-full flex items-center justify-between bg-[#ffe9d6] px-4 py-2 font-semibold text-gray-700 rounded-t cursor-pointer"
					onClick={() => setPendingOpen(!pendingOpen)}
				>
					<CardTitle>Pending</CardTitle>
					<span
						className={`transition-transform ${
							pendingOpen ? "rotate-0" : "rotate-180"
						}`}
					>
						▼
					</span>
				</CardHeader>
				{pendingOpen && (
					<CardContent>
						{pendingTasks.length === 0 && (
							<div className="px-4 py-3 text-gray-400">
								No pending tasks.
							</div>
						)}
						{pendingTasks.map((task) => (
							<div
								key={task.id}
								className="flex items-start gap-2 border-b last:border-b-0 px-4 py-3"
							>
								<Input
									type="checkbox"
									checked={false}
									onChange={() => handleCheck(task, "complete")}
									className="mt-1 accent-blue-600 cursor-pointer w-4"
								/>
								<div>
									<div className="font-semibold text-blue-700">
										{task.title}
									</div>
									<div className="text-xs text-gray-500 flex flex-wrap gap-2">
										<span>Tasks</span>
										<span>&bull; Create Date - {task.createDate}</span>
										<span>&bull; Assign To-{task.assignTo}</span>
										<span
											className={`font-bold ${
												task.priority === "High"
													? "text-red-600"
													: "text-orange-600"
											}`}
										>
											&bull; {task.priority}
										</span>
										<span className="text-red-600 font-bold">
											&bull; Due Date - {task.dueDate}
										</span>
										<span>&bull; Assign By-{task.assignBy}</span>
									</div>
								</div>
							</div>
						))}
					</CardContent>
				)}
			</Card>
			{/* Completed Tasks */}
			<Card className="mb-6">
				<CardHeader
					className="w-full flex items-center justify-between bg-[#c8f0f7] px-4 py-2 font-semibold text-gray-700 rounded-t cursor-pointer"
					onClick={() => setCompletedOpen(!completedOpen)}
				>
					<CardTitle>Completed</CardTitle>
					<span
						className={`transition-transform ${
							completedOpen ? "rotate-0" : "rotate-180"
						}`}
					>
						▼
					</span>
				</CardHeader>
				{completedOpen && (
					<CardContent>
						{completedTasks.length === 0 && (
							<div className="px-4 py-3 text-gray-400">
								No completed tasks.
							</div>
						)}
						{completedTasks.map((task) => (
							<div
								key={task.id}
								className="flex items-start gap-2 border-b last:border-b-0 px-4 py-3"
							>
								<Input
									type="checkbox"
									checked={true}
									onChange={() => handleCheck(task, "pending")}
									className="mt-1 accent-blue-600 cursor-pointer w-4"
								/>
								<div>
									<div className="font-semibold text-blue-700">
										{task.title}
									</div>
									<div className="text-xs text-gray-500 flex flex-wrap gap-2">
										<span>Tasks</span>
										<span>&bull; Create Date - {task.createDate}</span>
										<span>&bull; Assign To-{task.assignTo}</span>
										<span
											className={`font-bold ${
												task.priority === "High"
													? "text-red-600"
													: "text-orange-600"
											}`}
										>
											&bull; {task.priority}
										</span>
										<span className="text-red-600 font-bold">
											&bull; Due Date - {task.dueDate}
										</span>
										<span>&bull; Assign By-{task.assignBy}</span>
										<span className="text-green-600">
											&bull; Complete Date : {task.completeDate}
										</span>
									</div>
								</div>
							</div>
						))}
					</CardContent>
				)}
			</Card>
			{/* Confirm Modal */}
			<ConfirmModal
				open={confirm.open}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
				message={
					confirm.type === "complete"
						? "Mark this task as completed?"
						: "Move this task back to pending?"
				}
			/>
		</div>
	);
}