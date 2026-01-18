import { useState } from 'react';
import { Button, Select, Input } from '../ui';

const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'remote', label: 'Remote' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'seattle', label: 'Seattle, WA' },
];

const jobTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
];

const experienceOptions = [
    { value: '', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead / Manager' },
];

const salaryOptions = [
    { value: '', label: 'Any Salary' },
    { value: '0-50000', label: '$0 - $50,000' },
    { value: '50000-75000', label: '$50,000 - $75,000' },
    { value: '75000-100000', label: '$75,000 - $100,000' },
    { value: '100000-150000', label: '$100,000 - $150,000' },
    { value: '150000+', label: '$150,000+' },
];

export default function JobFilters({ filters, onFilterChange, onReset }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleChange = (key, value) => onFilterChange?.({ ...filters, [key]: value });
    const activeFiltersCount = Object.values(filters || {}).filter(Boolean).length;

    return (
        <div className="bg-white rounded-2xl border-2 border-[#e8e0dc] animate-fade-in-up">
            <div className="flex items-center justify-between p-5 border-b-2 border-[#e8e0dc]">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#FFD2C2]/30 rounded-xl text-[#789A99]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </div>
                    <h2 className="font-semibold text-[#1e2a32]">Filters</h2>
                    {activeFiltersCount > 0 && (
                        <span className="px-2.5 py-0.5 text-xs font-semibold bg-[#789A99] text-white rounded-full">{activeFiltersCount}</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={onReset} className="text-[#f87171] hover:bg-[#f87171]/10">Clear</Button>
                    )}
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="lg:hidden p-2 text-[#5a6b75] hover:text-[#1e2a32] rounded-xl transition-all duration-300"
                    >
                        <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`p-5 space-y-5 transition-all duration-500 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
                <div className="animate-fade-in-up stagger-1">
                    <Input
                        label="Keyword"
                        id="filter-keyword"
                        placeholder="Job title, company..."
                        value={filters?.keyword || ''}
                        onChange={(e) => handleChange('keyword', e.target.value)}
                        leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                    />
                </div>

                <div className="animate-fade-in-up stagger-2">
                    <Select label="Location" options={locationOptions} value={filters?.location || ''} onChange={(v) => handleChange('location', v)} placeholder="Select location" />
                </div>

                <div className="animate-fade-in-up stagger-3">
                    <Select label="Job Type" options={jobTypeOptions} value={filters?.jobType || ''} onChange={(v) => handleChange('jobType', v)} placeholder="Select type" />
                </div>

                <div className="animate-fade-in-up stagger-4">
                    <Select label="Experience" options={experienceOptions} value={filters?.experience || ''} onChange={(v) => handleChange('experience', v)} placeholder="Select level" />
                </div>

                <div className="animate-fade-in-up stagger-5">
                    <Select label="Salary Range" options={salaryOptions} value={filters?.salary || ''} onChange={(v) => handleChange('salary', v)} placeholder="Select salary" />
                </div>

                <div className="flex items-center justify-between animate-fade-in-up stagger-5">
                    <label htmlFor="filter-remote" className="text-sm font-medium text-[#5a6b75]">Remote Only</label>
                    <button
                        id="filter-remote"
                        type="button"
                        role="switch"
                        aria-checked={filters?.remoteOnly || false}
                        onClick={() => handleChange('remoteOnly', !filters?.remoteOnly)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#789A99] ${filters?.remoteOnly ? 'bg-[#789A99]' : 'bg-[#e8e0dc]'}`}
                    >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${filters?.remoteOnly ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                <Button variant="primary" className="w-full lg:hidden" onClick={() => setIsExpanded(false)}>Apply Filters</Button>
            </div>
        </div>
    );
}
