/**
 * Resume Storage Service
 * Simulates secure cloud storage with encryption (base64 encoding for demo).
 * Uses localStorage for persistence with version control.
 */

const STORAGE_KEY = 'jp_resumes';
const MAX_VERSIONS = 5;

/**
 * Convert file to base64 for storage
 */
async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result?.split(',')[1] || '';
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Get all resumes from storage for a user
 */
export function getResumes(userId = 'default') {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return { resumes: [], primaryResumeId: null };

        const data = JSON.parse(stored);
        const userData = data[userId] || { resumes: [], primaryResumeId: null };

        return userData;
    } catch (error) {
        console.error('Error reading resumes from storage:', error);
        return { resumes: [], primaryResumeId: null };
    }
}

/**
 * Save resume to storage
 */
export async function saveResume(file, parsedData = null, userId = 'default') {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const data = stored ? JSON.parse(stored) : {};

        if (!data[userId]) {
            data[userId] = { resumes: [], primaryResumeId: null };
        }

        // Check version limit
        if (data[userId].resumes.length >= MAX_VERSIONS) {
            // Remove oldest resume (last in array)
            data[userId].resumes.pop();
        }

        // Convert file to base64 for storage
        const fileData = await fileToBase64(file);

        const resume = {
            id: `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
            fileData: fileData, // "Encrypted" file data
            parsedData: parsedData,
            uploadedAt: new Date().toISOString(),
            version: data[userId].resumes.length + 1,
        };

        // Add new resume at the beginning (newest first)
        data[userId].resumes.unshift(resume);

        // If this is the first resume, set it as primary
        if (data[userId].resumes.length === 1) {
            data[userId].primaryResumeId = resume.id;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

        return { success: true, resume };
    } catch (error) {
        console.error('Error saving resume:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Delete resume from storage
 */
export function deleteResume(resumeId, userId = 'default') {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return { success: false, error: 'No data found' };

        const data = JSON.parse(stored);
        if (!data[userId]) return { success: false, error: 'User not found' };

        const index = data[userId].resumes.findIndex(r => r.id === resumeId);
        if (index === -1) return { success: false, error: 'Resume not found' };

        data[userId].resumes.splice(index, 1);

        // Update version numbers
        data[userId].resumes.forEach((r, i) => {
            r.version = data[userId].resumes.length - i;
        });

        // If deleted resume was primary, set newest as primary
        if (data[userId].primaryResumeId === resumeId) {
            data[userId].primaryResumeId = data[userId].resumes[0]?.id || null;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

        return { success: true };
    } catch (error) {
        console.error('Error deleting resume:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Set primary resume
 */
export function setPrimaryResume(resumeId, userId = 'default') {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return { success: false, error: 'No data found' };

        const data = JSON.parse(stored);
        if (!data[userId]) return { success: false, error: 'User not found' };

        const resume = data[userId].resumes.find(r => r.id === resumeId);
        if (!resume) return { success: false, error: 'Resume not found' };

        data[userId].primaryResumeId = resumeId;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

        return { success: true };
    } catch (error) {
        console.error('Error setting primary resume:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get primary resume for a user
 */
export function getPrimaryResume(userId = 'default') {
    const { resumes, primaryResumeId } = getResumes(userId);
    return resumes.find(r => r.id === primaryResumeId) || resumes[0] || null;
}

/**
 * Get resume by ID
 */
export function getResumeById(resumeId, userId = 'default') {
    const { resumes } = getResumes(userId);
    return resumes.find(r => r.id === resumeId) || null;
}

/**
 * Clear all resumes for a user
 */
export function clearResumes(userId = 'default') {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return { success: true };

        const data = JSON.parse(stored);
        delete data[userId];

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

        return { success: true };
    } catch (error) {
        console.error('Error clearing resumes:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get storage stats
 */
export function getStorageStats(userId = 'default') {
    const { resumes, primaryResumeId } = getResumes(userId);
    const totalSize = resumes.reduce((sum, r) => sum + r.fileSize, 0);

    return {
        totalResumes: resumes.length,
        maxVersions: MAX_VERSIONS,
        remainingSlots: MAX_VERSIONS - resumes.length,
        totalStorageUsed: totalSize,
        hasPrimaryResume: !!primaryResumeId,
    };
}

export default {
    getResumes,
    saveResume,
    deleteResume,
    setPrimaryResume,
    getPrimaryResume,
    getResumeById,
    clearResumes,
    getStorageStats,
};
