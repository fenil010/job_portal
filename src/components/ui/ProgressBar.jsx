import { forwardRef } from 'react';

const ProgressBar = forwardRef(function ProgressBar(
    {
        value = 0,
        max = 100,
        size = 'md',
        variant = 'primary',
        showLabel = false,
        label,
        animated = false,
        className = '',
        ...props
    },
    ref
) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizes = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
    };

    const variants = {
        primary: 'bg-[#789A99]',
        success: 'bg-[#4ade80]',
        warning: 'bg-[#fbbf24]',
        danger: 'bg-[#f87171]',
        info: 'bg-[#60a5fa]',
    };

    return (
        <div ref={ref} className={`space-y-1.5 ${className}`} {...props}>
            {(showLabel || label) && (
                <div className="flex items-center justify-between text-sm">
                    <span className="text-[#5a6b75] font-medium">{label}</span>
                    {showLabel && (
                        <span className="text-[#1e2a32] font-semibold">{Math.round(percentage)}%</span>
                    )}
                </div>
            )}
            <div className={`w-full bg-[#e8e0dc] rounded-full overflow-hidden ${sizes[size]}`}>
                <div
                    className={`
                        ${sizes[size]} ${variants[variant]} rounded-full
                        transition-all duration-500 ease-out
                        ${animated ? 'animate-pulse-soft' : ''}
                    `}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                />
            </div>
        </div>
    );
});

// Stage Progress component for pipeline visualization
const StageProgress = forwardRef(function StageProgress(
    {
        stages = [],
        currentStage = 0,
        className = '',
        ...props
    },
    ref
) {
    return (
        <div ref={ref} className={`flex items-center gap-2 ${className}`} {...props}>
            {stages.map((stage, index) => (
                <div key={index} className="flex items-center">
                    <div
                        className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                            transition-all duration-300
                            ${index < currentStage
                                ? 'bg-[#789A99] text-white'
                                : index === currentStage
                                    ? 'bg-[#FFD2C2] text-[#1e2a32] ring-2 ring-[#789A99]'
                                    : 'bg-[#e8e0dc] text-[#8a9aa4]'
                            }
                        `}
                    >
                        {index < currentStage ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            index + 1
                        )}
                    </div>
                    {index < stages.length - 1 && (
                        <div
                            className={`w-12 h-0.5 mx-1 transition-colors duration-300 ${index < currentStage ? 'bg-[#789A99]' : 'bg-[#e8e0dc]'
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
});

export { ProgressBar, StageProgress };
export default ProgressBar;
