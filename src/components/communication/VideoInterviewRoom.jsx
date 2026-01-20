import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../ui';

export default function VideoInterviewRoom({
    interview,
    candidate,
    onJoinCall,
    onEndCall,
    onReportIssue,
    onSaveNotes,
}) {
    const [notes, setNotes] = useState('');
    const [isInCall, setIsInCall] = useState(false);
    const [showNotesPanel, setShowNotesPanel] = useState(true);
    const [showChecklist, setShowChecklist] = useState(true);
    const [checklistItems, setChecklistItems] = useState([
        { id: 'camera', label: 'Camera is working', checked: false },
        { id: 'microphone', label: 'Microphone is working', checked: false },
        { id: 'internet', label: 'Internet connection stable', checked: false },
        { id: 'quiet', label: 'In a quiet environment', checked: false },
    ]);

    const toggleCheck = (id) => {
        setChecklistItems(prev =>
            prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
        );
    };

    const allChecked = checklistItems.every(item => item.checked);

    const handleJoin = () => {
        setIsInCall(true);
        setShowChecklist(false);
        onJoinCall?.();
    };

    const handleEnd = () => {
        setIsInCall(false);
        onEndCall?.();
    };

    const handleSaveNotes = () => {
        onSaveNotes?.(notes);
    };

    const platformInfo = {
        zoom: { name: 'Zoom', icon: '📹', color: 'bg-[#2D8CFF]' },
        google_meet: { name: 'Google Meet', icon: '🎥', color: 'bg-[#00897B]' },
        teams: { name: 'Microsoft Teams', icon: '💼', color: 'bg-[#6264A7]' },
        custom: { name: 'Video Call', icon: '🔗', color: 'bg-[#789A99]' },
    };

    const platform = platformInfo[interview?.platform] || platformInfo.custom;

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Main Video Area */}
            <div className="flex-1 space-y-4">
                {/* Interview Info Header */}
                <Card variant="default" padding="md">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl ${platform.color} flex items-center justify-center text-2xl`}>
                                    {platform.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1e2a32]">Interview with {candidate?.name || 'Candidate'}</h3>
                                    <div className="flex items-center gap-3 text-sm text-[#5a6b75]">
                                        <span>{interview?.date}</span>
                                        <span>•</span>
                                        <span>{interview?.time}</span>
                                        <span>•</span>
                                        <span>{interview?.duration || 60} min</span>
                                    </div>
                                </div>
                            </div>
                            <Badge variant={isInCall ? 'success' : 'default'} size="md">
                                {isInCall ? '● Live' : 'Not Started'}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Pre-call Checklist */}
                {showChecklist && !isInCall && (
                    <Card variant="default" padding="lg">
                        <CardHeader>
                            <CardTitle>Pre-Interview Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {checklistItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => toggleCheck(item.id)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-[#e8e0dc] hover:border-[#789A99]/50 transition-all"
                                    >
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${item.checked ? 'bg-[#789A99] text-white' : 'bg-[#f5f3f1]'
                                            }`}>
                                            {item.checked && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`text-sm ${item.checked ? 'text-[#789A99]' : 'text-[#1e2a32]'}`}>
                                            {item.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleJoin}
                                    disabled={!allChecked}
                                    className="min-w-[200px]"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Join Interview
                                </Button>
                                {!allChecked && (
                                    <p className="mt-2 text-sm text-[#8a9aa4]">Complete all checklist items to join</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Video Frame */}
                {isInCall && (
                    <Card variant="default" padding="none" className="overflow-hidden">
                        <div className="aspect-video bg-[#1e2a32] relative">
                            {/* Placeholder for video embed */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-medium">Video call in progress</p>
                                    <p className="text-sm text-white/60 mt-1">via {platform.name}</p>
                                </div>
                            </div>

                            {/* Recording indicator */}
                            {interview?.recordingEnabled && (
                                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#f87171] rounded-full">
                                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                    <span className="text-xs text-white font-medium">Recording</span>
                                </div>
                            )}

                            {/* Self view */}
                            <div className="absolute bottom-4 right-4 w-48 h-36 bg-[#2a3a44] rounded-xl overflow-hidden border-2 border-white/20">
                                <div className="w-full h-full flex items-center justify-center text-white/40">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Call Controls */}
                        <div className="p-4 bg-[#1e2a32] flex items-center justify-center gap-4">
                            <button className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                            <button className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                            <button className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </button>
                            <button
                                onClick={handleEnd}
                                className="p-3 rounded-full bg-[#f87171] text-white hover:bg-[#ef4444] transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                                </svg>
                            </button>
                        </div>
                    </Card>
                )}

                {/* Report Issue */}
                {isInCall && (
                    <div className="text-center">
                        <button
                            onClick={onReportIssue}
                            className="text-sm text-[#8a9aa4] hover:text-[#f87171] transition-colors"
                        >
                            Having technical issues? Report a problem
                        </button>
                    </div>
                )}
            </div>

            {/* Sidebar - Notes & Details */}
            <div className="w-full lg:w-80 space-y-4">
                {/* Candidate Info */}
                <Card variant="default" padding="lg">
                    <CardHeader>
                        <CardTitle>Candidate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD2C2] to-[#f0b8a8] flex items-center justify-center text-white font-semibold">
                                {candidate?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'C'}
                            </div>
                            <div>
                                <p className="font-semibold text-[#1e2a32]">{candidate?.name || 'Candidate'}</p>
                                <p className="text-sm text-[#5a6b75]">{candidate?.title || 'Position'}</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-[#5a6b75]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>{candidate?.email || 'email@example.com'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#5a6b75]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{candidate?.location || 'Location'}</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#e8e0dc]">
                            <Button variant="outline" size="sm" className="w-full">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                View Resume
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Interview Notes */}
                <Card variant="default" padding="lg">
                    <CardHeader>
                        <div className="flex items-center justify-between w-full">
                            <CardTitle>Interview Notes</CardTitle>
                            <button
                                onClick={() => setShowNotesPanel(!showNotesPanel)}
                                className="text-[#8a9aa4] hover:text-[#789A99]"
                            >
                                {showNotesPanel ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </CardHeader>
                    {showNotesPanel && (
                        <CardContent>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Take notes during the interview..."
                                rows={8}
                                className="w-full px-3 py-2 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors resize-none text-sm"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-3"
                                onClick={handleSaveNotes}
                            >
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                Save Notes
                            </Button>
                        </CardContent>
                    )}
                </Card>

                {/* Meeting Link */}
                <Card variant="default" padding="md">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-xl">{platform.icon}</span>
                                <span className="text-[#5a6b75]">{platform.name}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(interview?.meetingLink, '_blank')}
                            >
                                Open in {platform.name}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
