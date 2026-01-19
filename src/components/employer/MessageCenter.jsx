import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Modal, ModalFooter, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '../ui';

const DEFAULT_TEMPLATES = [
    {
        id: 1,
        name: 'Interview Invitation',
        subject: 'Interview Invitation - {{position}} at {{company}}',
        body: `Dear {{candidate_name}},

Thank you for applying for the {{position}} position at {{company}}. We were impressed with your background and would like to invite you for an interview.

Please let us know your availability for the following week, and we will schedule a convenient time.

Best regards,
{{recruiter_name}}
{{company}}`,
        type: 'interview',
    },
    {
        id: 2,
        name: 'Application Received',
        subject: 'Application Received - {{position}}',
        body: `Dear {{candidate_name}},

Thank you for your interest in the {{position}} role at {{company}}. We have received your application and our team is currently reviewing it.

We will be in touch soon regarding the next steps.

Best regards,
The {{company}} Team`,
        type: 'confirmation',
    },
    {
        id: 3,
        name: 'Rejection - After Interview',
        subject: 'Update on Your Application - {{company}}',
        body: `Dear {{candidate_name}},

Thank you for taking the time to interview with us for the {{position}} position. After careful consideration, we have decided to move forward with another candidate whose experience more closely matches our current needs.

We appreciate your interest in {{company}} and encourage you to apply for future positions that match your qualifications.

Best of luck in your job search.

Best regards,
{{recruiter_name}}
{{company}}`,
        type: 'rejection',
    },
    {
        id: 4,
        name: 'Offer Letter',
        subject: 'Job Offer - {{position}} at {{company}}',
        body: `Dear {{candidate_name}},

Congratulations! We are pleased to offer you the position of {{position}} at {{company}}.

We were very impressed with your qualifications and believe you will be a great addition to our team.

Please review the attached offer details and let us know your decision by {{deadline}}.

Best regards,
{{recruiter_name}}
{{company}}`,
        type: 'offer',
    },
];

export default function MessageCenter({
    candidates = [],
    conversations = [],
    templates = DEFAULT_TEMPLATES,
    onSendMessage,
    onCreateTemplate,
    onUpdateTemplate,
    onDeleteTemplate,
}) {
    const [activeTab, setActiveTab] = useState('inbox');
    const [showComposeModal, setShowComposeModal] = useState(false);
    const [showTemplateModal, setShowTemplateModal] = useState(false);


    const [composeData, setComposeData] = useState({
        recipients: [],
        subject: '',
        body: '',
        templateId: '',
    });

    const [editingTemplate, setEditingTemplate] = useState(null);

    const handleSend = () => {
        if (!composeData.recipients.length || !composeData.subject || !composeData.body) return;
        onSendMessage?.(composeData);
        setShowComposeModal(false);
        setComposeData({ recipients: [], subject: '', body: '', templateId: '' });
    };

    const handleUseTemplate = (template) => {
        setComposeData({
            ...composeData,
            subject: template.subject,
            body: template.body,
            templateId: template.id,
        });
        setShowComposeModal(true);
    };

    const getTypeColor = (type) => {
        const colors = {
            interview: 'info',
            confirmation: 'success',
            rejection: 'danger',
            offer: 'primary',
            general: 'default',
        };
        return colors[type] || 'default';
    };

    return (
        <>
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="primary" onClick={() => setShowComposeModal(true)}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Compose
                        </Button>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="inbox">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Messages
                        </TabsTrigger>
                        <TabsTrigger value="templates">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                            Templates
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="inbox" className="mt-4">
                        <Card variant="default" padding="none">
                            <CardContent className="p-0">
                                {conversations.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#FFD2C2]/20 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-lg font-medium text-[#1e2a32]">No messages yet</p>
                                        <p className="text-sm text-[#8a9aa4] mt-1">Start communicating with candidates</p>
                                        <Button variant="primary" size="sm" className="mt-4" onClick={() => setShowComposeModal(true)}>
                                            Compose Message
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-[#e8e0dc]">
                                        {conversations.map((conv) => (
                                            <div key={conv.id} className={`p-4 hover:bg-[#FFD2C2]/10 cursor-pointer transition-colors ${!conv.read ? 'bg-[#789A99]/5' : ''}`}>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                                        {conv.candidateName?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <p className={`font-medium text-[#1e2a32] ${!conv.read ? 'font-semibold' : ''}`}>
                                                                {conv.candidateName}
                                                            </p>
                                                            <span className="text-xs text-[#8a9aa4]">{conv.time}</span>
                                                        </div>
                                                        <p className="text-sm text-[#5a6b75] font-medium truncate">{conv.subject}</p>
                                                        <p className="text-sm text-[#8a9aa4] truncate">{conv.preview}</p>
                                                    </div>
                                                    {!conv.read && (
                                                        <div className="w-2 h-2 rounded-full bg-[#789A99] flex-shrink-0 mt-2" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="templates" className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {templates.map((template) => (
                                <Card key={template.id} variant="default" padding="none" hover className="group">
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <Badge variant={getTypeColor(template.type)} size="sm" className="mb-2">
                                                    {template.type}
                                                </Badge>
                                                <h4 className="font-semibold text-[#1e2a32]">{template.name}</h4>
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => {
                                                        setEditingTemplate(template);
                                                        setShowTemplateModal(true);
                                                    }}
                                                    className="p-1.5 text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#789A99]/10 rounded-lg transition-all"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-[#8a9aa4] mb-1">Subject:</p>
                                        <p className="text-sm text-[#5a6b75] mb-3 truncate">{template.subject}</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            onClick={() => handleUseTemplate(template)}
                                        >
                                            Use Template
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Add Template Card */}
                            <button
                                onClick={() => {
                                    setEditingTemplate(null);
                                    setShowTemplateModal(true);
                                }}
                                className="p-8 rounded-2xl border-2 border-dashed border-[#e8e0dc] hover:border-[#789A99] hover:bg-[#789A99]/5 transition-all flex flex-col items-center justify-center text-[#8a9aa4] hover:text-[#789A99]"
                            >
                                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="font-medium">Create Template</span>
                            </button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Compose Modal */}
            <Modal
                isOpen={showComposeModal}
                onClose={() => setShowComposeModal(false)}
                title="Compose Message"
                size="lg"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Recipients</label>
                        <Select
                            options={candidates.map((c) => ({ value: c.id, label: `${c.name} (${c.email})` }))}
                            value={composeData.recipients[0] || ''}
                            onChange={(value) => setComposeData({ ...composeData, recipients: [value] })}
                            placeholder="Select candidate..."
                        />
                    </div>
                    <Input
                        label="Subject"
                        value={composeData.subject}
                        onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                        placeholder="Enter subject..."
                    />
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Message</label>
                        <textarea
                            value={composeData.body}
                            onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
                            placeholder="Write your message..."
                            rows={8}
                            className="w-full px-4 py-3 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors resize-none"
                        />
                    </div>
                    <p className="text-xs text-[#8a9aa4]">
                        Tip: Use variables like {"{{candidate_name}}"}, {"{{position}}"}, {"{{company}}"} for personalization
                    </p>
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowComposeModal(false)}>Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={handleSend}
                        disabled={!composeData.recipients.length || !composeData.subject}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Template Modal */}
            <Modal
                isOpen={showTemplateModal}
                onClose={() => {
                    setShowTemplateModal(false);
                    setEditingTemplate(null);
                }}
                title={editingTemplate ? 'Edit Template' : 'Create Template'}
                size="lg"
            >
                <div className="space-y-4">
                    <Input
                        label="Template Name"
                        value={editingTemplate?.name || ''}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                        placeholder="e.g. Interview Invitation"
                    />
                    <Select
                        label="Template Type"
                        options={[
                            { value: 'interview', label: 'Interview' },
                            { value: 'confirmation', label: 'Confirmation' },
                            { value: 'rejection', label: 'Rejection' },
                            { value: 'offer', label: 'Offer' },
                            { value: 'general', label: 'General' },
                        ]}
                        value={editingTemplate?.type || 'general'}
                        onChange={(value) => setEditingTemplate({ ...editingTemplate, type: value })}
                    />
                    <Input
                        label="Subject Line"
                        value={editingTemplate?.subject || ''}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                        placeholder="Email subject..."
                    />
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Template Body</label>
                        <textarea
                            value={editingTemplate?.body || ''}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                            placeholder="Template content..."
                            rows={10}
                            className="w-full px-4 py-3 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors resize-none font-mono text-sm"
                        />
                    </div>
                </div>
                <ModalFooter>
                    {editingTemplate?.id && onDeleteTemplate && (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                onDeleteTemplate(editingTemplate.id);
                                setShowTemplateModal(false);
                                setEditingTemplate(null);
                            }}
                            className="text-[#f87171] mr-auto"
                        >
                            Delete
                        </Button>
                    )}
                    <Button variant="ghost" onClick={() => {
                        setShowTemplateModal(false);
                        setEditingTemplate(null);
                    }}>Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (editingTemplate?.id) {
                                onUpdateTemplate?.(editingTemplate);
                            } else {
                                onCreateTemplate?.(editingTemplate);
                            }
                            setShowTemplateModal(false);
                            setEditingTemplate(null);
                        }}
                    >
                        {editingTemplate?.id ? 'Save Changes' : 'Create Template'}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
