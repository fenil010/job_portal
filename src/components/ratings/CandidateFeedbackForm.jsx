import { useState } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Badge } from '../ui';
import StarRating from './StarRating';

const FEEDBACK_CRITERIA = [
    { id: 'skills', name: 'Technical Skills', icon: '⚙️' },
    { id: 'communication', name: 'Communication', icon: '💬' },
    { id: 'culture', name: 'Culture Fit', icon: '🤝' },
    { id: 'experience', name: 'Experience Level', icon: '📈' },
    { id: 'enthusiasm', name: 'Enthusiasm', icon: '⭐' },
];

const RECOMMENDATION_OPTIONS = [
    { value: 'strong_yes', label: 'Strong Yes', color: 'bg-[#4ade80]', icon: '👍👍' },
    { value: 'yes', label: 'Yes', color: 'bg-[#86efac]', icon: '👍' },
    { value: 'maybe', label: 'Maybe', color: 'bg-[#D4A574]', icon: '🤔' },
    { value: 'no', label: 'No', color: 'bg-[#C45B5B]', icon: '👎' },
    { value: 'strong_no', label: 'Strong No', color: 'bg-[#991b1b]', icon: '👎👎' },
];

export default function CandidateFeedbackForm({
    candidateName = 'Candidate',
    position = 'Position',
    stage = 'Interview',
    onSubmit,
    onCancel,
    className = '',
}) {
    const [criteriaRatings, setCriteriaRatings] = useState({});
    const [recommendation, setRecommendation] = useState('');
    const [strengths, setStrengths] = useState('');
    const [weaknesses, setWeaknesses] = useState('');
    const [notes, setNotes] = useState('');
    const [nextSteps, setNextSteps] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleCriteriaRating = (criterionId, rating) => {
        setCriteriaRatings((prev) => ({ ...prev, [criterionId]: rating }));
    };

    const validate = () => {
        const newErrors = {};
        if (!recommendation) newErrors.recommendation = 'Please provide a recommendation';
        if (!strengths.trim()) newErrors.strengths = 'Please note at least one strength';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const feedbackData = {
            criteriaRatings,
            recommendation,
            strengths,
            weaknesses,
            notes,
            nextSteps,
            isPrivate,
            stage,
            createdAt: new Date().toISOString(),
        };

        await onSubmit?.(feedbackData);
        setIsSubmitting(false);
    };

    // Calculate average rating
    const ratings = Object.values(criteriaRatings).filter(Boolean);
    const averageRating = ratings.length > 0
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : null;

    return (
        <Card variant="elevated" className={className}>
            <CardHeader className="bg-gradient-to-r from-[#90353D] to-[#6B2830]">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-[#F4EDE3]">Candidate Feedback</CardTitle>
                        <p className="text-[#F4EDE3]/80 text-sm mt-1">
                            {candidateName} • {position}
                        </p>
                    </div>
                    <Badge variant="outline" className="!bg-[#F4EDE3]/10 !text-[#F4EDE3] !border-[#F4EDE3]/30">
                        {stage}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-5">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Criteria Ratings */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Rate by Criteria
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {FEEDBACK_CRITERIA.map((criterion) => (
                                <div
                                    key={criterion.id}
                                    className="flex items-center justify-between p-3 bg-[#FAF6F0] rounded-xl"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{criterion.icon}</span>
                                        <span className="text-sm text-[#3E2723]">{criterion.name}</span>
                                    </div>
                                    <StarRating
                                        value={criteriaRatings[criterion.id] || 0}
                                        onChange={(val) => handleCriteriaRating(criterion.id, val)}
                                        size="sm"
                                    />
                                </div>
                            ))}
                        </div>
                        {averageRating && (
                            <div className="flex items-center justify-end gap-2 text-sm">
                                <span className="text-[#9B8B7E]">Average:</span>
                                <span className="font-semibold text-[#90353D]">{averageRating}/5</span>
                            </div>
                        )}
                    </div>

                    {/* Recommendation */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Overall Recommendation <span className="text-[#C45B5B]">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {RECOMMENDATION_OPTIONS.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setRecommendation(option.value)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${recommendation === option.value
                                            ? `${option.color} text-white`
                                            : 'bg-[#FAF6F0] text-[#4A3C35] hover:bg-[#90353D]/10'
                                        }`}
                                >
                                    <span>{option.icon}</span>
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        {errors.recommendation && (
                            <p className="text-sm text-[#C45B5B]">{errors.recommendation}</p>
                        )}
                    </div>

                    {/* Strengths */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Key Strengths <span className="text-[#C45B5B]">*</span>
                        </label>
                        <textarea
                            value={strengths}
                            onChange={(e) => setStrengths(e.target.value)}
                            placeholder="What stood out positively about this candidate?"
                            rows={3}
                            className="w-full px-4 py-3 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:outline-none transition-colors resize-none"
                        />
                        {errors.strengths && (
                            <p className="text-sm text-[#C45B5B]">{errors.strengths}</p>
                        )}
                    </div>

                    {/* Weaknesses */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Areas for Concern
                        </label>
                        <textarea
                            value={weaknesses}
                            onChange={(e) => setWeaknesses(e.target.value)}
                            placeholder="Any concerns or areas where the candidate could improve?"
                            rows={3}
                            className="w-full px-4 py-3 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Next Steps */}
                    <Input
                        label="Suggested Next Steps"
                        placeholder="e.g., Proceed to technical interview, Schedule follow-up"
                        value={nextSteps}
                        onChange={(e) => setNextSteps(e.target.value)}
                    />

                    {/* Private Notes */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-[#3E2723]">
                                Private Notes
                            </label>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#9B8B7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="text-xs text-[#9B8B7E]">Only visible to hiring team</span>
                            </div>
                        </div>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Internal notes (not visible to candidate)"
                            rows={2}
                            className="w-full px-4 py-3 bg-[#90353D]/5 border-2 border-[#90353D]/20 rounded-xl text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Visibility Toggle */}
                    <div className="flex items-center justify-between p-4 bg-[#FAF6F0] rounded-xl">
                        <div>
                            <span className="text-sm font-medium text-[#3E2723]">Share Summary with Candidate</span>
                            <p className="text-xs text-[#9B8B7E] mt-0.5">
                                {isPrivate ? 'Feedback is private to hiring team' : 'Summary will be visible to candidate'}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsPrivate(!isPrivate)}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${!isPrivate ? 'bg-[#90353D]' : 'bg-[#9B8B7E]/30'
                                }`}
                            role="switch"
                            aria-checked={!isPrivate}
                        >
                            <span
                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${!isPrivate ? 'translate-x-6' : ''
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3 pt-4">
                        {onCancel && (
                            <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" variant="primary" loading={isSubmitting} className="flex-1">
                            Submit Feedback
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export { CandidateFeedbackForm, FEEDBACK_CRITERIA, RECOMMENDATION_OPTIONS };
