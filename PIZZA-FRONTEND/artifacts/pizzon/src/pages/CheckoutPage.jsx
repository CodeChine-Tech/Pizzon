import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLocation } from 'wouter';
import { api } from '../lib/api';

const STEPS = ['Summary', 'Delivery', 'Payment', 'Done'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center mb-8 sm:mb-10">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className="rounded-full flex items-center justify-center font-bold transition-all"
              style={{
                width: 'clamp(28px, 5vw, 36px)',
                height: 'clamp(28px, 5vw, 36px)',
                fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)',
                background: i <= current ? '#e8342e' : '#e5e7eb',
                color: i <= current ? '#fff' : '#9ca3af',
              }}
            >
              {i < current ? '✓' : i + 1}
            </div>
            <span
              className="mt-1 font-medium text-center leading-tight"
              style={{
                fontSize: 'clamp(0.55rem, 1.2vw, 0.7rem)',
                color: i <= current ? '#e8342e' : '#9ca3af',
                width: 'clamp(40px, 6vw, 60px)',
              }}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="mb-4 mx-0.5 sm:mx-1 transition-all"
              style={{
                width: 'clamp(24px, 5vw, 80px)',
                height: '3px',
                background: i < current ? '#e8342e' : '#e5e7eb',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const [delivery, setDelivery] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '', notes: '', type: 'delivery' });
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  const subtotal = total;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  const handleDelivery = e => setDelivery(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleCard = e => {
    let val = e.target.value;
    if (e.target.name === 'number') val = val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (e.target.name === 'expiry') val = val.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/');
    if (e.target.name === 'cvv') val = val.replace(/\D/g, '').slice(0, 4);
    setCard(p => ({ ...p, [e.target.name]: val }));
  };

  const validateDelivery = () => {
    const e = {};
    if (!delivery.name.trim()) e.name = 'Name is required';
    if (!delivery.email.trim()) e.email = 'Email is required';
    if (!delivery.phone.trim()) e.phone = 'Phone is required';
    if (delivery.type === 'delivery') {
      if (!delivery.address.trim()) e.address = 'Address is required';
      if (!delivery.city.trim()) e.city = 'City is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    if (paymentMethod === 'cash') return true;
    const e = {};
    if (card.number.replace(/\s/g, '').length < 16) e.number = 'Invalid card number';
    if (!card.name.trim()) e.cardName = 'Name is required';
    if (card.expiry.length < 5) e.expiry = 'Invalid expiry';
    if (card.cvv.length < 3) e.cvv = 'Invalid CVV';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = async () => {
    if (step === 1 && !validateDelivery()) return;
    if (step === 2 && !validatePayment()) return;
    if (step === 2) {
      // Place the order
      try {
        const orderData = {
          items: items.map(item => ({
            productId: item.id,
            size: 'Small', // Use Small size for now
            quantity: item.qty
          })),
          customer: {
            name: delivery.name,
            phone: delivery.phone,
            address: `${delivery.address}, ${delivery.city}, ${delivery.zip}`,
            email: delivery.email
          }
        };
        await api.post('/orders', orderData);
        clearCart();
      } catch (error) {
        console.error('Failed to place order:', error);
        // Perhaps show error message
        return; // Don't proceed
      }
    }
    setStep(s => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const back = () => { setStep(s => Math.max(s - 1, 0)); setErrors({}); };

  const ErrMsg = ({ field }) => errors[field] ? <p className="text-red-500 text-xs mt-1">{errors[field]}</p> : null;

  const Label = ({ children }) => (
    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1 block">{children}</label>
  );

  if (items.length === 0 && step < 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ background: '#f9f9f9' }}>
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-bold text-gray-900 mb-2" style={{ fontSize: 'clamp(1.25rem,4vw,1.75rem)' }}>Your cart is empty</h2>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">Add some items before checking out.</p>
        <button onClick={() => navigate('/order')} className="btn-red">Browse Menu</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12" style={{ background: '#f9f9f9' }}>
      {/* Header */}
      <div className="text-center mb-6 sm:mb-10 px-4">
        <span className="section-subtitle">Checkout</span>
        <h1 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem,4vw,2.5rem)' }}>
          Complete Your Order
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <StepIndicator current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-7">
          {/* Main area */}
          <div className="lg:col-span-2">

            {/* Step 0: Summary */}
            {step === 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2">🧾 Order Summary</h2>
                <div className="space-y-3 sm:space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-gray-50">
                      <img src={item.img} alt={item.name} className="object-cover rounded-lg flex-shrink-0" style={{ width: 'clamp(44px,10vw,56px)', height: 'clamp(44px,10vw,56px)' }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                        <p className="text-gray-500 text-xs">{item.category} · Qty: {item.qty}</p>
                      </div>
                      <span className="font-bold text-sm flex-shrink-0" style={{ color: '#e8342e' }}>
                        ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Delivery */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2">📦 Delivery Details</h2>
                <div className="flex gap-3 mb-5 sm:mb-6">
                  {['delivery', 'pickup'].map(type => (
                    <button key={type} onClick={() => setDelivery(p => ({ ...p, type }))}
                      className="flex-1 py-2.5 sm:py-3 rounded-xl font-semibold text-sm capitalize transition-all border-2"
                      style={{ background: delivery.type === type ? '#e8342e' : '#fff', color: delivery.type === type ? '#fff' : '#666', borderColor: delivery.type === type ? '#e8342e' : '#e5e7eb' }}>
                      {type === 'delivery' ? '🛵 Delivery' : '🏪 Pickup'}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <input name="name" value={delivery.name} onChange={handleDelivery} placeholder="John Doe" className="form-input-light rounded-lg" />
                    <ErrMsg field="name" />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <input name="email" type="email" value={delivery.email} onChange={handleDelivery} placeholder="john@example.com" className="form-input-light rounded-lg" />
                    <ErrMsg field="email" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Phone *</Label>
                    <input name="phone" value={delivery.phone} onChange={handleDelivery} placeholder="+1 (555) 000-0000" className="form-input-light rounded-lg" />
                    <ErrMsg field="phone" />
                  </div>
                  {delivery.type === 'delivery' && (
                    <>
                      <div className="sm:col-span-2">
                        <Label>Street Address *</Label>
                        <input name="address" value={delivery.address} onChange={handleDelivery} placeholder="123 Main Street, Apt 4B" className="form-input-light rounded-lg" />
                        <ErrMsg field="address" />
                      </div>
                      <div>
                        <Label>City *</Label>
                        <input name="city" value={delivery.city} onChange={handleDelivery} placeholder="New York" className="form-input-light rounded-lg" />
                        <ErrMsg field="city" />
                      </div>
                      <div>
                        <Label>ZIP Code</Label>
                        <input name="zip" value={delivery.zip} onChange={handleDelivery} placeholder="10001" className="form-input-light rounded-lg" />
                      </div>
                    </>
                  )}
                  <div className="sm:col-span-2">
                    <Label>Special Instructions</Label>
                    <textarea name="notes" value={delivery.notes} onChange={handleDelivery} placeholder="Allergies, extra napkins, ring doorbell…" rows={3} className="form-input-light rounded-lg resize-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2">💳 Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                  {[
                    { id: 'card', icon: '💳', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex' },
                    { id: 'cash', icon: '💵', label: 'Cash on Delivery', sub: 'Pay when your order arrives' },
                  ].map(opt => (
                    <button key={opt.id} onClick={() => setPaymentMethod(opt.id)}
                      className="p-3 sm:p-4 rounded-xl border-2 text-left transition-all"
                      style={{ borderColor: paymentMethod === opt.id ? '#e8342e' : '#e5e7eb', background: paymentMethod === opt.id ? '#fff5f5' : '#fff' }}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="text-2xl sm:text-3xl">{opt.icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-sm leading-tight">{opt.label}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{opt.sub}</p>
                        </div>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                          style={{ borderColor: paymentMethod === opt.id ? '#e8342e' : '#d1d5db' }}>
                          {paymentMethod === opt.id && <div className="w-2 h-2 rounded-full" style={{ background: '#e8342e' }} />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-3 sm:space-y-4 p-4 sm:p-5 rounded-xl" style={{ background: '#f9f9f9', border: '1px solid #e5e7eb' }}>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm">Card Details</h3>
                      <div className="flex gap-1.5 text-lg sm:text-xl">💳 🔴 🔵</div>
                    </div>
                    <div>
                      <Label>Card Number *</Label>
                      <input name="number" value={card.number} onChange={handleCard} placeholder="1234 5678 9012 3456" maxLength={19} className="form-input-light rounded-lg font-mono tracking-widest" />
                      <ErrMsg field="number" />
                    </div>
                    <div>
                      <Label>Cardholder Name *</Label>
                      <input name="name" value={card.name} onChange={handleCard} placeholder="JOHN DOE" className="form-input-light rounded-lg uppercase" />
                      <ErrMsg field="cardName" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <Label>Expiry *</Label>
                        <input name="expiry" value={card.expiry} onChange={handleCard} placeholder="MM/YY" maxLength={5} className="form-input-light rounded-lg font-mono" />
                        <ErrMsg field="expiry" />
                      </div>
                      <div>
                        <Label>CVV *</Label>
                        <input name="cvv" value={card.cvv} onChange={handleCard} placeholder="123" type="password" maxLength={4} className="form-input-light rounded-lg font-mono" />
                        <ErrMsg field="cvv" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">🔒 Your payment info is encrypted and secure.</p>
                  </div>
                )}

                {paymentMethod === 'cash' && (
                  <div className="p-4 sm:p-5 rounded-xl text-center" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">💵</div>
                    <p className="font-semibold text-green-800 text-sm sm:text-base">Pay with cash when your order arrives.</p>
                    <p className="text-green-700 text-sm mt-1">Please have the exact amount ready: <strong>${grandTotal.toFixed(2)}</strong></p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8 border border-gray-100 text-center">
                <div className="rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 text-3xl sm:text-4xl" style={{ width: 'clamp(60px,12vw,80px)', height: 'clamp(60px,12vw,80px)', background: '#f0fdf4' }}>✅</div>
                <h2 className="font-bold text-gray-900 mb-2" style={{ fontSize: 'clamp(1.25rem,3vw,1.75rem)' }}>Order Confirmed!</h2>
                <p className="text-gray-500 mb-4 text-sm sm:text-base">
                  Thank you, <strong>{delivery.name || 'Customer'}</strong>! Your order has been received.
                </p>
                <div className="inline-block bg-gray-50 rounded-xl px-5 sm:px-6 py-3 mb-5 sm:mb-6 border">
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Order Number</p>
                  <p className="font-bold mt-1" style={{ color: '#e8342e', fontSize: 'clamp(1.5rem,5vw,2rem)' }}>#{orderNumber}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                  {[
                    { label: 'Payment', val: paymentMethod === 'card' ? '💳 Card' : '💵 Cash' },
                    { label: 'Type', val: delivery.type === 'delivery' ? '🛵 Delivery' : '🏪 Pickup' },
                    { label: 'Est. Time', val: delivery.type === 'delivery' ? '30–45 min' : '15–20 min' },
                  ].map((d, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-2 sm:p-3">
                      <p className="text-gray-500 text-xs mb-1">{d.label}</p>
                      <p className="font-bold text-gray-900 text-xs sm:text-sm">{d.val}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-sm mb-5 sm:mb-6">
                  A confirmation has been sent to <strong>{delivery.email || 'your email'}</strong>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={() => navigate('/')} className="btn-red">Back to Home</button>
                  <button onClick={() => navigate('/order')} className="btn-outline-white" style={{ color: '#555', borderColor: '#ccc' }}>Order Again</button>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            {step < 3 && (
              <div className="flex items-center justify-between mt-5 sm:mt-6">
                {step > 0 ? (
                  <button onClick={back} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold py-2.5 sm:py-3 px-4 sm:px-5 rounded-lg border border-gray-200 hover:border-gray-400 transition-all text-sm">
                    ← Back
                  </button>
                ) : (
                  <button onClick={() => navigate('/order')} className="text-sm text-gray-500 hover:text-gray-800 underline">← Edit order</button>
                )}
                <button onClick={next} className="btn-red px-6 sm:px-8 py-3">
                  {step === 2 ? '🎉 Place Order' : 'Continue →'}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          {step < 3 && (
            <div className="lg:col-span-1 order-first lg:order-last">
              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100 lg:sticky lg:top-24">
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">🧾 Your Order</h3>
                <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-2 sm:gap-3 text-sm">
                      <img src={item.img} alt={item.name} className="object-cover rounded-lg flex-shrink-0" style={{ width: 36, height: 36 }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate text-xs">{item.name}</p>
                        <p className="text-gray-400 text-xs">×{item.qty}</p>
                      </div>
                      <span className="font-semibold text-xs flex-shrink-0" style={{ color: '#e8342e' }}>
                        ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-3 sm:mt-4 pt-3 sm:pt-4 space-y-1.5 sm:space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Delivery</span><span style={{ color: '#22c55e' }}>Free</span></div>
                  <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between font-bold text-sm sm:text-base border-t pt-2">
                    <span>Total</span>
                    <span style={{ color: '#e8342e' }}>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
