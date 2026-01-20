import { Card, Badge } from '../ui';
import StarRating from './StarRating';
import { DIFFICULTY_LEVELS, INTERVIEW_TYPES } from './InterviewRatingForm';

export default function InterviewExperienceCard({
    interview,
    showFull = false,
    onViewFull,
    className = '',
}) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getDifficultyInfo = (value) => {
        return DIFFICULTY_LEVELS.find((d) => d.value === value) || DIFFICULTY_LEVELS[2];
    };

    const difficultyInfo = getDifficultyInfo(interview.difficulty);

    return (
        <Card variant="default" padding="md" hover={!showFull} className={className}>
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h4 className="font-semibold text-[#3E2723]">
                            {interview.position || 'Interview Experience'}
                        </h4>
                        <p className="text-sm text-[#4A3C35]">{interview.companyName}</p>
                    </div>
                    <span className="text-xs text-[#9B8B7E]">
                        {formatDate(interview.createdAt)}
                    </span>
                </div>

                {/* Ratings Row */}
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <StarRating value={interview.overallRating} readOnly size="sm" />
                        <span className="text-sm font-medium text-[#90353D]">
                            {interview.overallRating}/5
                        </span>
                    </div>
                    <Badge
                        variant="outline"
                        size="sm"
                        className={`${difficultyInfo.color} !bg-opacity-20 border-0`}
                    >
                        {difficultyInfo.label}
                    </Badge>
                </div>

                {/* Interview Types */}
                <div className="flex flex-wrap gap-2">
                    {interview.interviewTypes?.map((typeId) => {
                        const type = INTERVIEW_TYPES.find((t) => t.id === typeId);
                        if (!type) return null;
                        return (
                            <span
                                key={typeId}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-[#FAF6F0] rounded-lg text-xs text-[#4A3C35]"
                            >
                                <span>{type.icon}</span>
                                {type.label}
                            </span>
                        );
                    })}
                    {interview.duration && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FAF6F0] rounded-lg text-xs text-[#4A3C35]">
                            ⏱️ {interview.duration}
                        </span>
                    )}
                </div>

                {/* Offer Status */}
                <div className="flex items-center gap-2">
                    {interview.gotOffer === true && (
                        <Badge variant="success" size="sm">
                            ✓ Received Offer
                        </Badge>
                    )}
                    {interview.gotOffer === false && (
                        <Badge variant="error" size="sm">
                            ✗ No Offer
                        </Badge>
                    )}
                    {interview.gotOffer === null && (
                        <Badge variant="outline" size="sm">
                            Pending
                        </Badge>
                    )}
                    {interview.acceptedOffer === true && (
                        <Badge variant="success" size="sm">
                            Accepted
                        </Badge>
                    )}
                    {interview.acceptedOffer === false && (
                        <Badge variant="warning" size="sm">
                            Declined
                        </Badge>
                    )}
                </div>

                {/* Experience Preview/Full */}
                <div className="pt-3 border-t border-[#90353D]/10">
                    <p className={`text-sm text-[#4A3C35] ${showFull ? '' : 'line-clamp-3'}`}>
                        {interview.experience}
                    </p>
                    {!showFull && interview.experience?.length > 200 && (
                        <button
                            type="button"
                            onClick={onViewFull}
                            className="text-sm text-[#90353D] hover:underline mt-2"
                        >
                            Read more
                        </button>
                    )}
                </div>

                {/* Questions Section (Full view only) */}
                {showFull && interview.questions && (
                    <div className="pt-3 border-t border-[#90353D]/10">
                        <h5 className="text-sm font-semibold text-[#3E2723] mb-2">
                            Interview Questions
                        </h5>
                        <ul className="space-y-1">
                            {interview.questions.split('\n').filter(Boolean).map((q, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-[#4A3C35]">
                                    <span className="text-[#90353D]">•</span>
                                    {q}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Tips Section (Full view only) */}
                {showFull && interview.tips && (
                    <div className="pt-3 border-t border-[#90353D]/10">
                        <h5 className="text-sm font-semibold text-[#3E2723] mb-2 flex items-center gap-2">
                            <span className="text-lg">💡</span>
                            Tips for Candidates
                        </h5>
                        <p className="text-sm text-[#4A3C35] bg-[#90353D]/5 p-3 rounded-xl">
                            {interview.tips}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
}

export { InterviewExperienceCard };
