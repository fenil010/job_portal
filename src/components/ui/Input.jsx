import { forwardRef, useState } from 'react';

const Input = forwardRef(function Input(
    {
        label,
        id,
        type = 'text',
        error,
        helperText,
        leftIcon,
        rightIcon,
        showPasswordToggle = false,
        className = '',
        containerClassName = '',
        required = false,
        ...props
    },
    ref
) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const inputType = type === 'password' && showPassword ? 'text' : type;

    const baseInputStyles = `
    w-full px-4 py-3 rounded-xl border-2 bg-[#FAF6F0]
    text-[#3E2723] placeholder-[#9B8B7E]
    transition-all duration-300 ease-out
    focus:outline-none
    disabled:bg-[#F4EDE3] disabled:text-[#9B8B7E] disabled:cursor-not-allowed
  `;

    const stateStyles = error
        ? 'border-[#C45B5B] focus:border-[#C45B5B] focus:shadow-[0_0_0_3px_rgba(196,91,91,0.2)]'
        : `border-[#90353D]/20 focus:border-[#90353D] focus:shadow-[0_0_0_3px_rgba(144,53,61,0.2)]`;

    const iconPadding = leftIcon ? 'pl-11' : '';
    const rightPadding = rightIcon || showPasswordToggle ? 'pr-11' : '';

    return (
        <div className={`w-full ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isFocused ? 'text-[#90353D]' : 'text-[#4A3C35]'
                        }`}
                >
                    {label}
                    {required && <span className="text-[#C45B5B] ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused ? 'text-[#90353D]' : 'text-[#9B8B7E]'}`}>
                        {leftIcon}
                    </div>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    type={inputType}
                    className={`${baseInputStyles} ${stateStyles} ${iconPadding} ${rightPadding} ${className}`}
                    onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
                    onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                    {...props}
                />
                {showPasswordToggle && type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9B8B7E] hover:text-[#90353D] transition-colors duration-300 focus:outline-none"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
                {rightIcon && !showPasswordToggle && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9B8B7E]">{rightIcon}</div>
                )}
            </div>
            {error && (
                <p id={`${inputId}-error`} className="mt-2 text-sm text-[#C45B5B] animate-fade-in-up" role="alert">
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p id={`${inputId}-helper`} className="mt-2 text-sm text-[#9B8B7E]">
                    {helperText}
                </p>
            )}
        </div>
    );
});

export default Input;
