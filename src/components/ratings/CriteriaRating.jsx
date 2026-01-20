import { useState, useMemo } from 'react';

const DEFAULT_CRITERIA = [
    { id: 'skills', name: 'Skills Match', weight: 30 },
    { id: 'experience', name: 'Experience Level', weight: 25 },
    { id: 'education', name: 'Education Fit', weight: 20 },
    { id: 'keywords', name: 'Keywords Match', weight: 15 },
    { id: 'formatting', name: 'Formatting Quality', weight: 10 },
];

export default function CriteriaRating({
    criteria = DEFAULT_CRITERIA,
    values = {},
    onChange,
    readOnly = false,
    showWeights = true,
    showTotal = true,
    className = '',
}) {
    const [localValues, setLocalValues] = useState(values);

    const handleChange = (criterionId, score) => {
        const updated = { ...localValues, [criterionId]: score };
        setLocalValues(updated);
        onChange?.(updated);
    };

    const totalScore = useMemo(() => {
        let weightedSum = 0;
        let totalWeight = 0;

        criteria.forEach((c) => {
            const score = localValues[c.id] || 0;
            weightedSum += score * (c.weight / 100);
            totalWeight += c.weight;
        });

        // Normalize if weights don't add up to 100
        if (totalWeight > 0 && totalWeight !== 100) {
            weightedSum = (weightedSum / totalWeight) * 100;
        }

        return Math.round(weightedSum);
    }, [localValues, criteria]);

    const getScoreColor = (score) => {
        if (score < 40) return 'bg-[#C45B5B]';
        if (score < 70) return 'bg-[#D4A574]';
        return 'bg-[#4ade80]';
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {criteria.map((criterion) => {
                const score = localValues[criterion.id] || 0;

                return (
                    <div key={criterion.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-[#3E2723]">
                                    {criterion.name}
                                </span>
                                {showWeights && (
                                    <span className="px-1.5 py-0.5 text-xs font-medium bg-[#90353D]/10 text-[#90353D] rounded">
                                        {criterion.weight}%
                                    </span>
                                )}
                            </div>
                            <span className="text-sm font-semibold text-[#90353D]">
                                {score}
                            </span>
                        </div>

                        {readOnly ? (
                            <div className="h-2 bg-[#90353D]/10 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${getScoreColor(score)} transition-all duration-500`}
                                    style={{ width: `${score}%` }}
                                />
                            </div>
                        ) : (
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={score}
                                onChange={(e) => handleChange(criterion.id, parseInt(e.target.value, 10))}
                                className="w-full h-2 bg-[#90353D]/10 rounded-full appearance-none cursor-pointer
                                    [&::-webkit-slider-thumb]:appearance-none
                                    [&::-webkit-slider-thumb]:w-4
                                    [&::-webkit-slider-thumb]:h-4
                                    [&::-webkit-slider-thumb]:rounded-full
                                    [&::-webkit-slider-thumb]:bg-[#90353D]
                                    [&::-webkit-slider-thumb]:shadow-md
                                    [&::-webkit-slider-thumb]:cursor-pointer
                                    [&::-webkit-slider-thumb]:transition-all
                                    [&::-webkit-slider-thumb]:hover:scale-110
                                "
                            />
                        )}
                    </div>
                );
            })}

            {showTotal && (
                <div className="pt-4 mt-4 border-t-2 border-[#90353D]/20">
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-[#3E2723]">
                            Weighted Total Score
                        </span>
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getScoreColor(totalScore)}`} />
                            <span className="text-xl font-bold text-[#90353D]">
                                {totalScore}/100
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export { CriteriaRating, DEFAULT_CRITERIA };
