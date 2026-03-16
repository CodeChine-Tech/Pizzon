import { useState, useEffect } from 'react';
import PageHeading from '../components/PageHeading';
import { useToast } from '../context/ToastContext';

const STORAGE_MENU = 'pizzon-admin-menu';
const CATEGORIES = ['Pizza', 'Pasta', 'Burgers', 'Salads', 'Desserts', 'Drinks'];
const BADGES = ['', 'Popular', 'New', 'Chef\'s choice'];

const initialItems = () => Object.fromEntries(CATEGORIES.map((c) => [c, []]));

function loadMenu() {
  try {
    const raw = localStorage.getItem(STORAGE_MENU);
    if (raw) {
      const data = JSON.parse(raw);
      if (data && typeof data === 'object') return data;
    }
  } catch (_) {}
  return initialItems();
}

function ItemThumb({ src }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
        {src && failed ? '—' : 'No img'}
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
      <img src={src} alt="" className="w-full h-full object-cover" onError={() => setFailed(true)} />
    </div>
  );
}

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState('Pizza');
  const [items, setItems] = useState(loadMenu);
  const [addOpen, setAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_MENU, JSON.stringify(items));
    } catch (_) {}
  }, [items]);

  const addItem = (item) => {
    setItems((p) => ({ ...p, [activeCat]: [...(p[activeCat] || []), { id: Date.now(), ...item }] }));
    setAddOpen(false);
    showToast('Item added');
  };

  const updateItem = (itemId, updates) => {
    setItems((p) => ({
      ...p,
      [activeCat]: (p[activeCat] || []).map((i) => (i.id === itemId ? { ...i, ...updates } : i)),
    }));
    setEditingItem(null);
    showToast('Item updated');
  };

  const removeItem = (itemId) => {
    if (!window.confirm('Remove this item?')) return;
    setItems((p) => ({ ...p, [activeCat]: (p[activeCat] || []).filter((i) => i.id !== itemId) }));
    showToast('Item removed');
  };

  const moveItem = (index, direction) => {
    const list = items[activeCat] || [];
    const next = direction === 'up' ? index - 1 : index + 1;
    if (next < 0 || next >= list.length) return;
    const copy = [...list];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    setItems((p) => ({ ...p, [activeCat]: copy }));
    showToast('Order updated');
  };

  const list = items[activeCat] || [];

  return (
    <div>
      <PageHeading subtitle="Site control" title="Menu & Products" description="Edit items shown on the website menu. Add image URL for thumbnails." />
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActiveCat(c)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${activeCat === c ? 'border-[#e8342e] text-white bg-[#e8342e]' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">{activeCat}</h2>
          <button type="button" onClick={() => setAddOpen(true)} className="btn-primary text-sm py-2 px-4">Add Item</button>
        </div>
        {list.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex w-16 h-16 rounded-full bg-gray-100 items-center justify-center text-3xl mb-4">🍕</div>
            <p className="text-gray-600 font-medium">No items in {activeCat} yet</p>
            <p className="text-gray-500 text-sm mt-1">Click &quot;Add Item&quot; to add your first product.</p>
            <button type="button" onClick={() => setAddOpen(true)} className="mt-4 btn-primary text-sm py-2 px-4">Add Item</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase w-20">Image</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase hidden sm:table-cell">Description</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Badge</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Price</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase text-right w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <ItemThumb src={item.image} />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell max-w-[200px] truncate">{item.desc || '—'}</td>
                    <td className="px-4 py-3">
                      {item.badge ? (
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-[#e8342e]/10 text-[#e8342e]">{item.badge}</span>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#e8342e' }}>{item.price}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button type="button" onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none" title="Move up">↑</button>
                        <button type="button" onClick={() => moveItem(index, 'down')} disabled={index === list.length - 1} className="p-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none" title="Move down">↓</button>
                        <button type="button" onClick={() => setEditingItem(item)} className="text-sm font-medium px-2 py-1" style={{ color: '#e8342e' }}>Edit</button>
                        <button type="button" onClick={() => removeItem(item.id)} className="text-sm font-medium text-gray-500 hover:text-red-600 px-2 py-1">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {addOpen && <MenuItemModal category={activeCat} onClose={() => setAddOpen(false)} onSave={addItem} />}
      {editingItem && (
        <MenuItemModal
          category={activeCat}
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={(data) => updateItem(editingItem.id, data)}
          isEdit
        />
      )}
    </div>
  );
}

function MenuItemModal({ category, item, onClose, onSave, isEdit }) {
  const [name, setName] = useState(item?.name ?? '');
  const [desc, setDesc] = useState(item?.desc ?? '');
  const [price, setPrice] = useState(item?.price ?? '');
  const [image, setImage] = useState(item?.image ?? '');
  const [badge, setBadge] = useState(item?.badge ?? '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) return;
    onSave({
      name: name.trim(),
      desc: desc.trim() || null,
      price: price.trim(),
      image: image.trim() || null,
      badge: badge || null,
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">{isEdit ? 'Edit' : 'Add'} Item — {category}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} className="form-input" placeholder="https://..." />
            {image && (
              <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                <img src={image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-input" placeholder="Short description" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
            <select value={badge} onChange={(e) => setBadge(e.target.value)} className="form-input">
              {BADGES.map((b) => (
                <option key={b || 'none'} value={b}>{b || 'None'}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-input" required placeholder="£9.99" />
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
