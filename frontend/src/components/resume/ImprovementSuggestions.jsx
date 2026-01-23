import { Badge } from '../ui';

export default function ImprovementSuggestions({ suggestions = [], strengths = [], weaknesses = [] }) {
    const getCategoryIcon = (category) => {
        const icons = {
            skills: '🎯',
            experience: '💼',
            education: '🎓',
            keywords: '🔑',
            ats: '🤖',
            format: '📄',
        };
        return icons[category] || '💡';
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

    const getTypeLabel = (type) => {
        const labels = {
            'quick-fix': 'Quick Fix',
            'content': 'Content',
            'structure': 'Structure',
            'polish': 'Polish',
        };
        return labels[type] || type;
    };

    return (
        <div className="space-y-6">
            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                {strengths.length > 0 && (
                    <div className="p-5 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl border border-emerald-200/50 shadow-sm animate-fade-in-up stagger-1">
                        <h4 className="font-bold text-emerald-700 flex items-center gap-2.5 mb-4 text-base">
                            <span className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            Strengths
                        </h4>
                        <ul className="space-y-2.5">
                            {strengths.map((strength, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm text-emerald-700 bg-white/60 p-2.5 rounded-xl">
                                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium">{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Weaknesses */}
                {weaknesses.length > 0 && (
                    <div className="p-5 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl border border-amber-200/50 shadow-sm animate-fade-in-up stagger-2">
                        <h4 className="font-bold text-amber-700 flex items-center gap-2.5 mb-4 text-base">
                            <span className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01" />
                                </svg>
                            </span>
                            Areas to Improve
                        </h4>
                        <ul className="space-y-2.5">
                            {weaknesses.map((weakness, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm text-amber-700 bg-white/60 p-2.5 rounded-xl">
                                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                                    </svg>
                                    <span className="font-medium">{weakness}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Improvement Suggestions */}
            {suggestions.length > 0 && (
                <div className="animate-fade-in-up stagger-3">
                    <h4 className="font-bold text-[#1e2a32] mb-4 flex items-center gap-2.5 text-base">
                        <span className="w-8 h-8 bg-gradient-to-br from-[#789A99] to-[#5f7d7c] rounded-xl flex items-center justify-center shadow-sm">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </span>
                        Recommendations
                    </h4>
                    <div className="space-y-3">
                        {suggestions.map((suggestion, idx) => (
                            <div
                                key={idx}
                                className={`p-4 bg-gradient-to-r ${getPriorityGradient(suggestion.priority)} rounded-2xl border-2 transition-all duration-300 group hover:shadow-md cursor-pointer animate-fade-in-up`}
                                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        {getCategoryIcon(suggestion.category)}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <h5 className="font-bold text-[#1e2a32] text-base">{suggestion.title}</h5>
                                            <Badge variant={getPriorityColor(suggestion.priority)} size="sm" className="font-semibold uppercase tracking-wide text-xs">
                                                {suggestion.priority}
                                            </Badge>
                                            <Badge variant="secondary" size="sm" className="bg-white/80 font-medium">
                                                {getTypeLabel(suggestion.type)}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-[#5a6b75] mb-3 leading-relaxed">{suggestion.description}</p>
                                        <div className="flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-lg w-fit">
                                            <svg className="w-4 h-4 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                            <span className="text-xs font-semibold text-[#789A99]">{suggestion.impact}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty state */}
            {suggestions.length === 0 && strengths.length === 0 && weaknesses.length === 0 && (
                <div className="p-8 text-center bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 font-medium">No recommendations available</p>
                    <p className="text-gray-400 text-sm mt-1">Upload your resume to get personalized suggestions</p>
                </div>
            )}
        </div>
    );
}
