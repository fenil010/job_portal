import { useState, useRef, useEffect } from 'react';
import { Badge } from '../ui';

const MessageBubble = ({ message, isOwn, showAvatar = true }) => {
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    return (
        <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
            {showAvatar && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${isOwn ? 'bg-gradient-to-br from-[#789A99] to-[#5f7d7c]' : 'bg-gradient-to-br from-[#FFD2C2] to-[#f0b8a8]'}`}>
                    {message.senderAvatar || message.senderName?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
            )}
            {!showAvatar && <div className="w-8 flex-shrink-0" />}
            <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl ${isOwn ? 'bg-[#789A99] text-white rounded-br-md' : 'bg-[#f5f3f1] text-[#1e2a32] rounded-bl-md'}`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.attachments?.length > 0 && (
                        <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, idx) => (
                                <div key={idx} className={`flex items-center gap-2 text-xs ${isOwn ? 'text-white/80' : 'text-[#5a6b75]'}`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                    <span>{attachment.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className={`flex items-center gap-2 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-xs text-[#8a9aa4]">{formatTime(message.timestamp)}</span>
                    {isOwn && message.status && (
                        <span className="text-xs text-[#8a9aa4]">
                            {message.status === 'sent' && '✓'}
                            {message.status === 'delivered' && '✓✓'}
                            {message.status === 'read' && <span className="text-[#789A99]">✓✓</span>}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const DateDivider = ({ date }) => (
    <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-[#e8e0dc]" />
        <span className="text-xs font-medium text-[#8a9aa4] px-3 py-1 bg-[#f5f3f1] rounded-full">{date}</span>
        <div className="flex-1 h-px bg-[#e8e0dc]" />
    </div>
);

const TypingIndicator = ({ senderName }) => (
    <div className="flex gap-3 items-end">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD2C2] to-[#f0b8a8] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {senderName?.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div className="bg-[#f5f3f1] px-4 py-3 rounded-2xl rounded-bl-md">
            <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#8a9aa4] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#8a9aa4] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#8a9aa4] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    </div>
);

export default function MessageThread({
    messages = [],
    currentUserId,
    otherParticipant,
    isTyping = false,
    onLoadMore,
    hasMoreMessages = false,
    isLoadingMore = false,
}) {
    const messagesEndRef = useRef(null);
    const containerRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const scrollToBottom = (smooth = true) => {
        messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    };

    useEffect(() => {
        scrollToBottom(false);
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.senderId === currentUserId) {
                scrollToBottom();
            }
        }
    }, [messages, currentUserId]);

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        setShowScrollButton(scrollHeight - scrollTop - clientHeight > 200);

        // Load more when scrolled to top
        if (scrollTop < 50 && hasMoreMessages && !isLoadingMore) {
            onLoadMore?.();
        }
    };

    // Group messages by date
    const groupedMessages = messages.reduce((groups, message) => {
        const date = new Date(message.timestamp).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
        });
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {});

    // Determine if we should show avatar (first message or after a gap)
    const shouldShowAvatar = (messages, index) => {
        if (index === 0) return true;
        const prevMessage = messages[index - 1];
        const currMessage = messages[index];
        if (prevMessage.senderId !== currMessage.senderId) return true;
        const timeDiff = new Date(currMessage.timestamp) - new Date(prevMessage.timestamp);
        return timeDiff > 5 * 60 * 1000; // 5 minutes
    };

    return (
        <div className="flex flex-col h-full">
            {/* Messages Container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto p-4 space-y-2"
                onScroll={handleScroll}
            >
                {/* Load More */}
                {hasMoreMessages && (
                    <div className="text-center py-2">
                        {isLoadingMore ? (
                            <div className="flex items-center justify-center gap-2 text-sm text-[#8a9aa4]">
                                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Loading...
                            </div>
                        ) : (
                            <button
                                onClick={onLoadMore}
                                className="text-sm text-[#789A99] hover:text-[#5f7d7c] font-medium"
                            >
                                Load earlier messages
                            </button>
                        )}
                    </div>
                )}

                {/* Grouped Messages */}
                {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                    <div key={date}>
                        <DateDivider date={date} />
                        <div className="space-y-2">
                            {dateMessages.map((message, index) => (
                                <MessageBubble
                                    key={message.id}
                                    message={message}
                                    isOwn={message.senderId === currentUserId}
                                    showAvatar={shouldShowAvatar(dateMessages, index)}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && <TypingIndicator senderName={otherParticipant?.name} />}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            {showScrollButton && (
                <button
                    onClick={() => scrollToBottom()}
                    className="absolute bottom-20 right-6 p-2 bg-white rounded-full shadow-lg border border-[#e8e0dc] text-[#5a6b75] hover:text-[#789A99] hover:border-[#789A99] transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </button>
            )}
        </div>
    );
}
