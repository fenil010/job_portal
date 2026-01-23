import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../ui';
import ScoreGauge from './ScoreGauge';
import CriteriaRating, { DEFAULT_CRITERIA } from './CriteriaRating';

export default function ResumeScoreCard({
    candidateName = 'Candidate',
    jobTitle = 'Position',
    scores = {},
    criteria = DEFAULT_CRITERIA,
    onScoreChange,
    onOverride,
    isRecruiter = false,
    showToCandidate = true,
    onTransparencyChange,
    className = '',
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [localScores, setLocalScores] = useState(scores);
    const [overrideScore, setOverrideScore] = useState(null);
    const [showOverrideInput, setShowOverrideInput] = useState(false);

    // Calculate weighted total
    const calculateTotal = (scoreValues) => {
        let weightedSum = 0;
        criteria.forEach((c) => {
            const score = scoreValues[c.id] || 0;
            weightedSum += score * (c.weight / 100);
        });
        return Math.round(weightedSum);
    };

    const totalScore = overrideScore !== null ? overrideScore : calculateTotal(localScores);

    const handleScoreChange = (newScores) => {
        setLocalScores(newScores);
        setOverrideScore(null); // Clear override when individual scores change
        onScoreChange?.(newScores);
    };

    const handleOverride = () => {
        onOverride?.(overrideScore);
        setShowOverrideInput(false);
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return { label: 'Excellent Match', variant: 'success' };
        if (score >= 60) return { label: 'Good Match', variant: 'primary' };
        if (score >= 40) return { label: 'Fair Match', variant: 'warning' };
        return { label: 'Low Match', variant: 'error' };
    };

    const scoreInfo = getScoreLabel(totalScore);

    return (
        <Card variant="elevated" padding="none" className={`overflow-hidden ${className}`}>
            <CardHeader className="p-5 bg-gradient-to-r from-[#90353D] to-[#6B2830]">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-[#F4EDE3] text-lg">{candidateName}</CardTitle>
                        <p className="text-[#F4EDE3]/80 text-sm mt-1">Application for {jobTitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* AI Sparkle */}
                        <svg className="w-5 h-5 text-[#F4EDE3]/80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span className="text-xs text-[#F4EDE3]/80 font-medium">AI Scored</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-5">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Score Gauge */}
                    <div className="flex flex-col items-center">
                        <ScoreGauge value={totalScore} size="lg" label="Overall Score" />
                        <Badge variant={scoreInfo.variant} className="mt-3">
                            {scoreInfo.label}
                        </Badge>
                        {overrideScore !== null && (
                            <span className="text-xs text-[#9B8B7E] mt-1">Manual Override</span>
                        )}
                    </div>

                    {/* Criteria Breakdown */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-[#3E2723]">Score Breakdown</h4>
                            {isRecruiter && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? 'Done' : 'Edit Scores'}
                                </Button>
                            )}
                        </div>
                        <CriteriaRating
                            criteria={criteria}
                            values={localScores}
                            onChange={handleScoreChange}
                            readOnly={!isEditing}
                            showWeights={true}
                            showTotal={false}
                        />
                    </div>
                </div>

                {/* Recruiter Controls */}
                {isRecruiter && (
                    <div className="mt-6 pt-6 border-t-2 border-[#90353D]/20 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#3E2723]">Manual Score Override</span>
                            {!showOverrideInput ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowOverrideInput(true)}
                                >
                                    Override Score
                                </Button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={overrideScore ?? ''}
                                        onChange={(e) => setOverrideScore(parseInt(e.target.value, 10) || null)}
                                        placeholder="0-100"
                                        className="w-20 px-3 py-2 text-sm border-2 border-[#90353D]/20 rounded-lg focus:border-[#90353D] focus:outline-none"
                                    />
                                    <Button variant="primary" size="sm" onClick={handleOverride}>
                                        Apply
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setShowOverrideInput(false);
                                            setOverrideScore(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Transparency Toggle */}
                        <div className="flex items-center justify-between p-3 bg-[#90353D]/5 rounded-xl">
                            <div>
                                <span className="text-sm font-medium text-[#3E2723]">Score Visibility</span>
                                <p className="text-xs text-[#9B8B7E] mt-0.5">
                                    {showToCandidate ? 'Visible to candidate' : 'Hidden from candidate'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => onTransparencyChange?.(!showToCandidate)}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${showToCandidate ? 'bg-[#90353D]' : 'bg-[#9B8B7E]/30'
                                    }`}
                                role="switch"
                                aria-checked={showToCandidate}
                            >
                                <span
                                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${showToCandidate ? 'translate-x-6' : ''
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export { ResumeScoreCard };
