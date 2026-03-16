import { ORDER_STATUSES } from '../mock/mockOrders';

export default function OrderStatusStepper({ currentStatus }) {
  const currentIndex = ORDER_STATUSES.indexOf(currentStatus);
  const labels = {
    ORDER_PLACED: 'Order Placed',
    PREPARING: 'Preparing',
    READY: 'Ready',
    ASSIGNED: 'Assigned',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
  };

  return (
    <div className="flex items-center gap-1 overflow-x-auto py-2">
      {ORDER_STATUSES.map((status, i) => {
        const done = i <= currentIndex;
        return (
          <div key={status} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center" style={{ minWidth: 60 }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: done ? '#e8342e' : '#e5e7eb',
                  color: done ? '#fff' : '#9ca3af',
                }}
              >
                {i < currentIndex ? '✓' : i + 1}
              </div>
              <span
                className="mt-1 text-xs font-medium text-center leading-tight"
                style={{ color: done ? '#e8342e' : '#9ca3af' }}
              >
                {labels[status] || status}
              </span>
            </div>
            {i < ORDER_STATUSES.length - 1 && (
              <div
                className="mx-0.5 w-4 sm:w-8 h-0.5 flex-shrink-0"
                style={{ background: i < currentIndex ? '#e8342e' : '#e5e7eb' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
