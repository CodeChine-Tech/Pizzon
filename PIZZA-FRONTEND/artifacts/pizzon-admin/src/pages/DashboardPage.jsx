import { useLocation } from 'wouter';
import { useState } from 'react';
import { useDispatch } from '../context/DispatchContext';
import AddOrderModal from '../components/AddOrderModal';

export default function DashboardPage() {
  const [, navigate] = useLocation();
  const { orders, riders } = useDispatch();
  const [addOrderOpen, setAddOrderOpen] = useState(false);
  const recent = orders.slice(0, 5);
  const pending = orders.filter((o) => !['DELIVERED'].includes(o.status)).length;
  const onlineRiders = riders.filter((r) => r.status === 'ONLINE').length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="section-subtitle">Overview</span>
          <h1 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem,4vw,2rem)' }}>
            Dashboard
          </h1>
          <div className="w-12 h-0.5 bg-[#e8342e] my-3" />
          <p className="text-gray-500 text-sm">Control your entire site and operations from here.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setAddOrderOpen(true)} className="btn-primary text-sm py-2 px-4">Add Order</button>
          <button type="button" onClick={() => navigate('/orders')} className="py-2 px-4 text-sm font-semibold border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400">View Orders</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-gray-500 text-sm font-medium">Total Orders (Today)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-gray-500 text-sm font-medium">Pending Orders</p>
          <p className="text-2xl font-bold" style={{ color: '#e8342e' }}>{pending}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-gray-500 text-sm font-medium">Online Riders</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{onlineRiders} / {riders.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-gray-500 text-sm font-medium">Delivered Today</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{orders.filter((o) => o.status === 'DELIVERED').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <h2 className="font-bold text-gray-900 p-4 border-b border-gray-100">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Order</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Total</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-gray-900">#{o.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{o.customerName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{o.status.replace(/_/g, ' ')}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#e8342e' }}>£{o.total.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => navigate(`/orders/${o.id}`)} className="text-sm font-medium" style={{ color: '#e8342e' }}>View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {recent.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-2">No orders yet.</p>
            <button type="button" onClick={() => setAddOrderOpen(true)} className="text-sm font-medium" style={{ color: '#e8342e' }}>Add your first order</button>
          </div>
        )}
      </div>
      {addOrderOpen && <AddOrderModal onClose={() => setAddOrderOpen(false)} />}
    </div>
  );
}
