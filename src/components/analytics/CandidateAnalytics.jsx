import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '../ui';
import { BarChart, LineChart, PieChart, StatCard, SparkLine } from './ChartComponents';

// Mock data for candidate analytics
const MOCK_PROFILE_VIEWS = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 18 },
    { label: 'Wed', value: 25 },
    { label: 'Thu', value: 22 },
    { label: 'Fri', value: 30 },
    { label: 'Sat', value: 15 },
    { label: 'Sun', value: 8 },
];

const MOCK_APPLICATION_STATS = {
    total: 24,
    pending: 8,
    reviewing: 6,
    interviewing: 5,
    offered: 3,
    rejected: 2,
};

const MOCK_RESUME_VIEWS = [
    { company: 'TechCorp', date: '2 hours ago', duration: '2m 45s' },
    { company: 'DataFlow', date: '1 day ago', duration: '1m 30s' },
    { company: 'CloudBase', date: '2 days ago', duration: '3m 12s' },
    { company: 'StartupXYZ', date: '3 days ago', duration: '45s' },
];

const MOCK_ACTIVITY = [
    { type: 'application', text: 'Applied to Senior Frontend Developer at TechCorp', date: '2 hours ago' },
    { type: 'view', text: 'DataFlow viewed your profile', date: '1 day ago' },
    { type: 'interview', text: 'Interview scheduled with CloudBase', date: '2 days ago' },
    { type: 'update', text: 'Updated resume and skills', date: '3 days ago' },
    { type: 'application', text: 'Applied to Product Manager at StartupXYZ', date: '4 days ago' },
];

export default function CandidateAnalytics({ user }) {
    const [timeRange, setTimeRange] = useState('7d');

    const successRate = useMemo(() => {
        const successful = MOCK_APPLICATION_STATS.interviewing + MOCK_APPLICATION_STATS.offered;
        return ((successful / MOCK_APPLICATION_STATS.total) * 100).toFixed(1);
    }, []);

    const applicationPieData = [
        { label: 'Pending', value: MOCK_APPLICATION_STATS.pending, color: '#8a9aa4' },
        { label: 'Reviewing', value: MOCK_APPLICATION_STATS.reviewing, color: '#60a5fa' },
        { label: 'Interviewing', value: MOCK_APPLICATION_STATS.interviewing, color: '#fbbf24' },
        { label: 'Offered', value: MOCK_APPLICATION_STATS.offered, color: '#4ade80' },
        { label: 'Rejected', value: MOCK_APPLICATION_STATS.rejected, color: '#f87171' },
    ];

    const getActivityIcon = (type) => {
        switch (type) {
            case 'application': return '📄';
            case 'view': return '👁️';
            case 'interview': return '📅';
            case 'update': return '✏️';
            default: return '📌';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Your Analytics</h2>
                    <p className="text-sm text-[#5a6b75]">Track your job search performance</p>
                </div>
                <div className="flex gap-2">
                    {['7d', '30d', '90d'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${timeRange === range
                                    ? 'bg-[#789A99] text-white'
                                    : 'bg-[#f5f3f1] text-[#5a6b75] hover:bg-[#e8e0dc]'
                                }`}
                        >
                            {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Profile Views"
                    value="130"
                    change="+23%"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                    color="bg-[#60a5fa]"
                />
                <StatCard
                    label="Applications"
                    value={MOCK_APPLICATION_STATS.total}
                    change="+5"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    color="bg-[#789A99]"
                />
                <StatCard
                    label="Success Rate"
                    value={`${successRate}%`}
                    change="+8%"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    color="bg-[#4ade80]"
                />
                <StatCard
                    label="Interviews"
                    value={MOCK_APPLICATION_STATS.interviewing}
                    change="+2"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                    color="bg-[#fbbf24]"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Views Chart */}
                <div className="lg:col-span-2">
                    <Card variant="default" padding="lg">
                        <CardHeader>
                            <CardTitle>Profile Views Over Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LineChart data={MOCK_PROFILE_VIEWS} height={200} showArea={true} />
                        </CardContent>
                    </Card>
                </div>

                {/* Application Status Pie */}
                <Card variant="default" padding="lg">
                    <CardHeader>
                        <CardTitle>Application Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <PieChart data={applicationPieData} size={150} showLegend={false} />
                    </CardContent>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {applicationPieData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-xs text-[#5a6b75]">{item.label}: {item.value}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Resume Views */}
                <Card variant="default" padding="none">
                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                        <CardTitle>Recent Resume Views</CardTitle>
                        <Badge variant="info" size="sm">{MOCK_RESUME_VIEWS.length} views</Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-[#e8e0dc]">
                            {MOCK_RESUME_VIEWS.map((view, idx) => (
                                <div key={idx} className="p-4 flex items-center justify-between hover:bg-[#FFD2C2]/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#789A99]/10 flex items-center justify-center text-[#789A99] font-semibold">
                                            {view.company.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#1e2a32]">{view.company}</p>
                                            <p className="text-xs text-[#8a9aa4]">{view.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-[#789A99]">{view.duration}</p>
                                        <p className="text-xs text-[#8a9aa4]">view time</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Timeline */}
                <Card variant="default" padding="none">
                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-[#e8e0dc]">
                            {MOCK_ACTIVITY.map((activity, idx) => (
                                <div key={idx} className="p-4 flex items-start gap-3 hover:bg-[#FFD2C2]/10 transition-colors">
                                    <span className="text-xl">{getActivityIcon(activity.type)}</span>
                                    <div className="flex-1">
                                        <p className="text-sm text-[#1e2a32]">{activity.text}</p>
                                        <p className="text-xs text-[#8a9aa4] mt-1">{activity.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Comparison Card */}
            <Card variant="gradient" padding="lg" className="bg-gradient-to-br from-[#789A99]/10 to-[#FFD2C2]/10">
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="font-semibold text-[#1e2a32]">📊 How do you compare?</h3>
                            <p className="text-sm text-[#5a6b75] mt-1">Your profile views are 15% higher than similar candidates in your field.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#789A99]">Top 25%</p>
                                <p className="text-xs text-[#8a9aa4]">Profile Visibility</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#4ade80]">+15%</p>
                                <p className="text-xs text-[#8a9aa4]">vs Average</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
