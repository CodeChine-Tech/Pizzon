import { useState, useEffect } from 'react';
import PageHeading from '../components/PageHeading';
import { useToast } from '../context/ToastContext';

const STORAGE = 'pizzon-admin-users';
function load() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) { const d = JSON.parse(raw); return Array.isArray(d) ? d : []; }
  } catch (_) {}
  return [];
}

export default function UsersPage() {
  const [users, setUsers] = useState(load);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(users)); } catch (_) {}
  }, [users]);

  const addUser = (u) => {
    setUsers((p) => [...p, { id: Date.now(), ...u }]);
    setAddOpen(false);
    showToast('User invited');
  };

  const updateUser = (id, data) => {
    setUsers((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)));
    setEditing(null);
    showToast('User updated');
  };

  const removeUser = (u) => {
    if (!window.confirm(`Remove user "${u.email}"?`)) return;
    setUsers((p) => p.filter((x) => x.id !== u.id));
    showToast('User removed');
  };

  return (
    <div>
      <PageHeading subtitle="Admin" title="Users" description="Staff and admin accounts that can access this panel." />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">Panel Users</h2>
          <button type="button" onClick={() => setAddOpen(true)} className="btn-primary text-sm py-2 px-4">Invite User</button>
        </div>
        {users.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex w-16 h-16 rounded-full bg-gray-100 items-center justify-center text-3xl mb-4">👥</div>
            <p className="text-gray-600 font-medium">No additional users yet</p>
            <p className="text-gray-500 text-sm mt-1">Invite staff to access the admin panel. Click &quot;Invite User&quot;.</p>
            <button type="button" onClick={() => setAddOpen(true)} className="mt-4 btn-primary text-sm py-2 px-4">Invite User</button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {users.map((u) => (
              <li key={u.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{u.email}</p>
                  <p className="text-sm text-gray-500">{u.role}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setEditing(u)} className="text-sm font-medium" style={{ color: '#e8342e' }}>Edit</button>
                  <button type="button" onClick={() => removeUser(u)} className="text-sm font-medium text-gray-500 hover:text-red-600">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {addOpen && <UserModal onClose={() => setAddOpen(false)} onSave={addUser} />}
      {editing && <UserModal item={editing} onClose={() => setEditing(null)} onSave={(data) => updateUser(editing.id, data)} isEdit />}
    </div>
  );
}

function UserModal({ item, onClose, onSave, isEdit }) {
  const [email, setEmail] = useState(item?.email ?? '');
  const [role, setRole] = useState(item?.role ?? 'dispatcher');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSave({ email: email.trim(), role });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">{isEdit ? 'Edit' : 'Invite'} User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="form-input">
              <option value="admin">Admin</option>
              <option value="dispatcher">Dispatcher</option>
              <option value="kitchen">Kitchen</option>
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-700 text-sm">Cancel</button>
            <button type="submit" className="flex-1 btn-primary">{isEdit ? 'Save' : 'Invite'}</button>
          </div>
        </form>
      </div>
    </>
  );
}
