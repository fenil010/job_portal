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
