import { useState, useEffect } from 'react';
import { Button, Badge } from '../ui';

export default function ResumePreview({ file, resumeData, onClose }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setIsLoading(false);
            return () => URL.revokeObjectURL(url);
        } else if (resumeData?.fileData) {
            // Convert base64 back to blob for preview
            try {
                const byteCharacters = atob(resumeData.fileData);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: resumeData.mimeType });
                const url = URL.createObjectURL(blob);
                setPreviewUrl(url);
                setIsLoading(false);
                return () => URL.revokeObjectURL(url);
            } catch {
                setIsLoading(false);
            }
        }
    }, [file, resumeData]);

    const fileName = file?.name || resumeData?.fileName || 'Resume';
    const fileSize = file?.size || resumeData?.fileSize || 0;
    const fileType = (file?.name || resumeData?.fileName || '').split('.').pop()?.toLowerCase();
    const isPdf = fileType === 'pdf';

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const handleDownload = () => {
        if (previewUrl) {
            const a = document.createElement('a');
            a.href = previewUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className="space-y-4">
            {/* File Info Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FFD2C2]/20 to-[#789A99]/10 rounded-xl">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPdf ? 'bg-[#ef4444]/10' : 'bg-[#2563eb]/10'}`}>
                        {isPdf ? (
                            <svg className="w-6 h-6 text-[#ef4444]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4z" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-[#2563eb]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v1.5H8V12z" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-[#1e2a32] truncate max-w-[200px]">{fileName}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant={isPdf ? 'danger' : 'info'} size="sm">{fileType?.toUpperCase()}</Badge>
                            <span className="text-sm text-[#5a6b75]">{formatFileSize(fileSize)}</span>
                        </div>
                    </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                </Button>
            </div>

            {/* Preview Area */}
            <div className="relative bg-[#f8f6f5] rounded-xl overflow-hidden border-2 border-[#e8e0dc]" style={{ height: '400px' }}>
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-[#e8e0dc] border-t-[#789A99] rounded-full animate-spin" />
                    </div>
                ) : isPdf && previewUrl ? (
                    <iframe
                        src={previewUrl}
                        className="w-full h-full"
                        title="Resume Preview"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-20 h-20 bg-[#e8e0dc] rounded-2xl flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-[#5a6b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-[#5a6b75] mb-2">
                            {fileType === 'doc' || fileType === 'docx'
                                ? 'Word document preview is not available in browser'
                                : 'Preview not available for this file type'
                            }
                        </p>
                        <p className="text-sm text-[#8a9aa4]">
                            Click "Download" to view the full document
                        </p>
                    </div>
                )}
            </div>

            {/* Parsed Data Display (if available) */}
            {resumeData?.parsedData && (
                <div className="space-y-3 p-4 bg-white rounded-xl border-2 border-[#e8e0dc]">
                    <h4 className="font-semibold text-[#1e2a32] flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        Extracted Information
                    </h4>

                    {resumeData.parsedData.email && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#5a6b75]">Email:</span>
                            <span className="text-sm font-medium text-[#1e2a32]">{resumeData.parsedData.email}</span>
                        </div>
                    )}

                    {resumeData.parsedData.phone && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#5a6b75]">Phone:</span>
                            <span className="text-sm font-medium text-[#1e2a32]">{resumeData.parsedData.phone}</span>
                        </div>
                    )}

                    {resumeData.parsedData.skills?.length > 0 && (
                        <div>
                            <span className="text-sm text-[#5a6b75]">Skills:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {resumeData.parsedData.skills.map((skill, idx) => (
                                    <Badge key={idx} variant="secondary" size="sm">{skill}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Close Button */}
            {onClose && (
                <div className="flex justify-end">
                    <Button variant="primary" onClick={onClose}>Close Preview</Button>
                </div>
            )}
        </div>
    );
}
