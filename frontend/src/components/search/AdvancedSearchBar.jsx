import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui';

const SEARCH_OPERATORS = ['AND', 'OR', 'NOT'];
const SYNTAX_HELP = [
    { syntax: 'React AND TypeScript', description: 'Jobs with both skills' },
    { syntax: 'Developer OR Engineer', description: 'Jobs with either term' },
    { syntax: 'JavaScript NOT Java', description: 'JavaScript but not Java' },
    { syntax: '"Senior Developer"', description: 'Exact phrase match' },
];

export default function AdvancedSearchBar({
    value = '',
    onChange,
    onSearch,
    suggestions = [],
    placeholder = 'Search jobs with boolean operators (AND, OR, NOT)...',
    onSaveSearch,
    showSaveButton = true,
}) {
    const [query, setQuery] = useState(value);
    const [showHelp, setShowHelp] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const inputRef = useRef(null);
    const helpRef = useRef(null);

    useEffect(() => {
        setQuery(value);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (helpRef.current && !helpRef.current.contains(e.target)) {
                setShowHelp(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        onChange?.(val);

        // Filter suggestions
        if (val.length > 1 && suggestions.length > 0) {
            const lastWord = val.split(/\s+/).pop().toLowerCase();
            if (lastWord && !SEARCH_OPERATORS.includes(lastWord.toUpperCase())) {
                const filtered = suggestions.filter(s =>
                    s.toLowerCase().includes(lastWord)
                ).slice(0, 6);
                setFilteredSuggestions(filtered);
                setShowSuggestions(filtered.length > 0);
            } else {
                setShowSuggestions(false);
            }
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const words = query.split(/\s+/);
        words.pop();
        words.push(suggestion);
        const newQuery = words.join(' ') + ' ';
        setQuery(newQuery);
        onChange?.(newQuery);
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    const handleSearch = () => {
        onSearch?.(query);
        setShowSuggestions(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const insertOperator = (operator) => {
        const newQuery = query.trim() + ` ${operator} `;
        setQuery(newQuery);
        onChange?.(newQuery);
        inputRef.current?.focus();
    };

    return (
        <div className="relative">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder={placeholder}
                            className="w-full pl-12 pr-12 py-4 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-2xl text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:outline-none transition-all duration-300 text-lg"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#90353D]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowHelp(!showHelp)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#9B8B7E] hover:text-[#90353D] transition-colors"
                            title="Search syntax help"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Suggestions dropdown */}
                    {showSuggestions && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in">
                            {filteredSuggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="w-full px-4 py-3 text-left hover:bg-[#90353D]/10 text-[#3E2723] transition-colors flex items-center gap-3"
                                >
                                    <svg className="w-4 h-4 text-[#9B8B7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <Button variant="primary" size="lg" onClick={handleSearch}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search
                    </Button>
                    {showSaveButton && query.trim() && onSaveSearch && (
                        <Button variant="outline" size="lg" onClick={() => onSaveSearch(query)}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </Button>
                    )}
                </div>
            </div>

            {/* Operator buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-sm text-[#9B8B7E]">Quick operators:</span>
                {SEARCH_OPERATORS.map((op) => (
                    <button
                        key={op}
                        type="button"
                        onClick={() => insertOperator(op)}
                        className="px-3 py-1.5 text-xs font-medium bg-[#90353D]/10 text-[#4A3C35] rounded-lg hover:bg-[#90353D] hover:text-[#F4EDE3] transition-all"
                    >
                        {op}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => {
                        const newQuery = query.trim() + ' ""';
                        setQuery(newQuery);
                        onChange?.(newQuery);
                        // Position cursor inside quotes
                        setTimeout(() => {
                            if (inputRef.current) {
                                inputRef.current.focus();
                                inputRef.current.setSelectionRange(newQuery.length - 1, newQuery.length - 1);
                            }
                        }, 0);
                    }}
                    className="px-3 py-1.5 text-xs font-medium bg-[#FFD2C2]/30 text-[#5a6b75] rounded-lg hover:bg-[#789A99] hover:text-white transition-all"
                >
                    "Exact"
                </button>
            </div>

            {/* Syntax help popup */}
            {showHelp && (
                <div
                    ref={helpRef}
                    className="absolute top-full right-0 mt-2 w-80 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl shadow-2xl z-30 p-4 animate-scale-in"
                >
                    <h4 className="font-semibold text-[#3E2723] mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#90353D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Search Syntax
                    </h4>
                    <div className="space-y-3">
                        {SYNTAX_HELP.map((item, idx) => (
                            <div key={idx} className="flex flex-col">
                                <code className="text-sm font-mono bg-[#90353D]/10 px-2 py-1 rounded text-[#3E2723]">
                                    {item.syntax}
                                </code>
                                <span className="text-xs text-[#9B8B7E] mt-1">{item.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * Parse a boolean search query and return a filter function
 * @param {string} query - The search query with boolean operators
 * @returns {function} - A function that takes a job and returns true if it matches
 */
export function parseBooleanQuery(query) {
    if (!query || !query.trim()) {
        return () => true;
    }

    // Extract exact phrases first
    const exactPhrases = [];
    let processedQuery = query.replace(/"([^"]+)"/g, (match, phrase) => {
        exactPhrases.push(phrase.toLowerCase());
        return `__EXACT_${exactPhrases.length - 1}__`;
    });

    // Tokenize
    const tokens = processedQuery.split(/\s+/).filter(Boolean);

    return (job) => {
        const searchableText = [
            job.title,
            job.company,
            job.location,
            job.description,
            ...(job.skills || []),
        ].join(' ').toLowerCase();

        let result = true;
        let currentOperator = 'AND';
        let expectTerm = true;

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i].toUpperCase();

            if (token === 'AND' || token === 'OR' || token === 'NOT') {
                currentOperator = token;
                expectTerm = true;
                continue;
            }

            let term = tokens[i].toLowerCase();
            let matches = false;

            // Check for exact phrase placeholder
            const exactMatch = term.match(/__exact_(\d+)__/i);
            if (exactMatch) {
                const phraseIdx = parseInt(exactMatch[1], 10);
                matches = searchableText.includes(exactPhrases[phraseIdx]);
            } else {
                matches = searchableText.includes(term);
            }

            // Apply operator
            if (currentOperator === 'AND') {
                result = result && matches;
            } else if (currentOperator === 'OR') {
                result = result || matches;
            } else if (currentOperator === 'NOT') {
                result = result && !matches;
            }

            currentOperator = 'AND'; // Reset to default
            expectTerm = false;
        }

        return result;
    };
}
