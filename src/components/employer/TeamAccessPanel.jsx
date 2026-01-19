import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Modal, ModalFooter, Badge } from '../ui';

const ROLE_OPTIONS = [
    { value: 'admin', label: 'Admin', description: 'Full access to all features' },
    { value: 'recruiter', label: 'Recruiter', description: 'Can manage candidates and jobs' },
    { value: 'interviewer', label: 'Interviewer', description: 'Can view candidates and give feedback' },
    { value: 'viewer', label: 'Viewer', description: 'Read-only access' },
];

export default function TeamAccessPanel({
    teamMembers = [],
    pendingInvites = [],
    activityLog = [],
    onInvite,
    onRemove,
    onUpdateRole,
    onResendInvite,
    onCancelInvite,
}) {
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteData, setInviteData] = useState({ email: '', role: 'recruiter', message: '' });

    const handleInvite = () => {
        if (!inviteData.email) return;
        onInvite?.(inviteData);
        setShowInviteModal(false);
        setInviteData({ email: '', role: 'recruiter', message: '' });
    };


    return (
        <>
            <div className="space-y-6">
                {/* Team Members */}
                <Card variant="default" padding="none">
                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                        <div>
                            <CardTitle>Team Members</CardTitle>
                            <p className="text-sm text-[#8a9aa4] mt-0.5">{teamMembers.length} members</p>
                        </div>
                        <Button variant="primary" size="sm" onClick={() => setShowInviteModal(true)}>
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Invite
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        {teamMembers.length === 0 ? (
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FFD2C2]/20 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <p className="text-[#5a6b75]">No team members yet</p>
                                <p className="text-sm text-[#8a9aa4]">Invite your team to collaborate on hiring</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-[#e8e0dc]">
                                {teamMembers.map((member) => (
                                    <div key={member.id} className="p-4 hover:bg-[#FFD2C2]/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-white font-semibold">
                                                {member.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || member.email?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-[#1e2a32]">{member.name}</p>
                                                <p className="text-sm text-[#8a9aa4]">{member.email}</p>
                                            </div>
                                            <Select
                                                options={ROLE_OPTIONS}
                                                value={member.role}
                                                onChange={(value) => onUpdateRole?.(member.id, value)}
                                                className="w-36"
                                            />
                                            {member.role !== 'admin' && onRemove && (
                                                <button
                                                    onClick={() => onRemove(member.id)}
                                                    className="p-2 text-[#8a9aa4] hover:text-[#f87171] hover:bg-[#f87171]/10 rounded-lg transition-all"
                                                    title="Remove member"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pending Invites */}
                {pendingInvites.length > 0 && (
                    <Card variant="default" padding="none">
                        <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                            <CardTitle>Pending Invitations</CardTitle>
                            <Badge variant="warning">{pendingInvites.length}</Badge>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-[#e8e0dc]">
                                {pendingInvites.map((invite) => (
                                    <div key={invite.id} className="p-4 flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-xl bg-[#fbbf24]/20 flex items-center justify-center text-[#fbbf24]">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-[#1e2a32]">{invite.email}</p>
                                            <p className="text-xs text-[#8a9aa4]">Invited {invite.invitedAt} • {invite.role}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {onResendInvite && (
                                                <Button variant="ghost" size="sm" onClick={() => onResendInvite(invite.id)}>
                                                    Resend
                                                </Button>
                                            )}
                                            {onCancelInvite && (
                                                <button
                                                    onClick={() => onCancelInvite(invite.id)}
                                                    className="p-2 text-[#8a9aa4] hover:text-[#f87171] rounded-lg transition-all"
                                                    title="Cancel invite"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Activity Log */}
                {activityLog.length > 0 && (
                    <Card variant="default" padding="none">
                        <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 max-h-80 overflow-y-auto">
                            <div className="divide-y divide-[#e8e0dc]">
                                {activityLog.map((activity, idx) => (
                                    <div key={idx} className="p-4 flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.type === 'invite' ? 'bg-[#60a5fa]/10 text-[#60a5fa]' :
                                            activity.type === 'update' ? 'bg-[#789A99]/10 text-[#789A99]' :
                                                activity.type === 'remove' ? 'bg-[#f87171]/10 text-[#f87171]' :
                                                    'bg-[#e8e0dc] text-[#8a9aa4]'
                                            }`}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {activity.type === 'invite' ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                ) : activity.type === 'update' ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                )}
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-[#1e2a32]">{activity.message}</p>
                                            <p className="text-xs text-[#8a9aa4] mt-0.5">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Invite Modal */}
            <Modal
                isOpen={showInviteModal}
                onClose={() => setShowInviteModal(false)}
                title="Invite Team Member"
            >
                <div className="space-y-5">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="colleague@company.com"
                        value={inviteData.email}
                        onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                        required
                    />
                    <Select
                        label="Role"
                        options={ROLE_OPTIONS}
                        value={inviteData.role}
                        onChange={(value) => setInviteData({ ...inviteData, role: value })}
                    />
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Personal Message (optional)</label>
                        <textarea
                            value={inviteData.message}
                            onChange={(e) => setInviteData({ ...inviteData, message: e.target.value })}
                            placeholder="Add a personal note to the invitation..."
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors resize-none"
                        />
                    </div>
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowInviteModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleInvite} disabled={!inviteData.email}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send Invitation
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
