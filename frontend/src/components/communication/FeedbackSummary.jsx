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

    if (!summary) {
        return (
            <Card variant="default" padding="lg">
                <CardContent className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FFD2C2]/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-lg font-medium text-[#1e2a32]">No feedback yet</p>
                    <p className="text-sm text-[#8a9aa4] mt-1">Interview feedback will appear here</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Feedback Summary</h2>
                    <p className="text-sm text-[#5a6b75]">{candidate?.name} • {summary.totalFeedback} review(s)</p>
                </div>
            </div>

            {/* Overall Score Card */}
            <Card variant="gradient" padding="lg" className="bg-gradient-to-br from-[#789A99]/10 to-[#FFD2C2]/10">
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#5a6b75] mb-1">Overall Rating</p>
                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-bold text-[#1e2a32]">{summary.overall}</span>
                                <span className="text-lg text-[#8a9aa4]">/5</span>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                                <svg key={star} className={`w-6 h-6 ${parseFloat(summary.overall) >= star ? 'text-[#fbbf24] fill-[#fbbf24]' : 'text-[#e8e0dc]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card variant="default" padding="lg">
                <CardHeader><CardTitle>Rating Breakdown</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { key: 'technicalSkills', label: 'Technical Skills' },
                        { key: 'communication', label: 'Communication' },
                        { key: 'cultureFit', label: 'Culture Fit' },
                        { key: 'problemSolving', label: 'Problem Solving' },
                    ].map(cat => (
                        <div key={cat.key}>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-[#5a6b75]">{cat.label}</span>
                                <span className="text-sm font-medium text-[#1e2a32]">{summary[cat.key]}/5</span>
                            </div>
                            <div className="h-2 bg-[#e8e0dc] rounded-full overflow-hidden">
                                <div className="h-full bg-[#789A99] rounded-full transition-all" style={{ width: `${(summary[cat.key] / 5) * 100}%` }} />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Recommendations */}
            <Card variant="default" padding="lg">
                <CardHeader><CardTitle>Recommendations</CardTitle></CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(summary.recommendations).map(([rec, count]) => (
                            <Badge key={rec} variant={getRecommendationColor(rec)} size="md">
                                {rec.replace('_', ' ')} ({count})
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Individual Feedback */}
            <Card variant="default" padding="none">
                <CardHeader className="p-5 border-b-2 border-[#e8e0dc]"><CardTitle>Individual Reviews</CardTitle></CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-[#e8e0dc]">
                        {feedbackList.map((fb, idx) => (
                            <div key={idx} className="p-4 hover:bg-[#FFD2C2]/5 transition-colors cursor-pointer" onClick={() => onViewDetails?.(fb)}>
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#789A99]/10 flex items-center justify-center text-sm font-medium text-[#789A99]">
                                            {fb.reviewerName?.split(' ').map(n => n[0]).join('') || 'R'}
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#1e2a32]">{fb.reviewerName || 'Reviewer'}</p>
                                            <p className="text-xs text-[#8a9aa4]">{fb.date || 'Recently'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <svg key={s} className={`w-4 h-4 ${fb.overallRating >= s ? 'text-[#fbbf24] fill-[#fbbf24]' : 'text-[#e8e0dc]'}`} viewBox="0 0 24 24">
                                                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <Badge variant={getRecommendationColor(fb.recommendation)} size="sm">
                                            {fb.recommendation?.replace('_', ' ') || '—'}
                                        </Badge>
                                    </div>
                                </div>
                                {fb.strengths && <p className="text-sm text-[#5a6b75] line-clamp-2">{fb.strengths}</p>}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
