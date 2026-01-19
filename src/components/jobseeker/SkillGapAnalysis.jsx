import { Badge, Button } from '../ui';

export default function SkillGapAnalysis({ analysis, learningRecommendations = [], onLearnSkill }) {
    const { userSkillCount = 0, totalDemandedSkills = 0, skillCoverage = 0, topMissingSkills = [] } = analysis || {};

    const getCoverageColor = (coverage) => {
        if (coverage >= 80) return { bg: 'bg-[#4ade80]', text: 'text-[#16a34a]' };
        if (coverage >= 60) return { bg: 'bg-[#60a5fa]', text: 'text-[#2563eb]' };
        if (coverage >= 40) return { bg: 'bg-[#fbbf24]', text: 'text-[#d97706]' };
        return { bg: 'bg-[#f87171]', text: 'text-[#dc2626]' };
    };

    const getPriorityColor = (priority) => {
        if (priority === 'high') return 'danger';
        if (priority === 'medium') return 'warning';
        return 'secondary';
    };

    const colors = getCoverageColor(skillCoverage);

    return (
        <div className="space-y-5">
            {/* Skill Coverage Overview */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#789A99]/10 to-white rounded-xl">
                <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="36" stroke="#e8e0dc" strokeWidth="6" fill="none" />
                        <circle
                            cx="40" cy="40" r="36"
                            stroke="#789A99"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 36}
                            strokeDashoffset={2 * Math.PI * 36 * (1 - skillCoverage / 100)}
                            className="transition-all duration-1000"
                        />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#1e2a32]">
                        {skillCoverage}%
                    </span>
                </div>
                <div>
                    <h4 className="font-semibold text-[#1e2a32]">Skill Coverage</h4>
                    <p className="text-sm text-[#5a6b75]">
                        You have {userSkillCount} of {totalDemandedSkills} in-demand skills
                    </p>
                </div>
            </div>

            {/* Top Missing Skills */}
            {topMissingSkills.length > 0 && (
                <div>
                    <h4 className="font-semibold text-[#1e2a32] mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#fbbf24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Skills to Develop
                    </h4>
                    <div className="space-y-2">
                        {topMissingSkills.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#e8e0dc]"
                            >
                                <div className="flex items-center gap-3">
                                    <Badge variant={getPriorityColor(item.priority)} size="sm">
                                        {item.priority}
                                    </Badge>
                                    <span className="font-medium text-[#1e2a32]">{item.skill}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-[#8a9aa4]">
                                        {item.demandPercentage}% of jobs
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => onLearnSkill?.(item.skill)}
                                    >
                                        Learn
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Learning Recommendations */}
            {learningRecommendations.length > 0 && (
                <div>
                    <h4 className="font-semibold text-[#1e2a32] mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Recommended Learning
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                        {learningRecommendations.slice(0, 3).map((rec, idx) => (
                            <a
                                key={idx}
                                href={rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 bg-[#789A99]/5 rounded-xl hover:bg-[#789A99]/10 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#789A99]/20 flex items-center justify-center">
                                    <span className="text-lg">
                                        {rec.type === 'course' ? '📚' : rec.type === 'certification' ? '🎓' : '📖'}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-[#1e2a32] text-sm">{rec.title}</p>
                                    <p className="text-xs text-[#5a6b75]">{rec.platform} · {rec.duration}</p>
                                </div>
                                <Badge variant={getPriorityColor(rec.priority)} size="sm">{rec.skill}</Badge>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
