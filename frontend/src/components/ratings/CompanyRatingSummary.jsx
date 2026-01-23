import { Card, Badge } from '../ui';
import StarRating from './StarRating';
import { REVIEW_CATEGORIES } from './CompanyReviewForm';

export default function CompanyRatingSummary({
    companyName = 'Company',
    overallRating = 0,
    totalReviews = 0,
    categoryAverages = {},
    recommendPercentage = 0,
    className = '',
}) {
    const getOverallLabel = () => {
        if (overallRating >= 4.5) return 'Excellent';
        if (overallRating >= 4) return 'Very Good';
        if (overallRating >= 3.5) return 'Good';
        if (overallRating >= 3) return 'Average';
        if (overallRating >= 2) return 'Below Average';
        return 'Poor';
    };

    return (
        <Card variant="elevated" padding="md" className={className}>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Overall Rating */}
                <div className="flex flex-col items-center md:items-start md:border-r-2 md:border-[#90353D]/20 md:pr-6">
                    <div className="text-5xl font-bold text-[#90353D]">
                        {overallRating.toFixed(1)}
                    </div>
                    <StarRating value={overallRating} readOnly size="md" allowHalf />
                    <p className="text-sm text-[#4A3C35] mt-2">
                        Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                    </p>
                    <Badge variant="primary" className="mt-2">
                        {getOverallLabel()}
                    </Badge>
                </div>

                {/* Category Breakdown */}
                <div className="flex-1 space-y-3">
                    <h4 className="font-semibold text-[#3E2723] mb-4">Rating Breakdown</h4>
                    {REVIEW_CATEGORIES.map((category) => {
                        const avg = categoryAverages[category.id] || 0;
                        const percentage = (avg / 5) * 100;

                        return (
                            <div key={category.id} className="flex items-center gap-3">
                                <span className="text-lg">{category.icon}</span>
                                <span className="w-32 text-sm text-[#4A3C35]">{category.name}</span>
                                <div className="flex-1 h-2 bg-[#90353D]/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#90353D] rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="w-8 text-sm font-medium text-[#90353D] text-right">
                                    {avg.toFixed(1)}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Recommendation */}
                <div className="flex flex-col items-center justify-center md:border-l-2 md:border-[#90353D]/20 md:pl-6">
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle
                                cx="18"
                                cy="18"
                                r="15.9"
                                fill="none"
                                stroke="#90353D"
                                strokeOpacity="0.15"
                                strokeWidth="3"
                            />
                            <circle
                                cx="18"
                                cy="18"
                                r="15.9"
                                fill="none"
                                stroke={recommendPercentage >= 50 ? '#4ade80' : '#C45B5B'}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray={`${recommendPercentage}, 100`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-[#3E2723]">
                                {Math.round(recommendPercentage)}%
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A3C35] mt-2 text-center">
                        Would recommend<br />to a friend
                    </p>
                </div>
            </div>
        </Card>
    );
}

export { CompanyRatingSummary };
