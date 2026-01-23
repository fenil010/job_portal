import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Select } from '../ui';

export default function AnalyticsDashboard({ stats = {}, jobPerformance = [], timeRange = '30d', onTimeRangeChange }) {
    const defaultStats = {
        totalApplications: 247,
        newThisWeek: 42,
        interviewRate: 28,
        offerRate: 12,
        hireRate: 8,
        avgTimeToHire: 23,
        totalViews: 3420,
        conversionRate: 7.2,
        ...stats,
    };

    const statCards = [
        {
            label: 'Total Applications',
            value: defaultStats.totalApplications,
            change: '+15%',
            positive: true,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            color: 'bg-[#60a5fa]',
        },
        {
            label: 'Interview Rate',
            value: `${defaultStats.interviewRate}%`,
            change: '+3%',
            positive: true,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: 'bg-[#789A99]',
        },
        {
            label: 'Offer Rate',
            value: `${defaultStats.offerRate}%`,
            change: '-2%',
            positive: false,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'bg-[#4ade80]',
        },
        {
            label: 'Avg. Time to Hire',
            value: `${defaultStats.avgTimeToHire} days`,
            change: '-5 days',
            positive: true,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'bg-[#fbbf24]',
        },
    ];

    const defaultJobPerformance = jobPerformance.length ? jobPerformance : [
        { id: 1, title: 'Senior Frontend Developer', views: 589, applications: 42, interviews: 12, offers: 3 },
        { id: 2, title: 'Product Manager', views: 412, applications: 28, interviews: 8, offers: 2 },
        { id: 3, title: 'UI/UX Designer', views: 234, applications: 15, interviews: 5, offers: 1 },
        { id: 4, title: 'DevOps Engineer', views: 521, applications: 35, interviews: 10, offers: 2 },
    ];

    // Simple chart visualization using CSS
    // Stats for visual chart (could be used for bar widths)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Analytics Dashboard</h2>
                    <p className="text-sm text-[#8a9aa4]">Track your hiring performance</p>
                </div>
                <Select
                    options={[
                        { value: '7d', label: 'Last 7 days' },
                        { value: '30d', label: 'Last 30 days' },
                        { value: '90d', label: 'Last 90 days' },
                        { value: '12m', label: 'Last 12 months' },
                    ]}
                    value={timeRange}
                    onChange={onTimeRangeChange}
                    className="w-40"
                />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <Card key={index} variant="default" padding="md" hover className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[#5a6b75]">{stat.label}</p>
                                    <p className="mt-1 text-2xl font-bold text-[#1e2a32]">{stat.value}</p>
                                    <p className={`text-xs mt-1 ${stat.positive ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                                        {stat.change} vs last period
                                    </p>
                                </div>
                                <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Job Performance Table */}
                <div className="lg:col-span-2">
                    <Card variant="default" padding="none">
                        <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                            <CardTitle>Job Performance</CardTitle>
                            <Button variant="ghost" size="sm">Export</Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#FFD2C2]/20">
                                        <tr>
                                            <th className="px-5 py-4 text-left text-xs font-semibold text-[#5a6b75] uppercase tracking-wider">Job Title</th>
                                            <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase tracking-wider">Views</th>
                                            <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase tracking-wider">Applications</th>
                                            <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase tracking-wider">Interviews</th>
                                            <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase tracking-wider">Offers</th>
                                            <th className="px-5 py-4 text-center text-xs font-semibold text-[#5a6b75] uppercase tracking-wider">Conversion</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#e8e0dc]">
                                        {defaultJobPerformance.map((job) => {
                                            const conversion = ((job.applications / job.views) * 100).toFixed(1);
                                            return (
                                                <tr key={job.id} className="hover:bg-[#FFD2C2]/10 transition-colors">
                                                    <td className="px-5 py-4">
                                                        <p className="font-medium text-[#1e2a32]">{job.title}</p>
                                                    </td>
                                                    <td className="px-5 py-4 text-center text-[#5a6b75]">{job.views.toLocaleString()}</td>
                                                    <td className="px-5 py-4 text-center">
                                                        <span className="font-semibold text-[#1e2a32]">{job.applications}</span>
                                                    </td>
                                                    <td className="px-5 py-4 text-center text-[#5a6b75]">{job.interviews}</td>
                                                    <td className="px-5 py-4 text-center">
                                                        <Badge variant="success" size="sm">{job.offers}</Badge>
                                                    </td>
                                                    <td className="px-5 py-4 text-center">
                                                        <span className={`font-medium ${parseFloat(conversion) > 5 ? 'text-[#4ade80]' : 'text-[#fbbf24]'}`}>
                                                            {conversion}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Application Funnel */}
                <div>
                    <Card variant="default" padding="none">
                        <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                            <CardTitle>Hiring Funnel</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            <div className="space-y-4">
                                {[
                                    { label: 'Applications', value: defaultStats.totalApplications, percentage: 100, color: '#60a5fa' },
                                    { label: 'Screened', value: Math.round(defaultStats.totalApplications * 0.6), percentage: 60, color: '#789A99' },
                                    { label: 'Interviewed', value: Math.round(defaultStats.totalApplications * 0.28), percentage: 28, color: '#fbbf24' },
                                    { label: 'Offers', value: Math.round(defaultStats.totalApplications * 0.12), percentage: 12, color: '#4ade80' },
                                    { label: 'Hired', value: Math.round(defaultStats.totalApplications * 0.08), percentage: 8, color: '#22c55e' },
                                ].map((stage, idx) => (
                                    <div key={idx}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-[#1e2a32]">{stage.label}</span>
                                            <span className="text-sm text-[#8a9aa4]">{stage.value}</span>
                                        </div>
                                        <div className="h-3 bg-[#e8e0dc] rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{ width: `${stage.percentage}%`, backgroundColor: stage.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card variant="default" padding="lg" className="mt-4 bg-gradient-to-br from-[#789A99] to-[#5f7d7c] border-0">
                        <CardContent className="text-white text-center">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <p className="text-3xl font-bold mb-1">{defaultStats.conversionRate}%</p>
                            <p className="text-white/80 text-sm">Overall Conversion Rate</p>
                            <p className="text-white/60 text-xs mt-2">Views to Applications</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Application Sources */}
            <Card variant="default" padding="none">
                <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                    <CardTitle>Application Sources</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { source: 'Direct', count: 98, percentage: 40, color: '#789A99' },
                            { source: 'LinkedIn', count: 62, percentage: 25, color: '#60a5fa' },
                            { source: 'Indeed', count: 49, percentage: 20, color: '#fbbf24' },
                            { source: 'Referral', count: 38, percentage: 15, color: '#4ade80' },
                        ].map((source, idx) => (
                            <div key={idx} className="p-4 bg-[#fdf9f7] rounded-xl text-center">
                                <div
                                    className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                                    style={{ backgroundColor: source.color }}
                                >
                                    {source.percentage}%
                                </div>
                                <p className="font-semibold text-[#1e2a32]">{source.source}</p>
                                <p className="text-sm text-[#8a9aa4]">{source.count} applications</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
