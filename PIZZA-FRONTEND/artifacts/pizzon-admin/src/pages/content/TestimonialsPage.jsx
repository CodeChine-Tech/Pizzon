import { useState, useEffect } from 'react';
import PageHeading from '../../components/PageHeading';
import { useToast } from '../../context/ToastContext';

const STORAGE = 'pizzon-admin-testimonials';
function load() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) { const d = JSON.parse(raw); return Array.isArray(d) ? d : []; }
  } catch (_) {}
  return [];
}

export default function TestimonialsPage() {
  const [items, setItems] = useState(load);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(items)); } catch (_) {}
  }, [items]);

  const addTestimonial = (t) => {
    setItems((p) => [...p, { id: Date.now(), ...t }]);
    setAddOpen(false);
    showToast('Testimonial added');
  };

  const updateTestimonial = (id, data) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)));
    setEditing(null);
    showToast('Testimonial updated');
  };

  const removeTestimonial = (t) => {
    if (!window.confirm(`Remove testimonial by "${t.name}"?`)) return;
    setItems((p) => p.filter((x) => x.id !== t.id));
    showToast('Testimonial removed');
  };

  return (
    <div>
      <PageHeading subtitle="Content" title="Testimonials" description="Manage customer testimonials on the website." />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">Testimonials</h2>
          <button type="button" onClick={() => setAddOpen(true)} className="btn-primary text-sm py-2 px-4">Add Testimonial</button>
        </div>
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex w-16 h-16 rounded-full bg-gray-100 items-center justify-center text-3xl mb-4">💬</div>
            <p className="text-gray-600 font-medium">No testimonials yet</p>
            <p className="text-gray-500 text-sm mt-1">Add customer quotes to build trust. Click &quot;Add Testimonial&quot;.</p>
            <button type="button" onClick={() => setAddOpen(true)} className="mt-4 btn-primary text-sm py-2 px-4">Add Testimonial</button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((t) => (
              <li key={t.id} className="p-4 flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-700 italic">&quot;{t.text}&quot;</p>
                  <p className="font-medium text-gray-900 mt-2">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button type="button" onClick={() => setEditing(t)} className="text-sm font-medium" style={{ color: '#e8342e' }}>Edit</button>
                  <button type="button" onClick={() => removeTestimonial(t)} className="text-sm font-medium text-gray-500 hover:text-red-600">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {addOpen && <TestimonialModal onClose={() => setAddOpen(false)} onSave={addTestimonial} />}
      {editing && <TestimonialModal item={editing} onClose={() => setEditing(null)} onSave={(data) => updateTestimonial(editing.id, data)} isEdit />}
    </div>
  );
}

function TestimonialModal({ item, onClose, onSave, isEdit }) {
  const [name, setName] = useState(item?.name ?? '');
  const [role, setRole] = useState(item?.role ?? '');
  const [text, setText] = useState(item?.text ?? '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    onSave({ name: name.trim(), role: role.trim() || 'Customer', text: text.trim() });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">{isEdit ? 'Edit' : 'Add'} Testimonial</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quote *</label>
            <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} className="form-input" required />
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
