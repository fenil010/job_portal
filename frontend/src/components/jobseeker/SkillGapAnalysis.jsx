import { Badge, Button } from '../ui';

export default function SkillGapAnalysis({ analysis, learningRecommendations = [], onLearnSkill }) {
    const { userSkillCount = 0, totalDemandedSkills = 0, skillCoverage = 0, topMissingSkills = [] } = analysis || {};

    const getCoverageColor = (coverage) => {
        if (coverage >= 80) return { bg: 'bg-emerald-500', ring: 'ring-emerald-200', text: 'text-emerald-600' };
        if (coverage >= 60) return { bg: 'bg-blue-500', ring: 'ring-blue-200', text: 'text-blue-600' };
        if (coverage >= 40) return { bg: 'bg-amber-500', ring: 'ring-amber-200', text: 'text-amber-600' };
        return { bg: 'bg-red-500', ring: 'ring-red-200', text: 'text-red-600' };
    };

    const getPriorityColor = (priority) => {
        if (priority === 'high') return 'danger';
        if (priority === 'medium') return 'warning';
        return 'secondary';
    };

    const getPriorityGradient = (priority) => {
        if (priority === 'high') return 'from-red-50 to-rose-50 border-red-200 hover:border-red-300';
        if (priority === 'medium') return 'from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-300';
        return 'from-slate-50 to-gray-50 border-slate-200 hover:border-slate-300';
    };

    const colors = getCoverageColor(skillCoverage);

    return (
        <div className="space-y-6">
            {/* Skill Coverage Overview */}
            <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-[#789A99]/10 via-white to-[#FFD2C2]/10 rounded-2xl border border-[#e8e0dc] shadow-sm animate-fade-in-up">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                        <circle cx="48" cy="48" r="42" stroke="#e8e0dc" strokeWidth="8" fill="none" />
                        <circle
                            cx="48" cy="48" r="42"
                            stroke="url(#coverageGradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 42}
                            strokeDashoffset={2 * Math.PI * 42 * (1 - skillCoverage / 100)}
                            className="transition-all duration-1000"
                        />
                        <defs>
                            <linearGradient id="coverageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#789A99" />
                                <stop offset="100%" stopColor="#5f7d7c" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[#1e2a32]">
                        {skillCoverage}%
                    </span>
                </div>
                <div>
                    <h4 className="font-bold text-[#1e2a32] text-lg mb-1">Skill Coverage</h4>
                    <p className="text-sm text-[#5a6b75] mb-2">
                        You have <span className="font-semibold text-[#789A99]">{userSkillCount}</span> of <span className="font-semibold">{totalDemandedSkills}</span> in-demand skills
                    </p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.ring} ring-2 text-white`}>
                        {skillCoverage >= 80 ? '🎯 Excellent' : skillCoverage >= 60 ? '👍 Good' : skillCoverage >= 40 ? '📈 Improving' : '🚀 Room to Grow'}
                    </div>
                </div>
            </div>

            {/* Top Missing Skills */}
            {topMissingSkills.length > 0 && (
                <div className="animate-fade-in-up stagger-1">
                    <h4 className="font-bold text-[#1e2a32] mb-4 flex items-center gap-2.5 text-base">
                        <span className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-sm">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </span>
                        Skills to Develop
                    </h4>
                    <div className="space-y-3">
                        {topMissingSkills.map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center justify-between p-4 bg-gradient-to-r ${getPriorityGradient(item.priority)} rounded-2xl border-2 transition-all duration-300 hover:shadow-md group animate-fade-in-up`}
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <span className="text-lg">⚡</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-bold text-[#1e2a32]">{item.skill}</span>
                                            <Badge variant={getPriorityColor(item.priority)} size="sm" className="uppercase text-xs font-semibold">
                                                {item.priority}
                                            </Badge>
                                        </div>
                                        <span className="text-xs text-[#8a9aa4] font-medium">
                                            Required by {item.demandPercentage}% of jobs
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => onLearnSkill?.(item.skill)}
                                    className="shadow-sm"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Learn
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Learning Recommendations */}
            {learningRecommendations.length > 0 && (
                <div className="animate-fade-in-up stagger-2">
                    <h4 className="font-bold text-[#1e2a32] mb-4 flex items-center gap-2.5 text-base">
                        <span className="w-8 h-8 bg-gradient-to-br from-[#789A99] to-[#5f7d7c] rounded-xl flex items-center justify-center shadow-sm">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </span>
                        Recommended Learning
                    </h4>
                    <div className="space-y-3">
                        {learningRecommendations.slice(0, 3).map((rec, idx) => (
                            <a
                                key={idx}
                                href={rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-200 hover:border-teal-300 hover:shadow-md transition-all duration-300 group animate-fade-in-up"
                                style={{ animationDelay: `${(idx + 3) * 100}ms` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">
                                        {rec.type === 'course' ? '📚' : rec.type === 'certification' ? '🎓' : '📖'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-[#1e2a32] text-sm group-hover:text-[#789A99] transition-colors">{rec.title}</p>
                                    <p className="text-xs text-[#5a6b75] mt-0.5">{rec.platform} · {rec.duration}</p>
                                </div>
                                <Badge variant={getPriorityColor(rec.priority)} size="sm" className="font-semibold">
                                    {rec.skill}
                                </Badge>
                                <svg className="w-5 h-5 text-[#8a9aa4] group-hover:text-[#789A99] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {topMissingSkills.length === 0 && learningRecommendations.length === 0 && (
                <div className="p-8 text-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-dashed border-emerald-200">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-emerald-700 font-bold text-lg">Great job! 🎉</p>
                    <p className="text-emerald-600 text-sm mt-1">Your skills match current market demands</p>
                </div>
            )}
        </div>
    );
}
