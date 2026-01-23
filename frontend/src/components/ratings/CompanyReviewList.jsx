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
        <div className={`space-y-5 ${className}`}>
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200 animate-fade-in">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#3E2723]">Filter:</span>
                    <div className="flex gap-1.5">
                        {[0, 5, 4, 3, 2, 1].map((rating) => (
                            <button
                                key={rating}
                                type="button"
                                onClick={() => setFilterRating(rating)}
                                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${filterRating === rating
                                    ? 'bg-gradient-to-r from-[#90353D] to-[#6B2830] text-white shadow-md'
                                    : 'bg-white text-[#4A3C35] border-2 border-gray-200 hover:border-[#90353D] hover:text-[#90353D]'
                                    }`}
                            >
                                {rating === 0 ? 'All' : `${rating}★`}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#3E2723]">Sort:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2.5 text-sm font-medium bg-white border-2 border-gray-200 rounded-xl text-[#3E2723] focus:border-[#90353D] focus:outline-none cursor-pointer hover:border-[#90353D]/50 transition-colors"
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
                <div className="text-center py-12 px-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border-2 border-dashed border-gray-200 animate-fade-in">
                    <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#90353D]/10 to-[#90353D]/20 flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#90353D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <p className="text-[#3E2723] font-bold text-lg">No reviews yet</p>
                    <p className="text-sm text-[#9B8B7E] mt-2">Be the first to share your experience!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedReviews.map((review, idx) => (
                        <div key={review.id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fade-in-up">
                            <ReviewCard
                                review={review}
                                onHelpful={() => onHelpful?.(review.id)}
                                onReport={() => onReport?.(review.id)}
                                formatDate={formatDate}
                            />
                        </div>
                    ))}
                </div>
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

    const getRatingGradient = (rating) => {
        if (rating >= 4) return 'from-emerald-50 to-green-50 border-emerald-200';
        if (rating >= 3) return 'from-amber-50 to-yellow-50 border-amber-200';
        return 'from-red-50 to-rose-50 border-red-200';
    };

    return (
        <div className={`p-5 bg-gradient-to-r ${getRatingGradient(review.overallRating)} rounded-2xl border-2 hover:shadow-lg transition-all duration-300`}>
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <StarRating value={review.overallRating} readOnly size="sm" />
                            <span className="text-sm font-bold text-[#3E2723] bg-white px-2.5 py-0.5 rounded-full shadow-sm">
                                {review.overallRating}/5
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {review.jobTitle && (
                                <span className="text-sm font-medium text-[#4A3C35]">{review.jobTitle}</span>
                            )}
                            <Badge variant="outline" size="sm" className="font-semibold">
                                {review.employmentStatus === 'current' ? '🟢 Current Employee' : '⚪ Former Employee'}
                            </Badge>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-medium text-[#9B8B7E] bg-white px-2 py-1 rounded-lg">{formatDate(review.createdAt)}</span>
                        {review.isAnonymous && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-[#9B8B7E]">
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
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${review.wouldRecommend
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                        }`}>
                        {review.wouldRecommend ? '👍 Recommends this company' : '👎 Does not recommend'}
                    </span>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/70 rounded-xl">
                        <h5 className="text-sm font-bold text-emerald-600 mb-2 flex items-center gap-2">
                            <span className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center text-xs">✓</span>
                            Pros
                        </h5>
                        <p className="text-sm text-[#4A3C35]">{review.pros}</p>
                    </div>
                    <div className="p-4 bg-white/70 rounded-xl">
                        <h5 className="text-sm font-bold text-red-600 mb-2 flex items-center gap-2">
                            <span className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center text-xs">✗</span>
                            Cons
                        </h5>
                        <p className="text-sm text-[#4A3C35]">{review.cons}</p>
                    </div>
                </div>

                {/* Advice (expandable) */}
                {review.advice && (
                    <>
                        {expanded && (
                            <div className="p-4 bg-gradient-to-r from-[#90353D]/5 to-white rounded-xl">
                                <h5 className="text-sm font-bold text-[#90353D] mb-2 flex items-center gap-2">
                                    <span className="w-6 h-6 bg-[#90353D]/10 rounded-lg flex items-center justify-center text-xs">💡</span>
                                    Advice to Management
                                </h5>
                                <p className="text-sm text-[#4A3C35]">{review.advice}</p>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => setExpanded(!expanded)}
                            className="text-sm font-semibold text-[#90353D] hover:underline flex items-center gap-1"
                        >
                            {expanded ? '↑ Show less' : '↓ Read more'}
                        </button>
                    </>
                )}

                {/* Category Ratings */}
                {review.categoryRatings && Object.keys(review.categoryRatings).length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-white/50">
                        {Object.entries(review.categoryRatings).map(([category, rating]) => (
                            <span
                                key={category}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl text-xs font-medium shadow-sm"
                            >
                                <span className="text-[#4A3C35] capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span className="font-bold text-amber-500">{rating}★</span>
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/50">
                    <button
                        type="button"
                        onClick={handleHelpful}
                        disabled={voted}
                        className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${voted
                            ? 'bg-[#90353D]/10 text-[#90353D]'
                            : 'bg-white text-[#9B8B7E] hover:text-[#90353D] hover:bg-[#90353D]/5 shadow-sm'
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
                        className="text-sm font-medium text-[#9B8B7E] hover:text-red-500 transition-colors"
                    >
                        🚩 Report
                    </button>
                </div>
            </div>
        </div>
    );
}

export { CompanyReviewList };
