import { useState } from 'react';
import { Badge, Button } from '../ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui';

export default function InterviewPrep({ resources }) {
    const [activeTab, setActiveTab] = useState('behavioral');

    const defaultResources = {
        behavioral: [
            { title: 'STAR Method Guide', description: 'Structure answers effectively', type: 'guide', icon: '⭐' },
            { title: 'Top 50 Behavioral Questions', description: 'Common questions with sample answers', type: 'practice', icon: '❓' },
            { title: 'Body Language Tips', description: 'Non-verbal communication tips', type: 'video', icon: '🎬' },
        ],
        technical: [
            { title: 'Data Structures & Algorithms', description: 'Essential CS concepts', type: 'course', icon: '💻' },
            { title: 'System Design Primer', description: 'Large-scale architecture', type: 'guide', icon: '🏗️' },
            { title: 'LeetCode Practice', description: 'Coding challenges', type: 'practice', icon: '🧩' },
        ],
        general: [
            { title: 'Company Research Template', description: 'How to research companies', type: 'template', icon: '🔍' },
            { title: 'Salary Negotiation Script', description: 'Negotiate confidently', type: 'guide', icon: '💰' },
            { title: 'Thank You Email Templates', description: 'Post-interview follow-up', type: 'template', icon: '📧' },
        ],
    };

    const allResources = resources || defaultResources;

    const getTypeColor = (type) => {
        const colors = {
            guide: 'info',
            practice: 'success',
            video: 'warning',
            course: 'primary',
            template: 'secondary',
        };
        return colors[type] || 'secondary';
    };

    return (
        <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                    <TabsTrigger value="technical">Technical</TabsTrigger>
                    <TabsTrigger value="general">General</TabsTrigger>
                </TabsList>

                {Object.entries(allResources).map(([key, items]) => (
                    <TabsContent key={key} value={key}>
                        <div className="space-y-3">
                            {items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-[#e8e0dc] hover:border-[#789A99] transition-colors cursor-pointer group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#FFD2C2]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-medium text-[#1e2a32]">{item.title}</h4>
                                            <Badge variant={getTypeColor(item.type)} size="sm">{item.type}</Badge>
                                        </div>
                                        <p className="text-sm text-[#5a6b75]">{item.description}</p>
                                    </div>
                                    <Button size="sm" variant="ghost">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            {/* Interview Checklist */}
            <div className="p-4 bg-[#789A99]/5 rounded-xl">
                <h4 className="font-semibold text-[#1e2a32] mb-3">Pre-Interview Checklist</h4>
                <div className="space-y-2">
                    {[
                        'Research the company and role',
                        'Prepare 3-5 questions to ask',
                        'Review your resume and portfolio',
                        'Test your tech setup (for virtual)',
                        'Prepare your STAR stories',
                    ].map((item, idx) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-[#e8e0dc] text-[#789A99] focus:ring-[#789A99]" />
                            <span className="text-sm text-[#5a6b75]">{item}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
