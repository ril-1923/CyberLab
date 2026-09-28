import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  icon?: string;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, icon?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const iconMap: Record<ToastType, string> = {
  success: 'bi-check-circle-fill',
  error: 'bi-x-circle-fill',
  info: 'bi-info-circle-fill',
  warning: 'bi-exclamation-triangle-fill',
};

const colorMap: Record<ToastType, string> = {
  success: 'cyber-text-primary',
  error: 'text-danger',
  info: 'text-secondary',
  warning: 'text-warning',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success', icon?: string) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="cyber-toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`cyber-toast-item ${toast.type}`}>
            <i className={`bi ${toast.icon || iconMap[toast.type]} ${colorMap[toast.type]}`}></i>
            <span style={{ fontSize: '0.88rem' }}>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
