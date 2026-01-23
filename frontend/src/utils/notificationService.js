/**
 * Notification Service Utility
 * Manages email, SMS, and in-app notifications for the job portal
 */

// Notification types
export const NOTIFICATION_TYPES = {
    MESSAGE: 'message',
    EMAIL: 'email',
    SMS: 'sms',
    INTERVIEW: 'interview',
    APPLICATION: 'application',
    FEEDBACK: 'feedback',
    OFFER: 'offer',
};

// Notification channels
export const CHANNELS = {
    IN_APP: 'in-app',
    EMAIL: 'email',
    SMS: 'sms',
};

// Default preferences
const DEFAULT_PREFERENCES = {
    emailEnabled: true,
    emailApplicationUpdates: true,
    emailNewOpportunities: true,
    emailInterviewReminders: true,
    emailFrequency: 'immediate',
    smsEnabled: false,
    smsInterviewReminders: true,
    smsCriticalUpdates: true,
    smsOfferNotifications: true,
    inAppEnabled: true,
    inAppSound: true,
    inAppDesktopNotifications: false,
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
};

// Storage keys
const STORAGE_KEYS = {
    PREFERENCES: 'jp_notification_preferences',
    NOTIFICATIONS: 'jp_notifications',
    PHONE: 'jp_phone_settings',
};

/**
 * Get notification preferences from storage
 */
export function getPreferences() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
        return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    } catch {
        return DEFAULT_PREFERENCES;
    }
}

/**
 * Save notification preferences to storage
 */
export function savePreferences(preferences) {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
    return preferences;
}

/**
 * Get all notifications from storage
 */
export function getNotifications() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

/**
 * Add a new notification
 */
export function addNotification(notification) {
    const notifications = getNotifications();
    const newNotification = {
        id: Date.now(),
        isRead: false,
        time: 'Just now',
        channel: CHANNELS.IN_APP,
        ...notification,
        createdAt: new Date().toISOString(),
    };
    notifications.unshift(newNotification);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    return newNotification;
}

/**
 * Mark notification as read
 */
export function markAsRead(notificationId) {
    const notifications = getNotifications();
    const updated = notifications.map(n =>
        n.id === notificationId ? { ...n, isRead: true } : n
    );
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
}

/**
 * Mark all notifications as read
 */
export function markAllAsRead() {
    const notifications = getNotifications();
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
}

/**
 * Delete a notification
 */
export function deleteNotification(notificationId) {
    const notifications = getNotifications();
    const updated = notifications.filter(n => n.id !== notificationId);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
}

/**
 * Clear all notifications
 */
export function clearAllNotifications() {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]));
    return [];
}

/**
 * Check if currently in quiet hours
 */
export function isQuietHours(preferences) {
    if (!preferences?.quietHoursEnabled) return false;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const [startHour, startMin] = preferences.quietHoursStart.split(':').map(Number);
    const [endHour, endMin] = preferences.quietHoursEnd.split(':').map(Number);

    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    if (startTime < endTime) {
        return currentTime >= startTime && currentTime < endTime;
    } else {
        return currentTime >= startTime || currentTime < endTime;
    }
}

/**
 * Substitute template variables
 */
export function substituteVariables(template, variables = {}) {
    let result = template;
    Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(regex, value);
    });
    return result;
}

/**
 * Trigger application update notification
 */
export function notifyApplicationUpdate(application, status) {
    const preferences = getPreferences();

    if (preferences.emailEnabled && preferences.emailApplicationUpdates) {
        // Simulate email sending
        console.log('[Email] Application update:', application.jobTitle, status);
    }

    if (preferences.inAppEnabled) {
        addNotification({
            type: NOTIFICATION_TYPES.APPLICATION,
            title: 'Application Update',
            message: `Your application for ${application.jobTitle} has been updated to: ${status}`,
            channel: CHANNELS.IN_APP,
        });
    }
}

/**
 * Trigger interview reminder notification
 */
export function notifyInterviewReminder(interview) {
    const preferences = getPreferences();

    if (isQuietHours(preferences)) return;

    if (preferences.emailEnabled && preferences.emailInterviewReminders) {
        console.log('[Email] Interview reminder:', interview);
    }

    if (preferences.smsEnabled && preferences.smsInterviewReminders) {
        console.log('[SMS] Interview reminder:', interview);
    }

    if (preferences.inAppEnabled) {
        addNotification({
            type: NOTIFICATION_TYPES.INTERVIEW,
            title: 'Interview Reminder',
            message: `Your interview for ${interview.position} is scheduled for ${interview.date} at ${interview.time}`,
            channel: CHANNELS.IN_APP,
        });
    }
}

/**
 * Trigger new message notification
 */
export function notifyNewMessage(message) {
    const preferences = getPreferences();

    if (isQuietHours(preferences)) return;

    if (preferences.inAppEnabled) {
        addNotification({
            type: NOTIFICATION_TYPES.MESSAGE,
            title: `New message from ${message.senderName}`,
            message: message.preview || message.content?.slice(0, 100),
            channel: CHANNELS.IN_APP,
        });
    }
}

/**
 * Get phone settings from storage
 */
export function getPhoneSettings() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PHONE);
        return stored ? JSON.parse(stored) : { phone: '', countryCode: '+1', isVerified: false };
    } catch {
        return { phone: '', countryCode: '+1', isVerified: false };
    }
}

/**
 * Save phone settings
 */
export function savePhoneSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.PHONE, JSON.stringify(settings));
    return settings;
}

export default {
    getPreferences,
    savePreferences,
    getNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    substituteVariables,
    notifyApplicationUpdate,
    notifyInterviewReminder,
    notifyNewMessage,
    getPhoneSettings,
    savePhoneSettings,
    NOTIFICATION_TYPES,
    CHANNELS,
};
