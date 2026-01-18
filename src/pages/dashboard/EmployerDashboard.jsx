import { DashboardLayout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Modal, ModalFooter, Input, Select } from '../../components/ui';
import { mockEmployerStats, mockEmployerJobs } from '../../data/mockData';
import { useState } from 'react';

export default function EmployerDashboard({ onNavigate, user }) {
    const [showPostJobModal, setShowPostJobModal] = useState(false);
    const [jobs, setJobs] = useState(mockEmployerJobs);
    const [newJob, setNewJob] = useState({ title: '', location: '', type: 'full-time', salary: '' });

    const statusColors = { Active: 'success', Paused: 'warning', Closed: 'default' };

    const stats = [
        { label: 'Active Jobs', value: jobs.filter(j => j.status === 'Active').length, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, color: 'bg-[#4ade80]' },
        { label: 'Applications', value: jobs.reduce((sum, j) => sum + j.applicants, 0), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, color: 'bg-[#789A99]' },
        { label: 'Interviews', value: mockEmployerStats.interviewsScheduled, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, color: 'bg-[#60a5fa]' },
        { label: 'Hired', value: mockEmployerStats.hiredThisMonth, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'bg-[#FFD2C2]' },
    ];

    const applicants = [
        { name: 'Sarah Connor', role: 'Sr. Frontend Dev', match: 95, avatar: 'SC' },
        { name: 'John Wick', role: 'Sr. Frontend Dev', match: 88, avatar: 'JW' },
        { name: 'Jane Smith', role: 'Product Manager', match: 92, avatar: 'JS' },
    ];

    const handlePostJob = () => {
        if (!newJob.title || !newJob.location) return;

        const job = {
            id: Date.now(),
            title: newJob.title,
            location: newJob.location,
            type: newJob.type,
            status: 'Active',
            applicants: 0,
            views: 0,
            postedAt: 'Just now',
        };

        setJobs([job, ...jobs]);
        setShowPostJobModal(false);
        setNewJob({ title: '', location: '', type: 'full-time', salary: '' });
    };

    const toggleJobStatus = (jobId) => {
        setJobs(jobs.map(job => {
            if (job.id === jobId) {
                return { ...job, status: job.status === 'Active' ? 'Paused' : 'Active' };
            }
            return job;
        }));
    };

    return (
        <DashboardLayout activeItem="Dashboard" onNavigate={onNavigate}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in-down">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1e2a32]">Employer Dashboard</h1>
                        <p className="mt-1 text-[#5a6b75]">Welcome, {user?.name || 'HR Manager'}! Manage your job postings</p>
                    </div>
                    <Button variant="primary" size="lg" onClick={() => setShowPostJobModal(true)}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Post New Job
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card variant="default" padding="none" className="animate-fade-in-up stagger-2">
                            <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                <CardTitle>Your Job Posts ({jobs.length})</CardTitle>
                                <Button variant="ghost" size="sm">View All</Button>
                            </CardHeader>
                            <Table>
                                <TableHeader>
                                    <TableRow hoverable={false}>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Applicants</TableHead>
                                        <TableHead>Views</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {jobs.map((job, index) => (
                                        <TableRow key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${(index + 3) * 50}ms` }}>
                                            <TableCell>
                                                <p className="font-medium text-[#1e2a32]">{job.title}</p>
                                                <p className="text-xs text-[#8a9aa4]">Posted {job.postedAt}</p>
                                            </TableCell>
                                            <TableCell>
                                                <button onClick={() => toggleJobStatus(job.id)} className="cursor-pointer">
                                                    <Badge variant={statusColors[job.status]} size="sm">{job.status}</Badge>
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-semibold text-[#1e2a32]">{job.applicants}</span>
                                            </TableCell>
                                            <TableCell>{job.views}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <button className="p-2 text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#FFD2C2]/20 rounded-lg transition-all duration-300" title="Edit">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                    </button>
                                                    <button className="p-2 text-[#8a9aa4] hover:text-[#60a5fa] hover:bg-[#60a5fa]/10 rounded-lg transition-all duration-300" title="View Applicants">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card variant="default" padding="none" className="animate-fade-in-up stagger-3">
                            <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                <CardTitle>Recent Applicants</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {applicants.map((applicant, idx) => (
                                    <div key={idx} className="p-4 hover:bg-[#FFD2C2]/10 border-b border-[#e8e0dc] last:border-b-0 transition-all duration-300 cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 bg-gradient-to-br from-[#789A99] to-[#5f7d7c] rounded-xl flex items-center justify-center text-white text-sm font-semibold shadow-md group-hover:scale-110 transition-transform">
                                                {applicant.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-[#1e2a32]">{applicant.name}</p>
                                                <p className="text-xs text-[#5a6b75]">{applicant.role}</p>
                                            </div>
                                            <span className="text-xs font-semibold text-[#789A99] bg-[#789A99]/10 px-2.5 py-1 rounded-full">{applicant.match}% match</span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                            <div className="p-4 border-t-2 border-[#e8e0dc]">
                                <Button variant="outline" className="w-full">View All Applicants</Button>
                            </div>
                        </Card>

                        <Card variant="default" padding="lg" className="bg-gradient-to-br from-[#789A99] to-[#5f7d7c] border-0 animate-float animate-fade-in-up stagger-4">
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
            </div>

            {/* Post Job Modal */}
            <Modal isOpen={showPostJobModal} onClose={() => setShowPostJobModal(false)} title="Post a New Job" size="lg">
                <div className="space-y-5">
                    <Input
                        label="Job Title"
                        placeholder="e.g. Senior Frontend Developer"
                        value={newJob.title}
                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        required
                    />
                    <Input
                        label="Location"
                        placeholder="e.g. San Francisco, CA or Remote"
                        value={newJob.location}
                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                        required
                    />
                    <Select
                        label="Job Type"
                        options={[
                            { value: 'full-time', label: 'Full-time' },
                            { value: 'part-time', label: 'Part-time' },
                            { value: 'contract', label: 'Contract' },
                            { value: 'internship', label: 'Internship' },
                        ]}
                        value={newJob.type}
                        onChange={(value) => setNewJob({ ...newJob, type: value })}
                    />
                    <Input
                        label="Salary Range"
                        placeholder="e.g. $100,000 - $150,000"
                        value={newJob.salary}
                        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    />
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowPostJobModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handlePostJob} disabled={!newJob.title || !newJob.location}>Post Job</Button>
                </ModalFooter>
            </Modal>
        </DashboardLayout>
    );
}
