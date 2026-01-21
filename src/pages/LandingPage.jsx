import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

const features = [
    {
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
        title: 'Smart Job Matching',
        description: 'AI-powered algorithms match you with jobs that fit your skills, experience, and career goals.',
    },
    {
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        title: 'Resume Builder',
        description: 'Create professional resumes with our easy-to-use builder. Get AI feedback and optimization tips.',
    },
    {
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
        title: 'Instant Alerts',
        description: 'Get notified instantly when new jobs match your preferences or when employers view your profile.',
    },
    {
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
        title: 'Analytics Dashboard',
        description: 'Track your application progress, profile views, and get insights to improve your job search.',
    },
    {
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        title: 'Direct Connect',
        description: 'Message employers directly and schedule interviews seamlessly through our platform.',
    },
    {
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
        title: 'Verified Companies',
        description: 'Apply with confidence. All employers on our platform are verified and trusted.',
    },
];

const pricingPlans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for getting started with your job search',
        features: [
            'Browse unlimited job listings',
            'Apply to 5 jobs per month',
            'Basic resume upload',
            'Email notifications',
            'Job search filters',
        ],
        cta: 'Get Started Free',
        popular: false,
    },
    {
        name: 'Pro',
        price: '$19',
        period: 'per month',
        description: 'Boost your job search with premium features',
        features: [
            'Everything in Free',
            'Unlimited job applications',
            'AI resume optimization',
            'Priority application status',
            'Profile analytics',
            'Direct messaging with employers',
            'Interview scheduling',
        ],
        cta: 'Start Pro Trial',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: '$49',
        period: 'per month',
        description: 'For serious job seekers and career changers',
        features: [
            'Everything in Pro',
            'Career coaching sessions',
            '1-on-1 resume review',
            'Mock interview practice',
            'Salary negotiation tips',
            'Priority support',
            'Early access to top jobs',
        ],
        cta: 'Contact Sales',
        popular: false,
    },
];

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'Software Engineer at Google',
        image: null,
        quote: 'JobPortal helped me land my dream job! The AI matching was spot-on and I got interviews at top tech companies within weeks.',
    },
    {
        name: 'Michael Roberts',
        role: 'Product Manager at Stripe',
        image: null,
        quote: 'The resume builder and optimization tools were game-changers. I saw a 3x increase in interview callbacks.',
    },
    {
        name: 'Emily Johnson',
        role: 'UX Designer at Airbnb',
        image: null,
        quote: 'I love how easy it is to track applications and communicate with employers. Best job platform I\'ve ever used!',
    },
];

const stats = [
    { value: '50K+', label: 'Active Jobs' },
    { value: '10K+', label: 'Companies' },
    { value: '500K+', label: 'Job Seekers' },
    { value: '95%', label: 'Success Rate' },
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#F4EDE3]">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#FAF6F0]/90 backdrop-blur-md border-b-2 border-[#90353D]/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#90353D] to-[#6B2830] rounded-xl flex items-center justify-center shadow-lg shadow-[#90353D]/20 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-[#F4EDE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-[#3E2723]">Job<span className="text-[#90353D]">Portal</span></span>
                        </Link>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-[#4A3C35] hover:text-[#90353D] font-medium transition-colors">Features</a>
                            <a href="#pricing" className="text-[#4A3C35] hover:text-[#90353D] font-medium transition-colors">Pricing</a>
                            <a href="#testimonials" className="text-[#4A3C35] hover:text-[#90353D] font-medium transition-colors">Testimonials</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="ghost" size="md">Sign In</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" size="md">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#90353D]/20 rounded-full blur-3xl animate-pulse-soft" />
                    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#6B2830]/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#90353D]/10 rounded-full text-sm font-medium text-[#90353D] mb-6 animate-fade-in-down">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            Trusted by 500,000+ professionals
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3E2723] leading-tight mb-6 animate-fade-in-up">
                            Find Your Dream Job with
                            <span className="text-[#90353D]"> AI-Powered</span> Matching
                        </h1>
                        <p className="text-lg sm:text-xl text-[#4A3C35] mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Connect with top employers, get personalized job recommendations, and accelerate your career with our intelligent job platform.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <Link to="/register">
                                <Button size="lg" className="w-full sm:w-auto px-8">
                                    Start Your Journey
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </Button>
                            </Link>
                            <Link to="/jobs">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                                    Browse Jobs
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-[#90353D]/10 animate-fade-in-up"
                                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                            >
                                <div className="text-3xl sm:text-4xl font-bold text-[#90353D] mb-1">{stat.value}</div>
                                <div className="text-sm text-[#4A3C35]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#3E2723] mb-4">
                            Everything You Need to Land Your Dream Job
                        </h2>
                        <p className="text-lg text-[#4A3C35] max-w-2xl mx-auto">
                            Powerful tools and features designed to give you the competitive edge in your job search.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="p-6 bg-[#FAF6F0] rounded-2xl border-2 border-[#90353D]/10 hover:border-[#90353D]/30 hover:shadow-xl hover:shadow-[#90353D]/5 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-[#90353D]/10 rounded-xl flex items-center justify-center text-[#90353D] mb-4 group-hover:scale-110 group-hover:bg-[#90353D] group-hover:text-white transition-all duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-[#3E2723] mb-2">{feature.title}</h3>
                                <p className="text-[#4A3C35]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#3E2723] mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-lg text-[#4A3C35] max-w-2xl mx-auto">
                            Choose the plan that fits your needs. Upgrade or downgrade anytime.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {pricingPlans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative p-8 rounded-3xl border-2 transition-all duration-300 hover:shadow-xl ${plan.popular
                                        ? 'bg-gradient-to-br from-[#90353D] to-[#6B2830] border-transparent text-white scale-105'
                                        : 'bg-white border-[#90353D]/20 hover:border-[#90353D]/40'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#F4EDE3] text-[#90353D] text-sm font-semibold rounded-full shadow-lg">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-[#3E2723]'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-[#90353D]'}`}>
                                            {plan.price}
                                        </span>
                                        <span className={plan.popular ? 'text-white/70' : 'text-[#9B8B7E]'}>
                                            /{plan.period}
                                        </span>
                                    </div>
                                    <p className={`mt-2 text-sm ${plan.popular ? 'text-white/80' : 'text-[#4A3C35]'}`}>
                                        {plan.description}
                                    </p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-[#4ade80]' : 'text-[#90353D]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-[#4A3C35]'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/register">
                                    <Button
                                        variant={plan.popular ? 'secondary' : 'primary'}
                                        className={`w-full ${plan.popular ? 'bg-white text-[#90353D] hover:bg-[#F4EDE3]' : ''}`}
                                    >
                                        {plan.cta}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#3E2723] mb-4">
                            Loved by Thousands of Job Seekers
                        </h2>
                        <p className="text-lg text-[#4A3C35] max-w-2xl mx-auto">
                            See what our users have to say about their experience with JobPortal.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.name}
                                className="p-6 bg-[#FAF6F0] rounded-2xl border-2 border-[#90353D]/10"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-[#fbbf24]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-[#4A3C35] mb-6 italic">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#90353D] to-[#6B2830] rounded-full flex items-center justify-center text-white font-semibold">
                                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[#3E2723]">{testimonial.name}</div>
                                        <div className="text-sm text-[#9B8B7E]">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#90353D] to-[#6B2830] rounded-3xl p-12 text-center">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
                        </div>
                        <div className="relative">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ready to Take the Next Step?
                            </h2>
                            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                                Join thousands of professionals who have already found their dream jobs through JobPortal.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/register">
                                    <Button className="bg-white text-[#90353D] hover:bg-[#F4EDE3] px-8" size="lg">
                                        Create Free Account
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8" size="lg">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#3E2723] text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div>
                            <Link to="/" className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-[#90353D] rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold">JobPortal</span>
                            </Link>
                            <p className="text-white/70 text-sm">
                                AI-powered job matching platform connecting talent with opportunity.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">For Job Seekers</h4>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li><a href="#" className="hover:text-white transition-colors">Browse Jobs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Career Resources</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Salary Calculator</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">For Employers</h4>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li><a href="#" className="hover:text-white transition-colors">Post a Job</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Browse Candidates</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Recruiting Solutions</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/60">
                        <p>© 2026 JobPortal. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
