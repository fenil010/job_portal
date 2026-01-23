/**
 * Resume Analyzer - AI-Powered Resume Rating & Analysis
 * Provides comprehensive scoring, skill matching, and improvement suggestions
 */

// Skill categories for competency mapping
const SKILL_CATEGORIES = {
    programming: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Scala', 'SQL'],
    frontend: ['React', 'Vue', 'Angular', 'Next.js', 'Svelte', 'HTML', 'CSS', 'SASS', 'Tailwind', 'Bootstrap', 'jQuery'],
    backend: ['Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Rails', 'Laravel', 'FastAPI', 'GraphQL', 'REST API'],
    database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Firebase', 'DynamoDB', 'SQLite'],
    cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Terraform', 'Linux'],
    tools: ['Git', 'GitHub', 'GitLab', 'Jira', 'Figma', 'Photoshop', 'Illustrator', 'Sketch'],
    softSkills: ['Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Project Management', 'Agile', 'Scrum'],
    dataScience: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Data Analysis'],
    design: ['UI/UX', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems', 'Accessibility'],
};

// Experience level mappings
const EXPERIENCE_LEVELS = {
    'Entry Level': { minYears: 0, maxYears: 2, weight: 0.6 },
    'Junior': { minYears: 1, maxYears: 3, weight: 0.7 },
    'Mid Level': { minYears: 3, maxYears: 5, weight: 0.85 },
    'Senior': { minYears: 5, maxYears: 10, weight: 1.0 },
    'Lead': { minYears: 7, maxYears: 15, weight: 1.0 },
    'Principal': { minYears: 10, maxYears: 20, weight: 1.0 },
};

// Education keywords for verification
const EDUCATION_KEYWORDS = {
    degrees: ['Bachelor', 'Master', 'PhD', 'B.S.', 'M.S.', 'B.A.', 'M.A.', 'MBA', 'Associate', 'Diploma'],
    fields: ['Computer Science', 'Software Engineering', 'Information Technology', 'Data Science', 'Mathematics', 'Engineering', 'Design', 'Business'],
    institutions: ['University', 'College', 'Institute', 'School', 'Academy'],
};

// ATS-friendly section keywords
const ATS_SECTIONS = ['Experience', 'Education', 'Skills', 'Summary', 'Objective', 'Projects', 'Certifications', 'Contact'];

/**
 * Calculate skill match score between resume and job requirements
 */
export function calculateSkillMatch(resumeSkills = [], jobSkills = []) {
    if (jobSkills.length === 0) return { score: 100, matched: [], missing: [], extra: [] };

    const normalizedResumeSkills = resumeSkills.map(s => s.toLowerCase());
    const normalizedJobSkills = jobSkills.map(s => s.toLowerCase());

    const matched = jobSkills.filter(skill =>
        normalizedResumeSkills.includes(skill.toLowerCase())
    );
    const missing = jobSkills.filter(skill =>
        !normalizedResumeSkills.includes(skill.toLowerCase())
    );
    const extra = resumeSkills.filter(skill =>
        !normalizedJobSkills.includes(skill.toLowerCase())
    );

    const score = Math.round((matched.length / jobSkills.length) * 100);

    return { score, matched, missing, extra };
}

/**
 * Map skills to competency categories
 */
export function mapSkillCompetencies(skills = []) {
    const competencies = {};
    const normalizedSkills = skills.map(s => s.toLowerCase());

    Object.entries(SKILL_CATEGORIES).forEach(([category, categorySkills]) => {
        const matchedSkills = categorySkills.filter(skill =>
            normalizedSkills.includes(skill.toLowerCase())
        );
        if (matchedSkills.length > 0) {
            competencies[category] = {
                skills: matchedSkills,
                count: matchedSkills.length,
                percentage: Math.round((matchedSkills.length / categorySkills.length) * 100)
            };
        }
    });

    return competencies;
}

/**
 * Assess experience level from resume data
 */
export function assessExperienceLevel(parsedData, requiredLevel = 'Mid Level') {
    // Simulate experience assessment based on skills count and sections
    const skillsCount = parsedData?.skills?.length || 0;
    const hasExperience = parsedData?.sections?.experience || false;
    const hasProjects = parsedData?.sections?.projects || false;

    // Estimate years based on skill breadth (simplified heuristic)
    let estimatedYears = 0;
    if (skillsCount >= 10) estimatedYears = 5;
    else if (skillsCount >= 7) estimatedYears = 3;
    else if (skillsCount >= 4) estimatedYears = 2;
    else estimatedYears = 1;

    if (hasProjects) estimatedYears += 1;

    const requiredConfig = EXPERIENCE_LEVELS[requiredLevel] || EXPERIENCE_LEVELS['Mid Level'];

    let matchLevel = 'below';
    let matchScore = 50;

    if (estimatedYears >= requiredConfig.minYears) {
        if (estimatedYears <= requiredConfig.maxYears) {
            matchLevel = 'match';
            matchScore = 90;
        } else {
            matchLevel = 'above';
            matchScore = 85; // Slightly lower for overqualified
        }
    } else {
        matchScore = Math.round((estimatedYears / requiredConfig.minYears) * 70);
    }

    return {
        estimatedYears,
        requiredLevel,
        matchLevel,
        score: matchScore,
        hasExperienceSection: hasExperience,
        hasProjectsSection: hasProjects,
    };
}

/**
 * Verify education qualifications
 */
export function verifyEducation(parsedData) {
    const hasEducationSection = parsedData?.sections?.education || false;
    const hasCertifications = parsedData?.sections?.certifications || false;

    // In a real system, we'd parse the education text for these
    // For demo, we'll simulate based on section presence
    const result = {
        hasEducationSection,
        hasCertifications,
        score: 0,
        details: [],
    };

    if (hasEducationSection) {
        result.score += 60;
        result.details.push({ type: 'education', text: 'Education section present', positive: true });
    } else {
        result.details.push({ type: 'education', text: 'No education section found', positive: false });
    }

    if (hasCertifications) {
        result.score += 25;
        result.details.push({ type: 'certification', text: 'Certifications listed', positive: true });
    }

    // Bonus for having both
    if (hasEducationSection && hasCertifications) {
        result.score += 15;
    }

    return result;
}

/**
 * Analyze keyword density for role-specific terms
 */
export function analyzeKeywordDensity(parsedData, jobDescription = '') {
    const resumeText = parsedData?.rawText?.toLowerCase() || '';
    const resumeSkills = parsedData?.skills || [];

    // Extract important keywords from job description
    const jobKeywords = extractKeywords(jobDescription);

    let matchedKeywords = 0;
    let totalKeywords = jobKeywords.length;
    const keywordMatches = [];

    jobKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        const count = (resumeText.match(regex) || []).length;
        if (count > 0) {
            matchedKeywords++;
            keywordMatches.push({ keyword, count, found: true });
        } else {
            keywordMatches.push({ keyword, count: 0, found: false });
        }
    });

    // Also check skills mentioned
    const skillKeywords = resumeSkills.length;

    const score = totalKeywords > 0
        ? Math.round((matchedKeywords / totalKeywords) * 100)
        : (skillKeywords > 5 ? 80 : 60);

    return {
        score,
        matchedKeywords,
        totalKeywords,
        keywordMatches: keywordMatches.slice(0, 10), // Top 10
        skillsCount: skillKeywords,
    };
}

/**
 * Extract keywords from job description
 */
function extractKeywords(text) {
    if (!text) return [];

    // Common action words and requirements
    const importantPatterns = [
        /\d+\+?\s*years?/gi,
        /experience with\s+(\w+)/gi,
        /proficiency in\s+(\w+)/gi,
        /knowledge of\s+(\w+)/gi,
        /skilled in\s+(\w+)/gi,
    ];

    const keywords = [];

    // Add skill-related keywords
    Object.values(SKILL_CATEGORIES).flat().forEach(skill => {
        if (text.toLowerCase().includes(skill.toLowerCase())) {
            keywords.push(skill);
        }
    });

    return [...new Set(keywords)].slice(0, 15);
}

/**
 * Calculate ATS compatibility score
 */
export function calculateATSScore(parsedData) {
    let score = 0;
    const checks = [];

    // Check for standard sections
    const sections = parsedData?.sections || {};
    const sectionChecks = [
        { key: 'experience', name: 'Work Experience', weight: 20 },
        { key: 'education', name: 'Education', weight: 15 },
        { key: 'skills', name: 'Skills', weight: 20 },
        { key: 'summary', name: 'Summary/Objective', weight: 10 },
        { key: 'projects', name: 'Projects', weight: 10 },
        { key: 'certifications', name: 'Certifications', weight: 5 },
    ];

    sectionChecks.forEach(({ key, name, weight }) => {
        if (sections[key]) {
            score += weight;
            checks.push({ item: name, passed: true, impact: 'high' });
        } else {
            checks.push({ item: name, passed: false, impact: key === 'experience' || key === 'skills' ? 'high' : 'medium' });
        }
    });

    // Check for contact info
    if (parsedData?.email) {
        score += 10;
        checks.push({ item: 'Email address', passed: true, impact: 'high' });
    } else {
        checks.push({ item: 'Email address', passed: false, impact: 'high' });
    }

    if (parsedData?.phone) {
        score += 5;
        checks.push({ item: 'Phone number', passed: true, impact: 'medium' });
    } else {
        checks.push({ item: 'Phone number', passed: false, impact: 'medium' });
    }

    // Skills count bonus
    const skillsCount = parsedData?.skills?.length || 0;
    if (skillsCount >= 5) {
        score += 5;
        checks.push({ item: 'Sufficient skills listed', passed: true, impact: 'medium' });
    }

    return {
        score: Math.min(100, score),
        checks,
        passedChecks: checks.filter(c => c.passed).length,
        totalChecks: checks.length,
    };
}

/**
 * Generate improvement suggestions
 */
export function generateSuggestions(analysisResults) {
    const suggestions = [];

    // Skill-based suggestions
    if (analysisResults.skillMatch?.missing?.length > 0) {
        const topMissing = analysisResults.skillMatch.missing.slice(0, 3);
        suggestions.push({
            category: 'skills',
            priority: 'high',
            title: 'Add Missing Skills',
            description: `Consider adding: ${topMissing.join(', ')}`,
            impact: '+10-15% match score',
            type: 'quick-fix',
        });
    }

    // Experience suggestions
    if (analysisResults.experience?.matchLevel === 'below') {
        suggestions.push({
            category: 'experience',
            priority: 'medium',
            title: 'Highlight Relevant Experience',
            description: 'Add more detail about relevant projects and achievements',
            impact: '+5-10% match score',
            type: 'content',
        });
    }

    // Education suggestions
    if (!analysisResults.education?.hasEducationSection) {
        suggestions.push({
            category: 'education',
            priority: 'medium',
            title: 'Add Education Section',
            description: 'Include your educational background and qualifications',
            impact: '+8% ATS score',
            type: 'structure',
        });
    }

    // ATS suggestions
    const atsChecks = analysisResults.ats?.checks || [];
    const failedHighImpact = atsChecks.filter(c => !c.passed && c.impact === 'high');
    failedHighImpact.forEach(check => {
        suggestions.push({
            category: 'ats',
            priority: 'high',
            title: `Add ${check.item}`,
            description: `Missing ${check.item.toLowerCase()} section reduces ATS compatibility`,
            impact: 'Critical for ATS',
            type: 'structure',
        });
    });

    // Keyword suggestions
    if (analysisResults.keywords?.score < 60) {
        suggestions.push({
            category: 'keywords',
            priority: 'medium',
            title: 'Optimize for Keywords',
            description: 'Include more role-specific terminology from the job description',
            impact: '+10% relevance score',
            type: 'content',
        });
    }

    // General formatting
    if (suggestions.length < 3) {
        suggestions.push({
            category: 'format',
            priority: 'low',
            title: 'Review Formatting',
            description: 'Ensure consistent formatting and clear section headers',
            impact: 'Improved readability',
            type: 'polish',
        });
    }

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

/**
 * Calculate comparative score (percentile among applicants)
 */
export function calculateComparativeScore(overallScore, applicantCount = 10) {
    // Simulate a normal distribution of applicant scores
    // For demo, we'll calculate percentile based on score ranges
    let percentile;

    if (overallScore >= 90) percentile = 95;
    else if (overallScore >= 80) percentile = 85;
    else if (overallScore >= 70) percentile = 70;
    else if (overallScore >= 60) percentile = 50;
    else if (overallScore >= 50) percentile = 30;
    else percentile = 15;

    // Add some randomness for realism
    percentile += Math.floor(Math.random() * 6) - 3;
    percentile = Math.max(5, Math.min(99, percentile));

    return {
        percentile,
        rank: Math.ceil((1 - percentile / 100) * applicantCount),
        totalApplicants: applicantCount,
        rating: percentile >= 80 ? 'Excellent' : percentile >= 60 ? 'Good' : percentile >= 40 ? 'Average' : 'Below Average',
    };
}

/**
 * Main analysis function - performs complete resume analysis
 */
export function analyzeResume(parsedData, job = null) {
    const jobSkills = job?.skills || [];
    const jobDescription = job?.description || '';
    const experienceLevel = job?.experienceLevel || 'Mid Level';

    // Calculate all scores
    const skillMatch = calculateSkillMatch(parsedData?.skills || [], jobSkills);
    const competencies = mapSkillCompetencies(parsedData?.skills || []);
    const experience = assessExperienceLevel(parsedData, experienceLevel);
    const education = verifyEducation(parsedData);
    const keywords = analyzeKeywordDensity(parsedData, jobDescription);
    const ats = calculateATSScore(parsedData);

    // Calculate overall score (weighted average)
    const weights = {
        skills: 0.30,
        experience: 0.25,
        education: 0.15,
        keywords: 0.15,
        ats: 0.15,
    };

    const overallScore = Math.round(
        skillMatch.score * weights.skills +
        experience.score * weights.experience +
        education.score * weights.education +
        keywords.score * weights.keywords +
        ats.score * weights.ats
    );

    const analysisResults = {
        overallScore,
        skillMatch,
        competencies,
        experience,
        education,
        keywords,
        ats,
        strengths: [],
        weaknesses: [],
    };

    // Identify strengths
    if (skillMatch.score >= 70) analysisResults.strengths.push('Strong skill match');
    if (experience.matchLevel === 'match') analysisResults.strengths.push('Appropriate experience level');
    if (ats.score >= 80) analysisResults.strengths.push('ATS-optimized resume');
    if (education.score >= 75) analysisResults.strengths.push('Strong educational background');

    // Identify weaknesses
    if (skillMatch.score < 50) analysisResults.weaknesses.push('Missing key skills');
    if (experience.matchLevel === 'below') analysisResults.weaknesses.push('Experience level mismatch');
    if (ats.score < 60) analysisResults.weaknesses.push('Low ATS compatibility');

    // Generate suggestions
    analysisResults.suggestions = generateSuggestions(analysisResults);

    // Calculate comparative score
    analysisResults.comparative = calculateComparativeScore(overallScore);

    return analysisResults;
}

/**
 * Quick analysis demo data
 */
export function createDemoAnalysis() {
    return {
        overallScore: 78,
        skillMatch: {
            score: 80,
            matched: ['React', 'TypeScript', 'Node.js'],
            missing: ['GraphQL', 'AWS'],
            extra: ['Python', 'Docker'],
        },
        competencies: {
            frontend: { skills: ['React', 'TypeScript'], count: 2, percentage: 18 },
            backend: { skills: ['Node.js'], count: 1, percentage: 10 },
            programming: { skills: ['JavaScript', 'TypeScript', 'Python'], count: 3, percentage: 21 },
        },
        experience: {
            estimatedYears: 4,
            requiredLevel: 'Senior',
            matchLevel: 'below',
            score: 70,
        },
        education: {
            hasEducationSection: true,
            hasCertifications: false,
            score: 60,
        },
        keywords: {
            score: 75,
            matchedKeywords: 6,
            totalKeywords: 8,
        },
        ats: {
            score: 85,
            passedChecks: 7,
            totalChecks: 9,
        },
        strengths: ['Strong skill match', 'ATS-optimized resume'],
        weaknesses: ['Experience level mismatch'],
        suggestions: [
            {
                category: 'skills',
                priority: 'high',
                title: 'Add Missing Skills',
                description: 'Consider adding: GraphQL, AWS',
                impact: '+10-15% match score',
                type: 'quick-fix',
            },
            {
                category: 'experience',
                priority: 'medium',
                title: 'Highlight Relevant Experience',
                description: 'Add more detail about relevant projects and achievements',
                impact: '+5-10% match score',
                type: 'content',
            },
        ],
        comparative: {
            percentile: 72,
            rank: 3,
            totalApplicants: 10,
            rating: 'Good',
        },
    };
}

export default {
    analyzeResume,
    calculateSkillMatch,
    mapSkillCompetencies,
    assessExperienceLevel,
    verifyEducation,
    analyzeKeywordDensity,
    calculateATSScore,
    generateSuggestions,
    calculateComparativeScore,
    createDemoAnalysis,
};
