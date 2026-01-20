import { useState } from 'react';
import { Button, Badge } from '../ui';

const QUICK_REPLIES = [
    { id: 1, text: 'Thank you for your application. We will review it and get back to you soon.', category: 'acknowledgment' },
    { id: 2, text: 'Could you please provide your availability for an interview next week?', category: 'scheduling' },
    { id: 3, text: 'We have received the documents. Thank you!', category: 'acknowledgment' },
    { id: 4, text: 'Please let us know if you have any questions about the position.', category: 'general' },
    { id: 5, text: 'We are currently reviewing all applications and will update you by end of this week.', category: 'status' },
];

export default function QuickReplyPanel({ onSelectReply, onUseTemplate, templates = [], recentReplies = [] }) {
    const [activeTab, setActiveTab] = useState('quick');

    const tabs = [
        { value: 'quick', label: 'Quick Replies' },
        { value: 'templates', label: 'Templates' },
        { value: 'recent', label: 'Recent' },
    ];

    return (
        <div className="bg-white border-2 border-[#e8e0dc] rounded-xl shadow-lg overflow-hidden">
            <div className="flex border-b border-[#e8e0dc]">
                {tabs.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.value
                                ? 'text-[#789A99] border-b-2 border-[#789A99] -mb-px'
                                : 'text-[#8a9aa4] hover:text-[#5a6b75]'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="max-h-64 overflow-y-auto">
                {activeTab === 'quick' && (
                    <div className="p-2 space-y-1">
                        {QUICK_REPLIES.map(reply => (
                            <button
                                key={reply.id}
                                onClick={() => onSelectReply?.(reply.text)}
                                className="w-full p-3 text-left text-sm text-[#1e2a32] hover:bg-[#FFD2C2]/10 rounded-lg transition-colors"
                            >
                                <p className="line-clamp-2">{reply.text}</p>
                            </button>
                        ))}
                    </div>
                )}

                {activeTab === 'templates' && (
                    <div className="p-2 space-y-1">
                        {templates.length > 0 ? templates.slice(0, 5).map(template => (
                            <button
                                key={template.id}
                                onClick={() => onUseTemplate?.(template)}
                                className="w-full p-3 text-left hover:bg-[#FFD2C2]/10 rounded-lg transition-colors"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="info" size="sm">{template.category}</Badge>
                                    <span className="text-sm font-medium text-[#1e2a32]">{template.name}</span>
                                </div>
                                <p className="text-xs text-[#8a9aa4] truncate">{template.subject}</p>
                            </button>
                        )) : (
                            <div className="p-4 text-center text-sm text-[#8a9aa4]">No templates available</div>
                        )}
                    </div>
                )}

                {activeTab === 'recent' && (
                    <div className="p-2 space-y-1">
                        {recentReplies.length > 0 ? recentReplies.map((reply, idx) => (
                            <button
                                key={idx}
                                onClick={() => onSelectReply?.(reply.text)}
                                className="w-full p-3 text-left text-sm text-[#1e2a32] hover:bg-[#FFD2C2]/10 rounded-lg transition-colors"
                            >
                                <p className="line-clamp-2">{reply.text}</p>
                                <p className="text-xs text-[#8a9aa4] mt-1">{reply.time}</p>
                            </button>
                        )) : (
                            <div className="p-4 text-center text-sm text-[#8a9aa4]">No recent replies</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
