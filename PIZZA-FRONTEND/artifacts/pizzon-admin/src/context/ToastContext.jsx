import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div className="fixed bottom-4 right-4 z-[100] px-4 py-2 rounded-lg shadow-lg bg-gray-900 text-white text-sm font-medium animate-fade-in">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  return ctx ? ctx.showToast : () => {};
}
