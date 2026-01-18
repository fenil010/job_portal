import { DashboardLayout } from '../../components/layout';
import { Button, Badge, Card, CardHeader, CardTitle, CardContent, Modal, ModalFooter } from '../../components/ui';
import { useState } from 'react';

export default function JobDetailsPage({ job, onNavigate, onSaveJob, onApplyJob, isSaved, hasApplied }) {
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');

    const defaultJob = {
        id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Inc.', location: 'San Francisco, CA',
        salaryMin: 150000, salaryMax: 200000, jobType: 'Full-time', isRemote: true, experienceLevel: 'Senior',
        postedAt: '2 days ago', skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
        description: 'We are looking for an experienced Frontend Developer to join our growing team. You will be responsible for building user-facing features and ensuring the technical feasibility of UI/UX designs.',
        responsibilities: ['Build reusable components', 'Optimize for performance', 'Collaborate with designers', 'Mentor junior developers'],
        requirements: ['5+ years of experience', 'Strong React knowledge', 'Experience with TypeScript', 'Excellent communication'],
        benefits: ['Health Insurance', 'Remote Work', '401k Match', 'Unlimited PTO', 'Learning Budget'],
        companyDescription: 'TechCorp is a leading technology company building innovative solutions.',
        companySize: '501-1000', companyIndustry: 'Technology',
    };

    const jobData = job || defaultJob;

    const formatSalary = (min, max) => {
        const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
        return `${fmt.format(min)} - ${fmt.format(max)}`;
    };

    const handleApplyClick = () => {
        if (hasApplied) return;
        setShowApplyModal(true);
    };

    const handleSubmitApplication = () => {
        onApplyJob?.(jobData);
        setShowApplyModal(false);
        setResumeFile(null);
        setCoverLetter('');
    };

    return (
        <DashboardLayout activeItem="Jobs" onNavigate={onNavigate}>
            <div className="max-w-6xl mx-auto">
                <button onClick={() => onNavigate?.('Jobs')} className="flex items-center gap-2 text-sm text-[#5a6b75] hover:text-[#1e2a32] mb-6 transition-all duration-300 hover:-translate-x-1 animate-fade-in">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back to Jobs
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <main className="lg:col-span-2 space-y-6">
                        <Card variant="elevated" padding="lg" className="animate-fade-in-up">
                            <div className="flex items-start gap-5">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFD2C2] to-[#f5b8a3] flex items-center justify-center text-[#789A99] font-bold text-3xl shadow-lg">
                                    {jobData.company?.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-[#1e2a32]">{jobData.title}</h1>
                                    <p className="text-[#5a6b75] mt-1">{jobData.company}</p>
                                    <div className="flex flex-wrap items-center gap-3 mt-4">
                                        <span className="flex items-center gap-1.5 text-sm text-[#5a6b75]">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                            {jobData.location}
                                        </span>
                                        {jobData.isRemote && <Badge variant="success">Remote</Badge>}
                                        <Badge variant="primary">{jobData.jobType}</Badge>
                                        <Badge variant="outline">{jobData.experienceLevel}</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card variant="default" padding="lg" className="animate-fade-in-up stagger-1">
                            <CardHeader><CardTitle>Description</CardTitle></CardHeader>
                            <CardContent><p className="text-[#5a6b75] leading-relaxed">{jobData.description}</p></CardContent>
                        </Card>

                        <Card variant="default" padding="lg" className="animate-fade-in-up stagger-2">
                            <CardHeader><CardTitle>Responsibilities</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {jobData.responsibilities?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[#5a6b75]">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-[#789A99] flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card variant="default" padding="lg" className="animate-fade-in-up stagger-3">
                            <CardHeader><CardTitle>Requirements</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {jobData.requirements?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[#5a6b75]">
                                            <svg className="w-5 h-5 text-[#789A99] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card variant="default" padding="lg" className="animate-fade-in-up stagger-4">
                            <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {jobData.skills?.map((skill) => (
                                        <Badge key={skill} variant="secondary" size="lg" className="hover:scale-110 transition-transform duration-300 cursor-default">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </main>

                    <aside className="space-y-6">
                        <Card variant="elevated" padding="lg" className="sticky top-24 animate-fade-in-up stagger-2">
                            <div className="text-center mb-6">
                                <p className="text-sm text-[#5a6b75]">Salary Range</p>
                                <p className="text-2xl font-bold text-[#1e2a32] mt-1">{formatSalary(jobData.salaryMin, jobData.salaryMax)}</p>
                                <p className="text-xs text-[#8a9aa4]">per year</p>
                            </div>
                            <div className="space-y-3">
                                <Button
                                    variant={hasApplied ? 'ghost' : 'primary'}
                                    size="lg"
                                    className={`w-full ${!hasApplied ? 'animate-subtle-pulse' : ''}`}
                                    onClick={handleApplyClick}
                                    disabled={hasApplied}
                                >
                                    {hasApplied ? (
                                        <>
                                            <svg className="w-5 h-5 mr-2 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Applied
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                            Apply Now
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant={isSaved ? 'secondary' : 'outline'}
                                    size="lg"
                                    className="w-full"
                                    onClick={() => onSaveJob?.(jobData)}
                                >
                                    <svg className="w-5 h-5 mr-2" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                    {isSaved ? 'Saved' : 'Save Job'}
                                </Button>
                            </div>
                            <p className="text-xs text-[#8a9aa4] text-center mt-4">Posted {jobData.postedAt}</p>
                        </Card>

                        <Card variant="default" padding="lg" className="animate-fade-in-up stagger-3">
                            <CardHeader><CardTitle>About {jobData.company}</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-sm text-[#5a6b75] mb-4">{jobData.companyDescription}</p>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between"><span className="text-[#8a9aa4]">Industry</span><span className="text-[#1e2a32] font-medium">{jobData.companyIndustry}</span></div>
                                    <div className="flex justify-between"><span className="text-[#8a9aa4]">Company Size</span><span className="text-[#1e2a32] font-medium">{jobData.companySize}</span></div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="ghost" padding="lg" className="animate-fade-in-up stagger-4">
                            <CardHeader><CardTitle>Benefits</CardTitle></CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {jobData.benefits?.map((benefit) => (
                                        <Badge key={benefit} variant="primary" size="md">{benefit}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>

            {/* Apply Modal */}
            <Modal
                isOpen={showApplyModal}
                onClose={() => setShowApplyModal(false)}
                title={`Apply to ${jobData.title}`}
                description={`at ${jobData.company}`}
                size="lg"
            >
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-[#5a6b75] mb-2">Resume / CV</label>
                        <div
                            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-300 ${resumeFile ? 'border-[#789A99] bg-[#789A99]/5' : 'border-[#e8e0dc] hover:border-[#FFD2C2]'
                                }`}
                        >
                            {resumeFile ? (
                                <div className="flex items-center justify-center gap-3">
                                    <svg className="w-8 h-8 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-[#1e2a32]">{resumeFile.name}</p>
                                        <button
                                            type="button"
                                            onClick={() => setResumeFile(null)}
                                            className="text-xs text-[#f87171] hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <svg className="w-10 h-10 text-[#8a9aa4] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="text-sm text-[#5a6b75] mb-2">Drag & drop your resume or</p>
                                    <label className="cursor-pointer text-sm font-medium text-[#789A99] hover:underline">
                                        Browse files
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                                        />
                                    </label>
                                </>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#5a6b75] mb-2">Cover Letter (Optional)</label>
                        <textarea
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Tell us why you'd be a great fit for this role..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border-2 border-[#e8e0dc] bg-white text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:shadow-[0_0_0_3px_rgba(120,154,153,0.2)] transition-all duration-300 resize-none"
                        />
                    </div>
                </div>

                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowApplyModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmitApplication}>
                        Submit Application
                    </Button>
                </ModalFooter>
            </Modal>
        </DashboardLayout>
    );
}
