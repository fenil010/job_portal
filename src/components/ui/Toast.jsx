import { forwardRef, useEffect, useState, createContext, useContext, useCallback } from 'react';

const ToastContext = createContext(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((toast) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { ...toast, id }]);
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const toast = useCallback((message, options = {}) => {
        return addToast({ message, variant: 'default', ...options });
    }, [addToast]);

    toast.success = (message, options = {}) => addToast({ message, variant: 'success', ...options });
    toast.error = (message, options = {}) => addToast({ message, variant: 'error', ...options });
    toast.warning = (message, options = {}) => addToast({ message, variant: 'warning', ...options });
    toast.info = (message, options = {}) => addToast({ message, variant: 'info', ...options });

    return (
        <ToastContext.Provider value={{ toast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

function ToastContainer({ toasts, onRemove }) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 min-w-[340px] max-w-[420px]" role="region" aria-label="Notifications">
            {toasts.map((toast, index) => (
                <ToastItem key={toast.id} {...toast} onClose={() => onRemove(toast.id)} style={{ animationDelay: `${index * 50}ms` }} />
            ))}
        </div>
    );
}

const ToastItem = forwardRef(function ToastItem({ message, variant = 'default', title, duration = 5000, onClose }, ref) {
    const [isExiting, setIsExiting] = useState(false);

    const icons = {
        default: null,
        success: (
            <svg className="w-5 h-5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        ),
        error: (
            <svg className="w-5 h-5 text-[#C45B5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        warning: (
            <svg className="w-5 h-5 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5 text-[#90353D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(onClose, 300);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(onClose, 300);
    };

    return (
        <div
            ref={ref}
            role="alert"
            className={`
        flex items-start gap-3 p-4
        bg-[#FAF6F0] rounded-xl shadow-xl shadow-[#90353D]/10 border-2 border-[#90353D]/20
        transition-all duration-300 ease-out
        ${isExiting ? 'opacity-0 translate-x-8' : 'animate-slide-in-right'}
      `}
        >
            {icons[variant] && <div className="flex-shrink-0 mt-0.5">{icons[variant]}</div>}
            <div className="flex-1 min-w-0">
                {title && <p className="text-sm font-semibold text-[#3E2723]">{title}</p>}
                <p className="text-sm text-[#4A3C35]">{message}</p>
            </div>
            <button
                type="button"
                onClick={handleClose}
                className="flex-shrink-0 p-1 text-[#9B8B7E] hover:text-[#3E2723] hover:bg-[#90353D]/10 rounded-lg transition-all duration-300"
                aria-label="Dismiss"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
});

export { ToastItem };
export default ToastProvider;
