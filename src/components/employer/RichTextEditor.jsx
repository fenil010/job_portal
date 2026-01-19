import { useState, useCallback, forwardRef } from 'react';
import { Button } from '../ui';

const RichTextEditor = forwardRef(function RichTextEditor(
    {
        value = '',
        onChange,
        label,
        placeholder = 'Start typing...',
        minHeight = '200px',
        error,
        helperText,
        className = '',
        ...props
    },
    ref
) {
    const [showPreview, setShowPreview] = useState(false);

    const execCommand = useCallback((command, value = null) => {
        document.execCommand(command, false, value);
    }, []);

    const handleInput = useCallback((e) => {
        onChange?.(e.target.innerHTML);
    }, [onChange]);

    const insertLink = useCallback(() => {
        const url = prompt('Enter URL:');
        if (url) {
            execCommand('createLink', url);
        }
    }, [execCommand]);

    const toolbarButtons = [
        { command: 'bold', icon: 'B', title: 'Bold', style: 'font-bold' },
        { command: 'italic', icon: 'I', title: 'Italic', style: 'italic' },
        { command: 'underline', icon: 'U', title: 'Underline', style: 'underline' },
        { type: 'divider' },
        { command: 'insertUnorderedList', icon: '•', title: 'Bullet List', svg: true },
        { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
        { type: 'divider' },
        { command: 'formatBlock', value: 'H2', icon: 'H2', title: 'Heading' },
        { command: 'formatBlock', value: 'P', icon: '¶', title: 'Paragraph' },
        { type: 'divider' },
        { command: 'link', icon: '🔗', title: 'Insert Link', custom: true },
    ];

    const renderMarkdownPreview = () => {
        // Simple conversion for preview
        return value
            .replace(/<h2>/g, '## ')
            .replace(/<\/h2>/g, '\n')
            .replace(/<p>/g, '')
            .replace(/<\/p>/g, '\n')
            .replace(/<ul>/g, '')
            .replace(/<\/ul>/g, '')
            .replace(/<li>/g, '• ')
            .replace(/<\/li>/g, '\n')
            .replace(/<strong>/g, '**')
            .replace(/<\/strong>/g, '**')
            .replace(/<em>/g, '*')
            .replace(/<\/em>/g, '*')
            .replace(/<br\s*\/?>/g, '\n')
            .replace(/<[^>]+>/g, '');
    };

    return (
        <div className={`space-y-2 ${className}`} {...props}>
            {label && (
                <label className="block text-sm font-medium text-[#1e2a32]">{label}</label>
            )}
            <div className={`border-2 rounded-xl overflow-hidden ${error ? 'border-[#f87171]' : 'border-[#e8e0dc]'} focus-within:border-[#789A99] transition-colors`}>
                {/* Toolbar */}
                <div className="flex items-center flex-wrap gap-1 p-2 bg-[#FFD2C2]/10 border-b border-[#e8e0dc]">
                    {toolbarButtons.map((btn, idx) => {
                        if (btn.type === 'divider') {
                            return <div key={idx} className="w-px h-6 bg-[#e8e0dc] mx-1" />;
                        }
                        return (
                            <button
                                key={idx}
                                type="button"
                                title={btn.title}
                                onClick={() => {
                                    if (btn.custom && btn.command === 'link') {
                                        insertLink();
                                    } else if (btn.value) {
                                        execCommand(btn.command, btn.value);
                                    } else {
                                        execCommand(btn.command);
                                    }
                                }}
                                className={`p-2 rounded-lg text-[#5a6b75] hover:text-[#1e2a32] hover:bg-white transition-all duration-200 ${btn.style || ''}`}
                            >
                                {btn.svg ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <span className="text-sm">{btn.icon}</span>
                                )}
                            </button>
                        );
                    })}
                    <div className="flex-1" />
                    <Button
                        type="button"
                        variant={showPreview ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        {showPreview ? 'Edit' : 'Preview'}
                    </Button>
                </div>

                {/* Editor / Preview */}
                {showPreview ? (
                    <div
                        className="p-4 bg-[#fdf9f7] prose prose-sm max-w-none"
                        style={{ minHeight }}
                    >
                        <pre className="whitespace-pre-wrap text-sm text-[#5a6b75] font-sans">
                            {renderMarkdownPreview() || 'Nothing to preview...'}
                        </pre>
                    </div>
                ) : (
                    <div
                        ref={ref}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleInput}
                        dangerouslySetInnerHTML={{ __html: value }}
                        className="p-4 bg-white text-[#1e2a32] outline-none prose prose-sm max-w-none"
                        style={{ minHeight }}
                        data-placeholder={placeholder}
                    />
                )}
            </div>
            {error && <p className="text-sm text-[#f87171]">{error}</p>}
            {helperText && !error && <p className="text-sm text-[#8a9aa4]">{helperText}</p>}
        </div>
    );
});

export { RichTextEditor };
export default RichTextEditor;
