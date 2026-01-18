import { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/layout';
import { Button, Select } from '../../components/ui';
import { JobCard, JobFilters } from '../../components/jobs';
import { mockJobs } from '../../data/mockData';

const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'salary-high', label: 'Salary: High to Low' },
    { value: 'salary-low', label: 'Salary: Low to High' },
];

export default function JobListingsPage({ onNavigate, onSaveJob, onApplyJob, isJobSaved, savedOnly = false, savedJobs = [] }) {
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState('relevance');
    const [viewMode, setViewMode] = useState('list');

    // Filter and sort jobs
    const filteredJobs = useMemo(() => {
        let jobs = savedOnly ? savedJobs : mockJobs;

        // Apply keyword filter
        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();
            jobs = jobs.filter(
                (job) =>
                    job.title.toLowerCase().includes(keyword) ||
                    job.company.toLowerCase().includes(keyword) ||
                    job.skills?.some((s) => s.toLowerCase().includes(keyword))
            );
        }

        // Apply location filter
        if (filters.location) {
            jobs = jobs.filter((job) =>
                job.location.toLowerCase().includes(filters.location.toLowerCase()) ||
                (filters.location === 'remote' && job.isRemote)
            );
        }

        // Apply job type filter
        if (filters.jobType) {
            jobs = jobs.filter((job) =>
                job.jobType.toLowerCase().replace('-', '') === filters.jobType.toLowerCase().replace('-', '')
            );
        }

        // Apply experience filter
        if (filters.experience) {
            const expMap = { entry: 'Entry', mid: 'Mid', senior: 'Senior', lead: 'Lead' };
            jobs = jobs.filter((job) =>
                job.experienceLevel?.toLowerCase().includes(expMap[filters.experience]?.toLowerCase() || '')
            );
        }

        // Apply remote filter
        if (filters.remoteOnly) {
            jobs = jobs.filter((job) => job.isRemote);
        }

        // Apply sorting
        switch (sortBy) {
            case 'recent':
                jobs = [...jobs].sort((a, b) => b.id - a.id);
                break;
            case 'salary-high':
                jobs = [...jobs].sort((a, b) => b.salaryMax - a.salaryMax);
                break;
            case 'salary-low':
                jobs = [...jobs].sort((a, b) => a.salaryMin - b.salaryMin);
                break;
            default:
                break;
        }

        return jobs;
    }, [filters, sortBy, savedOnly, savedJobs]);

    const handleViewDetails = (job) => onNavigate?.('JobDetails', job);

    return (
        <DashboardLayout activeItem={savedOnly ? 'Saved' : 'Jobs'} onNavigate={onNavigate}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 animate-fade-in-down">
                    <h1 className="text-3xl font-bold text-[#1e2a32]">
                        {savedOnly ? 'Saved Jobs' : 'Find Your Dream Job'}
                    </h1>
                    <p className="mt-2 text-[#5a6b75]">
                        {savedOnly
                            ? `You have ${filteredJobs.length} saved job${filteredJobs.length !== 1 ? 's' : ''}`
                            : `Discover ${filteredJobs.length} opportunities matching your skills`}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {!savedOnly && (
                        <aside className="lg:w-80 flex-shrink-0">
                            <JobFilters filters={filters} onFilterChange={setFilters} onReset={() => setFilters({})} />
                        </aside>
                    )}

                    <main className={savedOnly ? 'flex-1' : 'flex-1'}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-fade-in">
                            <p className="text-sm text-[#5a6b75]">
                                Showing <span className="font-semibold text-[#1e2a32]">{filteredJobs.length}</span> jobs
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-44">
                                    <Select options={sortOptions} value={sortBy} onChange={setSortBy} placeholder="Sort by" />
                                </div>
                                <div className="hidden sm:flex items-center gap-1 p-1 bg-[#FFD2C2]/30 rounded-xl">
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('list')}
                                        className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white text-[#789A99] shadow-md' : 'text-[#5a6b75] hover:text-[#1e2a32]'}`}
                                        aria-label="List view"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white text-[#789A99] shadow-md' : 'text-[#5a6b75] hover:text-[#1e2a32]'}`}
                                        aria-label="Grid view"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {filteredJobs.length === 0 ? (
                            <div className="text-center py-16 animate-fade-in-up">
                                <div className="w-20 h-20 bg-[#FFD2C2]/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-[#1e2a32] mb-2">No jobs found</h3>
                                <p className="text-[#5a6b75] mb-6">Try adjusting your filters or search criteria</p>
                                <Button variant="primary" onClick={() => setFilters({})}>Clear Filters</Button>
                            </div>
                        ) : (
                            <div className={`space-y-4 ${viewMode === 'grid' ? 'sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0' : ''}`}>
                                {filteredJobs.map((job, index) => (
                                    <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                        <JobCard
                                            job={job}
                                            onViewDetails={handleViewDetails}
                                            onApply={() => onApplyJob?.(job)}
                                            onSave={() => onSaveJob?.(job)}
                                            isSaved={isJobSaved?.(job.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {filteredJobs.length > 0 && (
                            <div className="flex items-center justify-center gap-2 mt-10 animate-fade-in-up">
                                <Button variant="ghost" disabled>
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    Previous
                                </Button>
                                {[1, 2, 3].map((page) => (
                                    <button
                                        key={page}
                                        className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 hover:scale-110 ${page === 1 ? 'bg-[#789A99] text-white shadow-lg' : 'text-[#5a6b75] hover:bg-[#FFD2C2]/30'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <Button variant="ghost">
                                    Next
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </DashboardLayout>
    );
}
