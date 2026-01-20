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
                <label className="block text-sm font-medium text-[#3E2723]">{label}</label>
            )}
            <div
                className={`
                    flex flex-wrap gap-2 p-3 rounded-xl
                    border-2 ${error ? 'border-[#C45B5B]' : 'border-[#90353D]/20'}
                    bg-[#FAF6F0] focus-within:border-[#90353D] focus-within:ring-2 focus-within:ring-[#90353D]/20
                    transition-all duration-200
                    ${disabled ? 'opacity-50 cursor-not-allowed bg-[#F4EDE3]' : ''}
                `}
            >
                {value.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#90353D]/15 text-[#90353D] rounded-lg text-sm font-medium"
                    >
                        {tag}
                        {!disabled && (
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="p-0.5 hover:bg-[#90353D]/25 rounded transition-colors text-[#6B2830]"
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
                        className="w-full border-none outline-none bg-transparent text-[#3E2723] placeholder-[#9B8B7E]"
                        {...props}
                    />
                    {showSuggestions && filteredSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl shadow-lg z-10 max-h-40 overflow-y-auto">
                            {filteredSuggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => addTag(suggestion)}
                                    className="w-full px-4 py-2 text-left text-sm text-[#3E2723] hover:bg-[#90353D]/10 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {maxTags && (
                <p className="text-xs text-[#9B8B7E]">{value.length}/{maxTags} tags</p>
            )}
            {error && <p className="text-sm text-[#C45B5B]">{error}</p>}
            {helperText && !error && <p className="text-sm text-[#9B8B7E]">{helperText}</p>}
        </div>
    );
});

export { TagInput };
export default TagInput;
