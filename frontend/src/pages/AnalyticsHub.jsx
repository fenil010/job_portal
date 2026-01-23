import { useState } from 'react';
import { DashboardLayout } from '../components/layout';
import { Tabs, TabsList, TabsTrigger, TabsContent, Button, Badge, useToast } from '../components/ui';
import {
    CandidateAnalytics,
    EmployerAnalytics,
    ResumeQualityMetrics,
    ConversionFunnel,
    ReportBuilder,
    ExportManager,
    SkillDemandHeatmap,
} from '../components/analytics';

export default function AnalyticsHub({ onNavigate, user }) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState(user?.role === 'employer' ? 'employer' : 'candidate');

    const isEmployer = user?.role === 'employer';

    const handleExport = (format) => {
        toast.success(`Exporting ${format.toUpperCase()} report...`);
    };

    const handleSaveReport = (report) => {
        toast.success(`Report "${report.name}" saved!`);
    };

    return (
        <DashboardLayout activeItem="Analytics" onNavigate={onNavigate} user={user}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-fade-in-down">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1e2a32]">Analytics & Reports</h1>
                        <p className="mt-1 text-[#5a6b75]">
                            {isEmployer
                                ? 'Track hiring performance and optimize your recruitment process'
                                : 'Monitor your job search progress and improve your profile'
                            }
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setActiveTab('export')}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export
                        </Button>
                        <Button variant="primary" onClick={() => setActiveTab('reports')}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Build Report
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
                    <TabsList className="mb-6 flex-wrap">
                        {isEmployer ? (
                            <>
                                <TabsTrigger value="employer">Hiring Analytics</TabsTrigger>
                                <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
                                <TabsTrigger value="skills">Skill Demand</TabsTrigger>
                            </>
                        ) : (
                            <>
                                <TabsTrigger value="candidate">My Analytics</TabsTrigger>
                                <TabsTrigger value="resume">Resume Quality</TabsTrigger>
                                <TabsTrigger value="funnel">My Funnel</TabsTrigger>
                                <TabsTrigger value="skills">Skill Trends</TabsTrigger>
                            </>
                        )}
                        <TabsTrigger value="reports">Report Builder</TabsTrigger>
                        <TabsTrigger value="export">Export</TabsTrigger>
                    </TabsList>

                    {/* Employer Analytics Tab */}
                    <TabsContent value="employer">
                        <EmployerAnalytics onExport={() => setActiveTab('export')} />
                    </TabsContent>

                    {/* Candidate Analytics Tab */}
                    <TabsContent value="candidate">
                        <CandidateAnalytics user={user} />
                    </TabsContent>

                    {/* Resume Quality Tab */}
                    <TabsContent value="resume">
                        <ResumeQualityMetrics />
                    </TabsContent>

                    {/* Conversion Funnel Tab */}
                    <TabsContent value="funnel">
                        <ConversionFunnel
                            type={isEmployer ? 'employer' : 'candidate'}
                            onExport={() => setActiveTab('export')}
                        />
                    </TabsContent>

                    {/* Skill Demand Tab */}
                    <TabsContent value="skills">
                        <SkillDemandHeatmap userSkills={['JavaScript', 'React', 'TypeScript', 'Node.js', 'SQL']} />
                    </TabsContent>

                    {/* Report Builder Tab */}
                    <TabsContent value="reports">
                        <ReportBuilder
                            onSave={handleSaveReport}
                            onExport={handleExport}
                        />
                    </TabsContent>

                    {/* Export Tab */}
                    <TabsContent value="export">
                        <ExportManager
                            reportName="Analytics Report"
                            onExportComplete={(exp) => toast.success(`${exp.format.toUpperCase()} exported!`)}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
