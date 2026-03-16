import { useState, useEffect } from 'react';
import PageHeading from '../components/PageHeading';
import { useToast } from '../context/ToastContext';

const STORAGE = 'pizzon-admin-coupons';
function load() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) { const d = JSON.parse(raw); return Array.isArray(d) ? d : []; }
  } catch (_) {}
  return [];
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(load);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(coupons)); } catch (_) {}
  }, [coupons]);

  const addCoupon = (c) => {
    setCoupons((p) => [...p, { id: Date.now(), ...c }]);
    setAddOpen(false);
    showToast('Coupon created');
  };

  const updateCoupon = (id, data) => {
    setCoupons((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)));
    setEditing(null);
    showToast('Coupon updated');
  };

  const removeCoupon = (c) => {
    if (!window.confirm(`Delete coupon "${c.code}"?`)) return;
    setCoupons((p) => p.filter((x) => x.id !== c.id));
    showToast('Coupon removed');
  };

  return (
    <div>
      <PageHeading subtitle="Site control" title="Coupons" description="Discount codes for checkout on the website." />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">Discount Codes</h2>
          <button type="button" onClick={() => setAddOpen(true)} className="btn-primary text-sm py-2 px-4">Create Coupon</button>
        </div>
        {coupons.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex w-16 h-16 rounded-full bg-gray-100 items-center justify-center text-3xl mb-4">🎫</div>
            <p className="text-gray-600 font-medium">No coupons yet</p>
            <p className="text-gray-500 text-sm mt-1">Create discount codes for customers. Click &quot;Create Coupon&quot;.</p>
            <button type="button" onClick={() => setAddOpen(true)} className="mt-4 btn-primary text-sm py-2 px-4">Create Coupon</button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {coupons.map((c) => (
              <li key={c.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{c.code}</p>
                  <p className="text-sm text-gray-500">{c.type} {c.value}</p>
                  {(c.validUntil || c.maxUses != null) && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {c.validUntil && `Valid until ${c.validUntil}`}
                      {c.validUntil && c.maxUses != null && ' · '}
                      {c.maxUses != null && c.maxUses !== '' && `Max uses ${c.maxUses}`}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setEditing(c)} className="text-sm font-medium" style={{ color: '#e8342e' }}>Edit</button>
                  <button type="button" onClick={() => removeCoupon(c)} className="text-sm font-medium text-gray-500 hover:text-red-600">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {addOpen && <CouponModal onClose={() => setAddOpen(false)} onSave={addCoupon} />}
      {editing && <CouponModal item={editing} onClose={() => setEditing(null)} onSave={(data) => updateCoupon(editing.id, data)} isEdit />}
    </div>
  );
}

function CouponModal({ item, onClose, onSave, isEdit }) {
  const [code, setCode] = useState(item?.code ?? '');
  const [type, setType] = useState(item?.type ?? 'percent');
  const [value, setValue] = useState(item?.value ?? '');
  const [validUntil, setValidUntil] = useState(item?.validUntil ?? '');
  const [maxUses, setMaxUses] = useState(item?.maxUses ?? '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim() || !value.trim()) return;
    onSave({
      code: code.trim().toUpperCase(),
      type,
      value: value.trim(),
      validUntil: validUntil.trim() || null,
      maxUses: maxUses === '' ? null : (parseInt(maxUses, 10) || null),
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">{isEdit ? 'Edit' : 'Create'} Coupon</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="form-input uppercase" required placeholder="SAVE10" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="form-input">
              <option value="percent">Percent off</option>
              <option value="fixed">Fixed amount</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Value *</label>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="form-input" required placeholder="10 or 5.00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valid until (optional)</label>
            <input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max uses (optional)</label>
            <input type="number" min="1" value={maxUses} onChange={(e) => setMaxUses(e.target.value)} className="form-input" placeholder="Unlimited" />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-700 text-sm">Cancel</button>
            <button type="submit" className="flex-1 btn-primary">{isEdit ? 'Save' : 'Create'}</button>
          </div>
        </form>
      </div>
    </>
  );
}
