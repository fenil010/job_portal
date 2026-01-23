import { Card, Badge } from '../ui';
import StarRating from './StarRating';
import { RECOMMENDATION_OPTIONS, FEEDBACK_CRITERIA } from './CandidateFeedbackForm';

export default function FeedbackHistory({
    feedbackEntries = [],
    candidateName = 'Candidate',
    showPrivateNotes = true,
    className = '',
}) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getRecommendationInfo = (value) => {
        return RECOMMENDATION_OPTIONS.find((r) => r.value === value) || RECOMMENDATION_OPTIONS[2];
    };

    // Calculate aggregate stats
    const aggregateStats = () => {
        if (feedbackEntries.length === 0) return null;

        const criteriaAverages = {};
        FEEDBACK_CRITERIA.forEach((c) => {
            const ratings = feedbackEntries
                .map((f) => f.criteriaRatings?.[c.id])
                .filter(Boolean);
            if (ratings.length > 0) {
                criteriaAverages[c.id] = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
            }
        });

        const recommendations = feedbackEntries.map((f) => f.recommendation).filter(Boolean);
        const positiveCount = recommendations.filter((r) => r === 'strong_yes' || r === 'yes').length;
        const positivePercentage = Math.round((positiveCount / recommendations.length) * 100);

        return { criteriaAverages, positivePercentage };
    };

    const stats = aggregateStats();

    if (feedbackEntries.length === 0) {
        return (
            <Card padding="lg" className={`text-center ${className}`}>
                <div className="py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#90353D]/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#90353D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <p className="text-[#3E2723] font-medium">No feedback yet</p>
                    <p className="text-sm text-[#9B8B7E] mt-1">Feedback will appear here after interviews</p>
                </div>
            </Card>
        );
    }

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Aggregate Summary */}
            {stats && (
                <Card variant="elevated" padding="md" className="bg-gradient-to-r from-[#90353D]/5 to-[#6B2830]/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="font-semibold text-[#3E2723]">{candidateName}</h4>
                            <p className="text-sm text-[#4A3C35]">{feedbackEntries.length} feedback entries</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-[#90353D]">
                                    {stats.positivePercentage}%
                                </div>
                                <p className="text-xs text-[#9B8B7E]">Positive</p>
                            </div>
                            {Object.entries(stats.criteriaAverages).slice(0, 3).map(([id, avg]) => {
                                const criterion = FEEDBACK_CRITERIA.find((c) => c.id === id);
                                return (
                                    <div key={id} className="text-center">
                                        <div className="text-lg font-semibold text-[#3E2723]">
                                            {criterion?.icon} {avg}
                                        </div>
                                        <p className="text-xs text-[#9B8B7E]">{criterion?.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            )}

            {/* Timeline */}
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#90353D]/20" />

                {/* Entries */}
                <div className="space-y-4">
                    {feedbackEntries.map((entry, index) => {
                        const recInfo = getRecommendationInfo(entry.recommendation);

                        return (
                            <div key={entry.id || index} className="relative pl-10">
                                {/* Timeline dot */}
                                <div className={`absolute left-2 top-6 w-5 h-5 rounded-full border-2 border-white ${recInfo.color}`} />

                                <Card padding="md" className="hover:shadow-lg transition-shadow">
                                    <div className="space-y-4">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        {entry.stage}
                                                    </Badge>
                                                    <Badge
                                                        variant="primary"
                                                        size="sm"
                                                        className={`${recInfo.color} !border-0`}
                                                    >
                                                        {recInfo.icon} {recInfo.label}
                                                    </Badge>
                                                </div>
                                                {entry.reviewerName && (
                                                    <p className="text-sm text-[#4A3C35] mt-1">
                                                        by {entry.reviewerName}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-xs text-[#9B8B7E]">
                                                {formatDate(entry.createdAt)}
                                            </span>
                                        </div>

                                        {/* Criteria Ratings */}
                                        {entry.criteriaRatings && Object.keys(entry.criteriaRatings).length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {Object.entries(entry.criteriaRatings).map(([id, rating]) => {
                                                    const criterion = FEEDBACK_CRITERIA.find((c) => c.id === id);
                                                    return (
                                                        <span
                                                            key={id}
                                                            className="inline-flex items-center gap-1 px-2 py-1 bg-[#FAF6F0] rounded-lg text-xs"
                                                        >
                                                            <span>{criterion?.icon}</span>
                                                            <span className="text-[#4A3C35]">{criterion?.name}</span>
                                                            <span className="font-medium text-[#90353D]">{rating}★</span>
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {entry.strengths && (
                                                <div>
                                                    <h5 className="text-sm font-semibold text-[#16a34a] mb-1">Strengths</h5>
                                                    <p className="text-sm text-[#4A3C35]">{entry.strengths}</p>
                                                </div>
                                            )}
                                            {entry.weaknesses && (
                                                <div>
                                                    <h5 className="text-sm font-semibold text-[#C45B5B] mb-1">Concerns</h5>
                                                    <p className="text-sm text-[#4A3C35]">{entry.weaknesses}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Next Steps */}
                                        {entry.nextSteps && (
                                            <div className="flex items-center gap-2 p-2 bg-[#FAF6F0] rounded-lg">
                                                <svg className="w-4 h-4 text-[#90353D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                                <span className="text-sm text-[#4A3C35]">{entry.nextSteps}</span>
                                            </div>
                                        )}

                                        {/* Private Notes */}
                                        {showPrivateNotes && entry.notes && (
                                            <div className="p-3 bg-[#90353D]/5 rounded-xl border border-dashed border-[#90353D]/20">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <svg className="w-4 h-4 text-[#9B8B7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                    <span className="text-xs font-medium text-[#9B8B7E]">Private Notes</span>
                                                </div>
                                                <p className="text-sm text-[#4A3C35]">{entry.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export { FeedbackHistory };
