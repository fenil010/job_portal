import { Badge, Button } from '../ui';

export default function JobRecommendations({ recommendations = [], onViewJob, onApply }) {
    if (recommendations.length === 0) {
        return (
            <div className="text-center py-8 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#789A99]/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <p className="text-[#5a6b75]">Complete your profile</p>
                <p className="text-sm text-[#8a9aa4]">to get personalized recommendations</p>
            </div>
        );
    }

    const getMatchColor = (score) => {
        if (score >= 80) return 'success';
        if (score >= 60) return 'info';
        if (score >= 40) return 'warning';
        return 'secondary';
    };

    return (
        <div className="space-y-3">
            {recommendations.map((job, idx) => (
                <div
                    key={job.id || idx}
                    className="p-4 bg-white rounded-xl border-2 border-[#e8e0dc] hover:border-[#789A99] hover:shadow-lg transition-all group"
                >
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-[#1e2a32] group-hover:text-[#789A99] transition-colors">
                                    {job.title}
                                </h4>
                                <Badge variant={getMatchColor(job.matchScore)} size="sm">
                                    {job.matchScore}% match
                                </Badge>
                            </div>
                            <p className="text-sm text-[#5a6b75]">{job.company} · {job.location}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD2C2] to-[#789A99] flex items-center justify-center text-white font-bold">
                            {job.company?.charAt(0) || 'J'}
                        </div>
                    </div>

                    {/* Match Reason */}
                    <p className="text-sm text-[#789A99] mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {job.reason}
                    </p>

                    {/* Matched Skills */}
                    {job.matchedSkills?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {job.matchedSkills.slice(0, 4).map(skill => (
                                <span key={skill} className="px-2 py-0.5 text-xs bg-[#4ade80]/10 text-[#16a34a] rounded-full">
                                    ✓ {skill}
                                </span>
                            ))}
                            {job.matchedSkills.length > 4 && (
                                <span className="text-xs text-[#8a9aa4]">+{job.matchedSkills.length - 4} more</span>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="primary" onClick={() => onApply?.(job)}>
                            Quick Apply
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => onViewJob?.(job)}>
                            View Details
                        </Button>
                        <span className="ml-auto text-xs text-[#8a9aa4]">{job.type} · {job.salary}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
