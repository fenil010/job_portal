import { useState, useRef, useCallback } from 'react';
import { Button, Badge } from '../ui';

const ACCEPTED_FORMATS = ['.pdf', '.doc', '.docx'];
const ACCEPTED_MIME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ResumeUploader({ onUpload, onPreview, isUploading = false }) {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    const validateFile = useCallback((file) => {
        // Check file type
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!ACCEPTED_FORMATS.includes(fileExtension) && !ACCEPTED_MIME_TYPES.includes(file.type)) {
            return { valid: false, error: 'Invalid file format. Please upload PDF, DOC, or DOCX files only.' };
        }

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            return { valid: false, error: `File exceeds 5MB size limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.` };
        }

        return { valid: true, error: null };
    }, []);

    const handleFile = useCallback((file) => {
        setError(null);
        const validation = validateFile(file);

        if (!validation.valid) {
            setError(validation.error);
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
    }, [validateFile]);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, [handleFile]);

    const handleChange = useCallback((e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    }, [handleFile]);

    const handleUpload = useCallback(async () => {
        if (!selectedFile || isUploading) return;

        // Simulate upload progress
        setUploadProgress(0);
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 100);

        try {
            await onUpload?.(selectedFile);
            setUploadProgress(100);
            setTimeout(() => {
                setSelectedFile(null);
                setUploadProgress(0);
            }, 500);
        } catch (err) {
            setError(err.message || 'Upload failed. Please try again.');
            clearInterval(progressInterval);
            setUploadProgress(0);
        }
    }, [selectedFile, isUploading, onUpload]);

    const handlePreview = useCallback(() => {
        if (selectedFile) {
            onPreview?.(selectedFile);
        }
    }, [selectedFile, onPreview]);

    const removeFile = useCallback(() => {
        setSelectedFile(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    const getFileIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        if (ext === 'pdf') {
            return (
                <svg className="w-10 h-10 text-[#ef4444]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-2.5 9.5c0 .83-.67 1.5-1.5 1.5H8v2H6.5v-5H9c.83 0 1.5.67 1.5 1.5zm5-1.5H13v5h-1.5v-5zm3.5 0h-2v5h1.5v-2h.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                </svg>
            );
        }
        return (
            <svg className="w-10 h-10 text-[#2563eb]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v1.5H8V12zm0 3h8v1.5H8V15zm0 3h5v1.5H8V18z" />
            </svg>
        );
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    return (
        <div className="space-y-4">
            {/* Drag & Drop Zone */}
            <div
                className={`
                    relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
                    ${dragActive
                        ? 'border-[#789A99] bg-[#789A99]/10 scale-[1.02]'
                        : selectedFile
                            ? 'border-[#4ade80] bg-[#4ade80]/5'
                            : 'border-[#e8e0dc] hover:border-[#FFD2C2] hover:bg-[#FFD2C2]/5'
                    }
                    ${error ? 'border-[#f87171] bg-[#f87171]/5' : ''}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {selectedFile ? (
                    <div className="flex flex-col items-center gap-3 animate-fade-in">
                        {getFileIcon(selectedFile.name)}
                        <div className="text-center">
                            <p className="font-medium text-[#1e2a32]">{selectedFile.name}</p>
                            <p className="text-sm text-[#5a6b75]">{formatFileSize(selectedFile.size)}</p>
                        </div>
                        <Badge variant="success" size="sm">Ready to upload</Badge>
                        <button
                            onClick={removeFile}
                            className="text-sm text-[#f87171] hover:underline font-medium"
                        >
                            Remove file
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#FFD2C2]/30 to-[#789A99]/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <p className="text-[#5a6b75] mb-2">
                            <span className="font-medium text-[#1e2a32]">Drag & drop</span> your resume here, or
                        </p>
                        <label className="inline-block cursor-pointer">
                            <span className="font-semibold text-[#789A99] hover:text-[#5f7d7c] hover:underline transition-colors">
                                browse files
                            </span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={handleChange}
                            />
                        </label>
                        <p className="text-xs text-[#8a9aa4] mt-4">
                            Supported formats: PDF, DOC, DOCX • Max size: 5MB
                        </p>
                    </>
                )}

                {/* Upload Progress */}
                {uploadProgress > 0 && (
                    <div className="absolute inset-x-4 bottom-4">
                        <div className="w-full bg-[#e8e0dc] rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-[#789A99] to-[#4ade80] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <p className="text-xs text-[#5a6b75] text-center mt-2">
                            {uploadProgress < 100 ? 'Uploading...' : 'Upload complete!'}
                        </p>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 p-3 bg-[#f87171]/10 border border-[#f87171]/30 rounded-xl text-sm text-[#dc2626] animate-fade-in">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            {/* Action Buttons */}
            {selectedFile && !isUploading && uploadProgress === 0 && (
                <div className="flex gap-3 animate-fade-in-up">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handlePreview}
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                    </Button>
                    <Button
                        variant="primary"
                        className="flex-1"
                        onClick={handleUpload}
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload Resume
                    </Button>
                </div>
            )}
        </div>
    );
}
