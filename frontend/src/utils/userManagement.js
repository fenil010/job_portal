/**
 * User Management Utility
 * Handles RBAC, profile completion, authentication simulation
 */

// User Roles
export const USER_ROLES = {
    JOBSEEKER: 'jobseeker',
    EMPLOYER: 'employer',
    ADMIN: 'admin',
};

// Role Permissions
const ROLE_PERMISSIONS = {
    [USER_ROLES.JOBSEEKER]: [
        'view_jobs',
        'apply_jobs',
        'save_jobs',
        'manage_resume',
        'view_applications',
        'edit_profile',
    ],
    [USER_ROLES.EMPLOYER]: [
        'view_jobs',
        'post_jobs',
        'edit_jobs',
        'delete_jobs',
        'view_applicants',
        'manage_company',
        'edit_profile',
        'download_resumes',
    ],
    [USER_ROLES.ADMIN]: [
        'view_jobs',
        'manage_jobs',
        'manage_users',
        'manage_companies',
        'view_analytics',
        'system_settings',
        'edit_profile',
        'moderate_content',
    ],
};

// Profile fields required for each role
const PROFILE_FIELDS = {
    [USER_ROLES.JOBSEEKER]: {
        required: ['name', 'email', 'phone', 'location'],
        optional: ['bio', 'skills', 'experience', 'education', 'resume', 'linkedin', 'portfolio'],
    },
    [USER_ROLES.EMPLOYER]: {
        required: ['name', 'email', 'company', 'position'],
        optional: ['phone', 'companyWebsite', 'companySize', 'industry', 'companyLogo', 'companyDescription'],
    },
    [USER_ROLES.ADMIN]: {
        required: ['name', 'email'],
        optional: ['phone', 'department'],
    },
};

/**
 * Check if user has a specific permission
 */
export function hasPermission(user, permission) {
    if (!user || !user.role) return false;
    const permissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.includes(permission);
}

/**
 * Check if user has any of the specified permissions
 */
export function hasAnyPermission(user, permissions) {
    return permissions.some(p => hasPermission(user, p));
}

/**
 * Check if user has all of the specified permissions
 */
export function hasAllPermissions(user, permissions) {
    return permissions.every(p => hasPermission(user, p));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role) {
    return ROLE_PERMISSIONS[role] || [];
}

/**
 * Calculate profile completion percentage
 */
export function calculateProfileCompletion(user) {
    if (!user || !user.role) return { percentage: 0, completedFields: [], missingFields: [] };

    const fields = PROFILE_FIELDS[user.role] || PROFILE_FIELDS[USER_ROLES.JOBSEEKER];
    const allFields = [...fields.required, ...fields.optional];

    const completedFields = [];
    const missingFields = [];

    allFields.forEach(field => {
        const value = user[field] || user.profile?.[field];
        if (value && (typeof value !== 'string' || value.trim() !== '')) {
            completedFields.push(field);
        } else {
            missingFields.push(field);
        }
    });

    // Required fields weight more
    const requiredWeight = 0.6;
    const optionalWeight = 0.4;

    const requiredCompleted = fields.required.filter(f => completedFields.includes(f)).length;
    const optionalCompleted = fields.optional.filter(f => completedFields.includes(f)).length;

    const requiredScore = fields.required.length > 0
        ? (requiredCompleted / fields.required.length) * requiredWeight * 100
        : requiredWeight * 100;
    const optionalScore = fields.optional.length > 0
        ? (optionalCompleted / fields.optional.length) * optionalWeight * 100
        : optionalWeight * 100;

    const percentage = Math.round(requiredScore + optionalScore);

    return {
        percentage,
        completedFields,
        missingFields,
        requiredMissing: fields.required.filter(f => !completedFields.includes(f)),
        optionalMissing: fields.optional.filter(f => !completedFields.includes(f)),
    };
}

/**
 * Get profile completion status label
 */
export function getCompletionStatus(percentage) {
    if (percentage >= 100) return { label: 'Complete', color: 'success' };
    if (percentage >= 75) return { label: 'Almost There', color: 'info' };
    if (percentage >= 50) return { label: 'In Progress', color: 'warning' };
    return { label: 'Just Started', color: 'danger' };
}

// Storage keys
const STORAGE_KEYS = {
    VERIFICATION: 'jp_email_verification',
    TWO_FACTOR: 'jp_2fa_status',
    SOCIAL_LINKS: 'jp_social_links',
};

/**
 * Simulate email verification
 */
export function sendVerificationEmail(email) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const code = Math.random().toString(36).substring(2, 8).toUpperCase();
            sessionStorage.setItem(`${STORAGE_KEYS.VERIFICATION}_code`, code);
            sessionStorage.setItem(`${STORAGE_KEYS.VERIFICATION}_email`, email);
            resolve({ success: true, message: 'Verification email sent', code }); // code returned for demo
        }, 1000);
    });
}

/**
 * Verify email with code
 */
export function verifyEmail(code) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const storedCode = sessionStorage.getItem(`${STORAGE_KEYS.VERIFICATION}_code`);
            if (code.toUpperCase() === storedCode) {
                sessionStorage.removeItem(`${STORAGE_KEYS.VERIFICATION}_code`);
                sessionStorage.setItem(`${STORAGE_KEYS.VERIFICATION}_verified`, 'true');
                resolve({ success: true, message: 'Email verified successfully' });
            } else {
                resolve({ success: false, message: 'Invalid verification code' });
            }
        }, 500);
    });
}

/**
 * Check if email is verified
 */
export function isEmailVerified() {
    return sessionStorage.getItem(`${STORAGE_KEYS.VERIFICATION}_verified`) === 'true';
}

/**
 * Simulate 2FA setup
 */
export function setup2FA() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const secret = Math.random().toString(36).substring(2, 18).toUpperCase();
            const backupCodes = Array.from({ length: 6 }, () =>
                Math.random().toString(36).substring(2, 10).toUpperCase()
            );

            sessionStorage.setItem(STORAGE_KEYS.TWO_FACTOR, JSON.stringify({
                enabled: false,
                secret,
                backupCodes,
            }));

            resolve({
                success: true,
                secret,
                backupCodes,
                qrCodeUrl: `https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/JobPortal?secret=${secret}`,
            });
        }, 1000);
    });
}

/**
 * Enable 2FA with code verification
 */
export function enable2FA(code) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.TWO_FACTOR) || '{}');
            // For demo, accept any 6-digit code
            if (code && code.length === 6) {
                data.enabled = true;
                sessionStorage.setItem(STORAGE_KEYS.TWO_FACTOR, JSON.stringify(data));
                resolve({ success: true, message: '2FA enabled successfully' });
            } else {
                resolve({ success: false, message: 'Invalid code' });
            }
        }, 500);
    });
}

/**
 * Check if 2FA is enabled
 */
export function is2FAEnabled() {
    const data = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.TWO_FACTOR) || '{}');
    return data.enabled === true;
}

/**
 * Disable 2FA
 */
export function disable2FA() {
    sessionStorage.removeItem(STORAGE_KEYS.TWO_FACTOR);
    return { success: true };
}

/**
 * Simulate social login
 */
export function socialLogin(provider) {
    return new Promise((resolve) => {
        // Simulate OAuth delay
        setTimeout(() => {
            const mockUsers = {
                google: {
                    id: 'g-' + Date.now(),
                    name: 'Google User',
                    email: 'user@gmail.com',
                    avatar: 'https://lh3.googleusercontent.com/a/default-user',
                    provider: 'google',
                },
                linkedin: {
                    id: 'li-' + Date.now(),
                    name: 'LinkedIn Professional',
                    email: 'professional@linkedin.com',
                    avatar: null,
                    provider: 'linkedin',
                },
                github: {
                    id: 'gh-' + Date.now(),
                    name: 'GitHub Developer',
                    email: 'developer@github.com',
                    avatar: 'https://github.githubassets.com/images/gravatars/gravatar-user-420.png',
                    provider: 'github',
                },
            };

            const user = mockUsers[provider];
            if (user) {
                resolve({ success: true, user: { ...user, role: USER_ROLES.JOBSEEKER } });
            } else {
                resolve({ success: false, message: 'Unknown provider' });
            }
        }, 1500);
    });
}

/**
 * Create enhanced user object with all management fields
 */
export function createEnhancedUser(basicUser) {
    return {
        ...basicUser,
        emailVerified: false,
        twoFactorEnabled: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        profile: {
            phone: '',
            location: '',
            bio: '',
            skills: [],
            experience: [],
            education: [],
            linkedin: '',
            portfolio: '',
            company: '',
            position: '',
            companyWebsite: '',
            companySize: '',
            industry: '',
        },
    };
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role) {
    const names = {
        [USER_ROLES.JOBSEEKER]: 'Job Seeker',
        [USER_ROLES.EMPLOYER]: 'Employer',
        [USER_ROLES.ADMIN]: 'Administrator',
    };
    return names[role] || 'User';
}

/**
 * Get role icon
 */
export function getRoleIcon(role) {
    const icons = {
        [USER_ROLES.JOBSEEKER]: '👨‍💼',
        [USER_ROLES.EMPLOYER]: '🏢',
        [USER_ROLES.ADMIN]: '🔐',
    };
    return icons[role] || '👤';
}

export default {
    USER_ROLES,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getRolePermissions,
    calculateProfileCompletion,
    getCompletionStatus,
    sendVerificationEmail,
    verifyEmail,
    isEmailVerified,
    setup2FA,
    enable2FA,
    is2FAEnabled,
    disable2FA,
    socialLogin,
    createEnhancedUser,
    getRoleDisplayName,
    getRoleIcon,
};
