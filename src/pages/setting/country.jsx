import BackButton from '@/components/ui/BackButton';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AgTable from '@/components/common/AgTable';
import { showCustomToast } from '@/customcomponent/CustomToast';
import { CustomConfirm } from '@/customcomponent/CustomConfirm';

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

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (err) {
      showCustomToast({ type: "error", message: "Operation failed!" });
    }
  };

  const handleEdit = (country) => {
    setForm({ name: country.name, code: country.code });
    setEditingId(country.id);
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
    { headerName: "Name", field: "name", flex: 1 },
    { headerName: "Code", field: "code", flex: 1 },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div>
          <button
            className="text-blue-600 mr-2 underline"
            onClick={() => handleEdit(params.data)}
          >
            Edit
          </button>
          <button
            className="text-red-600 underline"
            onClick={() => handleDelete(params.data.id)}
          >
            Delete
          </button>
        </div>
      ),
      flex: 1,
      sortable: false,
      filter: false,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center py-5">
        <BackButton />
        <h2 className="text-xl font-light tracking-tight">
          Manage{" "}
          <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
            Country
          </span>
        </h2>
      </div>
      <form className="flex gap-4 items-end mb-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="country-name">Country Name</Label>
          <Input
            id="country-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-40"
            required
          />
        </div>
        <div>
          <Label htmlFor="country-code">Country Code</Label>
          <Input
            id="country-code"
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-20"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            className="ml-2 px-3 py-2 rounded border"
            onClick={() => {
              setEditingId(null);
              setForm({ name: '', code: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>
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
