import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Select, Modal, ModalFooter } from '../ui';

const AVAILABLE_METRICS = [
    { id: 'applications', label: 'Applications', category: 'volume' },
    { id: 'views', label: 'Job Views', category: 'volume' },
    { id: 'interviews', label: 'Interviews', category: 'volume' },
    { id: 'offers', label: 'Offers', category: 'volume' },
    { id: 'hires', label: 'Hires', category: 'volume' },
    { id: 'conversionRate', label: 'Conversion Rate', category: 'rate' },
    { id: 'timeToHire', label: 'Time to Hire', category: 'time' },
    { id: 'costPerHire', label: 'Cost per Hire', category: 'cost' },
    { id: 'qualityScore', label: 'Quality Score', category: 'quality' },
    { id: 'sourceEffectiveness', label: 'Source Effectiveness', category: 'source' },
];

const AVAILABLE_DIMENSIONS = [
    { id: 'date', label: 'Date' },
    { id: 'job', label: 'Job Title' },
    { id: 'department', label: 'Department' },
    { id: 'source', label: 'Source' },
    { id: 'recruiter', label: 'Recruiter' },
    { id: 'location', label: 'Location' },
];

const SAVED_REPORTS = [
    { id: 1, name: 'Weekly Hiring Summary', metrics: ['applications', 'interviews', 'hires'], dimensions: ['date'], lastRun: '2 hours ago' },
    { id: 2, name: 'Source ROI Analysis', metrics: ['applications', 'conversionRate', 'costPerHire'], dimensions: ['source'], lastRun: '1 day ago' },
    { id: 3, name: 'Recruiter Performance', metrics: ['applications', 'interviews', 'timeToHire'], dimensions: ['recruiter'], lastRun: '3 days ago' },
];

export default function ReportBuilder({ onSave, onExport }) {
    const [selectedMetrics, setSelectedMetrics] = useState(['applications', 'interviews']);
    const [selectedDimension, setSelectedDimension] = useState('date');
    const [dateRange, setDateRange] = useState('30d');
    const [filters, setFilters] = useState([]);
    const [reportName, setReportName] = useState('');
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [savedReports, setSavedReports] = useState(SAVED_REPORTS);

    const handleToggleMetric = (metricId) => {
        setSelectedMetrics(prev =>
            prev.includes(metricId)
                ? prev.filter(m => m !== metricId)
                : [...prev, metricId]
        );
    };

    const handleAddFilter = () => {
        setFilters(prev => [...prev, { field: '', operator: 'equals', value: '' }]);
    };

    const handleRemoveFilter = (index) => {
        setFilters(prev => prev.filter((_, i) => i !== index));
    };

    const handleSaveReport = () => {
        const newReport = {
            id: Date.now(),
            name: reportName,
            metrics: selectedMetrics,
            dimensions: [selectedDimension],
            lastRun: 'Just now',
        };
        setSavedReports(prev => [newReport, ...prev]);
        setShowSaveModal(false);
        setReportName('');
        onSave?.(newReport);
    };

    const handleLoadReport = (report) => {
        setSelectedMetrics(report.metrics);
        setSelectedDimension(report.dimensions[0]);
    };

    // Mock preview data
    const previewData = useMemo(() => {
        if (!showPreview) return null;
        return [
            { dimension: 'Jan 1', applications: 42, interviews: 12 },
            { dimension: 'Jan 8', applications: 38, interviews: 10 },
            { dimension: 'Jan 15', applications: 55, interviews: 18 },
            { dimension: 'Jan 22', applications: 48, interviews: 14 },
        ];
    }, [showPreview]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Report Builder</h2>
                    <p className="text-sm text-[#5a6b75]">Create custom reports with your preferred metrics</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                        {showPreview ? 'Hide Preview' : 'Preview'}
                    </Button>
                    <Button variant="primary" onClick={() => setShowSaveModal(true)} disabled={selectedMetrics.length === 0}>
                        Save Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Report Configuration */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Metrics Selection */}
                    <Card variant="default" padding="lg">
                        <CardHeader>
                            <CardTitle>Select Metrics</CardTitle>
                            <Badge variant="info">{selectedMetrics.length} selected</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {AVAILABLE_METRICS.map((metric) => {
                                    const isSelected = selectedMetrics.includes(metric.id);
                                    return (
                                        <button
                                            key={metric.id}
                                            onClick={() => handleToggleMetric(metric.id)}
                                            className={`p-3 rounded-xl border-2 text-left transition-all ${isSelected
                                                    ? 'border-[#789A99] bg-[#789A99]/5'
                                                    : 'border-[#e8e0dc] hover:border-[#789A99]/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${isSelected ? 'border-[#789A99] bg-[#789A99]' : 'border-[#8a9aa4]'
                                                    }`}>
                                                    {isSelected && (
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium text-[#1e2a32]">{metric.label}</span>
                                            </div>
                                            <span className="text-xs text-[#8a9aa4] capitalize mt-1 block ml-6">{metric.category}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dimensions & Filters */}
                    <Card variant="default" padding="lg">
                        <CardHeader>
                            <CardTitle>Group By & Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#1e2a32] mb-2">Group By</label>
                                    <Select
                                        options={AVAILABLE_DIMENSIONS.map(d => ({ value: d.id, label: d.label }))}
                                        value={selectedDimension}
                                        onChange={setSelectedDimension}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#1e2a32] mb-2">Date Range</label>
                                    <Select
                                        options={[
                                            { value: '7d', label: 'Last 7 days' },
                                            { value: '30d', label: 'Last 30 days' },
                                            { value: '90d', label: 'Last 90 days' },
                                            { value: 'custom', label: 'Custom range' },
                                        ]}
                                        value={dateRange}
                                        onChange={setDateRange}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-[#1e2a32]">Filters</label>
                                    <Button variant="ghost" size="sm" onClick={handleAddFilter}>
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add Filter
                                    </Button>
                                </div>
                                {filters.length > 0 ? (
                                    <div className="space-y-2">
                                        {filters.map((filter, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <Select
                                                    options={AVAILABLE_DIMENSIONS.map(d => ({ value: d.id, label: d.label }))}
                                                    value={filter.field}
                                                    onChange={(val) => {
                                                        const newFilters = [...filters];
                                                        newFilters[idx].field = val;
                                                        setFilters(newFilters);
                                                    }}
                                                    placeholder="Field"
                                                    className="flex-1"
                                                />
                                                <Select
                                                    options={[
                                                        { value: 'equals', label: 'Equals' },
                                                        { value: 'contains', label: 'Contains' },
                                                        { value: 'gt', label: 'Greater than' },
                                                        { value: 'lt', label: 'Less than' },
                                                    ]}
                                                    value={filter.operator}
                                                    onChange={(val) => {
                                                        const newFilters = [...filters];
                                                        newFilters[idx].operator = val;
                                                        setFilters(newFilters);
                                                    }}
                                                    className="w-32"
                                                />
                                                <Input
                                                    value={filter.value}
                                                    onChange={(e) => {
                                                        const newFilters = [...filters];
                                                        newFilters[idx].value = e.target.value;
                                                        setFilters(newFilters);
                                                    }}
                                                    placeholder="Value"
                                                    className="flex-1"
                                                />
                                                <Button variant="ghost" size="sm" onClick={() => handleRemoveFilter(idx)}>
                                                    <svg className="w-4 h-4 text-[#f87171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-[#8a9aa4]">No filters applied</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preview */}
                    {showPreview && (
                        <Card variant="default" padding="none">
                            <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                <CardTitle>Report Preview</CardTitle>
                                <Button variant="primary" size="sm" onClick={() => onExport?.('csv')}>
                                    Export CSV
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0 overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#FFD2C2]/20">
                                        <tr>
                                            <th className="px-5 py-4 text-left text-xs font-semibold text-[#5a6b75] uppercase">
                                                {AVAILABLE_DIMENSIONS.find(d => d.id === selectedDimension)?.label}
                                            </th>
                                            {selectedMetrics.map(m => (
                                                <th key={m} className="px-5 py-4 text-right text-xs font-semibold text-[#5a6b75] uppercase">
                                                    {AVAILABLE_METRICS.find(metric => metric.id === m)?.label}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#e8e0dc]">
                                        {previewData?.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-[#FFD2C2]/10 transition-colors">
                                                <td className="px-5 py-4 font-medium text-[#1e2a32]">{row.dimension}</td>
                                                {selectedMetrics.map(m => (
                                                    <td key={m} className="px-5 py-4 text-right text-[#5a6b75]">
                                                        {row[m] || '-'}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Saved Reports */}
                <Card variant="default" padding="none">
                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                        <CardTitle>Saved Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {savedReports.length > 0 ? (
                            <div className="divide-y divide-[#e8e0dc]">
                                {savedReports.map((report) => (
                                    <button
                                        key={report.id}
                                        onClick={() => handleLoadReport(report)}
                                        className="w-full p-4 text-left hover:bg-[#FFD2C2]/10 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-[#1e2a32]">{report.name}</p>
                                                <p className="text-xs text-[#8a9aa4] mt-1">
                                                    {report.metrics.length} metrics • Last: {report.lastRun}
                                                </p>
                                            </div>
                                            <svg className="w-4 h-4 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-[#8a9aa4]">
                                <p>No saved reports yet</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Save Modal */}
            <Modal isOpen={showSaveModal} onClose={() => setShowSaveModal(false)} title="Save Report" size="sm">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Report Name</label>
                        <Input
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            placeholder="Enter report name..."
                        />
                    </div>
                    <div className="p-3 bg-[#f5f3f1] rounded-xl">
                        <p className="text-sm text-[#5a6b75]">
                            <strong>Metrics:</strong> {selectedMetrics.map(m => AVAILABLE_METRICS.find(metric => metric.id === m)?.label).join(', ')}
                        </p>
                        <p className="text-sm text-[#5a6b75] mt-1">
                            <strong>Group by:</strong> {AVAILABLE_DIMENSIONS.find(d => d.id === selectedDimension)?.label}
                        </p>
                    </div>
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowSaveModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveReport} disabled={!reportName.trim()}>Save</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
