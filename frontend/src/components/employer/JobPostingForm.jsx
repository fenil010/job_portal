import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, TagInput } from '../ui';
import RichTextEditor from './RichTextEditor';

const JOB_TYPE_OPTIONS = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' },
];

const EXPERIENCE_OPTIONS = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (2-5 years)' },
    { value: 'senior', label: 'Senior Level (5-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' },
];

const REMOTE_OPTIONS = [
    { value: 'onsite', label: 'On-site' },
    { value: 'remote', label: 'Fully Remote' },
    { value: 'hybrid', label: 'Hybrid' },
];

const SKILL_SUGGESTIONS = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python',
    'Java', 'C++', 'Go', 'Rust', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker',
    'Kubernetes', 'GraphQL', 'REST API', 'Git', 'CI/CD', 'Agile', 'Scrum',
    'Machine Learning', 'Data Science', 'DevOps', 'Cloud Computing',
];

const BENEFIT_SUGGESTIONS = [
    'Health Insurance', 'Dental Insurance', 'Vision Insurance', '401(k) Matching',
    'Stock Options', 'Unlimited PTO', 'Flexible Hours', 'Remote Work',
    'Learning Budget', 'Gym Membership', 'Free Meals', 'Parental Leave',
    'Mental Health Support', 'Home Office Stipend', 'Conference Budget',
];

export default function JobPostingForm({ job = {}, onSubmit, onCancel, onSaveDraft }) {
    const [formData, setFormData] = useState({
        title: job.title || '',
        location: job.location || '',
        jobType: job.jobType || 'full-time',
        remoteOption: job.remoteOption || 'onsite',
        experienceLevel: job.experienceLevel || 'mid',
        salaryMin: job.salaryMin || '',
        salaryMax: job.salaryMax || '',
        showSalary: job.showSalary !== false,
        skills: job.skills || [],
        description: job.description || '',
        requirements: job.requirements || '',
        benefits: job.benefits || [],
        applicationDeadline: job.applicationDeadline || '',
        ...job,
    });

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    const handleDraft = () => {
        onSaveDraft?.(formData);
    };

    const isStepComplete = (step) => {
        switch (step) {
            case 1:
                return formData.title && formData.location && formData.jobType;
            case 2:
                return formData.description && formData.skills.length > 0;
            case 3:
                return true;
            default:
                return false;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card variant="default" padding="none">
                <CardHeader className="p-6 border-b-2 border-[#e8e0dc]">
                    <div>
                        <CardTitle>{job.id ? 'Edit Job Posting' : 'Create New Job Posting'}</CardTitle>
                        <p className="text-sm text-[#8a9aa4] mt-0.5">Step {currentStep} of {totalSteps}</p>
                    </div>
                    {onSaveDraft && (
                        <Button type="button" variant="outline" size="sm" onClick={handleDraft}>
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            Save Draft
                        </Button>
                    )}
                </CardHeader>

                {/* Progress Bar */}
                <div className="px-6 pt-4">
                    <div className="flex items-center gap-2">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex-1 flex items-center">
                                <div
                                    className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                                        ${step < currentStep ? 'bg-[#789A99] text-white' :
                                            step === currentStep ? 'bg-[#FFD2C2] text-[#1e2a32] ring-2 ring-[#789A99]' :
                                                'bg-[#e8e0dc] text-[#8a9aa4]'}
                                    `}
                                >
                                    {step < currentStep ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : step}
                                </div>
                                {step < 3 && (
                                    <div className={`flex-1 h-0.5 mx-2 ${step < currentStep ? 'bg-[#789A99]' : 'bg-[#e8e0dc]'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-[#8a9aa4]">
                        <span>Basic Info</span>
                        <span>Details</span>
                        <span>Benefits</span>
                    </div>
                </div>

                <CardContent className="p-6 space-y-6">
                    {/* Step 1: Basic Info */}
                    {currentStep === 1 && (
                        <div className="space-y-5 animate-fade-in">
                            <Input
                                label="Job Title"
                                placeholder="e.g. Senior Frontend Developer"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                required
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input
                                    label="Location"
                                    placeholder="e.g. San Francisco, CA"
                                    value={formData.location}
                                    onChange={(e) => handleChange('location', e.target.value)}
                                    required
                                />
                                <Select
                                    label="Remote Policy"
                                    options={REMOTE_OPTIONS}
                                    value={formData.remoteOption}
                                    onChange={(value) => handleChange('remoteOption', value)}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Select
                                    label="Job Type"
                                    options={JOB_TYPE_OPTIONS}
                                    value={formData.jobType}
                                    onChange={(value) => handleChange('jobType', value)}
                                />
                                <Select
                                    label="Experience Level"
                                    options={EXPERIENCE_OPTIONS}
                                    value={formData.experienceLevel}
                                    onChange={(value) => handleChange('experienceLevel', value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1e2a32] mb-2">Salary Range (USD)</label>
                                <div className="flex items-center gap-3">
                                    <Input
                                        placeholder="Min"
                                        type="number"
                                        value={formData.salaryMin}
                                        onChange={(e) => handleChange('salaryMin', e.target.value)}
                                        className="flex-1"
                                    />
                                    <span className="text-[#8a9aa4]">to</span>
                                    <Input
                                        placeholder="Max"
                                        type="number"
                                        value={formData.salaryMax}
                                        onChange={(e) => handleChange('salaryMax', e.target.value)}
                                        className="flex-1"
                                    />
                                </div>
                                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.showSalary}
                                        onChange={(e) => handleChange('showSalary', e.target.checked)}
                                        className="w-4 h-4 rounded border-[#e8e0dc] text-[#789A99] focus:ring-[#789A99]"
                                    />
                                    <span className="text-sm text-[#5a6b75]">Display salary on job listing</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Job Details */}
                    {currentStep === 2 && (
                        <div className="space-y-5 animate-fade-in">
                            <TagInput
                                label="Required Skills"
                                value={formData.skills}
                                onChange={(skills) => handleChange('skills', skills)}
                                placeholder="Add skills..."
                                suggestions={SKILL_SUGGESTIONS}
                                maxTags={15}
                            />
                            <RichTextEditor
                                label="Job Description"
                                value={formData.description}
                                onChange={(desc) => handleChange('description', desc)}
                                placeholder="Describe the role, responsibilities, and what a typical day looks like..."
                                minHeight="180px"
                            />
                            <RichTextEditor
                                label="Requirements"
                                value={formData.requirements}
                                onChange={(req) => handleChange('requirements', req)}
                                placeholder="List the required qualifications, experience, and skills..."
                                minHeight="150px"
                            />
                        </div>
                    )}

                    {/* Step 3: Benefits & Final */}
                    {currentStep === 3 && (
                        <div className="space-y-5 animate-fade-in">
                            <TagInput
                                label="Benefits & Perks"
                                value={formData.benefits}
                                onChange={(benefits) => handleChange('benefits', benefits)}
                                placeholder="Add benefits..."
                                suggestions={BENEFIT_SUGGESTIONS}
                            />
                            <Input
                                label="Application Deadline (optional)"
                                type="date"
                                value={formData.applicationDeadline}
                                onChange={(e) => handleChange('applicationDeadline', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />

                            {/* Preview Summary */}
                            <div className="p-4 bg-[#fdf9f7] rounded-xl border border-[#e8e0dc]">
                                <h4 className="font-semibold text-[#1e2a32] mb-3">Job Summary</h4>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-[#8a9aa4]">Title</p>
                                        <p className="font-medium text-[#1e2a32]">{formData.title || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#8a9aa4]">Location</p>
                                        <p className="font-medium text-[#1e2a32]">{formData.location || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#8a9aa4]">Type</p>
                                        <p className="font-medium text-[#1e2a32] capitalize">{formData.jobType}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#8a9aa4]">Remote</p>
                                        <p className="font-medium text-[#1e2a32] capitalize">{formData.remoteOption}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#8a9aa4]">Salary</p>
                                        <p className="font-medium text-[#1e2a32]">
                                            {formData.salaryMin && formData.salaryMax
                                                ? `$${formData.salaryMin.toLocaleString()} - $${formData.salaryMax.toLocaleString()}`
                                                : '—'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[#8a9aa4]">Skills</p>
                                        <p className="font-medium text-[#1e2a32]">{formData.skills.length} selected</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>

                {/* Navigation */}
                <div className="flex items-center justify-between p-6 border-t-2 border-[#e8e0dc]">
                    <div>
                        {currentStep > 1 && (
                            <Button type="button" variant="ghost" onClick={() => setCurrentStep(currentStep - 1)}>
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </Button>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {onCancel && (
                            <Button type="button" variant="ghost" onClick={onCancel}>
                                Cancel
                            </Button>
                        )}
                        {currentStep < totalSteps ? (
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => setCurrentStep(currentStep + 1)}
                                disabled={!isStepComplete(currentStep)}
                            >
                                Next
                                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Button>
                        ) : (
                            <Button type="submit" variant="primary">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Publish Job
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </form>
    );
}
