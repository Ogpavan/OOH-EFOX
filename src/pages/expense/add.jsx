import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import AgTable from "@/components/common/AgTable";
import { FaEllipsisV, FaTrash } from "react-icons/fa";
import { Edit2 } from "lucide-react";
import { createPortal } from "react-dom";

const expenseCategories = [
  { value: "Communication", label: "Communication" },
  { value: "Travelling", label: "Travelling" },
  { value: "Office", label: "Office" },
];

const mockExpenses = [
  {
    id: 1,
    name: "Communication",
    parent: "",
    createdBy: "Yash",
    createdOn: "25 Nov 2019",
  },
  {
    id: 2,
    name: "Travelling",
    parent: "",
    createdBy: "Yash",
    createdOn: "25 Nov 2019",
  },
];

// 3 dots menu for actions
const ActionCell = (params) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 5,
        left: rect.right - 140
      });
    }
    setOpen((prev) => !prev);
  };

  const handleOptionClick = (e, callback) => {
    e.stopPropagation();
    setOpen(false);
    if (callback) callback();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && !e.target.closest('.expense-action-menu')) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const popup = open && (
    <div
      className="expense-action-menu fixed bg-white border rounded shadow-lg flex flex-col min-w-[140px] z-[9999]"
      style={{
        top: position.top,
        left: position.left,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      }}
      onClick={e => e.stopPropagation()}
    >
      <button
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-black text-left"
        onClick={(e) => handleOptionClick(e)}
      >
        <Edit2 size={18} className="text-orange-600" /> Edit
      </button>
      <button
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-black text-left"
        onClick={(e) => handleOptionClick(e)}
      >
        <FaTrash size={18} className="text-red-600" /> Delete
      </button>
    </div>
  );

  return (
    <div className="flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
      <button
        ref={buttonRef}
        title="Actions"
        className="hover:bg-gray-100 p-1 rounded"
        onClick={handleMenuClick}
        type="button"
      >
        <FaEllipsisV size={18} />
      </button>
      {popup && createPortal(popup, document.body)}
    </div>
  );
};

const columnDefs = [
  { headerName: "S.No.", valueGetter: "node.rowIndex + 1", width: 80 },
  { headerName: "Expense Name", field: "name", flex: 1 },
  { headerName: "Parent Expense", field: "parent", flex: 1 },
  { headerName: "Created By", field: "createdBy", width: 120 },
  { headerName: "Created On", field: "createdOn", width: 120 },
  {
    headerName: "Actions",
    field: "actions",
    width: 100,
    cellRenderer: ActionCell,
  },
];

export default function AddExpense() {
  const [form, setForm] = useState({ name: "", category: "" });
  const [expenses, setExpenses] = useState(mockExpenses);

  const handleAddExpense = () => {
    if (!form.name || !form.category) return;
    setExpenses([
      {
        id: Date.now(),
        name: form.name,
        parent: "",
        createdBy: "Yash",
        createdOn: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      },
      ...expenses,
    ]);
    setForm({ name: "", category: "" });
  };

  return (
    <div className="min-h-screen p-8 page-fade-in bg-[#f3fbfd]">
      
      <h2 className="text-xl tracking-tight mb-6">
        Manage{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
          Expense
        </span>
      </h2>
     
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>ADD EXPENSE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Expense Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Expense Name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Expense Category <span className="text-red-500">*</span>
              </label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, category: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Expense" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="bg-green-700 text-white"
            onClick={handleAddExpense}
          >
            Add Expense
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="bg-[#c8f0f7]">
          <CardTitle>All Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <AgTable
            rowData={expenses}
            columnDefs={columnDefs}
            height="300px"
            className="ag-theme-alpine"
          />
        </CardContent>
      </Card>
    </div>
  );
}
