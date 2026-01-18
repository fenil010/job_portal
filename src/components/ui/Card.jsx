import { forwardRef } from 'react';

const Card = forwardRef(function Card(
    {
        children,
        variant = 'default',
        padding = 'md',
        hover = false,
        animated = false,
        className = '',
        as: Component = 'div',
        ...props
    },
    ref
) {
    const baseStyles = `
    bg-white rounded-2xl border-2
    transition-all duration-300 ease-out
  `;

    const variants = {
        default: 'border-[#e8e0dc]',
        elevated: 'border-[#e8e0dc] shadow-lg shadow-[#1e2a32]/5',
        outlined: 'border-[#789A99]/30',
        ghost: 'border-transparent bg-[#FFD2C2]/10',
    };

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
    };

    const hoverStyles = hover
        ? 'hover:shadow-xl hover:shadow-[#1e2a32]/10 hover:-translate-y-1 hover:border-[#789A99]/40 cursor-pointer'
        : '';

    const animatedStyles = animated ? 'animate-fade-in-up' : '';

    return (
        <Component
            ref={ref}
            className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${animatedStyles} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
});

const CardHeader = forwardRef(function CardHeader({ children, className = '', ...props }, ref) {
    return (
        <div ref={ref} className={`flex items-center justify-between mb-5 ${className}`} {...props}>
            {children}
        </div>
    );
});

const CardTitle = forwardRef(function CardTitle({ children, as: Component = 'h3', className = '', ...props }, ref) {
    return (
        <Component ref={ref} className={`text-lg font-semibold text-[#1e2a32] ${className}`} {...props}>
            {children}
        </Component>
    );
});

const CardDescription = forwardRef(function CardDescription({ children, className = '', ...props }, ref) {
    return (
        <p ref={ref} className={`text-sm text-[#5a6b75] ${className}`} {...props}>
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
        <div
            ref={ref}
            className={`flex items-center justify-end gap-3 mt-5 pt-5 border-t-2 border-[#e8e0dc] ${className}`}
            {...props}
        >
            {children}
        </div>
    );
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export default Card;
