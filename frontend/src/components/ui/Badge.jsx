import { forwardRef } from 'react';

const Badge = forwardRef(function Badge(
    { children, variant = 'default', size = 'md', className = '', ...props },
    ref
) {
    const baseStyles = 'inline-flex items-center font-medium rounded-full transition-all duration-300';

    const variants = {
        default: 'bg-[#FAF6F0] text-[#4A3C35]',
        primary: 'bg-[#90353D]/15 text-[#90353D]',
        secondary: 'bg-[#6B2830]/15 text-[#3E2723]',
        success: 'bg-[#4ade80]/15 text-[#16a34a]',
        warning: 'bg-[#fbbf24]/15 text-[#d97706]',
        error: 'bg-[#C45B5B]/15 text-[#C45B5B]',
        info: 'bg-[#60a5fa]/15 text-[#2563eb]',
        outline: 'border-2 border-[#90353D]/25 text-[#4A3C35]',
        ai: 'bg-[#90353D] text-[#F4EDE3]', /* AI Match badge */
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    return (
        <span
            ref={ref}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
});

export { Badge };
export default Badge;
