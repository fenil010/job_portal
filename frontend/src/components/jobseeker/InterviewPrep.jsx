import { useState } from 'react';
import { Badge, Button } from '../ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui';

export default function InterviewPrep({ resources }) {
    const [activeTab, setActiveTab] = useState('behavioral');
    const [checkedItems, setCheckedItems] = useState({});

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

    const getTypeGradient = (type) => {
        const gradients = {
            guide: 'from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300',
            practice: 'from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-300',
            video: 'from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-300',
            course: 'from-purple-50 to-violet-50 border-purple-200 hover:border-purple-300',
            template: 'from-slate-50 to-gray-50 border-slate-200 hover:border-slate-300',
        };
        return gradients[type] || gradients.template;
    };

    const toggleCheck = (idx) => {
        setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="behavioral">
                        <span className="mr-1.5">🎭</span>Behavioral
                    </TabsTrigger>
                    <TabsTrigger value="technical">
                        <span className="mr-1.5">💻</span>Technical
                    </TabsTrigger>
                    <TabsTrigger value="general">
                        <span className="mr-1.5">📋</span>General
                    </TabsTrigger>
                </TabsList>

                {Object.entries(allResources).map(([key, items]) => (
                    <TabsContent key={key} value={key} className="mt-4">
                        <div className="space-y-3">
                            {items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center gap-4 p-4 bg-gradient-to-r ${getTypeGradient(item.type)} rounded-2xl border-2 transition-all duration-300 cursor-pointer group hover:shadow-md animate-fade-in-up`}
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <h4 className="font-bold text-[#1e2a32] group-hover:text-[#789A99] transition-colors">{item.title}</h4>
                                            <Badge variant={getTypeColor(item.type)} size="sm" className="uppercase text-xs font-semibold">
                                                {item.type}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-[#5a6b75]">{item.description}</p>
                                    </div>
                                    <Button size="sm" variant="primary" className="shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="mr-1">Start</span>
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
            <div className="p-5 bg-gradient-to-br from-[#789A99]/10 via-white to-[#FFD2C2]/10 rounded-2xl border border-[#e8e0dc] shadow-sm animate-fade-in-up">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-[#1e2a32] flex items-center gap-2">
                        <span className="w-8 h-8 bg-gradient-to-br from-[#789A99] to-[#5f7d7c] rounded-xl flex items-center justify-center shadow-sm">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        Pre-Interview Checklist
                    </h4>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${completedCount === 5 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                        {completedCount}/5 completed
                    </span>
                </div>
                <div className="space-y-2">
                    {[
                        'Research the company and role',
                        'Prepare 3-5 questions to ask',
                        'Review your resume and portfolio',
                        'Test your tech setup (for virtual)',
                        'Prepare your STAR stories',
                    ].map((item, idx) => (
                        <label
                            key={idx}
                            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-all ${checkedItems[idx] ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-white border-2 border-gray-100 hover:border-[#789A99]/30'}`}
                            onClick={() => toggleCheck(idx)}
                        >
                            <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${checkedItems[idx] ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                                {checkedItems[idx] && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span className={`text-sm font-medium ${checkedItems[idx] ? 'text-emerald-700 line-through' : 'text-[#5a6b75]'}`}>
                                {item}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
