import { useState } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui';

export default function LoginPage({ onNavigate, onLogin }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
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

        onLogin?.({
            id: 1,
            name: 'Demo User',
            email: formData.email,
            role: 'jobseeker',
        });
    };

    const handleDemoLogin = async (role) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);

        const demoUsers = {
            jobseeker: { id: 1, name: 'Sarah Johnson', email: 'sarah@demo.com', role: 'jobseeker' },
            employer: { id: 2, name: 'TechCorp HR', email: 'hr@techcorp.com', role: 'employer' },
            admin: { id: 3, name: 'Admin User', email: 'admin@jobportal.com', role: 'admin' },
        };

        onLogin?.(demoUsers[role]);
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
                            {/* AI Sparkle Icon */}
                            <svg className="w-8 h-8 text-[#F4EDE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-[#3E2723]">Job<span className="text-[#90353D]">Portal</span></span>
                    </a>
                </div>

                <Card variant="elevated" padding="lg" className="shadow-2xl shadow-[#90353D]/10 animate-fade-in-up">
                    <CardHeader className="text-center flex-col items-center mb-6">
                        <CardTitle as="h1" className="text-2xl">Welcome back</CardTitle>
                        <CardDescription className="mt-2">Sign in to continue your journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                label="Email"
                                id="login-email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                required
                                leftIcon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                }
                            />
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
                                leftIcon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                }
                            />

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-2 border-[#90353D]/25 text-[#90353D] focus:ring-[#90353D]"
                                    />
                                    <span className="text-sm text-[#4A3C35]">Remember me</span>
                                </label>
                                <a href="#forgot" className="text-sm font-medium text-[#90353D] hover:text-[#6B2830] transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                                Sign in
                            </Button>
                        </form>

                        <div className="mt-8">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t-2 border-[#90353D]/15" />
                                </div>
                                <span className="relative px-4 text-sm text-[#9B8B7E] bg-[#FAF6F0]">
                                    Quick Demo Access
                                </span>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                {[
                                    { role: 'jobseeker', label: 'Job Seeker', icon: '🔍' },
                                    { role: 'employer', label: 'Employer', icon: '🏢' },
                                    { role: 'admin', label: 'Admin', icon: '⚙️' },
                                ].map(({ role, label, icon }) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => handleDemoLogin(role)}
                                        disabled={isLoading}
                                        className="flex flex-col items-center gap-2 p-4 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl hover:border-[#90353D] hover:bg-[#90353D]/5 transition-all duration-300 disabled:opacity-50 group"
                                    >
                                        <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
                                        <span className="text-xs font-medium text-[#4A3C35]">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="mt-8 text-center text-sm text-[#4A3C35]">
                            Don't have an account?{' '}
                            <a
                                href="#register"
                                onClick={(e) => { e.preventDefault(); onNavigate?.('Register'); }}
                                className="font-semibold text-[#90353D] hover:text-[#6B2830] transition-colors"
                            >
                                Create one now
                            </a>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
