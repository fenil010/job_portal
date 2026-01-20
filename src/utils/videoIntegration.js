/**
 * Video Integration Utility
 * Handles Zoom, Google Meet, and other video platform integrations
 */

// Supported platforms
export const PLATFORMS = {
    ZOOM: 'zoom',
    GOOGLE_MEET: 'google_meet',
    TEAMS: 'teams',
    CUSTOM: 'custom',
};

// Platform configurations
const PLATFORM_CONFIG = {
    [PLATFORMS.ZOOM]: {
        name: 'Zoom',
        icon: '📹',
        baseUrl: 'https://zoom.us/j/',
        color: '#2D8CFF',
    },
    [PLATFORMS.GOOGLE_MEET]: {
        name: 'Google Meet',
        icon: '🎥',
        baseUrl: 'https://meet.google.com/',
        color: '#00897B',
    },
    [PLATFORMS.TEAMS]: {
        name: 'Microsoft Teams',
        icon: '💼',
        baseUrl: 'https://teams.microsoft.com/l/meetup-join/',
        color: '#6264A7',
    },
    [PLATFORMS.CUSTOM]: {
        name: 'Custom',
        icon: '🔗',
        baseUrl: '',
        color: '#789A99',
    },
};

/**
 * Get platform configuration
 */
export function getPlatformConfig(platform) {
    return PLATFORM_CONFIG[platform] || PLATFORM_CONFIG[PLATFORMS.CUSTOM];
}

/**
 * Generate a random meeting ID
 */
function generateMeetingId(platform) {
    if (platform === PLATFORMS.ZOOM) {
        // Zoom format: XXX XXXX XXXX
        const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
        return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7, 11)}`;
    }
    if (platform === PLATFORMS.GOOGLE_MEET) {
        // Google Meet format: xxx-xxxx-xxx
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const generate = (len) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        return `${generate(3)}-${generate(4)}-${generate(3)}`;
    }
    // Generic ID
    return Math.random().toString(36).substring(2, 12);
}

/**
 * Generate a random passcode
 */
function generatePasscode() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

/**
 * Generate a meeting link (simulated)
 */
export async function generateMeetingLink(platform, options = {}) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const config = getPlatformConfig(platform);
    const meetingId = generateMeetingId(platform);
    const passcode = generatePasscode();

    let url;
    if (platform === PLATFORMS.ZOOM) {
        url = `${config.baseUrl}${meetingId.replace(/\s/g, '')}`;
    } else if (platform === PLATFORMS.GOOGLE_MEET) {
        url = `${config.baseUrl}${meetingId}`;
    } else if (platform === PLATFORMS.TEAMS) {
        url = `${config.baseUrl}${Math.random().toString(36).substring(2)}`;
    } else {
        url = options.customUrl || '';
    }

    return {
        platform,
        url,
        meetingId,
        passcode,
        createdAt: new Date().toISOString(),
    };
}

/**
 * Format meeting details for display
 */
export function formatMeetingDetails(meeting) {
    const config = getPlatformConfig(meeting?.platform);
    return {
        ...meeting,
        platformName: config.name,
        platformIcon: config.icon,
        platformColor: config.color,
    };
}

/**
 * Create a calendar event object
 */
export function createCalendarEvent(interview) {
    const startDate = new Date(`${interview.date} ${interview.time}`);
    const endDate = new Date(startDate.getTime() + (interview.duration || 60) * 60000);

    return {
        title: `Interview: ${interview.candidateName || 'Candidate'}`,
        description: `Video interview for ${interview.position || 'position'}\n\nMeeting Link: ${interview.meetingLink || 'TBD'}\nMeeting ID: ${interview.meetingId || 'N/A'}\nPasscode: ${interview.passcode || 'N/A'}`,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        location: interview.meetingLink || '',
    };
}

/**
 * Generate Google Calendar URL
 */
export function getGoogleCalendarUrl(event) {
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        details: event.description,
        dates: `${event.start.replace(/[-:]/g, '').split('.')[0]}Z/${event.end.replace(/[-:]/g, '').split('.')[0]}Z`,
        location: event.location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate Outlook Calendar URL
 */
export function getOutlookCalendarUrl(event) {
    const params = new URLSearchParams({
        subject: event.title,
        body: event.description,
        startdt: event.start,
        enddt: event.end,
        location: event.location,
        path: '/calendar/action/compose',
        rru: 'addevent',
    });
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Get join meeting URL
 */
export function getJoinUrl(meeting) {
    if (meeting?.meetingLink) {
        return meeting.meetingLink;
    }
    const config = getPlatformConfig(meeting?.platform);
    if (meeting?.meetingId && config.baseUrl) {
        return `${config.baseUrl}${meeting.meetingId.replace(/\s/g, '')}`;
    }
    return null;
}

/**
 * Check if browser supports required features for video
 */
export function checkVideoSupport() {
    return {
        mediaDevices: !!navigator.mediaDevices,
        getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
        webRTC: !!window.RTCPeerConnection,
    };
}

/**
 * Request camera/microphone permissions
 */
export async function requestMediaPermissions() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        stream.getTracks().forEach(track => track.stop());
        return { granted: true, error: null };
    } catch (error) {
        return { granted: false, error: error.message };
    }
}

export default {
    PLATFORMS,
    getPlatformConfig,
    generateMeetingLink,
    formatMeetingDetails,
    createCalendarEvent,
    getGoogleCalendarUrl,
    getOutlookCalendarUrl,
    getJoinUrl,
    checkVideoSupport,
    requestMediaPermissions,
};
