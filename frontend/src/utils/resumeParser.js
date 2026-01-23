/**
 * Resume Parser Utility
 * Extracts contact info, skills, and other data from resume text content.
 * Note: For PDF parsing, a backend solution or PDF.js would be needed for full text extraction.
 * This provides basic pattern matching for demonstration purposes.
 */

// Common skills to detect in resumes
const COMMON_SKILLS = [
    // Programming Languages
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Scala',
    // Frontend
    'React', 'Vue', 'Angular', 'Next.js', 'Svelte', 'HTML', 'CSS', 'SASS', 'Tailwind', 'Bootstrap', 'jQuery',
    // Backend
    'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Rails', 'Laravel', 'FastAPI', 'GraphQL', 'REST API',
    // Databases
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Firebase', 'DynamoDB', 'SQLite',
    // Cloud & DevOps
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Terraform', 'Linux',
    // Tools & Others
    'Git', 'GitHub', 'GitLab', 'Jira', 'Figma', 'Photoshop', 'Illustrator', 'Sketch',
    // Soft Skills
    'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Project Management', 'Agile', 'Scrum',
    // Data Science
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Data Analysis', 'SQL',
];

/**
 * Extract email addresses from text
 */
function extractEmail(text) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = text.match(emailRegex);
    return matches ? matches[0] : null;
}

/**
 * Extract phone numbers from text
 */
function extractPhone(text) {
    // Matches various phone formats: (123) 456-7890, 123-456-7890, +1 123 456 7890, etc.
    const phoneRegex = /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const matches = text.match(phoneRegex);
    return matches ? matches[0].trim() : null;
}

/**
 * Extract skills from text by matching against common skill keywords
 */
function extractSkills(text) {
    const foundSkills = [];

    COMMON_SKILLS.forEach(skill => {
        // Create a regex to match whole words (case insensitive)
        const skillRegex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (skillRegex.test(text)) {
            foundSkills.push(skill);
        }
    });

    return [...new Set(foundSkills)]; // Remove duplicates
}

/**
 * Extract name from text (usually first line or before email)
 */
function extractName(text) {
    const lines = text.split('\n').filter(line => line.trim().length > 0);

    // First non-empty line is often the name
    if (lines.length > 0) {
        const potentialName = lines[0].trim();
        // Simple validation: should be 2-4 words, no numbers, not too long
        if (potentialName.length < 50 &&
            !/\d/.test(potentialName) &&
            potentialName.split(/\s+/).length >= 2 &&
            potentialName.split(/\s+/).length <= 4) {
            return potentialName;
        }
    }
    return null;
}

/**
 * Detect sections in resume (Education, Experience, Skills, etc.)
 */
function detectSections(text) {
    const sections = {};
    const sectionPatterns = [
        { name: 'education', pattern: /\b(education|academic|qualification|degree|university|college)\b/i },
        { name: 'experience', pattern: /\b(experience|employment|work history|professional experience)\b/i },
        { name: 'skills', pattern: /\b(skills|technical skills|competencies|expertise)\b/i },
        { name: 'projects', pattern: /\b(projects|portfolio|personal projects)\b/i },
        { name: 'certifications', pattern: /\b(certifications|certificates|licenses)\b/i },
        { name: 'summary', pattern: /\b(summary|objective|profile|about)\b/i },
    ];

    sectionPatterns.forEach(({ name, pattern }) => {
        sections[name] = pattern.test(text);
    });

    return sections;
}

/**
 * Read file as text (for DOC/DOCX, this is limited in browser)
 * For PDF, you'd need PDF.js or similar library
 */
export async function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            // For PDF and DOC files, we get binary data that needs special parsing
            // For now, we'll return empty for non-text formats
            const result = event.target?.result || '';
            resolve(typeof result === 'string' ? result : '');
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        // Try to read as text
        reader.readAsText(file);
    });
}

/**
 * Main parsing function - attempts to extract all relevant data from resume
 */
export async function parseResume(file) {
    const result = {
        name: null,
        email: null,
        phone: null,
        skills: [],
        sections: {},
        rawText: '',
        parseSuccess: false,
        parseMessage: '',
    };

    try {
        // Attempt to read file content
        const text = await readFileAsText(file);

        if (text && text.trim().length > 0) {
            result.rawText = text;
            result.name = extractName(text);
            result.email = extractEmail(text);
            result.phone = extractPhone(text);
            result.skills = extractSkills(text);
            result.sections = detectSections(text);
            result.parseSuccess = true;
            result.parseMessage = 'Resume parsed successfully';
        } else {
            // For binary formats (PDF, DOC), we can't extract text in browser without libraries
            const ext = file.name.split('.').pop()?.toLowerCase();
            result.parseSuccess = false;
            result.parseMessage = ext === 'pdf'
                ? 'PDF text extraction requires server-side processing'
                : 'Document text extraction requires server-side processing';
        }
    } catch (error) {
        result.parseSuccess = false;
        result.parseMessage = `Parse error: ${error.message}`;
    }

    return result;
}

/**
 * Create a mock parsed result for demo purposes
 */
export function createMockParsedData() {
    return {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Git'],
        sections: {
            education: true,
            experience: true,
            skills: true,
            projects: true,
            certifications: false,
            summary: true,
        },
        rawText: '',
        parseSuccess: true,
        parseMessage: 'Demo parsed data',
    };
}

export default {
    parseResume,
    readFileAsText,
    extractEmail,
    extractPhone,
    extractSkills,
    extractName,
    detectSections,
    createMockParsedData,
};
