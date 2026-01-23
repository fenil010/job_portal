import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '../ui';

const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
    const getIcon = (type) => {
        const icons = {
            message: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
            email: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            sms: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            interview: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            application: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            feedback: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
        };
        return icons[type] || icons.message;
    };

    const getTypeColor = (type) => {
        const colors = {
            message: 'bg-[#60a5fa]/10 text-[#60a5fa]',
            email: 'bg-[#789A99]/10 text-[#789A99]',
            sms: 'bg-[#a78bfa]/10 text-[#a78bfa]',
            interview: 'bg-[#4ade80]/10 text-[#4ade80]',
            application: 'bg-[#FFD2C2]/20 text-[#f0b8a8]',
            feedback: 'bg-[#fbbf24]/10 text-[#fbbf24]',
        };
        return colors[type] || colors.message;
    };

    return (
        <div className={`p-4 border-b border-[#e8e0dc] last:border-b-0 hover:bg-[#FFD2C2]/5 transition-colors ${!notification.isRead ? 'bg-[#789A99]/5' : ''}`}>
            <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
                    {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h4 className={`text-sm ${!notification.isRead ? 'font-semibold text-[#1e2a32]' : 'font-medium text-[#5a6b75]'}`}>
                                {notification.title}
                            </h4>
                            <p className="text-sm text-[#8a9aa4] mt-0.5 line-clamp-2">{notification.message}</p>
                        </div>
                        {!notification.isRead && (
                            <div className="w-2 h-2 rounded-full bg-[#789A99] flex-shrink-0 mt-1.5" />
                        )}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-[#8a9aa4]">{notification.time}</span>
                        <Badge variant={notification.channel === 'email' ? 'info' : notification.channel === 'sms' ? 'primary' : 'default'} size="sm">
                            {notification.channel || 'in-app'}
                        </Badge>
                        <div className="flex gap-1 ml-auto">
                            {!notification.isRead && (
                                <button
                                    onClick={() => onMarkRead?.(notification.id)}
                                    className="text-xs text-[#789A99] hover:text-[#5f7d7c] font-medium"
                                >
                                    Mark read
                                </button>
                            )}
                            <button
                                onClick={() => onDelete?.(notification.id)}
                                className="text-xs text-[#8a9aa4] hover:text-[#f87171] font-medium ml-2"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function NotificationCenter({
    notifications = [],
    onMarkRead,
    onMarkAllRead,
    onDelete,
    onClearAll,
    onOpenPreferences,
}) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

    const filteredNotifications = useMemo(() => {
        let result = [...notifications];

        if (activeFilter !== 'all') {
            if (activeFilter === 'unread') {
                result = result.filter(n => !n.isRead);
            } else {
                result = result.filter(n => n.type === activeFilter || n.channel === activeFilter);
            }
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(n =>
                n.title.toLowerCase().includes(query) ||
                n.message.toLowerCase().includes(query)
            );
        }

        return result;
    }, [notifications, activeFilter, searchQuery]);

    const filterOptions = [
        { value: 'all', label: 'All' },
        { value: 'unread', label: `Unread (${unreadCount})` },
        { value: 'message', label: 'Messages' },
        { value: 'interview', label: 'Interviews' },
        { value: 'application', label: 'Applications' },
        { value: 'email', label: 'Email' },
        { value: 'sms', label: 'SMS' },
    ];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Notifications</h2>
                    <p className="text-sm text-[#5a6b75]">
                        {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={onMarkAllRead}>
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Mark all read
                        </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={onOpenPreferences}>
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Preferences
                    </Button>
                </div>
            </div>

            {/* Search and Filters */}
            <Card variant="default" padding="md">
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search notifications..."
                                className="w-full pl-10 pr-4 py-2 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {filterOptions.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setActiveFilter(option.value)}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${activeFilter === option.value
                                            ? 'bg-[#789A99] text-white'
                                            : 'bg-[#f5f3f1] text-[#5a6b75] hover:bg-[#e8e0dc]'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Notifications List */}
            <Card variant="default" padding="none">
                <CardContent className="p-0">
                    {filteredNotifications.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FFD2C2]/20 flex items-center justify-center">
                                <svg className="w-8 h-8 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <p className="text-lg font-medium text-[#1e2a32]">
                                {activeFilter === 'all' ? 'No notifications yet' : 'No matching notifications'}
                            </p>
                            <p className="text-sm text-[#8a9aa4] mt-1">
                                {activeFilter === 'all' ? "You'll see notifications here when you receive them" : 'Try adjusting your filters'}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#e8e0dc]">
                            {filteredNotifications.map(notification => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onMarkRead={onMarkRead}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Clear All */}
            {notifications.length > 0 && (
                <div className="text-center">
                    <Button variant="ghost" size="sm" onClick={onClearAll} className="text-[#f87171]">
                        Clear all notifications
                    </Button>
                </div>
            )}
        </div>
    );
}
