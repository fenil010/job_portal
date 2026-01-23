import { Badge } from '../ui';

export default function SalaryInsights({ insights }) {
    const { role = 'Developer', experienceLevel = 'mid', baseSalary = 85000, range = {}, benefits = [], negotiationTips = [] } = insights || {};

    const formatSalary = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="space-y-5">
            {/* Salary Range Display */}
            <div className="p-5 bg-gradient-to-br from-[#789A99]/10 to-[#FFD2C2]/10 rounded-2xl">
                <div className="text-center mb-4">
                    <p className="text-sm text-[#5a6b75] mb-1">Estimated Salary for {role}</p>
                    <p className="text-4xl font-bold text-[#1e2a32]">{formatSalary(baseSalary)}</p>
                    <p className="text-sm text-[#789A99] mt-1">
                        {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)} Level
                    </p>
                </div>

                {/* Range Bar */}
                <div className="relative pt-4">
                    <div className="flex justify-between text-xs text-[#8a9aa4] mb-2">
                        <span>{formatSalary(range.min || baseSalary * 0.85)}</span>
                        <span>{formatSalary(range.max || baseSalary * 1.15)}</span>
                    </div>
                    <div className="h-3 bg-[#e8e0dc] rounded-full overflow-hidden">
                        <div className="relative h-full">
                            <div
                                className="absolute h-full bg-gradient-to-r from-[#789A99] to-[#4ade80] rounded-full"
                                style={{ left: '0%', width: '100%' }}
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#789A99] rounded-full shadow-md"
                                style={{ left: '50%', transform: 'translate(-50%, -50%)' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits */}
            {benefits.length > 0 && (
                <div>
                    <h4 className="font-semibold text-[#1e2a32] mb-3">Typical Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                        {benefits.map((benefit, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 text-sm bg-[#789A99]/10 text-[#789A99] rounded-lg"
                            >
                                {benefit}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Negotiation Tips */}
            {negotiationTips.length > 0 && (
                <div>
                    <h4 className="font-semibold text-[#1e2a32] mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#fbbf24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Negotiation Tips
                    </h4>
                    <div className="space-y-2">
                        {negotiationTips.map((tip, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-[#4ade80] flex-shrink-0">✓</span>
                                <span className="text-[#5a6b75]">{tip}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Market Comparison */}
            <div className="p-4 bg-[#f8f6f5] rounded-xl">
                <h4 className="font-semibold text-[#1e2a32] mb-3">Market Position</h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                    {['Entry', 'Mid', 'Senior', 'Lead'].map((level, idx) => {
                        const isActive = level.toLowerCase() === experienceLevel.toLowerCase() ||
                            (experienceLevel === 'mid' && level === 'Mid');
                        return (
                            <div
                                key={level}
                                className={`p-2 rounded-lg ${isActive ? 'bg-[#789A99] text-white' : 'bg-white text-[#5a6b75]'}`}
                            >
                                <p className="text-xs font-medium">{level}</p>
                                <p className="text-sm font-bold">
                                    ${Math.round((50 + idx * 40))}k
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
