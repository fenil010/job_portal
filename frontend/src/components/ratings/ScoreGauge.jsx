import { useEffect, useState } from 'react';

export default function ScoreGauge({
    value = 0,
    max = 100,
    size = 'md',
    label,
    showLabel = true,
    animated = true,
    className = '',
}) {
    const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

    useEffect(() => {
        if (animated) {
            const duration = 1000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setDisplayValue(value);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.round(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        } else {
            setDisplayValue(value);
        }
    }, [value, animated]);

    const percentage = Math.min(100, Math.max(0, (displayValue / max) * 100));

    // Color based on score
    const getColor = () => {
        if (percentage < 40) return { stroke: '#C45B5B', text: '#C45B5B' }; // Red
        if (percentage < 70) return { stroke: '#D4A574', text: '#D4A574' }; // Yellow/Orange
        return { stroke: '#4ade80', text: '#4ade80' }; // Green
    };

    const colors = getColor();

    const sizes = {
        sm: { container: 'w-16 h-16', text: 'text-lg', label: 'text-xs', stroke: 4 },
        md: { container: 'w-24 h-24', text: 'text-2xl', label: 'text-sm', stroke: 6 },
        lg: { container: 'w-32 h-32', text: 'text-3xl', label: 'text-base', stroke: 8 },
    };

    const config = sizes[size];
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className={`relative ${config.container}`}>
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="#90353D"
                        strokeOpacity="0.15"
                        strokeWidth={config.stroke}
                    />
                    {/* Progress circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={colors.stroke}
                        strokeWidth={config.stroke}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300 ease-out"
                    />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`font-bold ${config.text}`} style={{ color: colors.text }}>
                        {Math.round(displayValue)}
                    </span>
                    {showLabel && (
                        <span className="text-xs text-[#9B8B7E]">/ {max}</span>
                    )}
                </div>
            </div>
            {label && (
                <span className={`mt-2 font-medium text-[#3E2723] ${config.label}`}>
                    {label}
                </span>
            )}
        </div>
    );
}

export { ScoreGauge };
