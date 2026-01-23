import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Select } from '../ui';
import { BarChart, LineChart, PieChart, FunnelChart, StatCard } from './ChartComponents';

// Mock data
const MOCK_JOB_METRICS = [
    { id: 1, title: 'Senior Frontend Developer', views: 1250, applications: 89, qualified: 45, interviews: 12, offers: 4, conversion: 7.1 },
    { id: 2, title: 'Product Manager', views: 980, applications: 62, qualified: 28, interviews: 8, offers: 2, conversion: 6.3 },
    { id: 3, title: 'DevOps Engineer', views: 756, applications: 41, qualified: 22, interviews: 6, offers: 2, conversion: 5.4 },
    { id: 4, title: 'UI/UX Designer', views: 542, applications: 35, qualified: 18, interviews: 5, offers: 1, conversion: 6.5 },
];

const MOCK_QUALITY_DATA = [
    { range: '90-100', count: 12, label: 'Excellent' },
    { range: '80-89', count: 28, label: 'Good' },
    { range: '70-79', count: 45, label: 'Average' },
    { range: '60-69', count: 32, label: 'Below Avg' },
    { range: '<60', count: 15, label: 'Poor' },
];

const MOCK_SOURCES = [
    { source: 'Direct', count: 85, quality: 72, cost: 0 },
    { source: 'LinkedIn', count: 62, quality: 78, cost: 450 },
    { source: 'Indeed', count: 48, quality: 65, cost: 320 },
    { source: 'Referral', count: 32, quality: 85, cost: 500 },
    { source: 'Other', count: 18, quality: 60, cost: 120 },
];

const MOCK_TEAM_METRICS = [
    { name: 'Sarah Johnson', role: 'Recruiter', candidates: 45, interviews: 28, hires: 8, avgTime: 18 },
    { name: 'Mike Chen', role: 'Tech Lead', candidates: 0, interviews: 35, hires: 0, avgTime: 0 },
    { name: 'Emily Davis', role: 'HR Manager', candidates: 32, interviews: 15, hires: 5, avgTime: 22 },
];

const MOCK_HIRING_TREND = [
    { label: 'Jan', value: 5 },
    { label: 'Feb', value: 8 },
    { label: 'Mar', value: 6 },
    { label: 'Apr', value: 12 },
    { label: 'May', value: 10 },
    { label: 'Jun', value: 15 },
];

export default function EmployerAnalytics({ stats = {}, onExport }) {
    const [timeRange, setTimeRange] = useState('30d');
    const [selectedJob, setSelectedJob] = useState('all');

    const aggregateStats = useMemo(() => ({
        totalViews: MOCK_JOB_METRICS.reduce((sum, j) => sum + j.views, 0),
        totalApplications: MOCK_JOB_METRICS.reduce((sum, j) => sum + j.applications, 0),
        totalInterviews: MOCK_JOB_METRICS.reduce((sum, j) => sum + j.interviews, 0),
        totalOffers: MOCK_JOB_METRICS.reduce((sum, j) => sum + j.offers, 0),
        avgQuality: 72,
        avgTimeToHire: 21,
        costPerHire: 1850,
        ...stats,
    }), [stats]);

    const funnelData = [
        { label: 'Views', value: aggregateStats.totalViews, color: '#60a5fa' },
        { label: 'Applications', value: aggregateStats.totalApplications, color: '#789A99' },
        { label: 'Qualified', value: Math.round(aggregateStats.totalApplications * 0.52), color: '#fbbf24' },
        { label: 'Interviewed', value: aggregateStats.totalInterviews, color: '#a78bfa' },
        { label: 'Offers', value: aggregateStats.totalOffers, color: '#4ade80' },
    ];

    const qualityPieData = MOCK_QUALITY_DATA.map((d, i) => ({
        label: d.label,
        value: d.count,
        color: ['#4ade80', '#789A99', '#fbbf24', '#f97316', '#f87171'][i],
    }));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Employer Analytics</h2>
                    <p className="text-sm text-[#5a6b75]">Comprehensive hiring performance insights</p>
                </div>
                <div className="flex gap-3">
                    <Select
                        options={[
                            { value: '7d', label: 'Last 7 days' },
                            { value: '30d', label: 'Last 30 days' },
                            { value: '90d', label: 'Last 90 days' },
                            { value: '12m', label: 'Last 12 months' },
                        ]}
                        value={timeRange}
                        onChange={setTimeRange}
                        className="w-36"
                    />
                    <Button variant="outline" onClick={onExport}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total Views"
                    value={aggregateStats.totalViews.toLocaleString()}
                    change="+18%"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                    color="bg-[#60a5fa]"
                />
                <StatCard
                    label="Applications"
                    value={aggregateStats.totalApplications}
                    change="+12%"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    color="bg-[#789A99]"
                />
                <StatCard
                    label="Avg Quality Score"
                    value={`${aggregateStats.avgQuality}/100`}
                    change="+5pts"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                    color="bg-[#4ade80]"
                />
                <StatCard
                    label="Avg Time to Hire"
                    value={`${aggregateStats.avgTimeToHire} days`}
                    change="-3 days"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    color="bg-[#fbbf24]"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Hiring Funnel */}
                <div className="lg:col-span-2">
                    <Card variant="default" padding="lg">
                        <CardHeader>
                            <CardTitle>Hiring Funnel</CardTitle>
                            <Badge variant="info">All Jobs</Badge>
                        </CardHeader>
                        <CardContent>
                            <FunnelChart data={funnelData} height={280} />
                        </CardContent>
                    </Card>
                </div>

                {/* Candidate Quality Distribution */}
                <Card variant="default" padding="lg">
                    <CardHeader>
                        <CardTitle>Candidate Quality</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <PieChart data={qualityPieData} size={160} showLegend={false} />
                    </CardContent>
                    <div className="mt-4 space-y-2">
                        {MOCK_QUALITY_DATA.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: qualityPieData[idx].color }} />
                                    <span className="text-[#5a6b75]">{item.range}</span>
                                </div>
                                <span className="font-medium text-[#1e2a32]">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Job Performance Table */}
            <Card variant="default" padding="none">
                <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                    <CardTitle>Job Post Performance</CardTitle>
                    <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#FFD2C2]/20">
                            <tr>
                                <th className="px-5 py-4 text-left text-xs font-semibold text-[#5a6b75] uppercase">Job Title</th>
                                <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase">Views</th>
                                <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase">Applications</th>
                                <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase">Qualified</th>
                                <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase">Interviews</th>
                                <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase">Offers</th>
                                <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase">Conversion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e8e0dc]">
                            {MOCK_JOB_METRICS.map((job) => (
                                <tr key={job.id} className="hover:bg-[#FFD2C2]/10 transition-colors">
                                    <td className="px-5 py-4 font-medium text-[#1e2a32]">{job.title}</td>
                                    <td className="px-5 py-4 text-center text-[#5a6b75]">{job.views.toLocaleString()}</td>
                                    <td className="px-5 py-4 text-center font-semibold text-[#1e2a32]">{job.applications}</td>
                                    <td className="px-5 py-4 text-center text-[#5a6b75]">{job.qualified}</td>
                                    <td className="px-5 py-4 text-center text-[#5a6b75]">{job.interviews}</td>
                                    <td className="px-5 py-4 text-center"><Badge variant="success" size="sm">{job.offers}</Badge></td>
                                    <td className="px-5 py-4 text-center">
                                        <span className={`font-medium ${job.conversion > 6 ? 'text-[#4ade80]' : 'text-[#fbbf24]'}`}>
                                            {job.conversion}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Source Effectiveness */}
                <Card variant="default" padding="lg">
                    <CardHeader>
                        <CardTitle>Source Effectiveness</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {MOCK_SOURCES.map((source, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-20 font-medium text-[#1e2a32]">{source.source}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="flex-1 h-2 bg-[#e8e0dc] rounded-full overflow-hidden">
                                                <div className="h-full bg-[#789A99] rounded-full" style={{ width: `${(source.count / 85) * 100}%` }} />
                                            </div>
                                            <span className="text-sm text-[#5a6b75] w-8">{source.count}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-[#8a9aa4]">
                                            <span>Quality: <span className="text-[#1e2a32] font-medium">{source.quality}</span></span>
                                            {source.cost > 0 && <span>Cost: <span className="text-[#1e2a32] font-medium">${source.cost}</span></span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Hiring Trend */}
                <Card variant="default" padding="lg">
                    <CardHeader>
                        <CardTitle>Hiring Trend</CardTitle>
                        <Badge variant="success">+25% YoY</Badge>
                    </CardHeader>
                    <CardContent>
                        <LineChart data={MOCK_HIRING_TREND} height={180} showArea={true} />
                    </CardContent>
                </Card>
            </div>

            {/* Team Performance */}
            <Card variant="default" padding="none">
                <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                    <CardTitle>Team Hiring Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#FFD2C2]/20">
                            <tr>
                                <th className="px-5 py-4 text-left text-xs font-semibold text-[#5a6b75] uppercase">Team Member</th>
                                <th className="px-5 py-4 text-left text-xs font-semibold text-[#5a6b75] uppercase">Role</th>
                                <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase">Candidates Sourced</th>
                                <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase">Interviews</th>
                                <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase">Hires</th>
                                <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase">Avg Days to Hire</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e8e0dc]">
                            {MOCK_TEAM_METRICS.map((member, idx) => (
                                <tr key={idx} className="hover:bg-[#FFD2C2]/10 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#789A99]/10 flex items-center justify-center font-medium text-[#789A99] text-sm">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-medium text-[#1e2a32]">{member.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[#5a6b75]">{member.role}</td>
                                    <td className="px-5 py-4 text-center font-medium text-[#1e2a32]">{member.candidates || '-'}</td>
                                    <td className="px-5 py-4 text-center text-[#5a6b75]">{member.interviews}</td>
                                    <td className="px-5 py-4 text-center"><Badge variant="success" size="sm">{member.hires || '-'}</Badge></td>
                                    <td className="px-5 py-4 text-center text-[#5a6b75]">{member.avgTime ? `${member.avgTime} days` : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}
