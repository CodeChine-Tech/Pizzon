import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api } from '../lib/api';

const AUTH_KEY = 'pizzon_admin_auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.user && data?.token) {
          setUser(data.user);
          setToken(data.token);
        }
      }
    } catch (_) {}
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response;
      setUser(user);
      setToken(token);
      localStorage.setItem(AUTH_KEY, JSON.stringify({ user, token }));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (_) {}
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
