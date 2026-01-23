import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../ui';

const RatingScale = ({ value, onChange, max = 5 }) => (
    <div className="flex justify-between gap-2">
        {Array.from({ length: max }, (_, i) => i + 1).map(rating => (
            <button
                key={rating}
                onClick={() => onChange(rating)}
                className={`flex-1 py-2 rounded-lg font-medium transition-all ${value === rating ? 'bg-[#789A99] text-white' : value > rating ? 'bg-[#789A99]/20 text-[#789A99]' : 'bg-[#f5f3f1] text-[#8a9aa4] hover:bg-[#e8e0dc]'
                    }`}
            >
                {rating}
            </button>
        ))}
    </div>
);

export default function InterviewFeedbackForm({ candidate, interview, onSubmit, onSaveDraft, onCancel, initialData = {} }) {
    const [feedback, setFeedback] = useState({
        overallRating: initialData.overallRating || 0,
        technicalSkills: initialData.technicalSkills || 0,
        communication: initialData.communication || 0,
        cultureFit: initialData.cultureFit || 0,
        problemSolving: initialData.problemSolving || 0,
        strengths: initialData.strengths || '',
        improvements: initialData.improvements || '',
        recommendation: initialData.recommendation || '',
        privateNotes: initialData.privateNotes || '',
        shareWithTeam: initialData.shareWithTeam ?? true,
    });

    const updateFeedback = (field, value) => setFeedback(prev => ({ ...prev, [field]: value }));
    const isComplete = feedback.overallRating > 0 && feedback.recommendation && feedback.strengths;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#1e2a32]">Interview Feedback</h2>
                <p className="text-sm text-[#5a6b75]">Provide feedback for {candidate?.name || 'the candidate'}</p>
            </div>

            <Card variant="gradient" padding="md" className="bg-gradient-to-r from-[#FFD2C2]/20 to-transparent">
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-white font-semibold text-lg">
                            {candidate?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'C'}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-[#1e2a32]">{candidate?.name || 'Candidate'}</h3>
                            <p className="text-sm text-[#5a6b75]">{candidate?.title}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card variant="default" padding="lg">
                <CardHeader><CardTitle>Overall Rating</CardTitle></CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center gap-2 py-4">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} onClick={() => updateFeedback('overallRating', star)} className="transition-transform hover:scale-110">
                                <svg className={`w-10 h-10 ${feedback.overallRating >= star ? 'text-[#fbbf24] fill-[#fbbf24]' : 'text-[#e8e0dc]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card variant="default" padding="lg">
                <CardHeader><CardTitle>Detailed Ratings</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                    {[
                        { key: 'technicalSkills', label: 'Technical Skills' },
                        { key: 'communication', label: 'Communication' },
                        { key: 'cultureFit', label: 'Culture Fit' },
                        { key: 'problemSolving', label: 'Problem Solving' },
                    ].map(cat => (
                        <div key={cat.key}>
                            <div className="flex justify-between mb-2">
                                <p className="font-medium text-[#1e2a32]">{cat.label}</p>
                                <span className="text-lg font-semibold text-[#789A99]">{feedback[cat.key] || '-'}/5</span>
                            </div>
                            <RatingScale value={feedback[cat.key]} onChange={(v) => updateFeedback(cat.key, v)} />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card variant="default" padding="lg">
                <CardHeader><CardTitle>Qualitative Feedback</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Strengths *</label>
                        <textarea value={feedback.strengths} onChange={(e) => updateFeedback('strengths', e.target.value)} placeholder="What did the candidate do well?" rows={4} className="w-full px-4 py-3 border-2 border-[#e8e0dc] rounded-xl focus:border-[#789A99] focus:outline-none resize-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Areas for Improvement</label>
                        <textarea value={feedback.improvements} onChange={(e) => updateFeedback('improvements', e.target.value)} placeholder="What could the candidate improve?" rows={4} className="w-full px-4 py-3 border-2 border-[#e8e0dc] rounded-xl focus:border-[#789A99] focus:outline-none resize-none" />
                    </div>
                </CardContent>
            </Card>

            <Card variant="default" padding="lg">
                <CardHeader><CardTitle>Hiring Recommendation *</CardTitle></CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        {['strong_yes', 'yes', 'maybe', 'no', 'strong_no'].map(opt => (
                            <button key={opt} onClick={() => updateFeedback('recommendation', opt)} className={`flex-1 p-3 rounded-xl border-2 transition-all ${feedback.recommendation === opt ? 'border-[#789A99] bg-[#789A99]/5' : 'border-[#e8e0dc] hover:border-[#789A99]/50'}`}>
                                <span className="text-2xl block mb-1">{opt === 'strong_yes' ? '🌟' : opt === 'yes' ? '👍' : opt === 'maybe' ? '🤔' : opt === 'no' ? '👎' : '⛔'}</span>
                                <span className="text-xs font-medium">{opt.replace('_', ' ')}</span>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card variant="default" padding="lg">
                <CardHeader><CardTitle>Private Notes</CardTitle></CardHeader>
                <CardContent>
                    <textarea value={feedback.privateNotes} onChange={(e) => updateFeedback('privateNotes', e.target.value)} placeholder="Add private notes..." rows={3} className="w-full px-4 py-3 border-2 border-[#e8e0dc] rounded-xl focus:border-[#789A99] focus:outline-none resize-none" />
                </CardContent>
            </Card>

            <div className="flex justify-between gap-4">
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => onSaveDraft?.(feedback)}>Save Draft</Button>
                    <Button variant="primary" onClick={() => onSubmit?.(feedback)} disabled={!isComplete}>Submit Feedback</Button>
                </div>
            </div>
        </div>
    );
}
