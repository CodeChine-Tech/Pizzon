import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api } from '../lib/api';
import { useAuth } from './AuthContext';
import { mockRiders } from '../mock/mockRiders';

const DispatchContext = createContext(null);

export function DispatchProvider({ children }) {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [riders, setRiders] = useState(mockRiders);
  const [notifications, setNotifications] = useState([]);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    try {
      const data = await api.get('/orders', token);
      const mapped = (data.orders || []).map(o => ({
        ...o,
        riderId: o.rider?._id || o.riderId,
        riderName: o.rider?.name || o.riderName
      }));
      setOrders(mapped);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    if (!token) return;
    try {
      await api.patch(`/orders/${orderId}/status`, { status }, token);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  }, [token]);

  const pickupOrder = useCallback(async (orderId) => {
    if (!token) return;
    try {
      const data = await api.post(`/orders/${orderId}/pickup`, {}, token);
      const updated = data.order;
      setOrders(prev => prev.map(o => o._id === orderId ? updated : o));
    } catch (error) {
      console.error('Failed to mark order as picked up:', error);
    }
  }, [token]);

  const assignRider = useCallback((orderId, riderId) => {
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, assignedRider: riderId } : o));
  }, []);

  const addNotification = useCallback((notif) => {
    setNotifications(prev => [notif, ...prev]);
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  return (
    <DispatchContext.Provider value={{
      orders,
      riders,
      notifications,
      updateOrderStatus,
      pickupOrder,
      assignRider,
      addNotification,
      markNotificationRead,
      refreshOrders: fetchOrders
    }}>
      {children}
    </DispatchContext.Provider>
  );
}

export function useDispatch() {
  const ctx = useContext(DispatchContext);
  if (!ctx) throw new Error('useDispatch must be used within DispatchProvider');
  return ctx;
}
