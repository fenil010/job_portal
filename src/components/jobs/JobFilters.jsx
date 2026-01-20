import { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Select, Input } from '../ui';
import { LocationPicker } from '../search';

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

const educationOptions = [
    { value: '', label: 'Any Education' },
    { value: 'high-school', label: 'High School' },
    { value: 'associate', label: "Associate's" },
    { value: 'bachelor', label: "Bachelor's" },
    { value: 'master', label: "Master's" },
    { value: 'phd', label: 'PhD' },
];

const radiusOptions = [
    { value: '', label: 'Any Distance' },
    { value: '10', label: 'Within 10 miles' },
    { value: '25', label: 'Within 25 miles' },
    { value: '50', label: 'Within 50 miles' },
    { value: '100', label: 'Within 100 miles' },
];

export default function JobFilters({ filters = {}, onFilterChange, onReset, onSaveSearch }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = useCallback((key, value) => {
        const updated = { ...localFilters, [key]: value };
        setLocalFilters(updated);
        onFilterChange?.(updated);
    }, [localFilters, onFilterChange]);

    const handleLocationSelect = useCallback((locationData) => {
        const updated = {
            ...localFilters,
            location: locationData.address,
            userCoords: locationData.coords,
        };
        setLocalFilters(updated);
        onFilterChange?.(updated);
    }, [localFilters, onFilterChange]);

    const handleReset = () => {
        setLocalFilters({});
        onReset?.();
    };

    const activeFiltersCount = Object.values(localFilters).filter(Boolean).length;

    return (
        <Card variant="default" padding="none" className="overflow-hidden animate-fade-in-up">
            <CardHeader className="p-5 cursor-pointer hover:bg-[#90353D]/5 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#90353D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <CardTitle className="text-base">Smart Filters</CardTitle>
                    {activeFiltersCount > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-[#90353D] text-[#F4EDE3] rounded-full">
                            {activeFiltersCount}
                        </span>
                    )}
                </div>
                <svg className={`w-5 h-5 text-[#9B8B7E] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </CardHeader>

            {isExpanded && (
                <CardContent className="p-5 pt-0 space-y-5 animate-fade-in-down">
                    <div>
                        <label className="block text-sm font-medium text-[#3E2723] mb-2">Location</label>
                        <LocationPicker
                            value={localFilters.location || ''}
                            onChange={(val) => handleChange('location', val)}
                            onLocationSelect={handleLocationSelect}
                            placeholder="City or Remote"
                        />
                    </div>

                    {localFilters.userCoords && (
                        <Select
                            label="Distance"
                            options={radiusOptions}
                            value={localFilters.radius || ''}
                            onChange={(val) => handleChange('radius', val)}
                        />
                    )}

                    <Select
                        label="Job Type"
                        options={jobTypeOptions}
                        value={localFilters.jobType || ''}
                        onChange={(val) => handleChange('jobType', val)}
                    />

                    <Select
                        label="Experience Level"
                        options={experienceOptions}
                        value={localFilters.experience || ''}
                        onChange={(val) => handleChange('experience', val)}
                    />

                    <Select
                        label="Education"
                        options={educationOptions}
                        value={localFilters.education || ''}
                        onChange={(val) => handleChange('education', val)}
                    />

                    <div>
                        <label className="block text-sm font-medium text-[#3E2723] mb-2">Salary Range</label>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                placeholder="Min"
                                value={localFilters.salaryMin || ''}
                                onChange={(e) => handleChange('salaryMin', e.target.value)}
                                className="flex-1"
                            />
                            <Input
                                type="number"
                                placeholder="Max"
                                value={localFilters.salaryMax || ''}
                                onChange={(e) => handleChange('salaryMax', e.target.value)}
                                className="flex-1"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#90353D]/5 rounded-xl">
                        <span className="text-sm font-medium text-[#3E2723]">Remote Only</span>
                        <button
                            type="button"
                            onClick={() => handleChange('remoteOnly', !localFilters.remoteOnly)}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${localFilters.remoteOnly ? 'bg-[#90353D]' : 'bg-[#9B8B7E]/30'
                                }`}
                            role="switch"
                            aria-checked={localFilters.remoteOnly}
                        >
                            <span
                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${localFilters.remoteOnly ? 'translate-x-6' : ''
                                    }`}
                            />
                        </button>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button variant="ghost" size="sm" onClick={handleReset} className="flex-1">
                            Clear All
                        </Button>
                        <Button variant="primary" size="sm" onClick={onSaveSearch} className="flex-1">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            Save Search
                        </Button>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
