import { forwardRef } from 'react';

const Checkbox = forwardRef(function Checkbox(
    {
        checked = false,
        onChange,
        label,
        disabled = false,
        indeterminate = false,
        size = 'md',
        className = '',
        ...props
    },
    ref
) {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const labelSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    return (
        <label
            className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            <div className="relative">
                <input
                    ref={ref}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only peer"
                    {...props}
                />
                <div
                    className={`
                        ${sizes[size]}
                        border-2 border-[#90353D]/25 rounded-md
                        bg-[#FAF6F0]
                        peer-checked:bg-[#90353D] peer-checked:border-[#90353D]
                        peer-focus-visible:ring-2 peer-focus-visible:ring-[#90353D] peer-focus-visible:ring-offset-2
                        transition-all duration-200
                        flex items-center justify-center
                    `}
                >
                    {(checked || indeterminate) && (
                        <svg
                            className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} text-white`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {indeterminate ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            )}
                        </svg>
                    )}
                </div>
            </div>
            {label && (
                <span className={`${labelSizes[size]} text-[#3E2723]`}>{label}</span>
            )}
        </label>
    );
});

export { Checkbox };
export default Checkbox;
