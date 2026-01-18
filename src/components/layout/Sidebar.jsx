import { useState } from 'react';

const navigationItems = [
    { name: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, href: '#dashboard' },
    { name: 'Jobs', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, href: '#jobs', badge: '24' },
    { name: 'Applications', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, href: '#applications' },
    { name: 'Messages', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, href: '#messages', badge: '3' },
    { name: 'Profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, href: '#profile' },
    { name: 'Settings', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, href: '#settings' },
];

export default function Sidebar({ isOpen, onClose, activeItem, onNavigate }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[#1e2a32]/30 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`
          fixed top-0 left-0 z-50 h-full
          bg-white border-r-2 border-[#e8e0dc]
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
                    <div className="flex items-center justify-between h-18 px-5 py-4 border-b-2 border-[#e8e0dc]">
                        {!collapsed && (
                            <a href="/" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#FFD2C2] to-[#789A99] rounded-xl flex items-center justify-center shadow-lg shadow-[#789A99]/20 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-[#1e2a32]">
                                    Job<span className="text-[#789A99]">Portal</span>
                                </span>
                            </a>
                        )}

                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 text-[#5a6b75] hover:text-[#1e2a32] hover:bg-[#FFD2C2]/30 rounded-xl lg:hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#789A99]"
                            aria-label="Close sidebar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={() => setCollapsed(!collapsed)}
                            className="hidden lg:flex p-2 text-[#5a6b75] hover:text-[#1e2a32] hover:bg-[#FFD2C2]/30 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#789A99]"
                            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            <svg className={`w-5 h-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto" aria-label="Main navigation">
                        {navigationItems.map((item, index) => {
                            const isActive = activeItem === item.name;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => { e.preventDefault(); onNavigate?.(item.name); onClose?.(); }}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-300 ease-out group
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#789A99]
                    hover:scale-[1.02]
                    ${isActive
                                            ? 'bg-[#789A99] text-white shadow-lg shadow-[#789A99]/30'
                                            : 'text-[#5a6b75] hover:bg-[#FFD2C2]/30 hover:text-[#1e2a32]'
                                        }
                  `}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-[#8a9aa4] group-hover:text-[#789A99]'}`}>
                                        {item.icon}
                                    </span>
                                    {!collapsed && (
                                        <>
                                            <span className="flex-1 font-medium">{item.name}</span>
                                            {item.badge && (
                                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#789A99]/15 text-[#789A99]'
                                                    }`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t-2 border-[#e8e0dc]">
                        {!collapsed ? (
                            <div className="p-5 bg-gradient-to-br from-[#FFD2C2] to-[#f5b8a3] rounded-2xl animate-float">
                                <h4 className="font-semibold text-[#1e2a32] mb-1">Upgrade to Pro</h4>
                                <p className="text-sm text-[#5a6b75] mb-4">Get unlimited applications and premium features.</p>
                                <button className="w-full py-2.5 bg-[#789A99] text-white font-semibold rounded-xl hover:bg-[#5f7d7c] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#789A99]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#789A99]">
                                    Upgrade Now
                                </button>
                            </div>
                        ) : (
                            <button
                                className="p-3 w-full flex justify-center text-[#789A99] hover:bg-[#FFD2C2]/30 rounded-xl transition-all duration-300"
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
