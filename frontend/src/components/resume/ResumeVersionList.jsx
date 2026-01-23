import { Button, Badge } from '../ui';

export default function ResumeVersionList({
    resumes = [],
    primaryResumeId,
    onSetPrimary,
    onDelete,
    onPreview,
    onAnalyze
}) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const getFileTypeColor = (fileName) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (ext === 'pdf') return 'danger';
        return 'info';
    };

    if (resumes.length === 0) {
        return (
            <div className="text-center py-8 px-4 bg-[#f8f6f5] rounded-xl border-2 border-dashed border-[#e8e0dc]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#e8e0dc] flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p className="text-[#5a6b75] mb-1">No resumes uploaded yet</p>
                <p className="text-sm text-[#8a9aa4]">Upload your first resume to get started</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-[#1e2a32]">
                    Resume Versions ({resumes.length}/5)
                </h4>
                <span className="text-xs text-[#8a9aa4]">
                    {5 - resumes.length} slots remaining
                </span>
            </div>

            {resumes.map((resume, index) => {
                const isPrimary = resume.id === primaryResumeId;
                const fileExt = resume.fileName.split('.').pop()?.toUpperCase();

                return (
                    <div
                        key={resume.id}
                        className={`
                            relative p-4 rounded-xl border-2 transition-all duration-300
                            ${isPrimary
                                ? 'border-[#789A99] bg-[#789A99]/5'
                                : 'border-[#e8e0dc] hover:border-[#FFD2C2] hover:bg-[#FFD2C2]/5'
                            }
                        `}
                    >
                        <div className="flex items-start gap-4">
                            {/* File Icon */}
                            <div className={`
                                w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                                ${fileExt === 'PDF' ? 'bg-[#ef4444]/10' : 'bg-[#2563eb]/10'}
                            `}>
                                {fileExt === 'PDF' ? (
                                    <svg className="w-6 h-6 text-[#ef4444]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-[#2563eb]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4z" />
                                    </svg>
                                )}
                            </div>

                            {/* File Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium text-[#1e2a32] truncate">{resume.fileName}</p>
                                    {isPrimary && (
                                        <Badge variant="success" size="sm">Primary</Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#5a6b75]">
                                    <Badge variant={getFileTypeColor(resume.fileName)} size="sm">{fileExt}</Badge>
                                    <span>{formatFileSize(resume.fileSize)}</span>
                                    <span>•</span>
                                    <span>{formatDate(resume.uploadedAt)}</span>
                                </div>
                                {index === 0 && !isPrimary && (
                                    <p className="text-xs text-[#8a9aa4] mt-1">Latest version</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                    onClick={() => onPreview?.(resume)}
                                    className="p-2 text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#789A99]/10 rounded-lg transition-all"
                                    title="Preview"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => onAnalyze?.(resume)}
                                    className="p-2 text-[#8a9aa4] hover:text-[#a78bfa] hover:bg-[#a78bfa]/10 rounded-lg transition-all"
                                    title="AI Analysis"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </button>
                                {!isPrimary && (
                                    <button
                                        onClick={() => onSetPrimary?.(resume.id)}
                                        className="p-2 text-[#8a9aa4] hover:text-[#4ade80] hover:bg-[#4ade80]/10 rounded-lg transition-all"
                                        title="Set as Primary"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    onClick={() => onDelete?.(resume.id)}
                                    className="p-2 text-[#8a9aa4] hover:text-[#f87171] hover:bg-[#f87171]/10 rounded-lg transition-all"
                                    title="Delete"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
