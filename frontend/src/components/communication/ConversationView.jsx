import { useState, useRef, useCallback } from 'react';
import { Button, Badge } from '../ui';
import MessageThread from './MessageThread';
import { validateFiles, getAcceptAttribute, formatFileSize } from '../../utils/fileValidation';

export default function ConversationView({
    conversation,
    messages = [],
    currentUserId,
    onSendMessage,
    onBack,
    onLoadMore,
    hasMoreMessages = false,
    isLoadingMore = false,
}) {
    const [messageText, setMessageText] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [fileError, setFileError] = useState(null);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);

    const handleSend = useCallback(() => {
        if (!messageText.trim() && attachments.length === 0) return;

        onSendMessage?.({
            content: messageText.trim(),
            attachments: attachments,
            timestamp: new Date().toISOString(),
        });

        setMessageText('');
        setAttachments([]);
        textareaRef.current?.focus();
    }, [messageText, attachments, onSendMessage]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileSelect = (e) => {
        setFileError(null);
        const files = Array.from(e.target.files);

        // Validate files using the attachment profile
        const { validFiles, errors } = validateFiles(files, 'attachment');

        if (errors.length > 0) {
            // Show first error message
            setFileError(errors[0].error);
        }

        if (validFiles.length > 0) {
            const newAttachments = validFiles.map(file => ({
                name: file.name,
                size: file.size,
                type: file.type,
                file: file,
            }));
            setAttachments(prev => [...prev, ...newAttachments]);
        }

        e.target.value = '';
    };

    const removeAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
        setFileError(null);
    };

    // formatFileSize is now imported from fileValidation utility

    const otherParticipant = conversation?.participant || {};

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl border-2 border-[#e8e0dc] overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b-2 border-[#e8e0dc] bg-gradient-to-r from-[#FFD2C2]/10 to-transparent">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 text-[#5a6b75] hover:text-[#1e2a32] hover:bg-[#f5f3f1] rounded-lg transition-all lg:hidden"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#789A99] to-[#5f7d7c] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {otherParticipant.avatar || otherParticipant.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '?'}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#1e2a32] truncate">{otherParticipant.name || 'Unknown'}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[#5a6b75] truncate">{otherParticipant.role || otherParticipant.title}</span>
                        {otherParticipant.isOnline && (
                            <span className="flex items-center gap-1 text-xs text-[#4ade80]">
                                <span className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse" />
                                Online
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-2 text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#789A99]/10 rounded-lg transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </button>
                    <button className="p-2 text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#789A99]/10 rounded-lg transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                    <button className="p-2 text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#789A99]/10 rounded-lg transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 relative overflow-hidden">
                <MessageThread
                    messages={messages}
                    currentUserId={currentUserId}
                    otherParticipant={otherParticipant}
                    isTyping={isTyping}
                    onLoadMore={onLoadMore}
                    hasMoreMessages={hasMoreMessages}
                    isLoadingMore={isLoadingMore}
                />
            </div>

            {/* Attachments Preview */}
            {attachments.length > 0 && (
                <div className="px-4 py-2 border-t border-[#e8e0dc] bg-[#f5f3f1]/50">
                    <div className="flex flex-wrap gap-2">
                        {attachments.map((attachment, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-[#e8e0dc] text-sm"
                            >
                                <svg className="w-4 h-4 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                <span className="text-[#1e2a32] max-w-[150px] truncate">{attachment.name}</span>
                                <span className="text-[#8a9aa4]">({formatFileSize(attachment.size)})</span>
                                <button
                                    onClick={() => removeAttachment(index)}
                                    className="p-0.5 text-[#8a9aa4] hover:text-[#f87171] transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* File Error Message */}
            {fileError && (
                <div className="px-4 py-2 border-t border-[#e8e0dc]">
                    <div className="flex items-center gap-2 p-2 bg-[#f87171]/10 border border-[#f87171]/30 rounded-lg text-sm text-[#dc2626]">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        <span>{fileError}</span>
                        <button
                            onClick={() => setFileError(null)}
                            className="ml-auto p-0.5 hover:text-[#b91c1c] transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t-2 border-[#e8e0dc] bg-white">
                <div className="flex items-end gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        multiple
                        accept={getAcceptAttribute('attachment')}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2.5 text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#789A99]/10 rounded-xl transition-all flex-shrink-0"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>
                    <div className="flex-1 relative">
                        <textarea
                            ref={textareaRef}
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            rows={1}
                            className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors resize-none max-h-32"
                            style={{ minHeight: '44px' }}
                        />
                    </div>
                    <button
                        onClick={handleSend}
                        disabled={!messageText.trim() && attachments.length === 0}
                        className="p-2.5 bg-[#789A99] text-white rounded-xl hover:bg-[#5f7d7c] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
                <p className="mt-2 text-xs text-[#8a9aa4]">Press Enter to send, Shift+Enter for new line</p>
            </div>
        </div>
    );
}
