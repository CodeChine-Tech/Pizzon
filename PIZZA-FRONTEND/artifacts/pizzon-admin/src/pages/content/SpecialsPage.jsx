import { useState, useEffect } from 'react';
import PageHeading from '../../components/PageHeading';
import { useToast } from '../../context/ToastContext';

const STORAGE = 'pizzon-admin-specials';
function load() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) { const d = JSON.parse(raw); return Array.isArray(d) ? d : []; }
  } catch (_) {}
  return [];
}

function SpecialThumb({ src }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
        No img
      </div>
    );
  }
  return (
    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
      <img src={src} alt="" className="w-full h-full object-cover" onError={() => setFailed(true)} />
    </div>
  );
}

export default function SpecialsPage() {
  const [specials, setSpecials] = useState(load);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(specials)); } catch (_) {}
  }, [specials]);

  const addSpecial = (s) => {
    setSpecials((p) => [...p, { id: Date.now(), ...s }]);
    setAddOpen(false);
    showToast('Special added');
  };

  const updateSpecial = (id, data) => {
    setSpecials((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)));
    setEditing(null);
    showToast('Special updated');
  };

  const removeSpecial = (s) => {
    if (!window.confirm(`Remove "${s.title}"?`)) return;
    setSpecials((p) => p.filter((x) => x.id !== s.id));
    showToast('Special removed');
  };

  return (
    <div>
      <PageHeading subtitle="Content" title="Specials" description="Manage special offers shown on the website." />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">Special Offers</h2>
          <button type="button" onClick={() => setAddOpen(true)} className="btn-primary text-sm py-2 px-4">Add Special</button>
        </div>
        {specials.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex w-16 h-16 rounded-full bg-gray-100 items-center justify-center text-3xl mb-4">🏷️</div>
            <p className="text-gray-600 font-medium">No specials yet</p>
            <p className="text-gray-500 text-sm mt-1">Click &quot;Add Special&quot; to create an offer.</p>
            <button type="button" onClick={() => setAddOpen(true)} className="mt-4 btn-primary text-sm py-2 px-4">Add Special</button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {specials.map((s) => (
              <li key={s.id} className="p-4 flex items-center gap-4">
                <SpecialThumb src={s.image} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">{s.title}</p>
                  <p className="text-sm text-gray-500">{s.tag} · <span className="font-semibold" style={{ color: '#e8342e' }}>{s.price}</span></p>
                  {s.desc && <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">{s.desc}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button type="button" onClick={() => setEditing(s)} className="text-sm font-medium" style={{ color: '#e8342e' }}>Edit</button>
                  <button type="button" onClick={() => removeSpecial(s)} className="text-sm font-medium text-gray-500 hover:text-red-600">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {addOpen && <SpecialModal onClose={() => setAddOpen(false)} onSave={addSpecial} />}
      {editing && <SpecialModal item={editing} onClose={() => setEditing(null)} onSave={(data) => updateSpecial(editing.id, data)} isEdit />}
    </div>
  );
}

function SpecialModal({ item, onClose, onSave, isEdit }) {
  const [title, setTitle] = useState(item?.title ?? '');
  const [tag, setTag] = useState(item?.tag ?? 'Special Offer');
  const [desc, setDesc] = useState(item?.desc ?? '');
  const [price, setPrice] = useState(item?.price ?? '');
  const [image, setImage] = useState(item?.image ?? '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price.trim()) return;
    onSave({ title: title.trim(), tag: tag.trim() || 'Special', desc: desc.trim(), price: price.trim(), image: image.trim() || null });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">{isEdit ? 'Edit' : 'Add'} Special</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} className="form-input" placeholder="https://..." />
            {image && (
              <div className="mt-2 w-24 h-16 rounded-lg overflow-hidden bg-gray-100">
                <img src={image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-input" required placeholder="£19.99" />
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
