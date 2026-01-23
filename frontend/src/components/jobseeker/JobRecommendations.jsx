import { Badge, Button } from '../ui';

export default function JobRecommendations({ recommendations = [], onViewJob, onApply }) {
    if (recommendations.length === 0) {
        return (
            <div className="text-center py-12 px-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#789A99]/20 to-[#FFD2C2]/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <p className="text-[#1e2a32] font-bold text-lg">Complete your profile</p>
                <p className="text-sm text-[#8a9aa4] mt-1">to get personalized job recommendations</p>
            </div>
        );
    }

    const getMatchColor = (score) => {
        if (score >= 80) return 'success';
        if (score >= 60) return 'info';
        if (score >= 40) return 'warning';
        return 'secondary';
    };

    const getMatchGradient = (score) => {
        if (score >= 80) return 'from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-300';
        if (score >= 60) return 'from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300';
        if (score >= 40) return 'from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-300';
        return 'from-slate-50 to-gray-50 border-slate-200 hover:border-slate-300';
    };

    return (
        <div className="space-y-4">
            {recommendations.map((job, idx) => (
                <div
                    key={job.id || idx}
                    className={`p-5 bg-gradient-to-r ${getMatchGradient(job.matchScore)} rounded-2xl border-2 transition-all duration-300 hover:shadow-lg group cursor-pointer animate-fade-in-up`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                    onClick={() => onViewJob?.(job)}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h4 className="font-bold text-[#1e2a32] text-lg group-hover:text-[#789A99] transition-colors">
                                    {job.title}
                                </h4>
                                <Badge variant={getMatchColor(job.matchScore)} size="sm" className="font-bold">
                                    {job.matchScore}% match
                                </Badge>
                            </div>
                            <p className="text-sm text-[#5a6b75] font-medium">{job.company} · {job.location}</p>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 ml-3">
                            {job.company?.charAt(0) || 'J'}
                        </div>
                    </div>

                    {/* Match Reason */}
                    <div className="flex items-center gap-2 mb-4 bg-white/70 px-4 py-2.5 rounded-xl">
                        <svg className="w-5 h-5 text-[#789A99] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm text-[#5a6b75] font-medium">{job.reason}</span>
                    </div>

                    {/* Matched Skills */}
                    {job.matchedSkills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {job.matchedSkills.slice(0, 4).map(skill => (
                                <span key={skill} className="px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {skill}
                                </span>
                            ))}
                            {job.matchedSkills.length > 4 && (
                                <span className="px-3 py-1.5 text-xs font-medium text-[#8a9aa4] bg-white rounded-full">
                                    +{job.matchedSkills.length - 4} more
                                </span>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/50">
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={(e) => { e.stopPropagation(); onApply?.(job); }}
                            className="shadow-sm"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Quick Apply
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => { e.stopPropagation(); onViewJob?.(job); }}
                        >
                            View Details
                        </Button>
                        <div className="ml-auto flex items-center gap-2 text-xs text-[#8a9aa4] font-medium bg-white/60 px-3 py-1.5 rounded-lg">
                            <span className="px-2 py-0.5 bg-[#789A99]/10 text-[#789A99] rounded-full">{job.type}</span>
                            <span>·</span>
                            <span className="font-semibold text-[#1e2a32]">{job.salary}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
