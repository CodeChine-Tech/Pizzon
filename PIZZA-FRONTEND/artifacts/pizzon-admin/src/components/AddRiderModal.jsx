import { useState } from 'react';
import { useDispatch } from '../context/DispatchContext';
import { useToast } from '../context/ToastContext';

export default function AddRiderModal({ onClose }) {
  const { addRider } = useDispatch();
  const showToast = useToast();
  const [name, setName] = useState('');
  const [status, setStatus] = useState('ONLINE');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const id = 'r' + Date.now();
    addRider({
      id,
      name: name.trim(),
      status,
      lat: 51.5 + (Math.random() - 0.5) * 0.05,
      lng: -0.12 + (Math.random() - 0.5) * 0.05,
      activeOrders: 0,
      distance: '—',
    });
    showToast('Rider added');
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">Add Rider</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required placeholder="Rider 5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-input">
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-700 text-sm">Cancel</button>
            <button type="submit" className="flex-1 btn-primary">Add Rider</button>
          </div>
        </form>
      </div>
    </>
  );
}
