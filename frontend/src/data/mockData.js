// Mock Jobs Data
export const mockJobs = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        companyLogo: null,
        location: 'San Francisco, CA',
        jobType: 'Full-time',
        salaryMin: 150000,
        salaryMax: 200000,
        postedAt: '2 days ago',
        skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
        isRemote: true,
        experienceLevel: 'Senior',
        description: `We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using modern technologies.

**Responsibilities:**
- Design and implement user interfaces using React and TypeScript
- Collaborate with backend developers and designers
- Write clean, maintainable, and well-documented code
- Participate in code reviews and mentor junior developers
- Optimize applications for maximum speed and scalability

**Requirements:**
- 5+ years of experience in frontend development
- Strong proficiency in React and TypeScript
- Experience with state management libraries (Redux, MobX, Zustand)
- Familiarity with modern build tools and CI/CD pipelines
- Excellent problem-solving and communication skills`,
        benefits: ['Health Insurance', '401k Matching', 'Remote Work', 'Unlimited PTO', 'Learning Budget'],
        companyInfo: {
            size: '500-1000 employees',
            industry: 'Technology',
            founded: '2015',
            website: 'https://techcorp.example.com',
        },
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'DesignHub Studio',
        companyLogo: null,
        location: 'New York, NY',
        jobType: 'Full-time',
        salaryMin: 120000,
        salaryMax: 160000,
        postedAt: '4 days ago',
        skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
        isRemote: false,
        experienceLevel: 'Mid Level',
        description: `Join our creative team as a Product Designer. You'll work on exciting projects for top-tier clients and shape the future of digital products.`,
        benefits: ['Health Insurance', 'Gym Membership', 'Creative Fridays', 'Annual Bonus'],
        companyInfo: {
            size: '50-100 employees',
            industry: 'Design Agency',
            founded: '2018',
            website: 'https://designhub.example.com',
        },
    },
    {
        id: 3,
        title: 'Backend Engineer',
        company: 'DataFlow Systems',
        companyLogo: null,
        location: 'Austin, TX',
        jobType: 'Full-time',
        salaryMin: 140000,
        salaryMax: 180000,
        postedAt: '1 week ago',
        skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
        isRemote: true,
        experienceLevel: 'Senior',
        description: `We're seeking a Backend Engineer to build scalable APIs and data processing pipelines.`,
        benefits: ['Remote Work', 'Stock Options', 'Health Insurance', 'Flexible Hours'],
        companyInfo: {
            size: '100-200 employees',
            industry: 'Data Analytics',
            founded: '2019',
            website: 'https://dataflow.example.com',
        },
    },
    {
        id: 4,
        title: 'DevOps Engineer',
        company: 'CloudScale',
        companyLogo: null,
        location: 'Seattle, WA',
        jobType: 'Contract',
        salaryMin: 100000,
        salaryMax: 140000,
        postedAt: '3 days ago',
        skills: ['AWS', 'Terraform', 'Jenkins', 'Linux', 'Docker'],
        isRemote: true,
        experienceLevel: 'Mid Level',
        description: `Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines.`,
        benefits: ['Flexible Contract', 'Remote Work', 'Competitive Rate'],
        companyInfo: {
            size: '20-50 employees',
            industry: 'Cloud Services',
            founded: '2020',
            website: 'https://cloudscale.example.com',
        },
    },
    {
        id: 5,
        title: 'Junior React Developer',
        company: 'StartupXYZ',
        companyLogo: null,
        location: 'Remote',
        jobType: 'Full-time',
        salaryMin: 70000,
        salaryMax: 90000,
        postedAt: '5 days ago',
        skills: ['React', 'JavaScript', 'CSS', 'Git'],
        isRemote: true,
        experienceLevel: 'Entry Level',
        description: `Great opportunity for junior developers to grow their skills in a fast-paced startup environment.`,
        benefits: ['Remote Work', 'Learning Budget', 'Mentorship Program', 'Stock Options'],
        companyInfo: {
            size: '10-20 employees',
            industry: 'SaaS',
            founded: '2022',
            website: 'https://startupxyz.example.com',
        },
    },
    {
        id: 6,
        title: 'Data Scientist',
        company: 'AI Innovations',
        companyLogo: null,
        location: 'Boston, MA',
        jobType: 'Full-time',
        salaryMin: 130000,
        salaryMax: 170000,
        postedAt: '1 day ago',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'],
        isRemote: false,
        experienceLevel: 'Mid Level',
        description: `Join our AI team to build cutting-edge machine learning models and drive data-driven decisions.`,
        benefits: ['Health Insurance', 'Conference Budget', 'On-site Cafeteria', 'Research Time'],
        companyInfo: {
            size: '200-500 employees',
            industry: 'Artificial Intelligence',
            founded: '2017',
            website: 'https://aiinnovations.example.com',
        },
    },
];

// Mock Applications Data
export const mockApplications = [
    {
        id: 1,
        jobId: 1,
        jobTitle: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        appliedAt: 'Jan 15, 2026',
        status: 'In Review',
        statusColor: 'warning',
    },
    {
        id: 2,
        jobId: 2,
        jobTitle: 'Product Designer',
        company: 'DesignHub Studio',
        appliedAt: 'Jan 10, 2026',
        status: 'Interview Scheduled',
        statusColor: 'info',
    },
    {
        id: 3,
        jobId: 3,
        jobTitle: 'Backend Engineer',
        company: 'DataFlow Systems',
        appliedAt: 'Jan 5, 2026',
        status: 'Offer Received',
        statusColor: 'success',
    },
    {
        id: 4,
        jobId: 4,
        jobTitle: 'DevOps Engineer',
        company: 'CloudScale',
        appliedAt: 'Dec 28, 2025',
        status: 'Rejected',
        statusColor: 'danger',
    },
];

// Mock Notifications
export const mockNotifications = [
    {
        id: 1,
        title: 'Interview scheduled',
        message: 'Your interview with DesignHub Studio is scheduled for Jan 20, 2PM EST',
        time: '2 hours ago',
        isRead: false,
        type: 'interview',
    },
    {
        id: 2,
        title: 'Application viewed',
        message: 'TechCorp Inc. viewed your application for Senior Frontend Developer',
        time: '5 hours ago',
        isRead: false,
        type: 'view',
    },
    {
        id: 3,
        title: 'New job match',
        message: '5 new jobs match your profile and preferences',
        time: '1 day ago',
        isRead: true,
        type: 'match',
    },
    {
        id: 4,
        title: 'Profile update reminder',
        message: 'Your profile is 80% complete. Add your skills to get more matches.',
        time: '2 days ago',
        isRead: true,
        type: 'reminder',
    },
];

// Mock Employer Stats
export const mockEmployerStats = {
    activeJobs: 12,
    totalApplications: 247,
    interviewsScheduled: 18,
    hiredThisMonth: 3,
};

// Mock Employer Job Posts
export const mockEmployerJobs = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        status: 'Active',
        applicants: 42,
        views: 589,
        postedAt: 'Jan 10, 2026',
        expiresAt: 'Feb 10, 2026',
    },
    {
        id: 2,
        title: 'Product Manager',
        status: 'Active',
        applicants: 28,
        views: 412,
        postedAt: 'Jan 8, 2026',
        expiresAt: 'Feb 8, 2026',
    },
    {
        id: 3,
        title: 'UI/UX Designer',
        status: 'Paused',
        applicants: 15,
        views: 234,
        postedAt: 'Jan 5, 2026',
        expiresAt: 'Feb 5, 2026',
    },
    {
        id: 4,
        title: 'DevOps Engineer',
        status: 'Closed',
        applicants: 35,
        views: 521,
        postedAt: 'Dec 20, 2025',
        expiresAt: 'Jan 20, 2026',
    },
];

// Mock Admin Stats
export const mockAdminStats = {
    totalUsers: 15420,
    totalEmployers: 892,
    totalJobs: 4521,
    pendingApprovals: 23,
};

// Mock Users for Admin
export const mockUsers = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        role: 'Job Seeker',
        status: 'Active',
        joinedAt: 'Jan 10, 2026',
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        role: 'Employer',
        status: 'Active',
        joinedAt: 'Jan 8, 2026',
    },
    {
        id: 3,
        name: 'Mike Wilson',
        email: 'mike.w@email.com',
        role: 'Job Seeker',
        status: 'Suspended',
        joinedAt: 'Jan 5, 2026',
    },
    {
        id: 4,
        name: 'Emily Davis',
        email: 'emily.d@email.com',
        role: 'Employer',
        status: 'Pending',
        joinedAt: 'Jan 15, 2026',
    },
];

// Mock Candidates for Employer Dashboard
export const mockCandidates = [
    {
        id: 1,
        name: 'Sarah Connor',
        email: 'sarah.connor@email.com',
        title: 'Senior Frontend Developer',
        role: 'Sr. Frontend Dev',
        location: 'San Francisco, CA',
        matchScore: 95,
        status: 'Interview',
        stage: 'interview',
        experience: 7,
        education: "Master's",
        skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Redux'],
        appliedDate: 'Jan 15',
        avatar: 'SC',
        resumeUrl: '#',
        phone: '+1 (555) 123-4567',
    },
    {
        id: 2,
        name: 'John Wick',
        email: 'john.wick@email.com',
        title: 'Full Stack Developer',
        role: 'Sr. Frontend Dev',
        location: 'New York, NY',
        matchScore: 88,
        status: 'Screening',
        stage: 'screening',
        experience: 5,
        education: "Bachelor's",
        skills: ['React', 'Python', 'Django', 'PostgreSQL', 'Docker'],
        appliedDate: 'Jan 14',
        avatar: 'JW',
        resumeUrl: '#',
        phone: '+1 (555) 234-5678',
    },
    {
        id: 3,
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        title: 'Product Manager',
        role: 'Product Manager',
        location: 'Austin, TX',
        matchScore: 92,
        status: 'Offer',
        stage: 'offer',
        experience: 8,
        education: 'MBA',
        skills: ['Product Strategy', 'Agile', 'Scrum', 'Data Analysis', 'Roadmapping'],
        appliedDate: 'Jan 12',
        avatar: 'JS',
        resumeUrl: '#',
        phone: '+1 (555) 345-6789',
    },
    {
        id: 4,
        name: 'Alex Chen',
        email: 'alex.chen@email.com',
        title: 'DevOps Engineer',
        role: 'DevOps Engineer',
        location: 'Seattle, WA',
        matchScore: 85,
        status: 'New',
        stage: 'new',
        experience: 4,
        education: "Bachelor's",
        skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
        appliedDate: 'Jan 18',
        avatar: 'AC',
        resumeUrl: '#',
        phone: '+1 (555) 456-7890',
    },
    {
        id: 5,
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        title: 'UI/UX Designer',
        role: 'UI/UX Designer',
        location: 'Los Angeles, CA',
        matchScore: 78,
        status: 'New',
        stage: 'new',
        experience: 3,
        education: "Bachelor's",
        skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping'],
        appliedDate: 'Jan 17',
        avatar: 'MG',
        resumeUrl: '#',
        phone: '+1 (555) 567-8901',
    },
    {
        id: 6,
        name: 'David Kim',
        email: 'david.kim@email.com',
        title: 'Backend Engineer',
        role: 'Backend Engineer',
        location: 'Boston, MA',
        matchScore: 91,
        status: 'Hired',
        stage: 'hired',
        experience: 6,
        education: "Master's",
        skills: ['Java', 'Spring Boot', 'Microservices', 'MongoDB', 'Redis'],
        appliedDate: 'Jan 5',
        avatar: 'DK',
        resumeUrl: '#',
        phone: '+1 (555) 678-9012',
    },
    {
        id: 7,
        name: 'Emily Brown',
        email: 'emily.brown@email.com',
        title: 'Data Scientist',
        role: 'Data Scientist',
        location: 'Chicago, IL',
        matchScore: 72,
        status: 'Rejected',
        stage: 'rejected',
        experience: 2,
        education: 'PhD',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'],
        appliedDate: 'Jan 10',
        avatar: 'EB',
        resumeUrl: '#',
        phone: '+1 (555) 789-0123',
    },
    {
        id: 8,
        name: 'Michael Lee',
        email: 'michael.lee@email.com',
        title: 'Frontend Developer',
        role: 'Frontend Developer',
        location: 'Remote',
        matchScore: 82,
        status: 'Screening',
        stage: 'screening',
        experience: 4,
        education: "Bachelor's",
        skills: ['Vue.js', 'JavaScript', 'CSS', 'Tailwind', 'REST API'],
        appliedDate: 'Jan 16',
        avatar: 'ML',
        resumeUrl: '#',
        phone: '+1 (555) 890-1234',
    },
];

// Mock Team Members
export const mockTeamMembers = [
    { id: 1, name: 'HR Manager', email: 'hr@techcorp.com', role: 'admin' },
    { id: 2, name: 'John Recruiter', email: 'john.r@techcorp.com', role: 'recruiter' },
    { id: 3, name: 'Sarah Hiring', email: 'sarah.h@techcorp.com', role: 'recruiter' },
    { id: 4, name: 'Tech Lead', email: 'tech.lead@techcorp.com', role: 'interviewer' },
    { id: 5, name: 'Design Lead', email: 'design.lead@techcorp.com', role: 'interviewer' },
];

// Mock Scheduled Interviews
export const mockInterviews = [
    {
        id: 1,
        candidateId: 1,
        candidateName: 'Sarah Connor',
        date: 'Jan 22, 2026',
        time: '2:00 PM',
        duration: 60,
        type: 'Video',
        status: 'scheduled',
        interviewers: [4],
    },
    {
        id: 2,
        candidateId: 3,
        candidateName: 'Jane Smith',
        date: 'Jan 23, 2026',
        time: '10:00 AM',
        duration: 45,
        type: 'Phone',
        status: 'scheduled',
        interviewers: [2],
    },
    {
        id: 3,
        candidateId: 2,
        candidateName: 'John Wick',
        date: 'Jan 24, 2026',
        time: '3:30 PM',
        duration: 90,
        type: 'Technical',
        status: 'scheduled',
        interviewers: [4, 5],
    },
];

// Mock Conversations
export const mockConversations = [
    {
        id: 1,
        candidateId: 1,
        candidateName: 'Sarah Connor',
        subject: 'Interview Confirmation - Senior Frontend Developer',
        preview: 'Thank you for confirming your interview...',
        time: '2 hours ago',
        read: false,
    },
    {
        id: 2,
        candidateId: 3,
        candidateName: 'Jane Smith',
        subject: 'Offer Discussion',
        preview: 'We are pleased to extend an offer...',
        time: '1 day ago',
        read: true,
    },
    {
        id: 3,
        candidateId: 4,
        candidateName: 'Alex Chen',
        subject: 'Application Received',
        preview: 'Thank you for your interest in our DevOps...',
        time: '2 days ago',
        read: true,
    },
];

// Mock Company Profile
export const mockCompanyProfile = {
    name: 'TechCorp Inc.',
    logo: null,
    industry: 'technology',
    size: '501-1000',
    location: 'San Francisco, CA',
    website: 'https://techcorp.example.com',
    about: 'TechCorp is a leading technology company building innovative solutions for the modern web. We believe in creating products that make a difference.',
    culture: 'We foster a collaborative and inclusive environment where everyone can thrive. Our team values creativity, innovation, and work-life balance.',
    benefits: 'Health Insurance, 401k Matching, Remote Work, Unlimited PTO, Learning Budget, Stock Options',
    linkedin: 'https://linkedin.com/company/techcorp',
    twitter: 'https://twitter.com/techcorp',
};

// Mock Activity Log
export const mockActivityLog = [
    { type: 'invite', message: 'John Recruiter invited Sarah Hiring to the team', time: '2 hours ago' },
    { type: 'update', message: "Tech Lead's role changed to Interviewer", time: '1 day ago' },
    { type: 'invite', message: 'HR Manager invited Design Lead to the team', time: '3 days ago' },
];

// Mock Pending Invites
export const mockPendingInvites = [
    { id: 1, email: 'new.recruiter@techcorp.com', role: 'recruiter', invitedAt: '2 days ago' },
];

// Mock Message Threads
export const mockMessageThreads = {
    1: [
        { id: 1, senderId: 'recruiter', senderName: 'HR Manager', content: 'Hi Sarah, thank you for applying for the Senior Frontend Developer position. We were impressed with your background.', timestamp: '2026-01-18T10:00:00', status: 'read' },
        { id: 2, senderId: 1, senderName: 'Sarah Connor', senderAvatar: 'SC', content: 'Thank you! I am very excited about this opportunity. I have been following TechCorp for a while and love the work you do.', timestamp: '2026-01-18T10:15:00', status: 'read' },
        { id: 3, senderId: 'recruiter', senderName: 'HR Manager', content: 'We were impressed with your resume and experience. Would you be available for a video interview next week?', timestamp: '2026-01-18T14:30:00', status: 'read' },
        { id: 4, senderId: 1, senderName: 'Sarah Connor', senderAvatar: 'SC', content: 'Yes, I am available. What times work best for you? I am flexible most days except Tuesday morning.', timestamp: '2026-01-18T15:00:00', status: 'read' },
        { id: 5, senderId: 'recruiter', senderName: 'HR Manager', content: 'How about Wednesday, January 22nd at 2 PM EST? We will send you a Zoom link.', timestamp: '2026-01-19T09:00:00', status: 'delivered' },
        { id: 6, senderId: 1, senderName: 'Sarah Connor', senderAvatar: 'SC', content: 'That works perfectly! I will mark my calendar. Looking forward to it!', timestamp: '2026-01-19T09:30:00', status: 'read' },
    ],
    2: [
        { id: 1, senderId: 'recruiter', senderName: 'HR Manager', content: 'Hi Jane, we are pleased to extend an offer for the Product Manager position.', timestamp: '2026-01-17T14:00:00', status: 'read' },
        { id: 2, senderId: 3, senderName: 'Jane Smith', senderAvatar: 'JS', content: 'This is wonderful news! I am very excited. Can we discuss the details?', timestamp: '2026-01-17T14:30:00', status: 'read' },
    ],
    3: [
        { id: 1, senderId: 'recruiter', senderName: 'HR Manager', content: 'Hi Alex, thank you for your interest in our DevOps Engineer position. We have received your application.', timestamp: '2026-01-16T10:00:00', status: 'read' },
    ],
};

// Mock Notifications for Communication Hub
export const mockCommunicationNotifications = [
    { id: 1, type: 'interview', title: 'Interview Scheduled', message: 'Your interview with Sarah Connor is scheduled for Jan 22, 2:00 PM EST', time: '2 hours ago', isRead: false, channel: 'in-app' },
    { id: 2, type: 'application', title: 'New Application', message: 'Alex Chen applied for the DevOps Engineer position', time: '5 hours ago', isRead: false, channel: 'email' },
    { id: 3, type: 'message', title: 'New Message', message: 'Jane Smith replied to your message about the offer discussion', time: '1 day ago', isRead: true, channel: 'in-app' },
    { id: 4, type: 'feedback', title: 'Feedback Submitted', message: 'Tech Lead submitted interview feedback for John Wick', time: '2 days ago', isRead: true, channel: 'in-app' },
    { id: 5, type: 'application', title: 'Application Viewed', message: 'DataFlow Systems viewed your application for Backend Engineer', time: '3 days ago', isRead: true, channel: 'email' },
    { id: 6, type: 'interview', title: 'Interview Reminder', message: 'Reminder: Interview with Jane Smith tomorrow at 10:00 AM', time: '1 day ago', isRead: true, channel: 'sms' },
];

// Mock Interview Feedback
export const mockInterviewFeedback = [
    {
        id: 1,
        candidateId: 1,
        candidateName: 'Sarah Connor',
        interviewId: 1,
        reviewerId: 4,
        reviewerName: 'Tech Lead',
        date: 'Jan 20, 2026',
        overallRating: 4,
        technicalSkills: 5,
        communication: 4,
        cultureFit: 4,
        problemSolving: 4,
        strengths: 'Excellent technical skills with deep knowledge of React and TypeScript. Great problem-solving ability demonstrated during the coding challenge.',
        improvements: 'Could improve on explaining complex technical concepts to non-technical stakeholders.',
        recommendation: 'yes',
        privateNotes: 'Strong candidate, would be a great addition to the team.',
    },
    {
        id: 2,
        candidateId: 1,
        candidateName: 'Sarah Connor',
        interviewId: 1,
        reviewerId: 1,
        reviewerName: 'HR Manager',
        date: 'Jan 20, 2026',
        overallRating: 4,
        technicalSkills: 4,
        communication: 5,
        cultureFit: 5,
        problemSolving: 3,
        strengths: 'Great communication skills and cultural fit. Very enthusiastic about the role and company mission.',
        improvements: 'Limited experience with our specific tech stack, but shows strong learning ability.',
        recommendation: 'strong_yes',
        privateNotes: 'Very personable and would fit well with the team culture.',
    },
    {
        id: 3,
        candidateId: 2,
        candidateName: 'John Wick',
        interviewId: 3,
        reviewerId: 4,
        reviewerName: 'Tech Lead',
        date: 'Jan 19, 2026',
        overallRating: 3,
        technicalSkills: 4,
        communication: 3,
        cultureFit: 3,
        problemSolving: 4,
        strengths: 'Solid full-stack experience and good understanding of system architecture.',
        improvements: 'Communication could be more clear. Seemed nervous during the interview.',
        recommendation: 'maybe',
        privateNotes: 'Needs more evaluation, consider a second round.',
    },
];

// Mock Video Interview Settings
export const mockVideoInterviewSettings = [
    {
        id: 1,
        candidateId: 1,
        platform: 'zoom',
        meetingLink: 'https://zoom.us/j/1234567890',
        meetingId: '123 456 7890',
        passcode: 'abc123',
        date: '2026-01-22',
        time: '14:00',
        duration: '60',
        interviewers: [4, 5],
        sendReminders: true,
        recordingEnabled: false,
        waitingRoomEnabled: true,
    },
];

