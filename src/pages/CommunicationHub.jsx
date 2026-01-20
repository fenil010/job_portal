import { useState, useCallback, useMemo } from 'react';
import { DashboardLayout } from '../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Tabs, TabsList, TabsTrigger, TabsContent, Modal, ModalFooter, useToast } from '../components/ui';
import {
    ConversationView,
    NotificationCenter,
    NotificationPreferences,
    SMSSettings,
    VideoInterviewSetup,
    InterviewFeedbackForm,
    FeedbackSummary,
    TemplateManager,
} from '../components/communication';
import {
    mockCandidates,
    mockConversations,
    mockInterviews,
    mockTeamMembers,
} from '../data/mockData';
import * as notificationService from '../utils/notificationService';
import * as videoIntegration from '../utils/videoIntegration';

// Mock extended conversations with messages
const mockMessages = [
    { id: 1, senderId: 'recruiter', senderName: 'HR Manager', content: 'Hi Sarah, thank you for applying for the Senior Frontend Developer position.', timestamp: '2026-01-18T10:00:00', status: 'read' },
    { id: 2, senderId: 1, senderName: 'Sarah Connor', content: 'Thank you! I am very excited about this opportunity.', timestamp: '2026-01-18T10:15:00', status: 'read' },
    { id: 3, senderId: 'recruiter', senderName: 'HR Manager', content: 'We were impressed with your resume. Would you be available for an interview next week?', timestamp: '2026-01-18T14:30:00', status: 'read' },
    { id: 4, senderId: 1, senderName: 'Sarah Connor', content: 'Yes, I am available. What times work best for you?', timestamp: '2026-01-18T15:00:00', status: 'read' },
    { id: 5, senderId: 'recruiter', senderName: 'HR Manager', content: 'How about Wednesday at 2 PM EST?', timestamp: '2026-01-19T09:00:00', status: 'delivered' },
];

// Mock notifications
const mockNotifications = [
    { id: 1, type: 'interview', title: 'Interview Scheduled', message: 'Your interview with Sarah Connor is scheduled for Jan 22, 2:00 PM', time: '2 hours ago', isRead: false, channel: 'in-app' },
    { id: 2, type: 'application', title: 'New Application', message: 'Alex Chen applied for DevOps Engineer position', time: '5 hours ago', isRead: false, channel: 'email' },
    { id: 3, type: 'message', title: 'New Message', message: 'Jane Smith replied to your message about the offer', time: '1 day ago', isRead: true, channel: 'in-app' },
    { id: 4, type: 'feedback', title: 'Feedback Submitted', message: 'Tech Lead submitted feedback for John Wick', time: '2 days ago', isRead: true, channel: 'in-app' },
];

// Mock feedback data
const mockFeedbackList = [
    { id: 1, reviewerName: 'Tech Lead', date: 'Jan 20, 2026', overallRating: 4, technicalSkills: 5, communication: 4, cultureFit: 4, problemSolving: 4, strengths: 'Excellent technical skills, great problem-solving ability', recommendation: 'yes' },
    { id: 2, reviewerName: 'HR Manager', date: 'Jan 20, 2026', overallRating: 4, technicalSkills: 4, communication: 5, cultureFit: 5, problemSolving: 3, strengths: 'Great communication and cultural fit', recommendation: 'strong_yes' },
];

export default function CommunicationHub({ onNavigate, user }) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('messages');
    const [conversations, setConversations] = useState(mockConversations);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState(mockMessages);
    const [notifications, setNotifications] = useState(mockNotifications);
    const [notificationPrefs, setNotificationPrefs] = useState(notificationService.getPreferences());
    const [showPreferencesModal, setShowPreferencesModal] = useState(false);
    const [showSMSModal, setShowSMSModal] = useState(false);
    const [showVideoSetup, setShowVideoSetup] = useState(false);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [selectedInterview, setSelectedInterview] = useState(null);

    // Stats
    const stats = useMemo(() => ({
        unreadMessages: conversations.filter(c => !c.read).length,
        unreadNotifications: notifications.filter(n => !n.isRead).length,
        pendingInterviews: mockInterviews.filter(i => i.status === 'scheduled').length,
        pendingFeedback: 2,
    }), [conversations, notifications]);

    // Message handlers
    const handleSendMessage = useCallback((messageData) => {
        const newMessage = {
            id: Date.now(),
            senderId: 'recruiter',
            senderName: user?.name || 'HR Manager',
            ...messageData,
            status: 'sent',
        };
        setMessages(prev => [...prev, newMessage]);
        toast.success('Message sent!');
    }, [user, toast]);

    const handleSelectConversation = useCallback((conv) => {
        setSelectedConversation({
            ...conv,
            participant: mockCandidates.find(c => c.id === conv.candidateId) || { name: conv.candidateName },
        });
        setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, read: true } : c));
    }, []);

    // Notification handlers
    const handleMarkRead = useCallback((id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    }, []);

    const handleMarkAllRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        toast.success('All notifications marked as read');
    }, [toast]);

    const handleDeleteNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const handleClearNotifications = useCallback(() => {
        setNotifications([]);
        toast.info('All notifications cleared');
    }, [toast]);

    // Preferences handlers
    const handleSavePreferences = useCallback((prefs) => {
        setNotificationPrefs(prefs);
        notificationService.savePreferences(prefs);
        setShowPreferencesModal(false);
        toast.success('Preferences saved!');
    }, [toast]);

    // Video interview handlers
    const handleGenerateLink = useCallback(async (platform) => {
        const link = await videoIntegration.generateMeetingLink(platform);
        toast.success('Meeting link generated!');
        return link;
    }, [toast]);

    const handleSaveVideoSettings = useCallback((settings) => {
        setShowVideoSetup(false);
        toast.success('Interview settings saved!');
    }, [toast]);

    // Feedback handlers
    const handleSubmitFeedback = useCallback((feedback) => {
        setShowFeedbackForm(false);
        toast.success('Feedback submitted!');
    }, [toast]);

    const handleOpenFeedback = useCallback((candidate, interview) => {
        setSelectedCandidate(candidate);
        setSelectedInterview(interview);
        setShowFeedbackForm(true);
    }, []);

    return (
        <DashboardLayout activeItem="Messages" onNavigate={onNavigate} user={user}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-fade-in-down">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1e2a32]">Communication Hub</h1>
                        <p className="mt-1 text-[#5a6b75]">Manage all your communications in one place</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowSMSModal(true)}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            SMS Settings
                        </Button>
                        <Button variant="primary" onClick={() => setShowVideoSetup(true)}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Schedule Video Interview
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Unread Messages', value: stats.unreadMessages, icon: '💬', color: 'bg-[#60a5fa]' },
                        { label: 'Notifications', value: stats.unreadNotifications, icon: '🔔', color: 'bg-[#fbbf24]' },
                        { label: 'Pending Interviews', value: stats.pendingInterviews, icon: '📅', color: 'bg-[#4ade80]' },
                        { label: 'Pending Feedback', value: stats.pendingFeedback, icon: '📝', color: 'bg-[#a78bfa]' },
                    ].map((stat, idx) => (
                        <Card key={idx} variant="default" padding="md" hover className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center text-xl`}>{stat.icon}</div>
                                    <div>
                                        <p className="text-2xl font-bold text-[#1e2a32]">{stat.value}</p>
                                        <p className="text-xs text-[#8a9aa4]">{stat.label}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
                    <TabsList className="mb-6">
                        <TabsTrigger value="messages">
                            Messages
                            {stats.unreadMessages > 0 && <Badge variant="danger" size="sm" className="ml-2">{stats.unreadMessages}</Badge>}
                        </TabsTrigger>
                        <TabsTrigger value="notifications">
                            Notifications
                            {stats.unreadNotifications > 0 && <Badge variant="warning" size="sm" className="ml-2">{stats.unreadNotifications}</Badge>}
                        </TabsTrigger>
                        <TabsTrigger value="interviews">Video Interviews</TabsTrigger>
                        <TabsTrigger value="feedback">Feedback</TabsTrigger>
                        <TabsTrigger value="templates">Templates</TabsTrigger>
                    </TabsList>

                    {/* Messages Tab */}
                    <TabsContent value="messages">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ minHeight: '500px' }}>
                            {/* Conversation List */}
                            <Card variant="default" padding="none" className="lg:col-span-1">
                                <CardHeader className="p-4 border-b-2 border-[#e8e0dc]">
                                    <CardTitle>Conversations</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-[#e8e0dc]">
                                        {conversations.map((conv) => (
                                            <button
                                                key={conv.id}
                                                onClick={() => handleSelectConversation(conv)}
                                                className={`w-full p-4 text-left hover:bg-[#FFD2C2]/10 transition-colors ${selectedConversation?.id === conv.id ? 'bg-[#789A99]/5' : ''} ${!conv.read ? 'bg-[#789A99]/5' : ''}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                                        {conv.candidateName?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <p className={`font-medium text-[#1e2a32] truncate ${!conv.read ? 'font-semibold' : ''}`}>{conv.candidateName}</p>
                                                            <span className="text-xs text-[#8a9aa4] flex-shrink-0 ml-2">{conv.time}</span>
                                                        </div>
                                                        <p className="text-sm text-[#5a6b75] font-medium truncate">{conv.subject}</p>
                                                        <p className="text-sm text-[#8a9aa4] truncate">{conv.preview}</p>
                                                    </div>
                                                    {!conv.read && <div className="w-2 h-2 rounded-full bg-[#789A99] flex-shrink-0 mt-2" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Conversation View */}
                            <div className="lg:col-span-2">
                                {selectedConversation ? (
                                    <ConversationView
                                        conversation={selectedConversation}
                                        messages={messages}
                                        currentUserId="recruiter"
                                        onSendMessage={handleSendMessage}
                                        onBack={() => setSelectedConversation(null)}
                                    />
                                ) : (
                                    <Card variant="default" padding="lg" className="h-full flex items-center justify-center">
                                        <CardContent className="text-center">
                                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#FFD2C2]/20 flex items-center justify-center">
                                                <svg className="w-10 h-10 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                            </div>
                                            <p className="text-lg font-medium text-[#1e2a32]">Select a conversation</p>
                                            <p className="text-sm text-[#8a9aa4] mt-1">Choose a conversation from the list to view messages</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications">
                        <NotificationCenter
                            notifications={notifications}
                            onMarkRead={handleMarkRead}
                            onMarkAllRead={handleMarkAllRead}
                            onDelete={handleDeleteNotification}
                            onClearAll={handleClearNotifications}
                            onOpenPreferences={() => setShowPreferencesModal(true)}
                        />
                    </TabsContent>

                    {/* Video Interviews Tab */}
                    <TabsContent value="interviews">
                        <div className="space-y-6">
                            <Card variant="default" padding="none">
                                <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                    <CardTitle>Scheduled Video Interviews</CardTitle>
                                    <Button variant="primary" size="sm" onClick={() => setShowVideoSetup(true)}>
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Schedule New
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-[#e8e0dc]">
                                        {mockInterviews.map((interview) => (
                                            <div key={interview.id} className="p-4 hover:bg-[#FFD2C2]/5 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-[#2D8CFF] flex items-center justify-center text-2xl">📹</div>
                                                        <div>
                                                            <p className="font-semibold text-[#1e2a32]">{interview.candidateName}</p>
                                                            <p className="text-sm text-[#5a6b75]">{interview.date} at {interview.time}</p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Badge variant="info" size="sm">{interview.type}</Badge>
                                                                <Badge variant={interview.status === 'scheduled' ? 'success' : 'default'} size="sm">{interview.status}</Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm">Edit</Button>
                                                        <Button variant="primary" size="sm">Join</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Feedback Tab */}
                    <TabsContent value="feedback">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Pending Feedback */}
                            <Card variant="default" padding="none">
                                <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                    <CardTitle>Pending Feedback</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-[#e8e0dc]">
                                        {mockCandidates.filter(c => c.stage === 'interview').slice(0, 3).map((candidate) => (
                                            <div key={candidate.id} className="p-4 hover:bg-[#FFD2C2]/5 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD2C2] to-[#f0b8a8] flex items-center justify-center text-white font-semibold text-sm">
                                                            {candidate.avatar}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-[#1e2a32]">{candidate.name}</p>
                                                            <p className="text-sm text-[#8a9aa4]">{candidate.title}</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" onClick={() => handleOpenFeedback(candidate, mockInterviews[0])}>
                                                        Submit Feedback
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Feedback Summary */}
                            <FeedbackSummary
                                candidate={mockCandidates[0]}
                                feedbackList={mockFeedbackList}
                            />
                        </div>
                    </TabsContent>

                    {/* Templates Tab */}
                    <TabsContent value="templates">
                        <TemplateManager
                            onSave={(template) => toast.success('Template saved!')}
                            onDelete={(id) => toast.info('Template deleted')}
                            onUseTemplate={(template) => {
                                setActiveTab('messages');
                                toast.info(`Using template: ${template.name}`);
                            }}
                        />
                    </TabsContent>
                </Tabs>
            </div>

            {/* Preferences Modal */}
            <Modal
                isOpen={showPreferencesModal}
                onClose={() => setShowPreferencesModal(false)}
                title="Notification Preferences"
                size="lg"
            >
                <NotificationPreferences
                    preferences={notificationPrefs}
                    onSave={handleSavePreferences}
                    onCancel={() => setShowPreferencesModal(false)}
                />
            </Modal>

            {/* SMS Settings Modal */}
            <Modal
                isOpen={showSMSModal}
                onClose={() => setShowSMSModal(false)}
                title="SMS Settings"
                size="lg"
            >
                <SMSSettings
                    onSavePhone={(phone) => toast.success('Phone saved!')}
                    onVerify={(code) => {
                        toast.success('Phone verified!');
                        return Promise.resolve(true);
                    }}
                    onSavePreferences={(prefs) => toast.success('SMS preferences saved!')}
                    onSendTestSMS={() => toast.success('Test SMS sent!')}
                />
            </Modal>

            {/* Video Setup Modal */}
            <Modal
                isOpen={showVideoSetup}
                onClose={() => setShowVideoSetup(false)}
                title="Schedule Video Interview"
                size="xl"
            >
                <VideoInterviewSetup
                    teamMembers={mockTeamMembers}
                    onGenerateLink={handleGenerateLink}
                    onSave={handleSaveVideoSettings}
                    onSendInvite={() => toast.success('Interview invite sent!')}
                />
            </Modal>

            {/* Feedback Form Modal */}
            <Modal
                isOpen={showFeedbackForm}
                onClose={() => setShowFeedbackForm(false)}
                title="Interview Feedback"
                size="xl"
            >
                <InterviewFeedbackForm
                    candidate={selectedCandidate}
                    interview={selectedInterview}
                    onSubmit={handleSubmitFeedback}
                    onSaveDraft={(draft) => toast.info('Draft saved')}
                    onCancel={() => setShowFeedbackForm(false)}
                />
            </Modal>
        </DashboardLayout>
    );
}
