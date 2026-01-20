import { useState } from 'react';
import { Card, Button, Badge } from '../ui';
import StarRating from './StarRating';

export default function CompanyReviewList({
    reviews = [],
    onHelpful,
    onReport,
    className = '',
}) {
    const [sortBy, setSortBy] = useState('recent');
    const [filterRating, setFilterRating] = useState(0);

    const sortedReviews = [...reviews]
        .filter((r) => filterRating === 0 || r.overallRating === filterRating)
        .sort((a, b) => {
            if (sortBy === 'recent') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            if (sortBy === 'highest') {
                return b.overallRating - a.overallRating;
            }
            if (sortBy === 'lowest') {
                return a.overallRating - b.overallRating;
            }
            if (sortBy === 'helpful') {
                return (b.helpfulCount || 0) - (a.helpfulCount || 0);
            }
            return 0;
        });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#9B8B7E]">Filter:</span>
                    <div className="flex gap-1">
                        {[0, 5, 4, 3, 2, 1].map((rating) => (
                            <button
                                key={rating}
                                type="button"
                                onClick={() => setFilterRating(rating)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${filterRating === rating
                                        ? 'bg-[#90353D] text-[#F4EDE3]'
                                        : 'bg-[#FAF6F0] text-[#4A3C35] hover:bg-[#90353D]/10'
                                    }`}
                            >
                                {rating === 0 ? 'All' : `${rating}★`}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#9B8B7E]">Sort:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 text-sm bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl text-[#3E2723] focus:border-[#90353D] focus:outline-none"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="helpful">Most Helpful</option>
                        <option value="highest">Highest Rated</option>
                        <option value="lowest">Lowest Rated</option>
                    </select>
                </div>
            </div>

            {/* Reviews List */}
            {sortedReviews.length === 0 ? (
                <Card padding="lg" className="text-center">
                    <div className="py-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[#90353D]/10 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#90353D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-[#3E2723] font-medium">No reviews yet</p>
                        <p className="text-sm text-[#9B8B7E] mt-1">Be the first to share your experience!</p>
                    </div>
                </Card>
            ) : (
                sortedReviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        onHelpful={() => onHelpful?.(review.id)}
                        onReport={() => onReport?.(review.id)}
                        formatDate={formatDate}
                    />
                ))
            )}
        </div>
    );
}

function ReviewCard({ review, onHelpful, onReport, formatDate }) {
    const [expanded, setExpanded] = useState(false);
    const [voted, setVoted] = useState(false);

    const handleHelpful = () => {
        if (!voted) {
            setVoted(true);
            onHelpful?.();
        }
    };

    return (
        <Card padding="md" className="hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <StarRating value={review.overallRating} readOnly size="sm" />
                            <span className="text-sm font-semibold text-[#3E2723]">
                                {review.overallRating}/5
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            {review.jobTitle && (
                                <span className="text-sm text-[#4A3C35]">{review.jobTitle}</span>
                            )}
                            <Badge variant="outline" size="sm">
                                {review.employmentStatus === 'current' ? 'Current Employee' : 'Former Employee'}
                            </Badge>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-[#9B8B7E]">{formatDate(review.createdAt)}</span>
                        {review.isAnonymous && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-[#9B8B7E]">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Anonymous
                            </div>
                        )}
                    </div>
                </div>

                {/* Recommendation */}
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${review.wouldRecommend
                            ? 'bg-[#4ade80]/15 text-[#16a34a]'
                            : 'bg-[#C45B5B]/15 text-[#C45B5B]'
                        }`}>
                        {review.wouldRecommend ? '👍 Recommends' : '👎 Does not recommend'}
                    </span>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h5 className="text-sm font-semibold text-[#16a34a] mb-1">Pros</h5>
                        <p className="text-sm text-[#4A3C35]">{review.pros}</p>
                    </div>
                    <div>
                        <h5 className="text-sm font-semibold text-[#C45B5B] mb-1">Cons</h5>
                        <p className="text-sm text-[#4A3C35]">{review.cons}</p>
                    </div>
                </div>

                {/* Advice (expandable) */}
                {review.advice && (
                    <>
                        {expanded && (
                            <div>
                                <h5 className="text-sm font-semibold text-[#90353D] mb-1">Advice to Management</h5>
                                <p className="text-sm text-[#4A3C35]">{review.advice}</p>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => setExpanded(!expanded)}
                            className="text-sm text-[#90353D] hover:underline"
                        >
                            {expanded ? 'Show less' : 'Read more'}
                        </button>
                    </>
                )}

                {/* Category Ratings */}
                {review.categoryRatings && Object.keys(review.categoryRatings).length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-[#90353D]/10">
                        {Object.entries(review.categoryRatings).map(([category, rating]) => (
                            <span
                                key={category}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-[#FAF6F0] rounded-lg text-xs"
                            >
                                <span className="text-[#4A3C35] capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span className="font-medium text-[#90353D]">{rating}★</span>
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-[#90353D]/10">
                    <button
                        type="button"
                        onClick={handleHelpful}
                        disabled={voted}
                        className={`flex items-center gap-2 text-sm transition-colors ${voted
                                ? 'text-[#90353D] font-medium'
                                : 'text-[#9B8B7E] hover:text-[#90353D]'
                            }`}
                    >
                        <svg className="w-4 h-4" fill={voted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Helpful ({(review.helpfulCount || 0) + (voted ? 1 : 0)})
                    </button>
                    <button
                        type="button"
                        onClick={onReport}
                        className="text-sm text-[#9B8B7E] hover:text-[#C45B5B] transition-colors"
                    >
                        Report
                    </button>
                </div>
            </div>
        </Card>
    );
}

export { CompanyReviewList };
