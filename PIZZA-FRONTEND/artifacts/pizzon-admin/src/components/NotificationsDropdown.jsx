import { useState } from 'react';
import { useDispatch } from '../context/DispatchContext';

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useDispatch();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 text-white hover:text-red-400 rounded"
        aria-label="Notifications"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 text-white text-xs font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px] px-1"
            style={{ background: '#e8342e' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-80 max-h-96 overflow-y-auto rounded-lg shadow-xl border border-gray-200 z-50 bg-white">
            <div className="p-3 border-b border-gray-100 flex justify-between items-center">
              <span className="font-bold text-gray-900 text-sm">Notifications</span>
              {unreadCount > 0 && (
                <button type="button" onClick={markAllNotificationsRead} className="text-xs font-medium" style={{ color: '#e8342e' }}>
                  Mark all read
                </button>
              )}
            </div>
            <div className="divide-y divide-gray-100">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
              ) : (
                notifications.slice(0, 20).map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-left cursor-pointer ${n.read ? 'bg-gray-50' : 'bg-white'}`}
                    onClick={() => markNotificationRead(n.id)}
                  >
                    <p className="text-sm text-gray-800">{n.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(n.at).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
