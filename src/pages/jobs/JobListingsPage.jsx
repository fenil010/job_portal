import { useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout';
import { Button, Select, useToast, Modal, ModalFooter, Input } from '../../components/ui';
import { JobCard, JobFilters } from '../../components/jobs';
import {
    AdvancedSearchBar,
    parseBooleanQuery,
    SavedSearches,
    SearchRecommendations,
    recordSearchHistory,
    filterJobsByDistance,
} from '../../components/search';
import { mockJobs } from '../../data/mockData';
import { useJobs } from '../../contexts/JobContext';

const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'salary-high', label: 'Salary: High to Low' },
    { value: 'salary-low', label: 'Salary: Low to High' },
];

export default function JobListingsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { jobs: contextJobs, savedJobs, saveJob, applyToJob, isJobSaved } = useJobs();
    const { toast } = useToast();

    // Check if we're on the saved jobs page
    const savedOnly = location.pathname === '/saved';
    const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState('relevance');
    const [viewMode, setViewMode] = useState('list');
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saveSearchName, setSaveSearchName] = useState('');

    const allJobs = savedOnly ? savedJobs : (contextJobs && contextJobs.length ? contextJobs : mockJobs);

    // Get all unique skills for suggestions
    const skillSuggestions = useMemo(() => {
        const skills = new Set();
        allJobs.forEach(job => job.skills?.forEach(s => skills.add(s)));
        return [...skills];
    }, [allJobs]);

    // Filter and sort jobs
    const filteredJobs = useMemo(() => {
        let jobs = [...allJobs];

        // Apply boolean search query
        if (searchQuery.trim()) {
            const matchFn = parseBooleanQuery(searchQuery);
            jobs = jobs.filter(matchFn);
        }

        // Apply location filter with geo-distance
        if (filters.userCoords && filters.radius) {
            jobs = filterJobsByDistance(jobs, filters.userCoords, parseFloat(filters.radius));
        } else if (filters.location) {
            jobs = jobs.filter((job) =>
                job.location.toLowerCase().includes(filters.location.toLowerCase()) ||
                (filters.location.toLowerCase() === 'remote' && job.isRemote)
            );
        }

        // Apply skills filter
        if (filters.skills?.length > 0) {
            jobs = jobs.filter((job) =>
                filters.skills.some((skill) => job.skills?.some(s => s.toLowerCase().includes(skill.toLowerCase())))
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

        // Apply education filter
        if (filters.education) {
            // In production, jobs would have education requirements
            // For now, just filter by experience as a proxy
        }

        // Apply salary filter
        if (filters.salaryMin) {
            const minSalary = parseFloat(filters.salaryMin);
            jobs = jobs.filter((job) => job.salaryMax >= minSalary);
        }
        if (filters.salaryMax) {
            const maxSalary = parseFloat(filters.salaryMax);
            jobs = jobs.filter((job) => job.salaryMin <= maxSalary);
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
    }, [searchQuery, filters, sortBy, allJobs]);

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
        if (query.trim()) {
            recordSearchHistory(query);
        }
    }, []);

    const handleSaveCurrentSearch = useCallback(() => {
        setShowSaveModal(true);
    }, []);

    const confirmSaveSearch = useCallback(() => {
        const searchData = {
            query: searchQuery,
            filters,
            name: saveSearchName || `Search ${Date.now()}`,
        };

        try {
            const existing = JSON.parse(localStorage.getItem('jp_saved_searches') || '[]');
            const updated = [
                { id: Date.now(), ...searchData, createdAt: new Date().toISOString(), useCount: 0 },
                ...existing,
            ].slice(0, 10);
            localStorage.setItem('jp_saved_searches', JSON.stringify(updated));
            toast.success('Search saved!');
        } catch {
            toast.error('Failed to save search');
        }

        setShowSaveModal(false);
        setSaveSearchName('');
    }, [searchQuery, filters, saveSearchName, toast]);

    const handleLoadSearch = useCallback((query) => {
        setSearchQuery(query);
        handleSearch(query);
    }, [handleSearch]);

    const handleViewDetails = (job) => navigate(`/jobs/${job.id}`);

    const handleApplyJob = useCallback((job) => {
        const result = applyToJob(job);
        if (result.success) {
            toast.success(result.message, { title: 'Application Submitted' });
        } else {
            toast.warning(result.message);
        }
    }, [applyToJob, toast]);

    const handleSaveJob = useCallback((job) => {
        saveJob(job);
        if (isJobSaved(job.id)) {
            toast.info('Job removed from saved');
        } else {
            toast.success('Job saved successfully!');
        }
    }, [saveJob, isJobSaved, toast]);

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 animate-fade-in-down">
                    <h1 className="text-3xl font-bold text-[#1e2a32]">
                        {savedOnly ? 'Saved Jobs' : 'Find Your Dream Job'}
                    </h1>
                    <p className="mt-2 text-[#5a6b75]">
                        {savedOnly
                            ? `You have ${filteredJobs.length} saved job${filteredJobs.length !== 1 ? 's' : ''}`
                            : `Discover ${filteredJobs.length} opportunities matching your skills`}
                    </p>
                </div>

                {/* Advanced Search Bar */}
                {!savedOnly && (
                    <div className="mb-6 animate-fade-in-up">
                        <AdvancedSearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onSearch={handleSearch}
                            suggestions={skillSuggestions}
                            onSaveSearch={handleSaveCurrentSearch}
                            showSaveButton={!!(searchQuery.trim() || Object.keys(filters).length > 0)}
                        />
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {!savedOnly && (
                        <aside className="lg:w-80 flex-shrink-0 space-y-4">
                            <JobFilters
                                filters={filters}
                                onFilterChange={setFilters}
                                onReset={() => setFilters({})}
                                onSaveSearch={handleSaveCurrentSearch}
                            />
                            <SavedSearches onLoadSearch={handleLoadSearch} />
                            <SearchRecommendations
                                jobs={allJobs}
                                onSearch={handleLoadSearch}
                                onViewJob={handleViewDetails}
                            />
                        </aside>
                    )}

                    <main className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-fade-in">
                            <p className="text-sm text-[#5a6b75]">
                                Showing <span className="font-semibold text-[#1e2a32]">{filteredJobs.length}</span> jobs
                                {searchQuery && <span className="ml-1">for "<span className="font-medium">{searchQuery}</span>"</span>}
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
                                <p className="text-[#5a6b75] mb-6">Try adjusting your search or filters</p>
                                <div className="flex justify-center gap-3">
                                    <Button variant="ghost" onClick={() => { setSearchQuery(''); setFilters({}); }}>Clear All</Button>
                                    <Button variant="primary" onClick={() => setFilters({})}>Reset Filters</Button>
                                </div>
                            </div>
                        ) : (
                            <div className={`space-y-4 ${viewMode === 'grid' ? 'sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0' : ''}`}>
                                {filteredJobs.map((job, index) => (
                                    <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                        <JobCard
                                            job={job}
                                            onViewDetails={handleViewDetails}
                                            onApply={() => handleApplyJob(job)}
                                            onSave={() => handleSaveJob(job)}
                                            isSaved={isJobSaved(job.id)}
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

            {/* Save Search Modal */}
            <Modal
                isOpen={showSaveModal}
                onClose={() => setShowSaveModal(false)}
                title="Save Search"
            >
                <div className="space-y-4">
                    <Input
                        label="Search Name"
                        placeholder="e.g., Remote React Jobs"
                        value={saveSearchName}
                        onChange={(e) => setSaveSearchName(e.target.value)}
                        autoFocus
                    />
                    {searchQuery && (
                        <div className="p-3 bg-[#FFD2C2]/20 rounded-xl">
                            <p className="text-xs text-[#8a9aa4] mb-1">Query</p>
                            <p className="text-sm font-mono text-[#1e2a32]">{searchQuery}</p>
                        </div>
                    )}
                    {Object.keys(filters).length > 0 && (
                        <div className="p-3 bg-[#789A99]/10 rounded-xl">
                            <p className="text-xs text-[#8a9aa4] mb-1">Active Filters</p>
                            <p className="text-sm text-[#1e2a32]">{Object.keys(filters).filter(k => filters[k]).length} filters applied</p>
                        </div>
                    )}
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowSaveModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={confirmSaveSearch}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Save Search
                    </Button>
                </ModalFooter>
            </Modal>
        </DashboardLayout>
    );
}
