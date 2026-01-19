import { Badge, Button } from '../ui';

export default function ProfileCompletionCard({
    completion,
    onFieldClick,
    compact = false
}) {
    const { percentage = 0, requiredMissing = [], optionalMissing = [] } = completion || {};

    const getStatusColor = (pct) => {
        if (pct >= 100) return { bg: 'bg-[#4ade80]', text: 'text-[#16a34a]' };
        if (pct >= 75) return { bg: 'bg-[#60a5fa]', text: 'text-[#2563eb]' };
        if (pct >= 50) return { bg: 'bg-[#fbbf24]', text: 'text-[#d97706]' };
        return { bg: 'bg-[#f87171]', text: 'text-[#dc2626]' };
    };

    const getFieldLabel = (field) => {
        const labels = {
            name: 'Full Name',
            email: 'Email Address',
            phone: 'Phone Number',
            location: 'Location',
            bio: 'Bio / Summary',
            skills: 'Skills',
            experience: 'Work Experience',
            education: 'Education',
            resume: 'Resume',
            linkedin: 'LinkedIn Profile',
            portfolio: 'Portfolio URL',
            company: 'Company Name',
            position: 'Job Title',
            companyWebsite: 'Company Website',
            companySize: 'Company Size',
            industry: 'Industry',
            companyLogo: 'Company Logo',
            companyDescription: 'Company Description',
        };
        return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
    };

    const colors = getStatusColor(percentage);
    const circumference = 2 * Math.PI * 36;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    if (compact) {
        return (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#FFD2C2]/20 to-white rounded-xl">
                <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="36" stroke="#e8e0dc" strokeWidth="6" fill="none" />
                        <circle
                            cx="40" cy="40" r="36"
                            stroke="#789A99"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                        />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#1e2a32]">
                        {percentage}%
                    </span>
                </div>
                <div>
                    <p className="font-semibold text-[#1e2a32] text-sm">Profile Completion</p>
                    {requiredMissing.length > 0 && (
                        <p className="text-xs text-[#f87171]">{requiredMissing.length} required fields missing</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="p-5 bg-white rounded-2xl border-2 border-[#e8e0dc]">
            {/* Header with Circle */}
            <div className="flex items-center gap-4 mb-4">
                <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="36" stroke="#e8e0dc" strokeWidth="6" fill="none" />
                        <circle
                            cx="40" cy="40" r="36"
                            stroke="url(#completionGradient)"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-1000"
                        />
                        <defs>
                            <linearGradient id="completionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#789A99" />
                                <stop offset="100%" stopColor="#4ade80" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#1e2a32]">
                        {percentage}%
                    </span>
                </div>
                <div>
                    <h4 className="font-semibold text-[#1e2a32]">Profile Completion</h4>
                    <p className="text-sm text-[#5a6b75]">
                        {percentage >= 100
                            ? 'Your profile is complete!'
                            : `Complete your profile to stand out`}
                    </p>
                </div>
            </div>

            {/* Missing Fields */}
            {(requiredMissing.length > 0 || optionalMissing.length > 0) && (
                <div className="space-y-3">
                    {/* Required Fields */}
                    {requiredMissing.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-[#f87171] mb-2">Required Fields</p>
                            <div className="flex flex-wrap gap-2">
                                {requiredMissing.map((field) => (
                                    <button
                                        key={field}
                                        onClick={() => onFieldClick?.(field)}
                                        className="px-3 py-1.5 text-xs font-medium bg-[#f87171]/10 text-[#dc2626] rounded-lg hover:bg-[#f87171]/20 transition-colors"
                                    >
                                        + {getFieldLabel(field)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Optional Fields */}
                    {optionalMissing.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-[#5a6b75] mb-2">Recommended Fields</p>
                            <div className="flex flex-wrap gap-2">
                                {optionalMissing.slice(0, 4).map((field) => (
                                    <button
                                        key={field}
                                        onClick={() => onFieldClick?.(field)}
                                        className="px-3 py-1.5 text-xs font-medium bg-[#e8e0dc] text-[#5a6b75] rounded-lg hover:bg-[#FFD2C2]/30 transition-colors"
                                    >
                                        + {getFieldLabel(field)}
                                    </button>
                                ))}
                                {optionalMissing.length > 4 && (
                                    <span className="px-3 py-1.5 text-xs text-[#8a9aa4]">
                                        +{optionalMissing.length - 4} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
