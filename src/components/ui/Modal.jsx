import { forwardRef, useEffect, useRef } from 'react';

const Modal = forwardRef(function Modal(
    {
        isOpen,
        onClose,
        children,
        title,
        description,
        size = 'md',
        closeOnOverlayClick = true,
        closeOnEscape = true,
        showCloseButton = true,
        className = '',
        ...props
    },
    ref
) {
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);

    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full mx-4',
    };

    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement;
            document.body.style.overflow = 'hidden';
            modalRef.current?.focus();
        } else {
            document.body.style.overflow = '';
            previousActiveElement.current?.focus();
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (closeOnEscape && event.key === 'Escape' && isOpen) onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, closeOnEscape]);

    const handleOverlayClick = (event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
        >
            <div
                className="absolute inset-0 bg-[#1e2a32]/40 backdrop-blur-sm animate-fade-in"
                onClick={handleOverlayClick}
                aria-hidden="true"
            />
            <div
                ref={ref || modalRef}
                tabIndex={-1}
                className={`
          relative w-full ${sizes[size]}
          bg-white rounded-2xl shadow-2xl shadow-[#1e2a32]/20
          animate-scale-in
          ${className}
        `}
                {...props}
            >
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b-2 border-[#e8e0dc]">
                        <div>
                            {title && (
                                <h2 id="modal-title" className="text-xl font-semibold text-[#1e2a32]">
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="mt-1 text-sm text-[#5a6b75]">{description}</p>
                            )}
                        </div>
                        {showCloseButton && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-2 -m-2 text-[#8a9aa4] hover:text-[#1e2a32] hover:bg-[#FFD2C2]/30 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#789A99]"
                                aria-label="Close modal"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
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
            className={`flex items-center justify-end gap-3 p-6 border-t-2 border-[#e8e0dc] ${className}`}
            {...props}
        >
            {children}
        </div>
    );
});

export { Modal, ModalFooter };
export default Modal;
