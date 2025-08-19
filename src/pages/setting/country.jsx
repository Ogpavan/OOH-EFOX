import BackButton from '@/components/ui/BackButton';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AgTable from '@/components/common/AgTable';
import { showCustomToast } from '@/customcomponent/CustomToast';
import { CustomConfirm } from '@/customcomponent/CustomConfirm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog.jsx'; // <-- added
import { Edit, Trash2 } from 'lucide-react';

// Dummy API functions (replace with real API calls)
const fetchCountries = async () => [
  { id: 1, name: "India", code: "IN" },
  { id: 2, name: "United States", code: "US" },
];
const addCountry = async (country) => country;
const updateCountry = async (country) => country;
const deleteCountry = async (id) => id;

export default function SettingCountry() {
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({ name: '', code: '' });
  const [editingId, setEditingId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [addPopupOpen, setAddPopupOpen] = useState(false); // <-- added

  // company name from localStorage (do NOT show CompanyID in UI)
  const companyName = localStorage.getItem("CompanyName") || ""; // only show explicit CompanyName, hide CompanyID

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault && e.preventDefault();
    try {
      if (editingId) {
        const updated = await updateCountry({ id: editingId, ...form });
        setCountries(countries.map(c => c.id === editingId ? updated : c));
        showCustomToast({ type: "success", message: "Country updated successfully!" });
        setEditingId(null);
      } else {
        const added = await addCountry({ ...form, id: Date.now() });
        setCountries([...countries, added]);
        showCustomToast({ type: "success", message: "Country added successfully!" });
      }
      setForm({ name: '', code: '' });
      setAddPopupOpen(false); // close popup if open
    } catch (err) {
      showCustomToast({ type: "error", message: "Operation failed!" });
    }
  };

  // open popup for edit — now opens dialog instead of filling inline form
  const handleEdit = (country) => {
    setForm({ name: country.name, code: country.code });
    setEditingId(country.id);
    setAddPopupOpen(true);
  };

  // Show confirm dialog before delete
  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    try {
      await deleteCountry(deleteId);
      setCountries(countries.filter(c => c.id !== deleteId));
      showCustomToast({ type: "success", message: "Country deleted successfully!" });
    } catch (err) {
      showCustomToast({ type: "error", message: "Delete failed!" });
    }
    setConfirmOpen(false);
    setDeleteId(null);
    if (editingId === deleteId) {
      setEditingId(null);
      setForm({ name: '', code: '' });
    }
  };

  // AG Grid columns
  const columnDefs = [
    // Serial number column (computed from row index)
    {
      headerName: "S.No",
      valueGetter: (params) => (params.node ? params.node.rowIndex + 1 : ""),
      width: 90,
      sortable: false,
      filter: false,
      cellClass: "text-center",
    },

    // Country name column (full width)
    {
      headerName: "Country Name",
      field: "name",
      flex: 1,
      sortable: true,
      filter: true,
    },

    // Actions
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Edit"
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => handleEdit(params.data)}
          >
            <Edit size={16} className="text-blue-600" />
          </button>
          <button
            type="button"
            title="Delete"
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => handleDelete(params.data.id)}
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      ),
      width: 160,
      sortable: false,
      filter: false,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <BackButton />
          <h2 className="text-xl font-light tracking-tight">
            Manage{" "}
            <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
              Country
            </span>
          </h2>
        </div>

        {/* Add New button aligned to right */}
        <div>
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: '', code: '' });
              setAddPopupOpen(true);
            }}
            className="bg-orange-600 text-white px-3 py-2 rounded"
          >
            Add New
          </button>
        </div>
      </div>

      {/* Removed inline add/edit inputs — use dialog popup instead */}

      <AgTable
        rowData={countries}
        columnDefs={columnDefs}
        height="400px"
      />
      {countries.length === 0 && (
        <div className="py-4 text-center text-gray-500">
          No countries found.
        </div>
      )}

      {/* Add / Edit popup */}
      {addPopupOpen && (
        <Dialog
          open={addPopupOpen}
          onOpenChange={(open) => {
            setAddPopupOpen(open);
            if (!open) {
              // reset when dialog closed
              setEditingId(null);
              setForm({ name: '', code: '' });
            }
          }}
        >
          {/* make dialog content a reasonable max-width and full width inside */}
          <DialogContent className="max-w-lg w-full">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Country" : "Add Country"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2 w-full">
              {companyName && (
                <div className="w-full flex flex-col gap-2">
                  <Label>Company</Label>
                  <div className="mt-1 px-3 py-2 rounded border bg-gray-50 w-full">
                    {companyName}
                  </div>
                </div>
              )}

              {/* Only Country Name input shown (removed Country Code) */}
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="popup-country-name">Country Name</Label>
                <Input
                  id="popup-country-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="e.g. India"
                />
              </div>
            </div>

            <DialogFooter>
              <button
                type="button"
                className="px-4 py-2 rounded border"
                onClick={() => {
                  setAddPopupOpen(false);
                  setEditingId(null);
                  setForm({ name: '', code: '' });
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ml-2 bg-orange-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                {editingId ? "Update Country" : "Add Country"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {confirmOpen && (
        <CustomConfirm
          heading="Delete Country"
          message="Are you sure you want to delete this country?"
          cancelText="Cancel"
          actionText="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmOpen(false)}
          open={confirmOpen}
        />
      )}
    </div>
  );
}
