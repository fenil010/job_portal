import { useState, useEffect } from 'react';
import { Button, Modal, ModalFooter, Input } from '../ui';

const STORAGE_KEY = 'jp_saved_searches';

export default function SavedSearches({
    onLoadSearch,
    currentQuery = '',
}) {
    const [savedSearches, setSavedSearches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newSearchName, setNewSearchName] = useState('');
    const [searchToSave, setSearchToSave] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    // Load saved searches from localStorage
    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            setSavedSearches(stored);
        } catch {
            setSavedSearches([]);
        }
    }, []);

    const saveSearch = (query, name) => {
        const newSearch = {
            id: Date.now(),
            name: name || `Search ${savedSearches.length + 1}`,
            query,
            createdAt: new Date().toISOString(),
            useCount: 0,
        };
        const updated = [newSearch, ...savedSearches].slice(0, 10); // Max 10 saved
        setSavedSearches(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setShowModal(false);
        setNewSearchName('');
        setSearchToSave('');
    };

    const deleteSearch = (id) => {
        const updated = savedSearches.filter(s => s.id !== id);
        setSavedSearches(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const loadSearch = (search) => {
        // Increment use count
        const updated = savedSearches.map(s =>
            s.id === search.id ? { ...s, useCount: s.useCount + 1 } : s
        );
        setSavedSearches(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        onLoadSearch?.(search.query);
    };

    const openSaveModal = (query) => {
        setSearchToSave(query);
        setNewSearchName('');
        setShowModal(true);
    };

    // Expose save function
    SavedSearches.saveCurrentSearch = (query) => {
        if (query && query.trim()) {
            openSaveModal(query);
        }
    };

    if (savedSearches.length === 0) {
        return null;
    }

    return (
        <>
            <div className="bg-white rounded-2xl border-2 border-[#e8e0dc] overflow-hidden animate-fade-in-up">
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between p-4 hover:bg-[#FFD2C2]/10 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#789A99]/10 rounded-xl text-[#789A99]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </div>
                        <span className="font-semibold text-[#1e2a32]">Saved Searches</span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-[#FFD2C2]/30 text-[#5a6b75] rounded-full">
                            {savedSearches.length}
                        </span>
                    </div>
                    <svg
                        className={`w-5 h-5 text-[#8a9aa4] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isExpanded && (
                    <div className="border-t-2 border-[#e8e0dc] divide-y divide-[#e8e0dc] max-h-60 overflow-y-auto">
                        {savedSearches.map((search) => (
                            <div key={search.id} className="flex items-center gap-3 p-3 hover:bg-[#FFD2C2]/10 transition-colors group">
                                <button
                                    type="button"
                                    onClick={() => loadSearch(search)}
                                    className="flex-1 text-left"
                                >
                                    <p className="font-medium text-[#1e2a32] text-sm">{search.name}</p>
                                    <p className="text-xs text-[#8a9aa4] truncate">{search.query}</p>
                                </button>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => loadSearch(search)}
                                        className="p-1.5 text-[#789A99] hover:bg-[#789A99]/10 rounded-lg transition-all"
                                        title="Run search"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteSearch(search.id)}
                                        className="p-1.5 text-[#f87171] hover:bg-[#f87171]/10 rounded-lg transition-all"
                                        title="Delete"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Save Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Save Search"
            >
                <div className="space-y-4">
                    <Input
                        label="Search Name"
                        placeholder="e.g., React Remote Jobs"
                        value={newSearchName}
                        onChange={(e) => setNewSearchName(e.target.value)}
                        autoFocus
                    />
                    <div className="p-3 bg-[#FFD2C2]/20 rounded-xl">
                        <p className="text-xs text-[#8a9aa4] mb-1">Query</p>
                        <p className="text-sm font-mono text-[#1e2a32]">{searchToSave}</p>
                    </div>
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => saveSearch(searchToSave, newSearchName)}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

// Helper to get saved searches without component
export function getSavedSearches() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}
