import { useState, useCallback } from 'react';
import { Input, Select, Button, TagInput } from '../ui';

const SKILL_SUGGESTIONS = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python',
    'Java', 'C++', 'Go', 'Rust', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker',
    'Kubernetes', 'GraphQL', 'REST API', 'Git', 'CI/CD', 'Agile', 'Scrum',
];

const EXPERIENCE_OPTIONS = [
    { value: '', label: 'Any Experience' },
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' },
];

const EDUCATION_OPTIONS = [
    { value: '', label: 'Any Education' },
    { value: 'high_school', label: 'High School' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: "Bachelor's Degree" },
    { value: 'master', label: "Master's Degree" },
    { value: 'phd', label: 'PhD' },
];

const STATUS_OPTIONS = [
    { value: '', label: 'All Statuses' },
    { value: 'New', label: 'New' },
    { value: 'Screening', label: 'Screening' },
    { value: 'Interview', label: 'Interview' },
    { value: 'Offer', label: 'Offer' },
    { value: 'Hired', label: 'Hired' },
    { value: 'Rejected', label: 'Rejected' },
];

const SORT_OPTIONS = [
    { value: 'matchScore_desc', label: 'Match Score (High to Low)' },
    { value: 'matchScore_asc', label: 'Match Score (Low to High)' },
    { value: 'date_desc', label: 'Recently Applied' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'name_asc', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' },
];

export default function ApplicantFilters({
    filters = {},
    onChange,
    onClear,
    resultCount = 0,
    compact = false,
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleChange = useCallback((key, value) => {
        onChange?.({ ...filters, [key]: value });
    }, [filters, onChange]);

    const activeFiltersCount = Object.values(filters).filter(
        (v) => v && (Array.isArray(v) ? v.length > 0 : true)
    ).length;

    if (compact) {
        return (
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-[#e8e0dc]">
                <div className="flex-1 relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search candidates..."
                        value={filters.search || ''}
                        onChange={(e) => handleChange('search', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors"
                    />
                </div>
                <Button
                    variant={isExpanded ? 'secondary' : 'outline'}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                    {activeFiltersCount > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-[#789A99] text-white rounded-full">
                            {activeFiltersCount}
                        </span>
                    )}
                </Button>
                <Select
                    options={SORT_OPTIONS}
                    value={filters.sort || 'matchScore_desc'}
                    onChange={(value) => handleChange('sort', value)}
                    className="w-48"
                />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border-2 border-[#e8e0dc] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#e8e0dc]">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <h3 className="font-semibold text-[#1e2a32]">Filter Candidates</h3>
                    <span className="text-sm text-[#8a9aa4]">({resultCount} results)</span>
                </div>
                {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={onClear}>
                        Clear all
                    </Button>
                )}
            </div>

            {/* Filters */}
            <div className="p-4 space-y-4">
                {/* Search */}
                <Input
                    placeholder="Search by name or email..."
                    value={filters.search || ''}
                    onChange={(e) => handleChange('search', e.target.value)}
                    leftIcon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    }
                />

                {/* Skills */}
                <TagInput
                    label="Required Skills"
                    value={filters.skills || []}
                    onChange={(skills) => handleChange('skills', skills)}
                    placeholder="Add skills..."
                    suggestions={SKILL_SUGGESTIONS}
                    maxTags={10}
                />

                {/* Row: Experience & Education */}
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        label="Experience"
                        options={EXPERIENCE_OPTIONS}
                        value={filters.experience || ''}
                        onChange={(value) => handleChange('experience', value)}
                    />
                    <Select
                        label="Education"
                        options={EDUCATION_OPTIONS}
                        value={filters.education || ''}
                        onChange={(value) => handleChange('education', value)}
                    />
                </div>

                {/* Location */}
                <Input
                    label="Location"
                    placeholder="e.g. San Francisco, CA"
                    value={filters.location || ''}
                    onChange={(e) => handleChange('location', e.target.value)}
                />

                {/* Row: Status & Sort */}
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        label="Status"
                        options={STATUS_OPTIONS}
                        value={filters.status || ''}
                        onChange={(value) => handleChange('status', value)}
                    />
                    <Select
                        label="Sort By"
                        options={SORT_OPTIONS}
                        value={filters.sort || 'matchScore_desc'}
                        onChange={(value) => handleChange('sort', value)}
                    />
                </div>

                {/* Match Score Range */}
                <div>
                    <label className="block text-sm font-medium text-[#1e2a32] mb-2">
                        Minimum Match Score: {filters.minScore || 0}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={filters.minScore || 0}
                        onChange={(e) => handleChange('minScore', parseInt(e.target.value))}
                        className="w-full h-2 bg-[#e8e0dc] rounded-lg appearance-none cursor-pointer accent-[#789A99]"
                    />
                    <div className="flex justify-between text-xs text-[#8a9aa4] mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
