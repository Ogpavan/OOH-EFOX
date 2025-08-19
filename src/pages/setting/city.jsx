import BackButton from '@/components/ui/BackButton';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AgTable from '@/components/common/AgTable';
import { showCustomToast } from '@/customcomponent/CustomToast';
import { CustomConfirm } from '@/customcomponent/CustomConfirm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog.jsx';
import { Edit, Trash2 } from 'lucide-react';

// Dummy API functions (replace with real API calls)
const fetchCountries = async () => [
  { id: 1, name: "India" },
  { id: 2, name: "United States" },
];
const fetchStates = async () => [
  { id: 1, name: "Maharashtra", countryId: 1 },
  { id: 2, name: "California", countryId: 2 },
];
const fetchCities = async () => [
  { id: 1, name: "Mumbai", stateId: 1, countryId: 1 },
  { id: 2, name: "Los Angeles", stateId: 2, countryId: 2 },
];
const addCity = async (c) => c;
const updateCity = async (c) => c;
const deleteCity = async (id) => id;

export default function SettingCity() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({ name: '', countryId: '', stateId: '' });
  const [editingId, setEditingId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    fetchCountries().then(setCountries);
    fetchStates().then(setStates);
    fetchCities().then(setCities);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if country changes, clear stateId
    if (name === 'countryId') {
      setForm(prev => ({ ...prev, countryId: value, stateId: '' }));
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', countryId: '', stateId: '' });
    setPopupOpen(true);
  };

  const handleEdit = (row) => {
    setForm({ name: row.name, countryId: String(row.countryId), stateId: String(row.stateId) });
    setEditingId(row.id);
    setPopupOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault && e.preventDefault();
    if (!form.name || !form.countryId || !form.stateId) {
      showCustomToast({ type: 'error', message: 'Please enter city name and select country & state.' });
      return;
    }
    try {
      if (editingId) {
        const updated = await updateCity({ id: editingId, name: form.name, countryId: Number(form.countryId), stateId: Number(form.stateId) });
        setCities(cities.map(c => c.id === editingId ? updated : c));
        showCustomToast({ type: 'success', message: 'City updated successfully!' });
        setEditingId(null);
      } else {
        const newItem = { id: Date.now(), name: form.name, countryId: Number(form.countryId), stateId: Number(form.stateId) };
        const added = await addCity(newItem);
        setCities([...cities, added]);
        showCustomToast({ type: 'success', message: 'City added successfully!' });
      }
      setForm({ name: '', countryId: '', stateId: '' });
      setPopupOpen(false);
    } catch (err) {
      showCustomToast({ type: 'error', message: 'Operation failed!' });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteCity(deleteId);
      setCities(cities.filter(c => c.id !== deleteId));
      showCustomToast({ type: 'success', message: 'City deleted successfully!' });
    } catch (err) {
      showCustomToast({ type: 'error', message: 'Delete failed!' });
    }
    setConfirmOpen(false);
    setDeleteId(null);
    if (editingId === deleteId) {
      setEditingId(null);
      setForm({ name: '', countryId: '', stateId: '' });
    }
  };

  const columnDefs = [
    {
      headerName: 'S.No',
      valueGetter: (params) => (params.node ? params.node.rowIndex + 1 : ''),
      width: 90,
      sortable: false,
      filter: false,
      cellClass: 'text-center',
    },
    {
      headerName: 'City Name',
      field: 'name',
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'State',
      field: 'stateId',
      valueGetter: (params) => {
        const id = params.data?.stateId;
        const s = states.find(x => x.id === id);
        return s ? s.name : '';
      },
      width: 220,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Country',
      field: 'countryId',
      valueGetter: (params) => {
        const id = params.data?.countryId;
        const c = countries.find(x => x.id === id);
        return c ? c.name : '';
      },
      width: 220,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Actions',
      field: 'actions',
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

  // states filtered by selected country for the select dropdown
  const filteredStates = states.filter(s => String(s.countryId) === String(form.countryId));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <BackButton />
          <h2 className="text-xl font-light tracking-tight">
            Manage <span className="font-bold text-3xl" style={{ color: '#EC5800' }}>City</span>
          </h2>
        </div>

        <div>
          <button type="button" onClick={openAdd} className="bg-orange-600 text-white px-3 py-2 rounded">Add New</button>
        </div>
      </div>

      <AgTable rowData={cities} columnDefs={columnDefs} height="400px" />
      {cities.length === 0 && <div className="py-4 text-center text-gray-500">No cities found.</div>}

      {popupOpen && (
        <Dialog open={popupOpen} onOpenChange={(open) => { setPopupOpen(open); if (!open) { setEditingId(null); setForm({ name: '', countryId: '', stateId: '' }); } }}>
          <DialogContent className="max-w-lg w-full">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit City' : 'Add City'}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2 w-full">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="city-country">Country</Label>
                <select id="city-country" name="countryId" value={form.countryId} onChange={handleChange} className="w-full px-3 py-2 rounded border bg-white">
                  <option value="">Select country</option>
                  {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="city-state">State</Label>
                <select id="city-state" name="stateId" value={form.stateId} onChange={handleChange} className="w-full px-3 py-2 rounded border bg-white">
                  <option value="">Select state</option>
                  {filteredStates.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="city-name">City Name</Label>
                <Input id="city-name" name="name" value={form.name} onChange={handleChange} className="w-full" placeholder="e.g. Mumbai" />
              </div>
            </div>

            <DialogFooter>
              <button type="button" className="px-4 py-2 rounded border" onClick={() => { setPopupOpen(false); setEditingId(null); setForm({ name: '', countryId: '', stateId: '' }); }}>Cancel</button>
              <button type="button" className="ml-2 bg-orange-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>{editingId ? 'Update City' : 'Add City'}</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {confirmOpen && (
        <CustomConfirm
          heading="Delete City"
          message="Are you sure you want to delete this city?"
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
