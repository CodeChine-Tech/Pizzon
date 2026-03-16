import { useState } from 'react';
import { useDispatch } from '../context/DispatchContext';
import PageHeading from '../components/PageHeading';
import AddRiderModal from '../components/AddRiderModal';
import EditRiderModal from '../components/EditRiderModal';
import { useToast } from '../context/ToastContext';

export default function RidersPage() {
  const { riders, removeRider } = useDispatch();
  const [addOpen, setAddOpen] = useState(false);
  const [editingRider, setEditingRider] = useState(null);
  const showToast = useToast();

  const handleDelete = (r) => {
    if (!window.confirm(`Remove rider "${r.name}"?`)) return;
    removeRider(r.id);
    showToast('Rider removed');
  };

  return (
    <div>
      <PageHeading subtitle="Dispatch" title="Riders" description="Manage delivery riders and their status." />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">All Riders</h2>
          <button type="button" onClick={() => setAddOpen(true)} className="btn-primary text-sm py-2 px-4">Add Rider</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Distance</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Active Orders</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${r.status === 'ONLINE' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{r.distance}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{r.activeOrders}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setEditingRider(r)} className="text-sm font-medium" style={{ color: '#e8342e' }}>Edit</button>
                      <button type="button" onClick={() => handleDelete(r)} className="text-sm font-medium text-gray-500 hover:text-red-600">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {addOpen && <AddRiderModal onClose={() => setAddOpen(false)} />}
      {editingRider && <EditRiderModal rider={editingRider} onClose={() => setEditingRider(null)} />}
    </div>
  );
}
