import { useState, useEffect } from 'react';

const HISTORY_KEY = 'jp_search_history';
const MAX_HISTORY = 20;

export default function SearchRecommendations({
    jobs = [],
    onSearch,
    onViewJob,
}) {
    const [searchHistory, setSearchHistory] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    // Load search history and generate recommendations
    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
            setSearchHistory(stored);

            // Generate recommendations based on history
            if (stored.length > 0 && jobs.length > 0) {
                const recentQueries = stored.slice(0, 5);
                const searchTerms = recentQueries
                    .flatMap(q => q.query.toLowerCase().split(/\s+/))
                    .filter(term => term.length > 2 && !['and', 'or', 'not'].includes(term));

                // Score jobs based on matching terms
                const scored = jobs.map(job => {
                    const jobText = [
                        job.title,
                        job.company,
                        ...(job.skills || []),
                    ].join(' ').toLowerCase();

                    const score = searchTerms.reduce((acc, term) => {
                        return acc + (jobText.includes(term) ? 1 : 0);
                    }, 0);

                    return { job, score };
                });

                // Get top recommendations
                const topJobs = scored
                    .filter(s => s.score > 0)
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 4)
                    .map(s => s.job);

                setRecommendations(topJobs);
            }
        } catch {
            setSearchHistory([]);
            setRecommendations([]);
        }
    }, [jobs]);

    // Record a search query
    const recordSearch = (query) => {
        if (!query || !query.trim()) return;

        const newEntry = {
            id: Date.now(),
            query: query.trim(),
            timestamp: new Date().toISOString(),
        };

        const updated = [newEntry, ...searchHistory.filter(h => h.query !== query)]
            .slice(0, MAX_HISTORY);

        setSearchHistory(updated);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    };

    // Get frequent search terms
    const getFrequentTerms = () => {
        const termCounts = {};
        searchHistory.forEach(h => {
            const terms = h.query.toLowerCase().split(/\s+/)
                .filter(t => t.length > 2 && !['and', 'or', 'not'].includes(t));
            terms.forEach(t => {
                termCounts[t] = (termCounts[t] || 0) + 1;
            });
        });

        return Object.entries(termCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([term]) => term);
    };

    const frequentTerms = getFrequentTerms();

    // Expose recordSearch function
    SearchRecommendations.recordSearch = recordSearch;

    if (recommendations.length === 0 && frequentTerms.length === 0) {
        return null;
    }

    return (
        <div className="bg-[#FAF6F0] rounded-2xl border-2 border-[#90353D]/20 overflow-hidden animate-fade-in-up">
            <div className="p-4 border-b-2 border-[#90353D]/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-[#90353D] to-[#6B2830] rounded-xl text-[#F4EDE3]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-[#3E2723]">Jobs You Might Like</h3>
                </div>
            </div>

            {/* Frequent search terms */}
            {frequentTerms.length > 0 && (
                <div className="p-4 border-b-2 border-[#90353D]/20">
                    <p className="text-xs text-[#9B8B7E] mb-2">Based on your searches</p>
                    <div className="flex flex-wrap gap-2">
                        {frequentTerms.map((term, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => onSearch?.(term)}
                                className="px-3 py-1.5 text-xs font-medium bg-[#90353D]/10 text-[#4A3C35] rounded-full hover:bg-[#90353D] hover:text-[#F4EDE3] transition-all"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Recommended jobs */}
            {recommendations.length > 0 && (
                <div className="divide-y divide-[#90353D]/10">
                    {recommendations.map((job) => (
                        <button
                            key={job.id}
                            type="button"
                            onClick={() => onViewJob?.(job)}
                            className="w-full p-4 text-left hover:bg-[#90353D]/5 transition-colors"
                        >
                            <p className="font-medium text-[#3E2723] text-sm mb-1">{job.title}</p>
                            <p className="text-xs text-[#9B8B7E]">{job.company} • {job.location}</p>
                            {job.skills && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {job.skills.slice(0, 3).map((skill, idx) => (
                                        <span key={idx} className="px-2 py-0.5 text-xs bg-[#90353D]/10 text-[#90353D] rounded">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// Export helper to record searches from outside component
export function recordSearchHistory(query) {
    if (!query || !query.trim()) return;

    try {
        const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        const newEntry = {
            id: Date.now(),
            query: query.trim(),
            timestamp: new Date().toISOString(),
        };
        const updated = [newEntry, ...stored.filter(h => h.query !== query)]
            .slice(0, MAX_HISTORY);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch {
        // Ignore errors
    }
}
