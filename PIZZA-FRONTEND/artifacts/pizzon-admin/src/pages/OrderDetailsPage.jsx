import { useRoute, useLocation } from 'wouter';
import { useDispatch } from '../context/DispatchContext';
import OrderStatusBadge from '../components/OrderStatusBadge';
import OrderStatusStepper from '../components/OrderStatusStepper';
import RiderAssignmentModal from '../components/RiderAssignmentModal';
import { useState } from 'react';

function BackToOrders() {
  const [, navigate] = useLocation();
  return (
    <button type="button" onClick={() => navigate('/orders')} className="text-sm font-medium mb-4" style={{ color: '#e8342e' }}>
      ← Back to Orders
    </button>
  );
}

export default function OrderDetailsPage() {
  const [, params] = useRoute('/orders/:id');
  const orderId = params?.id;
  const { getOrderById, updateOrderStatus, ORDER_STATUSES: statuses } = useDispatch();
  const [assignOpen, setAssignOpen] = useState(false);

  const order = orderId ? getOrderById(orderId) : null;

  if (!order) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Order not found.</p>
      </div>
    );
  }

  const currentIndex = statuses.indexOf(order.status);
  const nextStatus = currentIndex < statuses.length - 1 ? statuses[currentIndex + 1] : null;

  return (
    <div>
      <BackToOrders />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="section-subtitle">Order #{order.id}</span>
          <h1 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.25rem,3vw,1.75rem)' }}>
            Order Details
          </h1>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <OrderStatusStepper currentStatus={order.status} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <h2 className="font-bold text-gray-900 mb-4">Customer</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Name:</span> {order.customerName}</p>
            <p><span className="text-gray-500">Phone:</span> {order.phone}</p>
            <p><span className="text-gray-500">Address:</span> {order.address}</p>
            {order.deliveryNotes && <p><span className="text-gray-500">Notes:</span> {order.deliveryNotes}</p>}
          </div>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm font-medium" style={{ color: '#e8342e' }}>
            View on map →
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <h2 className="font-bold text-gray-900 mb-4">Actions</h2>
          <div className="space-y-3">
            {nextStatus && (
              <button type="button" onClick={() => updateOrderStatus(order.id, nextStatus)} className="w-full py-2.5 rounded-lg font-semibold text-white text-sm" style={{ background: '#e8342e' }}>
                Mark as {nextStatus.replace(/_/g, ' ')}
              </button>
            )}
            {!order.riderId && order.status !== 'DELIVERED' && (
              <button type="button" onClick={() => setAssignOpen(true)} className="w-full py-2.5 rounded-lg font-semibold border-2 text-sm" style={{ borderColor: '#e8342e', color: '#e8342e' }}>
                Assign Rider
              </button>
            )}
            <button type="button" onClick={() => alert(`Invoice #${order.id} will be available after backend integration.`)} className="w-full py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-700 text-sm hover:border-[#e8342e] hover:text-[#e8342e]">
              Download Invoice
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <h2 className="font-bold text-gray-900 p-5 sm:p-6 border-b border-gray-100">Order Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Item</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Size</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Qty</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    {item.toppings && <span className="text-gray-500 text-sm block">{item.toppings}</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.size || '—'}</td>
                  <td className="px-4 py-3 text-gray-700">{item.qty}</td>
                  <td className="px-4 py-3 text-right font-medium">£{(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5 sm:p-6 border-t border-gray-100 space-y-1 text-sm">
          <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>£{order.subtotal.toFixed(2)}</span></div>
          {order.discount > 0 && <div className="flex justify-between text-gray-600"><span>Discount</span><span>-£{order.discount.toFixed(2)}</span></div>}
          <div className="flex justify-between text-gray-600"><span>Tax</span><span>£{order.tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-gray-600"><span>Delivery</span><span>£{order.deliveryFee.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span style={{ color: '#e8342e' }}>£{order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {assignOpen && <RiderAssignmentModal order={order} onClose={() => setAssignOpen(false)} />}
    </div>
  );
}
