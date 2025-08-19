import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog.jsx";
import { Alert } from "@/components/ui/alert.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import AgTable from "@/components/common/AgTable.jsx";
import BackButton from "@/components/ui/BackButton";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function ActionsCellRenderer({ data, openModal, deleteRole }) {
  return (
    <div className="flex justify-center">
      <Button size="sm" variant="outline" onClick={() => openModal(data)}>Edit</Button>
      <Button size="sm" variant="destructive" onClick={() => deleteRole(data)} className="ml-2">Delete</Button>
    </div>
  );
}

export default function SettingRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [form, setForm] = useState({ Name: "", Role_Id: "" });

  // Get CompanyID and LoginID from localStorage
  const getCompanyID = () => localStorage.getItem("CompanyID");
  const getLoginID = () => localStorage.getItem("LoginID");

  // AG Grid column definitions
  const columnDefs = [
    { headerName: "Name", field: "Name", flex: 1 },
    // { headerName: "Role Id", field: "Role_Id", flex: 1 },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <ActionsCellRenderer
          data={params.data}
          openModal={openModal}
          deleteRole={deleteRole}
        />
      ),
      flex: 1,
     
    },
  ];

  // Fetch roles
  const fetchRoles = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/get/roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CompanyID: getCompanyID() }),
      });
      const data = await res.json();
      if (data.status) setRoles(data.data);
      else setError(data.message || "Failed to fetch roles");
    } catch (e) {
      setError("Error fetching roles");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open modal for add/edit
  const openModal = (role = null) => {
    setEditRole(role);
    setForm(role ? { Name: role.Name, Role_Id: role.Role_Id } : { Name: "", Role_Id: "" });
    setModalOpen(true);
  };

  // Save role (add or update)
  const saveRole = async () => {
    setLoading(true);
    setError("");
    const endpoint = editRole ? "update/roles" : "insert/roles";
    const payload = {
      CompanyID: getCompanyID(),
      Name: form.Name,
      Role_Id: form.Role_Id,
      LoginID: getLoginID(),
      ...(editRole && { ID: editRole.ID }),
    };
    try {
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.status) {
        setModalOpen(false);
        fetchRoles();
      } else setError(data.message || "Failed to save role");
    } catch (e) {
      setError("Error saving role");
    }
    setLoading(false);
  };

  // Delete role
  const deleteRole = async (role) => {
    if (!window.confirm("Delete this role?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/delete/roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CompanyID: getCompanyID(),
          ID: role.ID,
          LoginID: getLoginID(),
        }),
      });
      const data = await res.json();
      if (data.status) fetchRoles();
      else setError(data.message || "Failed to delete role");
    } catch (e) {
      setError("Error deleting role");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center py-5">
              
                      <BackButton />
                      <h2 className="text-xl font-light tracking-tight">
                        Manage{" "}
                        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
                         Roles
                        </span>
                      </h2>
                    </div>
        <Button onClick={() => openModal()} className="mb-4">Add Role</Button>
      </div>
      {error && <Alert variant="destructive">{error}</Alert>}
      <div className="w-[800px] mx-auto"> {/* Reduce width and center table */}
        {loading ? (
          <Skeleton className="h-32 w-full" />
        ) : (
          <AgTable
            rowData={roles}
            columnDefs={columnDefs}
            height="600px"
          />
        )}
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editRole ? "Edit Role" : "Add Role"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              label="Role Name"
              name="Name"
              value={form.Name}
              onChange={handleChange}
              required
            />
            {/* <Input
              label="Role Id"
              name="Role_Id"
              value={form.Role_Id}
              onChange={handleChange}
              required
            /> */}
          </div>
          <DialogFooter>
            <Button onClick={saveRole} disabled={loading}>
              {editRole ? "Update" : "Create"}
            </Button>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
