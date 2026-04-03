import { useLocation } from 'wouter';
import OrderStatusBadge from './OrderStatusBadge';

function formatTime(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diffMin = Math.floor((now - d) / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffH = Math.floor(diffMin / 60);
  return `${diffH}h ago`;
}

export default function OrdersTable({ orders, onAssign, onInvoice, onAddOrder }) {
  const [, navigate] = useLocation();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Address</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Rider</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="font-semibold text-gray-900">#{order.id}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">{order.customerName}</td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell max-w-[180px] truncate">{order.address}</td>
                <td className="px-4 py-3"><OrderStatusBadge status={order.status} /></td>
                <td className="px-4 py-3 text-sm text-gray-700">{order.riderName || '—'}</td>
                <td className="px-4 py-3 font-semibold" style={{ color: '#e8342e' }}>£{order.total.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{formatTime(order.orderTime)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="text-sm font-medium px-2 py-1 rounded border border-gray-300 hover:border-[#e8342e] hover:text-[#e8342e]"
                    >
                      View
                    </button>
                    {!order.riderId && order.status !== 'DELIVERED' && (
                      <button type="button" onClick={() => onAssign(order)} className="text-sm font-medium px-2 py-1 rounded text-white" style={{ background: '#e8342e' }}>
                        Assign
                      </button>
                    )}
                    {order.riderId && order.status !== 'DELIVERED' && (
                      <button type="button" onClick={() => navigate('/track')} className="text-sm font-medium px-2 py-1 rounded border border-gray-300 hover:border-[#e8342e] hover:text-[#e8342e]">
                        Track
                      </button>
                    )}
                    <button type="button" onClick={() => onInvoice(order)} className="text-sm font-medium px-2 py-1 rounded border border-gray-300 hover:border-[#e8342e] hover:text-[#e8342e]">
                      Invoice
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.length === 0 && (
        <div className="p-12 text-center">
          <div className="inline-flex w-16 h-16 rounded-full bg-gray-100 items-center justify-center text-3xl mb-4">📋</div>
          <p className="text-gray-600 font-medium">No orders yet</p>
          <p className="text-gray-500 text-sm mt-1">Add an order via phone or wait for online orders.</p>
          {onAddOrder && (
            <button type="button" onClick={onAddOrder} className="mt-4 btn-primary text-sm py-2 px-4">Add Order</button>
          )}
        </div>
      )}
    </div>
  );
}
