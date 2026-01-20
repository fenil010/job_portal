import { Badge, Button } from '../ui';

export default function JobCard({ job, onViewDetails, onApply, onSave, isSaved = false }) {
    const formatSalary = (min, max) => {
        const format = (num) => `$${(num / 1000).toFixed(0)}k`;
        return `${format(min)} - ${format(max)}`;
    };

    return (
        <div className="group p-5 bg-[#FAF6F0] rounded-2xl border-2 border-[#90353D]/20 hover:border-[#90353D]/40 hover:shadow-xl hover:shadow-[#90353D]/10 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#90353D]/10 to-[#6B2830]/10 flex items-center justify-center text-[#90353D] font-bold text-xl ring-2 ring-[#90353D]/20">
                        {job.company?.charAt(0) || 'C'}
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#3E2723] text-lg group-hover:text-[#90353D] transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-sm text-[#4A3C35]">{job.company}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {job.matchPercentage && (
                        <div className="flex items-center gap-1 px-2.5 py-1 bg-[#90353D] text-[#F4EDE3] rounded-full text-xs font-semibold">
                            {/* Sparkle icon for AI match */}
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            {job.matchPercentage}% Match
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => onSave?.(job)}
                        className={`p-2 rounded-xl transition-all duration-300 ${isSaved
                            ? 'text-[#90353D] bg-[#90353D]/15'
                            : 'text-[#9B8B7E] hover:text-[#90353D] hover:bg-[#90353D]/10'
                            }`}
                        aria-label={isSaved ? 'Remove from saved' : 'Save job'}
                    >
                        <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-[#6B5B52]">
                <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatSalary(job.salaryMin, job.salaryMax)}
                </span>
                <Badge variant="outline" size="sm">{job.jobType}</Badge>
                {job.isRemote && <Badge variant="primary" size="sm">Remote</Badge>}
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
                {job.skills?.slice(0, 4).map((skill, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium bg-[#90353D]/10 text-[#90353D] rounded-lg"
                    >
                        {skill}
                    </span>
                ))}
                {job.skills?.length > 4 && (
                    <span className="px-3 py-1 text-xs font-medium bg-[#F4EDE3] text-[#9B8B7E] rounded-lg">
                        +{job.skills.length - 4} more
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t-2 border-[#90353D]/15">
                <span className="text-xs text-[#9B8B7E]">Posted {job.postedAt || '2 days ago'}</span>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onViewDetails?.(job)}>
                        View Details
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => onApply?.(job)}>
                        Apply Now
                    </Button>
                </div>
            </div>
        </div>
    );
}
