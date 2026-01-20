import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Select } from '../ui';
import { FunnelChart, StatCard } from './ChartComponents';

const MOCK_FUNNEL_DATA = {
    candidate: {
        stages: [
            { label: 'Profile Created', value: 100, color: '#60a5fa' },
            { label: 'Resume Uploaded', value: 85, color: '#789A99' },
            { label: 'Applied to Jobs', value: 68, color: '#fbbf24' },
            { label: 'Got Interview', value: 28, color: '#a78bfa' },
            { label: 'Received Offer', value: 12, color: '#4ade80' },
        ],
        metrics: {
            avgTimeProfileToApply: '3.2 days',
            avgTimeApplyToInterview: '8.5 days',
            avgTimeInterviewToOffer: '12.3 days',
            totalConversion: '12%',
        },
    },
    employer: {
        stages: [
            { label: 'Job View', value: 3420, color: '#60a5fa' },
            { label: 'Application Started', value: 456, color: '#789A99' },
            { label: 'Application Submitted', value: 247, color: '#fbbf24' },
            { label: 'Screened', value: 148, color: '#a78bfa' },
            { label: 'Interviewed', value: 69, color: '#f97316' },
            { label: 'Offer Made', value: 29, color: '#4ade80' },
            { label: 'Hired', value: 19, color: '#22c55e' },
        ],
        metrics: {
            viewToApplyRate: '7.2%',
            applyToScreenRate: '59.9%',
            screenToInterviewRate: '46.6%',
            interviewToOfferRate: '42.0%',
            offerAcceptRate: '65.5%',
        },
    },
};

const MOCK_STAGE_DETAILS = {
    'Job View': { avgTime: '-', dropoffReasons: ['Not relevant', 'Location mismatch', 'Salary expectations'] },
    'Application Started': { avgTime: '2.3 min', dropoffReasons: ['Long form', 'Technical issues', 'Missing documents'] },
    'Application Submitted': { avgTime: '-', dropoffReasons: [] },
    'Screened': { avgTime: '3.2 days', dropoffReasons: ['Unqualified', 'Missing skills', 'Overqualified'] },
    'Interviewed': { avgTime: '5.8 days', dropoffReasons: ['Culture mismatch', 'Performance', 'Withdrew'] },
    'Offer Made': { avgTime: '2.1 days', dropoffReasons: ['Accepted other offer', 'Salary', 'Location'] },
    'Hired': { avgTime: '7.5 days', dropoffReasons: [] },
};

export default function ConversionFunnel({ type = 'employer', onExport }) {
    const [selectedStage, setSelectedStage] = useState(null);
    const [timeRange, setTimeRange] = useState('30d');

    const data = MOCK_FUNNEL_DATA[type];
    const stages = data.stages;
    const metrics = data.metrics;

    const stageMetrics = useMemo(() => {
        return stages.map((stage, idx) => {
            const prevValue = idx > 0 ? stages[idx - 1].value : stage.value;
            const dropoffRate = prevValue > 0 ? ((prevValue - stage.value) / prevValue * 100).toFixed(1) : 0;
            const conversionRate = idx > 0 ? ((stage.value / stages[0].value) * 100).toFixed(1) : 100;
            return { ...stage, dropoffRate, conversionRate, idx };
        });
    }, [stages]);

    const selectedStageData = selectedStage ? MOCK_STAGE_DETAILS[selectedStage.label] : null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Conversion Funnel</h2>
                    <p className="text-sm text-[#5a6b75]">
                        {type === 'employer' ? 'Track candidate journey through your hiring process' : 'See how candidates progress through job applications'}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Select
                        options={[
                            { value: '7d', label: 'Last 7 days' },
                            { value: '30d', label: 'Last 30 days' },
                            { value: '90d', label: 'Last 90 days' },
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

            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(metrics).slice(0, 4).map(([key, value], idx) => {
                    const labels = {
                        viewToApplyRate: 'View → Apply',
                        applyToScreenRate: 'Apply → Screen',
                        screenToInterviewRate: 'Screen → Interview',
                        interviewToOfferRate: 'Interview → Offer',
                        avgTimeProfileToApply: 'Profile → Apply',
                        avgTimeApplyToInterview: 'Apply → Interview',
                        avgTimeInterviewToOffer: 'Interview → Offer',
                        totalConversion: 'Total Conversion',
                    };
                    return (
                        <Card key={key} variant="default" padding="md">
                            <CardContent>
                                <p className="text-xs text-[#8a9aa4] uppercase tracking-wide">{labels[key] || key}</p>
                                <p className="text-2xl font-bold text-[#1e2a32] mt-1">{value}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Funnel */}
                <div className="lg:col-span-2">
                    <Card variant="default" padding="lg">
                        <CardHeader>
                            <CardTitle>Stage Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {stageMetrics.map((stage, idx) => {
                                    const widthPercent = (stage.value / stages[0].value) * 100;
                                    const isSelected = selectedStage?.label === stage.label;

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedStage(isSelected ? null : stage)}
                                            className={`w-full text-left transition-all ${isSelected ? 'scale-[1.02]' : ''}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-32 text-sm font-medium text-[#1e2a32] truncate">{stage.label}</div>
                                                <div className="flex-1 relative">
                                                    <div
                                                        className={`h-10 rounded-xl flex items-center px-4 transition-all duration-500 ${isSelected ? 'ring-2 ring-[#1e2a32] ring-offset-2' : ''}`}
                                                        style={{ width: `${Math.max(widthPercent, 15)}%`, backgroundColor: stage.color }}
                                                    >
                                                        <span className="text-white font-bold text-sm">{stage.value.toLocaleString()}</span>
                                                    </div>
                                                    {idx > 0 && (
                                                        <div className="absolute -top-1 left-0 bg-[#f87171]/10 text-[#f87171] text-xs px-2 py-0.5 rounded-full">
                                                            -{stage.dropoffRate}%
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-16 text-right">
                                                    <span className="text-sm font-medium text-[#789A99]">{stage.conversionRate}%</span>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Stage Details */}
                <Card variant="default" padding="lg">
                    <CardHeader>
                        <CardTitle>Stage Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedStage ? (
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl" style={{ backgroundColor: `${selectedStage.color}20` }}>
                                    <p className="font-semibold text-[#1e2a32]">{selectedStage.label}</p>
                                    <p className="text-3xl font-bold mt-2" style={{ color: selectedStage.color }}>
                                        {selectedStage.value.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-[#8a9aa4] mt-1">
                                        {selectedStage.conversionRate}% from start
                                    </p>
                                </div>

                                {selectedStageData?.avgTime && selectedStageData.avgTime !== '-' && (
                                    <div>
                                        <p className="text-sm text-[#8a9aa4]">Average Time in Stage</p>
                                        <p className="text-lg font-semibold text-[#1e2a32]">{selectedStageData.avgTime}</p>
                                    </div>
                                )}

                                {selectedStageData?.dropoffReasons?.length > 0 && (
                                    <div>
                                        <p className="text-sm text-[#8a9aa4] mb-2">Top Drop-off Reasons</p>
                                        <div className="space-y-2">
                                            {selectedStageData.dropoffReasons.map((reason, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm">
                                                    <span className="text-[#f87171]">•</span>
                                                    <span className="text-[#5a6b75]">{reason}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedStage.idx > 0 && (
                                    <div className="pt-4 border-t border-[#e8e0dc]">
                                        <p className="text-sm text-[#8a9aa4]">Drop-off from Previous Stage</p>
                                        <p className="text-2xl font-bold text-[#f87171]">-{selectedStage.dropoffRate}%</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-[#8a9aa4]">
                                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                </svg>
                                <p className="font-medium text-[#1e2a32]">Click a stage to view details</p>
                                <p className="text-sm mt-1">Analyze drop-off reasons and time metrics</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Insights */}
            <Card variant="gradient" padding="lg" className="bg-gradient-to-r from-[#FFD2C2]/20 to-[#789A99]/10">
                <CardContent>
                    <h3 className="font-semibold text-[#1e2a32] mb-3">💡 Insights & Recommendations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white rounded-xl">
                            <p className="text-sm font-medium text-[#f87171]">Highest Drop-off</p>
                            <p className="text-lg font-semibold text-[#1e2a32] mt-1">Job View → Apply</p>
                            <p className="text-xs text-[#8a9aa4] mt-1">93% drop-off. Consider improving job descriptions.</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl">
                            <p className="text-sm font-medium text-[#fbbf24]">Slowest Stage</p>
                            <p className="text-lg font-semibold text-[#1e2a32] mt-1">Hired (7.5 days)</p>
                            <p className="text-xs text-[#8a9aa4] mt-1">Onboarding paperwork delays. Streamline process.</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl">
                            <p className="text-sm font-medium text-[#4ade80]">Best Performing</p>
                            <p className="text-lg font-semibold text-[#1e2a32] mt-1">Offer Accept Rate</p>
                            <p className="text-xs text-[#8a9aa4] mt-1">65.5% accept rate is above industry average.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
