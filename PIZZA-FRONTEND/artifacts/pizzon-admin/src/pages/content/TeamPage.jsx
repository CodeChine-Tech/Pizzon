import { useState, useEffect } from 'react';
import PageHeading from '../../components/PageHeading';
import { useToast } from '../../context/ToastContext';

const STORAGE = 'pizzon-admin-team';
function load() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) { const d = JSON.parse(raw); return Array.isArray(d) ? d : []; }
  } catch (_) {}
  return [];
}

function MemberThumb({ src }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm flex-shrink-0">
        ?
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
      <img src={src} alt="" className="w-full h-full object-cover" onError={() => setFailed(true)} />
    </div>
  );
}

export default function TeamPage() {
  const [members, setMembers] = useState(load);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(members)); } catch (_) {}
  }, [members]);

  const addMember = (member) => {
    setMembers((p) => [...p, { id: Date.now(), ...member }]);
    setAddOpen(false);
    showToast('Member added');
  };

  const updateMember = (id, data) => {
    setMembers((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)));
    setEditing(null);
    showToast('Member updated');
  };

  const removeMember = (m) => {
    if (!window.confirm(`Remove "${m.name}"?`)) return;
    setMembers((p) => p.filter((x) => x.id !== m.id));
    showToast('Member removed');
  };

  return (
    <div>
      <PageHeading subtitle="Content" title="Team" description="Edit team members shown on the website." />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">Team Members</h2>
          <button type="button" onClick={() => setAddOpen(true)} className="btn-primary text-sm py-2 px-4">Add Member</button>
        </div>
        {members.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex w-16 h-16 rounded-full bg-gray-100 items-center justify-center text-3xl mb-4">👥</div>
            <p className="text-gray-600 font-medium">No team members yet</p>
            <p className="text-gray-500 text-sm mt-1">Click &quot;Add Member&quot; to add your first team member.</p>
            <button type="button" onClick={() => setAddOpen(true)} className="mt-4 btn-primary text-sm py-2 px-4">Add Member</button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {members.map((m) => (
              <li key={m.id} className="p-4 flex items-center gap-4">
                <MemberThumb src={m.image} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">{m.name}</p>
                  <p className="text-sm" style={{ color: '#e8342e' }}>{m.role}</p>
                  {m.bio && <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{m.bio}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button type="button" onClick={() => setEditing(m)} className="text-sm font-medium" style={{ color: '#e8342e' }}>Edit</button>
                  <button type="button" onClick={() => removeMember(m)} className="text-sm font-medium text-gray-500 hover:text-red-600">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {addOpen && <TeamMemberModal onClose={() => setAddOpen(false)} onSave={addMember} />}
      {editing && <TeamMemberModal item={editing} onClose={() => setEditing(null)} onSave={(data) => updateMember(editing.id, data)} isEdit />}
    </div>
  );
}

function TeamMemberModal({ item, onClose, onSave, isEdit }) {
  const [name, setName] = useState(item?.name ?? '');
  const [role, setRole] = useState(item?.role ?? '');
  const [bio, setBio] = useState(item?.bio ?? '');
  const [image, setImage] = useState(item?.image ?? '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), role: role.trim() || 'Staff', bio: bio.trim() || '', image: image.trim() || null });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">{isEdit ? 'Edit' : 'Add'} Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} className="form-input" placeholder="https://..." />
            {image && (
              <div className="mt-2 w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                <img src={image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="form-input" placeholder="e.g. Head Chef" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea rows={2} value={bio} onChange={(e) => setBio(e.target.value)} className="form-input" />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-700 text-sm">Cancel</button>
            <button type="submit" className="flex-1 btn-primary">{isEdit ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>
    </>
  );
}
