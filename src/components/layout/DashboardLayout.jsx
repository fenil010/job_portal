import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children, activeItem = 'Dashboard', onNavigate, user, onLogout }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#fdf9f7]">
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} user={user} onLogout={onLogout} />
            <div className="flex">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    activeItem={activeItem}
                    onNavigate={onNavigate}
                />
                <main
                    className="flex-1 min-h-[calc(100vh-4.5rem)] p-4 lg:p-8 animate-fade-in"
                    role="main"
                    aria-label="Main content"
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
