import { Badge, Button, Checkbox } from '../ui';

export default function ApplicantCard({
    applicant,
    isSelected = false,
    onSelect,
    onView,
    onShortlist,
    onReject,
    onSchedule,
    compact = false,
}) {
    const getStatusColor = (status) => {
        const colors = {
            'New': 'info',
            'Screening': 'warning',
            'Interview': 'primary',
            'Offer': 'success',
            'Hired': 'success',
            'Rejected': 'danger',
        };
        return colors[status] || 'default';
    };

    const getMatchColor = (score) => {
        if (score >= 90) return 'text-[#4ade80]';
        if (score >= 75) return 'text-[#789A99]';
        if (score >= 50) return 'text-[#fbbf24]';
        return 'text-[#f87171]';
    };

    if (compact) {
        return (
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-[#e8e0dc] hover:border-[#789A99] hover:shadow-md transition-all duration-300 cursor-pointer group">
                {onSelect && (
                    <Checkbox
                        checked={isSelected}
                        onChange={() => onSelect(applicant.id)}
                        size="sm"
                    />
                )}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-white font-semibold text-sm">
                    {applicant.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1e2a32] truncate">{applicant.name}</p>
                    <p className="text-xs text-[#8a9aa4] truncate">{applicant.title || applicant.role}</p>
                </div>
                <span className={`text-sm font-bold ${getMatchColor(applicant.matchScore)}`}>
                    {applicant.matchScore}%
                </span>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border-2 border-[#e8e0dc] hover:border-[#789A99] hover:shadow-lg transition-all duration-300 overflow-hidden group">
            {/* Header */}
            <div className="p-4 border-b border-[#e8e0dc]">
                <div className="flex items-start gap-3">
                    {onSelect && (
                        <Checkbox
                            checked={isSelected}
                            onChange={() => onSelect(applicant.id)}
                        />
                    )}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-white font-semibold shadow-md group-hover:scale-105 transition-transform">
                        {applicant.avatar || applicant.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-[#1e2a32] truncate">{applicant.name}</h4>
                            <Badge variant={getStatusColor(applicant.status)} size="sm">
                                {applicant.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-[#5a6b75] truncate">{applicant.title || applicant.role}</p>
                        <p className="text-xs text-[#8a9aa4]">{applicant.location}</p>
                    </div>
                    <div className="text-right">
                        <div className={`text-xl font-bold ${getMatchColor(applicant.matchScore)}`}>
                            {applicant.matchScore}%
                        </div>
                        <p className="text-xs text-[#8a9aa4]">Match</p>
                    </div>
                </div>
            </div>

            {/* Skills */}
            {applicant.skills && applicant.skills.length > 0 && (
                <div className="px-4 py-3 border-b border-[#e8e0dc]">
                    <div className="flex flex-wrap gap-1.5">
                        {applicant.skills.slice(0, 5).map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-0.5 text-xs bg-[#789A99]/10 text-[#5f7d7c] rounded-md font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                        {applicant.skills.length > 5 && (
                            <span className="px-2 py-0.5 text-xs bg-[#e8e0dc] text-[#8a9aa4] rounded-md">
                                +{applicant.skills.length - 5} more
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Quick Info */}
            <div className="px-4 py-3 grid grid-cols-3 gap-2 text-center border-b border-[#e8e0dc] bg-[#fdf9f7]">
                <div>
                    <p className="text-sm font-semibold text-[#1e2a32]">{applicant.experience || '0'}y</p>
                    <p className="text-xs text-[#8a9aa4]">Exp.</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-[#1e2a32]">{applicant.education || 'N/A'}</p>
                    <p className="text-xs text-[#8a9aa4]">Education</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-[#1e2a32]">{applicant.appliedDate || 'N/A'}</p>
                    <p className="text-xs text-[#8a9aa4]">Applied</p>
                </div>
            </div>

            {/* Actions */}
            <div className="p-3 flex items-center gap-2">
                {onView && (
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(applicant)}>
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                    </Button>
                )}
                {onSchedule && (
                    <Button variant="ghost" size="sm" onClick={() => onSchedule(applicant)} title="Schedule Interview">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </Button>
                )}
                {onShortlist && (
                    <Button variant="ghost" size="sm" onClick={() => onShortlist(applicant)} title="Shortlist">
                        <svg className="w-4 h-4 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </Button>
                )}
                {onReject && (
                    <Button variant="ghost" size="sm" onClick={() => onReject(applicant)} title="Reject">
                        <svg className="w-4 h-4 text-[#f87171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Button>
                )}
            </div>
        </div>
    );
}
