import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AUTH_KEY = 'pizzon_admin_auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.user) setUser(data.user);
      }
    } catch (_) {}
  }, []);

  const login = useCallback((username, password) => {
    if (!username?.trim()) return false;
    const u = { name: username.trim(), role: 'dispatcher' };
    setUser(u);
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ user: u }));
    } catch (_) {}
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (_) {}
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
