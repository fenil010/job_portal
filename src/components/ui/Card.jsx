import { forwardRef } from 'react';

const Card = forwardRef(function Card(
    { children, variant = 'default', padding = 'md', hover = false, className = '', ...props },
    ref
) {
    const baseStyles = `
    bg-[#FAF6F0] rounded-2xl border-2
    transition-all duration-300 ease-out
  `;

    const variants = {
        default: 'border-[#90353D]/20',
        elevated: 'border-[#90353D]/20 shadow-lg shadow-[#90353D]/10',
        outlined: 'border-[#90353D]/30 bg-transparent',
        ghost: 'border-transparent bg-transparent',
    };

    const paddings = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const hoverStyles = hover
        ? 'hover:shadow-xl hover:shadow-[#90353D]/15 hover:-translate-y-1 hover:border-[#90353D]/40 cursor-pointer'
        : '';

    return (
        <div
            ref={ref}
            className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
});

const CardHeader = forwardRef(function CardHeader({ children, className = '', ...props }, ref) {
    return (
        <div ref={ref} className={`flex items-center justify-between ${className}`} {...props}>
            {children}
        </div>
    );
});

const CardTitle = forwardRef(function CardTitle({ children, as: Tag = 'h3', className = '', ...props }, ref) {
    return (
        <Tag ref={ref} className={`text-lg font-semibold text-[#3E2723] ${className}`} {...props}>
            {children}
        </Tag>
    );
});

const CardDescription = forwardRef(function CardDescription({ children, className = '', ...props }, ref) {
    return (
        <p ref={ref} className={`text-sm text-[#4A3C35] ${className}`} {...props}>
            {children}
        </p>
    );
});

const CardContent = forwardRef(function CardContent({ children, className = '', ...props }, ref) {
    return (
        <div ref={ref} className={className} {...props}>
            {children}
        </div>
    );
});

const CardFooter = forwardRef(function CardFooter({ children, className = '', ...props }, ref) {
    return (
        <div ref={ref} className={`flex items-center justify-end gap-3 pt-4 ${className}`} {...props}>
            {children}
        </div>
    );
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export default Card;
