import { forwardRef, useEffect, useCallback } from 'react';

const Modal = forwardRef(function Modal(
    {
        isOpen,
        onClose,
        title,
        description,
        size = 'md',
        closeOnOverlayClick = true,
        children,
        className = '',
        ...props
    },
    ref
) {
    const handleEscape = useCallback((event) => {
        if (event.key === 'Escape') onClose?.();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleEscape]);

    const handleOverlayClick = (event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
    };

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full mx-4',
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E2723]/50 backdrop-blur-sm animate-fade-in"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
        >
            <div
                ref={ref}
                className={`
          relative w-full ${sizes[size]}
          bg-[#FAF6F0] rounded-2xl shadow-2xl shadow-[#90353D]/15
          animate-scale-in
          ${className}
        `}
                {...props}
            >
                {(title || description) && (
                    <div className="flex items-center justify-between p-6 border-b-2 border-[#90353D]/20">
                        <div>
                            {title && <h2 id="modal-title" className="text-xl font-semibold text-[#3E2723]">{title}</h2>}
                            {description && <p className="mt-1 text-sm text-[#4A3C35]">{description}</p>}
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 text-[#9B8B7E] hover:text-[#3E2723] hover:bg-[#90353D]/10 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#90353D]"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
});

const ModalFooter = forwardRef(function ModalFooter({ children, className = '', ...props }, ref) {
    return (
        <div
            ref={ref}
            className={`flex items-center justify-end gap-3 px-6 py-4 border-t-2 border-[#90353D]/20 bg-[#F4EDE3]/50 rounded-b-2xl ${className}`}
            {...props}
        >
            {children}
        </div>
    );
});

export { Modal, ModalFooter };
export default Modal;
