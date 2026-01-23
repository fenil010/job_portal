import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Modal, ModalFooter, Badge } from '../ui';

const INTERVIEW_TYPES = [
    { value: 'phone', label: 'Phone Screen' },
    { value: 'video', label: 'Video Call' },
    { value: 'onsite', label: 'On-site' },
    { value: 'technical', label: 'Technical Interview' },
    { value: 'final', label: 'Final Round' },
];

const TIME_SLOTS = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
];

const DURATION_OPTIONS = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
];

export default function InterviewScheduler({
    candidate,
    interviews = [],
    teamMembers = [],
    onSchedule,
    onReschedule,
    onCancel,
    showModal = false,
    onCloseModal,
}) {
    const [scheduleData, setScheduleData] = useState({
        date: '',
        time: '',
        duration: '60',
        type: 'video',
        interviewers: [],
        notes: '',
        sendCalendarInvite: true,
        sendReminder: true,
    });

    const handleChange = (field, value) => {
        setScheduleData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleInterviewer = (memberId) => {
        setScheduleData((prev) => ({
            ...prev,
            interviewers: prev.interviewers.includes(memberId)
                ? prev.interviewers.filter((id) => id !== memberId)
                : [...prev.interviewers, memberId],
        }));
    };

    const handleSubmit = () => {
        if (!scheduleData.date || !scheduleData.time) return;
        onSchedule?.({
            ...scheduleData,
            candidateId: candidate?.id,
            candidateName: candidate?.name,
        });
        onCloseModal?.();
    };

    const getStatusColor = (status) => {
        const colors = {
            scheduled: 'info',
            completed: 'success',
            cancelled: 'danger',
            rescheduled: 'warning',
        };
        return colors[status] || 'default';
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            {/* Upcoming Interviews List */}
            <Card variant="default" padding="none">
                <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                    <CardTitle>Scheduled Interviews</CardTitle>
                    <Badge variant="info">{interviews.length} upcoming</Badge>
                </CardHeader>
                <CardContent className="p-0">
                    {interviews.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FFD2C2]/20 flex items-center justify-center">
                                <svg className="w-8 h-8 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-[#5a6b75]">No interviews scheduled</p>
                            <p className="text-sm text-[#8a9aa4]">Schedule interviews from the candidates page</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#e8e0dc]">
                            {interviews.map((interview) => (
                                <div key={interview.id} className="p-4 hover:bg-[#FFD2C2]/10 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center text-white flex-shrink-0">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-semibold text-[#1e2a32]">{interview.candidateName}</p>
                                                <Badge variant={getStatusColor(interview.status)} size="sm">
                                                    {interview.status}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-[#5a6b75]">{interview.type} Interview</p>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-[#8a9aa4]">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {interview.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {interview.time} ({interview.duration} min)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {onReschedule && (
                                                <button
                                                    onClick={() => onReschedule(interview)}
                                                    className="p-2 text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#789A99]/10 rounded-lg transition-all"
                                                    title="Reschedule"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                </button>
                                            )}
                                            {onCancel && (
                                                <button
                                                    onClick={() => onCancel(interview)}
                                                    className="p-2 text-[#8a9aa4] hover:text-[#f87171] hover:bg-[#f87171]/10 rounded-lg transition-all"
                                                    title="Cancel"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Schedule Modal */}
            <Modal
                isOpen={showModal}
                onClose={onCloseModal}
                title="Schedule Interview"
                size="lg"
            >
                <div className="space-y-5">
                    {/* Candidate info */}
                    {candidate && (
                        <div className="flex items-center gap-3 p-3 bg-[#FFD2C2]/10 rounded-xl">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-white font-semibold text-sm">
                                {candidate.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                                <p className="font-medium text-[#1e2a32]">{candidate.name}</p>
                                <p className="text-sm text-[#8a9aa4]">{candidate.title || candidate.role}</p>
                            </div>
                        </div>
                    )}

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Date"
                            type="date"
                            value={scheduleData.date}
                            onChange={(e) => handleChange('date', e.target.value)}
                            min={today}
                            required
                        />
                        <Select
                            label="Time"
                            options={TIME_SLOTS.map((t) => ({ value: t, label: t }))}
                            value={scheduleData.time}
                            onChange={(value) => handleChange('time', value)}
                            placeholder="Select time"
                        />
                    </div>

                    {/* Type & Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            label="Interview Type"
                            options={INTERVIEW_TYPES}
                            value={scheduleData.type}
                            onChange={(value) => handleChange('type', value)}
                        />
                        <Select
                            label="Duration"
                            options={DURATION_OPTIONS}
                            value={scheduleData.duration}
                            onChange={(value) => handleChange('duration', value)}
                        />
                    </div>

                    {/* Interviewers */}
                    {teamMembers.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-[#1e2a32] mb-2">Interviewers</label>
                            <div className="flex flex-wrap gap-2">
                                {teamMembers.map((member) => (
                                    <button
                                        key={member.id}
                                        type="button"
                                        onClick={() => toggleInterviewer(member.id)}
                                        className={`
                                            flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all
                                            ${scheduleData.interviewers.includes(member.id)
                                                ? 'border-[#789A99] bg-[#789A99]/10'
                                                : 'border-[#e8e0dc] hover:border-[#789A99]'
                                            }
                                        `}
                                    >
                                        <div className="w-6 h-6 rounded-full bg-[#789A99]/20 flex items-center justify-center text-xs font-medium text-[#5f7d7c]">
                                            {member.name?.charAt(0)}
                                        </div>
                                        <span className="text-sm text-[#1e2a32]">{member.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Notes (optional)</label>
                        <textarea
                            value={scheduleData.notes}
                            onChange={(e) => handleChange('notes', e.target.value)}
                            placeholder="Add any notes for the interviewers..."
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Options */}
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={scheduleData.sendCalendarInvite}
                                onChange={(e) => handleChange('sendCalendarInvite', e.target.checked)}
                                className="w-4 h-4 rounded border-[#e8e0dc] text-[#789A99] focus:ring-[#789A99]"
                            />
                            <span className="text-sm text-[#5a6b75]">Send calendar invite</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={scheduleData.sendReminder}
                                onChange={(e) => handleChange('sendReminder', e.target.checked)}
                                className="w-4 h-4 rounded border-[#e8e0dc] text-[#789A99] focus:ring-[#789A99]"
                            />
                            <span className="text-sm text-[#5a6b75]">Send reminder (1 hour before)</span>
                        </label>
                    </div>
                </div>

                <ModalFooter>
                    <Button variant="ghost" onClick={onCloseModal}>Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!scheduleData.date || !scheduleData.time}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Schedule Interview
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
