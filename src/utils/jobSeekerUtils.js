/**
 * Job Seeker Utilities
 * Handles job recommendations, skill gap analysis, and job alerts
 */

/**
 * Calculate match score between user profile/resume and job
 */
export function calculateJobMatchScore(userProfile, job) {
    const weights = {
        skills: 0.40,
        experience: 0.25,
        location: 0.15,
        salary: 0.10,
        jobType: 0.10,
    };

    let totalScore = 0;

    // Skills matching
    const userSkills = (userProfile.skills || []).map(s => s.toLowerCase());
    const jobSkills = (job.skills || []).map(s => s.toLowerCase());

    if (jobSkills.length > 0) {
        const matchedSkills = userSkills.filter(s => jobSkills.includes(s));
        totalScore += (matchedSkills.length / jobSkills.length) * weights.skills * 100;
    } else {
        totalScore += weights.skills * 50; // Neutral if no skills specified
    }

    // Experience level matching
    const expLevels = ['entry', 'junior', 'mid', 'senior', 'lead', 'executive'];
    const userExpIndex = expLevels.findIndex(e =>
        userProfile.experienceLevel?.toLowerCase().includes(e)
    );
    const jobExpIndex = expLevels.findIndex(e =>
        job.experienceLevel?.toLowerCase().includes(e)
    );

    if (userExpIndex >= 0 && jobExpIndex >= 0) {
        const expDiff = Math.abs(userExpIndex - jobExpIndex);
        totalScore += Math.max(0, 1 - expDiff * 0.25) * weights.experience * 100;
    } else {
        totalScore += weights.experience * 50;
    }

    // Location matching
    const userLocation = userProfile.location?.toLowerCase() || '';
    const jobLocation = job.location?.toLowerCase() || '';
    if (jobLocation.includes('remote')) {
        totalScore += weights.location * 100;
    } else if (userLocation && jobLocation.includes(userLocation.split(',')[0])) {
        totalScore += weights.location * 100;
    } else {
        totalScore += weights.location * 30;
    }

    // Salary matching
    if (userProfile.expectedSalary && job.salary) {
        const userSalary = parseInt(userProfile.expectedSalary.replace(/\D/g, ''));
        const jobSalaryMin = parseInt(job.salary.replace(/\D/g, ''));
        if (jobSalaryMin >= userSalary * 0.9) {
            totalScore += weights.salary * 100;
        } else if (jobSalaryMin >= userSalary * 0.75) {
            totalScore += weights.salary * 70;
        } else {
            totalScore += weights.salary * 40;
        }
    } else {
        totalScore += weights.salary * 50;
    }

    // Job type matching
    if (userProfile.preferredJobType && job.type) {
        if (userProfile.preferredJobType.toLowerCase() === job.type.toLowerCase()) {
            totalScore += weights.jobType * 100;
        } else {
            totalScore += weights.jobType * 50;
        }
    } else {
        totalScore += weights.jobType * 50;
    }

    return {
        score: Math.round(totalScore),
        matchedSkills: userSkills.filter(s => jobSkills.includes(s)),
        missingSkills: jobSkills.filter(s => !userSkills.includes(s)),
    };
}

/**
 * Get job recommendations for user
 */
export function getJobRecommendations(userProfile, jobs, limit = 5) {
    const recommendations = jobs.map(job => {
        const match = calculateJobMatchScore(userProfile, job);
        return {
            ...job,
            matchScore: match.score,
            matchedSkills: match.matchedSkills,
            missingSkills: match.missingSkills,
            reason: generateRecommendationReason(match, job),
        };
    });

    return recommendations
        .filter(r => r.matchScore >= 40)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, limit);
}

function generateRecommendationReason(match, job) {
    if (match.score >= 80) {
        return `Excellent match! ${match.matchedSkills.length} of your skills align with this role.`;
    } else if (match.score >= 60) {
        return `Good fit based on your ${match.matchedSkills.slice(0, 2).join(' and ')} experience.`;
    } else {
        return `This role could help you grow into ${match.missingSkills.slice(0, 2).join(' and ')}.`;
    }
}

/**
 * Analyze skill gaps between user and target jobs
 */
export function analyzeSkillGaps(userProfile, targetJobs) {
    const userSkills = new Set((userProfile.skills || []).map(s => s.toLowerCase()));
    const skillDemand = {};
    const missingSkills = {};

    targetJobs.forEach(job => {
        (job.skills || []).forEach(skill => {
            const lowerSkill = skill.toLowerCase();
            skillDemand[lowerSkill] = (skillDemand[lowerSkill] || 0) + 1;

            if (!userSkills.has(lowerSkill)) {
                missingSkills[lowerSkill] = (missingSkills[lowerSkill] || 0) + 1;
            }
        });
    });

    // Sort by demand frequency
    const sortedMissing = Object.entries(missingSkills)
        .sort((a, b) => b[1] - a[1])
        .map(([skill, count]) => ({
            skill: skill.charAt(0).toUpperCase() + skill.slice(1),
            demandCount: count,
            demandPercentage: Math.round((count / targetJobs.length) * 100),
            priority: count >= targetJobs.length * 0.5 ? 'high' : count >= targetJobs.length * 0.25 ? 'medium' : 'low',
        }));

    return {
        userSkillCount: userSkills.size,
        totalDemandedSkills: Object.keys(skillDemand).length,
        missingSkills: sortedMissing,
        topMissingSkills: sortedMissing.slice(0, 5),
        skillCoverage: Math.round((userSkills.size / Object.keys(skillDemand).length) * 100) || 0,
    };
}

/**
 * Get learning recommendations for skill gaps
 */
export function getLearningRecommendations(missingSkills) {
    const learningResources = {
        react: { type: 'course', platform: 'Udemy', title: 'React - The Complete Guide', url: '#', duration: '40 hours' },
        typescript: { type: 'course', platform: 'Pluralsight', title: 'TypeScript Fundamentals', url: '#', duration: '8 hours' },
        nodejs: { type: 'course', platform: 'Coursera', title: 'Node.js Backend Development', url: '#', duration: '20 hours' },
        python: { type: 'course', platform: 'Codecademy', title: 'Learn Python 3', url: '#', duration: '25 hours' },
        aws: { type: 'certification', platform: 'AWS', title: 'AWS Cloud Practitioner', url: '#', duration: '30 hours' },
        docker: { type: 'tutorial', platform: 'Docker Docs', title: 'Getting Started with Docker', url: '#', duration: '5 hours' },
        kubernetes: { type: 'course', platform: 'LinuxFoundation', title: 'Kubernetes Basics', url: '#', duration: '15 hours' },
        sql: { type: 'course', platform: 'Khan Academy', title: 'Intro to SQL', url: '#', duration: '10 hours' },
        mongodb: { type: 'course', platform: 'MongoDB University', title: 'MongoDB Basics', url: '#', duration: '8 hours' },
        graphql: { type: 'tutorial', platform: 'GraphQL.org', title: 'Learn GraphQL', url: '#', duration: '6 hours' },
        figma: { type: 'course', platform: 'Skillshare', title: 'UI Design with Figma', url: '#', duration: '12 hours' },
        git: { type: 'tutorial', platform: 'GitHub', title: 'Git & GitHub Fundamentals', url: '#', duration: '4 hours' },
    };

    return missingSkills.slice(0, 5).map(item => {
        const key = item.skill.toLowerCase();
        const resource = learningResources[key] || {
            type: 'search',
            platform: 'Google',
            title: `Learn ${item.skill}`,
            url: `https://www.google.com/search?q=learn+${encodeURIComponent(item.skill)}`,
            duration: 'Varies',
        };

        return {
            skill: item.skill,
            priority: item.priority,
            ...resource,
        };
    });
}

// Interview Prep Resources
export const INTERVIEW_RESOURCES = {
    behavioral: [
        { title: 'STAR Method Guide', description: 'Structure answers effectively', type: 'guide' },
        { title: 'Top 50 Behavioral Questions', description: 'Common questions with sample answers', type: 'practice' },
        { title: 'Body Language Tips', description: 'Non-verbal communication tips', type: 'video' },
    ],
    technical: [
        { title: 'Data Structures & Algorithms', description: 'Essential CS concepts', type: 'course' },
        { title: 'System Design Primer', description: 'Large-scale architecture', type: 'guide' },
        { title: 'LeetCode Practice', description: 'Coding challenges', type: 'practice' },
    ],
    general: [
        { title: 'Company Research Template', description: 'How to research companies', type: 'template' },
        { title: 'Salary Negotiation Script', description: 'Negotiate confidently', type: 'guide' },
        { title: 'Thank You Email Templates', description: 'Post-interview follow-up', type: 'template' },
    ],
};

// Salary Insights by role and location
export const SALARY_DATA = {
    'frontend developer': { entry: 50000, mid: 85000, senior: 130000, lead: 160000 },
    'backend developer': { entry: 55000, mid: 90000, senior: 140000, lead: 170000 },
    'full stack developer': { entry: 55000, mid: 95000, senior: 145000, lead: 175000 },
    'product manager': { entry: 70000, mid: 110000, senior: 150000, lead: 180000 },
    'data scientist': { entry: 65000, mid: 100000, senior: 150000, lead: 180000 },
    'ui/ux designer': { entry: 45000, mid: 75000, senior: 110000, lead: 140000 },
    'devops engineer': { entry: 60000, mid: 100000, senior: 150000, lead: 180000 },
};

/**
 * Get salary insights for a role
 */
export function getSalaryInsights(role, experienceLevel = 'mid') {
    const roleKey = role.toLowerCase();
    let data = SALARY_DATA[roleKey];

    if (!data) {
        // Find closest match
        const keys = Object.keys(SALARY_DATA);
        const match = keys.find(k => roleKey.includes(k.split(' ')[0]));
        data = match ? SALARY_DATA[match] : SALARY_DATA['full stack developer'];
    }

    const expLevel = experienceLevel.toLowerCase().includes('senior') ? 'senior'
        : experienceLevel.toLowerCase().includes('lead') ? 'lead'
            : experienceLevel.toLowerCase().includes('entry') || experienceLevel.toLowerCase().includes('junior') ? 'entry'
                : 'mid';

    const baseSalary = data[expLevel];

    return {
        role: role,
        experienceLevel: expLevel,
        baseSalary,
        range: {
            min: Math.round(baseSalary * 0.85),
            max: Math.round(baseSalary * 1.15),
        },
        benefits: ['Health Insurance', '401k Match', 'Stock Options', 'Remote Work'],
        negotiationTips: [
            'Research market rates before negotiating',
            'Consider total compensation, not just salary',
            'Highlight unique skills and achievements',
            'Be prepared to walk away if undervalued',
            'Ask about performance bonuses and equity',
        ],
    };
}

// Job Alerts Storage
const ALERTS_KEY = 'jp_job_alerts';

/**
 * Get user's job alerts
 */
export function getJobAlerts(userId) {
    const data = JSON.parse(localStorage.getItem(ALERTS_KEY) || '{}');
    return data[userId] || [];
}

/**
 * Create a new job alert
 */
export function createJobAlert(userId, alert) {
    const data = JSON.parse(localStorage.getItem(ALERTS_KEY) || '{}');
    const userAlerts = data[userId] || [];

    const newAlert = {
        id: Date.now(),
        ...alert,
        createdAt: new Date().toISOString(),
        active: true,
    };

    userAlerts.push(newAlert);
    data[userId] = userAlerts;
    localStorage.setItem(ALERTS_KEY, JSON.stringify(data));

    return newAlert;
}

/**
 * Delete a job alert
 */
export function deleteJobAlert(userId, alertId) {
    const data = JSON.parse(localStorage.getItem(ALERTS_KEY) || '{}');
    const userAlerts = data[userId] || [];

    data[userId] = userAlerts.filter(a => a.id !== alertId);
    localStorage.setItem(ALERTS_KEY, JSON.stringify(data));

    return { success: true };
}

/**
 * Toggle job alert active status
 */
export function toggleJobAlert(userId, alertId) {
    const data = JSON.parse(localStorage.getItem(ALERTS_KEY) || '{}');
    const userAlerts = data[userId] || [];

    const alert = userAlerts.find(a => a.id === alertId);
    if (alert) {
        alert.active = !alert.active;
        data[userId] = userAlerts;
        localStorage.setItem(ALERTS_KEY, JSON.stringify(data));
    }

    return { success: true, active: alert?.active };
}

/**
 * Check if any jobs match user's alerts
 */
export function checkJobsAgainstAlerts(userId, jobs) {
    const alerts = getJobAlerts(userId).filter(a => a.active);
    const matches = [];

    alerts.forEach(alert => {
        jobs.forEach(job => {
            let isMatch = true;

            if (alert.keywords && alert.keywords.length > 0) {
                const jobText = `${job.title} ${job.description} ${job.company}`.toLowerCase();
                isMatch = alert.keywords.some(k => jobText.includes(k.toLowerCase()));
            }

            if (isMatch && alert.location) {
                isMatch = job.location?.toLowerCase().includes(alert.location.toLowerCase());
            }

            if (isMatch && alert.jobType) {
                isMatch = job.type?.toLowerCase() === alert.jobType.toLowerCase();
            }

            if (isMatch && alert.minSalary) {
                const jobSalary = parseInt(job.salary?.replace(/\D/g, '') || '0');
                isMatch = jobSalary >= alert.minSalary;
            }

            if (isMatch) {
                matches.push({ alert, job });
            }
        });
    });

    return matches;
}

export default {
    calculateJobMatchScore,
    getJobRecommendations,
    analyzeSkillGaps,
    getLearningRecommendations,
    getSalaryInsights,
    getJobAlerts,
    createJobAlert,
    deleteJobAlert,
    toggleJobAlert,
    checkJobsAgainstAlerts,
    INTERVIEW_RESOURCES,
    SALARY_DATA,
};
