import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../ui';
import { BarChart, PieChart, StatCard } from './ChartComponents';

const SCORE_CATEGORIES = [
    { key: 'completeness', label: 'Completeness', weight: 0.25, description: 'How complete is your profile information' },
    { key: 'keywords', label: 'Keyword Optimization', weight: 0.25, description: 'Relevant industry keywords found' },
    { key: 'formatting', label: 'Formatting', weight: 0.2, description: 'Professional structure and layout' },
    { key: 'ats', label: 'ATS Compatibility', weight: 0.2, description: 'Parsable by applicant tracking systems' },
    { key: 'impact', label: 'Impact Statements', weight: 0.1, description: 'Quantified achievements and results' },
];

const MOCK_RESUME_SCORES = {
    overall: 78,
    completeness: 85,
    keywords: 72,
    formatting: 90,
    ats: 82,
    impact: 58,
};

const MOCK_TREND_DATA = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 68 },
    { label: 'Mar', value: 72 },
    { label: 'Apr', value: 70 },
    { label: 'May', value: 75 },
    { label: 'Jun', value: 78 },
];

const MOCK_SUGGESTIONS = [
    { priority: 'high', category: 'impact', text: 'Add quantified achievements to your work experience (e.g., "Increased sales by 25%")' },
    { priority: 'medium', category: 'keywords', text: 'Include more industry-specific keywords like "agile", "cloud computing", "data analysis"' },
    { priority: 'medium', category: 'completeness', text: 'Add a professional summary at the top of your resume' },
    { priority: 'low', category: 'formatting', text: 'Consider using bullet points consistently across all sections' },
];

const MOCK_KEYWORD_ANALYSIS = [
    { keyword: 'React', found: true, importance: 'high' },
    { keyword: 'TypeScript', found: true, importance: 'high' },
    { keyword: 'Node.js', found: false, importance: 'medium' },
    { keyword: 'Agile', found: true, importance: 'medium' },
    { keyword: 'AWS', found: false, importance: 'medium' },
    { keyword: 'CI/CD', found: false, importance: 'low' },
];

export default function ResumeQualityMetrics({ resumeData }) {
    const scores = MOCK_RESUME_SCORES;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-[#4ade80]';
        if (score >= 60) return 'text-[#fbbf24]';
        return 'text-[#f87171]';
    };

    const getScoreBgColor = (score) => {
        if (score >= 80) return 'bg-[#4ade80]';
        if (score >= 60) return 'bg-[#fbbf24]';
        return 'bg-[#f87171]';
    };

    const getScoreLabel = (score) => {
        if (score >= 90) return 'Excellent';
        if (score >= 80) return 'Great';
        if (score >= 70) return 'Good';
        if (score >= 60) return 'Fair';
        return 'Needs Work';
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'danger';
            case 'medium': return 'warning';
            default: return 'default';
        }
    };

    const categoryBarData = SCORE_CATEGORIES.map(cat => ({
        label: cat.label,
        value: scores[cat.key],
        color: scores[cat.key] >= 80 ? '#4ade80' : scores[cat.key] >= 60 ? '#fbbf24' : '#f87171',
    }));

    const keywordsFound = MOCK_KEYWORD_ANALYSIS.filter(k => k.found).length;
    const keywordsTotal = MOCK_KEYWORD_ANALYSIS.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Resume Quality Analysis</h2>
                    <p className="text-sm text-[#5a6b75]">AI-powered resume optimization suggestions</p>
                </div>
                <Button variant="outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Re-analyze
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Overall Score */}
                <Card variant="gradient" padding="lg" className="bg-gradient-to-br from-[#789A99] to-[#5f7d7c] text-white">
                    <CardContent className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                                <circle
                                    cx="18" cy="18" r="15.9155" fill="none" stroke="white" strokeWidth="3"
                                    strokeDasharray={`${scores.overall} 100`}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold">{scores.overall}</span>
                                <span className="text-sm text-white/80">out of 100</span>
                            </div>
                        </div>
                        <p className="text-xl font-semibold">{getScoreLabel(scores.overall)}</p>
                        <p className="text-sm text-white/70 mt-1">Your resume ranks in the top 28%</p>
                    </CardContent>
                </Card>

                {/* Category Breakdown */}
                <div className="lg:col-span-2">
                    <Card variant="default" padding="lg">
                        <CardHeader>
                            <CardTitle>Score Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {SCORE_CATEGORIES.map((cat) => (
                                    <div key={cat.key}>
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-[#1e2a32]">{cat.label}</span>
                                                <span className="text-xs text-[#8a9aa4]">(Weight: {cat.weight * 100}%)</span>
                                            </div>
                                            <span className={`text-lg font-bold ${getScoreColor(scores[cat.key])}`}>
                                                {scores[cat.key]}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-[#e8e0dc] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${getScoreBgColor(scores[cat.key])}`}
                                                style={{ width: `${scores[cat.key]}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-[#8a9aa4] mt-1">{cat.description}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Improvement Suggestions */}
                <Card variant="default" padding="none">
                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                        <CardTitle>Improvement Suggestions</CardTitle>
                        <Badge variant="info">{MOCK_SUGGESTIONS.length} items</Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-[#e8e0dc]">
                            {MOCK_SUGGESTIONS.map((suggestion, idx) => (
                                <div key={idx} className="p-4 hover:bg-[#FFD2C2]/10 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <Badge variant={getPriorityColor(suggestion.priority)} size="sm" className="mt-0.5">
                                            {suggestion.priority}
                                        </Badge>
                                        <div className="flex-1">
                                            <p className="text-sm text-[#1e2a32]">{suggestion.text}</p>
                                            <p className="text-xs text-[#8a9aa4] mt-1 capitalize">{suggestion.category}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Keyword Analysis */}
                <Card variant="default" padding="none">
                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                        <CardTitle>Keyword Analysis</CardTitle>
                        <Badge variant={keywordsFound >= keywordsTotal * 0.6 ? 'success' : 'warning'}>
                            {keywordsFound}/{keywordsTotal} found
                        </Badge>
                    </CardHeader>
                    <CardContent className="p-5">
                        <div className="flex flex-wrap gap-2">
                            {MOCK_KEYWORD_ANALYSIS.map((kw, idx) => (
                                <div
                                    key={idx}
                                    className={`px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1.5 ${kw.found
                                            ? 'bg-[#4ade80]/10 text-[#16a34a]'
                                            : 'bg-[#f87171]/10 text-[#dc2626]'
                                        }`}
                                >
                                    {kw.found ? (
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                    {kw.keyword}
                                    <span className={`text-xs px-1.5 py-0.5 rounded ${kw.importance === 'high' ? 'bg-[#f87171]/20' :
                                            kw.importance === 'medium' ? 'bg-[#fbbf24]/20' : 'bg-[#8a9aa4]/20'
                                        }`}>
                                        {kw.importance}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-[#8a9aa4] mt-4">
                            Based on analysis of similar job postings in your field
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Score Trend */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <CardTitle>Score History</CardTitle>
                    <Badge variant="success">+13 pts since Jan</Badge>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end justify-between gap-4" style={{ height: 150 }}>
                        {MOCK_TREND_DATA.map((item, idx) => {
                            const height = (item.value / 100) * 100;
                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                    <span className="text-xs text-[#8a9aa4]">{item.value}</span>
                                    <div
                                        className={`w-full rounded-t-lg transition-all duration-500 ${getScoreBgColor(item.value)}`}
                                        style={{ height: `${height}%`, minHeight: 8 }}
                                    />
                                    <span className="text-xs text-[#5a6b75]">{item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* ATS Compatibility */}
            <Card variant="gradient" padding="lg" className="bg-gradient-to-r from-[#FFD2C2]/20 to-transparent">
                <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#4ade80]/20 flex items-center justify-center">
                                <svg className="w-7 h-7 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#1e2a32]">ATS Compatibility: {scores.ats}%</h3>
                                <p className="text-sm text-[#5a6b75] mt-1">Your resume is well-formatted for applicant tracking systems</p>
                                <ul className="mt-2 space-y-1">
                                    {['No images or graphics detected', 'Standard section headers used', 'Clean text formatting'].map((item, i) => (
                                        <li key={i} className="text-xs text-[#4ade80] flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <Button variant="outline">Download ATS-Friendly Version</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
