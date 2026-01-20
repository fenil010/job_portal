import { useState } from 'react';

export default function StarRating({
    value = 0,
    max = 5,
    onChange,
    readOnly = false,
    size = 'md',
    showValue = false,
    label,
    allowHalf = false,
    className = '',
}) {
    const [hoverValue, setHoverValue] = useState(0);

    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    const handleClick = (starValue) => {
        if (readOnly) return;

        if (allowHalf) {
            onChange?.(starValue);
        } else {
            onChange?.(Math.ceil(starValue));
        }
    };

    const handleMouseMove = (e, index) => {
        if (readOnly) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const half = x < rect.width / 2;

        if (allowHalf && half) {
            setHoverValue(index + 0.5);
        } else {
            setHoverValue(index + 1);
        }
    };

    const displayValue = hoverValue || value;

    const renderStar = (index) => {
        const starNumber = index + 1;
        const filled = displayValue >= starNumber;
        const halfFilled = allowHalf && displayValue >= starNumber - 0.5 && displayValue < starNumber;

        return (
            <button
                key={index}
                type="button"
                onClick={() => handleClick(hoverValue || starNumber)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoverValue(0)}
                disabled={readOnly}
                className={`
                    ${sizes[size]} relative
                    ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                    transition-all duration-200 focus:outline-none
                `}
                aria-label={`Rate ${starNumber} out of ${max}`}
            >
                {/* Background star (empty) */}
                <svg
                    className={`absolute inset-0 ${sizes[size]} text-[#90353D]/20`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>

                {/* Filled star */}
                {(filled || halfFilled) && (
                    <svg
                        className={`absolute inset-0 ${sizes[size]} text-[#90353D]`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        style={halfFilled ? { clipPath: 'inset(0 50% 0 0)' } : undefined}
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                )}
            </button>
        );
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <span className="text-sm font-medium text-[#3E2723]">{label}</span>
            )}
            <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                    {Array.from({ length: max }, (_, i) => renderStar(i))}
                </div>
                {showValue && (
                    <span className="ml-2 text-sm font-semibold text-[#90353D]">
                        {value.toFixed(allowHalf ? 1 : 0)}/{max}
                    </span>
                )}
            </div>
        </div>
    );
}

export { StarRating };
