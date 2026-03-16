import { useState } from 'react';
import { useDispatch } from '../context/DispatchContext';
import { useToast } from '../context/ToastContext';
import { ORDER_STATUSES } from '../mock/mockOrders';

function nextOrderId(orders) {
  const max = orders.reduce((m, o) => Math.max(m, parseInt(o.id, 10) || 0), 0);
  return String(max + 1);
}

export default function AddOrderModal({ onClose }) {
  const { orders, addOrder } = useDispatch();
  const showToast = useToast();
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const [items, setItems] = useState([{ name: '', qty: 1, price: '' }]);

  const addLine = () => setItems((p) => [...p, { name: '', qty: 1, price: '' }]);
  const updateLine = (i, field, value) => {
    setItems((p) => p.map((line, j) => (j === i ? { ...line, [field]: field === 'qty' ? (parseInt(value, 10) || 0) : value } : line)));
  };
  const removeLine = (i) => setItems((p) => p.filter((_, j) => j !== i));

  const subtotal = items.reduce((sum, line) => sum + (parseFloat(line.price) || 0) * (line.qty || 0), 0);
  const fee = parseFloat(deliveryFee) || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + fee + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) return;
    const orderItems = items
      .filter((l) => l.name.trim() && (parseFloat(l.price) || 0) > 0)
      .map((l) => ({ name: l.name, size: null, toppings: null, qty: l.qty || 1, price: parseFloat(l.price) || 0 }));
    if (orderItems.length === 0) return;
    const id = nextOrderId(orders);
    const order = {
      id,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      deliveryNotes: deliveryNotes.trim(),
      status: ORDER_STATUSES[0],
      riderId: null,
      riderName: null,
      orderTime: new Date().toISOString(),
      items: orderItems,
      subtotal,
      discount: 0,
      tax,
      deliveryFee: fee,
      total,
    };
    addOrder(order);
    showToast('Order created');
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[90vh] overflow-hidden bg-white rounded-xl shadow-xl border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900 text-lg">Add Order (Phone / Manual)</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto max-h-[70vh] space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="form-input" required placeholder="John Smith" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" required placeholder="+1 555-0100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" required placeholder="123 Street, City" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Notes</label>
            <input type="text" value={deliveryNotes} onChange={(e) => setDeliveryNotes(e.target.value)} className="form-input" placeholder="Optional" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Fee (£)</label>
            <input type="number" step="0.01" min="0" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} className="form-input w-28" placeholder="0" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Items *</label>
              <button type="button" onClick={addLine} className="text-sm font-medium" style={{ color: '#e8342e' }}>+ Add line</button>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-1 text-xs text-gray-500 font-medium px-1">
              <span className="col-span-6">Item name</span>
              <span className="col-span-2">Qty</span>
              <span className="col-span-3">Price (£)</span>
            </div>
            {items.map((line, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <input type="text" value={line.name} onChange={(e) => updateLine(i, 'name', e.target.value)} className="form-input flex-1" placeholder="e.g. Margherita Large" />
                <input type="number" min="1" value={line.qty} onChange={(e) => updateLine(i, 'qty', e.target.value)} className="form-input w-16" aria-label="Qty" />
                <input type="number" step="0.01" min="0" value={line.price} onChange={(e) => updateLine(i, 'price', e.target.value)} className="form-input w-24" placeholder="0.00" aria-label="Price" />
                <button type="button" onClick={() => removeLine(i)} className="text-gray-400 hover:text-red-500 px-2 text-lg leading-none" aria-label="Remove line">×</button>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600 border-t pt-2 space-y-0.5">
            <p>Subtotal £{subtotal.toFixed(2)}</p>
            {fee > 0 && <p>Delivery £{fee.toFixed(2)}</p>}
            <p>Tax £{tax.toFixed(2)}</p>
            <p className="font-semibold text-gray-900 pt-1">Total £{total.toFixed(2)}</p>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-700 text-sm">Cancel</button>
            <button type="submit" className="flex-1 btn-primary">Create Order</button>
          </div>
        </form>
      </div>
    </>
  );
}
