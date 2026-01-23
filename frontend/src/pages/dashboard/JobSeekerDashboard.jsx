import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Modal, ModalFooter } from '../../components/ui';
import { ResumeUploader, ResumePreview, ResumeVersionList, ResumeAnalysisModal } from '../../components/resume';
import { mockNotifications, mockJobs } from '../../data/mockData';
import { useState, useEffect, useCallback } from 'react';
import { getResumes, saveResume, deleteResume, setPrimaryResume } from '../../utils/resumeStorage';
import { parseResume, createMockParsedData } from '../../utils/resumeParser';
import { analyzeResume, createDemoAnalysis } from '../../utils/resumeAnalyzer';
import { useAuth } from '../../contexts/AuthContext';
import { useJobs } from '../../contexts/JobContext';

export default function JobSeekerDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { savedJobs, applications } = useJobs();
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showAnalysisModal, setShowAnalysisModal] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);
    const [previewResumeData, setPreviewResumeData] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [analysisResumeName, setAnalysisResumeName] = useState('');
    const [resumes, setResumes] = useState([]);
    const [primaryResumeId, setPrimaryResumeIdState] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const profileCompletion = resumes.length > 0 ? 90 : 75;

    // Load resumes on mount
    useEffect(() => {
        const userId = user?.id || 'default';
        const { resumes: storedResumes, primaryResumeId: storedPrimaryId } = getResumes(userId);
        setResumes(storedResumes);
        setPrimaryResumeIdState(storedPrimaryId);
    }, [user]);

    const stats = [
        { label: 'Applications', value: applications.length, change: `+${Math.min(applications.length, 3)} this week`, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, color: 'bg-[#789A99]' },
        { label: 'In Review', value: Math.floor(applications.length * 0.3), change: 'Awaiting response', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'bg-[#fbbf24]' },
        { label: 'Interviews', value: Math.floor(applications.length * 0.15), change: 'Next: Tomorrow 2PM', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, color: 'bg-[#60a5fa]' },
        { label: 'Resumes', value: resumes.length, change: resumes.length > 0 ? `${resumes.length}/5 versions` : 'Upload your resume', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, color: 'bg-[#FFD2C2]' },
    ];

    const displayApplications = applications.length > 0 ? applications : [
        { id: 1, jobTitle: 'Senior Frontend Developer', company: 'TechCorp Inc.', appliedAt: 'Jan 15, 2026', status: 'In Review', statusColor: 'warning' },
        { id: 2, jobTitle: 'Product Designer', company: 'DesignHub Studio', appliedAt: 'Jan 10, 2026', status: 'Interview Scheduled', statusColor: 'info' },
        { id: 3, jobTitle: 'Backend Engineer', company: 'DataFlow Systems', appliedAt: 'Jan 5, 2026', status: 'Offer Received', statusColor: 'success' },
    ];

    const handleUpload = useCallback(async (file) => {
        setIsUploading(true);
        try {
            // Try to parse the resume
            let parsedData = null;
            try {
                parsedData = await parseResume(file);
                // If parsing failed, use mock data for demo
                if (!parsedData.parseSuccess) {
                    parsedData = createMockParsedData(file.name);
                }
            } catch {
                parsedData = createMockParsedData(file.name);
            }

            const userId = user?.id || 'default';
            const result = await saveResume(file, parsedData, userId);

            if (result.success) {
                // Refresh resumes list
                const { resumes: updatedResumes, primaryResumeId: updatedPrimaryId } = getResumes(userId);
                setResumes(updatedResumes);
                setPrimaryResumeIdState(updatedPrimaryId);
                setShowResumeModal(false);
            } else {
                throw new Error(result.error || 'Upload failed');
            }
        } finally {
            setIsUploading(false);
        }
    }, [user]);

    const handlePreviewFile = useCallback((file) => {
        setPreviewFile(file);
        setPreviewResumeData(null);
        setShowPreviewModal(true);
    }, []);

    const handlePreviewResume = useCallback((resume) => {
        setPreviewFile(null);
        setPreviewResumeData(resume);
        setShowPreviewModal(true);
    }, []);

    const handleSetPrimary = useCallback((resumeId) => {
        const userId = user?.id || 'default';
        const result = setPrimaryResume(resumeId, userId);
        if (result.success) {
            setPrimaryResumeIdState(resumeId);
        }
    }, [user]);

    const handleDeleteResume = useCallback((resumeId) => {
        const userId = user?.id || 'default';
        const result = deleteResume(resumeId, userId);
        if (result.success) {
            const { resumes: updatedResumes, primaryResumeId: updatedPrimaryId } = getResumes(userId);
            setResumes(updatedResumes);
            setPrimaryResumeIdState(updatedPrimaryId);
        }
    }, [user]);

    const handleAnalyzeResume = useCallback((resume) => {
        // Use the first mock job for demo analysis, or create a generic one
        const demoJob = mockJobs[0] || {
            title: 'Sample Position',
            skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Git'],
            experienceLevel: 'Mid Level',
            description: 'Looking for a skilled developer with strong frontend and backend experience.'
        };

        // Perform analysis using resume parsed data
        let analysis;
        if (resume.parsedData) {
            analysis = analyzeResume(resume.parsedData, demoJob);
        } else {
            // Use demo analysis if no parsed data
            analysis = createDemoAnalysis();
        }

        setAnalysisResult(analysis);
        setAnalysisResumeName(resume.fileName);
        setShowAnalysisModal(true);
    }, []);

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 animate-fade-in-down">
                    <h1 className="text-2xl font-bold text-[#1e2a32]">Welcome back, {user?.name?.split(' ')[0] || 'John'}! 👋</h1>
                    <p className="mt-1 text-[#5a6b75]">Here's what's happening with your job search</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <Card
                            key={stat.label}
                            variant="default"
                            padding="md"
                            hover
                            className="cursor-pointer animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => stat.label === 'Resumes' && setShowResumeModal(true)}
                        >
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-[#5a6b75]">{stat.label}</p>
                                        <p className="mt-1 text-3xl font-bold text-[#1e2a32]">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg`}>{stat.icon}</div>
                                </div>
                                <p className="mt-2 text-xs text-[#789A99] font-medium">{stat.change}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Resume Management Card */}
                        <Card variant="default" padding="lg" className="animate-fade-in-up stagger-1">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Resume Manager
                                </CardTitle>
                                <Button variant="primary" size="sm" onClick={() => setShowResumeModal(true)}>
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Upload New
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <ResumeVersionList
                                    resumes={resumes}
                                    primaryResumeId={primaryResumeId}
                                    onSetPrimary={handleSetPrimary}
                                    onDelete={handleDeleteResume}
                                    onPreview={handlePreviewResume}
                                    onAnalyze={handleAnalyzeResume}
                                />
                            </CardContent>
                        </Card>

                        {/* Profile Completion */}
                        <Card variant="default" padding="lg" className="animate-fade-in-up stagger-2">
                            <CardHeader>
                                <CardTitle>Complete Your Profile</CardTitle>
                                <span className="text-sm font-semibold text-[#789A99]">{profileCompletion}% Complete</span>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <div className="w-full bg-[#e8e0dc] rounded-full h-3 overflow-hidden">
                                        <div className="bg-gradient-to-r from-[#789A99] to-[#5f7d7c] h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: `${profileCompletion}%` }} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { name: 'Basic Info', done: true },
                                        { name: 'Experience', done: true },
                                        { name: 'Resume', done: resumes.length > 0 },
                                        { name: 'Skills', done: false }
                                    ].map((item) => (
                                        <div key={item.name} className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${item.done ? 'bg-[#4ade80]/15' : 'bg-[#e8e0dc] hover:bg-[#FFD2C2]/30'}`}>
                                            {item.done ? (
                                                <svg className="w-4 h-4 text-[#4ade80]" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            ) : (
                                                <div className="w-4 h-4 rounded-full border-2 border-[#8a9aa4]" />
                                            )}
                                            <span className={`text-xs font-medium ${item.done ? 'text-[#16a34a]' : 'text-[#5a6b75]'}`}>{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <Button variant="primary" size="sm" onClick={() => navigate('/profile')}>Complete Profile</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up stagger-2">
                            <button
                                onClick={() => navigate('/jobs')}
                                className="p-4 bg-white border-2 border-[#e8e0dc] rounded-2xl text-left hover:border-[#789A99] hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 bg-[#789A99]/10 rounded-xl flex items-center justify-center text-[#789A99] mb-3 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <p className="font-medium text-[#1e2a32]">Browse Jobs</p>
                                <p className="text-xs text-[#5a6b75]">Find new opportunities</p>
                            </button>
                            <button
                                onClick={() => navigate('/saved')}
                                className="p-4 bg-white border-2 border-[#e8e0dc] rounded-2xl text-left hover:border-[#FFD2C2] hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 bg-[#FFD2C2]/30 rounded-xl flex items-center justify-center text-[#789A99] mb-3 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                                </div>
                                <p className="font-medium text-[#1e2a32]">Saved Jobs</p>
                                <p className="text-xs text-[#5a6b75]">{savedJobs.length} saved</p>
                            </button>
                            <button
                                onClick={() => navigate('/applications')}
                                className="p-4 bg-white border-2 border-[#e8e0dc] rounded-2xl text-left hover:border-[#60a5fa] hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 bg-[#60a5fa]/10 rounded-xl flex items-center justify-center text-[#60a5fa] mb-3 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                </div>
                                <p className="font-medium text-[#1e2a32]">Applications</p>
                                <p className="text-xs text-[#5a6b75]">{applications.length} active</p>
                            </button>
                        </div>

                        {/* Recent Applications */}
                        <Card variant="default" padding="none" className="animate-fade-in-up stagger-3">
                            <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                <CardTitle>Recent Applications</CardTitle>
                                <Button variant="ghost" size="sm" onClick={() => navigate('/applications')}>View All</Button>
                            </CardHeader>
                            {displayApplications.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow hoverable={false}>
                                            <TableHead>Position</TableHead>
                                            <TableHead>Company</TableHead>
                                            <TableHead>Applied</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {displayApplications.slice(0, 5).map((app) => (
                                            <TableRow key={app.id}>
                                                <TableCell className="font-medium text-[#1e2a32]">{app.jobTitle}</TableCell>
                                                <TableCell>{app.company}</TableCell>
                                                <TableCell>{app.appliedAt}</TableCell>
                                                <TableCell><Badge variant={app.statusColor || 'primary'} size="sm">{app.status}</Badge></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="p-8 text-center">
                                    <p className="text-[#5a6b75]">No applications yet</p>
                                    <Button variant="primary" size="sm" className="mt-3" onClick={() => navigate('/jobs')}>Browse Jobs</Button>
                                </div>
                            )}
                        </Card>
                    </div>

                    <div className="space-y-6">
                        {/* Notifications */}
                        <Card variant="default" padding="none" className="animate-fade-in-up stagger-3">
                            <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                <CardTitle className="flex items-center gap-2">
                                    Notifications
                                    <span className="px-2 py-0.5 text-xs font-semibold bg-[#f87171] text-white rounded-full">2</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {mockNotifications.map((notif) => (
                                    <div key={notif.id} className={`p-4 hover:bg-[#FFD2C2]/10 transition-all duration-300 cursor-pointer border-b border-[#e8e0dc] last:border-b-0 ${!notif.isRead ? 'bg-[#789A99]/5' : ''}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2.5 rounded-xl flex-shrink-0 ${notif.type === 'interview' ? 'bg-[#60a5fa]/15 text-[#2563eb]' :
                                                notif.type === 'view' ? 'bg-[#4ade80]/15 text-[#16a34a]' :
                                                    notif.type === 'match' ? 'bg-[#a78bfa]/15 text-[#7c3aed]' :
                                                        'bg-[#e8e0dc] text-[#5a6b75]'
                                                }`}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[#1e2a32]">{notif.title}</p>
                                                <p className="text-xs text-[#5a6b75] mt-0.5 line-clamp-2">{notif.message}</p>
                                                <p className="text-xs text-[#8a9aa4] mt-1">{notif.time}</p>
                                            </div>
                                            {!notif.isRead && <div className="w-2.5 h-2.5 bg-[#789A99] rounded-full flex-shrink-0 animate-pulse" />}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Upgrade CTA */}
                        <Card variant="default" padding="lg" className="bg-gradient-to-br from-[#FFD2C2] to-[#f5b8a3] border-0 animate-float animate-fade-in-up stagger-4">
                            <CardContent className="text-center">
                                <div className="w-14 h-14 bg-white/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-7 h-7 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <h4 className="font-semibold text-[#1e2a32] mb-1">Upgrade to Pro</h4>
                                <p className="text-sm text-[#5a6b75] mb-4">Get priority applications and analytics</p>
                                <Button variant="primary" className="w-full">Upgrade Now</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Resume Upload Modal */}
            <Modal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} title="Upload Resume" size="lg">
                <ResumeUploader
                    onUpload={handleUpload}
                    onPreview={handlePreviewFile}
                    isUploading={isUploading}
                />
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowResumeModal(false)}>Close</Button>
                </ModalFooter>
            </Modal>

            {/* Resume Preview Modal */}
            <Modal isOpen={showPreviewModal} onClose={() => setShowPreviewModal(false)} title="Resume Preview" size="2xl">
                <ResumePreview
                    file={previewFile}
                    resumeData={previewResumeData}
                    onClose={() => setShowPreviewModal(false)}
                />
            </Modal>

            {/* Resume Analysis Modal */}
            <ResumeAnalysisModal
                isOpen={showAnalysisModal}
                onClose={() => setShowAnalysisModal(false)}
                analysis={analysisResult}
                resumeName={analysisResumeName}
                jobTitle={mockJobs[0]?.title || 'Sample Position'}
            />
        </DashboardLayout>
    );
}
