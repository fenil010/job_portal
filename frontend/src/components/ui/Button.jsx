import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Button = forwardRef(function Button(
    {
        children,
        variant = 'primary',
        size = 'md',
        loading = false,
        disabled = false,
        className = '',
        as: asProp = 'button',
        loadingText = 'Loading',
        onClick,
        href,
        type,
        ...props
    },
    ref
) {
        const baseStyles = `inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]`;

    const variants = {
        primary: `
      bg-[#90353D] text-[#F4EDE3]
      hover:bg-[#6B2830] 
      focus-visible:ring-[#90353D]
      shadow-md shadow-[#90353D]/20
    `,
        secondary: `
      bg-[#A64D56] text-white
      hover:bg-[#90353D]
      focus-visible:ring-[#A64D56]
      shadow-md shadow-[#A64D56]/30
    `,
        outline: `
      border-2 border-[#90353D] text-[#90353D]
      hover:bg-[#90353D]/10
      focus-visible:ring-[#90353D]
    `,
        ghost: `
      text-[#4A3C35]
      hover:bg-[#90353D]/10 hover:text-[#90353D]
      focus-visible:ring-[#90353D]
    `,
        danger: `
      bg-[#C45B5B] text-white
      hover:bg-[#a73e3e]
      focus-visible:ring-[#C45B5B]
      shadow-md shadow-[#C45B5B]/20
    `,
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm gap-1.5',
        md: 'px-5 py-2.5 text-base gap-2',
        lg: 'px-7 py-3.5 text-lg gap-2.5',
    };

    // Determine which element to render. If `href` is provided and the consumer
    // didn't explicitly set `as`, render an anchor.
    let Component = asProp;
    if (href && asProp === 'button') Component = 'a';

    // Ensure button has a default `type` when rendering a real button.
    const resolvedType = Component === 'button' ? type ?? 'button' : undefined;

    const handleClick = (e) => {
        if (disabled || loading) {
            e.preventDefault();
            return;
        }
        if (typeof onClick === 'function') onClick(e);
    };

    return (
        <Component
            ref={ref}
            href={Component === 'a' ? href : undefined}
            type={resolvedType}
            onClick={handleClick}
            aria-busy={loading || undefined}
            aria-disabled={Component === 'a' && (disabled || loading) ? true : undefined}
            tabIndex={Component === 'a' && (disabled || loading) ? -1 : props.tabIndex}
            className={[baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, (disabled || loading) ? 'opacity-50 cursor-not-allowed pointer-events-none' : '', className]
                .filter(Boolean)
                .join(' ')
                .replace(/\s+/g, ' ')
                .trim()}
            {...props}
        >
            {loading && (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span className="sr-only">{loadingText}</span>
                </>
            )}
            {children}
        </Component>
    );
});

export default Button;

Button.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    loadingText: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
