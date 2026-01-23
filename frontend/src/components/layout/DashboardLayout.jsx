import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#F4EDE3]">
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
            <div className="flex">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
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
