const STATUS_LABELS = {
  ORDER_PLACED: 'Order Placed',
  PREPARING: 'Preparing',
  READY: 'Ready',
  ASSIGNED: 'Assigned',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
};

const STATUS_COLORS = {
  ORDER_PLACED: 'bg-gray-200 text-gray-800',
  PREPARING: 'bg-amber-100 text-amber-800',
  READY: 'bg-blue-100 text-blue-800',
  ASSIGNED: 'bg-indigo-100 text-indigo-800',
  OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
};

export default function OrderStatusBadge({ status }) {
  const label = STATUS_LABELS[status] || status;
  const color = STATUS_COLORS[status] || 'bg-gray-200 text-gray-800';
  return (
    <span className={`inline-block px-2.5 py-1 rounded text-xs font-semibold ${color}`}>
      {label}
    </span>
  );
}
