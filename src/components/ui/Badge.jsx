import { forwardRef } from 'react';

const Badge = forwardRef(function Badge(
    {
        children,
        variant = 'default',
        size = 'md',
        removable = false,
        onRemove,
        className = '',
        ...props
    },
    ref
) {
    const baseStyles = `
    inline-flex items-center font-medium rounded-full
    transition-all duration-300 ease-out
    hover:scale-105
  `;

    const variants = {
        default: 'bg-[#f0e8e4] text-[#5a6b75]',
        primary: 'bg-[#789A99]/15 text-[#5f7d7c]',
        secondary: 'bg-[#FFD2C2]/40 text-[#1e2a32]',
        success: 'bg-[#4ade80]/15 text-[#16a34a]',
        warning: 'bg-[#fbbf24]/15 text-[#d97706]',
        danger: 'bg-[#f87171]/15 text-[#dc2626]',
        info: 'bg-[#60a5fa]/15 text-[#2563eb]',
        outline: 'bg-transparent border-2 border-[#e8e0dc] text-[#5a6b75]',
    };

    const sizes = {
        sm: 'px-2.5 py-0.5 text-xs gap-1',
        md: 'px-3 py-1 text-xs gap-1.5',
        lg: 'px-4 py-1.5 text-sm gap-2',
    };

    return (
        <span
            ref={ref}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
            {removable && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-black/10 focus:outline-none transition-colors duration-300"
                    aria-label="Remove"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </span>
    );
});

export default Badge;
