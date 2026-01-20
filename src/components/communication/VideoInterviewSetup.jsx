import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Badge, Modal, ModalFooter } from '../ui';

export default function VideoInterviewSetup({
    interview = null,
    onSave,
    onGenerateLink,
    onSendInvite,
    teamMembers = [],
}) {
    const [formData, setFormData] = useState({
        platform: interview?.platform || 'zoom',
        meetingLink: interview?.meetingLink || '',
        meetingId: interview?.meetingId || '',
        passcode: interview?.passcode || '',
        date: interview?.date || '',
        time: interview?.time || '',
        duration: interview?.duration || '60',
        interviewers: interview?.interviewers || [],
        candidateEmail: interview?.candidateEmail || '',
        sendReminders: interview?.sendReminders ?? true,
        recordingEnabled: interview?.recordingEnabled ?? false,
        waitingRoomEnabled: interview?.waitingRoomEnabled ?? true,
        notes: interview?.notes || '',
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    const platforms = [
        { value: 'zoom', label: 'Zoom', icon: '📹', color: 'bg-[#2D8CFF]' },
        { value: 'google_meet', label: 'Google Meet', icon: '🎥', color: 'bg-[#00897B]' },
        { value: 'teams', label: 'Microsoft Teams', icon: '💼', color: 'bg-[#6264A7]' },
        { value: 'custom', label: 'Custom Link', icon: '🔗', color: 'bg-[#789A99]' },
    ];

    const durations = [
        { value: '15', label: '15 minutes' },
        { value: '30', label: '30 minutes' },
        { value: '45', label: '45 minutes' },
        { value: '60', label: '1 hour' },
        { value: '90', label: '1.5 hours' },
        { value: '120', label: '2 hours' },
    ];

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerateLink = async () => {
        setIsGenerating(true);
        const link = await onGenerateLink?.(formData.platform);
        if (link) {
            setFormData(prev => ({
                ...prev,
                meetingLink: link.url,
                meetingId: link.meetingId,
                passcode: link.passcode,
            }));
        }
        setIsGenerating(false);
    };

    const handleSave = () => {
        onSave?.(formData);
    };

    const toggleInterviewer = (id) => {
        setFormData(prev => ({
            ...prev,
            interviewers: prev.interviewers.includes(id)
                ? prev.interviewers.filter(i => i !== id)
                : [...prev.interviewers, id],
        }));
    };

    const selectedPlatform = platforms.find(p => p.value === formData.platform);

    const preMeetingChecklist = [
        { id: 'camera', label: 'Test your camera', icon: '📷' },
        { id: 'microphone', label: 'Test your microphone', icon: '🎤' },
        { id: 'internet', label: 'Check internet connection', icon: '📶' },
        { id: 'background', label: 'Choose a professional background', icon: '🖼️' },
        { id: 'lighting', label: 'Ensure good lighting', icon: '💡' },
        { id: 'quiet', label: 'Find a quiet space', icon: '🔇' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#1e2a32]">Video Interview Setup</h2>
                <p className="text-sm text-[#5a6b75]">Configure video meeting settings for the interview</p>
            </div>

            {/* Platform Selection */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <CardTitle>Meeting Platform</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {platforms.map(platform => (
                            <button
                                key={platform.value}
                                onClick={() => handleChange('platform', platform.value)}
                                className={`p-4 rounded-xl border-2 transition-all text-center ${formData.platform === platform.value
                                        ? 'border-[#789A99] bg-[#789A99]/5'
                                        : 'border-[#e8e0dc] hover:border-[#789A99]/50'
                                    }`}
                            >
                                <span className="text-3xl block mb-2">{platform.icon}</span>
                                <span className="text-sm font-medium text-[#1e2a32]">{platform.label}</span>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Meeting Link */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <div className="flex items-center justify-between w-full">
                        <CardTitle>Meeting Details</CardTitle>
                        {formData.platform !== 'custom' && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleGenerateLink}
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className="w-4 h-4 mr-1.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        </svg>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        Generate Link
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Meeting Link</label>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={formData.meetingLink}
                                onChange={(e) => handleChange('meetingLink', e.target.value)}
                                placeholder={`Enter ${selectedPlatform?.label || 'meeting'} link...`}
                                className="flex-1 px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors"
                            />
                            {formData.meetingLink && (
                                <Button
                                    variant="ghost"
                                    onClick={() => navigator.clipboard.writeText(formData.meetingLink)}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </Button>
                            )}
                        </div>
                    </div>

                    {formData.platform !== 'custom' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#1e2a32] mb-2">Meeting ID</label>
                                <input
                                    type="text"
                                    value={formData.meetingId}
                                    onChange={(e) => handleChange('meetingId', e.target.value)}
                                    placeholder="123 456 7890"
                                    className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1e2a32] mb-2">Passcode</label>
                                <input
                                    type="text"
                                    value={formData.passcode}
                                    onChange={(e) => handleChange('passcode', e.target.value)}
                                    placeholder="abc123"
                                    className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Schedule */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <CardTitle>Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#1e2a32] mb-2">Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleChange('date', e.target.value)}
                                className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] focus:border-[#789A99] focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#1e2a32] mb-2">Time</label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => handleChange('time', e.target.value)}
                                className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] focus:border-[#789A99] focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#1e2a32] mb-2">Duration</label>
                            <select
                                value={formData.duration}
                                onChange={(e) => handleChange('duration', e.target.value)}
                                className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] focus:border-[#789A99] focus:outline-none transition-colors bg-white"
                            >
                                {durations.map(d => (
                                    <option key={d.value} value={d.value}>{d.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interviewers */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <CardTitle>Interviewers</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {teamMembers.map(member => (
                            <button
                                key={member.id}
                                onClick={() => toggleInterviewer(member.id)}
                                className={`p-3 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${formData.interviewers.includes(member.id)
                                        ? 'border-[#789A99] bg-[#789A99]/5'
                                        : 'border-[#e8e0dc] hover:border-[#789A99]/50'
                                    }`}
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-white font-semibold text-sm">
                                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[#1e2a32] truncate">{member.name}</p>
                                    <p className="text-sm text-[#8a9aa4] truncate">{member.role}</p>
                                </div>
                                {formData.interviewers.includes(member.id) && (
                                    <svg className="w-5 h-5 text-[#789A99]" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Meeting Options */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <CardTitle>Meeting Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { key: 'sendReminders', label: 'Send reminders', description: 'Email reminders 24h and 30min before' },
                        { key: 'waitingRoomEnabled', label: 'Enable waiting room', description: 'Participants wait until admitted' },
                        { key: 'recordingEnabled', label: 'Allow recording', description: 'Record the interview for review' },
                    ].map(option => (
                        <div key={option.key} className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium text-[#1e2a32]">{option.label}</p>
                                <p className="text-sm text-[#8a9aa4]">{option.description}</p>
                            </div>
                            <button
                                onClick={() => handleChange(option.key, !formData[option.key])}
                                className={`relative w-12 h-6 rounded-full transition-colors ${formData[option.key] ? 'bg-[#789A99]' : 'bg-[#e8e0dc]'}`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${formData[option.key] ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Pre-Interview Checklist */}
            <Card variant="gradient" padding="lg" className="bg-gradient-to-br from-[#FFD2C2]/20 to-[#789A99]/10">
                <CardHeader>
                    <CardTitle>Pre-Interview Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {preMeetingChecklist.map(item => (
                            <div key={item.id} className="flex items-center gap-2 p-3 bg-white rounded-xl">
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-sm text-[#1e2a32]">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-between">
                <Button variant="outline" onClick={() => setShowPreviewModal(true)}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview Invite
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={onSendInvite}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send Invite
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Settings
                    </Button>
                </div>
            </div>

            {/* Preview Modal */}
            <Modal
                isOpen={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                title="Interview Invite Preview"
                size="lg"
            >
                <div className="p-4 bg-[#f5f3f1] rounded-xl">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">{selectedPlatform?.icon}</span>
                            <div>
                                <h4 className="font-semibold text-[#1e2a32]">Video Interview Invitation</h4>
                                <p className="text-sm text-[#5a6b75]">via {selectedPlatform?.label}</p>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex gap-2">
                                <span className="text-[#8a9aa4]">📅 Date:</span>
                                <span className="text-[#1e2a32]">{formData.date || 'Not set'}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-[#8a9aa4]">⏰ Time:</span>
                                <span className="text-[#1e2a32]">{formData.time || 'Not set'}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-[#8a9aa4]">⏱️ Duration:</span>
                                <span className="text-[#1e2a32]">{durations.find(d => d.value === formData.duration)?.label}</span>
                            </div>
                            {formData.meetingLink && (
                                <div className="flex gap-2">
                                    <span className="text-[#8a9aa4]">🔗 Link:</span>
                                    <a href={formData.meetingLink} className="text-[#789A99] hover:underline truncate">{formData.meetingLink}</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowPreviewModal(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
