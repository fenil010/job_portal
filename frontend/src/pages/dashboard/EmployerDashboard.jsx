import { DashboardLayout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Tabs, TabsList, TabsTrigger, TabsContent, useToast } from '../../components/ui';
import {
    CompanyProfileForm,
    JobPostingForm,
    ApplicantCard,
    ApplicantFilters,
    BulkActionsBar,
    CandidatePipeline,
    InterviewScheduler,
    TeamAccessPanel,
    MessageCenter,
    AnalyticsDashboard,
} from '../../components/employer';
import {
    mockEmployerStats,
    mockEmployerJobs,
    mockCandidates,
    mockTeamMembers,
    mockInterviews,
    mockConversations,
    mockCompanyProfile,
    mockActivityLog,
    mockPendingInvites,
} from '../../data/mockData';
import { useState, useCallback, useMemo } from 'react';

export default function EmployerDashboard({ onNavigate, user, jobs: externalJobs, onPostJob, applications }) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('overview');
    const [jobs, setJobs] = useState(externalJobs || mockEmployerJobs);
    const [candidates, setCandidates] = useState(mockCandidates);
    const [interviews, setInterviews] = useState(mockInterviews);
    const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
    const [companyProfile, setCompanyProfile] = useState(mockCompanyProfile);
    const [conversations] = useState(mockConversations);

    // Candidate selection for bulk actions
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [filters, setFilters] = useState({});

    // Modals state
    const [showPostJobModal, setShowPostJobModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduleCandidate, setScheduleCandidate] = useState(null);

    const statusColors = { Active: 'success', Paused: 'warning', Closed: 'default' };

    // Stats calculation
    const stats = useMemo(() => [
        {
            label: 'Active Jobs',
            value: jobs.filter(j => j.status === 'Active').length,
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            color: 'bg-[#4ade80]'
        },
        {
            label: 'Applications',
            value: candidates.length,
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
            color: 'bg-[#789A99]'
        },
        {
            label: 'Interviews',
            value: interviews.length,
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
            color: 'bg-[#60a5fa]'
        },
        {
            label: 'Hired',
            value: candidates.filter(c => c.stage === 'hired').length,
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            color: 'bg-[#FFD2C2]'
        },
    ], [jobs, candidates, interviews]);

    // Filter candidates
    const filteredCandidates = useMemo(() => {
        let result = [...candidates];

        if (filters.search) {
            const search = filters.search.toLowerCase();
            result = result.filter(c =>
                c.name.toLowerCase().includes(search) ||
                c.email.toLowerCase().includes(search)
            );
        }

        if (filters.skills?.length) {
            result = result.filter(c =>
                filters.skills.some(skill => c.skills?.includes(skill))
            );
        }

        if (filters.status) {
            result = result.filter(c => c.status === filters.status);
        }

        if (filters.minScore) {
            result = result.filter(c => c.matchScore >= filters.minScore);
        }

        // Sort
        const [sortField, sortDir] = (filters.sort || 'matchScore_desc').split('_');
        result.sort((a, b) => {
            if (sortField === 'matchScore') {
                return sortDir === 'desc' ? b.matchScore - a.matchScore : a.matchScore - b.matchScore;
            }
            if (sortField === 'name') {
                return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
            return 0;
        });

        return result;
    }, [candidates, filters]);

    // Handlers
    const handlePostJob = useCallback((jobData) => {
        const job = {
            id: Date.now(),
            ...jobData,
            status: 'Active',
            applicants: 0,
            views: 0,
            postedAt: 'Just now',
        };
        setJobs(prev => [job, ...prev]);
        setShowPostJobModal(false);
        if (onPostJob) onPostJob(job);
        toast.success('Job posted successfully!');
    }, [onPostJob, toast]);

    const toggleJobStatus = useCallback((jobId) => {
        setJobs(prev => prev.map(job =>
            job.id === jobId
                ? { ...job, status: job.status === 'Active' ? 'Paused' : 'Active' }
                : job
        ));
    }, []);

    const handleSelectCandidate = useCallback((candidateId) => {
        setSelectedCandidates(prev =>
            prev.includes(candidateId)
                ? prev.filter(id => id !== candidateId)
                : [...prev, candidateId]
        );
    }, []);

    const handleBulkApprove = useCallback(() => {
        setCandidates(prev => prev.map(c =>
            selectedCandidates.includes(c.id) && c.stage === 'new'
                ? { ...c, stage: 'screening', status: 'Screening' }
                : c
        ));
        toast.success(`${selectedCandidates.length} candidates moved to screening`);
        setSelectedCandidates([]);
    }, [selectedCandidates, toast]);

    const handleBulkReject = useCallback(() => {
        setCandidates(prev => prev.map(c =>
            selectedCandidates.includes(c.id)
                ? { ...c, stage: 'rejected', status: 'Rejected' }
                : c
        ));
        toast.info(`${selectedCandidates.length} candidates rejected`);
        setSelectedCandidates([]);
    }, [selectedCandidates, toast]);

    const handleMoveCandidate = useCallback((candidateId, newStage) => {
        setCandidates(prev => prev.map(c =>
            c.id === candidateId
                ? { ...c, stage: newStage, status: newStage.charAt(0).toUpperCase() + newStage.slice(1) }
                : c
        ));
        toast.success('Candidate moved');
    }, [toast]);

    const handleScheduleInterview = useCallback((candidate) => {
        setScheduleCandidate(candidate);
        setShowScheduleModal(true);
    }, []);

    const handleConfirmSchedule = useCallback((scheduleData) => {
        const newInterview = {
            id: Date.now(),
            ...scheduleData,
        };
        setInterviews(prev => [...prev, newInterview]);
        setShowScheduleModal(false);
        setScheduleCandidate(null);
        toast.success('Interview scheduled!');
    }, [toast]);

    const handleSaveCompanyProfile = useCallback((data) => {
        setCompanyProfile(data);
        toast.success('Company profile saved!');
    }, [toast]);

    const handleInviteTeamMember = useCallback((inviteData) => {
        toast.success(`Invitation sent to ${inviteData.email}`);
    }, [toast]);

    const handleSendMessage = useCallback((messageData) => {
        toast.success('Message sent!');
    }, [toast]);

    return (
        <DashboardLayout activeItem="Dashboard" onNavigate={onNavigate} user={user}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-fade-in-down">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1e2a32]">Employer Dashboard</h1>
                        <p className="mt-1 text-[#5a6b75]">Welcome, {user?.name || 'HR Manager'}! Manage your hiring</p>
                    </div>
                    <Button variant="primary" size="lg" onClick={() => setShowPostJobModal(true)}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Post New Job
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map((stat, index) => (
                        <Card key={stat.label} variant="default" padding="md" hover className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-[#5a6b75]">{stat.label}</p>
                                        <p className="mt-1 text-3xl font-bold text-[#1e2a32]">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg`}>{stat.icon}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Tabs Navigation */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
                    <TabsList className="mb-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="candidates">Candidates</TabsTrigger>
                        <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                        <TabsTrigger value="jobs">Jobs</TabsTrigger>
                        <TabsTrigger value="interviews">Interviews</TabsTrigger>
                        <TabsTrigger value="team">Team</TabsTrigger>
                        <TabsTrigger value="messages">Messages</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="company">Company</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                {/* Recent Jobs */}
                                <Card variant="default" padding="none">
                                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                        <CardTitle>Your Job Posts ({jobs.length})</CardTitle>
                                        <Button variant="ghost" size="sm" onClick={() => setActiveTab('jobs')}>View All</Button>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-[#e8e0dc]">
                                            {jobs.slice(0, 4).map((job) => (
                                                <div key={job.id} className="p-4 hover:bg-[#FFD2C2]/10 transition-colors flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-[#1e2a32]">{job.title}</p>
                                                        <p className="text-sm text-[#8a9aa4]">Posted {job.postedAt}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm text-[#5a6b75]">{job.applicants} applicants</span>
                                                        <button onClick={() => toggleJobStatus(job.id)}>
                                                            <Badge variant={statusColors[job.status]} size="sm">{job.status}</Badge>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Recent Candidates */}
                                <Card variant="default" padding="none">
                                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                        <CardTitle>Recent Applicants</CardTitle>
                                        <Button variant="ghost" size="sm" onClick={() => setActiveTab('candidates')}>View All</Button>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {filteredCandidates.slice(0, 4).map((candidate) => (
                                                <ApplicantCard
                                                    key={candidate.id}
                                                    applicant={candidate}
                                                    compact
                                                    onView={() => { }}
                                                />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Upcoming Interviews */}
                                <Card variant="default" padding="none">
                                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                        <CardTitle>Upcoming Interviews</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        {interviews.slice(0, 3).map((interview) => (
                                            <div key={interview.id} className="p-4 hover:bg-[#FFD2C2]/10 border-b border-[#e8e0dc] last:border-b-0">
                                                <p className="font-medium text-[#1e2a32]">{interview.candidateName}</p>
                                                <p className="text-sm text-[#8a9aa4]">{interview.date} at {interview.time}</p>
                                                <Badge variant="info" size="sm" className="mt-1">{interview.type}</Badge>
                                            </div>
                                        ))}
                                    </CardContent>
                                    <div className="p-4 border-t-2 border-[#e8e0dc]">
                                        <Button variant="outline" className="w-full" onClick={() => setActiveTab('interviews')}>View All</Button>
                                    </div>
                                </Card>

                                {/* Quick Actions */}
                                <Card variant="default" padding="lg" className="bg-gradient-to-br from-[#789A99] to-[#5f7d7c] border-0">
                                    <CardContent className="text-center text-white">
                                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                        </div>
                                        <h4 className="font-semibold mb-1">Boost Your Listings</h4>
                                        <p className="text-sm text-white/80 mb-4">Get 3x more applicants with promoted jobs</p>
                                        <Button variant="secondary" className="w-full">Upgrade Plan</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Candidates Tab */}
                    <TabsContent value="candidates">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-1">
                                <ApplicantFilters
                                    filters={filters}
                                    onChange={setFilters}
                                    onClear={() => setFilters({})}
                                    resultCount={filteredCandidates.length}
                                />
                            </div>
                            <div className="lg:col-span-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filteredCandidates.map((candidate) => (
                                        <ApplicantCard
                                            key={candidate.id}
                                            applicant={candidate}
                                            isSelected={selectedCandidates.includes(candidate.id)}
                                            onSelect={handleSelectCandidate}
                                            onView={() => { }}
                                            onShortlist={() => handleMoveCandidate(candidate.id, 'screening')}
                                            onReject={() => handleMoveCandidate(candidate.id, 'rejected')}
                                            onSchedule={() => handleScheduleInterview(candidate)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Pipeline Tab */}
                    <TabsContent value="pipeline">
                        <CandidatePipeline
                            candidates={candidates}
                            onMoveCandidate={handleMoveCandidate}
                            onViewCandidate={() => { }}
                            onScheduleInterview={handleScheduleInterview}
                        />
                    </TabsContent>

                    {/* Jobs Tab */}
                    <TabsContent value="jobs">
                        <Card variant="default" padding="none">
                            <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                <CardTitle>All Job Posts ({jobs.length})</CardTitle>
                                <Button variant="primary" size="sm" onClick={() => setShowPostJobModal(true)}>
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    New Job
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-[#FFD2C2]/20">
                                            <tr>
                                                <th className="px-5 py-4 text-left text-xs font-semibold text-[#5a6b75] uppercase">Position</th>
                                                <th className="px-5 py-4 text-left text-xs font-semibold text-[#5a6b75] uppercase">Status</th>
                                                <th className="px-5 py-4 text-left text-xs font-semibold text-[#5a6b75] uppercase">Applicants</th>
                                                <th className="px-5 py-4 text-left text-xs font-semibold text-[#5a6b75] uppercase">Views</th>
                                                <th className="px-5 py-4 text-left text-xs font-semibold text-[#5a6b75] uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#e8e0dc]">
                                            {jobs.map((job) => (
                                                <tr key={job.id} className="hover:bg-[#FFD2C2]/10 transition-colors">
                                                    <td className="px-5 py-4">
                                                        <p className="font-medium text-[#1e2a32]">{job.title}</p>
                                                        <p className="text-xs text-[#8a9aa4]">Posted {job.postedAt}</p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <button onClick={() => toggleJobStatus(job.id)}>
                                                            <Badge variant={statusColors[job.status]} size="sm">{job.status}</Badge>
                                                        </button>
                                                    </td>
                                                    <td className="px-5 py-4 font-semibold text-[#1e2a32]">{job.applicants}</td>
                                                    <td className="px-5 py-4 text-[#5a6b75]">{job.views}</td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex gap-1">
                                                            <button className="p-2 text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#789A99]/10 rounded-lg transition-all">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                            </button>
                                                            <button className="p-2 text-[#8a9aa4] hover:text-[#60a5fa] hover:bg-[#60a5fa]/10 rounded-lg transition-all">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Interviews Tab */}
                    <TabsContent value="interviews">
                        <InterviewScheduler
                            interviews={interviews}
                            teamMembers={teamMembers}
                            candidate={scheduleCandidate}
                            showModal={showScheduleModal}
                            onSchedule={handleConfirmSchedule}
                            onCloseModal={() => {
                                setShowScheduleModal(false);
                                setScheduleCandidate(null);
                            }}
                        />
                    </TabsContent>

                    {/* Team Tab */}
                    <TabsContent value="team">
                        <TeamAccessPanel
                            teamMembers={teamMembers}
                            pendingInvites={mockPendingInvites}
                            activityLog={mockActivityLog}
                            onInvite={handleInviteTeamMember}
                            onUpdateRole={(id, role) => {
                                setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, role } : m));
                                toast.success('Role updated');
                            }}
                            onRemove={(id) => {
                                setTeamMembers(prev => prev.filter(m => m.id !== id));
                                toast.info('Member removed');
                            }}
                        />
                    </TabsContent>

                    {/* Messages Tab */}
                    <TabsContent value="messages">
                        <MessageCenter
                            candidates={candidates}
                            conversations={conversations}
                            onSendMessage={handleSendMessage}
                        />
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics">
                        <AnalyticsDashboard
                            stats={{
                                totalApplications: candidates.length,
                                interviewRate: Math.round((candidates.filter(c => c.stage === 'interview').length / candidates.length) * 100),
                                hireRate: Math.round((candidates.filter(c => c.stage === 'hired').length / candidates.length) * 100),
                            }}
                            jobPerformance={jobs.map(j => ({
                                id: j.id,
                                title: j.title,
                                views: j.views || 0,
                                applications: j.applicants || 0,
                                interviews: Math.floor((j.applicants || 0) * 0.3),
                                offers: Math.floor((j.applicants || 0) * 0.1),
                            }))}
                        />
                    </TabsContent>

                    {/* Company Profile Tab */}
                    <TabsContent value="company">
                        <CompanyProfileForm
                            company={companyProfile}
                            onSave={handleSaveCompanyProfile}
                        />
                    </TabsContent>
                </Tabs>

                {/* Bulk Actions Bar */}
                <BulkActionsBar
                    selectedCount={selectedCandidates.length}
                    totalCount={filteredCandidates.length}
                    onApprove={handleBulkApprove}
                    onReject={handleBulkReject}
                    onSchedule={() => setShowScheduleModal(true)}
                    onClearSelection={() => setSelectedCandidates([])}
                    onSelectAll={() => setSelectedCandidates(filteredCandidates.map(c => c.id))}
                />

                {/* Post Job Modal */}
                {showPostJobModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-[#1e2a32]/40 backdrop-blur-sm" onClick={() => setShowPostJobModal(false)} />
                        <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
                            <JobPostingForm
                                onSubmit={handlePostJob}
                                onCancel={() => setShowPostJobModal(false)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
