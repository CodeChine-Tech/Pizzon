import { useDispatch } from '../context/DispatchContext';

export default function RiderAssignmentModal({ order, onClose }) {
  const { riders, assignRider } = useDispatch();

  const handleAssign = (rider) => {
    if (rider.status === 'OFFLINE') return;
    assignRider(order.id, rider.id, rider.name);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[90vh] overflow-hidden bg-white rounded-xl shadow-xl border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900 text-lg">Assign Rider — Order #{order.id}</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh]">
          <p className="text-sm text-gray-600 mb-4">{order.address} · £{order.total.toFixed(2)}</p>
          <div className="space-y-2">
            {riders.map((rider) => (
              <div
                key={rider.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${rider.status === 'OFFLINE' ? 'bg-gray-50 border-gray-200 opacity-70' : 'bg-white border-gray-200'}`}
              >
                <div>
                  <p className="font-semibold text-gray-900">{rider.name}</p>
                  <p className="text-xs text-gray-500">{rider.status} · {rider.distance} · {rider.activeOrders} active</p>
                </div>
                <button
                  type="button"
                  disabled={rider.status === 'OFFLINE'}
                  onClick={() => handleAssign(rider)}
                  className="px-4 py-2 rounded font-semibold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: rider.status === 'OFFLINE' ? '#9ca3af' : '#e8342e' }}
                >
                  Assign
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
