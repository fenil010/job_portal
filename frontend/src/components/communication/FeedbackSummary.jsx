import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../ui';

export default function FeedbackSummary({ candidate, feedbackList = [], onViewDetails }) {
    const summary = useMemo(() => {
        if (!feedbackList.length) return null;

        const avg = (key) => {
            const values = feedbackList.map(f => f[key]).filter(v => v > 0);
            return values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : 0;
        };

        const recommendations = feedbackList.reduce((acc, f) => {
            if (f.recommendation) acc[f.recommendation] = (acc[f.recommendation] || 0) + 1;
            return acc;
        }, {});

        return {
            overall: avg('overallRating'),
            technicalSkills: avg('technicalSkills'),
            communication: avg('communication'),
            cultureFit: avg('cultureFit'),
            problemSolving: avg('problemSolving'),
            recommendations,
            totalFeedback: feedbackList.length,
        };
    }, [feedbackList]);

    const getRecommendationColor = (rec) => {
        const colors = { strong_yes: 'success', yes: 'success', maybe: 'warning', no: 'danger', strong_no: 'danger' };
        return colors[rec] || 'default';
    };

    const getRecommendationIcon = (rec) => {
        const icons = { strong_yes: '🎉', yes: '✅', maybe: '🤔', no: '❌', strong_no: '⛔' };
        return icons[rec] || '📋';
    };

    if (!summary) {
        return (
            <div className="p-12 text-center bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border-2 border-dashed border-gray-200 animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#FFD2C2]/30 to-[#789A99]/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p className="text-xl font-bold text-[#1e2a32]">No feedback yet</p>
                <p className="text-sm text-[#8a9aa4] mt-2">Interview feedback will appear here</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between animate-fade-in-up">
                <div>
                    <h2 className="text-2xl font-bold text-[#1e2a32]">Feedback Summary</h2>
                    <p className="text-sm text-[#5a6b75] mt-1">
                        <span className="font-semibold">{candidate?.name}</span> • {summary.totalFeedback} review(s)
                    </p>
                </div>
            </div>

            {/* Overall Score Card */}
            <div className="p-6 bg-gradient-to-br from-[#789A99]/15 via-white to-[#FFD2C2]/15 rounded-2xl border border-[#e8e0dc] shadow-sm animate-fade-in-up stagger-1">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-[#5a6b75] mb-2 font-medium">Overall Rating</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-bold text-[#1e2a32]">{summary.overall}</span>
                            <span className="text-xl text-[#8a9aa4] font-medium">/5</span>
                        </div>
                        <p className="text-xs text-[#789A99] mt-2 font-semibold">
                            Based on {summary.totalFeedback} reviews
                        </p>
                    </div>
                    <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map(star => (
                            <svg
                                key={star}
                                className={`w-8 h-8 transition-all duration-300 ${parseFloat(summary.overall) >= star ? 'text-amber-400 fill-amber-400 scale-110' : 'text-gray-200'}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="p-6 bg-white rounded-2xl border border-[#e8e0dc] shadow-sm animate-fade-in-up stagger-2">
                <h3 className="font-bold text-[#1e2a32] mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </span>
                    Rating Breakdown
                </h3>
                <div className="space-y-5">
                    {[
                        { key: 'technicalSkills', label: 'Technical Skills', icon: '💻' },
                        { key: 'communication', label: 'Communication', icon: '💬' },
                        { key: 'cultureFit', label: 'Culture Fit', icon: '🤝' },
                        { key: 'problemSolving', label: 'Problem Solving', icon: '🧩' },
                    ].map((cat, idx) => (
                        <div key={cat.key} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-[#5a6b75] flex items-center gap-2 font-medium">
                                    <span className="text-lg">{cat.icon}</span>
                                    {cat.label}
                                </span>
                                <span className="text-sm font-bold text-[#1e2a32] bg-[#789A99]/10 px-2.5 py-0.5 rounded-full">
                                    {summary[cat.key]}/5
                                </span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#789A99] to-[#5f7d7c] rounded-full transition-all duration-700"
                                    style={{ width: `${(summary[cat.key] / 5) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            <div className="p-6 bg-white rounded-2xl border border-[#e8e0dc] shadow-sm animate-fade-in-up stagger-3">
                <h3 className="font-bold text-[#1e2a32] mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    Hiring Recommendations
                </h3>
                <div className="flex flex-wrap gap-3">
                    {Object.entries(summary.recommendations).map(([rec, count]) => (
                        <div
                            key={rec}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200 hover:shadow-md transition-all"
                        >
                            <span className="text-xl">{getRecommendationIcon(rec)}</span>
                            <Badge variant={getRecommendationColor(rec)} size="md" className="font-semibold capitalize">
                                {rec.replace('_', ' ')}
                            </Badge>
                            <span className="text-sm font-bold text-[#1e2a32] bg-white px-2 py-0.5 rounded-full shadow-sm">
                                {count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Individual Feedback */}
            <div className="bg-white rounded-2xl border border-[#e8e0dc] shadow-sm overflow-hidden animate-fade-in-up stagger-4">
                <div className="p-5 border-b border-[#e8e0dc] bg-gradient-to-r from-gray-50 to-white">
                    <h3 className="font-bold text-[#1e2a32] flex items-center gap-2">
                        <span className="w-8 h-8 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center shadow-sm">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                        </span>
                        Individual Reviews
                    </h3>
                </div>
                <div className="divide-y divide-[#e8e0dc]">
                    {feedbackList.map((fb, idx) => (
                        <div
                            key={idx}
                            className="p-5 hover:bg-gradient-to-r hover:from-[#FFD2C2]/5 hover:to-white transition-all cursor-pointer group animate-fade-in-up"
                            style={{ animationDelay: `${idx * 100}ms` }}
                            onClick={() => onViewDetails?.(fb)}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-sm font-bold text-white shadow-sm group-hover:scale-110 transition-transform">
                                        {fb.reviewerName?.split(' ').map(n => n[0]).join('') || 'R'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#1e2a32] group-hover:text-[#789A99] transition-colors">
                                            {fb.reviewerName || 'Reviewer'}
                                        </p>
                                        <p className="text-xs text-[#8a9aa4] font-medium">{fb.date || 'Recently'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <svg
                                                key={s}
                                                className={`w-4 h-4 ${fb.overallRating >= s ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <Badge variant={getRecommendationColor(fb.recommendation)} size="sm" className="font-semibold capitalize">
                                        {fb.recommendation?.replace('_', ' ') || '—'}
                                    </Badge>
                                </div>
                            </div>
                            {fb.strengths && (
                                <p className="text-sm text-[#5a6b75] line-clamp-2 bg-gray-50 p-3 rounded-xl">
                                    {fb.strengths}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
