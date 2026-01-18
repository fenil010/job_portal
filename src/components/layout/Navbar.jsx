import { useState, useRef, useEffect } from 'react';

export default function Navbar({ onMenuClick, user, onLogout }) {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const profileRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const userInitials = user?.name?.split(' ').map(n => n[0]).join('') || 'JD';
    const userName = user?.name || 'John Doe';
    const userEmail = user?.email || 'john.doe@email.com';

    return (
        <header className={`sticky top-0 z-40 w-full transition-all duration-500 ${isScrolled
                ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-[#1e2a32]/5 border-b-2 border-[#e8e0dc]'
                : 'bg-[#fdf9f7]'
            }`}>
            <div className="flex items-center justify-between h-18 px-4 lg:px-8 py-4">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="p-2.5 -ml-2 text-[#5a6b75] hover:text-[#1e2a32] hover:bg-[#FFD2C2]/30 rounded-xl lg:hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#789A99]"
                        aria-label="Toggle sidebar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <a href="/" className="flex items-center gap-3 group" aria-label="JobPortal Home">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#FFD2C2] to-[#789A99] rounded-xl flex items-center justify-center shadow-lg shadow-[#789A99]/20 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-[#1e2a32] hidden sm:block">
                            Job<span className="text-[#789A99]">Portal</span>
                        </span>
                    </a>
                </div>

                <div className={`hidden md:flex flex-1 max-w-lg mx-8 transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                    <div className="relative w-full">
                        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${isSearchFocused ? 'text-[#789A99]' : 'text-[#8a9aa4]'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            placeholder="Search jobs, companies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:shadow-[0_0_0_3px_rgba(120,154,153,0.2)] transition-all duration-300"
                            aria-label="Search jobs"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="p-2.5 text-[#5a6b75] hover:text-[#1e2a32] hover:bg-[#FFD2C2]/30 rounded-xl md:hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#789A99]"
                        aria-label="Search"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        className="relative p-2.5 text-[#5a6b75] hover:text-[#1e2a32] hover:bg-[#FFD2C2]/30 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#789A99]"
                        aria-label="Notifications"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#f87171] rounded-full animate-pulse"></span>
                    </button>

                    <div className="relative" ref={profileRef}>
                        <button
                            type="button"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 p-1.5 hover:bg-[#FFD2C2]/30 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#789A99]"
                            aria-haspopup="true"
                            aria-expanded={isProfileOpen}
                        >
                            <div className="w-9 h-9 bg-gradient-to-br from-[#789A99] to-[#5f7d7c] rounded-xl flex items-center justify-center text-white text-sm font-semibold shadow-md">
                                {userInitials}
                            </div>
                            <svg className={`w-4 h-4 text-[#5a6b75] transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl border-2 border-[#e8e0dc] shadow-xl shadow-[#1e2a32]/10 py-2 animate-fade-in-down">
                                <div className="px-4 py-3 border-b-2 border-[#e8e0dc]">
                                    <p className="text-sm font-semibold text-[#1e2a32]">{userName}</p>
                                    <p className="text-xs text-[#5a6b75]">{userEmail}</p>
                                    {user?.role && (
                                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-[#789A99]/10 text-[#789A99] rounded-full capitalize">
                                            {user.role}
                                        </span>
                                    )}
                                </div>
                                <nav aria-label="User menu" className="py-1">
                                    <a href="#profile" className="flex items-center gap-3 px-4 py-3 text-sm text-[#5a6b75] hover:bg-[#FFD2C2]/20 hover:text-[#1e2a32] transition-all duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        View Profile
                                    </a>
                                    <a href="#settings" className="flex items-center gap-3 px-4 py-3 text-sm text-[#5a6b75] hover:bg-[#FFD2C2]/20 hover:text-[#1e2a32] transition-all duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Settings
                                    </a>
                                    <hr className="my-2 border-[#e8e0dc]" />
                                    <button
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            onLogout?.();
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#f87171] hover:bg-[#f87171]/10 transition-all duration-300"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
