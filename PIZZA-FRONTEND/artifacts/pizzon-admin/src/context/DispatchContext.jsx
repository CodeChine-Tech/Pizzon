import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { mockOrders, ORDER_STATUSES } from '../mock/mockOrders';
import { mockRiders } from '../mock/mockRiders';

const STORAGE_ORDERS = 'pizzon-admin-orders';
const STORAGE_RIDERS = 'pizzon-admin-riders';

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS);
    if (raw) {
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : mockOrders;
    }
  } catch (_) {}
  return mockOrders;
}

function loadRiders() {
  try {
    const raw = localStorage.getItem(STORAGE_RIDERS);
    if (raw) {
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : mockRiders;
    }
  } catch (_) {}
  return mockRiders;
}

const DispatchContext = createContext(null);

export function DispatchProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);
  const [riders, setRiders] = useState(loadRiders);
  const [notifications, setNotifications] = useState([
    { id: 'n1', type: 'new_order', message: 'New order #1026 placed', orderId: '1026', read: false, at: new Date().toISOString() },
    { id: 'n2', type: 'ready', message: 'Order #1025 marked ready', orderId: '1025', read: false, at: new Date().toISOString() },
  ]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ORDERS, JSON.stringify(orders));
    } catch (_) {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_RIDERS, JSON.stringify(riders));
    } catch (_) {}
  }, [riders]);

  const getOrderById = useCallback((id) => orders.find((o) => o.id === id), [orders]);

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  }, []);

  const assignRider = useCallback((orderId, riderId, riderName) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, riderId, riderName, status: 'ASSIGNED' } : o
      )
    );
  }, []);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [{ ...notification, id: `n${Date.now()}`, read: false }, ...prev.slice(0, 49)]);
  }, []);

  const addOrder = useCallback((order) => {
    setOrders((prev) => [order, ...prev]);
    addNotification({ message: `New order #${order.id} placed (phone)`, orderId: order.id, type: 'new_order', at: new Date().toISOString() });
  }, [addNotification]);

  const addRider = useCallback((rider) => {
    setRiders((prev) => [...prev, rider]);
  }, []);

  const updateRider = useCallback((riderId, updates) => {
    setRiders((prev) =>
      prev.map((r) => (r.id === riderId ? { ...r, ...updates } : r))
    );
  }, []);

  const removeRider = useCallback((riderId) => {
    setRiders((prev) => prev.filter((r) => r.id !== riderId));
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DispatchContext.Provider
      value={{
        orders,
        riders,
        notifications,
        ORDER_STATUSES,
        getOrderById,
        updateOrderStatus,
        assignRider,
        addOrder,
        addRider,
        updateRider,
        removeRider,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount,
      }}
    >
      {children}
    </DispatchContext.Provider>
  );
}

export function useDispatch() {
  const ctx = useContext(DispatchContext);
  if (!ctx) throw new Error('useDispatch must be used within DispatchProvider');
  return ctx;
}
