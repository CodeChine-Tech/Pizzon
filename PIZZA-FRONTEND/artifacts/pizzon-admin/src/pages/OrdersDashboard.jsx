import { useState } from 'react';
import OrdersTable from '../components/OrdersTable';
import RiderAssignmentModal from '../components/RiderAssignmentModal';
import AddOrderModal from '../components/AddOrderModal';
import { useDispatch } from '../context/DispatchContext';

export default function OrdersDashboard() {
  const { orders, pickupOrder } = useDispatch();
  const [assignOrder, setAssignOrder] = useState(null);
  const [addOrderOpen, setAddOrderOpen] = useState(false);

  const handleInvoice = (order) => {
    alert(`Invoice for order #${order.id} will be available after backend integration.`);
  };

  return (
    <div>
      <div className="mb-6 sm:mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="section-subtitle">Dispatcher</span>
          <h1 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem,4vw,2rem)' }}>
            Orders Dashboard
          </h1>
          <div className="w-12 h-0.5 bg-[#e8342e] my-3" />
          <p className="text-gray-500 text-sm">Manage and assign orders in real time.</p>
        </div>
        <button type="button" onClick={() => setAddOrderOpen(true)} className="btn-primary">
          Add Order
        </button>
      </div>
      <OrdersTable orders={orders} onAssign={setAssignOrder} onPickup={pickupOrder} onInvoice={handleInvoice} onAddOrder={() => setAddOrderOpen(true)} />
      {assignOrder && <RiderAssignmentModal order={assignOrder} onClose={() => setAssignOrder(null)} />}
      {addOrderOpen && <AddOrderModal onClose={() => setAddOrderOpen(false)} />}
    </div>
  );
}
