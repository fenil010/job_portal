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
        <div className="space-y-5">
            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                {strengths.length > 0 && (
                    <div className="p-4 bg-gradient-to-br from-[#4ade80]/10 to-[#4ade80]/5 rounded-xl">
                        <h4 className="font-semibold text-[#16a34a] flex items-center gap-2 mb-3">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            Strengths
                        </h4>
                        <ul className="space-y-2">
                            {strengths.map((strength, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-[#16a34a]">
                                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {strength}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Weaknesses */}
                {weaknesses.length > 0 && (
                    <div className="p-4 bg-gradient-to-br from-[#fbbf24]/10 to-[#fbbf24]/5 rounded-xl">
                        <h4 className="font-semibold text-[#d97706] flex items-center gap-2 mb-3">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Areas to Improve
                        </h4>
                        <ul className="space-y-2">
                            {weaknesses.map((weakness, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-[#d97706]">
                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                                    </svg>
                                    {weakness}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Improvement Suggestions */}
            {suggestions.length > 0 && (
                <div>
                    <h4 className="font-semibold text-[#1e2a32] mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Recommendations
                    </h4>
                    <div className="space-y-3">
                        {suggestions.map((suggestion, idx) => (
                            <div
                                key={idx}
                                className="p-4 bg-white rounded-xl border-2 border-[#e8e0dc] hover:border-[#FFD2C2] transition-all group"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{getCategoryIcon(suggestion.category)}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h5 className="font-semibold text-[#1e2a32]">{suggestion.title}</h5>
                                            <Badge variant={getPriorityColor(suggestion.priority)} size="sm">
                                                {suggestion.priority}
                                            </Badge>
                                            <Badge variant="secondary" size="sm">{getTypeLabel(suggestion.type)}</Badge>
                                        </div>
                                        <p className="text-sm text-[#5a6b75] mb-2">{suggestion.description}</p>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                            <span className="text-xs font-medium text-[#789A99]">{suggestion.impact}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
