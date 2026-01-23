import { useState, useCallback } from 'react';
import { Badge, Button } from '../ui';
import ApplicantCard from './ApplicantCard';

const PIPELINE_STAGES = [
    { id: 'new', label: 'New', color: '#60a5fa' },
    { id: 'screening', label: 'Screening', color: '#fbbf24' },
    { id: 'interview', label: 'Interview', color: '#789A99' },
    { id: 'offer', label: 'Offer', color: '#4ade80' },
    { id: 'hired', label: 'Hired', color: '#22c55e' },
];

export default function CandidatePipeline({
    candidates = [],
    onMoveCandidate,
    onViewCandidate,
    onScheduleInterview,
}) {
    const [draggedCandidate, setDraggedCandidate] = useState(null);
    const [dragOverStage, setDragOverStage] = useState(null);

    const getCandidatesByStage = useCallback((stageId) => {
        return candidates.filter((c) => (c.stage || 'new').toLowerCase() === stageId);
    }, [candidates]);

    const handleDragStart = (e, candidate) => {
        setDraggedCandidate(candidate);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', candidate.id);
    };

    const handleDragOver = (e, stageId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverStage(stageId);
    };

    const handleDragLeave = () => {
        setDragOverStage(null);
    };

    const handleDrop = (e, stageId) => {
        e.preventDefault();
        setDragOverStage(null);
        if (draggedCandidate && draggedCandidate.stage !== stageId) {
            onMoveCandidate?.(draggedCandidate.id, stageId);
        }
        setDraggedCandidate(null);
    };

    const handleDragEnd = () => {
        setDraggedCandidate(null);
        setDragOverStage(null);
    };

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
                {PIPELINE_STAGES.map((stage) => {
                    const stageCandidates = getCandidatesByStage(stage.id);
                    const isDropTarget = dragOverStage === stage.id;

                    return (
                        <div
                            key={stage.id}
                            className={`
                                w-80 flex-shrink-0 rounded-2xl border-2 transition-all duration-200
                                ${isDropTarget
                                    ? 'border-[#789A99] bg-[#789A99]/5 scale-[1.02]'
                                    : 'border-[#e8e0dc] bg-[#fdf9f7]'
                                }
                            `}
                            onDragOver={(e) => handleDragOver(e, stage.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, stage.id)}
                        >
                            {/* Stage Header */}
                            <div className="p-4 border-b border-[#e8e0dc]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: stage.color }}
                                        />
                                        <h3 className="font-semibold text-[#1e2a32]">{stage.label}</h3>
                                        <Badge variant="default" size="sm">
                                            {stageCandidates.length}
                                        </Badge>
                                    </div>
                                    <button className="p-1.5 text-[#8a9aa4] hover:text-[#1e2a32] hover:bg-white rounded-lg transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Candidates */}
                            <div className="p-3 space-y-3 min-h-[200px] max-h-[calc(100vh-300px)] overflow-y-auto">
                                {stageCandidates.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <div className="w-12 h-12 rounded-xl bg-[#e8e0dc] flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-[#8a9aa4]">No candidates</p>
                                        <p className="text-xs text-[#8a9aa4]">Drag candidates here</p>
                                    </div>
                                ) : (
                                    stageCandidates.map((candidate) => (
                                        <div
                                            key={candidate.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, candidate)}
                                            onDragEnd={handleDragEnd}
                                            className={`
                                                cursor-grab active:cursor-grabbing transition-all duration-200
                                                ${draggedCandidate?.id === candidate.id ? 'opacity-50 scale-95' : ''}
                                            `}
                                        >
                                            <PipelineCard
                                                candidate={candidate}
                                                stage={stage}
                                                onView={() => onViewCandidate?.(candidate)}
                                                onSchedule={() => onScheduleInterview?.(candidate)}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Rejected Column (separate) */}
                <div className="w-80 flex-shrink-0 rounded-2xl border-2 border-[#f87171]/30 bg-[#f87171]/5">
                    <div className="p-4 border-b border-[#f87171]/20">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#f87171]" />
                            <h3 className="font-semibold text-[#1e2a32]">Rejected</h3>
                            <Badge variant="danger" size="sm">
                                {candidates.filter(c => c.stage === 'rejected').length}
                            </Badge>
                        </div>
                    </div>
                    <div
                        className="p-3 space-y-3 min-h-[200px] max-h-[calc(100vh-300px)] overflow-y-auto"
                        onDragOver={(e) => handleDragOver(e, 'rejected')}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, 'rejected')}
                    >
                        {candidates.filter(c => c.stage === 'rejected').map((candidate) => (
                            <div
                                key={candidate.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, candidate)}
                                onDragEnd={handleDragEnd}
                                className="opacity-60"
                            >
                                <PipelineCard candidate={candidate} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function PipelineCard({ candidate, stage, onView, onSchedule }) {
    return (
        <div className="bg-white rounded-xl border-2 border-[#e8e0dc] p-3 hover:border-[#789A99] hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {candidate.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#1e2a32] text-sm truncate">{candidate.name}</p>
                    <p className="text-xs text-[#8a9aa4] truncate">{candidate.title || candidate.role}</p>
                </div>
                <div className="text-right">
                    <span className={`text-sm font-bold ${candidate.matchScore >= 80 ? 'text-[#4ade80]' :
                            candidate.matchScore >= 60 ? 'text-[#789A99]' : 'text-[#fbbf24]'
                        }`}>
                        {candidate.matchScore}%
                    </span>
                </div>
            </div>

            {/* Skills preview */}
            {candidate.skills && candidate.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {candidate.skills.slice(0, 3).map((skill, idx) => (
                        <span
                            key={idx}
                            className="px-1.5 py-0.5 text-[10px] bg-[#789A99]/10 text-[#5f7d7c] rounded font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                    {candidate.skills.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-[#e8e0dc] text-[#8a9aa4] rounded">
                            +{candidate.skills.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* Quick actions */}
            <div className="flex items-center gap-1 mt-3 pt-2 border-t border-[#e8e0dc]">
                {onView && (
                    <button
                        onClick={onView}
                        className="flex-1 py-1.5 text-xs text-[#5a6b75] hover:text-[#789A99] hover:bg-[#789A99]/10 rounded-lg transition-all"
                    >
                        View Profile
                    </button>
                )}
                {onSchedule && stage?.id === 'interview' && (
                    <button
                        onClick={onSchedule}
                        className="flex-1 py-1.5 text-xs text-[#60a5fa] hover:bg-[#60a5fa]/10 rounded-lg transition-all"
                    >
                        Schedule
                    </button>
                )}
            </div>
        </div>
    );
}
