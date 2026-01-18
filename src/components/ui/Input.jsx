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
        disabled = false,
        required = false,
        className = '',
        containerClassName = '',
        ...props
    },
    ref
) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const inputType = type === 'password' && showPassword ? 'text' : type;

    const baseInputStyles = `
    w-full px-4 py-3 rounded-xl border-2 bg-white
    text-[#1e2a32] placeholder-[#8a9aa4]
    transition-all duration-300 ease-out
    focus:outline-none
    disabled:bg-[#f0e8e4] disabled:text-[#8a9aa4] disabled:cursor-not-allowed
  `;

    const stateStyles = error
        ? 'border-[#f87171] focus:border-[#f87171] focus:shadow-[0_0_0_3px_rgba(248,113,113,0.2)]'
        : `border-[#e8e0dc] focus:border-[#789A99] focus:shadow-[0_0_0_3px_rgba(120,154,153,0.2)]`;

    const paddingStyles = `
    ${leftIcon ? 'pl-12' : ''}
    ${rightIcon || (type === 'password' && showPasswordToggle) ? 'pr-12' : ''}
  `;

    return (
        <div className={`w-full ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isFocused ? 'text-[#789A99]' : 'text-[#5a6b75]'
                        }`}
                >
                    {label}
                    {required && <span className="text-[#f87171] ml-1">*</span>}
                </label>
            )}
            <div className="relative group">
                {leftIcon && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused ? 'text-[#789A99]' : 'text-[#8a9aa4]'
                        }`}>
                        {leftIcon}
                    </div>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    type={inputType}
                    disabled={disabled}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                    className={`${baseInputStyles} ${stateStyles} ${paddingStyles} ${className}`}
                    {...props}
                />
                {type === 'password' && showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a9aa4] hover:text-[#789A99] focus:outline-none transition-colors duration-300"
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
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a9aa4]">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <p id={`${inputId}-error`} className="mt-2 text-sm text-[#f87171] animate-fade-in-up" role="alert">
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p id={`${inputId}-helper`} className="mt-2 text-sm text-[#8a9aa4]">
                    {helperText}
                </p>
            )}
        </div>
    );
});

export default Input;
