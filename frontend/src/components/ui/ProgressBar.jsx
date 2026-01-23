import { forwardRef } from 'react';

const ProgressBar = forwardRef(function ProgressBar(
    { value = 0, max = 100, variant = 'primary', size = 'md', showLabel = false, className = '', ...props },
    ref
) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const variants = {
        primary: 'bg-gradient-to-r from-[#90353D] to-[#6B2830]',
        secondary: 'bg-[#A64D56]',
        success: 'bg-[#4ade80]',
        warning: 'bg-[#fbbf24]',
        error: 'bg-[#C45B5B]',
    };

    const sizes = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
    };

    return (
        <div ref={ref} className={`w-full ${className}`} {...props}>
            {showLabel && (
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#4A3C35]">Progress</span>
                    <span className="text-sm font-semibold text-[#90353D]">{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={`w-full bg-[#90353D]/15 rounded-full overflow-hidden ${sizes[size]}`}>
                <div
                    className={`${variants[variant]} ${sizes[size]} rounded-full transition-all duration-700 ease-out`}
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

const StageProgress = forwardRef(function StageProgress(
    { stages = [], currentStage = 0, className = '', ...props },
    ref
) {
    return (
        <div ref={ref} className={`flex items-center justify-between ${className}`} {...props}>
            {stages.map((stage, index) => (
                <div key={index} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                        <div
                            className={`
                w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold
                transition-all duration-500 ease-out
                ${index < currentStage
                                    ? 'bg-[#90353D] text-white'
                                    : index === currentStage
                                        ? 'bg-[#FAF6F0] text-[#3E2723] ring-2 ring-[#90353D]'
                                        : 'bg-[#90353D]/15 text-[#9B8B7E]'
                                }
              `}
                        >
                            {index < currentStage ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                index + 1
                            )}
                        </div>
                        <span className={`mt-2 text-xs font-medium ${index <= currentStage ? 'text-[#3E2723]' : 'text-[#9B8B7E]'}`}>
                            {stage}
                        </span>
                    </div>
                    {index < stages.length - 1 && (
                        <div
                            className={`flex-1 h-0.5 mx-3 transition-all duration-500 ${index < currentStage ? 'bg-[#90353D]' : 'bg-[#90353D]/15'
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
