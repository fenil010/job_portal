import { useState } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '../ui';
import StarRating from './StarRating';

const REVIEW_CATEGORIES = [
    { id: 'workLife', name: 'Work-Life Balance', icon: '⚖️' },
    { id: 'compensation', name: 'Compensation & Benefits', icon: '💰' },
    { id: 'career', name: 'Career Growth', icon: '📈' },
    { id: 'management', name: 'Management', icon: '👔' },
    { id: 'culture', name: 'Company Culture', icon: '🏢' },
];

export default function CompanyReviewForm({
    companyName = 'Company',
    onSubmit,
    onCancel,
    className = '',
}) {
    const [overallRating, setOverallRating] = useState(0);
    const [categoryRatings, setCategoryRatings] = useState({});
    const [pros, setPros] = useState('');
    const [cons, setCons] = useState('');
    const [advice, setAdvice] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [wouldRecommend, setWouldRecommend] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState('current');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleCategoryRating = (categoryId, rating) => {
        setCategoryRatings((prev) => ({ ...prev, [categoryId]: rating }));
    };

    const validate = () => {
        const newErrors = {};
        if (overallRating === 0) newErrors.overall = 'Please provide an overall rating';
        if (!pros.trim()) newErrors.pros = 'Please share at least one pro';
        if (!cons.trim()) newErrors.cons = 'Please share at least one con';
        if (wouldRecommend === null) newErrors.recommend = 'Please indicate if you would recommend';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const reviewData = {
            overallRating,
            categoryRatings,
            pros,
            cons,
            advice,
            isAnonymous,
            wouldRecommend,
            jobTitle,
            employmentStatus,
            createdAt: new Date().toISOString(),
        };

        await onSubmit?.(reviewData);
        setIsSubmitting(false);
    };

    return (
        <Card variant="elevated" className={className}>
            <CardHeader>
                <CardTitle>Review {companyName}</CardTitle>
                <p className="text-sm text-[#4A3C35] mt-1">Share your experience to help others</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Overall Rating */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Overall Rating <span className="text-[#C45B5B]">*</span>
                        </label>
                        <StarRating
                            value={overallRating}
                            onChange={setOverallRating}
                            size="lg"
                            showValue
                        />
                        {errors.overall && (
                            <p className="text-sm text-[#C45B5B]">{errors.overall}</p>
                        )}
                    </div>

                    {/* Category Ratings */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Rate by Category
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {REVIEW_CATEGORIES.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between p-3 bg-[#FAF6F0] rounded-xl"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{category.icon}</span>
                                        <span className="text-sm text-[#3E2723]">{category.name}</span>
                                    </div>
                                    <StarRating
                                        value={categoryRatings[category.id] || 0}
                                        onChange={(val) => handleCategoryRating(category.id, val)}
                                        size="sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Employment Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Your Job Title"
                            placeholder="e.g., Software Engineer"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#3E2723]">
                                Employment Status
                            </label>
                            <div className="flex gap-2">
                                {[
                                    { id: 'current', label: 'Current' },
                                    { id: 'former', label: 'Former' },
                                ].map((status) => (
                                    <button
                                        key={status.id}
                                        type="button"
                                        onClick={() => setEmploymentStatus(status.id)}
                                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${employmentStatus === status.id
                                                ? 'bg-[#90353D] text-[#F4EDE3]'
                                                : 'bg-[#FAF6F0] text-[#4A3C35] hover:bg-[#90353D]/10'
                                            }`}
                                    >
                                        {status.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pros */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Pros <span className="text-[#C45B5B]">*</span>
                        </label>
                        <textarea
                            value={pros}
                            onChange={(e) => setPros(e.target.value)}
                            placeholder="What do you like about working here?"
                            rows={3}
                            className="w-full px-4 py-3 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:outline-none transition-colors resize-none"
                        />
                        {errors.pros && (
                            <p className="text-sm text-[#C45B5B]">{errors.pros}</p>
                        )}
                    </div>

                    {/* Cons */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Cons <span className="text-[#C45B5B]">*</span>
                        </label>
                        <textarea
                            value={cons}
                            onChange={(e) => setCons(e.target.value)}
                            placeholder="What could be improved?"
                            rows={3}
                            className="w-full px-4 py-3 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:outline-none transition-colors resize-none"
                        />
                        {errors.cons && (
                            <p className="text-sm text-[#C45B5B]">{errors.cons}</p>
                        )}
                    </div>

                    {/* Advice */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Advice to Management (Optional)
                        </label>
                        <textarea
                            value={advice}
                            onChange={(e) => setAdvice(e.target.value)}
                            placeholder="Any suggestions for leadership?"
                            rows={2}
                            className="w-full px-4 py-3 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Would Recommend */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Would you recommend this company? <span className="text-[#C45B5B]">*</span>
                        </label>
                        <div className="flex gap-3">
                            {[
                                { value: true, label: '👍 Yes', color: 'bg-[#4ade80]' },
                                { value: false, label: '👎 No', color: 'bg-[#C45B5B]' },
                            ].map((option) => (
                                <button
                                    key={String(option.value)}
                                    type="button"
                                    onClick={() => setWouldRecommend(option.value)}
                                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${wouldRecommend === option.value
                                            ? `${option.color} text-white`
                                            : 'bg-[#FAF6F0] text-[#4A3C35] hover:bg-[#90353D]/10'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        {errors.recommend && (
                            <p className="text-sm text-[#C45B5B]">{errors.recommend}</p>
                        )}
                    </div>

                    {/* Anonymous Toggle */}
                    <div className="flex items-center justify-between p-4 bg-[#90353D]/5 rounded-xl">
                        <div>
                            <span className="text-sm font-medium text-[#3E2723]">Submit Anonymously</span>
                            <p className="text-xs text-[#9B8B7E] mt-0.5">
                                Your identity will be hidden from the company
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsAnonymous(!isAnonymous)}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isAnonymous ? 'bg-[#90353D]' : 'bg-[#9B8B7E]/30'
                                }`}
                            role="switch"
                            aria-checked={isAnonymous}
                        >
                            <span
                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${isAnonymous ? 'translate-x-6' : ''
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-4">
                        {onCancel && (
                            <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" variant="primary" loading={isSubmitting} className="flex-1">
                            Submit Review
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export { CompanyReviewForm, REVIEW_CATEGORIES };
