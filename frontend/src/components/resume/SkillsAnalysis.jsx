import { Badge } from '../ui';

export default function SkillsAnalysis({ analysis }) {
    const { skillMatch, competencies } = analysis || {};
    const { matched = [], missing = [], extra = [] } = skillMatch || {};

    const getCategoryIcon = (category) => {
        const icons = {
            programming: '💻',
            frontend: '🎨',
            backend: '⚙️',
            database: '🗄️',
            cloud: '☁️',
            tools: '🔧',
            softSkills: '🤝',
            dataScience: '📊',
            design: '✏️',
        };
        return icons[category] || '📌';
    };

    const getCategoryLabel = (category) => {
        const labels = {
            programming: 'Programming Languages',
            frontend: 'Frontend',
            backend: 'Backend',
            database: 'Databases',
            cloud: 'Cloud & DevOps',
            tools: 'Tools',
            softSkills: 'Soft Skills',
            dataScience: 'Data Science',
            design: 'Design',
        };
        return labels[category] || category;
    };

    return (
        <div className="space-y-5">
            {/* Matched vs Missing Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Matched Skills */}
                <div className="p-4 bg-[#4ade80]/10 rounded-xl border-2 border-[#4ade80]/30">
                    <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-[#16a34a]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="font-semibold text-[#16a34a]">Matched Skills ({matched.length})</h4>
                    </div>
                    {matched.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {matched.map((skill) => (
                                <Badge key={skill} variant="success" size="sm">{skill}</Badge>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-[#5a6b75]">No matching skills found</p>
                    )}
                </div>

                {/* Missing Skills */}
                <div className="p-4 bg-[#f87171]/10 rounded-xl border-2 border-[#f87171]/30">
                    <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-[#dc2626]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h4 className="font-semibold text-[#dc2626]">Missing Skills ({missing.length})</h4>
                    </div>
                    {missing.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {missing.map((skill) => (
                                <Badge key={skill} variant="danger" size="sm">{skill}</Badge>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-[#16a34a]">All required skills matched! 🎉</p>
                    )}
                </div>
            </div>

            {/* Extra Skills */}
            {extra.length > 0 && (
                <div className="p-4 bg-[#60a5fa]/10 rounded-xl border-2 border-[#60a5fa]/30">
                    <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-[#2563eb]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                        <h4 className="font-semibold text-[#2563eb]">Additional Skills ({extra.length})</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {extra.map((skill) => (
                            <Badge key={skill} variant="info" size="sm">{skill}</Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Competency Mapping */}
            {competencies && Object.keys(competencies).length > 0 && (
                <div>
                    <h4 className="font-semibold text-[#1e2a32] mb-3">Competency Areas</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(competencies).map(([category, data]) => (
                            <div
                                key={category}
                                className="p-3 bg-white rounded-xl border-2 border-[#e8e0dc] hover:border-[#789A99] transition-colors"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">{getCategoryIcon(category)}</span>
                                    <span className="font-medium text-[#1e2a32] text-sm">{getCategoryLabel(category)}</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {data.skills.slice(0, 5).map((skill) => (
                                        <span key={skill} className="text-xs px-2 py-0.5 bg-[#789A99]/10 text-[#5a6b75] rounded">
                                            {skill}
                                        </span>
                                    ))}
                                    {data.skills.length > 5 && (
                                        <span className="text-xs text-[#8a9aa4]">+{data.skills.length - 5} more</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
