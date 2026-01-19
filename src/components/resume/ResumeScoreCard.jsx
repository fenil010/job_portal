import { Badge } from '../ui';

export default function ResumeScoreCard({ analysis, compact = false }) {
    const { overallScore = 0, skillMatch, experience, education, keywords, ats } = analysis || {};

    const getScoreColor = (score) => {
        if (score >= 80) return { bg: 'bg-[#4ade80]', text: 'text-[#16a34a]', ring: 'ring-[#4ade80]' };
        if (score >= 60) return { bg: 'bg-[#fbbf24]', text: 'text-[#d97706]', ring: 'ring-[#fbbf24]' };
        return { bg: 'bg-[#f87171]', text: 'text-[#dc2626]', ring: 'ring-[#f87171]' };
    };

    const getScoreLabel = (score) => {
        if (score >= 90) return 'Excellent';
        if (score >= 80) return 'Very Good';
        if (score >= 70) return 'Good';
        if (score >= 60) return 'Fair';
        return 'Needs Work';
    };

    const mainColor = getScoreColor(overallScore);
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (overallScore / 100) * circumference;

    const categories = [
        { label: 'Skills Match', score: skillMatch?.score || 0, icon: '🎯' },
        { label: 'Experience', score: experience?.score || 0, icon: '💼' },
        { label: 'Education', score: education?.score || 0, icon: '🎓' },
        { label: 'Keywords', score: keywords?.score || 0, icon: '🔑' },
        { label: 'ATS Score', score: ats?.score || 0, icon: '🤖' },
    ];

    if (compact) {
        return (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#FFD2C2]/20 to-white rounded-xl">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${mainColor.bg}`}>
                    {overallScore}%
                </div>
                <div>
                    <p className="font-semibold text-[#1e2a32]">{getScoreLabel(overallScore)} Match</p>
                    <p className="text-xs text-[#5a6b75]">{skillMatch?.matched?.length || 0} of {(skillMatch?.matched?.length || 0) + (skillMatch?.missing?.length || 0)} skills</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Main Score Circle */}
            <div className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#e8e0dc"
                            strokeWidth="8"
                            fill="none"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="url(#scoreGradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#789A99" />
                                <stop offset="100%" stopColor="#4ade80" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-[#1e2a32]">{overallScore}</span>
                        <span className="text-xs text-[#5a6b75]">out of 100</span>
                    </div>
                </div>
                <Badge variant={overallScore >= 70 ? 'success' : overallScore >= 50 ? 'warning' : 'danger'} size="md" className="mt-3">
                    {getScoreLabel(overallScore)}
                </Badge>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-3">
                <h4 className="font-semibold text-[#1e2a32] text-sm">Score Breakdown</h4>
                {categories.map((cat) => {
                    const catColor = getScoreColor(cat.score);
                    return (
                        <div key={cat.label} className="group">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-[#5a6b75] flex items-center gap-2">
                                    <span>{cat.icon}</span>
                                    {cat.label}
                                </span>
                                <span className={`text-sm font-semibold ${catColor.text}`}>{cat.score}%</span>
                            </div>
                            <div className="w-full bg-[#e8e0dc] rounded-full h-2 overflow-hidden">
                                <div
                                    className={`h-2 rounded-full transition-all duration-700 ${catColor.bg}`}
                                    style={{ width: `${cat.score}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
