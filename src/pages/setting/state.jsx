import BackButton from '@/components/ui/BackButton';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AgTable from '@/components/common/AgTable';
import { showCustomToast } from '@/customcomponent/CustomToast';
import { CustomConfirm } from '@/customcomponent/CustomConfirm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog.jsx';
import { Edit, Trash2 } from 'lucide-react';

const fetchCountries = async () => [
  { id: 1, name: "India" },
  { id: 2, name: "United States" },
];
const fetchStates = async () => [
  { id: 1, name: "Maharashtra", countryId: 1 },
  { id: 2, name: "California", countryId: 2 },
];
const addState = async (s) => s;
const updateState = async (s) => s;
const deleteState = async (id) => id;

export default function SettingState() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [form, setForm] = useState({ name: '', code: '', countryId: '' });
  const [editingId, setEditingId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    fetchCountries().then(setCountries);
    fetchStates().then(setStates);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', code: '', countryId: '' });
    setPopupOpen(true);
  };

  const handleEdit = (row) => {
    setForm({ name: row.name, code: row.code, countryId: String(row.countryId) });
    setEditingId(row.id);
    setPopupOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault && e.preventDefault();
    if (!form.name || !form.countryId) {
      showCustomToast({ type: 'error', message: 'Please enter state name and select country.' });
      return;
    }
    try {
      if (editingId) {
        const updated = await updateState({ id: editingId, ...form, countryId: Number(form.countryId) });
        setStates(states.map(s => s.id === editingId ? updated : s));
        showCustomToast({ type: 'success', message: 'State updated successfully!' });
        setEditingId(null);
      } else {
        const newItem = { id: Date.now(), ...form, countryId: Number(form.countryId) };
        const added = await addState(newItem);
        setStates([...states, added]);
        showCustomToast({ type: 'success', message: 'State added successfully!' });
      }
      setForm({ name: '', code: '', countryId: '' });
      setPopupOpen(false);
    } catch (err) {
      showCustomToast({ type: 'error', message: 'Operation failed!' });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteState(deleteId);
      setStates(states.filter(s => s.id !== deleteId));
      showCustomToast({ type: 'success', message: 'State deleted successfully!' });
    } catch (err) {
      showCustomToast({ type: 'error', message: 'Delete failed!' });
    }
    setConfirmOpen(false);
    setDeleteId(null);
    if (editingId === deleteId) {
      setEditingId(null);
      setForm({ name: '', code: '', countryId: '' });
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
      headerName: 'State Name',
      field: 'name',
      flex: 1,
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <BackButton />
          <h2 className="text-xl font-light tracking-tight">
            Manage <span className="font-bold text-3xl" style={{ color: '#EC5800' }}>State</span>
          </h2>
        </div>

        <div>
          <button type="button" onClick={openAdd} className="bg-orange-600 text-white px-3 py-2 rounded">Add New</button>
        </div>
      </div>

      <AgTable rowData={states} columnDefs={columnDefs} height="400px" />
      {states.length === 0 && <div className="py-4 text-center text-gray-500">No states found.</div>}

      {popupOpen && (
        <Dialog open={popupOpen} onOpenChange={(open) => { setPopupOpen(open); if (!open) { setEditingId(null); setForm({ name: '', code: '', countryId: '' }); } }}>
          <DialogContent className="max-w-lg w-full">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit State' : 'Add State'}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2 w-full">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="state-country">Country</Label>
                <select id="state-country" name="countryId" value={form.countryId} onChange={handleChange} className="w-full px-3 py-2 rounded border bg-white">
                  <option value="">Select country</option>
                  {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="state-code">State Code</Label>
                <Input id="state-code" name="code" value={form.code} onChange={handleChange} className="w-full" placeholder="e.g. MH / CA" />
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="state-name">State Name</Label>
                <Input id="state-name" name="name" value={form.name} onChange={handleChange} className="w-full" placeholder="e.g. Maharashtra" />
              </div>
            </div>

            <DialogFooter>
              <button type="button" className="px-4 py-2 rounded border" onClick={() => { setPopupOpen(false); setEditingId(null); setForm({ name: '', code: '', countryId: '' }); }}>Cancel</button>
              <button type="button" className="ml-2 bg-orange-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>{editingId ? 'Update State' : 'Add State'}</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {confirmOpen && (
        <CustomConfirm
          heading="Delete State"
          message="Are you sure you want to delete this state?"
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
