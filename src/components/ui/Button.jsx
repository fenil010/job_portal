import { forwardRef } from 'react';

const Button = forwardRef(function Button(
    {
        children,
        variant = 'primary',
        size = 'md',
        disabled = false,
        loading = false,
        leftIcon,
        rightIcon,
        className = '',
        type = 'button',
        ...props
    },
    ref
) {
    const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    select-none active:scale-95
    hover:scale-105 hover:shadow-lg
  `;

    const variants = {
        primary: `
      bg-[#789A99] text-white
      hover:bg-[#5f7d7c] 
      focus-visible:ring-[#789A99]
      shadow-md shadow-[#789A99]/20
    `,
        secondary: `
      bg-[#FFD2C2] text-[#1e2a32]
      hover:bg-[#f5b8a3]
      focus-visible:ring-[#FFD2C2]
      shadow-md shadow-[#FFD2C2]/30
    `,
        outline: `
      border-2 border-[#789A99] text-[#789A99] bg-transparent
      hover:bg-[#789A99] hover:text-white
      focus-visible:ring-[#789A99]
    `,
        ghost: `
      text-[#5a6b75] bg-transparent
      hover:bg-[#FFD2C2]/30 hover:text-[#1e2a32]
      focus-visible:ring-[#789A99]
    `,
        danger: `
      bg-[#f87171] text-white
      hover:bg-[#ef4444]
      focus-visible:ring-[#f87171]
      shadow-md shadow-[#f87171]/20
    `,
        success: `
      bg-[#4ade80] text-white
      hover:bg-[#22c55e]
      focus-visible:ring-[#4ade80]
      shadow-md shadow-[#4ade80]/20
    `,
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-5 py-2.5 text-sm gap-2',
        lg: 'px-7 py-3.5 text-base gap-2',
        xl: 'px-9 py-4 text-lg gap-3',
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
        xl: 'w-6 h-6',
    };

    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {loading ? (
                <svg
                    className={`animate-spin ${iconSizes[size]}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            ) : (
                leftIcon && <span className={iconSizes[size]}>{leftIcon}</span>
            )}
            {children}
            {!loading && rightIcon && <span className={iconSizes[size]}>{rightIcon}</span>}
        </button>
    );
});

export default Button;
