import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Select, Modal, ModalFooter } from '../ui';

const EXPORT_FORMATS = [
    { id: 'csv', label: 'CSV', description: 'Comma-separated values for spreadsheets', icon: '📊' },
    { id: 'xlsx', label: 'Excel', description: 'Microsoft Excel format', icon: '📗' },
    { id: 'pdf', label: 'PDF Report', description: 'Formatted PDF with charts', icon: '📄' },
    { id: 'json', label: 'JSON', description: 'Raw data in JSON format', icon: '{ }' },
];

const MOCK_EXPORT_HISTORY = [
    { id: 1, name: 'Weekly Hiring Report', format: 'pdf', date: '2026-01-20 14:30', size: '245 KB', status: 'completed' },
    { id: 2, name: 'Applications Export', format: 'csv', date: '2026-01-19 09:15', size: '128 KB', status: 'completed' },
    { id: 3, name: 'Candidate List Q1', format: 'xlsx', date: '2026-01-18 16:45', size: '512 KB', status: 'completed' },
    { id: 4, name: 'Monthly Analytics', format: 'pdf', date: '2026-01-15 11:00', size: '1.2 MB', status: 'completed' },
];

export default function ExportManager({ data, reportName = 'Report', onExportComplete }) {
    const [selectedFormat, setSelectedFormat] = useState('csv');
    const [isExporting, setIsExporting] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduleSettings, setScheduleSettings] = useState({
        frequency: 'weekly',
        day: 'monday',
        time: '09:00',
        email: '',
    });
    const [exportHistory, setExportHistory] = useState(MOCK_EXPORT_HISTORY);

    const handleExport = async () => {
        setIsExporting(true);

        // Simulate export process
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate download based on format
        if (selectedFormat === 'csv') {
            downloadCSV();
        } else if (selectedFormat === 'json') {
            downloadJSON();
        } else {
            // For PDF and Excel, we'd normally use libraries
            alert(`${selectedFormat.toUpperCase()} export would be generated here.`);
        }

        const newExport = {
            id: Date.now(),
            name: reportName,
            format: selectedFormat,
            date: new Date().toLocaleString(),
            size: '156 KB',
            status: 'completed',
        };
        setExportHistory(prev => [newExport, ...prev]);
        setIsExporting(false);
        onExportComplete?.(newExport);
    };

    const downloadCSV = () => {
        // Mock data for export
        const mockData = [
            ['Job Title', 'Views', 'Applications', 'Interviews', 'Offers'],
            ['Senior Frontend Developer', 1250, 89, 12, 4],
            ['Product Manager', 980, 62, 8, 2],
            ['DevOps Engineer', 756, 41, 6, 2],
            ['UI/UX Designer', 542, 35, 5, 1],
        ];

        const csvContent = mockData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const downloadJSON = () => {
        const mockData = {
            reportName,
            generatedAt: new Date().toISOString(),
            data: [
                { jobTitle: 'Senior Frontend Developer', views: 1250, applications: 89, interviews: 12, offers: 4 },
                { jobTitle: 'Product Manager', views: 980, applications: 62, interviews: 8, offers: 2 },
            ],
        };

        const blob = new Blob([JSON.stringify(mockData, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    };

    const handleScheduleSave = () => {
        setShowScheduleModal(false);
        alert(`Scheduled ${selectedFormat.toUpperCase()} export: ${scheduleSettings.frequency} on ${scheduleSettings.day} at ${scheduleSettings.time}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Export Manager</h2>
                    <p className="text-sm text-[#5a6b75]">Download and schedule report exports</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Export Options */}
                <div className="lg:col-span-2 space-y-6">
                    <Card variant="default" padding="lg">
                        <CardHeader>
                            <CardTitle>Export Format</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                {EXPORT_FORMATS.map((format) => {
                                    const isSelected = selectedFormat === format.id;
                                    return (
                                        <button
                                            key={format.id}
                                            onClick={() => setSelectedFormat(format.id)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${isSelected
                                                    ? 'border-[#789A99] bg-[#789A99]/5'
                                                    : 'border-[#e8e0dc] hover:border-[#789A99]/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{format.icon}</span>
                                                <div>
                                                    <p className="font-semibold text-[#1e2a32]">{format.label}</p>
                                                    <p className="text-xs text-[#8a9aa4]">{format.description}</p>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Export Actions */}
                    <Card variant="default" padding="lg">
                        <CardHeader>
                            <CardTitle>Export Options</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    variant="primary"
                                    onClick={handleExport}
                                    disabled={isExporting}
                                    className="flex-1"
                                >
                                    {isExporting ? (
                                        <>
                                            <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Exporting...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download {selectedFormat.toUpperCase()}
                                        </>
                                    )}
                                </Button>
                                <Button variant="outline" onClick={() => setShowScheduleModal(true)} className="flex-1">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Schedule Export
                                </Button>
                            </div>

                            <div className="p-4 bg-[#FFD2C2]/10 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <span className="text-xl">💡</span>
                                    <div>
                                        <p className="text-sm font-medium text-[#1e2a32]">Pro Tip</p>
                                        <p className="text-sm text-[#5a6b75]">
                                            CSV format is best for data analysis in Excel or Google Sheets.
                                            PDF is ideal for sharing professional reports with stakeholders.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Export History */}
                <Card variant="default" padding="none">
                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                        <CardTitle>Export History</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-[#e8e0dc] max-h-96 overflow-y-auto">
                            {exportHistory.map((item) => (
                                <div key={item.id} className="p-4 hover:bg-[#FFD2C2]/10 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <span className="text-lg">
                                                {EXPORT_FORMATS.find(f => f.id === item.format)?.icon || '📄'}
                                            </span>
                                            <div>
                                                <p className="font-medium text-[#1e2a32] text-sm">{item.name}</p>
                                                <p className="text-xs text-[#8a9aa4] mt-0.5">{item.date}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="default" size="sm">{item.format.toUpperCase()}</Badge>
                                                    <span className="text-xs text-[#8a9aa4]">{item.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-[#789A99] hover:text-[#5f7d7c]">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Schedule Modal */}
            <Modal isOpen={showScheduleModal} onClose={() => setShowScheduleModal(false)} title="Schedule Export" size="md">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Frequency</label>
                        <Select
                            options={[
                                { value: 'daily', label: 'Daily' },
                                { value: 'weekly', label: 'Weekly' },
                                { value: 'monthly', label: 'Monthly' },
                            ]}
                            value={scheduleSettings.frequency}
                            onChange={(val) => setScheduleSettings(prev => ({ ...prev, frequency: val }))}
                        />
                    </div>
                    {scheduleSettings.frequency === 'weekly' && (
                        <div>
                            <label className="block text-sm font-medium text-[#1e2a32] mb-2">Day of Week</label>
                            <Select
                                options={[
                                    { value: 'monday', label: 'Monday' },
                                    { value: 'tuesday', label: 'Tuesday' },
                                    { value: 'wednesday', label: 'Wednesday' },
                                    { value: 'thursday', label: 'Thursday' },
                                    { value: 'friday', label: 'Friday' },
                                ]}
                                value={scheduleSettings.day}
                                onChange={(val) => setScheduleSettings(prev => ({ ...prev, day: val }))}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Time</label>
                        <input
                            type="time"
                            value={scheduleSettings.time}
                            onChange={(e) => setScheduleSettings(prev => ({ ...prev, time: e.target.value }))}
                            className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl focus:border-[#789A99] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Send to Email</label>
                        <input
                            type="email"
                            value={scheduleSettings.email}
                            onChange={(e) => setScheduleSettings(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="your@email.com"
                            className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl focus:border-[#789A99] focus:outline-none"
                        />
                    </div>
                    <div className="p-3 bg-[#f5f3f1] rounded-xl">
                        <p className="text-sm text-[#5a6b75]">
                            <strong>Format:</strong> {selectedFormat.toUpperCase()}
                        </p>
                    </div>
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowScheduleModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleScheduleSave}>Schedule</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
