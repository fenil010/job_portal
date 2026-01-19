import { useState } from 'react';
import { Button, Select, Input } from '../ui';
import { TagInput } from '../ui';
import LocationPicker from '../search/LocationPicker';

const jobTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' },
];

const experienceOptions = [
    { value: '', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (2-5 years)' },
    { value: 'senior', label: 'Senior Level (5-10 years)' },
    { value: 'lead', label: 'Lead / Manager (10+ years)' },
];

const educationOptions = [
    { value: '', label: 'Any Education' },
    { value: 'high-school', label: 'High School' },
    { value: 'associate', label: "Associate's Degree" },
    { value: 'bachelor', label: "Bachelor's Degree" },
    { value: 'master', label: "Master's Degree" },
    { value: 'phd', label: 'PhD / Doctorate' },
];

const SKILL_SUGGESTIONS = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python',
    'Java', 'C++', 'Go', 'Rust', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker',
    'Kubernetes', 'GraphQL', 'REST API', 'Git', 'CI/CD', 'Agile', 'Scrum',
    'Machine Learning', 'Data Science', 'DevOps', 'Cloud Computing', 'Figma',
];

export default function JobFilters({ filters, onFilterChange, onReset, onSaveSearch }) {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleChange = (key, value) => onFilterChange?.({ ...filters, [key]: value });
    const activeFiltersCount = Object.values(filters || {}).filter(v =>
        v !== '' && v !== false && !(Array.isArray(v) && v.length === 0)
    ).length;

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
                {/* Location with geo-detection */}
                <div className="animate-fade-in-up stagger-1">
                    <label className="block text-sm font-medium text-[#1e2a32] mb-2">Location</label>
                    <LocationPicker
                        value={{ location: filters?.location || '', radius: filters?.radius || '' }}
                        onChange={(loc) => {
                            handleChange('location', loc.location);
                            handleChange('radius', loc.radius);
                            handleChange('userCoords', loc.userCoords);
                        }}
                    />
                </div>

                {/* Skills multi-select */}
                <div className="animate-fade-in-up stagger-2">
                    <TagInput
                        label="Skills"
                        value={filters?.skills || []}
                        onChange={(skills) => handleChange('skills', skills)}
                        placeholder="Add skills..."
                        suggestions={SKILL_SUGGESTIONS}
                        maxTags={10}
                    />
                </div>

                {/* Job Type */}
                <div className="animate-fade-in-up stagger-3">
                    <Select label="Job Type" options={jobTypeOptions} value={filters?.jobType || ''} onChange={(v) => handleChange('jobType', v)} placeholder="Select type" />
                </div>

                {/* Experience */}
                <div className="animate-fade-in-up stagger-4">
                    <Select label="Experience" options={experienceOptions} value={filters?.experience || ''} onChange={(v) => handleChange('experience', v)} placeholder="Select level" />
                </div>

                {/* Education */}
                <div className="animate-fade-in-up stagger-4">
                    <Select label="Education" options={educationOptions} value={filters?.education || ''} onChange={(v) => handleChange('education', v)} placeholder="Select education" />
                </div>

                {/* Salary Range */}
                <div className="animate-fade-in-up stagger-5">
                    <label className="block text-sm font-medium text-[#1e2a32] mb-2">Salary Range</label>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                placeholder="Min"
                                value={filters?.salaryMin || ''}
                                onChange={(e) => handleChange('salaryMin', e.target.value)}
                                className="flex-1"
                            />
                            <span className="text-[#8a9aa4]">to</span>
                            <Input
                                type="number"
                                placeholder="Max"
                                value={filters?.salaryMax || ''}
                                onChange={(e) => handleChange('salaryMax', e.target.value)}
                                className="flex-1"
                            />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="300000"
                            step="10000"
                            value={filters?.salaryMax || 150000}
                            onChange={(e) => handleChange('salaryMax', e.target.value)}
                            className="w-full h-2 bg-[#e8e0dc] rounded-lg appearance-none cursor-pointer accent-[#789A99]"
                        />
                        <div className="flex justify-between text-xs text-[#8a9aa4]">
                            <span>$0</span>
                            <span>${((filters?.salaryMax || 150000) / 1000).toFixed(0)}k+</span>
                        </div>
                    </div>
                </div>

                {/* Remote toggle */}
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

                {/* Save Search button */}
                {onSaveSearch && activeFiltersCount > 0 && (
                    <Button variant="outline" className="w-full" onClick={onSaveSearch}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Save This Search
                    </Button>
                )}

                <Button variant="primary" className="w-full lg:hidden" onClick={() => setIsExpanded(false)}>Apply Filters</Button>
            </div>
        </div>
    );
}
