import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { mockJobs, mockApplications } from '../data/mockData';

const JobContext = createContext(null);

const STORAGE_KEYS = {
    jobs: 'jp_jobs',
    savedJobs: 'jp_savedJobs',
    applications: 'jp_applications',
};

export function JobProvider({ children }) {
    const [jobs, setJobs] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.jobs);
            return stored ? JSON.parse(stored) : mockJobs;
        } catch {
            return mockJobs;
        }
    });

    const [savedJobs, setSavedJobs] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.savedJobs);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [applications, setApplications] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.applications);
            return stored ? JSON.parse(stored) : mockApplications;
        } catch {
            return mockApplications;
        }
    });

    // Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.jobs, JSON.stringify(jobs));
    }, [jobs]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.savedJobs, JSON.stringify(savedJobs));
    }, [savedJobs]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.applications, JSON.stringify(applications));
    }, [applications]);

    const saveJob = useCallback((job) => {
        setSavedJobs((prev) => {
            const isSaved = prev.some((j) => j.id === job.id);
            if (isSaved) {
                return prev.filter((j) => j.id !== job.id);
            }
            return [...prev, job];
        });
    }, []);

    const isJobSaved = useCallback((jobId) => {
        return savedJobs.some((j) => j.id === jobId);
    }, [savedJobs]);

    const applyToJob = useCallback((job) => {
        const alreadyApplied = applications.some((a) => a.jobId === job.id);
        if (alreadyApplied) {
            return { success: false, message: 'You have already applied for this job' };
        }

        const newApplication = {
            id: Date.now(),
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            appliedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Submitted',
            statusColor: 'primary',
        };

        setApplications((prev) => [...prev, newApplication]);

        // Increment applicants count on job
        setJobs((prevJobs) =>
            prevJobs.map((j) =>
                j.id === job.id ? { ...j, applicants: (j.applicants || 0) + 1 } : j
            )
        );

        return { success: true, message: `Applied to ${job.title} at ${job.company}!` };
    }, [applications]);

    const hasApplied = useCallback((jobId) => {
        return applications.some((a) => a.jobId === jobId);
    }, [applications]);

    const postJob = useCallback((jobData) => {
        const job = {
            id: Date.now(),
            ...jobData,
            postedAt: 'Just now',
            applicants: 0,
        };
        setJobs((prev) => [job, ...prev]);
        return job;
    }, []);

    const getJobById = useCallback((id) => {
        return jobs.find((job) => job.id === Number(id) || job.id === id);
    }, [jobs]);

    const value = useMemo(() => ({
        jobs,
        savedJobs,
        applications,
        saveJob,
        isJobSaved,
        applyToJob,
        hasApplied,
        postJob,
        getJobById,
    }), [jobs, savedJobs, applications, saveJob, isJobSaved, applyToJob, hasApplied, postJob, getJobById]);

    return (
        <JobContext.Provider value={value}>
            {children}
        </JobContext.Provider>
    );
}

export function useJobs() {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error('useJobs must be used within a JobProvider');
    }
    return context;
}

export default JobContext;
