import { useState } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Badge } from '../ui';
import StarRating from './StarRating';

const INTERVIEW_TYPES = [
    { id: 'phone', label: 'Phone Screen', icon: '📞' },
    { id: 'video', label: 'Video Call', icon: '💻' },
    { id: 'onsite', label: 'On-site', icon: '🏢' },
    { id: 'technical', label: 'Technical', icon: '⚙️' },
    { id: 'panel', label: 'Panel', icon: '👥' },
];

const DIFFICULTY_LEVELS = [
    { value: 1, label: 'Very Easy', color: 'bg-[#4ade80]' },
    { value: 2, label: 'Easy', color: 'bg-[#86efac]' },
    { value: 3, label: 'Average', color: 'bg-[#D4A574]' },
    { value: 4, label: 'Difficult', color: 'bg-[#f97316]' },
    { value: 5, label: 'Very Difficult', color: 'bg-[#C45B5B]' },
];

export default function InterviewRatingForm({
    companyName = 'Company',
    position = 'Position',
    onSubmit,
    onCancel,
    className = '',
}) {
    const [overallRating, setOverallRating] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [interviewTypes, setInterviewTypes] = useState([]);
    const [gotOffer, setGotOffer] = useState(null);
    const [acceptedOffer, setAcceptedOffer] = useState(null);
    const [duration, setDuration] = useState('');
    const [experience, setExperience] = useState('');
    const [questions, setQuestions] = useState('');
    const [tips, setTips] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const toggleInterviewType = (typeId) => {
        setInterviewTypes((prev) =>
            prev.includes(typeId)
                ? prev.filter((t) => t !== typeId)
                : [...prev, typeId]
        );
    };

    const validate = () => {
        const newErrors = {};
        if (overallRating === 0) newErrors.rating = 'Please rate your experience';
        if (difficulty === 0) newErrors.difficulty = 'Please rate the difficulty';
        if (interviewTypes.length === 0) newErrors.types = 'Select at least one interview type';
        if (!experience.trim()) newErrors.experience = 'Please describe your experience';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const interviewData = {
            overallRating,
            difficulty,
            interviewTypes,
            gotOffer,
            acceptedOffer,
            duration,
            experience,
            questions,
            tips,
            createdAt: new Date().toISOString(),
        };

        await onSubmit?.(interviewData);
        setIsSubmitting(false);
    };

    return (
        <Card variant="elevated" className={className}>
            <CardHeader>
                <CardTitle>Rate Your Interview Experience</CardTitle>
                <p className="text-sm text-[#4A3C35] mt-1">
                    {position} at {companyName}
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Overall Experience Rating */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Overall Experience <span className="text-[#C45B5B]">*</span>
                        </label>
                        <StarRating
                            value={overallRating}
                            onChange={setOverallRating}
                            size="lg"
                            showValue
                        />
                        {errors.rating && (
                            <p className="text-sm text-[#C45B5B]">{errors.rating}</p>
                        )}
                    </div>

                    {/* Difficulty Level */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Difficulty Level <span className="text-[#C45B5B]">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {DIFFICULTY_LEVELS.map((level) => (
                                <button
                                    key={level.value}
                                    type="button"
                                    onClick={() => setDifficulty(level.value)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${difficulty === level.value
                                            ? `${level.color} text-white`
                                            : 'bg-[#FAF6F0] text-[#4A3C35] hover:bg-[#90353D]/10'
                                        }`}
                                >
                                    {level.label}
                                </button>
                            ))}
                        </div>
                        {errors.difficulty && (
                            <p className="text-sm text-[#C45B5B]">{errors.difficulty}</p>
                        )}
                    </div>

                    {/* Interview Types */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Interview Format <span className="text-[#C45B5B]">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {INTERVIEW_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => toggleInterviewType(type.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${interviewTypes.includes(type.id)
                                            ? 'bg-[#90353D] text-[#F4EDE3]'
                                            : 'bg-[#FAF6F0] text-[#4A3C35] hover:bg-[#90353D]/10'
                                        }`}
                                >
                                    <span>{type.icon}</span>
                                    {type.label}
                                </button>
                            ))}
                        </div>
                        {errors.types && (
                            <p className="text-sm text-[#C45B5B]">{errors.types}</p>
                        )}
                    </div>

                    {/* Duration */}
                    <Input
                        label="Interview Duration"
                        placeholder="e.g., 2 hours, 1 week process"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />

                    {/* Offer Status */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Did you receive an offer?
                        </label>
                        <div className="flex gap-3">
                            {[
                                { value: true, label: 'Yes' },
                                { value: false, label: 'No' },
                                { value: null, label: 'Pending' },
                            ].map((option) => (
                                <button
                                    key={String(option.value)}
                                    type="button"
                                    onClick={() => {
                                        setGotOffer(option.value);
                                        if (option.value !== true) setAcceptedOffer(null);
                                    }}
                                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${gotOffer === option.value
                                            ? 'bg-[#90353D] text-[#F4EDE3]'
                                            : 'bg-[#FAF6F0] text-[#4A3C35] hover:bg-[#90353D]/10'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Accepted Offer (conditional) */}
                    {gotOffer === true && (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#3E2723]">
                                Did you accept the offer?
                            </label>
                            <div className="flex gap-3">
                                {[
                                    { value: true, label: 'Yes, I accepted' },
                                    { value: false, label: 'No, I declined' },
                                ].map((option) => (
                                    <button
                                        key={String(option.value)}
                                        type="button"
                                        onClick={() => setAcceptedOffer(option.value)}
                                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${acceptedOffer === option.value
                                                ? option.value
                                                    ? 'bg-[#4ade80] text-white'
                                                    : 'bg-[#C45B5B] text-white'
                                                : 'bg-[#FAF6F0] text-[#4A3C35] hover:bg-[#90353D]/10'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interview Experience */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Describe Your Experience <span className="text-[#C45B5B]">*</span>
                        </label>
                        <textarea
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            placeholder="How was the overall interview process? What stood out?"
                            rows={4}
                            className="w-full px-4 py-3 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:outline-none transition-colors resize-none"
                        />
                        {errors.experience && (
                            <p className="text-sm text-[#C45B5B]">{errors.experience}</p>
                        )}
                    </div>

                    {/* Sample Questions */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Interview Questions (Optional)
                        </label>
                        <textarea
                            value={questions}
                            onChange={(e) => setQuestions(e.target.value)}
                            placeholder="Share some questions you were asked (one per line)"
                            rows={3}
                            className="w-full px-4 py-3 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Tips */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#3E2723]">
                            Tips for Other Candidates (Optional)
                        </label>
                        <textarea
                            value={tips}
                            onChange={(e) => setTips(e.target.value)}
                            placeholder="Any advice for future interviewees?"
                            rows={2}
                            className="w-full px-4 py-3 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3 pt-4">
                        {onCancel && (
                            <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" variant="primary" loading={isSubmitting} className="flex-1">
                            Submit Interview Review
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export { InterviewRatingForm, INTERVIEW_TYPES, DIFFICULTY_LEVELS };
