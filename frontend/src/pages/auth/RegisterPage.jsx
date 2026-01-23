import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, useToast } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';

const roleOptions = [
    { id: 'jobseeker', title: 'Job Seeker', description: 'Looking for opportunities', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
    { id: 'employer', title: 'Employer', description: 'Hiring for my company', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
];

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { toast } = useToast();

    const [step, setStep] = useState(1);
    const [role, setRole] = useState('');
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setStep(2);
    };

    const navigateByRole = (userRole) => {
        if (userRole === 'employer') {
            navigate('/employer/dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!agreedToTerms) newErrors.terms = 'You must agree to the terms';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);

        const userData = {
            id: Date.now(),
            name: formData.fullName,
            email: formData.email,
            role,
        };

        login(userData);

        if (role === 'employer') {
            toast.success('Account created successfully!', { title: 'Welcome Employer!' });
        } else {
            toast.success('Account created successfully!', { title: 'Welcome to JobPortal!' });
        }

        navigateByRole(role);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4EDE3] p-4 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#90353D]/20 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#6B2830]/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative w-full max-w-md">
                <div className="flex justify-center mb-10 animate-fade-in-down">
                    <a href="/" className="flex items-center gap-3 group">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#90353D] to-[#6B2830] rounded-2xl flex items-center justify-center shadow-xl shadow-[#90353D]/30 group-hover:scale-110 transition-all duration-500">
                            <svg className="w-8 h-8 text-[#F4EDE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-[#3E2723]">Job<span className="text-[#90353D]">Portal</span></span>
                    </a>
                </div>

                <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-500 ${step >= 1 ? 'bg-[#90353D] text-[#F4EDE3] shadow-lg shadow-[#90353D]/30' : 'bg-[#90353D]/15 text-[#9B8B7E]'}`}>1</div>
                    <div className={`w-16 h-1.5 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#90353D]' : 'bg-[#90353D]/15'}`} />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-500 ${step >= 2 ? 'bg-[#90353D] text-[#F4EDE3] shadow-lg shadow-[#90353D]/30' : 'bg-[#90353D]/15 text-[#9B8B7E]'}`}>2</div>
                </div>

                <Card variant="elevated" padding="lg" className="shadow-2xl shadow-[#90353D]/10 animate-fade-in-up">
                    {step === 1 ? (
                        <>
                            <CardHeader className="text-center flex-col items-center mb-6">
                                <CardTitle as="h1" className="text-2xl">Join JobPortal</CardTitle>
                                <CardDescription className="mt-2">Select your account type</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {roleOptions.map((option, index) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => handleRoleSelect(option.id)}
                                            className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#90353D] animate-fade-in-up ${role === option.id ? 'border-[#90353D] bg-[#90353D]/10 shadow-lg' : 'border-[#90353D]/20 hover:border-[#90353D] hover:bg-[#90353D]/5'}`}
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-4 rounded-xl transition-colors duration-300 ${role === option.id ? 'bg-[#90353D] text-[#F4EDE3]' : 'bg-[#90353D]/10 text-[#90353D]'}`}>{option.icon}</div>
                                                <div>
                                                    <h3 className="font-semibold text-[#3E2723] text-lg">{option.title}</h3>
                                                    <p className="text-sm text-[#4A3C35]">{option.description}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <p className="mt-6 text-center text-sm text-[#4A3C35]">
                                    Already have an account?{' '}
                                    <button type="button" onClick={() => navigate('/login')} className="font-semibold text-[#90353D] hover:text-[#6B2830]">
                                        Sign in
                                    </button>
                                </p>
                            </CardContent>
                        </>
                    ) : (
                        <>
                            <CardHeader className="mb-4">
                                <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 text-sm text-[#4A3C35] hover:text-[#3E2723] mb-3 transition-all duration-300 hover:-translate-x-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    Back
                                </button>
                                <CardTitle as="h1" className="text-2xl">Create your {role === 'employer' ? 'employer' : ''} account</CardTitle>
                                <CardDescription className="mt-1">Fill in your details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Input
                                        label="Full Name"
                                        id="register-name"
                                        name="fullName"
                                        placeholder={role === 'employer' ? 'Company Name' : 'John Doe'}
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        error={errors.fullName}
                                        required
                                        leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                                    />
                                    <Input
                                        label="Email"
                                        id="register-email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        required
                                        leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                                    />
                                    <Input
                                        label="Password"
                                        id="register-password"
                                        name="password"
                                        type="password"
                                        placeholder="Create password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                        required
                                        showPasswordToggle
                                        helperText="At least 8 characters"
                                        leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                                    />
                                    <Input
                                        label="Confirm Password"
                                        id="register-confirm"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        error={errors.confirmPassword}
                                        required
                                        showPasswordToggle
                                        leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                                    />
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreedToTerms}
                                            onChange={(e) => { setAgreedToTerms(e.target.checked); if (errors.terms) setErrors((prev) => ({ ...prev, terms: '' })); }}
                                            className="mt-1 w-5 h-5 rounded-lg border-2 border-[#90353D]/25 text-[#90353D] focus:ring-[#90353D]"
                                        />
                                        <label htmlFor="terms" className="text-sm text-[#4A3C35]">
                                            I agree to the <a href="#terms" className="text-[#90353D] hover:underline">Terms</a> and <a href="#privacy" className="text-[#90353D] hover:underline">Privacy Policy</a>
                                        </label>
                                    </div>
                                    {errors.terms && <p className="text-sm text-[#C45B5B]">{errors.terms}</p>}
                                    <Button type="submit" className="w-full mt-2" size="lg" loading={isLoading}>Create account</Button>
                                </form>
                                <p className="mt-4 text-center text-sm text-[#4A3C35]">
                                    Already have an account?{' '}
                                    <button type="button" onClick={() => navigate('/login')} className="font-semibold text-[#90353D] hover:text-[#6B2830]">
                                        Sign in
                                    </button>
                                </p>
                            </CardContent>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}
