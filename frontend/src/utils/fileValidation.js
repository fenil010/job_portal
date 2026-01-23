/**
 * Centralized file validation utility
 * Provides reusable validation logic for file uploads across the application
 */

// Validation profiles for different upload contexts
export const FILE_VALIDATION_PROFILES = {
    resume: {
        acceptedExtensions: ['.pdf', '.doc', '.docx'],
        acceptedMimeTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ],
        maxFileSize: 5 * 1024 * 1024, // 5MB
        description: 'PDF, DOC, or DOCX files up to 5MB'
    },
    attachment: {
        acceptedExtensions: ['.pdf', '.doc', '.docx', '.txt', '.png', '.jpg', '.jpeg', '.gif', '.webp'],
        acceptedMimeTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'image/png',
            'image/jpeg',
            'image/gif',
            'image/webp'
        ],
        maxFileSize: 10 * 1024 * 1024, // 10MB
        description: 'Documents and images up to 10MB'
    },
    image: {
        acceptedExtensions: ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
        acceptedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        maxFileSize: 5 * 1024 * 1024, // 5MB
        description: 'PNG, JPG, GIF, or WebP images up to 5MB'
    }
};

/**
 * Validates a file against a specified profile
 * @param {File} file - The file to validate
 * @param {string} profileName - Name of the validation profile ('resume', 'attachment', 'image')
 * @returns {{ valid: boolean, error: string | null, errorType: string | null }}
 */
export function validateFile(file, profileName = 'attachment') {
    const profile = FILE_VALIDATION_PROFILES[profileName];

    if (!profile) {
        return { valid: false, error: 'Invalid validation profile', errorType: 'config' };
    }

    if (!file) {
        return { valid: false, error: 'No file provided', errorType: 'missing' };
    }

    // Check file extension
    const fileName = file.name || '';
    const fileExtension = '.' + fileName.split('.').pop().toLowerCase();
    const hasValidExtension = profile.acceptedExtensions.includes(fileExtension);

    // Check MIME type
    const hasValidMimeType = profile.acceptedMimeTypes.includes(file.type);

    // File must have either valid extension OR valid MIME type
    if (!hasValidExtension && !hasValidMimeType) {
        return {
            valid: false,
            error: `Invalid file type. Accepted: ${profile.description}`,
            errorType: 'type'
        };
    }

    // Check file size
    if (file.size > profile.maxFileSize) {
        const maxSizeMB = (profile.maxFileSize / (1024 * 1024)).toFixed(0);
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        return {
            valid: false,
            error: `File too large (${fileSizeMB}MB). Maximum size is ${maxSizeMB}MB.`,
            errorType: 'size'
        };
    }

    return { valid: true, error: null, errorType: null };
}

/**
 * Validates multiple files against a profile
 * @param {File[]} files - Array of files to validate
 * @param {string} profileName - Name of the validation profile
 * @param {number} maxTotalSize - Optional maximum total size for all files combined
 * @returns {{ validFiles: File[], errors: Array<{ file: File, error: string }> }}
 */
export function validateFiles(files, profileName = 'attachment', maxTotalSize = 50 * 1024 * 1024) {
    const validFiles = [];
    const errors = [];
    let totalSize = 0;

    for (const file of files) {
        const result = validateFile(file, profileName);

        if (!result.valid) {
            errors.push({ file, error: result.error });
            continue;
        }

        totalSize += file.size;
        if (totalSize > maxTotalSize) {
            const maxMB = (maxTotalSize / (1024 * 1024)).toFixed(0);
            errors.push({ file, error: `Total attachment size would exceed ${maxMB}MB limit` });
            continue;
        }

        validFiles.push(file);
    }

    return { validFiles, errors };
}

/**
 * Gets the accept attribute string for file inputs
 * @param {string} profileName - Name of the validation profile
 * @returns {string} Accept attribute value for file input
 */
export function getAcceptAttribute(profileName = 'attachment') {
    const profile = FILE_VALIDATION_PROFILES[profileName];
    if (!profile) return '';

    return [...profile.acceptedExtensions, ...profile.acceptedMimeTypes].join(',');
}

/**
 * Formats file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
