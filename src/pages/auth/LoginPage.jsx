import { useState } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui';

export default function LoginPage({ onNavigate, onLogin }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);

        // Demo login credentials
        let role = 'jobseeker';
        if (formData.email.includes('employer')) role = 'employer';
        if (formData.email.includes('admin')) role = 'admin';

        onLogin?.({
            id: 1,
            name: 'John Doe',
            email: formData.email,
            role,
        });
    };

    const handleDemoLogin = (role) => {
        const demoEmails = {
            jobseeker: 'john@example.com',
            employer: 'employer@company.com',
            admin: 'admin@jobportal.com',
        };

        onLogin?.({
            id: 1,
            name: role === 'admin' ? 'Admin User' : role === 'employer' ? 'HR Manager' : 'John Doe',
            email: demoEmails[role],
            role,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdf9f7] p-4 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FFD2C2]/40 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#789A99]/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FFD2C2]/20 rounded-full blur-2xl animate-float" />
            </div>

            <div className="relative w-full max-w-md">
                <div className="flex justify-center mb-10 animate-fade-in-down">
                    <a href="/" className="flex items-center gap-3 group" aria-label="JobPortal Home">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#FFD2C2] to-[#789A99] rounded-2xl flex items-center justify-center shadow-xl shadow-[#789A99]/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-[#1e2a32]">Job<span className="text-[#789A99]">Portal</span></span>
                    </a>
                </div>

                <Card variant="elevated" padding="lg" className="shadow-2xl shadow-[#1e2a32]/10 animate-fade-in-up stagger-1">
                    <CardHeader className="text-center flex-col items-center mb-6">
                        <CardTitle as="h1" className="text-2xl">Welcome back</CardTitle>
                        <CardDescription className="mt-2">Sign in to your account to continue</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="animate-fade-in-up stagger-2">
                                <Input
                                    label="Email address"
                                    id="login-email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    required
                                    autoComplete="email"
                                    leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                                />
                            </div>

                            <div className="animate-fade-in-up stagger-3">
                                <Input
                                    label="Password"
                                    id="login-password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    required
                                    showPasswordToggle
                                    autoComplete="current-password"
                                    leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                                />
                                <div className="flex justify-end mt-2">
                                    <a href="#forgot" className="text-sm text-[#789A99] hover:text-[#5f7d7c] font-medium transition-colors duration-300">Forgot password?</a>
                                </div>
                            </div>

                            <div className="animate-fade-in-up stagger-4">
                                <Button type="submit" className="w-full" size="lg" loading={isLoading}>Sign in</Button>
                            </div>
                        </form>

                        {/* Demo Login Buttons */}
                        <div className="mt-6 animate-fade-in-up stagger-5">
                            <p className="text-xs text-center text-[#8a9aa4] mb-3">Quick demo access:</p>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleDemoLogin('jobseeker')}
                                    className="py-2 px-3 text-xs font-medium text-[#789A99] bg-[#789A99]/10 hover:bg-[#789A99]/20 rounded-lg transition-all duration-300 hover:scale-105"
                                >
                                    Job Seeker
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDemoLogin('employer')}
                                    className="py-2 px-3 text-xs font-medium text-[#FFD2C2] bg-[#FFD2C2]/20 hover:bg-[#FFD2C2]/30 rounded-lg transition-all duration-300 hover:scale-105"
                                >
                                    Employer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDemoLogin('admin')}
                                    className="py-2 px-3 text-xs font-medium text-[#5a6b75] bg-[#e8e0dc] hover:bg-[#d8cec8] rounded-lg transition-all duration-300 hover:scale-105"
                                >
                                    Admin
                                </button>
                            </div>
                        </div>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-[#e8e0dc]" /></div>
                            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-[#8a9aa4]">Or continue with</span></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" className="w-full">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </Button>
                        </div>

                        <p className="mt-6 text-center text-sm text-[#5a6b75]">
                            Don't have an account?{' '}
                            <a href="#register" onClick={(e) => { e.preventDefault(); onNavigate?.('Register'); }} className="font-semibold text-[#789A99] hover:text-[#5f7d7c] transition-colors duration-300">Sign up for free</a>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
