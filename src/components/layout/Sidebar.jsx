import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Navigation items for job seekers
const jobSeekerNav = [
    { name: 'Dashboard', path: '/dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { name: 'Jobs', path: '/jobs', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, badge: '24' },
    { name: 'Applications', path: '/applications', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { name: 'Saved', path: '/saved', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg> },
    { name: 'Messages', path: '/messages', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, badge: '3' },
    { name: 'Profile', path: '/profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { name: 'Settings', path: '/settings', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
];

// Navigation items for employers
const employerNav = [
    { name: 'Dashboard', path: '/employer/dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { name: 'Browse Jobs', path: '/jobs', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    { name: 'Messages', path: '/messages', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> },
    { name: 'Analytics', path: '/analytics', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
];

// Navigation items for admins
const adminNav = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { name: 'Browse Jobs', path: '/jobs', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    { name: 'Analytics', path: '/analytics', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
];

function getNavigationItems(role) {
    switch (role) {
        case 'employer':
            return employerNav;
        case 'admin':
            return adminNav;
        default:
            return jobSeekerNav;
    }
}

export default function Sidebar({ isOpen, onClose }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useAuth();
    const location = useLocation();

    const navigationItems = getNavigationItems(user?.role);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[#3E2723]/30 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`
          fixed top-0 left-0 z-50 h-full
          bg-[#FAF6F0] border-r-2 border-[#90353D]/20
          transition-all duration-500 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
          ${collapsed ? 'lg:w-20' : 'lg:w-72'}
          w-72
          ${isOpen ? 'animate-slide-in-left' : ''}
        `}
                aria-label="Sidebar navigation"
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-18 px-5 py-4 border-b-2 border-[#90353D]/20">
                        {!collapsed && (
                            <NavLink to={user?.role === 'employer' ? '/employer/dashboard' : user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#90353D] to-[#6B2830] rounded-xl flex items-center justify-center shadow-lg shadow-[#90353D]/20 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-[#F4EDE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-[#3E2723]">
                                    Job<span className="text-[#90353D]">Portal</span>
                                </span>
                            </NavLink>
                        )}

                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 text-[#4A3C35] hover:text-[#3E2723] hover:bg-[#90353D]/10 rounded-xl lg:hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#90353D]"
                            aria-label="Close sidebar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={() => setCollapsed(!collapsed)}
                            className="hidden lg:flex p-2 text-[#4A3C35] hover:text-[#3E2723] hover:bg-[#90353D]/10 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#90353D]"
                            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            <svg className={`w-5 h-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto" aria-label="Main navigation">
                        {navigationItems.map((item, index) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={onClose}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-xl
                                    transition-all duration-300 ease-out group
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#90353D]
                                    hover:scale-[1.02]
                                    ${isActive || location.pathname === item.path
                                        ? 'bg-[#90353D] text-[#F4EDE3] shadow-lg shadow-[#90353D]/25'
                                        : 'text-[#4A3C35] hover:bg-[#90353D]/10 hover:text-[#3E2723]'
                                    }
                                `}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className={`flex-shrink-0 ${isActive || location.pathname === item.path ? 'text-[#F4EDE3]' : 'text-[#9B8B7E] group-hover:text-[#90353D]'}`}>
                                            {item.icon}
                                        </span>
                                        {!collapsed && (
                                            <>
                                                <span className="flex-1 font-medium">{item.name}</span>
                                                {item.badge && (
                                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${isActive || location.pathname === item.path ? 'bg-white/20 text-[#F4EDE3]' : 'bg-[#90353D]/15 text-[#90353D]'}`}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="p-4 border-t-2 border-[#90353D]/20">
                        {!collapsed ? (
                            <div className="p-5 bg-gradient-to-br from-[#90353D] to-[#6B2830] rounded-2xl animate-float">
                                <h4 className="font-semibold text-[#F4EDE3] mb-1">Upgrade to Pro</h4>
                                <p className="text-sm text-[#F4EDE3]/80 mb-4">Get unlimited applications and premium features.</p>
                                <button className="w-full py-2.5 bg-[#F4EDE3] text-[#90353D] font-semibold rounded-xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-[#3E2723]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F4EDE3]">
                                    Upgrade Now
                                </button>
                            </div>
                        ) : (
                            <button
                                className="p-3 w-full flex justify-center text-[#90353D] hover:bg-[#90353D]/10 rounded-xl transition-all duration-300"
                                aria-label="Upgrade to Pro"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
