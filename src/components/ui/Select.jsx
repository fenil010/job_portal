import { forwardRef, useState, useRef, useEffect } from 'react';

const Select = forwardRef(function Select(
    {
        label,
        id,
        options = [],
        value,
        onChange,
        placeholder = 'Select an option',
        error,
        disabled = false,
        required = false,
        className = '',
        containerClassName = '',
        ...props
    },
    ref
) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const selectRef = useRef(null);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (event) => {
        if (disabled) return;
        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (isOpen) {
                    onChange?.(options[highlightedIndex]?.value);
                    setIsOpen(false);
                } else {
                    setIsOpen(true);
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (!isOpen) setIsOpen(true);
                else setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (isOpen) setHighlightedIndex((prev) => Math.max(prev - 1, 0));
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    return (
        <div className={`w-full ${containerClassName}`} ref={selectRef}>
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
                <button
                    ref={ref}
                    type="button"
                    id={inputId}
                    disabled={disabled}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    className={`
            w-full px-4 py-3 pr-10 rounded-xl border-2 bg-[#FAF6F0] text-left
            transition-all duration-300 ease-out
            focus:outline-none
            disabled:bg-[#F4EDE3] disabled:cursor-not-allowed
            ${error
                            ? 'border-[#C45B5B] focus:shadow-[0_0_0_3px_rgba(196,91,91,0.2)]'
                            : `border-[#90353D]/20 focus:border-[#90353D] focus:shadow-[0_0_0_3px_rgba(144,53,61,0.2)]`
                        }
            ${className}
          `}
                    {...props}
                >
                    <span className={selectedOption ? 'text-[#3E2723]' : 'text-[#9B8B7E]'}>
                        {selectedOption?.label || placeholder}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg
                            className={`w-5 h-5 text-[#9B8B7E] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>
                {isOpen && (
                    <ul
                        role="listbox"
                        className="absolute z-10 w-full mt-2 py-2 bg-[#FAF6F0] rounded-xl border-2 border-[#90353D]/20 shadow-xl shadow-[#90353D]/10 max-h-60 overflow-auto animate-fade-in-down"
                    >
                        {options.map((option, index) => (
                            <li
                                key={option.value}
                                role="option"
                                aria-selected={value === option.value}
                                onClick={() => { onChange?.(option.value); setIsOpen(false); }}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                className={`
                  px-4 py-2.5 text-sm cursor-pointer transition-all duration-200
                  ${value === option.value
                                        ? 'bg-[#90353D]/15 text-[#90353D] font-medium'
                                        : highlightedIndex === index
                                            ? 'bg-[#90353D]/10'
                                            : 'text-[#4A3C35]'
                                    }
                `}
                            >
                                {option.label}
                            </li>
                        ))}
                        {options.length === 0 && (
                            <li className="px-4 py-2.5 text-sm text-[#9B8B7E]">No options available</li>
                        )}
                    </ul>
                )}
            </div>
            {error && (
                <p className="mt-2 text-sm text-[#C45B5B] animate-fade-in-up" role="alert">{error}</p>
            )}
        </div>
    );
});

export default Select;
