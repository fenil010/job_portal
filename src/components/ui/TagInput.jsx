import { forwardRef, useState, useCallback } from 'react';

const TagInput = forwardRef(function TagInput(
    {
        value = [],
        onChange,
        label,
        placeholder = 'Type and press Enter...',
        maxTags,
        suggestions = [],
        disabled = false,
        error,
        helperText,
        className = '',
        ...props
    },
    ref
) {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredSuggestions = suggestions.filter(
        (s) => s.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(s)
    );

    const addTag = useCallback((tag) => {
        const trimmed = tag.trim();
        if (trimmed && !value.includes(trimmed) && (!maxTags || value.length < maxTags)) {
            onChange([...value, trimmed]);
            setInputValue('');
            setShowSuggestions(false);
        }
    }, [value, onChange, maxTags]);

    const removeTag = useCallback((tagToRemove) => {
        onChange(value.filter((tag) => tag !== tagToRemove));
    }, [value, onChange]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            removeTag(value[value.length - 1]);
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-[#1e2a32]">{label}</label>
            )}
            <div
                className={`
                    flex flex-wrap gap-2 p-3 rounded-xl
                    border-2 ${error ? 'border-[#f87171]' : 'border-[#e8e0dc]'}
                    bg-white focus-within:border-[#789A99] focus-within:ring-2 focus-within:ring-[#789A99]/20
                    transition-all duration-200
                    ${disabled ? 'opacity-50 cursor-not-allowed bg-[#f5f3f1]' : ''}
                `}
            >
                {value.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#789A99]/15 text-[#5f7d7c] rounded-lg text-sm font-medium"
                    >
                        {tag}
                        {!disabled && (
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="p-0.5 hover:bg-[#789A99]/30 rounded transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </span>
                ))}
                <div className="relative flex-1 min-w-[120px]">
                    <input
                        ref={ref}
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setShowSuggestions(e.target.value.length > 0);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowSuggestions(inputValue.length > 0)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                        placeholder={value.length === 0 ? placeholder : ''}
                        disabled={disabled || (maxTags && value.length >= maxTags)}
                        className="w-full border-none outline-none bg-transparent text-[#1e2a32] placeholder-[#8a9aa4]"
                        {...props}
                    />
                    {showSuggestions && filteredSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#e8e0dc] rounded-xl shadow-lg z-10 max-h-40 overflow-y-auto">
                            {filteredSuggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => addTag(suggestion)}
                                    className="w-full px-4 py-2 text-left text-sm text-[#1e2a32] hover:bg-[#FFD2C2]/20 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {maxTags && (
                <p className="text-xs text-[#8a9aa4]">{value.length}/{maxTags} tags</p>
            )}
            {error && <p className="text-sm text-[#f87171]">{error}</p>}
            {helperText && !error && <p className="text-sm text-[#8a9aa4]">{helperText}</p>}
        </div>
    );
});

export { TagInput };
export default TagInput;
